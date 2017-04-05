# Using the API Service

The API service is a wrapper for the HTTP service but configured for use with a Laravel application. It sets the baseURL for each request and adds a handful of useful request / response middleware needed to send API requests.

**Drivers (Coming Soon)**

The API service is configured specifically for a Laravel application out of the box. The Auth Service leverages the API to log a user in, refresh API tokens, and accomplish a few other tasks. Future versions of the API service will support drivers, allowing you to use your own non-Laravel API architecture without needing to update your codebase.

**Middleware**

The API service comes with two middleware out of the box for managing API requests and responses.

The token middleware is responsible for adding an Authorization token to every request sent through the API service.

``` javascript
export default function (config) {
  if (app.auth.authenticated()) {
    config.headers.common['Authorization'] = 'Bearer ' + app.auth.token()
  }
  return config
}
```

The unauthorized middleware checks for a 401 response from the API and logs the user out.

``` javascript
export default {
  success: response => response,
  failure: error => {
    if (error.response.status === 401 && app.auth.authenticated()) {
      app.auth.logout()
    }
  }
}
```
