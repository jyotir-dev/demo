// Dependencies
import bcrypt from 'bcrypt';

// Constants
const BCRYPT_ROUNDS = 12;

// Dummy Hash
const DUMMY_HASH = bcrypt.hashSync('kairo-dummy-password', BCRYPT_ROUNDS);

// Hash Password
export const hash = (password) => {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
};

// Verify Password
export const verify = (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash ?? DUMMY_HASH);
};
