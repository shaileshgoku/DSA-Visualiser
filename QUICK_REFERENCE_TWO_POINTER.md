# Two Pointer Visualizer - Quick Reference

## Key Architecture

### Algorithm Flow
```
Input: array, target
↓
Step 1: Sort array
↓
Initialize: left = 0, right = length - 1
↓
Loop: Calculate sum = arr[left] + arr[right]
├─ sum == target → FOUND ✅
├─ sum < target → Move left++
└─ sum > target → Move right--
↓
Output: Pair found or not found
```

## File Structure

```
src/
├── algorithms/
│   ├── twoPointerSum.js          (Step generation)
│   └── index.js                  (Registry - MODIFIED)
│
├── components/
│   ├── TwoPointerVisualizer.jsx      (Main component - NEW)
│   ├── TwoPointerArrayVisualizer.jsx (Display - NEW)
│   └── Controls.jsx              (REUSED)
│
├── App.jsx                        (MODIFIED - Added routing)
├── styles.css                     (MODIFIED - Added styles)
└── main.jsx
```

## Usage Example

### Input
```javascript
Array: [3, 2, 4, 1, 5]
Target: 9
```

### Output
```javascript
Steps:
1. Sort: [1, 2, 3, 4, 5]
2. left=0, right=4, sum=6 < 9 → move left
3. left=1, right=4, sum=7 < 9 → move left
4. left=2, right=4, sum=8 < 9 → move left
5. left=3, right=4, sum=9 = 9 → FOUND [4, 5]
```

## Component Props

### TwoPointerArrayVisualizer
```javascript
<TwoPointerArrayVisualizer
  array={array}                 // number[]
  left={leftIndex}              // number
  right={rightIndex}            // number
  foundPair={[a, b] || null}   // number[] | null
/>
```

### Controls (Reused)
```javascript
<Controls
  onNextStep={handleNextStep}
  onPrevStep={handlePrevStep}
  onReset={handleReset}
  onToggleAutoplay={handleToggleAutoplay}
  isPlaying={boolean}
  speed={number}                // 200-1600ms
  onSpeedChange={setSpeed}
  disableNext={boolean}
  disablePrev={boolean}
  isComplete={boolean}
/>
```

## CSS Classes

| Class | Purpose |
|-------|---------|
| `.pointer-left` | Blue pointer label (L) |
| `.pointer-right` | Red pointer label (R) |
| `.highlight-left` | Blue shadow on left pointer box |
| `.highlight-right` | Red shadow on right pointer box |
| `.highlight-found` | Green glow + pulse animation on found pair |
| `.current-sum-display` | Shows current sum vs target |
| `.result-panel` | Final result container |
| `.result-found` | Green theme for success |
| `.result-not-found` | Red theme for failure |

## State Structure

```javascript
{
  array: [1, 2, 3, 4, 5],        // Sorted array
  sortedArray: [1, 2, 3, 4, 5],
  left: 0,                        // Left pointer index
  right: 4,                       // Right pointer index
  currentSum: 6,                  // arr[left] + arr[right]
  target: 9,                      // Target to find
  action: "Sum 6 < 9, move LEFT",
  stepCount: 1,
  isComplete: false,
  found: false,
  foundPair: null,
  isSorted: false
}
```

## Step Generation Pattern

```javascript
// Each step returns new state with:
// 1. Updated pointers
// 2. New currentSum
// 3. Action message
// 4. Completion status

const nextState = getNextTwoPointerStep(currentState);
// Returns: {...currentState, left: 1, action: "...", stepCount: 2}
```

## Validation Rules

- ✅ Array: Comma-separated integers
- ✅ Minimum 2 elements
- ✅ Target: Valid integer (can be negative)
- ✅ Elements: Can be positive, negative, or zero

## Animation System

```javascript
// Speed control: 200ms - 1600ms
useEffect(() => {
  if (!isPlaying || isComplete) return;
  
  const timer = setInterval(() => {
    setVisualizerState(state => getNextTwoPointerStep(state));
  }, speed);
  
  return () => clearInterval(timer);
}, [isPlaying, isComplete, speed]);
```

## Adding to Visualizer (Integration Checklist)

- [x] Created `twoPointerSum.js` with algorithm logic
- [x] Created `TwoPointerVisualizer.jsx` component
- [x] Created `TwoPointerArrayVisualizer.jsx` display component
- [x] Updated `algorithms/index.js` registry
- [x] Updated `App.jsx` with conditional render
- [x] Added CSS styles in `styles.css`
- [x] Tested inputs and validation
- [x] Verified animation loop
- [x] Checked step history (undo)

## Common Modifications

### To Add Different Algorithm:
1. Create `src/algorithms/newAlgorithm.js` with `createInitialState()` and `getNextStep()`
2. Create visualizer component `src/components/NewVisualizer.jsx`
3. Add to registry in `src/algorithms/index.js`
4. Add rendering logic in `src/App.jsx`
5. Add CSS as needed

### To Change Default Array/Target:
Edit `TwoPointerVisualizer.jsx`:
```javascript
const DEFAULT_ARRAY = [3, 2, 4, 1, 5];  // ← Change here
const DEFAULT_TARGET = 9;                // ← Change here
```

### To Change Color Scheme:
Edit `src/styles.css`:
```css
.pointer-left { background: #2563eb; }   /* Blue */
.pointer-right { background: #dc2626; }  /* Red */
```

## Performance Notes

- **Sorting**: O(n log n) - only done in first step
- **Two-pointer scan**: O(n) - single pass through array
- **Memory**: O(1) auxiliary space (excluding array copy)
- **Re-renders**: Only when state changes
- **Animation**: 60fps possible with speed control

## Error Messages

```javascript
"Array contains invalid numbers"
"Array must have at least 2 numbers"
"Target must be a valid number"
"Invalid input. Please check your entries."
```

## Testing Examples

```javascript
// Test 1: Found pair
Input: [3, 2, 4, 1, 5], Target: 9
Expected: Found [4, 5]

// Test 2: Not found
Input: [1, 2, 3], Target: 10
Expected: Not found

// Test 3: Single solution
Input: [2, 7, 11, 15], Target: 9
Expected: Found [2, 7]

// Test 4: Multiple solutions (returns first)
Input: [1, 2, 3, 4, 5], Target: 6
Expected: Found [1, 5] (or [2, 4])

// Test 5: Negative numbers
Input: [-1, 0, 1, 2, -1, -4], Target: 0
Expected: Found [-1, 1]
```

## Debug Tips

```javascript
// To see algorithm state at each step:
console.log(visualizerState);

// To verify sorted array:
console.log("Sorted:", visualizerState.array);

// To check pointer positions:
console.log(`L: ${left}, R: ${right}, Sum: ${currentSum}`);

// To verify step history:
console.log("History length:", stepHistory.length);
```

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- Uses modern React 18 features (hooks)

---

Generated: Two Pointer Algorithm Visualizer
