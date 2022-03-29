<template>
  <div class="Dashboard">
    <DashBoard v-if="auth ==='true'" ></DashBoard>
    <h3 v-else>Você precisa estar logado para ver esta página</h3>
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
