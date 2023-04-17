/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'github.com',
				protocol: 'https',
				pathname: '/**'
			},
		],
	},
};

module.exports = nextConfig;
