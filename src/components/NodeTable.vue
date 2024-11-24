<script setup>
import {ref, onMounted, computed, watch} from 'vue'
import { useaNodeStore } from '../stores/aNodeStore';
import { useGlobalConfig } from "vuestic-ui";

const { mergeGlobalConfig } = useGlobalConfig();

const nodeStore = useaNodeStore();
const limit = ref(10);
const offset = ref(0);
const currentPage = ref(1)
const visible_pages = 7

const pages = computed(() => Math.ceil(nodeStore.totalCount / limit.value) )

const items = computed(() => nodeStore.anodes.map( el => {
    const { id, ...new_item } = el
  return new_item
}))

watch(currentPage, async (newCurrentPage) => {
    currentPage.value = newCurrentPage;
    offset.value = (newCurrentPage - 1) * limit.value;
    await nodeStore.fetchaNodes(limit.value, offset.value)
})

onMounted( async () => {
    await nodeStore.fetchaNodes(limit.value,offset.value)
})

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
    <VaDataTable :items="items"></VaDataTable>
    <VaPagination
        v-model="currentPage"

        preset="darkPagination"
        :pages="pages"
        :visible-pages="visible_pages"
        :total="nodeStore.totalCount"
        boundary-numbers
        buttons-preset="secondary"
        class="justify-center sm:justify-start"
    />
</template>

<style scoped>

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>