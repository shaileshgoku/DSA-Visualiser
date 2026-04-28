/**
 * LogPanel Component
 * Displays step-by-step operation log with statistics
 */

import { motion, AnimatePresence } from 'framer-motion';

function LogPanel({ log, statistics }) {
  return (
    <motion.div
      className="log-panel"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Statistics Box */}
      {statistics && (
        <div className="statistics-box">
          <h4>📊 HashMap Statistics</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Nodes:</span>
              <span className="stat-value">{statistics.totalNodes}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Empty Buckets:</span>
              <span className="stat-value">{statistics.emptyBuckets}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Max Chain:</span>
              <span className="stat-value">{statistics.maxChainLength}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Load Factor:</span>
              <span className="stat-value">{statistics.loadFactor}</span>
            </div>
          </div>
        </div>
      )}

      {/* Log Steps */}
      <div className="log-container">
        <h4>📝 Operation Log</h4>
        <AnimatePresence mode="wait">
          {log.length > 0 ? (
            <motion.div className="log-list">
              {log.map((message, index) => (
                <motion.div
                  key={index}
                  className="log-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="log-number">{index + 1}.</span>
                  <span className="log-message">{message}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p className="no-log">
              Operations will appear here...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Time Complexity Info */}
      <div className="complexity-info">
        <h4>⏱️ Time Complexity</h4>
        <ul>
          <li><strong>Insert:</strong> O(1) average, O(n) worst</li>
          <li><strong>Search:</strong> O(1) average, O(n) worst</li>
          <li><strong>Delete:</strong> O(1) average, O(n) worst</li>
        </ul>
        <p className="complexity-note">
          Worst case occurs with many collisions creating long chains
        </p>
      </div>
    </motion.div>
  );
}

export default LogPanel;
