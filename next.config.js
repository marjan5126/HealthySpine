/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static optimization to prevent permission issues
  experimental: {
    // Add custom webpack config to handle permission errors
    webpackBuildWorker: false
  },
  // Enable production source maps
  productionBrowserSourceMaps: true,
  // Add error handling for file system operations
  onDemandEntries: {
    // Number of pages that should be kept simultaneously without being disposed
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept in memory
    pagesBufferLength: 2
  }
}

module.exports = nextConfig
