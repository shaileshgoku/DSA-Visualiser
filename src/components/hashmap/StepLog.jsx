/**
 * StepLog Component
 * Displays all steps in a scrollable list
 * Highlights the current step
 */

function StepLog({ steps, currentIndex }) {
  const getStepEmoji = (type) => {
    const emojis = {
      init: '🔍',
      insert: '➕',
      lookup: '🔎',
      decrement: '➖',
      match: '✅',
      success: '🎉',
      error: '❌',
    };
    return emojis[type] || '📍';
  };

  return (
    <div className="step-log">
      <div className="log-header">
        <h3>Execution Log</h3>
        <span className="log-count">{steps.length} steps total</span>
      </div>

      <div className="log-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`log-entry ${
              index === currentIndex ? 'current' : ''
            } ${step.type}`}
          >
            <div className="log-step-number">
              <span className="step-emoji">{getStepEmoji(step.type)}</span>
              <span className="step-num">Step {index + 1}</span>
            </div>
            <div className="log-content">
              <div className="log-type">{step.type.toUpperCase()}</div>
              <div className="log-message">{step.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepLog;
