<template>
  <div class="playground">
    <h1>Enjoy The Playground!</h1>
    <button @click="create">Create</button>
    <button @click="fetch">Fetch</button>
    <pre style="width: 600px">
      {{ user }}
    </pre>
    <pre style="width: 600px">
      {{ message }}
    </pre>
    <pre style="width: 600px">
      {{ product }}
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: app.auth.user().id,
      user: {},
      message: {},
      product: {}
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
      app.model('product').fetch(100).then(product => {
        product.category.create({
          name: 'Joels Collection!!!!!'
        }).then(category => {
          console.log(category.products)
          category.delete()
        })
      })
    },
    create () {
      app.model('users').fetch('-Kh0hPKabfhLiBtwMtJN').then(user => {
        user.messages.create({
          text: 'This is a test!'
        })
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
