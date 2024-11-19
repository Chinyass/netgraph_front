import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

import aNode from '../types/aNode'

export const useaNodeStore = defineStore('aNodeStore', () => {
    const anodes = ref<aNode[]>([]);
    const totalCount = ref(0)

    const backendUrl = "http://localhost:3000"

    async function fetchaNodes(limit: number, offset: number) {
        try {
            const response = await axios.get(`${backendUrl}/api/nodes`,{
                params: {
                    limit: limit,
                    offset: offset,
                },
            });
            console.log(response.data)
            console.log(response.headers)
            anodes.value = response.data
            totalCount.value = response.headers['x-total-count']
                    ? parseInt(response.headers['x-total-count'])
                    : 0;

        } catch (error) {
            console.error("Error fetching nodes:", error);
        }
    }

    return { anodes, totalCount, fetchaNodes }
})