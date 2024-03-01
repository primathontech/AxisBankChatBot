module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
          {
            source: "/",
            destination: "/1",
            permanent: false,
          },
        ];
      },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
