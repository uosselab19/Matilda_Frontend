interface SpinnerProps {
  index: number;
  delay: number;
  radius: number;
}

interface LoadingProps {
  delay: number;
  radius: number;
}

function SpinnerUnit(props: SpinnerProps) {
  const { index, delay, radius } = props;
  return (
    <div
      className="spinner-grow m-3"
      role="status"
      style={{
        width: `${radius}em`,
        height: `${radius}em`,
        animationDuration: `${delay}s`,
        animationDelay: `${(delay / 6) * index}s`
      }}
    >
      <span className="visually-hidden">Converting 2D to 3D</span>
    </div>
  );
}

export default function Spinner(props: LoadingProps) {
  const { delay, radius } = props;
  return (
    <div>
      <SpinnerUnit index={0} delay={delay} radius={radius} />
      <SpinnerUnit index={1} delay={delay} radius={radius} />
      <SpinnerUnit index={2} delay={delay} radius={radius} />
      <SpinnerUnit index={3} delay={delay} radius={radius} />
    </div>
  );
}
