<template>
  <div>
    <router-view/>
    <router-link :to="{ name: 'A' }" v-text="'to A'"/>
    <router-link :to="{ name: 'B' }" v-text="'to B'"/>
    <div class="store-example">
      <!-- <h3>{{ this.$store.state.count }}</h3> -->
      <button @click="update">updateCount</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchCount', route.params.id)
  },
  methods: {
    update () {
      alert('hi')
      // const count = Math.round(Math.random() * 100)
      // this.$store.commit('updateCount', count)
    }
  }
}
</script>
