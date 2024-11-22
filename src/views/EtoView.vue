<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue'
import { useaNodeStore } from '../stores/aNodeStore';

const nodeStore = useaNodeStore();
const limit = ref(10); // Значение по умолчанию
const offset = ref(0);
const currentPage = ref(1)

const pages = computed(() => Math.ceil(nodeStore.totalCount / limit.value) )

const items = computed(() => nodeStore.anodes.map( el => { 
  return { name: el.name, address: el.address, location : el.location }
}))

watch(currentPage, async (newCurrentPage) => {

  currentPage.value = newCurrentPage;
  offset.value = (newCurrentPage - 1) * limit.value;
  await nodeStore.fetchaNodes(limit.value, offset.value)

})

onMounted( async () => {
  await nodeStore.fetchaNodes(limit.value,offset.value)
  await nodeStore.fetchStantions()
})
</script>

<template>
    <div class="row items-center">

      <VaDataTable :items="nodeStore.stantions" >
          <template #footer>
            <div class="flex justify-center my-4">
              <VaPagination
                v-model="currentPage"
                :pages="pages"
                :visible-pages="7"
                :total="nodeStore.totalCount"
                buttons-preset="secondary"
                active-page-color="#9AEDB1"
                boundary-numbers
              />
            </div>
          </template>
        </VaDataTable>

      <div class="">
        <VaDataTable :items="items" >
          <template #footer>
            <div class="flex justify-center my-4">
              <VaPagination
                v-model="currentPage"
                :pages="pages"
                :visible-pages="7"
                :total="nodeStore.totalCount"
                buttons-preset="secondary"
                active-page-color="#9AEDB1"
                boundary-numbers
              />
            </div>
          </template>
        </VaDataTable>
      </div>
    </div>
</template>

<style scoped>

</style>