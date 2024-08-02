export default ({ config }) => {
  return {
    ...config,
    extra: {
      url: process.env.URL_KEY,
      anon: process.env.ANON_KEY,
      eas: {
        projectId: 'f374e62e-d204-4ed3-bb19-a4da6117057e',
      },
    },
  };
};
