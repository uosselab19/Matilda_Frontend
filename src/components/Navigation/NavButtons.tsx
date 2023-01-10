interface NavButtonsProps {
  navItems: any[];
  selectedNavButton: string;
  onClick: Function;
  textBold?: boolean;
  textSize?: number;
  textColor?: string;
}

interface NavButton {
  key: string;
  title: string;
  onClick: Function;
}

// 네비게이션 버튼을 구현하는 함수
export const NavButtons = (props: NavButtonsProps) => {
  const { navItems, selectedNavButton, onClick, textBold, textSize, textColor } = props;
  
  //버튼을 만드는 함수
  const NavButton = (data: NavButton) => {
    const { key, title } = data;
    return (
      <button
        type="button"
        key={key}
        className={[
          'btn text-decoration-none',
          `text-${selectedNavButton == key ? (textColor ? `${textColor}` : 'dark') : 'secondary'}`,
          `${textBold ? 'fw-bold' : ''}`,
          `${textSize ? `fs-${textSize}` : ''}`
        ].join(' ')}
        onClick={() => { onClick(key); }} >
        {title}
      </button>
    );
  };

  //실제 버튼은 navItems 값을 컴포넌트의 프로퍼티로 받아서 그걸 그대로 버튼으로 구현해버리면 됨
  return (
    <div className="d-flex justify-content-around">
      {navItems.map((e) => { return NavButton(e); })}
    </div>
  );
};
