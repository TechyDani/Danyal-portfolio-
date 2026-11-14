import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/expertise", destination: "/services", permanent: true }];
  },
};

export default nextConfig;
