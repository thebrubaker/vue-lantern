# Vue Lantern

> A project setup for building large-scale vue.js applications. Many useful tools built in, but totally flexible to use or replace what you don't like or don't need.

## Features

Dependency Container - Declare your dependencies for your application and let bottle.js manage your dependency tree.

``` javascript
app.make('events').fire('example.test', 'This is a test!')
```

Auth - Authenticate and authorize your users with ease. Supports firebase and laravel drivers.

``` javascript
auth.attempt('user@lantern.com', 'password')
auth.allowed(user.scopes)
```

Database & Search - Support for laravel, firebase and algolia out of the box.

``` javascript
search('examples/foo', 'tag')
search.driver('algolia').searchIndex('examples_index', 'tag')
```

Blueprint - Define your data models once, bootstrap your access to data with ease!

``` javascript
model('example').driver('firebase').fetch(1)
model('example').driver('laravel').delete(2)
model('example').driver('algolia').create({ name: 'test', message: 'Hello world!'})
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

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Version Roadmap

- 0.1.0 Firebase Integrated
- 0.2.0 Auth Drivers
- 0.3.0 Vuex Cleanup
- 0.4.0 Vue Cleanup
- 0.5.0 Email / Username Example Login Page
- 0.6.0 Final Check on Bugs
- 0.7.0 Global Catch Block (Experimental)
- 1.0.0 Released
