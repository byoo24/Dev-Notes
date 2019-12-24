function binarySearch(array, target) {
    if(array.length <= 0) return false;

    let mid = Math.floor(array.length / 2);

    if(target < array[mid]) {
        return binarySearch(array.slice(0, mid), target);
    } else if (target > array[mid]) {
        return binarySearch(array.slice(mid+1), target);
    } else {
        return true;
    }
}

function compareNums(target, num) {
    if(target < num) return -1;
    if(target > num) return 1;
    if(target === num) return 0;
}

function binarySearchIndex(array, target) {
    if(array.length <= 0) return -1;

    let mid = Math.floor(array.length / 2);

    switch(compareNums(target, array[mid])) {
        case -1:
            return binarySearchIndex(array.slice(0, mid), target);
        case 0:
            return mid;
        case 1:
            let idx = binarySearchIndex(array.slice(mid + 1), target);
            if (idx > -1) {
                return idx + mid + 1;
            }
    }
    return -1;
}


module.exports = {
    binarySearch,
    binarySearchIndex
};