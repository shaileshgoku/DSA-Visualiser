## 👨‍💻 Developer Guide: Adding New Problems

This guide walks through the complete process of adding a new HashMap problem step-by-step.

---

## 📝 Example: Adding "Group Anagrams" Problem

### Step 1: Define Problem Configuration

**File:** `src/algorithms/hashmap/problems.js`

Add to `HASHMAP_PROBLEMS` object:

```javascript
groupAnagrams: {
  id: 'groupAnagrams',
  name: 'Group Anagrams',
  description: 'Group words that are anagrams using a HashMap.',
  category: 'HashMap',
  difficulty: 'Medium',
  inputs: [
    { 
      name: 'words', 
      label: 'Words List (comma-separated)', 
      placeholder: 'e.g., listen,silent,hello,world' 
    },
  ],
  validate: (words) => {
    if (!words || words.trim() === '') return 'Words list is required';
    const wordArray = words.split(',').map(w => w.trim());
    if (wordArray.length === 0) return 'At least one word required';
    return null;
  },
},
```

**Key Points:**
- `id`: Unique identifier (matches file name convention)
- `inputs`: Array of input field configs
- `validate`: Returns error string or null

---

### Step 2: Create Step Generator

**File:** `src/algorithms/hashmap/groupAnagrams.js`

```javascript
/**
 * Group Anagrams Step Generator
 * Groups words by their sorted character representation
 */

export const generateGroupAnagramsSteps = (wordsInput) => {
  const steps = [];
  const words = wordsInput.split(',').map(w => w.trim());

  // Step 1: Initialize
  steps.push({
    type: 'init',
    message: `Grouping anagrams from: [${words.join(', ')}]`,
    hashmap: {},
    currentIndex: -1,
    currentWord: null,
    description: 'Creating HashMap with sorted key',
  });

  // Step 2-N: Build groups
  const anagramMap = {};
  
  words.forEach((word, index) => {
    // Key is sorted characters
    const key = word.toLowerCase().split('').sort().join('');

    if (!anagramMap[key]) {
      anagramMap[key] = [];
    }
    anagramMap[key].push(word);

    steps.push({
      type: 'insert',
      message: `"${word}" → key "${key}" (group size: ${anagramMap[key].length})`,
      hashmap: {
        // Show current state (transform to display format)
        ...Object.fromEntries(
          Object.entries(anagramMap).map(([k, v]) => [k, v.join('|')])
        ),
      },
      currentIndex: index,
      currentWord: word,
      currentKey: key,
      description: `Processing word "${word}" at index ${index}`,
    });
  });

  // Step N+1: Final result
  const groups = Object.values(anagramMap);
  steps.push({
    type: 'success',
    message: `Created ${groups.length} anagram group(s)`,
    hashmap: Object.fromEntries(
      Object.entries(anagramMap).map(([k, v]) => [k, v.join('|')])
    ),
    currentIndex: -1,
    currentWord: null,
    description: 'Grouping complete',
    result: true,
    groups: groups,
  });

  return steps;
};
```

**Key Points:**
- Pure function (no side effects)
- Returns array of step objects
- Each step includes `hashmap` snapshot
- Final step includes result/summary

---

### Step 3: Export from Index

**File:** `src/algorithms/hashmap/index.js`

Add this line:

```javascript
export { generateGroupAnagramsSteps } from './groupAnagrams.js';
```

**Result:**
```javascript
export { HASHMAP_PROBLEMS, getProblem, getProblemIds } from './problems.js';
export { generateArrayEqualitySteps } from './arrayEquality.js';
export { generateAnagramSteps } from './anagramCheck.js';
export { generateTwoSumSteps } from './twoSum.js';
export { generateGroupAnagramsSteps } from './groupAnagrams.js';  // NEW
```

---

### Step 4: Register Step Generator

**File:** `src/components/hashmap/HashMapVisualizer.jsx`

Step 4a - Add import:
```javascript
import {
  generateArrayEqualitySteps,
  generateAnagramSteps,
  generateTwoSumSteps,
  generateGroupAnagramsSteps,  // NEW
  HASHMAP_PROBLEMS,
} from '../../algorithms/hashmap/index.js';
```

Step 4b - Add to STEP_GENERATORS:
```javascript
const STEP_GENERATORS = {
  arrayEquality: generateArrayEqualitySteps,
  anagramCheck: generateAnagramSteps,
  twoSum: generateTwoSumSteps,
  groupAnagrams: generateGroupAnagramsSteps,  // NEW
};
```

Step 4c - Add to step generation logic:
```javascript
useEffect(() => {
  try {
    setInputError('');
    const generator = STEP_GENERATORS[selectedProblem];

    let stepArray = [];

    if (selectedProblem === 'arrayEquality') {
      // ... existing logic
    } else if (selectedProblem === 'anagramCheck') {
      // ... existing logic
    } else if (selectedProblem === 'twoSum') {
      // ... existing logic
    } else if (selectedProblem === 'groupAnagrams') {  // NEW
      const words = inputs.words || '';
      stepArray = generator(words);
    }

    setSteps(stepArray);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  } catch (error) {
    setInputError('Error generating steps: ' + error.message);
    setSteps([]);
  }
}, [selectedProblem, inputs]);
```

Step 4d - Add input initialization:
```javascript
const handleProblemChange = (problemId) => {
  setSelectedProblem(problemId);
  
  if (problemId === 'arrayEquality') {
    setInputs({ arrayA: '1,2,2,3', arrayB: '2,3,1,2' });
  } else if (problemId === 'anagramCheck') {
    setInputs({ stringA: 'listen', stringB: 'silent' });
  } else if (problemId === 'twoSum') {
    setInputs({ array: '2,7,11,15', target: '9' });
  } else if (problemId === 'groupAnagrams') {  // NEW
    setInputs({ words: 'listen,silent,hello,world' });
  }

  setInputError('');
};
```

---

### Step 5: Test

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:5173
   ```

3. **Test the new problem:**
   - Select "Group Anagrams" from dropdown
   - Default input should appear
   - Click "Next Step" to step through
   - Try custom inputs

4. **Test cases:**
   ```
   Input: listen,silent,hello,world,olleh
   Expected: Groups: [listen,silent], [hello,world,olleh]
   ```

---

## 🎨 Step Type Guide

When creating steps, choose the appropriate type:

### `'init'`
First step explaining the problem.
```javascript
{
  type: 'init',
  message: 'Starting algorithm...',
  hashmap: {},
  description: 'Setup phase'
}
```

### `'insert'`
Adding element to HashMap.
```javascript
{
  type: 'insert',
  message: 'Adding key → value',
  hashmap: {...},  // Updated state
  currentValue: value,
  description: 'Element added'
}
```

### `'lookup'`
Searching for element in HashMap.
```javascript
{
  type: 'lookup',
  message: 'Looking for...',
  hashmap: {...},
  complement: searchValue,
  description: 'Search phase'
}
```

### `'decrement'`
Decreasing count in HashMap.
```javascript
{
  type: 'decrement',
  message: 'Decremented key count',
  hashmap: {...},  // Updated state
  currentValue: value,
  description: 'Count reduced'
}
```

### `'match'`
Found a matching pair/condition.
```javascript
{
  type: 'match',
  message: 'Match found!',
  hashmap: {...},
  currentValue: val1,
  complement: val2,
  matchIndex: index,
  description: 'Condition satisfied'
}
```

### `'success'`
Algorithm completed successfully.
```javascript
{
  type: 'success',
  message: 'Problem solved!',
  hashmap: finalState,
  result: true,
  description: 'Final result',
  indices: [i, j],  // or groups: [], etc.
}
```

### `'error'`
Algorithm failed or no solution.
```javascript
{
  type: 'error',
  message: 'No solution found',
  hashmap: {...},
  result: false,
  description: 'Algorithm complete'
}
```

---

## 🔍 Debugging Tips

### Check if steps generate correctly
```javascript
// Add temporary logging in generator
console.log('Generated steps:', steps);

// Check structure
steps.forEach((step, i) => {
  console.log(`Step ${i}:`, step.type, step.message);
});
```

### Verify UI displays steps
1. Open DevTools → Console
2. Check for errors
3. Verify `currentStep` in Components tab
4. Check CSS class names match step.type

### Test input validation
```javascript
// Test in browser console
const config = HASHMAP_PROBLEMS.groupAnagrams;
console.log(config.validate('listen,silent'));  // Should be null
console.log(config.validate(''));               // Should be error string
```

---

## ⚡ Performance Tips

### For large datasets
```javascript
// Bad: Processing all at once
const bigArray = generateLargeArray(10000);
const steps = processAll(bigArray);

// Good: Lazy generation
export const generateStepsLazy = function* (array) {
  for (const item of array) {
    yield createStep(item);
  }
};
```

### Memo expensive computations
```javascript
const sortedKey = useMemo(
  () => word.split('').sort().join(''),
  [word]
);
```

---

## 📋 Complete Checklist

When adding a new problem:

- [ ] Problem config added to `problems.js`
- [ ] Config includes all required fields
- [ ] Validation function works
- [ ] Step generator file created
- [ ] Generator is pure function
- [ ] All steps follow standard format
- [ ] Export added to `hashmap/index.js`
- [ ] Generator imported in `HashMapVisualizer.jsx`
- [ ] Added to `STEP_GENERATORS` object
- [ ] Input parsing added in useEffect
- [ ] Problem initialization added in handleProblemChange
- [ ] Tested with default inputs
- [ ] Tested with custom inputs
- [ ] No console errors
- [ ] UI renders all steps correctly
- [ ] Highlighting works for each step type
- [ ] Next/Prev/Reset buttons work
- [ ] Autoplay cycles through steps

---

## 🚀 Advanced: Custom Visualizations

For problems requiring special visualization:

### Option 1: Extend HashTableView
```javascript
// In HashTableView.jsx
if (step.customRender === 'matrix') {
  return <MatrixView data={step.matrix} />;
}
```

### Option 2: Create Problem-Specific Component
```javascript
// src/components/hashmap/GroupAnagramsView.jsx
function GroupAnagramsView({ step }) {
  return (
    <div className="groups-view">
      {step.groups?.map((group, i) => (
        <div key={i} className="group">{group.join(', ')}</div>
      ))}
    </div>
  );
}

// In HashMapVisualizer.jsx
{selectedProblem === 'groupAnagrams' && (
  <GroupAnagramsView step={currentStep} />
)}
```

---

## 📚 Example Problems to Add

### Easy
- [ ] Valid Parentheses
- [ ] First Unique Character
- [ ] Majority Element (Frequency Map)

### Medium
- [ ] Group Anagrams ✓ (shown above)
- [ ] Longest Substring Without Repeating
- [ ] Intersection of Two Arrays

### Hard
- [ ] LRU Cache
- [ ] Serialize/Deserialize HashMap
- [ ] Find Duplicate Subtree (Tree + HashMap)

---

**That's it!** Your new problem is now part of the platform. 🎉

The system automatically handles:
- ✅ Dropdown display
- ✅ Input form rendering
- ✅ Step visualization
- ✅ Navigation controls
- ✅ Speed adjustment

All without touching UI components!
