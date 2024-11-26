<script setup lang="ts">
// @ts-ignore
import NodeTable from '../components/NodeTable.vue';
import { useaEtoStore } from '../stores/EtoStroe';
import { computed, onMounted, ref, watch } from 'vue';
import { useaNodeStore } from '../stores/aNodeStore';

const EtoStore = useaEtoStore()

const nodeStore = useaNodeStore()


const items = computed(() => EtoStore.zones.map( el => {
    return {
      name: el.name,
      "Общее количество": el._count.nodes,
      "Станционные оборудования": el.locationCounts.Станция,
      "Узлы доступа": el.locationCounts['Узел доступа']
    }

}))

const columns = [
      { key: "name", sortable: true },
      { key: "Общее количество", sortable: true },
      { key: "Станционные оборудования", sortable: true },
      { key: "Узлы доступа", sortable: true }
    ];

onMounted( async () => {
  await EtoStore.fetchZones()
})

const selectedItems = ref([])
const selectabe = ref(false)


const visiblePagesNode = ref(7);
const currentPageNode = ref(1);
const limitNode = ref(10);

const search_location = ref<any>(null)
const searcy_location_options = ref([
    {
      text: "Все",
      id: null
    },
    {
      text: "Станция",
      id: 1
    },
    {
      text: "Узел доступа",
      id: 2
    }
])
const search_name = ref("")
const search_ip = ref("")
const search_address = ref("")

const filter_form = ref({
  location_value: null,
  location_options: [
    {
      text: "Все",
      value: null,
      id: 1
    },
    {
      text: "Станция",
      value: 1,
      id: 1
    },
    {
      text: "Узел доступа",
      value: 2,
      id: 1
    }
  ],
  name_value: "",
  ip_value: "",
  address_value: "" 
})

const node_items = computed(() => nodeStore.anodes.map( el => {
      return {
        "Оборудование": el.name,
        ip: el.ip,
        "Адрес": el.address,
        "Расположение": el.location.name
      }
}))


function showselectable() {
  selectabe.value = !selectabe.value
}

const zone_id = ref<number>()
const location_id = ref<null | number>(null)

const group_locality = ref(false)

watch(group_locality, async (isChecked) => {
    if (isChecked) {
      await EtoStore.fetchLocality()
    } else {
      await EtoStore.fetchZones()
    }
})

watch(selectedItems, async (newSelectedItems) => {
  showselectable()
  const zone_name = newSelectedItems[0]["name"]
  const zone = await EtoStore.getZoneByName(zone_name)

  zone_id.value = zone.id
  currentPageNode.value = 1
  visiblePagesNode.value = 7
  limitNode.value = 10
  const offset = 0
  location_id.value = null
  search_name.value = ""
  search_ip.value = ""
  search_address.value = ""

  await nodeStore.fetchaNodes(limitNode.value, offset, zone_id.value)

})

// Обработчик изменения страницы
async function changePageNode(newPage:number) {
  currentPageNode.value = newPage;
  const offset = (newPage - 1) * limitNode.value;

  await nodeStore.fetchaNodes(
    limitNode.value, 
    offset, 
    zone_id.value,
    location_id.value,
    search_name.value,
    search_ip.value,
    search_address.value
  )

}

async function filterNode() {

  currentPageNode.value = 1
  visiblePagesNode.value = 7
  limitNode.value = 10
  const offset = 0

  if (search_location.value){
    location_id.value = search_location.value.id
  }
  else {
    location_id.value = null
  }

  await nodeStore.fetchaNodes(
    limitNode.value, 
    offset, 
    zone_id.value,
    location_id.value,
    search_name.value,
    search_ip.value,
    search_address.value
  )

  /*
  await nodeStore.fetchaNodes(
    limitNode.value, 
    offset, 
    zone_id.value,
    filter_form.value.location_value.value,
    filter_form.value.name_value,
    filter_form.value.ip_value,
    filter_form.value.address_value
  )
  */

}
</script>

<template>
  <div style="display: flex; justify-content: center;" >
      <h1>Объекты ЭТО</h1>
  </div>
  <div style="display: flex; justify-content: start;" >
    <VaButton
        class="mb-6"
        @click="showselectable"
    >
        Выбрать объект
    </VaButton>
  </div>
  <VaCheckbox
      v-model="group_locality"
      label="По населенным пунктам"
      left-label
    />

  <div style="display: flex; justify-content: center;" >
    <div style="width: 50%" >
      <VaDataTable
        v-model="selectedItems"
        :items="items"
        :columns="columns"
        :selectable="selectabe"
        select-mode="single"
        virtual-scroller
        :wrapper-size="400"
        :item-size="30"
        sticky-header
        striped
        class="compact-table"
      >
    </VaDataTable>
    </div>
  </div>


  <div  v-if="nodeStore.anodes.length != 0" style="height:50em; margin-top:2%">
    <h1>Оборудования на объекте {{selectedItems[0]["name"]}}</h1>
    <div style="margin-top: 2%;">
      <VaForm
        class="w-[300px]"
        tag="form"
        @submit.prevent="filterNode"
      >
        <VaInput
          v-model="search_name"
          label="Name"
        />

        <VaInput
          v-model="search_ip"
          class="mt-3"
          label="IP"
        />

        <VaInput
          v-model="search_address"
          class="mt-3"
          label="Address"
        />

        <VaSelect
          v-model="search_location"
          class="mt-3"
          label="Расположение"
          :options="searcy_location_options"
          clearable
        />

        <VaButton
          type="submit"
          class="mt-3"
        >
          Поиск
        </VaButton>
      </VaForm>
    </div>

    <div style="width: 80%; margin-left: 3%; display: flex; justify-content: center;" >
      <div>
        <NodeTable 
          :items="node_items" 
          :totalCount="nodeStore.totalCount"
          :limit="limitNode"
          :visiblePages="visiblePagesNode"
          @changePage="changePageNode" 
        />
      </div>
    </div>
  </div>
  
  

</template>

<style scoped>
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