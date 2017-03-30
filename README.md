# Vue Lantern [Alpha]

> A project template for building large vue.js applications. Many useful tools built in, but totally flexible to use or replace what you don't like or don't need.

Take the application for a spin: [vue-lantern](https://lantern-1dd90.firebaseapp.com)

## Features

Dependency Container - Declare your dependencies for your application and let bottle.js manage your dependency tree.

``` javascript
app.bind('api', function (container) {
  return new Api(container.http, config)
})
```

``` javascript
app.make('events').fire('example.test', 'This is a test!')
```

Auth - Authenticate and authorize your users with ease. Supports firebase and laravel drivers.

``` javascript
import { auth } from 'app'

auth.attempt('user@lantern.com', 'password')
auth.allowed(user.scopes)
```

``` html
<button v-guard="['admin', 'submit_tickets']"></button>
<button v-guard:deny="['trial']"></button>
```

Database & Search - Support for laravel, firebase and algolia out of the box.

``` javascript
search('examples/foo', 'tag')
search.driver('algolia').searchIndex('examples_index', 'tag')
```

Blueprint - Define your data model once, bootstrap your access to data with ease!

``` javascript
export default {
  name: 'example',
  driver: 'laravel',
  events: {...},
  module: {...},
  transformRequest () {...},
  transformResponse () {...}
}
```

``` javascript
model('example').create({ name: 'test', message: 'Hello world!'})
model('example').driver('algolia').all()
```

Vuex - Use vuex-bootstrappers to reduce the time it takes to setup your modules.

``` javascript
module: {
  namespaced: true,
  bootstrap: [ 'getters', 'mutations' ],
  state: {
    'name': '',
    'message': ''
  }
}
```

Vue-Router - Write simple middleware to protect routes and reset data store.

``` javascript
export default {

  /**
   * Middlware before the user hits a route.
   * @param  {Lantern} app  The application.
   * @return {undefined}
   */
  handleBefore ({ auth }) {
    return (to, from, next) => {
      // If authenticated and accessing a guest only route, redirect to appropriate page
      if (auth.authenticated() && to.meta && to.meta.guest) {
        return next(config.redirect)
      }

      // If not authenticated and not accessing the guest path, redirect to the guest path
      if (!auth.authenticated() && to.path !== config.guest) {
        return next(config.guest)
      }

      // If the user does not have the given access permissions, throw an error
      if (!auth.routeGuard(to)) {
        return next(false)
      }

      return next()
    }
  }
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### Version Roadmap

- 0.1.0 Firebase Integrated
- 0.2.0 Auth Drivers
- 0.3.0 Vuex Cleanup
- 0.4.0 Vue Cleanup
- 0.5.0 Email / Username Example Login Page
- 0.6.0 Final Check on Bugs
- 0.7.0 Global Catch Block (Experimental)
- 1.0.0 Released
