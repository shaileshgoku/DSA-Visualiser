import { ALGORITHMS } from '../algorithms/index.js';

function AlgorithmSelector({ selectedAlgorithm, onSelectAlgorithm }) {
  return (
    <div className="algorithm-selector">
      <label htmlFor="algorithm-select" className="selector-label">
        Select Algorithm:
      </label>
      <select
        id="algorithm-select"
        value={selectedAlgorithm}
        onChange={(e) => onSelectAlgorithm(e.target.value)}
        className="selector-dropdown"
      >
        {Object.entries(ALGORITHMS).map(([key, algo]) => (
          <option key={key} value={key}>
            {algo.name}
          </option>
        ))}
      </select>
      <p className="selector-description">
        {ALGORITHMS[selectedAlgorithm]?.description}
      </p>
    </div>
  );
}

export default AlgorithmSelector;
