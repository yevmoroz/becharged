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
