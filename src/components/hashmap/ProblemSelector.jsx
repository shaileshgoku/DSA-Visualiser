/**
 * ProblemSelector Component
 * Dropdown for selecting HashMap problems
 * Also displays problem description and difficulty
 */

import { HASHMAP_PROBLEMS } from '../../algorithms/hashmap/index.js';

function ProblemSelector({ selectedProblem, onSelectProblem }) {
  const problem = HASHMAP_PROBLEMS[selectedProblem];

  return (
    <div className="problem-selector">
      <div className="selector-group">
        <label htmlFor="problem-select" className="selector-label">
          Choose a Problem:
        </label>
        <select
          id="problem-select"
          value={selectedProblem}
          onChange={(e) => onSelectProblem(e.target.value)}
          className="selector-dropdown"
        >
          {Object.entries(HASHMAP_PROBLEMS).map(([key, prob]) => (
            <option key={key} value={key}>
              {prob.name}
            </option>
          ))}
        </select>
      </div>

      {problem && (
        <div className="problem-info">
          <div className="problem-description">
            <strong>{problem.name}</strong>
            <p>{problem.description}</p>
          </div>
          <div className="problem-meta">
            <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>
              {problem.difficulty}
            </span>
            <span className="category">{problem.category}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemSelector;
