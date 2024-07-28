export default ({ config }) => {
  return {
    ...config,
    extra: {
      url: process.env.URL_KEY,
      anon: process.env.ANON_KEY,
    },
  };
};
