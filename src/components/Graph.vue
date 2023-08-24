<script setup lang="ts">
import * as vNG from "v-network-graph"
import { VNetworkGraph } from "v-network-graph"
import "v-network-graph/lib/style.css"
import { ref } from "vue";
import { reactive } from "vue"

import { Nodes, Edges, Layouts } from "v-network-graph"

const data = defineProps<{
  nodes: Nodes,
  edges: Edges
}>()

import dagre from "dagre/dist/dagre.min.js"

const layouts: Layouts = reactive({
  nodes: {},
})

const nodeSize = 40

const configs = vNG.defineConfigs({
  view: {
    scalingObjects: true,
    autoPanAndZoomOnLoad: "fit-content",
    onBeforeInitialDisplay: () => layout("TB"),
  },
  node: {
    normal: { radius: nodeSize / 2 },
    label: {
        direction: "south",
        directionAutoAdjustment: true,
        text: "ip"
    }
  },
  edge: {
    normal: {
      color: "#ff00dd",
      dasharray: "0 ",
      
    },
    margin: 4,
    marker: {
      target: {
        
        width: 4,
        height: 4,
      },
    },
  },
})

const graph = ref<vNG.VNetworkGraphInstance>()

function layout(direction: "TB" | "LR") {
  if (Object.keys(data.nodes).length <= 1 || Object.keys(data.edges).length == 0) {
    return
  }

  // convert graph
  // ref: https://github.com/dagrejs/dagre/wiki
  const g = new dagre.graphlib.Graph()
  // Set an object for the graph label
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSize * 2,
    edgesep: nodeSize,
    ranksep: nodeSize * 2,
  })
  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(() => ({}))

  // Add nodes to the graph. The first argument is the node id. The second is
  // metadata about the node. In this case we're going to add labels to each of
  // our nodes.
  Object.entries(data.nodes).forEach(([nodeId, node]) => {
    g.setNode(nodeId, { label: node.name, width: nodeSize, height: nodeSize })
  })

  // Add edges to the graph.
  Object.values(data.edges).forEach(edge => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g)

  g.nodes().forEach((nodeId: string) => {
    // update node position
    const x = g.node(nodeId).x
    const y = g.node(nodeId).y
    layouts.nodes[nodeId] = { x, y }
  })
}

function updateLayout(direction: "TB" | "LR") {
  // Animates the movement of an element.
  graph.value?.transitionWhile(() => {
    layout(direction)
  })
}


  //const edges = {
  //  edge1: { source: "node1", target: "node2" },
  //  edge2: { source: "node2", target: "node3" },
 //   edge3: { source: "node3", target: "node4" },
 // }


</script>

<template>
  <v-network-graph
    ref="graph"
    class="graph"
    :nodes="nodes"
    :edges="edges"
    :layouts="layouts"
    :configs="configs"
  />
</template>

<style scoped>
.graph {
  height: 70vh;
}
</style>
