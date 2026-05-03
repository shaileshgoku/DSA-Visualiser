/**
 * TwoPointerVisualizer
 * Main component for visualizing the Two Pointer algorithm for Two Sum problem
 * Integrates with existing animation system and controls
 */

import { useEffect, useMemo, useState } from 'react';
import TwoPointerArrayVisualizer from './TwoPointerArrayVisualizer.jsx';
import Controls from './Controls.jsx';
import {
  createInitialState,
  getNextTwoPointerStep,
} from '../algorithms/twoPointerSum.js';

const DEFAULT_ARRAY = [3, 2, 4, 1, 5];
const DEFAULT_TARGET = 9;

function TwoPointerVisualizer() {
  const [arrayInput, setArrayInput] = useState(DEFAULT_ARRAY.join(','));
  const [targetInput, setTargetInput] = useState(String(DEFAULT_TARGET));
  const [inputError, setInputError] = useState('');
  const [currentArray, setCurrentArray] = useState(DEFAULT_ARRAY);
  const [currentTarget, setCurrentTarget] = useState(DEFAULT_TARGET);

  const initialState = useMemo(
    () => createInitialState(currentArray, currentTarget),
    [currentArray, currentTarget]
  );

  const [visualizerState, setVisualizerState] = useState(initialState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [stepHistory, setStepHistory] = useState([initialState]);

  const {
    array,
    left,
    right,
    currentSum,
    action,
    stepCount,
    isComplete,
    found,
    foundPair,
  } = visualizerState;

  // Handle next step
  const handleNextStep = () => {
    setVisualizerState((currentState) => {
      const nextState = getNextTwoPointerStep(currentState);
      setStepHistory((prev) => [...prev, nextState]);
      return nextState;
    });
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (stepHistory.length > 1) {
      const previousState = stepHistory[stepHistory.length - 2];
      setVisualizerState(previousState);
      setStepHistory((prev) => prev.slice(0, -1));
    }
  };

  // Handle reset
  const handleReset = () => {
    setIsPlaying(false);
    setVisualizerState(initialState);
    setStepHistory([initialState]);
  };

  // Handle autoplay toggle
  const handleToggleAutoplay = () => {
    setIsPlaying((currentValue) => !currentValue);
  };

  // Handle array input change
  const handleArrayInputChange = (e) => {
    setArrayInput(e.target.value);
    setInputError('');
  };

  // Handle target input change
  const handleTargetInputChange = (e) => {
    setTargetInput(e.target.value);
    setInputError('');
  };

  // Handle apply inputs
  const handleApplyInputs = () => {
    try {
      // Parse array
      const numbers = arrayInput
        .split(',')
        .map((val) => {
          const num = parseInt(val.trim(), 10);
          if (isNaN(num)) throw new Error('Array contains invalid numbers');
          return num;
        });

      if (numbers.length === 0) throw new Error('Array cannot be empty');
      if (numbers.length < 2)
        throw new Error('Array must have at least 2 numbers');

      // Parse target
      const target = parseInt(targetInput.trim(), 10);
      if (isNaN(target)) throw new Error('Target must be a valid number');

      setCurrentArray(numbers);
      setCurrentTarget(target);
      setVisualizerState(createInitialState(numbers, target));
      setStepHistory([createInitialState(numbers, target)]);
      setIsPlaying(false);
      setInputError('');
    } catch (error) {
      setInputError(
        error.message || 'Invalid input. Please check your entries.'
      );
    }
  };

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying || isComplete) {
      if (isComplete) {
        setIsPlaying(false);
      }
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setVisualizerState((currentState) => {
        const nextState = getNextTwoPointerStep(currentState);
        setStepHistory((prev) => [...prev, nextState]);
        return nextState;
      });
    }, speed);

    return () => window.clearInterval(timerId);
  }, [isPlaying, isComplete, speed]);

  const canPrevStep = stepHistory.length > 1;

  return (
    <div className="algorithm-visualizer">
      {/* Input Section */}
      <div className="input-section">
        <label htmlFor="array-input" className="input-label">
          Enter Array (comma-separated integers):
        </label>
        <div className="input-group">
          <input
            id="array-input"
            type="text"
            value={arrayInput}
            onChange={handleArrayInputChange}
            placeholder="e.g., 3,2,4,1,5"
            className="array-input"
          />
          <label htmlFor="target-input" className="input-label">
            Target Sum:
          </label>
          <input
            id="target-input"
            type="number"
            value={targetInput}
            onChange={handleTargetInputChange}
            placeholder="e.g., 9"
            className="array-input"
            style={{ maxWidth: '120px' }}
          />
          <button
            type="button"
            onClick={handleApplyInputs}
            className="apply-button"
            aria-label="Apply array and target"
          >
            Apply
          </button>
        </div>
        {inputError && (
          <span className="error-message" role="alert">
            {inputError}
          </span>
        )}
      </div>

      {/* Step Counter */}
      <div className="step-counter" aria-label="Step counter">
        <span>Step</span>
        <strong>{stepCount}</strong>
      </div>

      {/* Current Sum Display */}
      {currentSum !== null && (
        <div className="current-sum-display">
          <span className="sum-label">Current Sum:</span>
          <span className="sum-value">{currentSum}</span>
          <span className="target-label">Target:</span>
          <span className="target-value">{currentTarget}</span>
        </div>
      )}

      {/* Array Visualization */}
      <TwoPointerArrayVisualizer
        array={array}
        left={left}
        right={right}
        foundPair={foundPair}
      />

      {/* Status Panel */}
      <div className="status-panel" role="status" aria-live="polite">
        <span className="status-label">Action</span>
        <p>{action}</p>
      </div>

      {/* Result Display */}
      {isComplete && (
        <div className={`result-panel ${found ? 'result-found' : 'result-not-found'}`}>
          {found ? (
            <>
              <span className="result-icon">✅</span>
              <span className="result-text">
                Pair found: [{foundPair[0]}, {foundPair[1]}]
              </span>
            </>
          ) : (
            <>
              <span className="result-icon">❌</span>
              <span className="result-text">
                No pair found for target {currentTarget}
              </span>
            </>
          )}
        </div>
      )}

      {/* Controls */}
      <Controls
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        onReset={handleReset}
        onToggleAutoplay={handleToggleAutoplay}
        isPlaying={isPlaying}
        speed={speed}
        onSpeedChange={setSpeed}
        disableNext={isComplete}
        disablePrev={!canPrevStep}
        isComplete={isComplete}
      />
    </div>
  );
}

export default TwoPointerVisualizer;
