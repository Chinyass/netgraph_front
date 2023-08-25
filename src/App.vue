<script setup lang="ts">
import { onMounted } from 'vue';
import Graph from './components/Graph.vue';
import { useNodeStore } from './stores/nodes'


const nodeStore = useNodeStore()
const links = [
  'Поисковая часть',
  'Мониторинг',
  'Учет',
  'Песочница',
  'База знаний ЦЭТ',
]

onMounted(() => {
  nodeStore.fetchNodes()
})

</script>

<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar class="me-4 " color="grey-darken-1" size="32"></v-avatar>
        <v-app-bar-title>Netgraph v0.0.1</v-app-bar-title>
        <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="160">
          <v-text-field density="compact" flat hide-details label="Search" rounded="lg" single-line
            variant="solo-filled"></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item link title="VLAN"></v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item color="grey-lighten-4" link title="Refresh"></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>


          <v-col>
            <v-select clearable label="Карта сети"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              variant="solo-filled"></v-select>
            <v-sheet max-height="70vh" rounded="lg" :elevation="8">
              
              <Graph v-if="Object.keys(nodeStore.nodes).length" :nodes="nodeStore.nodes" :edges="nodeStore.edges" />
              <div v-else class="d-flex justify-center">
                <v-progress-circular
                  color="warning"
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </div>
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-col class="text-center mt-4" cols="12">
        <strong>TVSI CET Chingis Mongush</strong> — {{ new Date().getFullYear() }}

      </v-col>
    </v-row>
  </v-footer>
  </v-app>
</template>
<style>
.progressbar{
  margin-left: auto !important;
  margin-right: auto !important;
}

</style>