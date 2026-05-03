/**
 * TwoPointerArrayVisualizer
 * Specialized array visualizer for two-pointer algorithms
 * Highlights left pointer (blue) and right pointer (red)
 */

function TwoPointerArrayVisualizer({ array, left, right, foundPair }) {
  const isFound = foundPair !== null;

  return (
    <section className="visualizer" aria-label="Two-pointer array visualization">
      <div className="array-row">
        {array.map((value, index) => {
          const isLeftPointer = left === index;
          const isRightPointer = right === index;
          const isFoundValue = isFound && foundPair.includes(value);

          return (
            <div className="array-item-wrap" key={`${value}-${index}`}>
              <div className="pointer-row" aria-label={`Pointers at index ${index}`}>
                {isLeftPointer && (
                  <span
                    className="pointer-label pointer-left"
                    title="Left pointer"
                  >
                    L
                  </span>
                )}
                {isRightPointer && (
                  <span
                    className="pointer-label pointer-right"
                    title="Right pointer"
                  >
                    R
                  </span>
                )}
              </div>
              <div
                className={`array-box ${isLeftPointer ? 'highlight-left' : ''} ${
                  isRightPointer ? 'highlight-right' : ''
                } ${isFoundValue ? 'highlight-found' : ''}`}
                aria-label={`Value ${value} at index ${index}`}
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

export default TwoPointerArrayVisualizer;
