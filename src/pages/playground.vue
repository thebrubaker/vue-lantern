<template>
  <div class="playground">
    <h1>Enjoy The Playground!</h1>
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

  },
  created () {
    app.model('users').fetch(3).then(user => {
      this.user = user.data()
      user.messages.create({ text: 'This is working!' }).then(message => {
        console.log(message)
        this.message = message.data()
      })
    })
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
