/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ersqmuthcoyjqdgtqytk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },
  output: 'export',

  reactCompiler: true,
};

export default nextConfig;
