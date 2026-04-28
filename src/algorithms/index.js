import * as dutchFlag from './dutchFlagStep.js';
import { HASHMAP_PROBLEMS } from './hashmap/problems.js';

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
  // HashMap algorithms are handled separately through HASHMAP_PROBLEMS
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
  if (Object.keys(HASHMAP_PROBLEMS).includes(algorithmId)) return 'hashmap';
  return 'unknown';
};
