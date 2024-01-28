import { BASE_URL } from './const';
import { ApiError } from '../api-error';

type Method = 'GET' | 'POST';

/**
 * Makes fetch call to API
 * @param url
 * @throws {ApiError}
 */
export const fetchApi = async (
  url: string,
  method: Method = 'GET',
  body: Record<string, unknown>
) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new ApiError(response);
  }

  return await response.json();
};
