/**
 * Add the auth token to the request when the user is authenticated.
 * @param  {object} config  The request config.
 * @return {object}  The request config.
 */
export default function (config) {
  if (app.auth.authenticated()) {
    config.headers.common['Authorization'] = 'Bearer ' + app.auth.token()
  }
  return config
}
