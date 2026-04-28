import * as dutchFlag from './dutchFlagStep.js';

/**
 * Registry of all available algorithms
 * Each algorithm is categorized by type (array, hashmap, tree, etc.)
 * This enables dynamic problem selection and UI routing
 */
export const ALGORITHMS = {
  dutchFlag: {
    id: 'dutchFlag',
    name: 'Dutch National Flag Algorithm',
    description: 'Sorts an array containing 0s, 1s, and 2s in linear time.',
    category: 'array',
    module: dutchFlag,
  },
  hashMapInternals: {
    id: 'hashMapInternals',
    name: 'HashMap Internals Visualizer',
    description: 'Understand how HashMaps work internally: hash functions, buckets, chaining, and collision handling.',
    category: 'hashmap',
  },
};

/**
 * Get algorithm by ID from array algorithms
 */
export const getAlgorithm = (algorithmId) => ALGORITHMS[algorithmId];

/**
 * Get all problem types (categories)
 * Used for main category selection in UI
 */
export const getProblemCategories = () => ['array', 'hashmap', 'tree', 'graph', 'sorting'];

/**
 * Router helper - returns which component to render based on algorithm
 */
export const getComponentType = (algorithmId) => {
  if (algorithmId === 'dutchFlag') return 'array';
  if (algorithmId === 'hashMapInternals') return 'hashmap';
  return 'unknown';
};
