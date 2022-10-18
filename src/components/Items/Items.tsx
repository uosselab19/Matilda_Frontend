import { useEffect, useState } from 'react';
import Card from './ItemCard';
import { Item } from '../../types/Item';
import Pagination from './Pagination';

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
}

export default function Items(props: ItemsProps) {
  const { items, page, setPage, count, size, numShowItems, numShowPages, handleCard } = props;

  const makeCards = (size: string, items: any[]) => {
    return items.map((e, i) => {
      return <Card key={e ? e.itemNum : i} item={e} size={size} handleCard={handleCard} />;
    });
  };

  const [showItems, setShowItems] = useState([] as JSX.Element[]);

  useEffect(() => {
    if (!items.length) {
      const initNum = Math.floor(count / numShowItems) == page ? count % numShowItems : numShowItems;
      setShowItems(makeCards(size, new Array(initNum).fill(undefined)));
    } else {
      setShowItems(makeCards(size, items));
    }
  }, [page, items, count]);

  return (
    <div className="container">
      <div
        className={[
          `row align-items-around g-2`,
          `row-cols-1 row-cols-sm-2`,
          `row-cols-md-${size == 'lg' ? 4 : 3}`,
          `mb-${size == 'lg' ? '5' : '3'}`
        ].join(' ')}
      >
        {showItems}
      </div>
      <Pagination page={page} setPage={setPage} numItems={count} items={items} numShowItems={numShowItems} numShowPages={numShowPages} />
    </div>
  );
}
