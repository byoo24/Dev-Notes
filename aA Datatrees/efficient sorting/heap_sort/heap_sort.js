function maxHeapSort(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        maxHeapify(array, array.length, i);
    }

    for (let endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {
        swap(array, endOfHeap, 0);
        maxHeapify(array, endOfHeap, 0);
    }

    return array;
}


function maxHeapify(array, n, i) {
    let leftIdx = 2 * i + 1;
    let rightIdx = 2 * i + 2;

    let leftVal = array[leftIdx];
    let rightVal = array[rightIdx];

    if (leftIdx >= n) leftVal = -Infinity;
    if (rightIdx >= n) rightVal = -Infinity;

    if (array[i] > leftVal && array[i] > rightVal) return;

    let swapIdx;
    if (leftVal < rightVal) {
        swapIdx = rightIdx;
    } else {
        swapIdx = leftIdx;
    }
    swap(array, i, swapIdx);
    maxHeapify(array, n, swapIdx);
}


function swap(array, i, j) {
    [ array[i], array[j] ] = [ array[j], array[i] ];
}



let arr = [320, 23, 12, 1, 0, 53, 23, 64, 37, 865, 56, 70, 454, 34, 21, 3, 4, 5, 6, 7];
console.log(maxHeapSort(arr));