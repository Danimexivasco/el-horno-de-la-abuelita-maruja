export function getApiBaseUrl() {
  const baseUrl = process.env.NODE_ENV === "production" ?
    process.env.API_BASE_URL_PROD
    :
    process.env.API_BASE_URL_DEV;

  return baseUrl;
}