import app from 'app'
console.log(app)

export default [
  {
    path: '/',
    component: require('layouts/admin'),
    meta: {
      name: 'Home',
      icon: 'home'
    }
  }
]
