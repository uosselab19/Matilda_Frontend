interface SpinnerProps {
  index: number;
  delay: number;
  radius: number;
}

interface LoadingProps {
  delay: number;
  radius: number;
}

// 3D Conversion 에서 사진 집어넣고
// 결과 나오기 전까지 대기할 때 쓰는 스피너 컴퍼넌트
// 스피너 알갱이 하나 만들어주는 컴포넌트
function SpinnerUnit(props: SpinnerProps) {
  const { index, delay, radius } = props;
  return (
    <div
      className="spinner-grow mx-3"
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

// 위 알갱이를 모아서 그럴듯한 스피너를 만들어주는 컴포넌트
export default function Spinner(props: LoadingProps) {
  const { delay, radius } = props;
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '768px', height: '600px' }}>
      <SpinnerUnit index={0} delay={delay} radius={radius} />
      <SpinnerUnit index={1} delay={delay} radius={radius} />
      <SpinnerUnit index={2} delay={delay} radius={radius} />
      <SpinnerUnit index={3} delay={delay} radius={radius} />
    </div>
  );
}
