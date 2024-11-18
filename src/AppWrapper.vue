<template>
    <component :is="currentLayout" />
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router'
  import DefaultLayout from './layouts/DefaultLayout.vue';
  import AuthLayout from './layouts/AuthLayout.vue';
  
  const route = useRoute();
  
  const currentLayout = computed(() => route.path.startsWith('/auth') ? AuthLayout : DefaultLayout);
  </script>