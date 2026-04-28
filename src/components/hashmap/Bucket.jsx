/**
 * Bucket Component
 * Represents a single bucket in the hash map with its linked list chain
 */

import { motion } from 'framer-motion';
import Node from './Node.jsx';

function Bucket({ index, chain, isHighlighted, animationDelay = 0 }) {
  const isEmpty = chain.length === 0;

  return (
    <motion.div
      className={`bucket ${isHighlighted ? 'highlighted' : ''} ${isEmpty ? 'empty' : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay }}
    >
      {/* Bucket Index Label */}
      <div className="bucket-index">
        <strong>[{index}]</strong>
      </div>

      {/* Bucket Content */}
      <div className="bucket-content">
        {isEmpty ? (
          <div className="empty-bucket">
            <span className="empty-text">∅</span>
          </div>
        ) : (
          <div className="chain">
            {chain.map((node, nodeIndex) => (
              <motion.div key={nodeIndex} className="chain-item">
                <Node
                  data={node}
                  isHighlighted={isHighlighted}
                  animationDelay={animationDelay + nodeIndex * 0.1}
                />
              </motion.div>
            ))}
            <div className="chain-end">null</div>
          </div>
        )}
      </div>

      {/* Load Factor Badge */}
      {!isEmpty && (
        <div className="load-badge">
          <span className="load-info">{chain.length}</span>
        </div>
      )}
    </motion.div>
  );
}

export default Bucket;
