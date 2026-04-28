import { useState } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector.jsx';
import DutchFlagVisualizer from './components/DutchFlagVisualizer.jsx';
import HashMapVisualizer from './components/hashmap/HashMapVisualizer.jsx';
import { getComponentType } from './algorithms/index.js';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dutchFlag');

  // Determine which visualizer to render based on algorithm type
  const componentType = getComponentType(selectedAlgorithm);

  return (
    <main className="app-shell">
      <section className="workspace" aria-labelledby="app-title">
        <div className="header">
          <div>
            <p className="eyebrow">Step-by-step algorithm demo</p>
            <h1 id="app-title">DSA Visualiser</h1>
            <p className="subtitle">Explore Data Structures & Algorithms</p>
          </div>
        </div>

        <AlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={setSelectedAlgorithm}
        />

        {/* Render appropriate visualizer based on algorithm type */}
        {selectedAlgorithm === 'dutchFlag' && <DutchFlagVisualizer />}
        
        {selectedAlgorithm === 'hashMapInternals' && <HashMapVisualizer />}
      </section>
    </main>
  );
}

export default App;
