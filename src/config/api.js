export default {

  // Base url for the API
  baseURL: env('API_BASE_URL'),

  // Default results per page if pagination is requested
  perPage: 15,

  // Available paths on the API
  paths: [
    'product',
    'inventory'
  ]
}
