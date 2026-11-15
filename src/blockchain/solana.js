// Dependencies
import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction
} from '@solana/web3.js';

// Environment
import env from '../config/env.js';

// Logger
import * as logger from '../lib/logger.js';

// Security
import * as encryption from '../security/encryption.js';

// Connection
const connection = new Connection(env.SOLANA_RPC_URL, env.SOLANA_COMMITMENT);

// To Lamports
export const toLamports = (sol) => BigInt(Math.round(sol * LAMPORTS_PER_SOL));

// To SOL
export const toSol = (lamports) => Number(lamports) / LAMPORTS_PER_SOL;

// To Keypair
const toKeypair = (encryptedPrivateKey) => {
    return Keypair.fromSecretKey(new Uint8Array(Buffer.from(encryption.decrypt(encryptedPrivateKey), 'base64')));
};

// Create
export const create = async () => {
    const keypair = await Keypair.generate();

    return {
        publicKey: keypair.publicKey.toBase58(),
        encryptedPrivateKey: encryption.encrypt(Buffer.from(keypair.secretKey).toString('base64'))
    };
};

// Get Balance
export const getBalance = (publicKey) => {
    return connection.getBalance(new PublicKey(publicKey));
};

// Subscribe
export const subscribe = (publicKey, onBalanceChange) => {
    return connection.onAccountChange(new PublicKey(publicKey), async (accountInfo) => {
        try {
            await onBalanceChange(accountInfo.lamports);
        } catch (error) {
            logger.error('SOLANA', `Balance handler failed for ${publicKey}`, error.message);
        }
    });
};

// Unsubscribe
export const unsubscribe = (subscriptionID) => {
    return connection.removeAccountChangeListener(subscriptionID);
};

// Transfer
export const transfer = async (encryptedPrivateKey, destination) => {
    const sender = await toKeypair(encryptedPrivateKey);
    const recipient = new PublicKey(destination);

    const [balance, { blockhash, lastValidBlockHeight }] = await Promise.all([
        connection.getBalance(sender.publicKey),
        connection.getLatestBlockhash()
    ]);

    const buildTransaction = (lamports) => {
        return new Transaction({ feePayer: sender.publicKey, blockhash, lastValidBlockHeight }).add(
            SystemProgram.transfer({
                fromPubkey: sender.publicKey,
                toPubkey: recipient,
                lamports
            })
        );
    };

    const { value: fee } = await connection.getFeeForMessage(buildTransaction(balance).compileMessage());

    if (fee === null) {
        throw new Error('Unable to estimate transaction fee.');
    }

    const lamports = balance - fee;

    if (lamports <= 0n) {
        throw new Error('Insufficient balance to cover the transaction fee.');
    }

    return sendAndConfirmTransaction(connection, buildTransaction(lamports), [sender], {
        commitment: env.SOLANA_COMMITMENT,
        maxRetries: 3
    });
};
