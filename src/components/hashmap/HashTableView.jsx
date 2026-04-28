/**
 * HashTableView Component
 * Visual representation of the HashMap/frequency table
 * Shows keys, values, and highlights current operations
 */

function HashTableView({ step }) {
  if (!step || !step.hashmap) {
    return <div className="hash-table-view">No data to display</div>;
  }

  const hashmap = step.hashmap;
  const entries = Object.entries(hashmap);

  // Determine highlight based on step type
  const getHighlightClass = (key) => {
    if (step.type === 'insert' && step.currentValue && key == step.currentValue) {
      return 'highlight-insert';
    }
    if (step.type === 'decrement' && step.currentValue && key == step.currentValue) {
      return 'highlight-decrement';
    }
    if (step.type === 'lookup' && step.complement && key == step.complement) {
      return 'highlight-lookup';
    }
    if (step.type === 'match' && (key == step.currentValue || key == step.complement)) {
      return 'highlight-match';
    }
    return '';
  };

  const getStepTypeEmoji = () => {
    const emojis = {
      init: '🔍',
      insert: '➕',
      lookup: '🔎',
      decrement: '➖',
      match: '✅',
      success: '🎉',
      error: '❌',
    };
    return emojis[step.type] || '📍';
  };

  return (
    <div className="hash-table-view">
      <div className="table-header">
        <h3>{getStepTypeEmoji()} HashMap / Frequency Table</h3>
        <span className="table-size">Entries: {entries.length}</span>
      </div>

      {entries.length === 0 ? (
        <div className="empty-table">HashMap is empty</div>
      ) : (
        <div className="table-container">
          <table className="hash-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([key, value]) => (
                <tr key={key} className={`table-row ${getHighlightClass(key)}`}>
                  <td className="table-key">{key}</td>
                  <td className="table-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Extra info based on step type */}
      {step.complement !== null && step.complement !== undefined && (
        <div className="extra-info">
          <p>
            Looking for complement: <strong>{step.complement}</strong>
          </p>
        </div>
      )}

      {step.indices && (
        <div className="result-info success">
          <p>
            ✅ Found indices: [{step.indices[0]}, {step.indices[1]}]
          </p>
        </div>
      )}

      {step.result === false && (
        <div className="result-info error">
          <p>❌ No match found</p>
        </div>
      )}
    </div>
  );
}

export default HashTableView;
