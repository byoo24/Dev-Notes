# *Table of Contents*
1. Naive Sorting Algorithms:
    1. [Bubble Sort](#bubble-sort)
    2. [Selection Sort](#selection-sort)
    3. [Insertion Sort](#insertion-sort)
2. Efficient Sorting Algorithms:
    1. [Merge Sort](#merge-sort)
    2. [Quick Sort](#quick-sort)
    3. [Radix Sort](#radix-sort)
    4. [Counting Sort](#counting-sort)


# Bubble Sort
* Time Complexity: O(n^2)
* Space Complexity: O(1)

<img src="https://raw.githubusercontent.com/byoo24/Dev-Notes/master/images/BubbleSort.gif" width="500">


```javascript
function bubbleSort(arr) {
    let sorted = false;

    while(!sorted) {
        sorted = true;

        for (let i = 0; i < arr.length - 1; i++) {
            if(arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                sorted = false;
            }
        }
    }

    return arr;
}


function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}
```



# Selection Sort
* Time Complexity: O(n^2)
* Space Complexity: O(1)

<img src="https://raw.githubusercontent.com/byoo24/Dev-Notes/master/images/SelectionSort.gif" width="500">

```javascript
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        swap(arr, i, minIndex);
    }
}


function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}
```




# Insertion Sort
* Time Complexity: O(n^2)
* Space Complexity: O(1)

<img src="https://raw.githubusercontent.com/byoo24/Dev-Notes/master/images/InsertionSort.gif" width="500">

```javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currElement = arr[i];

        for (var j = i - 1; j >= 0 && currElement < arr[j]; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = currElement;
    }
    return arr;
}
```



# Merge Sort
* Time Complexity: O(n log(n))
* Space Complexity: O(n)

<img src="https://raw.githubusercontent.com/byoo24/Dev-Notes/master/images/MergeSort.gif" width="500">

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let midIdx = Math.floor(arr.length / 2);
    let leftHalf = arr.slice(0, midIdx);
    let rightHalf = arr.slice(midIdx);

    let sortedLeft = mergeSort(leftHalf);
    let sortedRight = mergeSort(rightHalf);

    return merge(sortedLeft, sortedRight);
}


function merge(arr1, arr2) {
    let merged = [];

    while (arr1.length || arr2.length) {
        let ele1 = arr1.length ? arr1[0] : Infinity;
        let ele2 = arr2.length ? arr2[0] : Infinity;

        let next;
        if (ele1 < ele2) {
            next = arr1.shift();
        } else {
            next = arr2.shift();
        }

        merged.push(next);
    }

    return merged;
}
```




# Quick Sort
* Time Complexity: O(n log(n))
    * Worst Case: O(n^2)
* Space Complexity: O(n)

<img src="https://raw.githubusercontent.com/byoo24/Dev-Notes/master/images/QuickSort.gif" width="500">

```javascript
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    let pivot = arr.shift();
    let left = arr.filter(el => el < pivot);
    let right = arr.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return [...leftSorted, pivot, ...rightSorted];
}
```




# Radix Sort
* Time Complexity: O(n * k)
* Space Complexity: O(n + k)

Radix Sort is a non-comparison, integer sorting algorithm.  It is most often used on lists of binary numbers, but that doesn't mean that its only application is to sort cryptic machine code! All sorts of data can be converted into binary format before being processed, including long strings of text and image data. Regardless of the type of data we'd like to sort, it is critical that all data be converted to binary (or some other integer representation) before Radix Sort is invoked.

The reason we can only run Radix Sort on integer data is because it works by exploiting some specific properties of that data type. Numbers have meta information about themselves baked into their representation - and we're going to take advantage of it.

When working with positive numbers, we know that any 3 digit number is greater than any other 2 digit number. The individual digits themselves are irrelevant. We can write our algorithm without actually comparing any values, simply sorting based on an integer's digit-length.

<img src="https://raw.githubusercontent.com/byoo24/Dev-Notes/master/images/RadixSort.gif" width="500">

| Helper Function | Question | Returns |
| --- | --- | --- |
| `getDigitFrom(num, place)` | What digit is at the given `place` value in `num`? | integer |
| `getIntLength(num)` | How many digits are in `num`? | integer | 
| `getMaxDigits(num)` | How many digits does the integer with the most digits have? | integer |


```javascript
const getDigitFrom = (num, place) => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;


// Special case where `num === 0` is due to log10(0) = -Infinity
const getIntLength = (num) => (num === 0) ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1;


function getMaxDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, getIntLength(nums[i]));
    }
    return maxDigits;
}


function radixSort(arr) {
    if (!Array.isArray(arr)) return null;

    let maxDigits = getMaxDigits(arr);
    for (let k = 0; k < maxDigits; k++) {
        let buckets = Array.from({length: 10}, () => []); // Array of empty arrays

        for (let i = 0; i < arr.length; i++) {
            let digit = getDigitFrom(arr[i], k);
            buckets[digit].push(arr[i]);
        }
        arr = [].concat(...buckets);
    }
    return arr;
}
```



```javascript
function radixSortWithNegatives(arr) {
  if (!Array.isArray(arr)) {
    return null;
  }

  var negatives = arr.filter(item => item < 0);
  var negativesSorted = [];
  if (negatives.length > 0) {
    negativesSorted = radixSort(negatives.map(item => Math.abs(item)))
                        .reverse()
                        .map(item => -item);
  }

  var positives = arr.filter(item => item >= 0);
  let maxDigits = getMaxDigits(positives);

  for(let k = 0; k < maxDigits; k++){
    let buckets = Array.from({length: 10}, () => []);

    for (let i = 0; i < positives.length; i++) {
        let digit = getDigitFrom(positives[i], k);
        buckets[digit].push(positives[i]);
    }
    positives = [].concat(...buckets);
  }
  return negativesSorted.concat(positives);
}
```




# Counting Sort
* Time Complexity: O(n + k)
* Space Complexity: O(k)

Counting Sort is another non-comparison, integer sorting algorithm. It can only be used in the special case where we are sorting integer data. Additionally, we must know the largest interger value in the input array (which we'll refer to as k) prior to beginning our sort. (Or...we must be willing to take the time to search for it first.)

The reason we can only run Counting Sort on integer data is similar to Radix Sort; because it works by exploiting some specific properties of the integer data type. In this case, the property we're exploiting about integers is simpler, and is linked to our friend the array data structure. We're simply going to take advantage of the fact that an arrays indices are integers, and that they are pre-sorted for us. We'll use an array data structure as a storage device for us to count the number of occurences of each integer in our input array. (Thus, the name "Counting Sort".)

<img src="https://raw.githubusercontent.com/byoo24/Dev-Notes/master/images/CountingSort.gif" width="500">

```javascript
function countingSort(arr, max) {
    const result = [];
    const counters = new Array(max + 1).fill(0);

    for (let i = 0; i < arr.length; i++) {
        counters[arr[i]]++;
    }

    for (let i = 0; i < counters.length; i++) {
        while(counters[i] > 0) {
            result.push(i);
            counters[i]--;
        }
    }

    return result;
}
```