function spaceship(target, el) {
    if (target < el) return -1;
    if (target > el) return 1;
    return 0;
}

function binarySearch(array, target) {
    if (array.length <= 0) return false;

    let mid = Math.floor(array.length / 2);

    switch( spaceship(target, array[mid]) ) {
        case -1:
            return binarySearch(array.slice(0, mid), target);
        case 0:
            return true;
        case 1:
            return binarySearch(array.slice(mid+1), target);
    }
    return false;
}

// Avoiding the use of Array.slice() to improve time and space complexity.
function binarySearchIndex(array, target, lo=0, hi=array.length-1) {
    if (lo === hi) return -1;

    let mid = Math.floor((lo + hi) / 2);

    switch( spaceship(target, array[mid]) ) {
        case -1:
            return binarySearchIndex(array, target, lo, mid);
        case 0:
            return mid;
        case 1:
            return binarySearchIndex(array, target, mid+1, hi);
    }

    return -1;
}


module.exports = {
    binarySearch,
    binarySearchIndex
};