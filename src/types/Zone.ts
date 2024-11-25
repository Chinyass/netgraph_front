interface Zone {
    id: number
    code: string
    name: string
    _count: {
        nodes: number
    }
    locationCounts: {
        "Станция": number
        "Узел доступа": number
    }
}

export default Zone