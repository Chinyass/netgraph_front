<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    default: 1
  },
  paginate: {
    type: Function,
    required: true
  }
});

const currentPage = ref(props.currentPage)

const pages = computed(() => {
  const pageCount = Math.ceil(props.totalItems / props.itemsPerPage);
  return Array.from({ length: pageCount }, (_, i) => i + 1);
});

const goToPage = (page) => {
  currentPage.value = page;
  props.paginate(page);
};

// Важно для отслеживания изменений props.filter:
watch(
  () => props.totalItems, // Отслеживаем только totalItems, не props.filter!
  () => {
    // Ничего не нужно делать при изменении props.totalItems,
    // если pagination компонент уже используется для отображения страниц
  }
)
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <!-- ... (Ваша таблица) ... -->
      </table>
      <nav v-if="totalItems > itemsPerPage" class="mt-4">
        <ul class="inline-flex items-center -space-x-px">
          <li v-for="page in pages" :key="page" class="px-2">
            <button
              :class="{ 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' : page === currentPage, 'text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 focus:ring-2 focus:ring-blue-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600 dark:hover:bg-gray-800' : page !== currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </template>