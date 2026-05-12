// Quick test of bubble sort algorithm
const INITIAL_ARRAY = [64, 34, 25, 12, 22, 11, 90];

const swap = (array, firstIndex, secondIndex) => {
  const nextArray = [...array];
  [nextArray[firstIndex], nextArray[secondIndex]] = [
    nextArray[secondIndex],
    nextArray[firstIndex],
  ];
  return nextArray;
};

const generateBubbleSortSteps = (array = INITIAL_ARRAY) => {
  let arr = [...array];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  // Initial state
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: false,
    sorted: [],
    pass: 0,
    comparisons,
    swaps,
    stepCount: 0,
    currentIndex: 0,
  });

  const n = arr.length;

  for (let pass = 0; pass < n - 1; pass++) {
    let swappedInPass = false;

    for (let i = 0; i < n - pass - 1; i++) {
      // Step: Show comparison
      comparisons++;
      // Sorted elements: after pass p, the last (p+1) elements are sorted
      const sortedIndices = Array.from({ length: pass }, (_, idx) => n - 1 - idx);
      
      steps.push({
        array: [...arr],
        comparing: [i, i + 1],
        swapping: false,
        sorted: sortedIndices,
        pass,
        comparisons,
        swaps,
        stepCount: steps.length,
        currentIndex: i,
      });

      // Check if swap needed
      if (arr[i] > arr[i + 1]) {
        arr = swap(arr, i, i + 1);
        swaps++;
        swappedInPass = true;

        // Step: Show swap
        steps.push({
          array: [...arr],
          comparing: [i, i + 1],
          swapping: true,
          sorted: sortedIndices,
          pass,
          comparisons,
          swaps,
          stepCount: steps.length,
          currentIndex: i,
        });
      }
    }

    // If no swaps occurred, array is sorted
    if (!swappedInPass) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: false,
        sorted: Array.from({ length: n }, (_, idx) => idx), // All sorted
        pass,
        comparisons,
        swaps,
        stepCount: steps.length,
        currentIndex: -1,
        isComplete: true,
      });
      break;
    }
  }

  // Final step: All sorted
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: false,
    sorted: Array.from({ length: n }, (_, idx) => idx),
    pass: n - 1,
    comparisons,
    swaps,
    stepCount: steps.length,
    currentIndex: -1,
    isComplete: true,
  });

  return steps;
};

// Test
const steps = generateBubbleSortSteps();
console.log(`Generated ${steps.length} steps`);
console.log('First step:', JSON.stringify(steps[0], null, 2));
console.log('Last step:', JSON.stringify(steps[steps.length - 1], null, 2));
console.log('✅ Algorithm test completed');
