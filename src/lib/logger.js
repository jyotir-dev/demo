// ANSI Codes
const ANSI = Object.freeze({
    reset: '\x1b[0m',
    gray: '\x1b[90m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    magenta: '\x1b[35m'
});

// Level Colors
const LEVEL_COLORS = Object.freeze({
    info: ANSI.reset,
    success: ANSI.green,
    warn: ANSI.yellow,
    error: ANSI.red
});

// Colorize
const colorize = (color, text) => `${color}${text}${ANSI.reset}`;

// Log
const log = (level, scope, message, detail) => {
    const timestamp = colorize(ANSI.gray, new Date().toLocaleTimeString());
    const scopeText = colorize(ANSI.magenta, scope.padEnd(8));
    const messageText = colorize(LEVEL_COLORS[level], message);
    const detailText = detail ? ` ${colorize(ANSI.gray, detail)}` : '';

    console.log(`${timestamp} ${scopeText} ${messageText}${detailText}`);
};

// Export Logger
export const info = (scope, message, detail) => log('info', scope, message, detail);
export const success = (scope, message, detail) => log('success', scope, message, detail);
export const warn = (scope, message, detail) => log('warn', scope, message, detail);
export const error = (scope, message, detail) => log('error', scope, message, detail);
