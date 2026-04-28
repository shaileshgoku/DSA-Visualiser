/**
 * Array Equality Step Generator
 * Checks if two arrays have the same elements with same frequencies
 * Returns an array of steps showing the HashMap building process
 */

/**
 * Generate steps for Array Equality problem
 * @param {number[]} arrayA - First array
 * @param {number[]} arrayB - Second array
 * @returns {Array} Array of step objects
 */
export const generateArrayEqualitySteps = (arrayA, arrayB) => {
  const steps = [];

  // Step 0: Initialize
  steps.push({
    type: 'init',
    message: `Comparing arrays: [${arrayA}] and [${arrayB}]`,
    hashmap: {},
    currentIndex: -1,
    currentValue: null,
    description: 'Building frequency map from Array A...',
  });

  // Step 1-N: Build frequency map from arrayA
  const frequencyMap = {};
  arrayA.forEach((value, index) => {
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    steps.push({
      type: 'insert',
      message: `Inserting ${value} into HashMap (count: ${frequencyMap[value]})`,
      hashmap: { ...frequencyMap },
      currentIndex: index,
      currentValue: value,
      description: `Processing element ${value} from Array A at index ${index}`,
    });
  });

  // Step N+1: Verify with arrayB
  steps.push({
    type: 'lookup',
    message: 'Verifying Array B against the frequency map...',
    hashmap: { ...frequencyMap },
    currentIndex: -1,
    currentValue: null,
    description: 'Checking each element of Array B',
  });

  // Step N+2 to end: Check arrayB
  let isEqual = true;
  const frequencyMapCopy = { ...frequencyMap };

  for (let i = 0; i < arrayB.length; i++) {
    const value = arrayB[i];

    if (!frequencyMapCopy[value]) {
      isEqual = false;
      steps.push({
        type: 'error',
        message: `Element ${value} not found in HashMap or count is 0`,
        hashmap: frequencyMapCopy,
        currentIndex: i,
        currentValue: value,
        description: 'Mismatch detected - Arrays are NOT equal',
      });
      break;
    }

    frequencyMapCopy[value]--;

    steps.push({
      type: 'decrement',
      message: `Decrementing count of ${value} (remaining: ${frequencyMapCopy[value]})`,
      hashmap: { ...frequencyMapCopy },
      currentIndex: i,
      currentValue: value,
      description: `Verifying element ${value} from Array B at index ${i}`,
    });
  }

  // Final result
  if (isEqual && Object.values(frequencyMapCopy).every((count) => count === 0)) {
    steps.push({
      type: 'success',
      message: 'Arrays are EQUAL! All elements and frequencies match.',
      hashmap: frequencyMapCopy,
      currentIndex: -1,
      currentValue: null,
      description: 'Verification complete - SUCCESS',
      result: true,
    });
  } else if (isEqual) {
    steps.push({
      type: 'error',
      message: 'Arrays are NOT equal! Array B is missing some elements.',
      hashmap: frequencyMapCopy,
      currentIndex: -1,
      currentValue: null,
      description: 'Array B has fewer elements than Array A',
      result: false,
    });
  } else {
    steps.push({
      type: 'error',
      message: 'Arrays are NOT equal!',
      hashmap: frequencyMapCopy,
      currentIndex: -1,
      currentValue: null,
      description: 'Mismatch found - operation complete',
      result: false,
    });
  }

  return steps;
};
