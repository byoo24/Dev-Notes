function merge(array1, array2) {
    let res = new Array();

    while(array1.length > 0 && array2.length > 0) {
        if(array1[0] < array2[0]) {
            res.push(array1.shift());
        } else {
            res.push(array2.shift());
        }
    }
    return res.concat(array1, array2);
}

function mergeSort(array) {
    if(array.length <= 1) return array;

    let mid = Math.floor(array.length / 2);
    let left = mergeSort(array.slice(0, mid));
    let right = mergeSort(array.slice(mid));

    return merge(left, right);
}

module.exports = {
    merge,
    mergeSort
};