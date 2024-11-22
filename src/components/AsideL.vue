<script setup lang="ts">
  import { ref } from 'vue';

  const isOpen = ref(false);
  const isAnalyzeOpen = ref(false);


</script>
<template>
  <aside class="aside">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Сервисы</h2>
    <ul class="space-y-2">
      <li>
        <router-link to="/" class="block pl-4 py-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900">
          Мониторинг и управление
        </router-link>
      </li>
      <li>
        <div @click="isAnalyzeOpen = !isAnalyzeOpen" class="flex justify-between items-center cursor-pointer pl-4 py-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900">
          <span>Аналитика</span>
          <i :class="['fas transition-transform duration-200', isAnalyzeOpen ? 'fa-chevron-up transform rotate-180' : 'fa-chevron-down']"></i>
        </div>
        <ul v-show="isAnalyzeOpen" class="pl-8 mt-2 space-y-1">
          <li>
            <router-link to="/analyze/eto" class="block pl-4 py-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 text-sm">
              ЭТО
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <div @click="isOpen = !isOpen" class="flex justify-between items-center cursor-pointer pl-4 py-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900">
          <span>Настройка</span>
          <i :class="['fas transition-transform duration-200', isOpen ? 'fa-chevron-up transform rotate-180' : 'fa-chevron-down']"></i>
        </div>
        <ul v-show="isOpen" class="pl-8 mt-2 space-y-1">
          <li>
            <router-link to="/settings/nodes" class="block pl-4 py-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 text-sm">
              Узлы
            </router-link>
          </li>
          <li>
            <router-link to="/settings/users" class="block pl-4 py-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 text-sm">
              Пользователи
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link to="/about" class="block pl-4 py-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900">
          О нас
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.aside {
  background-color: #eee;
  padding: 20px;
  width: 200px;
}
.aside ul li{
  margin-bottom: 0.5rem;

}
</style>