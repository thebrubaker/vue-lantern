<template>
  <div class="playground">
    <h1>Enjoy The Playground!</h1>
    <button @click="create">Create</button>
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
    create () {
      app.model('users').create({ name: 'Joel Brubaker' }).then(user => {
        user.messages.create({ text: 'woo!' })
        user.posts.create({ text: 'woo!' })
        user.attach(message)
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
