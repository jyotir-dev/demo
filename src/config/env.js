// Dependencies
const { z } = require('zod');

// Not Placeholder
const notPlaceholder = (value) => !value.startsWith('replace-with');

// Environment Schema
const schema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(5000),
    CLIENT_URL: z.url(),
    MONGO_URI: z.string().startsWith('mongodb'),
    JWT_SECRET: z.string().min(32).refine(notPlaceholder, 'placeholder secret'),
    ENCRYPTION_KEY: z.string().regex(/^[0-9a-f]{64}$/i, 'must be 32 bytes of hex'),
    SOLANA_RPC_URL: z.url(),
    SOLANA_COMMITMENT: z.enum(['confirmed', 'finalized']).default('finalized'),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().int().positive(),
    SMTP_USER: z.string().min(1),
    SMTP_PASS: z.string().min(1),
    EMAIL_FROM: z.string().min(1)
});

// Validate Environment
const result = schema.safeParse(process.env);

if (!result.success) {
    throw new Error(`Invalid environment configuration:\n${z.prettifyError(result.error)}`);
}

// Environment
const env = Object.freeze(result.data);

// Export Environment
module.exports = { env };