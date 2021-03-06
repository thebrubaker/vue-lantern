export default [
  {
    path: '/',
    component: require('layouts/admin'),
    redirect: '/admin',
    children: [
      {
        path: 'home',
        component: require('pages/home'),
        meta: {
          auth: true
        }
      },
      {
        path: 'login',
        component: require('pages/login')
      },
      {
        path: 'playground',
        component: require('pages/playground')
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]
