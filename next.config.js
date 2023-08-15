/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        USER_POOL_ID: process.env.USER_POOL_ID,
        USER_POOL_CLIENT_ID: process.env.USER_POOL_CLIENT_ID,
    },
};

module.exports = nextConfig;
