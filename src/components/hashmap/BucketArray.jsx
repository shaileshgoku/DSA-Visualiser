/**
 * BucketArray Component
 * Displays the entire hash map as an array of buckets
 */

import { motion } from 'framer-motion';
import Bucket from './Bucket.jsx';

function BucketArray({ buckets, highlightedBucket }) {
  return (
    <motion.div
      className="bucket-array-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bucket-array-header">
        <h3>Hash Map Buckets (Array Size: {buckets.length})</h3>
        <p className="bucket-array-info">Each bucket can store multiple nodes via chaining</p>
      </div>

      <div className="bucket-array">
        {buckets.map((chain, index) => (
          <Bucket
            key={index}
            index={index}
            chain={chain}
            isHighlighted={highlightedBucket === index}
            animationDelay={index * 0.05}
          />
        ))}
      </div>

      {/* Visual Guide */}
      <div className="bucket-guide">
        <div className="guide-item">
          <span className="guide-color empty"></span>
          <span className="guide-text">Empty bucket</span>
        </div>
        <div className="guide-item">
          <span className="guide-color has-data"></span>
          <span className="guide-text">Has data</span>
        </div>
        <div className="guide-item">
          <span className="guide-color highlighted"></span>
          <span className="guide-text">Active operation</span>
        </div>
      </div>
    </motion.div>
  );
}

export default BucketArray;
