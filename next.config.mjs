/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hhjywnkmoirdbpymwyfn.supabase.co',
        pathname: '/storage/v1/object/public/stratagem%20icons/**',
      },
    ],
  },
};

export default nextConfig;
