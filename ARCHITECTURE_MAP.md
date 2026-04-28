## 🗺️ System Architecture Map

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│                       User Interface                        │
├─────────────────────────────────────────────────────────────┤
│
│  ┌──────────────────┐      ┌──────────────────┐
│  │   App.jsx        │      │ AlgorithmSelector│
│  │  (Main Router)   │─────→│  (Dropdown)      │
│  └──────────────────┘      └──────────────────┘
│         │
│         ├─ Is Array Algorithm?
│         │  └─→ Render <DutchFlagVisualizer />
│         │
│         └─ Is HashMap Problem?
│            └─→ Render <HashMapVisualizer />
│                     │
│                     ├─ <ProblemSelector />
│                     ├─ <InputPanel />
│                     ├─ <HashTableView />
│                     ├─ <StepLog />
│                     └─ <Controls />
│
└─────────────────────────────────────────────────────────────┘
                         ↓ State ↓
┌─────────────────────────────────────────────────────────────┐
│              Algorithm & Problem Layer                      │
├─────────────────────────────────────────────────────────────┤
│
│  Array Algorithms              HashMap Problems
│  ─────────────────              ──────────────
│  dutchFlagStep.js              hashmap/
│                                  ├── problems.js (Config)
│                                  ├── arrayEquality.js
│                                  ├── anagramCheck.js
│                                  ├── twoSum.js
│                                  └── index.js
│
│  Step Generators Return:
│  ┌──────────────────────────────────────────┐
│  │ [                                        │
│  │   {type: 'init', message: '...', ...},  │
│  │   {type: 'insert', message: '...', ...},│
│  │   {type: 'success', message: '...', ...}│
│  │ ]                                        │
│  └──────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────┘
```

---

### Component Tree

```
App
├── AlgorithmSelector
│   ├── ALGORITHMS (registry)
│   └── HASHMAP_PROBLEMS (registry)
│
├── DutchFlagVisualizer (if array)
│   ├── ArrayVisualizer
│   ├── Controls
│   └── (problem-specific)
│
└── HashMapVisualizer (if hashmap) ← NEW
    ├── ProblemSelector
    │   └── HASHMAP_PROBLEMS
    │
    ├── InputPanel
    │   ├── form inputs (dynamic)
    │   └── validation feedback
    │
    ├── HashTableView
    │   ├── displays hashmap state
    │   └── highlights operations
    │
    ├── StepLog
    │   ├── all steps list
    │   └── current step indicator
    │
    └── Controls (Enhanced)
        ├── Next/Previous
        ├── Play/Pause
        ├── Reset
        └── Speed slider
```

---

### Data Flow: User Input → Visualization

```
┌─────────────┐
│ User Selects│
│ "Array      │
│ Equality"   │
└──────┬──────┘
       │
       ↓
┌────────────────────────────────────┐
│ AlgorithmSelector detects change   │
│ Calls: onSelectAlgorithm()         │
└──────┬─────────────────────────────┘
       │
       ↓
┌────────────────────────────────────┐
│ App.jsx updates state              │
│ selectedAlgorithm = 'arrayEquality'│
└──────┬─────────────────────────────┘
       │
       ↓
┌────────────────────────────────────┐
│ getComponentType()                 │
│ Returns: 'hashmap'                 │
└──────┬─────────────────────────────┘
       │
       ↓
┌────────────────────────────────────┐
│ Render <HashMapVisualizer />       │
│ HashMapVisualizer reads            │
│ HASHMAP_PROBLEMS['arrayEquality']  │
└──────┬─────────────────────────────┘
       │
       ├─→ ProblemSelector shows problem details
       │
       ├─→ InputPanel generates form:
       │   ├─ Input field: "Array A"
       │   └─ Input field: "Array B"
       │
       └─→ HashMapVisualizer sets default:
           { arrayA: '1,2,2,3', arrayB: '2,3,1,2' }
                   │
                   ↓
           useEffect detects input change
                   │
                   ↓
           STEP_GENERATORS['arrayEquality'](arrayA, arrayB)
                   │
                   ↓
           generateArrayEqualitySteps() called
                   │
                   ↓
           Returns steps array:
           [
             { type: 'init', message: '...', hashmap: {} },
             { type: 'insert', message: '...', hashmap: {...} },
             ...
             { type: 'success', message: '...', result: true }
           ]
                   │
                   ↓
           HashMapVisualizer updates state:
           steps = [...], currentStepIndex = 0
                   │
                   ├─→ HashTableView renders step 0
                   ├─→ StepLog shows all steps
                   └─→ Controls enables navigation
                           │
                           ↓
                   User clicks "Next Step →"
                           │
                           ↓
                   currentStepIndex++
                           │
                           ↓
                   HashTableView re-renders
                   with currentStep (step 1)
                           │
                           ↓
                   Continue until success...
```

---

### Problem Configuration System

```
┌──────────────────────────────────────────────────────┐
│          HASHMAP_PROBLEMS Registry                  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  {                                                   │
│    arrayEquality: {                                  │
│      id: 'arrayEquality',                            │
│      name: 'Array Equality',                         │
│      description: '...',                             │
│      category: 'HashMap',                            │
│      difficulty: 'Easy',                             │
│      inputs: [                                       │
│        { name: 'arrayA', label: 'Array A', ... },   │
│        { name: 'arrayB', label: 'Array B', ... }    │
│      ],                                              │
│      validate: (a, b) => {                           │
│        if (!a || !b) return 'Both required';         │
│        return null;  // Valid                        │
│      }                                               │
│    },                                                │
│    anagramCheck: { ... },                            │
│    twoSum: { ... }                                   │
│  }                                                   │
│                                                      │
└──────────────────────────────────────────────────────┘
         ↑                    ↑                ↑
         │                    │                │
    Used by            Used by          Used by
    AlgorithmSelector  InputPanel       HashMapVisualizer
    (renders list)     (builds form)    (gets metadata)
```

---

### Step Generation Pipeline

```
INPUT: arrayA = [1,2,2,3], arrayB = [2,3,1,2]
   │
   ↓
generateArrayEqualitySteps(a, b)
   │
   ├─ Initialize empty frequencyMap = {}
   ├─ Initialize steps = []
   │
   ├─ Step 1: { type: 'init', ... }
   │
   ├─ For each element in arrayA:
   │   ├─ Add to frequencyMap
   │   └─ Push step: { type: 'insert', ... }
   │
   │   Results:
   │   Step 2: { type: 'insert', currentValue: 1, hashmap: {1: 1} }
   │   Step 3: { type: 'insert', currentValue: 2, hashmap: {1: 1, 2: 1} }
   │   Step 4: { type: 'insert', currentValue: 2, hashmap: {1: 1, 2: 2} }
   │   Step 5: { type: 'insert', currentValue: 3, hashmap: {1: 1, 2: 2, 3: 1} }
   │
   ├─ For each element in arrayB:
   │   ├─ Check if in frequencyMap
   │   ├─ Decrement count
   │   └─ Push step: { type: 'decrement', ... }
   │
   │   Results:
   │   Step 6: { type: 'decrement', currentValue: 2, hashmap: {1: 1, 2: 1, 3: 1} }
   │   Step 7: { type: 'decrement', currentValue: 3, hashmap: {1: 1, 2: 1, 3: 0} }
   │   Step 8: { type: 'decrement', currentValue: 1, hashmap: {1: 0, 2: 1, 3: 0} }
   │   Step 9: { type: 'decrement', currentValue: 2, hashmap: {1: 0, 2: 0, 3: 0} }
   │
   ├─ Final check: All counts = 0?
   └─ Step 10: { type: 'success', message: 'Arrays EQUAL!', result: true }
   
OUTPUT: [step1, step2, ..., step10]
```

---

### UI Rendering Path

```
Current Step (e.g., Step 3):
{
  type: 'insert',
  message: 'Adding 2 to HashMap',
  hashmap: { 1: 1, 2: 1 },
  currentValue: 2,
  currentIndex: 2,
  description: 'Processing element 2 from Array A at index 2'
}
   │
   ├─→ HashTableView receives step
   │   ├─ Renders table with keys/values
   │   ├─ Finds row where key = currentValue (2)
   │   ├─ Applies class: .highlight-insert
   │   └─ Shows current operation (insert) with emoji ➕
   │
   ├─→ StepLog receives step
   │   ├─ Renders all 10 steps
   │   ├─ Highlights current step (Step 3)
   │   └─ Shows step number, type, message
   │
   ├─→ Step Info displays:
   │   ├─ "Step 3 of 10"
   │   ├─ Type badge: "INSERT"
   │   ├─ Message: "Adding 2 to HashMap"
   │   └─ Description: "Processing element..."
   │
   └─→ Controls show:
       ├─ ← Previous (enabled)
       ├─ Next Step → (enabled)
       ├─ Reset (enabled)
       ├─ ▶ Autoplay (enabled)
       └─ Speed slider (200-1600ms)
```

---

### Extension Points (Adding New Problems)

```
To add new problem (e.g., "Group Anagrams"):

1. CREATE: src/algorithms/hashmap/groupAnagrams.js
   export const generateGroupAnagramsSteps = (words) => {
     return [ /* steps */ ];
   }

2. EXPORT: src/algorithms/hashmap/index.js
   export { generateGroupAnagramsSteps } from './groupAnagrams.js';

3. CONFIG: src/algorithms/hashmap/problems.js
   groupAnagrams: {
     id: 'groupAnagrams',
     name: 'Group Anagrams',
     inputs: [{ name: 'words', label: 'Words' }],
     validate: (words) => { /* ... */ }
   }

4. REGISTER: src/components/hashmap/HashMapVisualizer.jsx
   import { generateGroupAnagramsSteps } from '...';
   
   const STEP_GENERATORS = {
     // ...
     groupAnagrams: generateGroupAnagramsSteps
   };

5. PARSE: In HashMapVisualizer useEffect:
   else if (selectedProblem === 'groupAnagrams') {
     stepArray = generateGroupAnagramsSteps(inputs.words);
   }

6. INIT: In handleProblemChange:
   else if (problemId === 'groupAnagrams') {
     setInputs({ words: 'listen,silent' });
   }

✅ DONE! Problem appears in dropdown and works!
```

---

### File Dependencies

```
Entry Point
    ↓
main.jsx
    ↓
App.jsx
    ├─ AlgorithmSelector.jsx
    │  ├── ALGORITHMS (from algorithms/index.js)
    │  └── HASHMAP_PROBLEMS (from hashmap/problems.js)
    │
    ├─ DutchFlagVisualizer.jsx
    │  └── dutchFlagStep.js
    │
    └─ HashMapVisualizer.jsx ← NEW
       ├─ ProblemSelector.jsx
       │  └── HASHMAP_PROBLEMS
       ├─ InputPanel.jsx
       │  └── HASHMAP_PROBLEMS
       ├─ HashTableView.jsx
       ├─ StepLog.jsx
       ├─ Controls.jsx
       └── Step generators:
           ├── generateArrayEqualitySteps
           ├── generateAnagramSteps
           └── generateTwoSumSteps
```

---

### Problem Categories (Scalable)

```
ALGORITHMS (Current)
├── Array Algorithms
│   └── dutchFlag
│
└── (Ready for: Sorting, Trees, Graphs, DP)

HASHMAP_PROBLEMS (Current)
├── arrayEquality
├── anagramCheck
└── twoSum

FUTURE CATEGORIES (Same architecture):
├── SORTING_PROBLEMS
│   ├── bubbleSort
│   ├── mergeSort
│   └── quickSort
│
├── TREE_PROBLEMS
│   ├── bfs
│   ├── dfs
│   └── inorderTraversal
│
├── GRAPH_PROBLEMS
│   ├── dijkstra
│   ├── bfs
│   └── dfs
│
└── DP_PROBLEMS
    ├── fibonacci
    ├── knapsack
    └── lcs

Each category uses same:
- Problem configuration system
- Step format
- Component structure
```

---

### Scaling Example: Add Sorting

```
Step 1: Create algorithms/sorting/
        ├── problems.js (config for bubble, merge, quick)
        ├── bubbleSort.js (step generator)
        ├── mergeSort.js (step generator)
        └── index.js (exports)

Step 2: Create components/sorting/
        └── SortingVisualizer.jsx (main component)
           (Uses same pattern as HashMapVisualizer)

Step 3: Update App.jsx routing
        const type = getComponentType(selected);
        if (type === 'sorting') <SortingVisualizer />

Step 4: All 3 sorting algorithms now available!
        ✅ No UI changes needed
        ✅ Same problem config system
        ✅ Same step format
        ✅ Same components pattern
```

---

This architecture is **design-pattern ready** for unlimited scale! 🚀
