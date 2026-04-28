/**
 * InputPanel Component
 * Dynamic input form based on problem configuration
 * Renders different input fields for different problems
 */

function InputPanel({ problemConfig, inputs, onInputChange, error }) {
  if (!problemConfig) {
    return <div>Loading problem configuration...</div>;
  }

  return (
    <div className="input-panel">
      <div className="input-form">
        {problemConfig.inputs.map((inputConfig) => (
          <div key={inputConfig.name} className="form-group">
            <label htmlFor={inputConfig.name} className="input-label">
              {inputConfig.label}
            </label>
            <input
              id={inputConfig.name}
              type={inputConfig.type || 'text'}
              name={inputConfig.name}
              value={inputs[inputConfig.name] || ''}
              onChange={onInputChange}
              placeholder={inputConfig.placeholder}
              className="form-input"
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="error-message" role="alert">
          ⚠️ {error}
        </div>
      )}

      <div className="input-hints">
        <p className="hint-title">💡 Quick Examples:</p>
        {problemConfig.id === 'arrayEquality' && (
          <>
            <p>✓ Equal: [1,2,2,3] and [3,2,2,1]</p>
            <p>✗ Not Equal: [1,2,3] and [1,2,3,4]</p>
          </>
        )}
        {problemConfig.id === 'anagramCheck' && (
          <>
            <p>✓ Anagram: "listen" and "silent"</p>
            <p>✗ Not: "hello" and "world"</p>
          </>
        )}
        {problemConfig.id === 'twoSum' && (
          <>
            <p>✓ Found: [2,7,11,15], target=9</p>
            <p>✗ Not found: [1,2,3], target=10</p>
          </>
        )}
      </div>
    </div>
  );
}

export default InputPanel;
