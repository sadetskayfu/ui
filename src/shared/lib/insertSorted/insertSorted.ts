export const insertValueInSortedArray = (sortedArray: number[], number: number, replace: boolean = false) => {
    const index = sortedArray.findIndex((value) => value >= number)
    if(index === -1) {
        sortedArray.push(number)
    } else if (replace && sortedArray[index] === number) {
        sortedArray[index] === number
    } else {
        sortedArray.splice(index, 0, number)
    }
}

export const insertArrayInSortedArray = (sortedArray: number[], array: number[], replace: boolean = false) => {
    array.forEach(value => insertValueInSortedArray(sortedArray, value, replace))
}