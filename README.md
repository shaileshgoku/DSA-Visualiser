# DSA Visualiser

A step-by-step interactive visualizer for learning Data Structures and Algorithms. Currently features the Dutch National Flag Algorithm with an extensible architecture for adding more algorithms.

## Features

- 🎯 **Interactive Visualization**: Watch algorithms execute step-by-step
- 🎮 **User Controls**: Next Step, Autoplay, Speed Control, and Reset
- 📝 **Custom Input**: Enter your own arrays to visualize
- 🔄 **Multi-Algorithm Support**: Extensible architecture for adding new algorithms
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Clean UI**: Modern, intuitive interface

## Algorithms Included

### Dutch National Flag Algorithm
- **Description**: Sorts an array containing 0s, 1s, and 2s in linear time O(n)
- **Use Case**: Partitioning problems, Three-way partitioning
- **Visual Indicators**:
  - 🔵 **Blue (L)**: Low pointer
  - 🟡 **Yellow (M)**: Mid pointer  
  - 🔴 **Red (H)**: High pointer

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/shaileshgoku/DSA-Visualiser.git
cd DSA-Visualiser
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173/`

## How to Use

1. **Select Algorithm**: Choose an algorithm from the dropdown
2. **Enter Array**: Input comma-separated values (for Dutch Flag: use only 0, 1, 2)
3. **Apply Array**: Click "Apply Array" to load your custom array
4. **Visualize**:
   - Click "Next Step" to advance step-by-step
   - Click "Autoplay" to run automatically
   - Adjust "Speed" slider to change animation speed
   - Click "Reset" to restart with the same array

## Example Input

```
2,0,1,2,0,1,2,0
```

This will visualize the Dutch National Flag sorting algorithm on this array.

## Project Structure

```
src/
├── App.jsx                           # Main app component
├── main.jsx                          # React entry point
├── styles.css                        # Global styles
├── components/
│   ├── AlgorithmSelector.jsx         # Algorithm selection dropdown
│   ├── DutchFlagVisualizer.jsx       # Dutch Flag algorithm visualizer
│   ├── ArrayVisualizer.jsx           # Array visualization component
│   └── Controls.jsx                  # Playback controls
└── algorithms/
    ├── index.js                      # Algorithm registry
    └── dutchFlagStep.js              # Dutch Flag algorithm logic
```

## Adding New Algorithms

### Step 1: Create Algorithm Logic
Create a new file in `src/algorithms/` (e.g., `bubbleSort.js`):

```javascript
export const INITIAL_ARRAY = [5, 3, 8, 4, 2];

export const createInitialState = (array) => ({
  array: [...array],
  // ... algorithm-specific state
  action: 'Ready to sort',
  stepCount: 0,
  isComplete: false,
});

export const getNextStep = (state) => {
  // ... algorithm step logic
  return newState;
};
```

### Step 2: Create Visualizer Component
Create `src/components/BubbleSortVisualizer.jsx` using a similar structure to `DutchFlagVisualizer.jsx`

### Step 3: Register Algorithm
Update `src/algorithms/index.js`:

```javascript
import * as bubbleSort from './bubbleSort.js';

export const ALGORITHMS = {
  dutchFlag: { ... },
  bubbleSort: {
    id: 'bubbleSort',
    name: 'Bubble Sort',
    description: 'Simple comparison-based sorting algorithm',
    module: bubbleSort,
  },
};
```

### Step 4: Add to App
Update `src/App.jsx`:

```javascript
{selectedAlgorithm === 'bubbleSort' && <BubbleSortVisualizer />}
```

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## Technologies Used

- **React 19**: UI framework
- **Vite 7**: Build tool and dev server
- **CSS3**: Styling
- **JavaScript ES6+**: Algorithm implementation

## File Descriptions

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and scripts |
| `vite.config.js` | Vite configuration |
| `index.html` | HTML entry point |
| `src/App.jsx` | Main application component |
| `src/algorithms/index.js` | Central algorithm registry |
| `src/algorithms/dutchFlagStep.js` | Dutch Flag algorithm implementation |
| `src/components/*.jsx` | UI components |
| `src/styles.css` | All styling |

## Tips for Learning

1. Start with simple arrays (e.g., `0,1,2`)
2. Use "Next Step" to understand each operation
3. Try different array lengths and patterns
4. Change speed while autoplay is running
5. Study the action descriptions to understand what's happening

## Future Enhancements

- [ ] Bubble Sort
- [ ] Merge Sort
- [ ] Quick Sort
- [ ] Binary Search
- [ ] Tree Traversals
- [ ] Graph Algorithms
- [ ] Code execution metrics (comparisons, swaps)
- [ ] Pseudocode display
- [ ] Algorithm complexity explanations

## Contributing

Contributions are welcome! Feel free to:
1. Add new algorithms
2. Improve visualizations
3. Enhance UI/UX
4. Fix bugs
5. Add documentation

## License

This project is open source and available under the MIT License.

## Author

Created as part of the DSA learning series to help visualize and understand algorithm behavior.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy Learning!** 🚀 Keep visualizing, keep learning! 📚
