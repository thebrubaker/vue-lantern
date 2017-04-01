<template>
<div class="admin-layout">
  <transition name="page" mode="out-in">
    <router-view></router-view>
  </transition>
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

  }
}
</script>

<style lang="scss" scoped>
.admin-layout {
  height: 100%;
}
</style>
