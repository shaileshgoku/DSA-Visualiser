/**
 * ControlsPanel Component
 * Input fields and action buttons for HashMap operations
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

function ControlsPanel({
  onInsert,
  onSearch,
  onDelete,
  onReset,
  bucketSize,
  onBucketSizeChange,
}) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!key.trim()) {
      setError('Key cannot be empty');
      return false;
    }
    if (isNaN(parseInt(key))) {
      setError('Key must be a number');
      return false;
    }
    setError('');
    return true;
  };

  const handleInsert = () => {
    if (validateInputs()) {
      onInsert(key, value);
      setKey('');
      setValue('');
    }
  };

  const handleSearch = () => {
    if (validateInputs()) {
      onSearch(key);
    }
  };

  const handleDelete = () => {
    if (validateInputs()) {
      onDelete(key);
      setKey('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInsert();
    }
  };

  return (
    <motion.div
      className="controls-panel"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Bucket Size Control */}
      <div className="bucket-size-control">
        <label htmlFor="bucket-size" className="control-label">
          🪣 Bucket Size:
        </label>
        <select
          id="bucket-size"
          value={bucketSize}
          onChange={(e) => onBucketSizeChange(parseInt(e.target.value))}
          className="size-select"
        >
          <option value={5}>5</option>
          <option value={7}>7 (Recommended)</option>
          <option value={11}>11</option>
          <option value={13}>13</option>
        </select>
        <span className="size-info">Reset required to apply</span>
      </div>

      <hr className="divider" />

      {/* Key & Value Inputs */}
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="key-input" className="input-label">
            🔑 Key (number):
          </label>
          <input
            id="key-input"
            type="text"
            placeholder="e.g., 23"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            className="input-box"
          />
        </div>

        <div className="input-field">
          <label htmlFor="value-input" className="input-label">
            📦 Value (string):
          </label>
          <input
            id="value-input"
            type="text"
            placeholder="e.g., apple"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input-box"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="button-group">
        <motion.button
          className="btn btn-insert"
          onClick={handleInsert}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ➕ Insert
        </motion.button>

        <motion.button
          className="btn btn-search"
          onClick={handleSearch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔍 Search
        </motion.button>

        <motion.button
          className="btn btn-delete"
          onClick={handleDelete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🗑️ Delete
        </motion.button>

        <motion.button
          className="btn btn-reset"
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Reset
        </motion.button>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h4>💡 How to use:</h4>
        <ul>
          <li>Enter a <strong>numeric key</strong> and optional value</li>
          <li>Click <strong>Insert</strong> to add key-value pair</li>
          <li>Click <strong>Search</strong> to find a key</li>
          <li>Click <strong>Delete</strong> to remove a key</li>
          <li>Watch the operation log to understand the hash function!</li>
        </ul>
      </div>
    </motion.div>
  );
}

export default ControlsPanel;
