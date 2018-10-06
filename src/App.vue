<template>
  <div class="example">
    <h1>{{ firstName + ' ' + lastName }}</h1>
    <h2>{{ name }}</h2>
    <input type="text" v-model="count">
    <h2>{{ $store.state.count }}</h2>
    <button @click="update">修改</button>
    <router-view/>
    <router-link :to="{ name: 'A' }" v-text="'to a'"/>
    <router-link :to="{ name: 'Test' }" v-text="'to test'"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      count: 0,
      firstName: 'li',
      lastName: 'haoze'
    }
  },
  computed: {
    name () {
      return this.firstName + '  ' + this.lastName
    }
  },
  methods: {
    update () {
      window.alert('test')
      this.$store.commit('updateCount', this.count)
    }
  }
}
</script>

<style lang="stylus">
.example
  color: #0000ff

</style>
