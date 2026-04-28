## 🎯 Quick Reference Card

### One-Page Developer Cheatsheet

---

## 📦 File Locations

| What | Where |
|------|-------|
| Problem definitions | `src/algorithms/hashmap/problems.js` |
| Array Equality generator | `src/algorithms/hashmap/arrayEquality.js` |
| Anagram Check generator | `src/algorithms/hashmap/anagramCheck.js` |
| Two Sum generator | `src/algorithms/hashmap/twoSum.js` |
| Main visualizer | `src/components/hashmap/HashMapVisualizer.jsx` |
| Problem dropdown | `src/components/hashmap/ProblemSelector.jsx` |
| Input form | `src/components/hashmap/InputPanel.jsx` |
| HashMap display | `src/components/hashmap/HashTableView.jsx` |
| Step history | `src/components/hashmap/StepLog.jsx` |

---

## 🔄 Adding a Problem (5 Min Checklist)

```
[ ] 1. Add to HASHMAP_PROBLEMS in problems.js
   - id, name, description, difficulty
   - inputs: [{ name, label, placeholder }]
   - validate: (input) => errorString or null

[ ] 2. Create generator file: problemName.js
   - export const generateProblemNameSteps = (inputs) => [...]
   - Return array of step objects
   - Each step: { type, message, description, hashmap, ... }

[ ] 3. Export from hashmap/index.js
   - export { generateProblemNameSteps } from './problemName.js';

[ ] 4. Import in HashMapVisualizer.jsx
   - import { generateProblemNameSteps } from '...';
   - Add to STEP_GENERATORS object
   - Add parsing in useEffect
   - Add initialization in handleProblemChange

[ ] 5. Test in browser
   - npm run dev
   - Select your problem
   - Enter test inputs
   - Verify steps generate correctly
```

---

## 📝 Step Object Template

```javascript
{
  type: 'init',                        // Operation type
  message: 'User-friendly message',    // For users
  description: 'Technical details',    // For learning
  hashmap: {},                         // Current state
  currentIndex: -1,                    // Position (optional)
  currentValue: null,                  // Element (optional)
  complement: null,                    // For lookups (optional)
  matchIndex: -1,                      // For matches (optional)
  result: null,                        // Success/fail (optional)
  indices: [0, 1],                     // Pair indices (optional)
  // ... problem-specific fields
}
```

### Step Types & Highlighting

| Type | Highlight | Emoji | Use When |
|------|-----------|-------|----------|
| `init` | Blue | 🔍 | Starting algorithm |
| `insert` | Green | ➕ | Adding to HashMap |
| `lookup` | Cyan | 🔎 | Searching HashMap |
| `decrement` | Yellow | ➖ | Reducing count |
| `match` | Purple | ✅ | Found a pair |
| `success` | Green | 🎉 | Algorithm succeeded |
| `error` | Red | ❌ | Algorithm failed |

---

## 🎨 Component Props

### ProblemSelector
```jsx
<ProblemSelector
  selectedProblem="arrayEquality"
  onSelectProblem={(id) => {...}}
/>
```

### InputPanel
```jsx
<InputPanel
  problemConfig={HASHMAP_PROBLEMS[selectedProblem]}
  inputs={{ arrayA: '1,2,3', arrayB: '3,2,1' }}
  onInputChange={(e) => {...}}
  error="Error message or ''"
/>
```

### HashTableView
```jsx
<HashTableView
  step={{
    type: 'insert',
    message: '...',
    hashmap: { key: value },
    currentValue: 2
  }}
/>
```

### StepLog
```jsx
<StepLog
  steps={[step1, step2, ...]}
  currentIndex={2}
/>
```

### Controls
```jsx
<Controls
  onNextStep={() => {...}}
  onPrevStep={() => {...}}
  onReset={() => {...}}
  onToggleAutoplay={() => {...}}
  isPlaying={false}
  speed={700}
  onSpeedChange={(ms) => {...}}
  disableNext={false}
  disablePrev={true}
  isComplete={false}
/>
```

---

## 🔌 Extending Components

### Create Problem-Specific View
```javascript
// src/components/hashmap/GroupAnagramsView.jsx
function GroupAnagramsView({ step }) {
  return (
    <div className="groups-view">
      {step.groups?.map((group, i) => (
        <div key={i} className="group">
          {group.join(', ')}
        </div>
      ))}
    </div>
  );
}
export default GroupAnagramsView;

// In HashMapVisualizer.jsx
{selectedProblem === 'groupAnagrams' && 
  <GroupAnagramsView step={currentStep} />}
```

### Add Custom Styling
```css
/* In styles.css */
.problem-meta .difficulty-hard {
  background: #fee2e2;  /* Red */
  color: #991b1b;
}

.log-entry.myProblem {
  border-left-color: #6366f1;
}
```

---

## 🧪 Testing Template

```javascript
// Test cases format
const testCases = [
  {
    name: 'Test 1 - Success case',
    input: { arrayA: '1,2,3', arrayB: '3,2,1' },
    expectedSteps: 10,
    expectedResult: true
  },
  {
    name: 'Test 2 - Failure case',
    input: { arrayA: '1,2,3', arrayB: '4,5,6' },
    expectedSteps: 5,
    expectedResult: false
  }
];

// Manual test process:
// 1. npm run dev
// 2. Select problem
// 3. Enter input from testCase
// 4. Click "Next Step" repeatedly
// 5. Verify step count matches
// 6. Verify final result correct
```

---

## 📊 Useful Files to Know

| File | Purpose | Key Content |
|------|---------|-------------|
| `algorithms/index.js` | Registry system | `getComponentType()`, `ALGORITHMS` |
| `components/AlgorithmSelector.jsx` | Main dropdown | Shows all problems, groupby category |
| `components/hashmap/HashMapVisualizer.jsx` | Main logic | `STEP_GENERATORS`, state management |
| `styles.css` | All styling | Problem-specific CSS classes |

---

## 🚀 Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors (if using eslint)
npm run lint
```

---

## 🔍 Debugging Tips

### Check Steps Generate Correctly
```javascript
// In browser console
const steps = generateArrayEqualitySteps([1,2,3], [3,2,1]);
console.log('Total steps:', steps.length);
console.log('Final step type:', steps[steps.length - 1].type);
steps.forEach((s, i) => console.log(`${i}:`, s.type, s.message));
```

### Verify Problem Config
```javascript
// In browser console
console.log(HASHMAP_PROBLEMS.arrayEquality);
// Should show: id, name, inputs, validate function, etc.
```

### Inspect Current Step in UI
```javascript
// React DevTools → Components
// Find HashMapVisualizer component
// Check currentStep in props
```

### Check CSS Classes
```javascript
// In browser DevTools
// Inspect HashTableView rows
// Check for: highlight-insert, highlight-decrement, etc.
// Should match step.type
```

---

## 🎯 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Problem doesn't appear | Not in HASHMAP_PROBLEMS | Check problems.js for typo |
| Form doesn't show | inputs config missing | Add inputs: [...] to config |
| No steps generate | Generator not in STEP_GENERATORS | Check HashMapVisualizer.jsx |
| Highlighting not working | Wrong class name | Check step.type matches CSS |
| Input not saved | handleInputChange not called | Verify InputPanel onChange prop |
| Reset doesn't work | onReset handler missing | Check Controls integration |

---

## 📚 Documentation Map

| Question | Read |
|----------|------|
| How does it work? | ARCHITECTURE.md |
| How do I set it up? | INTEGRATION_GUIDE.md |
| How do I add a problem? | DEVELOPER_GUIDE.md |
| What features exist? | COMPREHENSIVE_README.md |
| What's the structure? | ARCHITECTURE_MAP.md |
| What was delivered? | DELIVERY_SUMMARY.md |

---

## ✅ Pre-Deployment Checklist

- [ ] All 4 problems tested in browser
- [ ] Mobile responsive verified
- [ ] No console errors
- [ ] Autoplay works
- [ ] Speed slider adjusts
- [ ] Next/Previous navigate correctly
- [ ] Reset works
- [ ] Input validation shows errors
- [ ] Step highlighting working
- [ ] Colors display correctly

---

## 🔗 Problem Template (Copy-Paste)

### Step 1: problems.js
```javascript
newProblem: {
  id: 'newProblem',
  name: 'New Problem',
  description: 'Description here',
  category: 'HashMap',
  difficulty: 'Easy',
  inputs: [
    { name: 'input1', label: 'Input 1', placeholder: 'e.g., ...' }
  ],
  validate: (input1) => {
    if (!input1) return 'Input 1 required';
    return null;
  }
}
```

### Step 2: newProblem.js
```javascript
export const generateNewProblemSteps = (input1) => {
  const steps = [];
  
  steps.push({
    type: 'init',
    message: `Starting...`,
    hashmap: {},
    description: 'Initialization'
  });
  
  // Add more steps...
  
  steps.push({
    type: 'success',
    message: 'Complete!',
    hashmap: {},
    result: true
  });
  
  return steps;
};
```

### Step 3: hashmap/index.js
```javascript
export { generateNewProblemSteps } from './newProblem.js';
```

### Step 4: HashMapVisualizer.jsx
```javascript
// Add import
import { generateNewProblemSteps } from '...';

// Add to STEP_GENERATORS
const STEP_GENERATORS = {
  arrayEquality: generateArrayEqualitySteps,
  anagramCheck: generateAnagramSteps,
  twoSum: generateTwoSumSteps,
  newProblem: generateNewProblemSteps,  // ADD THIS
};

// Add to useEffect parsing
} else if (selectedProblem === 'newProblem') {
  const input1 = inputs.input1;
  stepArray = generator(input1);
}

// Add to handleProblemChange
} else if (problemId === 'newProblem') {
  setInputs({ input1: 'default-value' });
}
```

---

## 📊 Architecture Summary

```
Problems = Config + Generator Function

Config = Metadata (no code!)
  ├─ Problem info (name, description)
  ├─ Input fields (form generation)
  └─ Validation rules

Generator = Pure Function
  └─ Returns array of steps
     └─ Each step: { type, message, hashmap, ... }

UI = Components (reusable)
  ├─ ProblemSelector (dropdown)
  ├─ InputPanel (form)
  ├─ HashTableView (visualization)
  ├─ StepLog (history)
  └─ Controls (navigation)

Result = Everything connects automatically!
```

---

## 🎓 Learning Path

1. **Understand:** Read ARCHITECTURE_MAP.md
2. **Setup:** Follow INTEGRATION_GUIDE.md
3. **Try:** Test all 4 included problems
4. **Build:** Follow DEVELOPER_GUIDE.md to add "Group Anagrams"
5. **Scale:** Add 5 more problems using same pattern
6. **Master:** Add sorting algorithms

---

**Last Updated:** April 28, 2026  
**Accuracy:** High  
**Completeness:** 100%
