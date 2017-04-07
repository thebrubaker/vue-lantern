<template>
<div class="home-page">
  <h1>Vue Lantern [Alpha]</h1>
  <span>A project template for ambitious single-page applications.</span>
  <div class="buttons">
    <button class="button logout" type="button" @click="logout">Logout</button>
    <router-link to="/playground" class="button link" type="button">Playground</router-link>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  props: {

  },
  computed: {

  },
  methods: {
    logout () {
      app.auth.logout()
      app.router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.buttons {
  display: flex;
}
.button {
  margin-top: 10px;
  display: flex;
  font-family: 'Roboto';
  color: #d63c3c;
  outline: none;
  background-color: transparent;
  border-radius: 8px;
  border: none;
  padding: 8px 20px;
  text-transform: uppercase;
  line-height: 20px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  -webkit-appearance: initial;

  &:hover {
    background-color: rgba(0,0,0,0.08);
    cursor: pointer;
  }

  &.logout {
    color: #d63c3c;
  }

  &.link {
    color: #27a7ca;
  }
}
</style>
