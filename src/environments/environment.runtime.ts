declare var ENV;

export const runtimeEnvironment = {
  backendUrl: ENV.backendUrl === '${URL}' ? 'www.google.com' : ENV.backendUrl,
  user: ENV.user === '${USER}' ? 'user' : ENV.user,
  key: ENV.key === '${KEY}' ? '12345' : ENV.key
};
