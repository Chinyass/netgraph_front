<script setup lang="ts">
import {defineConfigs, VNetworkGraph} from "v-network-graph"
import { onMounted,onUnmounted } from "vue"
import { useNodeStore } from '../stores/NodeStore';
const nodeStore = useNodeStore();

const fetchNodes = async () => {
  await nodeStore.GetNodes();
};

let timerId: any = null
onMounted(() => {
  fetchNodes()
  timerId = setInterval(() => {
    for (const t of Object.values(nodeStore.nodes)) {
      t.last_log = Date.now().toString()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId)
  }
})

const edges = {
  edge1: { source: "node1", source_port: 0, target: "node2", target_port: 1, label : "20%" },

  /*edge2: { source: "node1", target: "node3", label : "50%" },
  edge3: { source: "node1", target: "node4", label : "60%" },
  edge4: { source: "node1", target: "node5", label : "80%" },*/
}

const configs = defineConfigs({
node: {
  selectable: true,
  label: {
    directionAutoAdjustment: true
  },
  normal: {
    radius: 20,
  },
  hover: {
    radius: 22,
  },
},
})

</script>

<template>
    <v-network-graph :nodes="nodeStore.nodes" :edges="edges" :configs="configs">
      <template #edge-label="{ edge,scale, ...slotProps }">
      <v-edge-label 
        :text="`${nodeStore.nodes[edge.source].ports[edge.source_port].traffic}`"
        align="center" 
        vertical-align="above" 
        v-bind="slotProps"
        fill="#ff5500"
        :font-size="18 * scale"
      />
      <v-edge-label
          :text="`${nodeStore.nodes[edge.source].ports[edge.source_port].name}`"
          align="source"
          vertical-align="above"
          v-bind="slotProps"
          fill="#ff5500"
          :font-size="18 * scale"
      />
      <v-edge-label
          :text="`${nodeStore.nodes[edge.target].ports[edge.target_port].name}`"
          align="target"
          vertical-align="above"
          v-bind="slotProps"
          fill="#ff5500"
          :font-size="18 * scale"
      />
      </template>
  </v-network-graph>
</template>