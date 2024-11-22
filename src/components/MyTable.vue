<script setup>
import { ref, computed, watch } from 'vue';
import Pagination from '../components/Pagination.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 10
  }
  });

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <!-- Заголовок таблицы. Замените на свои заголовки -->
            <th scope="col" class="px-6 py-3">
              Номер
            </th>
            <th scope="col" class="px-6 py-3">
              Название
            </th>
            <th scope="col" class="px-6 py-3">
              Описание
            </th>
            <!-- Добавьте другие заголовки -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </th>
            <td class="px-6 py-4">
              {{ item.name }}
            </td>
            <td class="px-6 py-4">
              {{ item.description }}
            </td>
            <!-- Добавьте другие ячейки -->
          </tr>
        </tbody>
      </table>
        <div v-if="filteredData.length > 0" class="mt-4">
          <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" @paginate="paginate" />
        </div>
    </div>
  </template>