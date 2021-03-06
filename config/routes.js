import auth from '../utils/auth.js'

function redirectToLogin(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login')
  }
}

function redirectToDashboard(nextState, replaceState) {
  if (auth.loggedIn()) {
    replaceState(null, '/')
  }
}

export default {
  component: require('../components/App'),
  childRoutes: [
    { path: '/logout',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../components/Logout'))
        })
      }
    },
    { path: '/posts',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../components/Posts'))
        })
      }
    },
    { path: '/register',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../components/Register'))
        })
      }
    },
    { path: '/home',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../components/Landing'))
        })
      }
    },
    { onEnter: redirectToDashboard,
      childRoutes: [
        // Unauthenticated routes
        // Redirect to dashboard if user is already logged in
        { path: '/login',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../components/Login'))
            })
          }
        }
        // ...
      ]
    },

    { onEnter: redirectToLogin,
      childRoutes: [
        // Protected routes that don't share the dashboard UI
        { path: '/user/:id',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../components/User'))
            })
          }
        }
        // ...
      ]
    },

    { path: '/',
      getComponent: (location, cb) => {
        // Share the path
        // Dynamically load the correct component
        if (auth.loggedIn()) {
          return require.ensure([], (require) => {
            cb(null, require('../components/Dashboard'))
          })
        }
        return require.ensure([], (require) => {
          cb(null, require('../components/Landing'))
        })
      },
      childRoutes: [
        { onEnter: redirectToLogin,
          childRoutes: [
            // Protected nested routes for the dashboard
            { path: '/page2',
              getComponent: (location, cb) => {
                require.ensure([], (require) => {
                  cb(null, require('../components/PageTwo'))
                })
              }
            }
            // ...
          ]
        }
      ]
    }

  ]
}
