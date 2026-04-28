import { ALGORITHMS } from '../algorithms/index.js';
import { HASHMAP_PROBLEMS } from '../algorithms/hashmap/index.js';

function AlgorithmSelector({ selectedAlgorithm, onSelectAlgorithm }) {
  // Combine all available problems
  const allAlgorithms = {
    ...ALGORITHMS,
    // Add HashMap problems to the dropdown
    ...Object.fromEntries(
      Object.entries(HASHMAP_PROBLEMS).map(([key, problem]) => [
        key,
        {
          id: key,
          name: problem.name,
          description: problem.description,
          category: problem.category,
        },
      ])
    ),
  };

  const selectedProblem = allAlgorithms[selectedAlgorithm];

  return (
    <div className="algorithm-selector">
      <label htmlFor="algorithm-select" className="selector-label">
        Select Algorithm / Problem:
      </label>
      <select
        id="algorithm-select"
        value={selectedAlgorithm}
        onChange={(e) => onSelectAlgorithm(e.target.value)}
        className="selector-dropdown"
      >
        <optgroup label="Array Algorithms">
          {Object.entries(ALGORITHMS).map(([key, algo]) => (
            <option key={key} value={key}>
              {algo.name}
            </option>
          ))}
        </optgroup>

        <optgroup label="HashMap Problems">
          {Object.entries(HASHMAP_PROBLEMS).map(([key, problem]) => (
            <option key={key} value={key}>
              {problem.name}
            </option>
          ))}
        </optgroup>
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
