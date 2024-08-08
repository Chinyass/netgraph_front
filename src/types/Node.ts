type Port = {
    name: string;
    index: number;
    type_con: 'Fiber' | 'Coper'
    Bandwidth: number //Mbits
    state : boolean
    traffic: number
    connected_to: number | null
}

interface Node {
    ip: string;
    name: string;
    dnsname: string;
    ports: Port[]
    icon : string | null
    last_log: string | null
    model: string
}

interface  Nodes {
    [key: string]: Node
}

export default Nodes