
<script setup lang="ts">

import { ref, computed, onMounted, watch } from 'vue';
import { useaNodeStore } from '../stores/aNodeStore';
import MyTable from '../components/MyTable.vue';

const data = ref([
  {
    name: 'tes',
    description: 'asdqweqwe'
  },
  {
    name: 'tes',
    description: 'asdqweqwe'
  },
  {
    name: 'tes',
    description: 'asdqweqwe'
  },
  {
    name: 'tes',
    description: 'asdqweqwe'
  }
])
const nodeStore = useaNodeStore();
const isLoading = ref(false);
const searchQuery = ref('');

const searchField = ref('location');
const strict = ref('false');

const limit = ref(10); // Значение по умолчанию
const offset = ref(0); // Значение по умолчанию
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(nodeStore.totalCount / limit.value));

onMounted(async () => {
    await nodeStore.fetchaNodes(limit.value,offset.value);
    await nodeStore.fetchNodesGroup(100,offset.value,'location')
});

function getVisiblePages() {
  if (totalPages.value <= 7) return [];
  const visiblePages = [];
  const start = Math.max(2, currentPage.value - 2);
  const end = Math.min(totalPages.value - 1, currentPage.value + 2);
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }
  return visiblePages;
};

async function performSearch() {
    offset.value = 0; // Сбрасываем offset при новом поиске
    currentPage.value = 1; // Сбрасываем текущую страницу
    await nodeStore.fetchaNodes(limit.value, offset.value, searchField.value, searchQuery.value);
}

async function changePage(newPage: number) {
  if (newPage < 1 || newPage > totalPages.value) return;
  currentPage.value = newPage;
  offset.value = (newPage - 1) * limit.value;
  await nodeStore.fetchaNodes(limit.value, offset.value, searchField.value, searchQuery.value);
}

async function handlePagination(params:any) {
    console.log(params)
}

</script>

<template>
    <div v-if="isLoading">
      <div class="text-center py-4">Загрузка...</div>
    </div>
    <div v-else class="p-4">
      
      <div class="flex items-center justify-between p-3 border rounded-md shadow-sm bg-white max-w-md my-4">
        <input v-model="searchQuery" type="text" placeholder="Поиск..." class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-2 py-1">
        <select v-model="searchField" class="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-2 py-1">
            <option value="name">Name</option>
            <option value="ip">IP</option>
            <option value="location">Location</option>
            <option value="mac">Mac</option>
            <option value="model">Model</option>
        </select>
        <select v-model="strict" class="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-2 py-1">
            <option value="true">Строгий поиск</option>
            <option value="false">Нестрогий поиск</option>
        </select>
        <button @click="performSearch" class="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-3 py-1 ml-2">
            Поиск
        </button>
    </div>

      <p>Кол-во элементов - {{ nodeStore.totalCount }}</p>
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 bg-gray-200 border">Name</th>
            <th class="px-4 py-2 bg-gray-200 border">IP</th>
            <th class="px-4 py-2 bg-gray-200 border">Location</th>
            <th class="px-4 py-2 bg-gray-200 border">Mac</th>
            <th class="px-4 py-2 bg-gray-200 border">Model</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(node,index) in nodeStore.anodes" :key="node.id">
              <td class="border px-4 py-2">{{ node.name }}</td>
              <td class="border px-4 py-2">{{ node.ip }}</td>
              <td class="border px-4 py-2">{{ node.location }}</td>
              <td class="border px-4 py-2">{{ node.mac }}</td>
              <td class="border px-4 py-2">{{ node.model }}</td>
            </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="changePage(1)" :disabled="currentPage === 1">&lt;&lt;</button>
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">&lt;</button>
        <template v-if="totalPages <= 7">
        <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">
            {{ page }}
        </button>
        </template>
        <template v-else>
        <button @click="changePage(1)" :class="{ active: currentPage === 1 }">1</button>
        <span v-if="currentPage > 4">...</span>
        <button v-for="page in getVisiblePages()" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">
            {{ page }}
        </button>
        <span v-if="currentPage < totalPages - 3">...</span>
        <button @click="changePage(totalPages)" :class="{ active: currentPage === totalPages }">{{ totalPages }}</button>
        </template>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">&gt;</button>
        <button @click="changePage(totalPages)" :disabled="currentPage === totalPages">&gt;&gt;</button>
      </div>

      <MyTable
        :data="data"
        :itemsPerPage="10"
        :filter="searchQuery"
        @paginate="handlePagination"
      />

    </div>

  </template>

<style scoped>

.pagination {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center; /* Центрируем пагинацию */
  align-items: center;
  list-style: none;
  padding: 0;
}
.pagination button {
  margin: 0 0.2rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
}
.pagination button.active {
  background-color: #ddd; /* Выделяем активную страницу */
}
.pagination span {
  margin: 0 0.2rem;
}

</style>