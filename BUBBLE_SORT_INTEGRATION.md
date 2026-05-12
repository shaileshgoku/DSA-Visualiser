# Bubble Sort Integration Guide

## Overview
Bubble Sort has been integrated into the existing DSA Visualizer project with clean separation of concerns and reusable components.

---

## Architecture

### 1. Algorithm Module: `src/algorithms/bubbleSort.js`

**Exports:**
- `INITIAL_ARRAY` - Default test array
- `createInitialState(array)` - Creates initial visualization state
- `generateBubbleSortSteps(array)` - Pre-generates all animation steps
- `generateRandomArray(length, min, max)` - Creates random array

**Key Features:**
- **Step Generation**: Produces complete animation sequence upfront for efficient playback
- **Each step contains**:
  - `array` - Current sorted state
  - `comparing` - Indices being compared (e.g., [i, i+1])
  - `swapping` - Boolean flag if swap occurred
  - `sorted` - Indices of already-sorted elements
  - `pass` - Current pass number
  - `comparisons` - Total comparisons made
  - `swaps` - Total swaps performed
  - `stepCount` - Step number
  - `currentIndex` - Currently active index
  - `isComplete` - Sort finished flag

**Time Complexity:**
- Best: O(n) - Array already sorted
- Average: O(n²)
- Worst: O(n²)

**Space Complexity:** O(1)

---

### 2. Visualizer Component: `src/components/BubbleSortVisualizer.jsx`

**Responsibilities:**
- State management (current step, playback)
- User interactions (play, pause, reset, input)
- Auto-play with adjustable speed
- Step-by-step navigation (next/previous)

**Features:**
- Custom array input validation
- Random array generation
- Array size limit (20 elements) for performance
- Smooth animations with step playback
- Statistics display (pass, comparisons, swaps)
- Time complexity information
- Status messages for current operation

**Custom Sub-component: `BubbleSortArrayVisualizer`**
- Renders array bars with dynamic styling:
  - **Normal** - Default state
  - **Comparing** - Orange highlight with pulse animation
  - **Swapping** - Red highlight with rotation animation
  - **Sorted** - Green with permanent highlight

---

### 3. Integration Points

#### `src/algorithms/index.js`
Added Bubble Sort to ALGORITHMS registry:
```javascript
bubbleSort: {
  id: 'bubbleSort',
  name: 'Bubble Sort',
  description: 'Sort an array using the bubble sort algorithm...',
  category: 'sorting',  // New category!
  module: bubbleSort,
},
```

Updated `getComponentType()` router:
```javascript
if (algorithmId === 'bubbleSort') return 'bubbleSort';
```

#### `src/App.jsx`
- Imported `BubbleSortVisualizer`
- Added conditional render:
```javascript
{selectedAlgorithm === 'bubbleSort' && <BubbleSortVisualizer />}
```

#### `src/AlgorithmSelector.jsx`
No changes needed - automatically groups algorithms by category from registry.

---

### 4. Styling: `src/styles.css`

**New classes added:**

| Class | Purpose |
|-------|---------|
| `.array-box.comparing` | Comparing state (orange pulse) |
| `.array-box.swapping` | Swapping state (red rotate) |
| `.array-box.sorted` | Already sorted (green) |
| `.stats-panel` | Statistics grid display |
| `.stat-item` | Individual stat card |
| `.complexity-panel` | Time complexity info box |

---

## How It Works

### Step 1: Algorithm Generation
```javascript
const allSteps = generateBubbleSortSteps(currentArray);
// Returns: [
//   { array, comparing, swapping, sorted, pass, comparisons, swaps, ... },
//   { ... },
//   { array, comparing, swapping, sorted, pass, comparisons, swaps, isComplete: true }
// ]
```

### Step 2: Visualization
Component maintains `currentStepIndex` state:
```javascript
const currentStep = allSteps[currentStepIndex];
const { array, comparing, swapping, sorted } = currentStep;
```

### Step 3: Rendering
`BubbleSortArrayVisualizer` applies dynamic classes:
```javascript
const isSorted = sorted.includes(index);
const isComparing = comparing.includes(index);
let itemClass = 'array-box';
if (isSorted) itemClass += ' sorted';
else if (swapping && isComparing) itemClass += ' swapping';
else if (isComparing) itemClass += ' comparing';
```

### Step 4: Playback
- **Next Step**: `setCurrentStepIndex(prev => prev + 1)`
- **Auto-play**: Interval updates index at specified speed
- **Pause**: Clears interval

---

## File Changes Summary

### Created Files
1. **`src/algorithms/bubbleSort.js`** (114 lines)
   - Algorithm logic
   - Step generation
   - Utility functions

2. **`src/components/BubbleSortVisualizer.jsx`** (216 lines)
   - Main visualizer component
   - State management
   - Custom array visualizer sub-component

### Modified Files
1. **`src/algorithms/index.js`**
   - Added import: `import * as bubbleSort from './bubbleSort.js';`
   - Added to ALGORITHMS registry
   - Updated getComponentType() router

2. **`src/App.jsx`**
   - Added import: `import BubbleSortVisualizer from './components/BubbleSortVisualizer.jsx';`
   - Added render condition for bubbleSort

3. **`src/styles.css`** (Added ~90 lines)
   - Bubble Sort-specific animations
   - State-based styling (comparing, swapping, sorted)
   - Statistics panel styles
   - Complexity info styling

---

## Usage

### Selecting Bubble Sort
1. Open app
2. Dropdown shows algorithms grouped by category
3. Select "Bubble Sort" under "Sorting Algorithms"

### Controls
- **Apply Array**: Custom comma-separated input
- **Random Array**: Generate random 10-element array
- **Next Step →**: Advance one step
- **← Previous**: Go back one step
- **Reset**: Start over
- **▶ Autoplay**: Auto-play all steps
- **Speed Slider**: Control animation speed (200ms - 1600ms)

### Features
- Real-time comparison/swap visualization
- Pass tracking
- Comparison counter
- Swap counter
- Step navigation
- Array size limit: 20 elements (for performance)

---

## Performance Considerations

### Why Pre-generate Steps?
- ✅ Single O(n²) computation upfront
- ✅ Smooth constant-time playback
- ✅ Prevents stutter during animation
- ✅ Enables backward navigation (Previous)

### Optimization Tips
- Array limit: 20 elements (prevents excessive step generation)
- No re-renders during playback (uses simple state update)
- CSS animations (GPU-accelerated) for pulse/swap effects

---

## Testing

### Test Cases
1. **Default array**: [64, 34, 25, 12, 22, 11, 90]
2. **Already sorted**: [1, 2, 3, 4, 5]
3. **Reverse sorted**: [5, 4, 3, 2, 1]
4. **Duplicates**: [3, 1, 3, 1, 3]
5. **Single element**: [42]

### Validation
- Step count increases correctly
- Comparing/swapping states display correctly
- Sorted elements remain green after pass completion
- Final array is sorted correctly
- No existing algorithms broken

---

## No Breaking Changes

✅ Existing algorithms still work
✅ Controls are reused (no conflicts)
✅ ArrayVisualizer component unchanged
✅ Styling cascades cleanly
✅ New 'sorting' category doesn't interfere

---

## Future Enhancements

Optional additions:
1. **Selection Sort** - Similar visualization
2. **Insertion Sort** - Shows "insertion" phase
3. **Algorithm Comparison** - Side-by-side sorting
4. **Custom Speed Profiles** - Fast/Slow presets
5. **Detailed Steps Panel** - What's happening each step
6. **Undo/Redo** - Full playback history
7. **Code Highlight** - Show pseudocode side-by-side
