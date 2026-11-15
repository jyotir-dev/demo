// API Error
class ApiError extends Error {
    constructor(statusCode, message, code) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Export API Error
export default ApiError;
