export default {
  namespaced: true,
  getters: {
    'user' (state) {
      return state.user
    },
    'guard' (state) {
      return state.guard
    }
  },
  modules: {
    user: {
      namespaced: true,
      bootstrap: [
        'getters',
        'mutations'
      ],
      state: {
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        scopes: []
      },
      actions: {
        reset ({ commit }) {
          commit('name', '')
          commit('first_name', '')
          commit('last_name', '')
          commit('email', '')
          commit('scopes', [])
        }
      }
    },
    guard: {
      namespaced: true,
      bootstrap: [
        'getters',
        'mutations'
      ],
      state: {
        token_type: '',
        expires_in: '',
        access_token: '',
        refresh_token: ''
      },
      actions: {
        reset ({ commit }) {
          commit('token_type', '')
          commit('expires_in', '')
          commit('access_token', '')
          commit('refresh_token', '')
        }
      }
    }
  }
}
