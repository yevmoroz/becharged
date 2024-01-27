import { ACCESS_TOKEN, BASE_URL } from './const';

const baseQueryList = [
  'distance=10',
  // less data that's not needed
  'compact=true',
  // less information that describes data
  'verbose=false',
  // ad-herance to JS standards
  'camelcase=true',
];

/**
 * Compose full absolute API URL for given path with query parmaters
 * Path expected to have no slahes in the end or beginning
 * Query is a key-value object, no nested objects in values
 */
export const getApiUrlForPath = (
  path: string,
  query: { [key: string]: string | number | null }
) => {
  if (Object.values(query).includes(null)) {
    throw new Error('Query contains null value');
  }
  const queryList = Object.keys(query).map((key) => `${key}=${query[key]}`) || [];
  const queryString = [...queryList, ...baseQueryList].join('&');
  const apiUrl = `${BASE_URL}/${path}?${queryString}`;
  return apiUrl;
};

/**
 * Makes fetch call to API
 * @param url
 * @throws {ApiError}
 */
export const fetchApi = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': ACCESS_TOKEN,
    },
  });

  if (!response.ok) {
    throw new ApiError(response);
  }

  return await response.json();
};

/**
 * Generic ApiError that uses Response from generic fetch to build a meaningful error message
 */
export class ApiError extends Error {
  constructor(response: Response) {
    super(`Failed fetching URL: ${response.url}`);
    this.name = 'ApiError';
    this.status = response.status;
    this.response = response;
  }
  status: number;
  response: Response;
}
