/**
 * HashMap Internals Algorithm
 * Demonstrates how HashMaps work internally with chaining collision handling
 */

/**
 * Simple hash function
 * index = key % bucketSize
 * @param {number} key
 * @param {number} bucketSize
 * @returns {number} hash index
 */
export const hashFunction = (key, bucketSize) => {
  return Math.abs(parseInt(key)) % bucketSize;
};

/**
 * Initialize empty hash map
 * @param {number} bucketSize
 * @returns {Array<Array<{key: number, value: string}>>}
 */
export const initializeHashMap = (bucketSize = 7) => {
  return Array(bucketSize)
    .fill(null)
    .map(() => []);
};

/**
 * Insert operation (put)
 * Returns: { success, log, buckets, highlightedBucket }
 */
export const insert = (
  buckets,
  key,
  value,
  bucketSize
) => {
  const steps = [];
  const keyCopy = parseInt(key);

  if (isNaN(keyCopy)) {
    return {
      success: false,
      log: ['❌ Error: Invalid key. Please enter a number.'],
      buckets,
      highlightedBucket: null,
    };
  }

  steps.push(`🔍 Computing hash(${keyCopy})`);
  const index = hashFunction(keyCopy, bucketSize);
  steps.push(`📍 hash(${keyCopy}) = ${index} (${keyCopy} % ${bucketSize})`);
  steps.push(`🎯 Going to bucket [${index}]`);

  // Check if key already exists
  const existingNodeIndex = buckets[index].findIndex((node) => node.key === keyCopy);

  if (existingNodeIndex !== -1) {
    steps.push(`⚠️ Key ${keyCopy} already exists in bucket [${index}]`);
    steps.push(`📝 Updating value: "${buckets[index][existingNodeIndex].value}" → "${value}"`);
    
    const newBuckets = buckets.map((bucket) => [...bucket]);
    newBuckets[index][existingNodeIndex].value = value;
    
    return {
      success: true,
      log: steps,
      buckets: newBuckets,
      highlightedBucket: index,
    };
  }

  // Check for collision
  if (buckets[index].length > 0) {
    steps.push(`💥 Collision detected! Bucket [${index}] is not empty.`);
    steps.push(`🔗 Using chaining: appending to linked list`);
  } else {
    steps.push(`✅ Bucket [${index}] is empty`);
  }

  steps.push(`➕ Inserting node: { key: ${keyCopy}, value: "${value}" }`);

  const newBuckets = buckets.map((bucket) => [...bucket]);
  newBuckets[index].push({ key: keyCopy, value });

  steps.push(`✨ Insertion successful!`);

  return {
    success: true,
    log: steps,
    buckets: newBuckets,
    highlightedBucket: index,
  };
};

/**
 * Search operation (get)
 */
export const search = (buckets, key, bucketSize) => {
  const steps = [];
  const keyCopy = parseInt(key);

  if (isNaN(keyCopy)) {
    return {
      success: false,
      log: ['❌ Error: Invalid key. Please enter a number.'],
      buckets,
      highlightedBucket: null,
      found: false,
      value: null,
    };
  }

  steps.push(`🔍 Searching for key: ${keyCopy}`);
  const index = hashFunction(keyCopy, bucketSize);
  steps.push(`📍 hash(${keyCopy}) = ${index}`);
  steps.push(`🎯 Checking bucket [${index}]`);

  const chain = buckets[index];
  if (chain.length === 0) {
    steps.push(`❌ Bucket [${index}] is empty → Key not found`);
    return {
      success: true,
      log: steps,
      buckets,
      highlightedBucket: index,
      found: false,
      value: null,
    };
  }

  steps.push(`🔗 Traversing linked list (${chain.length} node${chain.length > 1 ? 's' : ''})`);

  for (let i = 0; i < chain.length; i++) {
    const node = chain[i];
    steps.push(`   → Node ${i}: key=${node.key}, value="${node.value}"`);
    if (node.key === keyCopy) {
      steps.push(`✅ Key found! Value = "${node.value}"`);
      return {
        success: true,
        log: steps,
        buckets,
        highlightedBucket: index,
        found: true,
        value: node.value,
      };
    }
  }

  steps.push(`❌ Key not found in chain`);
  return {
    success: true,
    log: steps,
    buckets,
    highlightedBucket: index,
    found: false,
    value: null,
  };
};

/**
 * Delete operation (remove)
 */
export const remove = (buckets, key, bucketSize) => {
  const steps = [];
  const keyCopy = parseInt(key);

  if (isNaN(keyCopy)) {
    return {
      success: false,
      log: ['❌ Error: Invalid key. Please enter a number.'],
      buckets,
      highlightedBucket: null,
    };
  }

  steps.push(`🗑️ Deleting key: ${keyCopy}`);
  const index = hashFunction(keyCopy, bucketSize);
  steps.push(`📍 hash(${keyCopy}) = ${index}`);
  steps.push(`🎯 Going to bucket [${index}]`);

  const chain = buckets[index];
  const nodeIndex = chain.findIndex((node) => node.key === keyCopy);

  if (nodeIndex === -1) {
    steps.push(`❌ Key not found in bucket [${index}]`);
    return {
      success: true,
      log: steps,
      buckets,
      highlightedBucket: index,
    };
  }

  steps.push(`🔗 Found at position ${nodeIndex} in chain`);
  const removedNode = chain[nodeIndex];
  steps.push(`📍 Removing node: { key: ${removedNode.key}, value: "${removedNode.value}" }`);

  const newBuckets = buckets.map((bucket) => [...bucket]);
  newBuckets[index].splice(nodeIndex, 1);

  if (nodeIndex > 0) {
    steps.push(`🔗 Reconnecting: node ${nodeIndex - 1} → node ${nodeIndex + 1 < chain.length ? nodeIndex + 1 : 'null'}`);
  }

  steps.push(`✅ Deletion successful!`);

  return {
    success: true,
    log: steps,
    buckets: newBuckets,
    highlightedBucket: index,
  };
};

/**
 * Reset hash map
 */
export const resetHashMap = (bucketSize) => {
  return {
    buckets: initializeHashMap(bucketSize),
    log: ['🔄 HashMap reset to empty state'],
    highlightedBucket: null,
  };
};

/**
 * Get statistics
 */
export const getStatistics = (buckets) => {
  const totalNodes = buckets.reduce((sum, bucket) => sum + bucket.length, 0);
  const emptyBuckets = buckets.filter((bucket) => bucket.length === 0).length;
  const maxChainLength = Math.max(...buckets.map((bucket) => bucket.length), 0);
  const loadFactor = (totalNodes / buckets.length).toFixed(2);

  return {
    totalNodes,
    emptyBuckets,
    maxChainLength,
    loadFactor,
  };
};
