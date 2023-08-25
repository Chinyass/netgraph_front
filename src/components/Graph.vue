<script setup lang="ts">
import { VNetworkGraph } from "v-network-graph"
import "v-network-graph/lib/style.css"
import { useGraphStore } from '../stores/graph'
import { ref } from "vue"
import * as vNG from "v-network-graph"
import { Nodes, Edges } from "v-network-graph"

const graphStore = useGraphStore()
const graph = ref<vNG.VNetworkGraphInstance>()

const props = defineProps<{
  nodes: Nodes,
  edges: Edges
}>()

const config = graphStore.getConfigs(props.nodes,props.edges)

function updateLayout(direction: "TB" | "LR") {
  // Animates the movement of an element.
  graph.value?.transitionWhile(() => {
    graphStore.setLayout(direction,props.nodes,props.edges)
  })
}

const nextNodeIndex = ref(Object.keys(props.nodes).length + 1)

function addNode() {
  const nodeId = `node${nextNodeIndex.value}`
  const name = `N${nextNodeIndex.value}`
  const ip = `10.3.0.${nextNodeIndex.value}`
  props.nodes[nodeId] = { name, ip }
  nextNodeIndex.value++
}



</script>

<template>
  <v-network-graph
    ref="graph"
    class="graph"
    :nodes="nodes"
    :edges="edges"
    :layouts="graphStore.layouts"
    :configs="config"
  />
</template>

<style scoped>
.graph {
  height: 70vh;
}
</style>
