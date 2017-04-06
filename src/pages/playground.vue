<template>
  <div class="playground">
    <h1>Enjoy The Playground!</h1>
    <button @click="create">Create</button>
    <button @click="fetch">Fetch User</button>
    <pre>
      {{ user }}
    </pre>
    <pre>
      {{ message }}
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: app.auth.user().id,
      user: {},
      message: {}
    }
  },
  components: {

  },
  props: {

  },
  computed: {

  },
  methods: {
    fetch () {
      app.model('users').populate('-Kh0hPKabfhLiBtwMtJN').then(user => {
        user.messages.create({ text: 'This is another message!' })
      })
    },
    create () {
      Promise.all([
        app.model('users').create({ name: 'Joel Brubaker' }),
        app.model('groups').create({ name: 'SD Techies' })
      ]).then(([ user, group ]) => {
        user.link(group)
        user.messages.create({ text: 'This message woo!' })
        user.posts.create({ text: 'This post woo!' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.playground {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
