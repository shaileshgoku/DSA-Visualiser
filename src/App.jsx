import { useState } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector.jsx';
import DutchFlagVisualizer from './components/DutchFlagVisualizer.jsx';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dutchFlag');

  return (
    <main className="app-shell">
      <section className="workspace" aria-labelledby="app-title">
        <div className="header">
          <div>
            <p className="eyebrow">Step-by-step algorithm demo</p>
            <h1 id="app-title">DSA Visualiser</h1>
          </div>
        </div>

        <AlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={setSelectedAlgorithm}
        />

        {selectedAlgorithm === 'dutchFlag' && <DutchFlagVisualizer />}
      </section>
    </main>
  );
}

export default App;
