import { useEffect, useState } from 'react';
import Card from './ItemCard';
import { Item } from '../../types/Item';
import Pagination from './Pagination';
import CardPlaceHolder from './ItemCardPlaceholder';

//컴포넌트가 받을 props
interface ItemsProps {
  items: Item[];
  page: number;
  setPage: Function;
  count: number;
  size: string;
  numShowItems: number;
  numShowPages: number;
  handleCard?: Function;
  modalID?: string;
}

export default function Items(props: ItemsProps) {
  const { items, page, setPage, count, size, numShowItems, numShowPages, handleCard, modalID } = props;
  const [showItems, setShowItems] = useState(new Array(items.length).fill(<CardPlaceHolder display={items.length > 0} />) as JSX.Element[]);

  const makeCard = (size: string, items: Item[]) => {
    return items.map((e: Item) => {
      return (
        <Card
          key={e.itemNum}
          size={size}
          item={e}
          title={e.title}
          price={e.price}
          handleCard={handleCard}
          modalID={modalID} />
      );
    });
  };

  useEffect(() => {
    setShowItems(makeCard(size, items));
  }, [page, items]);

  return (
    <div className="container">
      <div className={[
        `row align-items-around g-2`,
        `row-cols-1 row-cols-sm-2`,
        `row-cols-md-${size == 'lg' ? 4 : 3}`,
        `mb-${size == 'lg' ? "5" : "3"}`
      ].join(" ")} >
        {showItems}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        numItems={count}
        numShowItems={numShowItems}
        numShowPages={numShowPages} />
    </div>
  );
}
