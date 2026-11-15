// Catch Async
import catchAsync from '../utils/catch-async.js';

// Services
import * as escrowService from '../services/escrow.service.js';

// Create
export const create = catchAsync(async (req, res) => {
    const result = await escrowService.create(req.user, req.body);
    res.status(201).json(result.response);
});

// Escrows
export const escrows = catchAsync(async (req, res) => {
    const result = await escrowService.escrows(req.user);
    res.status(200).json(result.response);
});

// Escrow
export const escrow = catchAsync(async (req, res) => {
    const result = await escrowService.escrow(req.user, req.params);
    res.status(200).json(result.response);
});

// Respond
export const respond = catchAsync(async (req, res) => {
    const result = await escrowService.respond(req.user, req.params, req.body);
    res.status(200).json(result.response);
});

// Release
export const release = catchAsync(async (req, res) => {
    const result = await escrowService.release(req.user, req.params);
    res.status(200).json(result.response);
});

// Withdraw
export const withdraw = catchAsync(async (req, res) => {
    const result = await escrowService.withdraw(req.user, req.params, req.body);
    res.status(200).json(result.response);
});