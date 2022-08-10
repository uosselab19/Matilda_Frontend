import { useEffect, useState } from 'react';
import Card from './ItemCard';
import { Item } from '../../types/Item';
import Pagination from './Pagination';

//컴포넌트가 받을 props
interface ItemsProps {
  items: Item[];
  page: number;
  setPage: Function;
  numShowItems: number;
  numShowPages: number;
  size: string;
  handleCard?: Function;
  modalID?: string;
}

export default function Items(props: ItemsProps) {
  const { items, page, setPage, numShowItems, numShowPages, size, handleCard, modalID } = props;
  const [showItems, setShowItems] = useState([] as JSX.Element[]);

  const makeCard = (size: string, items: Item[]) => {
    return items.map((e: Item) => {
      return (
        <Card
          key={e.itemNum}
          size={size}
          itemNum={e.itemNum}
          title={e.title}
          price={e.price}
          handleCard={handleCard}
          modalID={modalID} />
      );
    });
  };

  useEffect(() => {
    setShowItems(makeCard(size, items.slice(page * numShowItems, (page + 1) * numShowItems)));
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
        numItems={items.length}
        numShowItems={numShowItems}
        numShowPages={numShowPages} />
    </div>
  );
}
