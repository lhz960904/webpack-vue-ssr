<template>
  <div>
    <h1>This is page A</h1>
    <h3>{{ this.movie }}</h3>
  </div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchMovie', 26336252)
  },
  computed: {
    movie () {
      return this.$store.state.movie
    }
  }
}
</script>
