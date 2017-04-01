<template>
<div class="login-form">
  <form class="login-form__form" accept-charset="utf-8" @submit.prevent="login">
    <input class="login-form__input" v-model="email" type="email" name="email" placeholder="Email" required>
    <input class="login-form__input" v-model="password" type="password" name="password" placeholder="Password" required>
    <button class="login-form__button" type="submit">Login</button>
  </form>
  <div class="login-form__error">
    {{ error }}
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  components: {

  },
  props: {

  },
  computed: {

  },
  methods: {
    login () {
      app.auth.attempt(this.email, this.password).then(() => {
        app.router.push('/home')
      }).catch(() => {
        this.error = 'Invalid login credentials.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  &__form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    width: 100%;
    align-items: flex-end;
    font-size: 16px;
  }
  &__input {
    font-family: 'Source Sans Pro';
    border: 1px solid rgba(0,0,0,0.2);
    margin: 5px 0;
    padding: 0 10px;
    width: 100%;
    border-radius: 2px;
    line-height: 36px;
  }
  &__button {
    margin-top: 10px;
    display: flex;
    font-family: 'Roboto';
    color: white;
    outline: none;
    background-color: #148ce4;
    border-radius: 4px;
    border: none;
    padding: 8px 20px;
    text-transform: uppercase;
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    min-width: 100px;
    justify-content: center;

    &:hover {
      background-color: darken(#148ce4, 20%);
      cursor: pointer;
    }
  }
  &__error {
    margin-top: 10px;
    color: #f13333;
    max-width: 300px;
  }
}
</style>
