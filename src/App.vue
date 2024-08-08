<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AsideL from "./components/AsideL.vue";
import Content from './components/Content.vue'
import AsideR from "./components/AsideR.vue";
import Logger from "./components/Logger.vue";
</script>

<template>
  <div class="app">
    <Header />
    <div class="content-wrapper">
      <AsideL />
      <Content />
      <AsideR />
    </div>
    <Footer />
    <Logger class="fixed top-20 right-56 z-50 bg-gray-100 rounded-lg shadow-md p-4 opacity-70" />
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
</style>