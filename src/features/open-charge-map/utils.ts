import { ACCESS_TOKEN, BASE_URL, PUBLIC_STATUS_ID } from './const';
import { ApiError } from '../api-error';

const baseQueryList = [
  `statustypeid=${PUBLIC_STATUS_ID}`,
  // switch to universal-based units
  'distanceunit=km',
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
  const apiUrl = `${path}?${queryString}`;
  return apiUrl;
};

/**
 * Makes fetch call to API
 * @param url
 * @throws {ApiError}
 */
export const fetchApi = async (url: string, method: string = 'GET') => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method,
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
