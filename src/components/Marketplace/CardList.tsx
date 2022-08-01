import { useEffect, useState } from 'react';
import Card from '../../components/Marketplace/Card';
import { Item } from '../../types/Item';

//컴포넌트가 받을 props
interface CardListProps {
  page: number;
  items: Item[];
  numShowItems: number;
  size: string;
  handleCard?: Function;
  modalID?: string;
}

export default function CardList(props: CardListProps) {
  const { page, items, numShowItems, size, handleCard, modalID } = props;
  const [showItems, setShowItems] = useState([] as JSX.Element[]);

  const makeCard = (size: string, items: Item[]) => {
    return items.map((e: Item) => {
      return (
        <Card key={e.itemNum} size={size} itemNum={e.itemNum} title={e.title} price={e.price} handleCard={handleCard} modalID={modalID} />
      );
    });
  };

  useEffect(() => {
    setShowItems(makeCard(size, items.slice(page * numShowItems, (page + 1) * numShowItems)));
  }, [page, items]);

  return (
    <div className="container">
      <div className={`row row-cols-1 row-cols-sm-2 row-cols-md-${size == 'lg' ? 4 : 3} align-items-around g-2`}>{showItems}</div>
    </div>
  );
}
