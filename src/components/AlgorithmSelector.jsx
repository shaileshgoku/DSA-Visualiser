import { ALGORITHMS } from '../algorithms/index.js';

function AlgorithmSelector({ selectedAlgorithm, onSelectAlgorithm }) {
  const selectedProblem = ALGORITHMS[selectedAlgorithm];

  // Group algorithms by category
  const algorithmsByCategory = {};
  Object.values(ALGORITHMS).forEach((algo) => {
    if (!algorithmsByCategory[algo.category]) {
      algorithmsByCategory[algo.category] = [];
    }
    algorithmsByCategory[algo.category].push(algo);
  });

  return (
    <div className="algorithm-selector">
      <label htmlFor="algorithm-select" className="selector-label">
        Select Algorithm / Visualizer:
      </label>
      <select
        id="algorithm-select"
        value={selectedAlgorithm}
        onChange={(e) => onSelectAlgorithm(e.target.value)}
        className="selector-dropdown"
      >
        {Object.entries(algorithmsByCategory).map(([category, algos]) => (
          <optgroup key={category} label={`${category.charAt(0).toUpperCase() + category.slice(1)} Algorithms`}>
            {algos.map((algo) => (
              <option key={algo.id} value={algo.id}>
                {algo.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {selectedProblem && (
        <p className="selector-description">
          {selectedProblem.description}
        </p>
      )}
    </div>
  );
}

export default AlgorithmSelector;
