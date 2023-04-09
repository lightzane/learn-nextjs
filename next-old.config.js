/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ? https://nextjs.org/docs/messages/next-image-unconfigured-host
  // This app users <Image src="https://github.com/..."
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // process.env
  env: {
    // process.env.my_connection_string
    my_connection_string:
      'https://lightzane-db.onrender.com/20230409-learn-nextjs',
  },
};

module.exports = nextConfig;
