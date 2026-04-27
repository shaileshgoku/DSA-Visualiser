function Controls({
  onNextStep,
  onReset,
  onToggleAutoplay,
  isPlaying,
  speed,
  onSpeedChange,
  disabled,
}) {
  return (
    <section className="controls" aria-label="Visualizer controls">
      <button type="button" onClick={onNextStep} disabled={disabled}>
        Next Step
      </button>
      <button type="button" className="secondary-button" onClick={onReset}>
        Reset
      </button>
      <button
        type="button"
        className="secondary-button"
        onClick={onToggleAutoplay}
        disabled={disabled}
      >
        {isPlaying ? 'Pause' : 'Autoplay'}
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
        />
        <span>{speed}ms</span>
      </label>
    </section>
  );
}

export default Controls;
