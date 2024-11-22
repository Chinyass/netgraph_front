<template>
    <div class="relative inline-block text-left" @click.outside="isOpen = false">
      <div>
        <button
          @click="toggleDropdown"
          type="button"
          class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {{ selectedOption }}
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.894.553l5 9a1 1 0 01-.894 1.447H5a1 1 0 01-.894-1.447l5-9A1 1 0 0110 3zm0 3.236L6.618 12h6.764L10 6.236z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
  
      <!-- Выпадающее меню -->
      <div
        v-if="isOpen"
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <button
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            class="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const options = ref<string[]>(['Опция 1', 'Опция 2', 'Опция 3']);
  const selectedOption = ref<string>('Выберите опцию');
  const isOpen = ref<boolean>(false);
  
  function toggleDropdown() {
    isOpen.value = !isOpen.value;
  }
  
  function selectOption(option: string) {
    selectedOption.value = option;
    isOpen.value = false;
  }
  </script>
  
  <style scoped>
  /* Дополнительные стили при необходимости */
  </style>