interface Item<L> {
    id: string
    label: L
}

export const getItemOnId = <L>(data: Item<L>[], id: string): Item<L> => {
    const item = data.filter((item) => item.id === id)
    return item[0]
}