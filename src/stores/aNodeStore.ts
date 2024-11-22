import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

import aNode from '../types/aNode'

export const useaNodeStore = defineStore('aNodeStore', () => {
    type NodeGroup = {
        _count: number,
        location: string
    }
    const anodes = ref<aNode[]>([]);
    const group_nodes = ref<NodeGroup[]>([])
    const totalCount = ref(0)
    
    const stantions = ref([])

    const backendUrl = "http://10.254.103.51:3000"

    async function fetchaNodes(limit: number, offset: number) {

        try {
            const params: any = {
                limit: limit,
                offset: offset
            }
            
            const response = await axios.post(`${backendUrl}/api/nodes`,null,{
                params: params,
            });
            
            anodes.value = response.data.nodes

            totalCount.value = response.data.total_count

        } catch (error) {
            console.error("Error fetching nodes:", error);
        }
    }

    async function fetchNodesGroup(limit: number, offset: number, groupBy: string) {
        try {
            const params: any = {
                limit: limit,
                offset: offset,
                groupBy: 'location'
            }
            
            const response = await axios.get(`${backendUrl}/api/nodes/group`,{
                params: params,
            });
            console.log(response.data)
            group_nodes.value = response.data
        } catch (error) {
            console.error("Error fetching nodes:", error);
        }
    }

    async function fetchStantions() {
        try {
            const response = await axios.get(`${backendUrl}/api/stantions`);
            console.log(response.data)
            stantions.value = response.data
        } catch (error) {
            console.error("Error fetching nodes:", error);
        }
    }

    return { anodes,group_nodes,stantions, totalCount, fetchaNodes, fetchNodesGroup, fetchStantions }
})