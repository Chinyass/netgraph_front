
interface aNode {
    id: number
    ip: string
    name: string | null
    model: string | null
    mac: string | null
    ping: boolean
    snmp: boolean
    error: string | null
    location: {
        id: number,
        name: string
    }
    zone: {
        id: number,
        code: number,
        name: string
    }
    address: string | null
    role: number[] | null
}

export default aNode