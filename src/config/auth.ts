export default {
    jwt: {
        // secret: 'cd1b41288363d4519d5ca472a4cea62c',
        secret: process.env.APP_SECRET,
        expiresIn: '1d',
    },
};