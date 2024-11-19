
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useaNodeStore } from '../stores/aNodeStore';

const nodeStore = useaNodeStore();
const isLoading = ref(false);
const searchQuery = ref('');
const groupBy = ref('');
const limit = ref(10); // Значение по умолчанию
const offset = ref(0); // Значение по умолчанию
const currentPage = ref(1);
const totalPages = ref(0);


watch(nodeStore.anodes, () => {
    //Обновляем общее количество страниц при каждом изменении anodes
    totalPages.value = Math.ceil(nodeStore.totalCount / limit.value);
}, {deep: true});

onMounted(async () => {
    await nodeStore.fetchaNodes(limit.value,offset.value);
});


async function changePage(newPage: number) {
  console.log("Changing page to:", newPage);
    if (newPage < 1 || newPage > totalPages.value) return; // Проверка на границы пагинации
    currentPage.value = newPage;
    offset.value = (newPage - 1) * limit.value;
    await nodeStore.fetchaNodes(limit.value, offset.value);
}

</script>

<template>
    <div v-if="isLoading">
      <div class="text-center py-4">Загрузка...</div>
    </div>
    <div v-else class="p-4">
      <div class="flex items-center space-x-4 mb-4">
        <input v-model="searchQuery" type="text" placeholder="Поиск..." class="border rounded p-2 w-64">
        <select v-model="groupBy" class="border rounded p-2">
          <option value="">Без группировки</option>
          <option value="location">По локации</option>
          <option value="ip">По IP</option>
        </select>
      </div>
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 bg-gray-200 border">ID</th>
            <th class="px-4 py-2 bg-gray-200 border">Name</th>
            <th class="px-4 py-2 bg-gray-200 border">IP</th>
            <th class="px-4 py-2 bg-gray-200 border">Location</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="node in nodeStore.anodes" :key="node.id">
              <td class="border px-4 py-2">{{ node.id }}</td>
              <td class="border px-4 py-2">{{ node.name }}</td>
              <td class="border px-4 py-2">{{ node.ip }}</td>
              <td class="border px-4 py-2">{{ node.location }}</td>
            </tr>
        </tbody>
      </table>

      <div class="flex justify-center mt-4">
            <button @click="changePage(currentPage - 1)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    :disabled="currentPage === 1">
                Назад
            </button>

            <span class="px-2">{{ currentPage }} из {{ totalPages }}</span>

            <button @click="changePage(currentPage + 1)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    :disabled="currentPage === totalPages || totalPages === 0">
                Вперед
            </button>
      </div>

    </div>
  </template>