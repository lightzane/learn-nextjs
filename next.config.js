const {
  PHASE_DEVELOPMENT_SERVER, // npm run dev
  //   PHASE_PRODUCTION_BUILD, // npm run build
  //   PHASE_PRODUCTION_SERVER, // npm start
  //   PHASE_EXPORT, // npm run export
} = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
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
  }

  return {
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
    env: {
      my_connection_string: 'https://lightzane-db.onrender.com/learn-nextjs',
    },
  };
};

module.exports = nextConfig;
