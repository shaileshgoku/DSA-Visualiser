function Controls({
  onNextStep,
  onPrevStep,
  onReset,
  onToggleAutoplay,
  isPlaying,
  speed,
  onSpeedChange,
  disabled,
  disableNext,
  disablePrev,
  isComplete,
}) {
  // Backward compatibility: if 'disabled' prop is used, it controls both next and autoplay
  const nextDisabled = disableNext !== undefined ? disableNext : disabled;
  const prevDisabled = disablePrev !== undefined ? disablePrev : false;
  const autoplayDisabled = disabled;

  return (
    <section className="controls" aria-label="Visualizer controls">
      {onPrevStep && (
        <button 
          type="button" 
          onClick={onPrevStep} 
          disabled={prevDisabled}
          title="Go to previous step"
        >
          ← Previous
        </button>
      )}
      
      <button 
        type="button" 
        onClick={onNextStep} 
        disabled={nextDisabled}
        title="Go to next step"
      >
        Next Step →
      </button>
      
      <button 
        type="button" 
        className="secondary-button" 
        onClick={onReset}
        title="Reset visualization"
      >
        Reset
      </button>
      
      <button
        type="button"
        className="secondary-button"
        onClick={onToggleAutoplay}
        disabled={autoplayDisabled}
        title={isPlaying ? 'Pause visualization' : 'Auto-play steps'}
      >
        {isPlaying ? '⏸ Pause' : '▶ Autoplay'}
      </button>
      
      <label className="speed-control">
        Speed
        <input
          type="range"
          min="200"
          max="1600"
          step="100"
          value={speed}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
          title="Adjust animation speed"
        />
        <span>{speed}ms</span>
      </label>

      {isComplete && (
        <span className="completion-indicator" title="Visualization complete">
          ✅ Complete
        </span>
      )}
    </section>
  );
}

export default Controls;
