import * as dutchFlag from './dutchFlagStep.js';

export const ALGORITHMS = {
  dutchFlag: {
    id: 'dutchFlag',
    name: 'Dutch National Flag Algorithm',
    description: 'Sorts an array containing 0s, 1s, and 2s in linear time.',
    module: dutchFlag,
  },
};

export const getAlgorithm = (algorithmId) => ALGORITHMS[algorithmId];
