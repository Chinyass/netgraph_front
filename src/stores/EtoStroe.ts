import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

import Zone from '../types/Zone'

export const useaEtoStore = defineStore('EtoStore', () => {
    const backendUrl = import.meta.env.VITE_API_URL

    const zones = ref<Zone[]>([])

    async function fetchZones() {
        try{
            const response = await axios.get(`${backendUrl}/api/zones`)
            zones.value = response.data
        } catch (error) {
            console.error("Error fetching zones:", error);
        }
    }

    async function fetchLocality() {
        try{
            const response = await axios.get(`${backendUrl}/api/locality`)
            zones.value = response.data
        } catch (error) {
            console.error("Error fetching zones:", error);
        }
    }

    async function getZoneByName(name: string) {
        try{
            const response = await axios.get(`${backendUrl}/api/zones/name/${name}`)
            return response.data
        } catch (error) {
            console.error("Error fetching zones:", error);
        }
    }

    return {zones, fetchZones, fetchLocality, getZoneByName}
})