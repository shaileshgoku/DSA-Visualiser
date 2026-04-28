## 🏗️ Multi-Problem DSA Visualizer - Architecture Guide

### Overview

This is a **scalable, modular DSA Visualizer platform** designed to support multiple algorithm types. It uses a problem configuration system that separates logic from UI, making it easy to add new algorithms.

---

## 📁 Project Structure

```
src/
├── algorithms/
│   ├── dutchFlagStep.js         (Existing: Array-based algorithm)
│   ├── index.js                  (Updated: Unified algorithm registry)
│   └── hashmap/                  (NEW: HashMap-based problems)
│       ├── problems.js           (Problem definitions & metadata)
│       ├── arrayEquality.js      (Step generator)
│       ├── anagramCheck.js       (Step generator)
│       ├── twoSum.js             (Step generator)
│       └── index.js              (Exports)
│
├── components/
│   ├── AlgorithmSelector.jsx     (Updated: Now shows all problem categories)
│   ├── Controls.jsx              (Updated: Enhanced with prev step)
│   ├── DutchFlagVisualizer.jsx   (Existing: Array algorithm visualizer)
│   └── hashmap/                  (NEW: HashMap visualization)
│       ├── HashMapVisualizer.jsx (Main orchestrator)
│       ├── ProblemSelector.jsx   (Problem dropdown)
│       ├── InputPanel.jsx        (Dynamic form inputs)
│       ├── HashTableView.jsx     (HashMap visualization)
│       └── StepLog.jsx           (Step history panel)
│
├── App.jsx                       (Updated: Dynamic routing)
├── main.jsx                      (Existing)
└── styles.css                    (Updated: HashMap component styles)
```

---

## 🎯 Key Design Patterns

### 1. **Problem Configuration System**

Each problem is defined with metadata and step generation:

```javascript
// src/algorithms/hashmap/problems.js
export const HASHMAP_PROBLEMS = {
  arrayEquality: {
    id: 'arrayEquality',
    name: 'Array Equality (Frequency Map)',
    description: '...',
    category: 'HashMap',
    difficulty: 'Easy',
    inputs: [
      { name: 'arrayA', label: 'Array A', placeholder: '...' },
      { name: 'arrayB', label: 'Array B', placeholder: '...' }
    ],
    validate: (a, b) => { /* validation logic */ }
  },
  // More problems...
};
```

**Benefits:**
- No hardcoded logic in UI
- Metadata drives UI rendering
- Easy to add new problems

---

### 2. **Generic Step Format**

All problems generate steps with a common structure:

```javascript
{
  type: 'insert' | 'lookup' | 'decrement' | 'match' | 'error' | 'success' | 'init',
  message: string,           // User-friendly message
  description: string,       // Technical description
  hashmap: {},              // Current HashMap state
  currentValue?: any,       // Current element being processed
  currentIndex?: number,    // Current array/string index
  complement?: any,         // For Two Sum lookups
  result?: boolean,         // Final success/failure
  indices?: [number, number] // For Two Sum
}
```

**Benefits:**
- Consistent UI rendering logic
- Easy animations/highlighting
- Flexible for different problems

---

### 3. **Component Architecture**

#### **HashMapVisualizer** (Main Orchestrator)
- Manages overall state
- Problem selection
- Input handling
- Step generation & navigation
- Integrates all sub-components

```jsx
<HashMapVisualizer>
  ├── ProblemSelector
  ├── InputPanel
  ├── HashTableView
  ├── StepLog
  └── Controls
</HashMapVisualizer>
```

#### **Reusable Components**
- `ProblemSelector` - Problem dropdown (uses HASHMAP_PROBLEMS)
- `InputPanel` - Dynamic form (driven by problem config)
- `HashTableView` - HashMap visualization
- `StepLog` - Step history/timeline
- `Controls` - Navigation & speed (backward compatible)

---

### 4. **Algorithm Registry**

Updated to support multiple categories:

```javascript
// src/algorithms/index.js
export const ALGORITHMS = {
  dutchFlag: { id: 'dutchFlag', category: 'array', ... },
  // HashMap problems are handled separately
};

export const getComponentType = (algorithmId) => {
  if (algorithmId === 'dutchFlag') return 'array';
  if (Object.keys(HASHMAP_PROBLEMS).includes(algorithmId)) return 'hashmap';
  return 'unknown';
};
```

**Routing in App.jsx:**
```jsx
const componentType = getComponentType(selectedAlgorithm);

{selectedAlgorithm === 'dutchFlag' && <DutchFlagVisualizer />}
{componentType === 'hashmap' && <HashMapVisualizer />}
```

---

## 🔄 Data Flow

### When User Selects a Problem:

```
1. User selects problem from dropdown
   ↓
2. AlgorithmSelector → App.jsx (setSelectedAlgorithm)
   ↓
3. App.jsx calls getComponentType() to determine which visualizer
   ↓
4. If HashMap: Render <HashMapVisualizer />
   ↓
5. HashMapVisualizer reads HASHMAP_PROBLEMS config
   ↓
6. InputPanel renders dynamic form based on problem.inputs
```

### When User Provides Input:

```
1. User enters data in InputPanel
   ↓
2. handleInputChange() updates state
   ↓
3. useEffect detects input change
   ↓
4. Calls appropriate step generator (generateArrayEqualitySteps, etc.)
   ↓
5. Generator returns array of step objects
   ↓
6. HashTableView renders current step with highlights
   ↓
7. StepLog shows execution history
```

---

## ✨ Current Problems Supported

### 1. **Array Equality** (Frequency Map)
- **Goal:** Check if two arrays have same elements with same frequencies
- **Algorithm:** Build frequency map from array A, verify with array B
- **Steps:** insert → decrement → success/error
- **Time Complexity:** O(n + m)

### 2. **Anagram Check**
- **Goal:** Check if two strings are anagrams
- **Algorithm:** Frequency map + character matching
- **Steps:** insert → decrement → success/error
- **Time Complexity:** O(n)

### 3. **Two Sum**
- **Goal:** Find two indices whose values sum to target
- **Algorithm:** HashMap for O(1) complement lookup
- **Steps:** insert → lookup → match → success/error
- **Time Complexity:** O(n)

---

## 🚀 How to Add a New HashMap Problem

### Step 1: Define Problem in `problems.js`

```javascript
export const HASHMAP_PROBLEMS = {
  // ... existing problems
  
  newProblem: {
    id: 'newProblem',
    name: 'New Problem Name',
    description: '...',
    category: 'HashMap',
    difficulty: 'Easy|Medium|Hard',
    inputs: [
      { name: 'input1', label: 'Input Label 1', placeholder: '...' },
      { name: 'input2', label: 'Input Label 2', placeholder: '...' }
    ],
    validate: (input1, input2) => {
      if (!input1) return 'Input 1 required';
      return null;
    }
  }
};
```

### Step 2: Create Step Generator

```javascript
// src/algorithms/hashmap/newProblem.js

export const generateNewProblemSteps = (input1, input2) => {
  const steps = [];
  
  steps.push({
    type: 'init',
    message: 'Starting...',
    hashmap: {},
    description: '...'
  });
  
  // Add more steps
  // Follow the standard step format
  
  steps.push({
    type: 'success',
    message: 'Success!',
    hashmap: finalHashmap,
    result: true
  });
  
  return steps;
};
```

### Step 3: Export from `hashmap/index.js`

```javascript
export { generateNewProblemSteps } from './newProblem.js';
```

### Step 4: Register in `HashMapVisualizer.jsx`

```javascript
import { generateNewProblemSteps } from '../../algorithms/hashmap/index.js';

const STEP_GENERATORS = {
  arrayEquality: generateArrayEqualitySteps,
  anagramCheck: generateAnagramSteps,
  twoSum: generateTwoSumSteps,
  newProblem: generateNewProblemSteps,  // ADD THIS
};

// Update input parsing:
if (selectedProblem === 'newProblem') {
  const input1 = inputs.input1;
  const input2 = inputs.input2;
  stepArray = generator(input1, input2);
}
```

### Step 5: Done! ✅

The UI automatically adapts:
- Problem appears in dropdown
- InputPanel shows configured inputs
- Steps are generated and visualized

---

## 🌐 Scaling to Full DSA Platform

### Phase 1: HashMap ✅ (COMPLETED)
- [x] Array Equality
- [x] Anagram Check
- [x] Two Sum

### Phase 2: Sorting Algorithms
```
src/algorithms/sorting/
├── problems.js
├── bubbleSort.js
├── mergeSort.js
├── quickSort.js
└── index.js
```

**New components:**
- `SortingVisualizer.jsx` (Array with color animations)
- `ComparisonCounter.jsx` (Show comparisons/swaps)

### Phase 3: Tree Algorithms
```
src/algorithms/trees/
├── problems.js
├── bfs.js
├── dfs.js
├── inorderTraversal.js
└── index.js
```

**New components:**
- `TreeVisualizer.jsx` (Node rendering, edge drawing)
- `TraversalLog.jsx` (Node visit order)

### Phase 4: Graph Algorithms
```
src/algorithms/graphs/
├── problems.js
├── dijkstra.js
├── bfs.js
├── dfs.js
└── index.js
```

### Phase 5: Dynamic Programming
```
src/algorithms/dp/
├── problems.js
├── fibonacciMemo.js
├── knapsack.js
└── index.js
```

---

## 🔧 Adding New Algorithm Categories

### Pattern:

1. Create folder: `src/algorithms/{category}/`
2. Create `problems.js` with category config
3. Create step generators
4. Create visualizer component: `src/components/{category}/{Category}Visualizer.jsx`
5. Update `App.jsx` routing:

```jsx
{componentType === 'sorting' && <SortingVisualizer />}
{componentType === 'trees' && <TreeVisualizer />}
{componentType === 'graphs' && <GraphVisualizer />}
```

---

## 📊 File Sizes & Complexity

| File | Lines | Purpose |
|------|-------|---------|
| `problems.js` | 50-80 | Config definitions |
| `*Algorithm.js` | 50-150 | Step generation |
| `*Visualizer.jsx` | 80-120 | Main component |
| `*Panel.jsx` | 30-60 | Sub-component |

**Key Principle:** Each file ~100 lines or less for readability.

---

## 🎨 Styling Strategy

All components use:
- **Utility classes** (`.problem-selector`, `.hash-table`, etc.)
- **BEM-ish naming** (`.log-entry.current`, `.step-type.insert`)
- **Semantic color coding**:
  - 🟢 Green = Insert/Success
  - 🟡 Yellow = Decrement/In-progress
  - 🔵 Blue = Lookup/Init
  - 🔴 Red = Error

---

## ✅ Code Quality Checklist

When adding new problems:

- [ ] Step generator is pure function
- [ ] Problem config includes validation
- [ ] UI components receive data via props
- [ ] Logic separated from rendering
- [ ] Components are reusable
- [ ] CSS classes follow naming convention
- [ ] Comments explain complex logic
- [ ] No hardcoded values in components

---

## 📚 References

- **React Hooks:** `useState`, `useEffect`, `useMemo`
- **Performance:** useCallback for expensive computations
- **Accessibility:** ARIA labels, semantic HTML
- **Mobile:** Responsive CSS with media queries

---

**Status: Production Ready** ✅

The system is designed for easy extension and maintains clean separation of concerns.
