# HashMap Internals Visualizer - Integration Guide

## Overview

The HashMap Internals Visualizer has been fully integrated into your DSA Visualizer app, replacing the previous problem-solving approach. It now provides **interactive, real-time visualization** of how HashMaps work internally.

---

## 🎯 What Changed

### Removed
- `ProblemSelector.jsx` (hashmap-specific)
- `InputPanel.jsx` (problem-based)
- `HashTableView.jsx`
- `StepLog.jsx`
- Problem generators: `arrayEquality.js`, `anagramCheck.js`, `twoSum.js`, `problems.js`

### Added
- **Core Algorithm:** `src/algorithms/hashmap/hashMapInternals.js`
- **Components:**
  - `Node.jsx` - Individual key-value pair node
  - `Bucket.jsx` - Bucket with linked list chain
  - `BucketArray.jsx` - Full hash map visualization
  - `ControlsPanel.jsx` - Input and action buttons
  - `LogPanel.jsx` - Operation log + statistics
  - `HashMapVisualizer.jsx` - Main orchestrator (replaced)

- **Styles:** `src/styles/hashmap-internals.css` - Complete styling system

---

## 📁 New File Structure

```
src/
├── algorithms/
│   ├── hashmap/
│   │   ├── hashMapInternals.js     ← Core logic (hash, insert, search, delete)
│   │   └── index.js                 ← Exports
│   └── index.js                     ← Updated routing
├── components/
│   ├── hashmap/
│   │   ├── HashMapVisualizer.jsx    ← Main component
│   │   ├── ControlsPanel.jsx        ← Input controls
│   │   ├── BucketArray.jsx          ← Visualization
│   │   ├── Bucket.jsx               ← Individual bucket
│   │   ├── Node.jsx                 ← Individual node
│   │   └── LogPanel.jsx             ← Logs & stats
│   └── AlgorithmSelector.jsx        ← Updated
├── styles/
│   └── hashmap-internals.css        ← All component styles
├── App.jsx                          ← Updated routing
├── main.jsx                         ← Updated imports
└── styles.css                       ← Global (unchanged)
```

---

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

> **Note:** `framer-motion` is now listed in `package.json`. If not already installed:
> ```bash
> npm install framer-motion@^10.16.0
> ```

### 2. Start Development Server

```bash
npm run dev
```

Then navigate to the app and select **"HashMap Internals Visualizer"** from the dropdown.

---

## 🚀 How It Works

### Algorithm Flow

The visualizer uses a **simple modulo hash function:**

```javascript
index = key % bucketSize
```

#### Operations:

**1. Insert (put)**
- Compute hash index
- Check for existing key (update value) or collision
- Add node to bucket's linked list
- Log each step with emojis

**2. Search (get)**
- Compute hash index
- Traverse bucket's linked list
- Return found/not found status
- Show traversal in log

**3. Delete (remove)**
- Compute hash index
- Find and remove node
- Reconnect chain if needed
- Log removal steps

**4. Reset**
- Clear all buckets
- Return to empty state

### State Management

Main state in `HashMapVisualizer.jsx`:

```javascript
{
  buckets: Array<Array<{key, value}>>,    // 2D array structure
  bucketSize: number,                      // Configurable (5, 7, 11, 13)
  highlightedBucket: number | null,        // Current operation highlight
  log: string[],                           // Step-by-step log
  lastOperation: string                    // Track operation type
}
```

---

## 🎨 UI Components

### Left Panel: Controls (`ControlsPanel.jsx`)
- **Bucket size selector** (5, 7, 11, 13)
- **Key input** (numeric)
- **Value input** (string)
- **Action buttons:** Insert, Search, Delete, Reset
- **Instructions** for users

### Center Panel: Visualization (`BucketArray.jsx`)
- **Bucket array grid** showing all buckets
- **Bucket index labels** [0], [1], etc.
- **Linked lists** displayed vertically
- **Node cards** with key:value pairs
- **Color coding:**
  - Yellow highlight = active operation
  - Green = node with data
  - Red = error state

### Right Panel: Logs & Stats (`LogPanel.jsx`)
- **Statistics box** (total nodes, empty buckets, max chain, load factor)
- **Operation log** with step-by-step emoji annotations
- **Time complexity** reference
- **Scrollable** for long operations

---

## 💡 Key Features

### ✅ Hash Function Visualization
Shows: `key → hash(key) → index`

Example:
```
Input: key=23, bucketSize=7
Output: 23 % 7 = 2
Goes to bucket [2]
```

### ✅ Collision Handling (Chaining)
- Multiple keys can hash to same bucket
- Displayed as linked list: `node1 → node2 → node3 → null`
- Each collision is logged

### ✅ Dynamic Bucket Size
- Change bucket size before reset
- Affects hash distribution
- Re-hash all existing data on reset

### ✅ Real-Time Statistics
- **Total Nodes:** Count of all key-value pairs
- **Empty Buckets:** Buckets with no data
- **Max Chain:** Longest linked list in any bucket
- **Load Factor:** totalNodes / bucketSize

### ✅ Animated Transitions
- Framer Motion handles:
  - Node insertion animations
  - Bucket highlight pulse
  - Smooth log entry appearances
  - Component fade-ins

### ✅ Graceful Error Handling
- Invalid input validation
- Clear error messages
- User-friendly feedback

---

## 📋 Algorithm Details

### Hash Function

```javascript
export const hashFunction = (key, bucketSize) => {
  return Math.abs(parseInt(key)) % bucketSize;
};
```

Simple modulo hash - converts any key to bucket index.

### Insert Logic

```
1. Validate key (must be number)
2. Compute index = hashFunction(key, bucketSize)
3. Check if key exists in bucket[index]
   - If yes: Update value
   - If no: Append to end of chain
4. If bucket not empty: Log collision
5. Return success + updated buckets + log
```

### Search Logic

```
1. Validate key
2. Compute index = hashFunction(key, bucketSize)
3. If bucket[index] empty: Return "Not found"
4. Otherwise: Traverse chain
   - Check each node's key
   - If match found: Return value
   - If no match: Return "Not found"
5. Log traversal steps
```

### Delete Logic

```
1. Validate key
2. Compute index = hashFunction(key, bucketSize)
3. Find node in bucket[index] chain
4. If found: Remove and reconnect chain
5. If not found: Return "Key not found"
6. Log removal details
```

---

## 🎓 Educational Value

### Concepts Demonstrated

1. **Hash Functions:** Simple modulo-based hashing
2. **Buckets:** Array-based storage structure
3. **Collision Handling:** Chaining with linked lists
4. **Time Complexity:**
   - Average: O(1) with good hash distribution
   - Worst: O(n) with many collisions
5. **Load Factor:** Indicator of hash table fullness

### How Students Learn

- **Visual:** See buckets fill up in real-time
- **Interactive:** Try different operations
- **Logged:** Read step-by-step explanation
- **Immediate Feedback:** Errors highlighted instantly

---

## 🔌 Integration Points

### App Routing (`src/App.jsx`)

```javascript
{selectedAlgorithm === 'hashMapInternals' && <HashMapVisualizer />}
```

### Algorithm Selector (`src/components/AlgorithmSelector.jsx`)

Now renders `hashMapInternals` as an option:

```javascript
{
  id: 'hashMapInternals',
  name: 'HashMap Internals Visualizer',
  description: 'Understand how HashMaps work internally...',
  category: 'hashmap',
}
```

### Main Imports (`src/main.jsx`)

```javascript
import './styles/hashmap-internals.css';
```

Loads all HashMap styling.

---

## 🎬 Animation System (Framer Motion)

### Motion Components

1. **BucketArray** - Fades in with staggered children
2. **Bucket** - Slides up with animation delay
3. **Node** - Scales in on insertion
4. **LogPanel** - Slides in from right
5. **ControlsPanel** - Fades in from top

### Highlight Animation

```css
@keyframes pulse-highlight {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(243, 156, 18, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(243, 156, 18, 0);
  }
}
```

Automatically applied when bucket is highlighted.

---

## 🧪 Testing the Visualizer

### Test Case 1: Basic Insert

1. Set key = `5`, value = `"apple"`
2. Click **Insert**
3. Observe:
   - Hash computed: `5 % 7 = 5`
   - Node appears in bucket [5]
   - Log shows steps

### Test Case 2: Collision

1. Insert key = `5`, value = `"apple"`
2. Insert key = `12`, value = `"banana"`
3. Notice: Both hash to bucket [5]
4. They form a chain: `5:apple → 12:banana → null`

### Test Case 3: Update Existing Key

1. Insert key = `5`, value = `"apple"`
2. Insert key = `5`, value = `"avocado"`
3. Value updates, no new node created

### Test Case 4: Search

1. Insert several items
2. Click **Search** with a key
3. Observe traversal highlighted in log

### Test Case 5: Delete

1. Build a chain (create collisions)
2. Delete a node
3. Observe chain reconnection

---

## 📊 Styling System

All styles in `src/styles/hashmap-internals.css`:

- **Color Scheme:** Blue (#3498db), Green (#2ecc71), Red (#e74c3c), Gray (#95a5a6)
- **Layout:** CSS Grid for responsive design
- **Animations:** Keyframes + Framer Motion
- **Breakpoints:** Mobile (768px), Tablet (1024px), Desktop (1400px)

---

## 🐛 Troubleshooting

### Issue: Styles not loading
**Solution:** Ensure `src/main.jsx` imports `'./styles/hashmap-internals.css'`

### Issue: Framer Motion not found
**Solution:** Run `npm install framer-motion@^10.16.0`

### Issue: Algorithm selector shows old options
**Solution:** Update `src/algorithms/index.js` to export new ALGORITHMS object ✅

### Issue: Components not rendering
**Solution:** Check that `HashMapVisualizer` is imported in `App.jsx` ✅

---

## 🚀 Future Enhancements

1. **Better Hash Functions:**
   - Multiply-mod-prime
   - Jenkins hash
   - User-selectable

2. **Resizing:**
   - Automatic rehashing when load factor exceeds threshold
   - Visualize resizing process

3. **More Collision Strategies:**
   - Linear probing
   - Quadratic probing
   - Double hashing

4. **Performance Analysis:**
   - Real-time complexity tracker
   - Collision statistics graph

5. **Pre-loaded Examples:**
   - "Good Distribution"
   - "Worst Case"
   - "Load Factor Impact"

---

## 📚 Files Checklist

✅ `src/algorithms/hashmap/hashMapInternals.js` - Core logic
✅ `src/algorithms/hashmap/index.js` - Updated exports
✅ `src/algorithms/index.js` - Updated routing
✅ `src/components/hashmap/HashMapVisualizer.jsx` - Main component
✅ `src/components/hashmap/ControlsPanel.jsx` - Controls
✅ `src/components/hashmap/BucketArray.jsx` - Visualization
✅ `src/components/hashmap/Bucket.jsx` - Bucket container
✅ `src/components/hashmap/Node.jsx` - Node display
✅ `src/components/hashmap/LogPanel.jsx` - Logs & stats
✅ `src/components/AlgorithmSelector.jsx` - Updated selector
✅ `src/styles/hashmap-internals.css` - Styling
✅ `src/main.jsx` - Updated imports
✅ `src/App.jsx` - Updated routing
✅ `package.json` - Added framer-motion

---

## 📖 Next Steps

1. Run `npm install` to get framer-motion
2. Start dev server: `npm run dev`
3. Select "HashMap Internals Visualizer" from dropdown
4. Try inserting, searching, and deleting
5. Observe how hash function and collisions work
6. Explore different bucket sizes

---

## 💬 Component Prop Reference

### HashMapVisualizer
**State:** buckets, bucketSize, log, statistics
**No props (root component)**

### ControlsPanel
```javascript
{
  onInsert: (key, value) => void,
  onSearch: (key) => void,
  onDelete: (key) => void,
  onReset: () => void,
  bucketSize: number,
  onBucketSizeChange: (size) => void
}
```

### BucketArray
```javascript
{
  buckets: Array<Array<{key, value}>>,
  highlightedBucket: number | null
}
```

### Bucket
```javascript
{
  index: number,
  chain: Array<{key, value}>,
  isHighlighted: boolean,
  animationDelay: number
}
```

### Node
```javascript
{
  data: {key, value},
  isHighlighted: boolean,
  animationDelay: number
}
```

### LogPanel
```javascript
{
  log: string[],
  statistics: {totalNodes, emptyBuckets, maxChainLength, loadFactor}
}
```

---

## ✨ Complete! Ready to Use

Your HashMap Internals Visualizer is fully integrated and ready to educate users about how HashMaps work internally. All components, styles, logic, and routing are in place.

**Start the dev server and explore!** 🚀
