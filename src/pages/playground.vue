<template>
  <div class="playground">
    <h1>Enjoy The Playground!</h1>
    <pre>
      {{ profile }}
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profile: {}
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
    const profile = app.model('profile')
    const message = app.model('message')
    const user = app.auth.user()
    Promise.all([profile.fetch(user.id), message.fetch(user.id)]).then(results => {
      console.log(results)
      // let profile = results[0]
      // let messages = results[1]
      // profile.messages = messages
      // this.profile = profile
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
