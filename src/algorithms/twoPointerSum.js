/**
 * Two Pointer Algorithm for Two Sum Problem
 * Finds a pair of numbers in a sorted array that add up to a target sum
 */

export const createInitialState = (array = [], target = 0) => ({
  array: [...array],
  sortedArray: [...array].sort((a, b) => a - b),
  originalTarget: target,
  target,
  left: 0,
  right: array.length - 1,
  currentSum: null,
  action: 'Ready to find two numbers that sum to target.',
  stepCount: 0,
  isComplete: false,
  found: false,
  foundPair: null,
  isSorted: false,
});

export const getNextTwoPointerStep = (state) => {
  // First step: sort the array
  if (!state.isSorted) {
    return {
      ...state,
      array: state.sortedArray,
      isSorted: true,
      action: `Array sorted in ascending order. Left pointer at start (0), Right pointer at end (${state.sortedArray.length - 1}).`,
      stepCount: state.stepCount + 1,
    };
  }

  // Check if algorithm is complete
  if (state.isComplete || state.left >= state.right) {
    return {
      ...state,
      action: state.found
        ? `✅ Found pair: [${state.foundPair[0]}, ${state.foundPair[1]}] = ${state.target}`
        : `❌ No pair found that sums to ${state.target}`,
      isComplete: true,
    };
  }

  const leftValue = state.array[state.left];
  const rightValue = state.array[state.right];
  const sum = leftValue + rightValue;
  const nextStepCount = state.stepCount + 1;

  if (sum === state.target) {
    return {
      ...state,
      currentSum: sum,
      action: `✅ FOUND! arr[${state.left}] (${leftValue}) + arr[${state.right}] (${rightValue}) = ${sum}`,
      stepCount: nextStepCount,
      isComplete: true,
      found: true,
      foundPair: [leftValue, rightValue],
    };
  }

  if (sum < state.target) {
    return {
      ...state,
      currentSum: sum,
      left: state.left + 1,
      action: `Sum ${sum} < ${state.target}. Moving LEFT pointer forward.`,
      stepCount: nextStepCount,
    };
  }

  // sum > target
  return {
    ...state,
    currentSum: sum,
    right: state.right - 1,
    action: `Sum ${sum} > ${state.target}. Moving RIGHT pointer backward.`,
    stepCount: nextStepCount,
  };
};
