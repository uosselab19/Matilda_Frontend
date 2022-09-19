interface CapitalTextProps {
  text: string;
  size: number;
}

export const CapitalText = (props: CapitalTextProps) => {
  const { text, size } = props;

  const textStr = text.split('').map((e, i) => {
    if (e == e.toUpperCase()) {return <b key={i}>{e}</b>;}
    else {return e;}
  });

  return <div className={`fs-${size}`}>{textStr}</div>;
};
