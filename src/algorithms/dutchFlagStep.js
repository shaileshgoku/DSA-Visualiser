export const INITIAL_ARRAY = [2, 0, 1, 2, 0, 1, 2, 0];

export const createInitialState = (array = INITIAL_ARRAY) => ({
  array: [...array],
  low: 0,
  mid: 0,
  high: array.length - 1,
  action: 'Ready to sort the array.',
  stepCount: 0,
  isComplete: false,
});

const swap = (array, firstIndex, secondIndex) => {
  const nextArray = [...array];
  [nextArray[firstIndex], nextArray[secondIndex]] = [
    nextArray[secondIndex],
    nextArray[firstIndex],
  ];
  return nextArray;
};

export const getNextDutchFlagStep = (state) => {
  if (state.isComplete || state.mid > state.high) {
    return {
      ...state,
      action: 'Sorting complete.',
      isComplete: true,
    };
  }

  const currentValue = state.array[state.mid];
  const nextStepCount = state.stepCount + 1;

  if (currentValue === 0) {
    return {
      ...state,
      array: swap(state.array, state.low, state.mid),
      low: state.low + 1,
      mid: state.mid + 1,
      action: `Swapping 0 at mid (${state.mid}) with low (${state.low}); moving low and mid forward.`,
      stepCount: nextStepCount,
    };
  }

  if (currentValue === 1) {
    return {
      ...state,
      mid: state.mid + 1,
      action: `Found 1 at mid (${state.mid}); moving mid forward.`,
      stepCount: nextStepCount,
    };
  }

  return {
    ...state,
    array: swap(state.array, state.mid, state.high),
    high: state.high - 1,
    action: `Swapping 2 at mid (${state.mid}) with high (${state.high}); moving high backward.`,
    stepCount: nextStepCount,
  };
};
