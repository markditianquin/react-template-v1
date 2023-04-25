export const appConfig = {
  authConfig: {
    clientId: String(process.env.REACT_APP_CLIENT_ID),
    authority: String(process.env.REACT_APP_AUTHORITY),
  },
  appConfig: {
    resource: String(process.env.REACT_APP_API_RESOURCE),
    baseUrl: String(process.env.REACT_APP_API_BASE_URL),
  },
};
