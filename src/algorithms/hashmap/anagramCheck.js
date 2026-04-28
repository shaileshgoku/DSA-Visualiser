/**
 * Anagram Check Step Generator
 * Checks if two strings are anagrams using a frequency map
 * Returns an array of steps showing the HashMap building and comparison process
 */

/**
 * Generate steps for Anagram Check problem
 * @param {string} stringA - First string
 * @param {string} stringB - Second string
 * @returns {Array} Array of step objects
 */
export const generateAnagramSteps = (stringA, stringB) => {
  const steps = [];

  // Normalize strings
  const normalized_A = stringA.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalized_B = stringB.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Step 0: Initialize
  steps.push({
    type: 'init',
    message: `Checking if "${stringA}" and "${stringB}" are anagrams`,
    hashmap: {},
    currentIndex: -1,
    currentChar: null,
    description: 'Building character frequency map...',
  });

  // Early check: length
  if (normalized_A.length !== normalized_B.length) {
    steps.push({
      type: 'error',
      message: `Strings have different lengths (${normalized_A.length} vs ${normalized_B.length}). Not anagrams.`,
      hashmap: {},
      currentIndex: -1,
      currentChar: null,
      description: 'Different lengths = not anagrams',
      result: false,
    });
    return steps;
  }

  // Step 1-N: Build frequency map from stringA
  const frequencyMap = {};
  const chars_A = normalized_A.split('');

  chars_A.forEach((char, index) => {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    steps.push({
      type: 'insert',
      message: `Adding '${char}' to HashMap (count: ${frequencyMap[char]})`,
      hashmap: { ...frequencyMap },
      currentIndex: index,
      currentChar: char,
      description: `Processing character '${char}' from "${stringA}" at index ${index}`,
    });
  });

  // Step N+1: Start verifying with stringB
  steps.push({
    type: 'lookup',
    message: `Verifying characters of "${stringB}" against frequency map...`,
    hashmap: { ...frequencyMap },
    currentIndex: -1,
    currentChar: null,
    description: 'Checking each character of second string',
  });

  // Step N+2 to end: Check stringB
  let isAnagram = true;
  const frequencyMapCopy = { ...frequencyMap };
  const chars_B = normalized_B.split('');

  for (let i = 0; i < chars_B.length; i++) {
    const char = chars_B[i];

    if (!frequencyMapCopy[char] || frequencyMapCopy[char] === 0) {
      isAnagram = false;
      steps.push({
        type: 'error',
        message: `Character '${char}' not found or count exhausted`,
        hashmap: frequencyMapCopy,
        currentIndex: i,
        currentChar: char,
        description: 'Character mismatch - Not anagrams',
      });
      break;
    }

    frequencyMapCopy[char]--;

    steps.push({
      type: 'decrement',
      message: `Found '${char}' in HashMap (remaining: ${frequencyMapCopy[char]})`,
      hashmap: { ...frequencyMapCopy },
      currentIndex: i,
      currentChar: char,
      description: `Verifying character '${char}' from "${stringB}" at index ${i}`,
    });
  }

  // Final result
  if (isAnagram) {
    steps.push({
      type: 'success',
      message: `"${stringA}" and "${stringB}" ARE ANAGRAMS!`,
      hashmap: frequencyMapCopy,
      currentIndex: -1,
      currentChar: null,
      description: 'All characters matched with correct frequencies',
      result: true,
    });
  } else {
    steps.push({
      type: 'error',
      message: `"${stringA}" and "${stringB}" are NOT ANAGRAMS`,
      hashmap: frequencyMapCopy,
      currentIndex: -1,
      currentChar: null,
      description: 'Character or frequency mismatch detected',
      result: false,
    });
  }

  return steps;
};
