<script setup>
import { RouterView } from 'vue-router'

import LoginSidebar from './components/LoginSidebar.vue';
import RegisterSidebar from './components/RegisterSidebar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <LoginSidebar />
  <RegisterSidebar />

  <router-view />

  <footer class="bg-accent mt-20 text-secondary">
    <FooterBar />
  </footer>
</template>
