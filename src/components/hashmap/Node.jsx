/**
 * Node Component
 * Represents a single key-value pair node in the linked list
 */

import { motion } from 'framer-motion';

function Node({ data, isHighlighted, animationDelay }) {
  return (
    <motion.div
      className={`node ${isHighlighted ? 'highlighted' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: animationDelay }}
    >
      <div className="node-content">
        <span className="node-key">{data.key}</span>
        <span className="node-separator">:</span>
        <span className="node-value">{data.value}</span>
      </div>
      {/* Arrow pointing to next node */}
      <div className="node-arrow">→</div>
    </motion.div>
  );
}

export default Node;
