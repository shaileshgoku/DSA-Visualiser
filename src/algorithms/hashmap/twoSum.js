/**
 * Two Sum Step Generator
 * Finds two indices whose values sum to target using HashMap
 * Returns an array of steps showing the HashMap lookup process
 */

/**
 * Generate steps for Two Sum problem
 * @param {number[]} array - Array of numbers
 * @param {number} target - Target sum
 * @returns {Array} Array of step objects
 */
export const generateTwoSumSteps = (array, target) => {
  const steps = [];

  // Step 0: Initialize
  steps.push({
    type: 'init',
    message: `Finding two numbers that sum to ${target} in [${array}]`,
    hashmap: {},
    currentIndex: -1,
    currentValue: null,
    complement: null,
    description: 'Using HashMap for O(n) lookup',
  });

  // Build HashMap while checking for complement
  const seen = {};
  let found = false;
  let foundPair = null;

  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i];
    const complement = target - currentNum;

    // Check if complement exists in HashMap
    if (seen[complement] !== undefined) {
      found = true;
      foundPair = [seen[complement], i];

      steps.push({
        type: 'match',
        message: `Found match! ${array[foundPair[0]]} + ${currentNum} = ${target}`,
        hashmap: { ...seen },
        currentIndex: i,
        currentValue: currentNum,
        complement,
        matchIndex: foundPair[0],
        description: `Complement ${complement} found at index ${foundPair[0]}`,
      });
      break;
    }

    // Add current number to HashMap
    if (seen[currentNum] === undefined) {
      seen[currentNum] = i;
    }

    steps.push({
      type: 'insert',
      message: `Storing ${currentNum} → index ${i} (need complement: ${complement})`,
      hashmap: { ...seen },
      currentIndex: i,
      currentValue: currentNum,
      complement,
      description: `Looking for ${complement} in HashMap`,
    });
  }

  // Final result
  if (found) {
    steps.push({
      type: 'success',
      message: `SUCCESS! Indices [${foundPair[0]}, ${foundPair[1]}] → ${array[foundPair[0]]} + ${array[foundPair[1]]} = ${target}`,
      hashmap: seen,
      currentIndex: -1,
      currentValue: null,
      description: 'Solution found',
      result: true,
      indices: foundPair,
    });
  } else {
    steps.push({
      type: 'error',
      message: `No pair found that sums to ${target}`,
      hashmap: seen,
      currentIndex: -1,
      currentValue: null,
      description: 'No solution exists',
      result: false,
    });
  }

  return steps;
};
