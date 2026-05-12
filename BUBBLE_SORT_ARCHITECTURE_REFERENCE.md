# Bubble Sort - Component Architecture Reference

## Component Tree

```
App.jsx
├── AlgorithmSelector (unchanged)
│   └── Displays all algorithms grouped by category
│       └── "Bubble Sort" category: "sorting"
│
├── DutchFlagVisualizer (unchanged)
├── TwoPointerVisualizer (unchanged)
├── HashMapVisualizer (unchanged)
│
└── BubbleSortVisualizer ★ NEW
    ├── Input Section
    │   └── Array Input + Apply Button + Random Array Button
    │
    ├── Stats Panel
    │   ├── Step Counter
    │   ├── Pass Counter
    │   ├── Comparisons Counter
    │   └── Swaps Counter
    │
    ├── BubbleSortArrayVisualizer ★ NEW (Sub-component)
    │   └── Dynamic Array Bars
    │       ├── Normal (default)
    │       ├── Comparing (orange + pulse)
    │       ├── Swapping (red + rotate)
    │       └── Sorted (green)
    │
    ├── Status Panel
    │   └── Current operation message
    │
    ├── Complexity Panel
    │   └── Time/Space complexity info
    │
    └── Controls (reused)
        ├── Next Step
        ├── Previous
        ├── Reset
        ├── Autoplay/Pause
        └── Speed Slider
```

---

## Data Flow

### 1. Initialization
```
BubbleSortVisualizer mounted
    ↓
currentArray set to INITIAL_ARRAY = [64, 34, 25, 12, 22, 11, 90]
    ↓
generateBubbleSortSteps(currentArray) → allSteps array
    ↓
currentStepIndex = 0
    ↓
Render first step of allSteps[0]
```

### 2. Step Structure
```javascript
allSteps[i] = {
  array: [64, 34, 25, 12, 22, 11, 90],  // Current array state
  comparing: [0, 1],                     // Indices being compared
  swapping: false,                       // Did swap occur?
  sorted: [],                            // Indices in sorted portion
  pass: 0,                               // Current pass
  comparisons: 1,                        // Running total
  swaps: 0,                              // Running total
  stepCount: 0,                          // Step number
  currentIndex: 0,                       // Active comparison index
  isComplete: false                      // Done?
}
```

### 3. User Interaction Flow
```
User clicks "Next Step"
    ↓
handleNextStep() called
    ↓
setCurrentStepIndex(prev => prev + 1)
    ↓
React re-renders with allSteps[currentStepIndex]
    ↓
BubbleSortArrayVisualizer receives new comparing, swapping, sorted
    ↓
CSS classes applied (.comparing, .swapping, .sorted)
    ↓
Animations play (pulse, rotate)
    ↓
Stats update (comparison count, swap count, etc.)
```

### 4. Autoplay Flow
```
User clicks "Autoplay"
    ↓
setIsPlaying(true)
    ↓
useEffect detects isPlaying = true
    ↓
Sets setInterval calling setCurrentStepIndex every X ms
    ↓
Steps advance automatically
    ↓
When currentStepIndex reaches allSteps.length - 1
    ↓
isComplete becomes true
    ↓
setIsPlaying(false) and clear interval
```

---

## CSS Animation States

### Comparing State
```css
.array-box.comparing {
  border-color: #f59e0b;              /* Orange border */
  box-shadow: 0 0 0 3px rgba(...);    /* Glow effect */
  background: #fef3c7;                /* Orange tint */
  animation: pulse-compare 0.6s ease-in-out infinite;
}

@keyframes pulse-compare {
  0%, 100%   { transform: scale(1);    }
  50%        { transform: scale(1.08); }  /* Grows and shrinks */
}
```

### Swapping State
```css
.array-box.swapping {
  border-color: #ef4444;              /* Red border */
  box-shadow: 0 0 0 3px rgba(...);    /* Glow effect */
  background: #fee2e2;                /* Red tint */
  animation: pulse-swap 0.4s ease-in-out;
}

@keyframes pulse-swap {
  0%, 100%   { transform: rotate(0deg) scale(1);    }
  50%        { transform: rotate(2deg) scale(1.05); }  /* Rotates slightly */
}
```

### Sorted State
```css
.array-box.sorted {
  border-color: #16a34a;              /* Green border */
  background: #dcfce7;                /* Green background */
  color: #166534;                     /* Green text */
  /* No animation - permanent state */
}
```

---

## State Management

### Component State Variables
```javascript
// Input handling
const [arrayInput, setArrayInput] = useState(INITIAL_ARRAY.join(','));
const [inputError, setInputError] = useState('');
const [currentArray, setCurrentArray] = useState(INITIAL_ARRAY);

// Playback control
const [currentStepIndex, setCurrentStepIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [speed, setSpeed] = useState(700);

// Derived values
const currentStep = allSteps[currentStepIndex];
const { array, comparing, swapping, sorted, pass, comparisons, swaps, ... } = currentStep;
```

### Key Derived Values
```javascript
const allSteps = useMemo(() => generateBubbleSortSteps(currentArray), [currentArray]);
// Recomputes only when currentArray changes

const currentStep = allSteps[currentStepIndex];
// Always gets fresh data from generated steps

const totalSteps = allSteps.length;
// Used for progress tracking
```

---

## Algorithm - generateBubbleSortSteps Logic

```javascript
function generateBubbleSortSteps(array) {
  const steps = [];
  const arr = [...array];
  const n = arr.length;
  
  for (let pass = 0; pass < n - 1; pass++) {
    for (let i = 0; i < n - pass - 1; i++) {
      // Step 1: Show comparison
      steps.push({
        ..., comparing: [i, i+1], swapping: false
      });
      
      // Step 2: If swap needed, show swap
      if (arr[i] > arr[i + 1]) {
        arr = swap(arr, i, i + 1);
        steps.push({
          ..., comparing: [i, i+1], swapping: true
        });
      }
    }
    
    // Mark elements as sorted after each pass
    // Elements at indices n-pass-1 to n-1 are in final position
  }
  
  return steps;
}
```

---

## Event Handlers

### Input Handlers
```javascript
handleArrayInputChange(e)     // Update input field
handleApplyArray()            // Validate & apply custom array
handleGenerateRandomArray()   // Create random test array
```

### Playback Handlers
```javascript
handleNextStep()              // Advance currentStepIndex by 1
handlePrevStep()              // Decrease currentStepIndex by 1
handleReset()                 // Set currentStepIndex to 0, stop playing
handleToggleAutoplay()        // Toggle isPlaying boolean
```

### Effects
```javascript
useEffect for autoplay        // Manages setInterval for auto-step
                              // Clears on pause or completion
```

---

## Integration Points

### Algorithm Registry (`src/algorithms/index.js`)
```javascript
export const ALGORITHMS = {
  // ... other algorithms
  bubbleSort: {
    id: 'bubbleSort',
    name: 'Bubble Sort',
    description: '...',
    category: 'sorting',        // ← New category
    module: bubbleSort,
  },
};

export const getComponentType = (algorithmId) => {
  if (algorithmId === 'bubbleSort') return 'bubbleSort';
  // ... other routers
};
```

### App Router (`src/App.jsx`)
```javascript
{selectedAlgorithm === 'bubbleSort' && <BubbleSortVisualizer />}
```

### Algorithm Selector (`src/components/AlgorithmSelector.jsx`)
No changes needed - automatically groups by `category` field.

---

## Performance Characteristics

### Time Complexity
| Scenario | Complexity |
|----------|------------|
| Best case (already sorted) | O(n) |
| Average case | O(n²) |
| Worst case (reverse sorted) | O(n²) |
| Space | O(1) |

### Step Generation
- Pre-computed once on mount: O(n²)
- Playback: O(1) per step (array lookup)
- Total steps generated: Between n and n(n-1)/2

### Array Size Recommendations
- Safe: Up to 20 elements
- Reasonable: Up to 50 elements
- Slow: 100+ elements

---

## Browser Compatibility

✅ Modern browsers (all major)
- CSS Grid & Flexbox
- CSS Animations & Keyframes
- React Hooks (useState, useEffect, useMemo)
- ES6+ JavaScript

Tested on:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Accessibility Features

- Semantic HTML (`<section>`, `<label>`, `<button>`)
- ARIA labels: `aria-label`, `aria-live="polite"`
- Keyboard navigation support
- Color + text indicators (not just color)
- Status messages for screen readers

---

## Memory Usage

For array size n:
- Algorithm state: O(n²) - all steps stored
- Component state: O(1) - just indices/booleans
- DOM elements: O(n) - one bar per array element
- Total: O(n²) dominated by step array

Optimization: Could implement "lazy step generation" for huge arrays,
but current 20-element limit makes this unnecessary.
