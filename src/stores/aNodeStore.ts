import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

import aNode from '../types/aNode'

export const useaNodeStore = defineStore('aNodeStore', () => {
    const backendUrl = import.meta.env.VITE_API_URL

    type NodeGroup = {
        _count: number,
        location: string
    }
    const anodes = ref<aNode[]>([]);
    const group_nodes = ref<NodeGroup[]>([])
    const totalCount = ref(0)
    
    const stantions = ref([])


    async function fetchaNodes(limit: number, offset: number,zone_id?: number, location_id?: number | null, name?: string | null, ip?: string | null, address?: string | null) {

        try {
            const params: any = {
                limit: limit,
                offset: offset
            }
            
            if (zone_id){
                params["zone_id"] = zone_id
            }
            
            if (location_id) {
                params["location_id"] = location_id
            }

            if (name) {
                params["name"] = name
            }

            if (ip) {
                params["ip"] = ip
            }

            if (address) {
                params["address"] = address
            }

            console.log(params)

            const response = await axios.get(`${backendUrl}/api/nodes`,{
                params: params,
            });
            console.log(response.data)
            anodes.value = response.data.nodes

            totalCount.value = response.data.total_count

        } catch (error) {
            console.error("Error fetching nodes:", error);
        }
    }

    return { anodes,group_nodes,stantions, totalCount, fetchaNodes }
})