/**
 * HashMapVisualizer
 * Main component for visualizing HashMap-based DSA problems
 * Orchestrates problem selection, input, step generation, and visualization
 */

import { useState, useMemo, useEffect } from 'react';
import ProblemSelector from './ProblemSelector.jsx';
import InputPanel from './InputPanel.jsx';
import HashTableView from './HashTableView.jsx';
import StepLog from './StepLog.jsx';
import Controls from '../Controls.jsx';
import {
  generateArrayEqualitySteps,
  generateAnagramSteps,
  generateTwoSumSteps,
  HASHMAP_PROBLEMS,
} from '../../algorithms/hashmap/index.js';

const STEP_GENERATORS = {
  arrayEquality: generateArrayEqualitySteps,
  anagramCheck: generateAnagramSteps,
  twoSum: generateTwoSumSteps,
};

function HashMapVisualizer() {
  // Problem selection
  const [selectedProblem, setSelectedProblem] = useState('arrayEquality');
  
  // User inputs (dynamic based on problem)
  const [inputs, setInputs] = useState({
    arrayA: '1,2,2,3',
    arrayB: '2,3,1,2',
  });

  // Visualization state
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [inputError, setInputError] = useState('');

  // Get problem metadata
  const problemConfig = HASHMAP_PROBLEMS[selectedProblem];

  // Generate steps when problem or inputs change
  useEffect(() => {
    try {
      setInputError('');
      const generator = STEP_GENERATORS[selectedProblem];

      let stepArray = [];

      if (selectedProblem === 'arrayEquality') {
        const arrA = inputs.arrayA.split(',').map((x) => parseInt(x.trim(), 10));
        const arrB = inputs.arrayB.split(',').map((x) => parseInt(x.trim(), 10));
        stepArray = generator(arrA, arrB);
      } else if (selectedProblem === 'anagramCheck') {
        stepArray = generator(inputs.stringA || '', inputs.stringB || '');
      } else if (selectedProblem === 'twoSum') {
        const arr = inputs.array.split(',').map((x) => parseInt(x.trim(), 10));
        const target = parseInt(inputs.target, 10);
        stepArray = generator(arr, target);
      }

      setSteps(stepArray);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    } catch (error) {
      setInputError('Error generating steps: ' + error.message);
      setSteps([]);
    }
  }, [selectedProblem, inputs]);

  // Get current step
  const currentStep = steps[currentStepIndex] || null;
  const isComplete = currentStepIndex >= steps.length - 1;

  // Handle step navigation
  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleToggleAutoplay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying || isComplete) {
      if (isComplete) setIsPlaying(false);
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setCurrentStepIndex((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, speed);

    return () => window.clearInterval(timerId);
  }, [isPlaying, isComplete, speed, steps.length]);

  // Handle problem change
  const handleProblemChange = (problemId) => {
    setSelectedProblem(problemId);
    
    // Reset inputs to defaults for new problem
    if (problemId === 'arrayEquality') {
      setInputs({ arrayA: '1,2,2,3', arrayB: '2,3,1,2' });
    } else if (problemId === 'anagramCheck') {
      setInputs({ stringA: 'listen', stringB: 'silent' });
    } else if (problemId === 'twoSum') {
      setInputs({ array: '2,7,11,15', target: '9' });
    }

    setInputError('');
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setInputError('');
  };

  return (
    <div className="hashmap-visualizer">
      {/* Problem Selection */}
      <section className="hashmap-section">
        <h2>Select Problem</h2>
        <ProblemSelector
          selectedProblem={selectedProblem}
          onSelectProblem={handleProblemChange}
        />
      </section>

      {/* Input Panel */}
      <section className="hashmap-section">
        <h2>Input</h2>
        <InputPanel
          problemConfig={problemConfig}
          inputs={inputs}
          onInputChange={handleInputChange}
          error={inputError}
        />
      </section>

      {/* Main Visualization */}
      {steps.length > 0 && (
        <>
          {/* HashMap Table Visualization */}
          <section className="hashmap-section">
            <h2>HashMap State</h2>
            <HashTableView step={currentStep} />
          </section>

          {/* Step Information */}
          <section className="hashmap-section">
            <h2>Current Step</h2>
            <div className="step-info">
              <div className="step-counter">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
              <div className={`step-type step-type-${currentStep?.type}`}>
                {currentStep?.type.toUpperCase()}
              </div>
              <div className="step-message">
                {currentStep?.message}
              </div>
              <div className="step-description">
                {currentStep?.description}
              </div>
            </div>
          </section>

          {/* Step Log */}
          <section className="hashmap-section">
            <h2>Step History</h2>
            <StepLog steps={steps} currentIndex={currentStepIndex} />
          </section>

          {/* Controls */}
          <section className="hashmap-section">
            <h2>Controls</h2>
            <Controls
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onReset={handleReset}
              onToggleAutoplay={handleToggleAutoplay}
              isPlaying={isPlaying}
              speed={speed}
              onSpeedChange={setSpeed}
              isComplete={isComplete}
              disablePrev={currentStepIndex === 0}
              disableNext={isComplete}
            />
          </section>
        </>
      )}

      {steps.length === 0 && !inputError && (
        <div className="no-steps-message">
          Enter valid inputs to generate visualization steps
        </div>
      )}
    </div>
  );
}

export default HashMapVisualizer;
