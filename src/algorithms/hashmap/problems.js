/**
 * Problem Configuration System
 * Defines metadata for each HashMap-based DSA problem
 * Makes it easy to add new problems without changing core logic
 */

export const HASHMAP_PROBLEMS = {
  arrayEquality: {
    id: 'arrayEquality',
    name: 'Array Equality (Frequency Map)',
    description: 'Check if two arrays have the same elements with same frequencies using a HashMap.',
    category: 'HashMap',
    difficulty: 'Easy',
    inputs: [
      { name: 'arrayA', label: 'Array A (comma-separated)', placeholder: 'e.g., 1,2,2,3' },
      { name: 'arrayB', label: 'Array B (comma-separated)', placeholder: 'e.g., 2,3,1,2' },
    ],
    validate: (inputA, inputB) => {
      if (!inputA || !inputB) return 'Both arrays are required';
      return null;
    },
  },

  anagramCheck: {
    id: 'anagramCheck',
    name: 'Anagram Check',
    description: 'Determine if two strings are anagrams using a frequency map.',
    category: 'HashMap',
    difficulty: 'Easy',
    inputs: [
      { name: 'stringA', label: 'String A', placeholder: 'e.g., listen' },
      { name: 'stringB', label: 'String B', placeholder: 'e.g., silent' },
    ],
    validate: (stringA, stringB) => {
      if (!stringA || !stringB) return 'Both strings are required';
      return null;
    },
  },

  twoSum: {
    id: 'twoSum',
    name: 'Two Sum',
    description: 'Find two numbers in an array that add up to a target using HashMap.',
    category: 'HashMap',
    difficulty: 'Medium',
    inputs: [
      { name: 'array', label: 'Array (comma-separated numbers)', placeholder: 'e.g., 2,7,11,15' },
      { name: 'target', label: 'Target Sum', placeholder: 'e.g., 9', type: 'number' },
    ],
    validate: (array, target) => {
      if (!array || target === '' || target === null) return 'Array and target are required';
      if (isNaN(parseInt(target, 10))) return 'Target must be a number';
      return null;
    },
  },
};

// Helper to get problem by ID
export const getProblem = (problemId) => HASHMAP_PROBLEMS[problemId];

// Get all problem IDs
export const getProblemIds = () => Object.keys(HASHMAP_PROBLEMS);
