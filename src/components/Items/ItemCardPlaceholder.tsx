import itemPlaceholder from '../../assets/images/Explore/item_placeholder.png';

interface CardPlaceHolderProps {
  display: boolean;
}

export default function CardPlaceHolder(props: CardPlaceHolderProps) {
  const { display } = props;

  return (
    <div>
      <div
        className="card overflow-hidden"
        aria-hidden="true"
        style={{
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          display: (display) ? "none" : "block"
        }}>
        <img alt="" className="card-img placeholder" src={itemPlaceholder} />
      </div>
    </div>
  );
}
