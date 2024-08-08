import { defineStore } from 'pinia'
import { ref } from 'vue'
import Nodes from '../types/Node';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const useNodeStore = defineStore('NodeStore', () => {
    const nodes = ref<Nodes>({});
    async function GetNodes() {
        await delay(2000); // Имитация задержки в 2 секунды
        const newNodes: Nodes = {
            node1: {
                ip: '192.168.1.1',
                name: 'Router1',
                dnsname: 'router.example.com',
                ports: [
                    {
                        name: 'gi0/1',
                        index: 0,
                        type_con: 'Fiber',
                        Bandwidth: 1000,
                        state: true,
                        traffic: 50,
                        connected_to: null
                    },
                    {
                        name: 'gi0/2',
                        index: 1,
                        type_con: 'Coper',
                        Bandwidth: 100,
                        state: false,
                        traffic: 10,
                        connected_to: null
                    }
                ],
                icon: '"&#xe2bd"',
                last_log: null,
                model: 'Cisco'
            },
            node2: { // Добавьте ваш код получения данных для node2
                ip: '192.168.1.2',
                name: 'Router2',
                dnsname: 'router.example.com',
                ports: [
                    {
                        name: 'gi1/0/1',
                        index: 0,
                        type_con: 'Fiber',
                        Bandwidth: 1000,
                        state: true,
                        traffic: 50,
                        connected_to: null
                    },
                    {
                        name: 'gi1/0/2',
                        index: 1,
                        type_con: 'Coper',
                        Bandwidth: 100,
                        state: false,
                        traffic: 10,
                        connected_to: null
                    }
                ],
                icon: '"&#xe2bd"',
                last_log: null,
                model: 'Cisco'
            },
        };
        nodes.value = newNodes;
    }

    return {
        nodes,
        GetNodes
    }
})