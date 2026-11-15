// ANSI Codes
const ANSI = Object.freeze({
    reset: '\x1b[0m',
    gray: '\x1b[90m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    magenta: '\x1b[35m'
});

// Colorize
const colorize = (color, text) => `${color}${text}${ANSI.reset}`;

// Status Color
const getStatusColor = (status) => {
    if (status >= 500) return ANSI.red;
    if (status >= 400) return ANSI.yellow;
    if (status >= 300) return ANSI.cyan;
    if (status >= 200) return ANSI.green;
    return ANSI.magenta;
};

// Log Request
function logRequest() {
    return function logRequest(req, res, next) {
        const start = process.hrtime.bigint();

        res.on('finish', () => {
            const duration = Number(process.hrtime.bigint() - start) / 1_000_000;

            const timestamp = colorize(ANSI.gray, new Date().toLocaleTimeString());
            const methodText = colorize(ANSI.cyan, req.method.padEnd(6));
            const urlText = req.originalUrl.padEnd(20);
            const statusText = colorize(getStatusColor(res.statusCode), res.statusCode);
            const durationText = colorize(ANSI.gray, `${duration.toFixed(2)}ms`);

            console.log(`${timestamp} ${methodText} ${urlText} ${statusText} ${durationText}`);
        });

        next();
    };
}

// Export Log Request
export default logRequest;
