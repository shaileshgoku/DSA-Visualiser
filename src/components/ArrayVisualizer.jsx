const valueLabels = {
  0: 'Zero',
  1: 'One',
  2: 'Two',
};

const pointerConfig = [
  { key: 'low', label: 'L', className: 'pointer-low' },
  { key: 'mid', label: 'M', className: 'pointer-mid' },
  { key: 'high', label: 'H', className: 'pointer-high' },
];

function ArrayVisualizer({ array, low, mid, high }) {
  const pointers = { low, mid, high };

  return (
    <section className="visualizer" aria-label="Array visualization">
      <div className="array-row">
        {array.map((value, index) => {
          const activePointers = pointerConfig.filter(
            (pointer) => pointers[pointer.key] === index,
          );

          return (
            <div className="array-item-wrap" key={`${value}-${index}`}>
              <div className="pointer-row" aria-label={`Pointers at index ${index}`}>
                {activePointers.map((pointer) => (
                  <span
                    className={`pointer-label ${pointer.className}`}
                    key={pointer.key}
                    title={`${pointer.key} pointer`}
                  >
                    {pointer.label}
                  </span>
                ))}
              </div>
              <div
                className={`array-box value-${value}`}
                aria-label={`${valueLabels[value]} at index ${index}`}
              >
                {value}
              </div>
              <span className="index-label">{index}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ArrayVisualizer;
