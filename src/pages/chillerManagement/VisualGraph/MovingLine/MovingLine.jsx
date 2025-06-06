import './MovingLine.css';

function MovingLine({
  flowState = false,
  flowDirection = true,
  speed = 1,
  startPoint,
  endPoint,
  color = '#00bfff'
}) {
  const [x1, y1] = startPoint;
  const [x2, y2] = endPoint;

  const dashLength = 10;
  const animationName = flowDirection ? 'pipe-flow-forward' : 'pipe-flow-reverse';

  const baseDuration = 4;
  const duration = `${baseDuration / (speed * speed)}s`;

  const animationStyle = flowState
    ? {
        animation: `${animationName} ${duration} linear infinite`
      }
    : {};

  return (
    <line
      className="moving-line"
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeDasharray={dashLength}
      strokeWidth="12"
      style={animationStyle}
    />
  );
}

export default MovingLine;
