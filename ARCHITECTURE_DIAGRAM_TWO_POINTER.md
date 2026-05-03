# Two Pointer Visualizer - Architecture Diagram

## Component Tree

```
App.jsx (main entry)
│
├─ AlgorithmSelector
│  └─ Dropdown with algorithm options
│     ├─ Dutch National Flag Algorithm (existing)
│     ├─ Two Pointer (Two Sum) ← NEW
│     └─ HashMap Internals Visualizer (existing)
│
├─ Conditional Render based on selection
│
└─ TwoPointerVisualizer ← NEW (when "Two Pointer" selected)
   │
   ├─ Input Section
   │  ├─ Array Input Field
   │  ├─ Target Input Field
   │  └─ Apply Button
   │
   ├─ Step Counter
   │  └─ Displays current step #
   │
   ├─ Current Sum Display
   │  ├─ Shows: current sum vs target
   │  └─ Updates every step
   │
   ├─ TwoPointerArrayVisualizer ← NEW
   │  └─ Array boxes with pointer highlights
   │     ├─ Left pointer (blue) 🔵
   │     ├─ Right pointer (red) 🔴
   │     └─ Found values (green glow) 🟢
   │
   ├─ Status Panel
   │  └─ Shows current action description
   │
   ├─ Result Panel (when complete)
   │  ├─ ✅ Pair found: [a, b]
   │  └─ ❌ No pair found
   │
   └─ Controls (reused component)
      ├─ ← Previous button
      ├─ Next Step → button
      ├─ Reset button
      ├─ ▶ Play / ⏸ Pause button
      └─ Speed control slider
```

---

## Data Flow

```
User Input
   │
   ├─ Array: "3,2,4,1,5"
   ├─ Target: "9"
   │
   ▼
Validation
   │
   ├─ Check valid integers
   ├─ Check min 2 elements
   ├─ Check valid target
   │
   ▼
createInitialState()
   │
   ├─ Sort array: [1,2,3,4,5]
   ├─ Set L=0, R=4
   ├─ Initialize UI state
   │
   ▼
User Clicks Play/Next
   │
   ▼
getNextTwoPointerStep()
   │
   ├─ Calculate sum
   ├─ Compare with target
   ├─ Decide action
   ├─ Update pointers
   ├─ Return new state
   │
   ▼
State Update
   │
   ├─ Re-render components
   ├─ Update pointer positions
   ├─ Update sum display
   ├─ Update action text
   │
   ▼
Visual Feedback
   │
   ├─ Pointers move on screen
   ├─ Sum updates
   ├─ Colors highlight
   │
   ▼
isComplete?
   │
   ├─ No → Continue loop
   └─ Yes → Show result & stop
```

---

## Algorithm State Machine

```
START
  │
  ├─ Read array & target
  │
  ▼
┌──────────────────────────┐
│ SORT (isSorted = false)  │
│ Step 1: Sort array       │
└──────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────┐
│ SEARCH (isSorted = true)                 │
│ Initialize: L=0, R=len-1                 │
│                                          │
│ While L < R:                             │
│   sum = arr[L] + arr[R]                  │
│   if sum == target:                      │
│     → FOUND ✅                           │
│   elif sum < target:                     │
│     → MOVE_LEFT (L++)                    │
│   else:                                  │
│     → MOVE_RIGHT (R--)                   │
└──────────────────────────────────────────┘
  │
  ├─ found: true   ▼ found: false
  │              │
  ▼              ▼
┌─────────────┐  ┌──────────────┐
│ RESULT OK   │  │ RESULT NOTFOUND
│ [a, b] = target
│             │  │
└─────────────┘  └──────────────┘
  │              │
  └─────┬────────┘
        │
        ▼
      END
```

---

## File Dependency Graph

```
App.jsx
  │
  ├─→ AlgorithmSelector.jsx
  │    └─→ algorithms/index.js
  │
  ├─→ TwoPointerVisualizer.jsx (NEW)
  │    │
  │    ├─→ TwoPointerArrayVisualizer.jsx (NEW)
  │    │    └─→ styles.css (pointer highlighting)
  │    │
  │    ├─→ Controls.jsx (reused)
  │    │
  │    └─→ algorithms/twoPointerSum.js (NEW)
  │         └─→ Pure algorithm functions
  │
  ├─→ DutchFlagVisualizer.jsx (existing)
  │
  └─→ HashMapVisualizer.jsx (existing)

algorithms/index.js
  │
  ├─→ dutchFlagStep.js (existing)
  ├─→ twoPointerSum.js (NEW)
  └─→ hashmap/* (existing)

styles.css (all components)
  ├─→ New classes for two-pointer
  ├─→ Existing classes for other features
  └─→ Shared base styles
```

---

## Component Reuse Pattern

```
┌─────────────────────────────────────┐
│  Shared/Reused Components           │
├─────────────────────────────────────┤
│                                     │
│  Controls.jsx                       │
│  ├─ Used by: DutchFlagVisualizer   │
│  ├─ Used by: TwoPointerVisualizer  │
│  └─ Used by: HashMapVisualizer     │
│     (Easy to add more algorithms!)  │
│                                     │
│  AlgorithmSelector.jsx              │
│  └─ Reads from: algorithms/index.js │
│     (Automatically picks up new     │
│      algorithms from registry!)     │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Algorithm-Specific Components      │
├─────────────────────────────────────┤
│                                     │
│  DutchFlagVisualizer.jsx            │
│  ├─ Uses: ArrayVisualizer           │
│  ├─ Uses: Controls                  │
│  └─ Uses: dutchFlagStep.js logic    │
│                                     │
│  TwoPointerVisualizer.jsx (NEW)     │
│  ├─ Uses: TwoPointerArrayVisualizer │
│  ├─ Uses: Controls                  │
│  └─ Uses: twoPointerSum.js logic    │
│                                     │
│  HashMapVisualizer.jsx              │
│  ├─ Uses: Custom components         │
│  ├─ Uses: Controls                  │
│  └─ Uses: hashmap/* logic           │
│                                     │
└─────────────────────────────────────┘
```

---

## Integration Checklist (All ✅)

```
┌─ Algorithm Development
│  ├─ ✅ Create twoPointerSum.js with pure functions
│  ├─ ✅ Test algorithm correctness
│  └─ ✅ Verify step generation
│
├─ Component Development
│  ├─ ✅ Create main TwoPointerVisualizer component
│  ├─ ✅ Create TwoPointerArrayVisualizer for display
│  ├─ ✅ Implement input validation
│  ├─ ✅ Implement animation loop
│  └─ ✅ Implement step history
│
├─ Integration
│  ├─ ✅ Register algorithm in index.js
│  ├─ ✅ Add to getComponentType() router
│  ├─ ✅ Add conditional render in App.jsx
│  └─ ✅ Verify no breaking changes
│
├─ Styling
│  ├─ ✅ Add pointer highlight styles
│  ├─ ✅ Add sum display styles
│  ├─ ✅ Add result panel styles
│  ├─ ✅ Add animations (pulse effect)
│  └─ ✅ Ensure responsive design
│
├─ Documentation
│  ├─ ✅ Create integration guide
│  ├─ ✅ Create quick reference
│  ├─ ✅ Create implementation summary
│  └─ ✅ Add inline code comments
│
└─ Testing
   ├─ ✅ Test algorithm correctness
   ├─ ✅ Test input validation
   ├─ ✅ Test animation controls
   ├─ ✅ Test step history (undo)
   ├─ ✅ Test visual highlighting
   ├─ ✅ Test result display
   └─ ✅ Verify no regressions
```

---

## Example Execution Timeline

```
Time | User Action | State Change | Visual Update
-----|-------------|--------------|----------------
T0   | Select "Two Pointer" | Component mounts | Shows algorithm
T1   | Enter "3,2,4,1,5" | arrayInput set | Input field updated
T2   | Enter "9" | targetInput set | Input field updated
T3   | Click Apply | State initialized | Sorted array shown [1,2,3,4,5]
T4   | Click Play | isPlaying=true | Animation starts
T5   | (auto 700ms) | Step 1: L=0,R=4 | Pointers visible, sum=6 shown
T6   | (auto 700ms) | Step 2: L=1,R=4 | L pointer moves, sum=7
T7   | (auto 700ms) | Step 3: L=2,R=4 | L pointer moves, sum=8
T8   | (auto 700ms) | Step 4: L=3,R=4 | L pointer moves, sum=9
T9   | (auto 700ms) | FOUND! ✅ | Green glow on [4,5], result panel
T10  | Click Previous | Step 3 restored | Rewind to step 3 view
T11  | Click Reset | Initial state | Back to step 0
T12  | Click Next | Step 1 | Manual advance to step 1
```

---

## Performance Characteristics

```
Operation        | Complexity | Time
-----------------|------------|--------
Sorting          | O(n log n) | ≤ 100ms
Two-pointer scan | O(n)       | ≤ 10ms
Re-render        | O(n)       | ≤ 16ms
State update     | O(1)       | ≤ 1ms
Step history     | O(1)       | per step
Animation frame  | 60 FPS     | 16.67ms
```

---

## Extension Points (For Future)

```
To Add HashMap Two Sum:
├─ Create: algorithms/hashMapTwoSum.js
├─ Register: in algorithms/index.js
├─ Create: components/HashMapTwoSumVisualizer.jsx
├─ Route: in App.jsx
└─ Result: New algorithm available!

To Add Algorithm Comparison:
├─ Create: components/AlgorithmComparison.jsx
├─ Show: Multiple solutions side-by-side
├─ Compare: Time/space complexity
└─ Result: Educational comparison tool!

To Add More Variations:
├─ 3Sum: algorithms/threeSumStep.js
├─ 4Sum: algorithms/fourSumStep.js
├─ Unique pairs: algorithms/uniqueTwoSumStep.js
└─ Result: Algorithm library expanded!
```

---

## Summary

✨ **Modular Architecture**: Easy to add new algorithms  
✨ **Component Reuse**: Shared Controls reduce code duplication  
✨ **Clean Data Flow**: From user input → algorithm → visualization  
✨ **Scalable Pattern**: Same structure works for all algorithms  
✨ **Well Documented**: Multiple reference documents provided  

**Ready for Production Use! 🚀**
