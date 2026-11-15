// Dependencies
const mongoose = require('mongoose');

// Wallet Schema
const walletSchema = new mongoose.Schema({

    publicKey: {
        type: String,
        required: true
    },

    encryptedPrivateKey: {
        type: String,
        required: true,
        select: false
    }
},
    {
        _id: false
    });

// Payout Schema
const payoutSchema = new mongoose.Schema({

    address: {
        type: String,
        required: true
    },

    signature: {
        type: String
    },

    paidAt: {
        type: Date
    }
},
    {
        _id: false
    });

// Escrow Schema
const escrowSchema = new mongoose.Schema({

    publicID: {
        type: String,
        required: true,
        unique: true
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        required: true
    },

    wallet: {
        type: walletSchema,
        default: undefined
    },
    
    payout: {
        type: payoutSchema,
        default: undefined
    }
},
    {
        timestamps: true
    });

// Escrow Model
const Escrow = mongoose.model('Escrow', escrowSchema)

// Export Escrow Model
module.exports = Escrow;