// Account View
export const toAccount = (user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt
});
