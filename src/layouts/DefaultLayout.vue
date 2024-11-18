<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import AsideL from "../components/AsideL.vue";
import AsideR from "../components/AsideR.vue";

</script>

<template>
  <div class="app">
    <Header />
    <div class="content-wrapper">
      <AsideL />
      <main class="content">
        <router-view />
      </main>
      <AsideR />
    </div>
    <Footer />
    
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content-wrapper {
  display: flex;
  flex-grow: 1; 
}
.content {
  padding: 20px;
  flex: 1; 
}
</style>