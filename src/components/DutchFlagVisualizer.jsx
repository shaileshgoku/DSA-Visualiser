import { useEffect, useMemo, useState } from 'react';
import ArrayVisualizer from './ArrayVisualizer.jsx';
import Controls from './Controls.jsx';
import {
  createInitialState,
  getNextDutchFlagStep,
  INITIAL_ARRAY,
} from '../algorithms/dutchFlagStep.js';

function DutchFlagVisualizer() {
  const [arrayInput, setArrayInput] = useState(INITIAL_ARRAY.join(','));
  const [inputError, setInputError] = useState('');
  const [currentArray, setCurrentArray] = useState(INITIAL_ARRAY);

  const initialState = useMemo(() => createInitialState(currentArray), [currentArray]);
  const [visualizerState, setVisualizerState] = useState(initialState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);

  const { array, low, mid, high, action, stepCount, isComplete } = visualizerState;

  const handleNextStep = () => {
    setVisualizerState((currentState) => getNextDutchFlagStep(currentState));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setVisualizerState(createInitialState(currentArray));
  };

  const handleToggleAutoplay = () => {
    setIsPlaying((currentValue) => !currentValue);
  };

  const handleArrayInputChange = (e) => {
    setArrayInput(e.target.value);
    setInputError('');
  };

  const handleApplyArray = () => {
    try {
      const numbers = arrayInput.split(',').map((val) => {
        const num = parseInt(val.trim(), 10);
        if (isNaN(num)) throw new Error('Invalid number');
        if (![0, 1, 2].includes(num)) throw new Error('Only 0, 1, 2 allowed');
        return num;
      });

      if (numbers.length === 0) throw new Error('Array cannot be empty');

      setCurrentArray(numbers);
      setVisualizerState(createInitialState(numbers));
      setIsPlaying(false);
      setInputError('');
    } catch (error) {
      setInputError(error.message || 'Invalid input. Use comma-separated 0s, 1s, and 2s.');
    }
  };

  useEffect(() => {
    if (!isPlaying || isComplete) {
      if (isComplete) {
        setIsPlaying(false);
      }
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setVisualizerState((currentState) => getNextDutchFlagStep(currentState));
    }, speed);

    return () => window.clearInterval(timerId);
  }, [isPlaying, isComplete, speed]);

  return (
    <div className="algorithm-visualizer">
      <div className="input-section">
        <label htmlFor="array-input" className="input-label">
          Enter Array (0, 1, 2):
        </label>
        <div className="input-group">
          <input
            id="array-input"
            type="text"
            value={arrayInput}
            onChange={handleArrayInputChange}
            placeholder="e.g., 2,0,1,2,0,1,2,0"
            className="array-input"
          />
          <button
            type="button"
            onClick={handleApplyArray}
            className="apply-button"
            aria-label="Apply custom array"
          >
            Apply Array
          </button>
        </div>
        {inputError && (
          <span className="error-message" role="alert">
            {inputError}
          </span>
        )}
      </div>

      <div className="step-counter" aria-label="Step counter">
        <span>Step</span>
        <strong>{stepCount}</strong>
      </div>

      <ArrayVisualizer array={array} low={low} mid={mid} high={high} />

      <div className="status-panel" role="status" aria-live="polite">
        <span className="status-label">Action</span>
        <p>{action}</p>
      </div>

      <Controls
        onNextStep={handleNextStep}
        onReset={handleReset}
        onToggleAutoplay={handleToggleAutoplay}
        isPlaying={isPlaying}
        speed={speed}
        onSpeedChange={setSpeed}
        disabled={isComplete}
      />
    </div>
  );
}

export default DutchFlagVisualizer;
