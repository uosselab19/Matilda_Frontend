import itemPlaceholder from '../../assets/images/Marketplace/item_placeholder.png';

interface CardPlaceholderProps {
  loaded: boolean;
}

export default function CardPlaceholder(props: CardPlaceholderProps) {
  const { loaded } = props;

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
          display: loaded ? 'none' : 'block'
        }}
      >
        <img alt="" className="card-img placeholder" src={itemPlaceholder} />
      </div>
    </div>
  );
}
