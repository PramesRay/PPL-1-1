<template>
  <LoginSidebar></LoginSidebar>
  <RegisterSidebar></RegisterSidebar>

  <router-view />

  <footer class="bg-accent mt-20 text-secondary">
    <FooterBar></FooterBar>
  </footer>
</template>

<script>
import LoginSidebar from '@/components/LoginSidebar.vue';
import RegisterSidebar from '@/components/RegisterSidebar.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  components: {
    LoginSidebar,
    RegisterSidebar,
    FooterBar,
  }
}

</script>