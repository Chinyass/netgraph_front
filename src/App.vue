<script setup lang="ts">
import { computed } from 'vue';
import Graph from './components/Graph.vue';
import { useCounterStore } from './stores/counter'
import { useNodeStore } from './stores/nodes'

const store = useCounterStore()
const nodeStore = useNodeStore()

  const links = [
    'Dashboard',
    'Messages',
    'Profile',
    'Updates',
  ]
setTimeout(() => {
  store.increment()
}, 1000)

const doubleValue = computed(() => store.doubleCount)

</script>

<template>
  
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar
          class="me-4 "
          color="grey-darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          :text="link"
          variant="text"
        ></v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="160">
          <v-text-field
            density="compact"
            flat
            hide-details
            label="Search"
            rounded="lg"
            single-line
            variant="solo-filled"
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                  :title="`List Item ${n}`"
                ></v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  color="grey-lighten-4"
                  link
                  title="Refresh"
                ></v-list-item>
              </v-list>
            </v-sheet>
            
            {{store.count}}
            {{ doubleValue }}
            <button @click="store.increment">inc</button>
            {{ nodeStore.nodes }}
            {{ nodeStore.edges }}
            <button @click="nodeStore.fetchNodes">getNodes</button>
          </v-col>
          
          
          <v-col>
           
              <v-sheet
                max-height="70vh"
                rounded="lg"
                :elevation="8"
              >
                  <Graph v-if="Object.keys(nodeStore.nodes).length" :nodes="nodeStore.nodes" :edges="nodeStore.edges" />
                  <v-skeleton-loader v-else type="card" theme="text" loading-text="LOADING" color="gray" height="70vh"></v-skeleton-loader>
                  
                <!--  -->
              </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>