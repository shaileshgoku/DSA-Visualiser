/**
 * HashMapInternalsVisualizer
 * Main component for visualizing HashMap internals
 * Demonstrates: hash function, insertions, searches, deletions, and collision handling
 */

import { useState, useEffect, useMemo } from 'react';
import BucketArray from './BucketArray.jsx';
import ControlsPanel from './ControlsPanel.jsx';
import LogPanel from './LogPanel.jsx';
import {
  initializeHashMap,
  insert,
  search,
  remove,
  resetHashMap,
  getStatistics,
} from '../../algorithms/hashmap/hashMapInternals.js';

function HashMapVisualizer() {
  const DEFAULT_BUCKET_SIZE = 7;

  // State
  const [buckets, setBuckets] = useState(() =>
    initializeHashMap(DEFAULT_BUCKET_SIZE)
  );
  const [bucketSize, setBucketSize] = useState(DEFAULT_BUCKET_SIZE);
  const [highlightedBucket, setHighlightedBucket] = useState(null);
  const [log, setLog] = useState(['👋 Welcome! Insert a key to get started.']);
  const [lastOperation, setLastOperation] = useState(null);

  // Statistics
  const statistics = useMemo(() => getStatistics(buckets), [buckets]);

  // Handle Insert
  const handleInsert = (key, value) => {
    const result = insert(buckets, key, value, bucketSize);
    if (result.success) {
      setBuckets(result.buckets);
      setHighlightedBucket(result.highlightedBucket);
      setLog(result.log);
      setLastOperation('insert');
      setTimeout(() => setHighlightedBucket(null), 1000);
    } else {
      setLog(result.log);
    }
  };

  // Handle Search
  const handleSearch = (key) => {
    const result = search(buckets, key, bucketSize);
    if (result.success) {
      setHighlightedBucket(result.highlightedBucket);
      setLog(result.log);
      setLastOperation('search');
      setTimeout(() => setHighlightedBucket(null), 1000);
    } else {
      setLog(result.log);
    }
  };

  // Handle Delete
  const handleDelete = (key) => {
    const result = remove(buckets, key, bucketSize);
    if (result.success) {
      setBuckets(result.buckets);
      setHighlightedBucket(result.highlightedBucket);
      setLog(result.log);
      setLastOperation('delete');
      setTimeout(() => setHighlightedBucket(null), 1000);
    } else {
      setLog(result.log);
    }
  };

  // Handle Reset
  const handleReset = () => {
    const result = resetHashMap(bucketSize);
    setBuckets(result.buckets);
    setHighlightedBucket(result.highlightedBucket);
    setLog(result.log);
    setLastOperation('reset');
  };

  // Handle Bucket Size Change
  const handleBucketSizeChange = (newSize) => {
    setBucketSize(newSize);
    setLog([
      `ℹ️ Bucket size set to ${newSize}`,
      `🔄 Click Reset to apply changes`,
    ]);
  };

  return (
    <div className="hashmap-internals-visualizer">
      {/* Header */}
      <div className="hashmap-header">
        <h2>🗺️ HashMap Internals Visualizer</h2>
        <p className="hashmap-subtitle">
          Understand how HashMaps work: hash functions, buckets, chaining, and collisions
        </p>
      </div>

      {/* Main Layout */}
      <div className="hashmap-layout">
        {/* Left Panel: Controls */}
        <div className="hashmap-controls-section">
          <ControlsPanel
            onInsert={handleInsert}
            onSearch={handleSearch}
            onDelete={handleDelete}
            onReset={handleReset}
            bucketSize={bucketSize}
            onBucketSizeChange={handleBucketSizeChange}
          />
        </div>

        {/* Center Panel: Visualization */}
        <div className="hashmap-visualization-section">
          <BucketArray buckets={buckets} highlightedBucket={highlightedBucket} />
        </div>

        {/* Right Panel: Logs & Statistics */}
        <div className="hashmap-log-section">
          <LogPanel log={log} statistics={statistics} />
        </div>
      </div>

      {/* Educational Footer */}
      <div className="hashmap-footer">
        <div className="footer-section">
          <h4>📚 Key Concepts</h4>
          <ul>
            <li><strong>Hash Function:</strong> index = key % bucketSize</li>
            <li><strong>Collision:</strong> When multiple keys hash to the same bucket</li>
            <li><strong>Chaining:</strong> Storing multiple nodes in same bucket via linked list</li>
            <li><strong>Load Factor:</strong> totalNodes / bucketSize (affects performance)</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>💻 Operations</h4>
          <ul>
            <li><strong>Insert:</strong> Add or update a key-value pair</li>
            <li><strong>Search:</strong> Find value by key</li>
            <li><strong>Delete:</strong> Remove a key-value pair</li>
            <li><strong>Average Time:</strong> O(1) with good hash function</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HashMapVisualizer;
