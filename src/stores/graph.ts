import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import dagre from "dagre/dist/dagre.min.js"
import { Nodes, Edges, Layouts } from "v-network-graph"
import * as vNG from "v-network-graph"
import { useNodeStore } from './nodes'

export const useGraphStore = defineStore('graph', () => {
    const layouts: Layouts = reactive({
        nodes: {},
    })
    const ACTIVE = "#00ee00"
    const INACTIVE = "#ff0000"
    const nodeSize = ref(40)

    function getConfigs(nodes: Nodes, edges: Edges) {
        return vNG.defineConfigs({
            view: {
                scalingObjects: true,
                autoPanAndZoomOnLoad: "fit-content",
                onBeforeInitialDisplay: () => setLayout("TB", nodes, edges),
            },
            node: {
                normal: { radius: nodeSize.value / 2 },
                label: {
                    direction: "south",
                    directionAutoAdjustment: true,
                    text: "ip"
                }
            },
            edge: {
                normal: {
                    color: "gray",
                    dasharray: "0 ",

                },
                margin: 2,
                marker: {
                    source: {
                        type: "circle",
                        width: 5,
                        height: 5,
                        margin: 1,
                        color: ACTIVE,
                    },
                    target: {
                        type: "circle",
                        width: 5,
                        height: 5,
                        margin: 1,
                        color: INACTIVE,
                      },
                },
            },
        })
    }

    function setLayout(direction: "TB" | "LR", nodes: Nodes, edges: Edges) {

        if (Object.keys(nodes).length <= 1 || Object.keys(edges).length == 0) {
            return
        }
        layouts.nodes = {}
        // convert graph
        // ref: https://github.com/dagrejs/dagre/wiki
        const g = new dagre.graphlib.Graph()
        // Set an object for the graph label
        g.setGraph({
            rankdir: direction,
            nodesep: nodeSize.value * 2,
            edgesep: nodeSize.value,
            ranksep: nodeSize.value * 2,
        })
        // Default to assigning a new object as a label for each new edge.
        g.setDefaultEdgeLabel(() => ({}))

        // Add nodes to the graph. The first argument is the node id. The second is
        // metadata about the node. In this case we're going to add labels to each of
        // our nodes.
        Object.entries(nodes).forEach(([nodeId, node]) => {
            g.setNode(nodeId, { label: node.name, width: nodeSize.value, height: nodeSize.value })
        })

        // Add edges to the graph.
        Object.values(edges).forEach(edge => {
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


    
    return { layouts, nodeSize, getConfigs, setLayout }
})