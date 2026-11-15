// Escrow Status
export const ESCROW_STATUS = Object.freeze({
    PENDING_ACCEPT: 'PENDING_ACCEPT',
    WAITING_FOR_DEPOSIT: 'WAITING_FOR_DEPOSIT',
    FUNDED: 'FUNDED',
    RELEASED: 'RELEASED',
    WITHDRAWING: 'WITHDRAWING',
    COMPLETED: 'COMPLETED',
    DENIED: 'DENIED'
});

// Escrow Role
export const ESCROW_ROLE = Object.freeze({
    SENDER: 'sender',
    RECEIVER: 'receiver'
});

// Escrow Action
export const ESCROW_ACTION = Object.freeze({
    ACCEPT: 'accept',
    DENY: 'deny'
});