/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isDev = process.env.NODE_ENV === "development";
const repoName = "daily-scene-english";

const nextConfig = {
  ...(isDev ? {} : { output: "export" }),
  trailingSlash: true,
  basePath: isGitHubPages ? `/${repoName}` : "",
  assetPrefix: isGitHubPages ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? `/${repoName}` : ""
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
