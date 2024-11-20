import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

import aNode from '../types/aNode'

export const useaNodeStore = defineStore('aNodeStore', () => {
    const anodes = ref<aNode[]>([]);
    const totalCount = ref(0)

    const backendUrl = "http://10.254.103.51:3000"

    async function fetchaNodes(limit: number, offset: number) {
        try {
            const response = await axios.get(`${backendUrl}/api/nodes`,{
                params: {
                    limit: limit,
                    offset: offset,
                },
            });
            console.log(response.data)
            anodes.value = response.data.nodes

            totalCount.value = response.data.total_count

        } catch (error) {
            console.error("Error fetching nodes:", error);
        }
    }

    return { anodes, totalCount, fetchaNodes }
})