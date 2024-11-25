<script setup>
import { ref, computed } from 'vue';
import { useGlobalConfig } from "vuestic-ui";

const { mergeGlobalConfig } = useGlobalConfig();

// Определяем пропсы
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 10,
  },
  visiblePages: {
    type: Number,
    default: 7,
  },
});

// Определяем события, которые компонент может эмитить
const emits = defineEmits(['changePage']);

// Текущая страница
const currentPage = ref(1);

// Функция, вызываемая при изменении страницы
function onPageChange(newPage) {
  currentPage.value = newPage;
  emits('changePage', newPage);
}

// Вычисляем общее количество страниц
const pages = computed(() => Math.ceil(props.totalCount / props.limit));

// Настраиваем глобальные настройки VaPagination
mergeGlobalConfig({
  components: {
    presets: {
      VaPagination: {
        darkPagination: {
          color: "textPrimary",
          activePageColor: "textPrimary",
        }
      },
    },
  },
});

</script>

<template>
  <VaDataTable :items="props.items" class="compact-table"></VaDataTable>
  <VaPagination
    v-model="currentPage"
    preset="darkPagination"
    :pages="pages"
    :visible-pages="props.visiblePages"
    :total="props.totalCount"
    boundary-numbers
    buttons-preset="secondary"
    class="justify-center sm:justify-start"
    @update:model-value="onPageChange"
  />
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
.compact-table {
  font-size: 12px; /* Уменьшаем размер шрифта */
}

.compact-table .va-data-table__th,
.compact-table .va-data-table__td {
  padding: 4px 8px; /* Уменьшаем отступы в ячейках */
}

.compact-table .va-data-table__th {
  font-weight: bold;
}

.compact-table .va-data-table__td {
  /* Дополнительные стили для ячеек */
}

/* Если нужно уменьшить высоту строки */
.compact-table .va-data-table__tr {
  height: 32px; /* Устанавливаем требуемую высоту строки */
}
</style>