<template>
  <div class="create">
    <DashBoard v-if="auth ==='true'" ></DashBoard>
  </div>
</template>

<script>
import DashBoard from '@/components/DashBoard.vue'

export default {
  name: 'Dashboard',
   data() {
    return {
      auth: null
    };
  },
   mounted() {
    this.auth = localStorage.getItem('auth');
  },
  components: {
    DashBoard
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
