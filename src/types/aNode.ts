
interface aNode {
    id: number
    ip: string
    name: string | null
    model: string | null
    mac: string | null
    ping: boolean
    snmp: boolean
    error: string | null
    location: string | null
}

export default aNode