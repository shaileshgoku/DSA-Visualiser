/**
 * Bubble Sort Algorithm - Step-by-step generator
 * 
 * Time Complexity:
 * - Best: O(n) when array is already sorted
 * - Average: O(n²)
 * - Worst: O(n²)
 * 
 * Space Complexity: O(1)
 */

export const INITIAL_ARRAY = [64, 34, 25, 12, 22, 11, 90];

export const createInitialState = (array = INITIAL_ARRAY) => ({
  array: [...array],
  comparing: [],
  swapping: false,
  sorted: [],
  pass: 0,
  comparisons: 0,
  swaps: 0,
  stepCount: 0,
  isComplete: false,
  currentIndex: 0,
});

/**
 * Swap two elements in an array
 */
const swap = (array, firstIndex, secondIndex) => {
  const nextArray = [...array];
  [nextArray[firstIndex], nextArray[secondIndex]] = [
    nextArray[secondIndex],
    nextArray[firstIndex],
  ];
  return nextArray;
};

/**
 * Generate all steps for bubble sort
 * This provides a complete visualization sequence
 */
export const generateBubbleSortSteps = (array = INITIAL_ARRAY) => {
  const arr = [...array];
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
      steps.push({
        array: [...arr],
        comparing: [i, i + 1],
        swapping: false,
        sorted: Array.from({ length: n - pass }, (_, idx) => n - pass + idx - 1),
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
          sorted: Array.from({ length: n - pass }, (_, idx) => n - pass + idx - 1),
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

/**
 * Get next step in bubble sort visualization
 * Used for step-by-step playback
 */
export const getNextBubbleSortStep = (state) => {
  if (state.isComplete) {
    return state;
  }

  // Generate all steps once (cached in component)
  // This function is kept for compatibility but is typically
  // used with pre-generated steps in the component
  return state;
};

/**
 * Create a new array with values between min and max
 */
export const generateRandomArray = (length = 10, min = 10, max = 100) => {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};
