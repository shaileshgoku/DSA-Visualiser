import { useEffect, useMemo, useState } from 'react';
import Controls from './Controls.jsx';
import {
  generateBubbleSortSteps,
  generateRandomArray,
  INITIAL_ARRAY,
} from '../algorithms/bubbleSort.js';

function BubbleSortVisualizer() {
  const [arrayInput, setArrayInput] = useState(INITIAL_ARRAY.join(','));
  const [inputError, setInputError] = useState('');
  const [currentArray, setCurrentArray] = useState(INITIAL_ARRAY);

  const allSteps = useMemo(() => generateBubbleSortSteps(currentArray), [currentArray]);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);

  if (!allSteps || allSteps.length === 0) {
    return <div className="algorithm-visualizer">Error: Unable to generate sort steps</div>;
  }

  const currentStep = allSteps[currentStepIndex];
  if (!currentStep) {
    return <div className="algorithm-visualizer">Error: Invalid step index</div>;
  }

  const { array, comparing, swapping, sorted, pass, comparisons, swaps, isComplete } = currentStep;

  const handleNextStep = () => {
    if (currentStepIndex < allSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
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
        return num;
      });

      if (numbers.length === 0) throw new Error('Array cannot be empty');
      if (numbers.length > 20) throw new Error('Maximum 20 elements allowed for performance');

      setCurrentArray(numbers);
      setCurrentStepIndex(0);
      setIsPlaying(false);
      setInputError('');
    } catch (error) {
      setInputError(error.message || 'Invalid input. Use comma-separated numbers.');
    }
  };

  const handleGenerateRandomArray = () => {
    const randomArray = generateRandomArray(10, 10, 99);
    setArrayInput(randomArray.join(','));
    setCurrentArray(randomArray);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setInputError('');
  };

  useEffect(() => {
    if (!isPlaying || isComplete) {
      if (isComplete) setIsPlaying(false);
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setCurrentStepIndex((prev) => (prev < allSteps.length - 1 ? prev + 1 : prev));
    }, speed);

    return () => window.clearInterval(timerId);
  }, [isPlaying, isComplete, speed, allSteps.length]);

  const totalSteps = allSteps.length;

  return (
    <div className="algorithm-visualizer">
      <div className="input-section">
        <label htmlFor="array-input" className="input-label">
          Enter Array (comma-separated numbers):
        </label>
        <div className="input-group">
          <input
            id="array-input"
            type="text"
            value={arrayInput}
            onChange={handleArrayInputChange}
            placeholder="e.g., 64,34,25,12,22,11,90"
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
          <button
            type="button"
            onClick={handleGenerateRandomArray}
            className="apply-button secondary"
            aria-label="Generate random array"
          >
            Random Array
          </button>
        </div>
        {inputError && (
          <span className="error-message" role="alert">
            {inputError}
          </span>
        )}
      </div>

      <div className="stats-panel" role="status" aria-live="polite">
        <div className="stat-item">
          <span className="stat-label">Step</span>
          <span className="stat-value">{currentStepIndex} / {totalSteps}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pass</span>
          <span className="stat-value">{pass}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Comparisons</span>
          <span className="stat-value">{comparisons}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Swaps</span>
          <span className="stat-value">{swaps}</span>
        </div>
      </div>

      <section className="visualizer" aria-label="Array visualization for bubble sort">
        <div className="array-row">
          {array.map((value, index) => {
            const isComparing = comparing.includes(index);
            const isSorted = sorted.includes(index);
            
            let itemClass = 'array-box';
            if (isSorted) {
              itemClass += ' sorted';
            } else if (swapping && isComparing) {
              itemClass += ' swapping';
            } else if (isComparing) {
              itemClass += ' comparing';
            }

            return (
              <div className="array-item-wrap" key={index}>
                <div
                  className={itemClass}
                  aria-label={`${isSorted ? 'Sorted' : ''} element ${value} at index ${index}`}
                >
                  {value}
                </div>
                <span className="index-label">{index}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="status-panel" role="status" aria-live="polite">
        <span className="status-label">Status</span>
        <p>
          {isComplete
            ? '✅ Sorting complete!'
            : swapping
            ? `Swapping elements at indices ${comparing[0]} and ${comparing[1]}`
            : comparing.length > 0
            ? `Comparing elements at indices ${comparing[0]} and ${comparing[1]}`
            : 'Ready to start'}
        </p>
      </div>

      <div className="complexity-panel">
        <strong>Time Complexity:</strong> O(n²) | <strong>Space:</strong> O(1)
      </div>

      <Controls
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        onReset={handleReset}
        onToggleAutoplay={handleToggleAutoplay}
        isPlaying={isPlaying}
        speed={speed}
        onSpeedChange={setSpeed}
        disableNext={isComplete}
        disablePrev={currentStepIndex === 0}
        isComplete={isComplete}
      />
    </div>
  );
}

export default BubbleSortVisualizer;
