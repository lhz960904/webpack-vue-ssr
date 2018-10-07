<template>
  <div>
    <router-view/>
    <router-link :to="{ name: 'A' }" v-text="'to A'"/>
    <router-link :to="{ name: 'B' }" v-text="'to B'"/>
    <div class="store-example">
      <h3>{{ this.$store.state.count }}</h3>
      <button @click="update">updateCount</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    update () {
      const count = Math.round(Math.random() * 100)
      this.$store.commit('updateCount', count)
    }
  }
}
</script>
