function merge(arr, tempArray, low, mid, high) {
    let i = low;
    let j = mid;
    let k = low;

    while (i < mid && j <= high) {
        if (arr[i] < arr[j]) {
            tempArray[k] = arr[i];
            i++;
            k++;
        } else {
            tempArray[k] = arr[j];
            j++;
            k++;
        }
    }

    while (i < mid) {
        tempArray[k] = arr[i];
        i++;
        k++;
    }

    while (j <= high) {
        tempArray[k] = arr[j];
        j++;
        k++;
    }

    for (let i = low; i <= high; i++) {
        arr[i] = tempArray[i];
    }
}

function mergeSort(arr, tempArray, low, high) {
    if (low >= high) {
        return;
    } else {
        const mid = Math.floor((low + high) / 2);
        mergeSort(arr, tempArray, low, mid);
        mergeSort(arr, tempArray, mid + 1, high);
        merge(arr, tempArray, low, mid + 1, high);
    }
}

// Assuming input is read from a file or another source
const sizeOfArray = parseInt(prompt("Enter Size of Array:"));
const arr = [];
const tempArray = [];

console.log("");
for (let i = 0; i < sizeOfArray; i++) {
    arr[i] = parseInt(prompt(`Input Array[${i}]:`));
}

mergeSort(arr, tempArray, 0, sizeOfArray - 1);

console.log(arr.join(" "));

//Solution : 2407905288
