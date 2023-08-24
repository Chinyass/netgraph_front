import INode from "../interfaces/node"

export function getNodes () {
    //return axios.get(`${API_URL}/products/${id}`)
    return new Promise< Record<string,any> >((resolve, reject) => {
        // разрешившийся промис с объектом: платежом в 1000 евро
        // и большое спасибо
        setTimeout(() => {
            resolve(
                {
                    nodes : {
                        node1: { ip: '10.3.0.1',
                                name: 'Thank You',
                            },
                        node2: { name: "Node 2",ip: '10.3.0.2', },
                        node3: { name: "Node 3",ip: '10.3.0.3', },
                        node4: { name: "Node 4", ip: '10.3.0.4', },
                        node5: { name: "Node 5", ip: '10.3.0.5', },
                        node6: { name: "Node 6", ip: '10.3.0.6', },
                        node7: { name: "Node 7", ip: '10.3.0.7', },
                        node8: { name: "Node 8", ip: '10.3.0.8', },
                        node9: { name: "Node 9", ip: '10.3.0.9', },

                        node10: { name: "Node 10", ip: '10.3.0.10', },
                        node11: { name: "Node 11", ip: '10.3.0.11', },
                        node12: { name: "Node 12", ip: '10.3.0.12', },
                    },
                    edges: {
                        edge1: { source: "node1", target: "node2" },
                        edge2: { source: "node2", target: "node3" },
                        edge3: { source: "node3", target: "node4" },
                        edge4: { source: "node2", target: "node5"},
                        edge5: { source: "node2", target: "node6"},
                        edge6: { source: "node3", target: "node7"},
                        edge7: { source: "node3", target: "node8"},
                        edge8: { source: "node3", target: "node9"},

                        edge9: { source: "node5", target: "node10"},
                        edge10: { source: "node5", target: "node11"},
                        edge11: { source: "node5", target: "node12"},
                    }
                }
            )
        }, 1000)
    })
    
}

