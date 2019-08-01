function quickSort(array) {
    if (array.length <= 1) return array;

    let pivot = array[0];

    let left = array.slice(1).filter(el => el < pivot);
    let right = array.slice(1).filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return leftSorted.concat(pivot, rightSorted);
}


module.exports = {
    quickSort
};