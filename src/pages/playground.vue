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
      key: app.auth.user().id,
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
    // fetches profiles ref with messages ref where the key matches.
    app.model('profiles').with('messages').fetch(this.key).then(profile => {
      this.profile = profile
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
