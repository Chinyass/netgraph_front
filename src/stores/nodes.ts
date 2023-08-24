import { defineStore } from 'pinia'
import { ref } from 'vue'

import INode from '../interfaces/node'
import IEdge from '../interfaces/node'
import { getNodes } from '../api/node'

export const useNodeStore = defineStore('node', () => {
    const nodes = ref<Record<string,INode>>({})
    const edges = ref<Record<string,IEdge>>({})
    async function fetchNodes() {
        try {
            const response =  await getNodes()
            nodes.value = response.nodes
            edges.value = response.edges
            console.log(nodes.value)
            console.log(edges.value)
        } catch( err ){
            console.log(err)
        }
        finally {
            console.log('OFF loading')
        }
    }
    return { nodes, edges, fetchNodes }
})