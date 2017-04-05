# What is Lantern?

Lantern is a top-level application layer that registers your services and provides you access to them. You might be used to Vue.js being your container for everything (this.$http and this.$store), but with Lantern we make Vue just one of many services our application uses, rather than the center.

``` javascript
app.search('products_index', 'Sweaters') // algolia
app.api.get('/products') // axios
app.log('Failed access attempt.') // rollbar
app.auth.attempt(email, password) // firebase
app.view.render(RootComponent) // vue.js
app.callout('This route is restricted.') // custom component
```

If you don't want to call app[service] every time, you can also import only what you need.

``` javascript
import { events } from 'app'

events.fire('product.created', newProduct)
```

Lantern leverages bottle.js as a dependency injection container to create these services. You can read more about why [dependency injection is awesome](https://github.com/young-steveo/bottlejs). The drawback is that we add some complexity and configuration to our app. So why does Lantern use it? Because it helps us manage our dependencies and provides a nice location to boot up our services.

``` javascript
// src/config/providers.js
export default [
  require('src/app/providers/api'),
  require('src/app/providers/app'),
  require('src/app/providers/auth'),
  require('src/app/providers/events'),
  require('src/app/providers/http'),
  require('src/app/providers/model'),
  require('src/app/providers/router'),
  require('src/app/providers/search'),
  require('src/app/providers/store'),
  require('src/app/providers/view')
]
// src/app/Lantern.js
boot (providers) {
  providers.forEach(provider => {
    provider.boot(this)
  })
}
// src/main.js
import providers from 'src/config/providers'

app.boot(providers)
```

Let's start with a very simple example. Let's add [firebase](https://firebase.google.com/) to our application so we can get some access to a real-time database. Firebase requires you to initialize the library with some configuration, so let's do that in what we're going to call a *Service Provider*.

``` javascript
// src/app/providers/firebase.js
import config from 'config/firebase'

function boot (app) {
  app.bind('firebase', function () {
    return firebase.initializeApp(config)
  })
}
```

The boot function above configured an instance of firebase to the name 'firebase'. Now whenever you call `app.make('firebase')` it will return the initialized firebase service. To make this simpler to access, you can add an alias to `config/app.aliases` and it will be available as `app.firebase`.

``` javascript
// src/config/app
aliases: [
  'http',
  'router',
  ...
  'firebase'
]
```

Of course that's a lot of overhead just to configure firebase. Let's take a look at an example that requires a number dependencies to function.

Let's make an Authentication Service with a few simple methods, such as `login()` and `logout()`, which will send requests to an API and store the user in our Data Store.

``` javascript
export default class AuthService {

  constructor(api, store, router) {
    this.api = api
    this.store = store
    this.router = router
  }

  login (email, password) {
    this.api.post('/login', { email, password }).then(user => {
      this.store.commit('auth/user', user)
    })
  }

  logout () {
    this.api.post('/logout').then(user => {
      this.store.commit('auth/user', null)
      this.router.push('/login')
    })
  }
}
```

Our Authentication Service has three dependencies, the API, our DataStore and the Router, each of which may have dependencies of their own. Each service is bound to the container, and the container is used to access these services when needed.

``` javascript
function boot (app) {
  app.bind('api', function (container) {
    // return axios with a baseURL to our API
  })
  app.bind('store', function (container) {
    // return vuex instance
  })
  app.bind('router', function (container) {
    // return vue-router instance
  })
  app.bind('auth', function (container) {
    // retrieve each dependency from the container
    return new AuthService(container.api, container.store, container.router)
  })
}
````

The first time we ask for the AuthService through `app.make('auth')` (or `app.auth` if you register the alias) our dependency injection engine will look at the dependencies `api`, `store` and `router` and create these services. When making those services, the container will see each dependency required, and make those services, and so on and so on. Once you've registered your services, they can be accessed in any order, and the container will manage the tree of dependencies.

You'll notice `app` is one of a handful of global webpack variables, allowing you to use it whenever you need it. But don't worry, `app` isn't a global Window variable. Webpack will make sure it's only injected when it is used (although when debugging is enabled, it actually is available on Window.app so you can mess around).
