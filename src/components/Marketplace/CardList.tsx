import { useEffect, useState } from 'react';
import Card from '../../components/Marketplace/Card';
import { Item } from '../../types/Item';

//컴포넌트가 받을 props
interface CardListProps {
  page: number;
  itemList: Item[];
  numShowItems: number;
}

export default function CardList(props: CardListProps) {
  const {page, itemList, numShowItems} = props;
  const [showList, setShowList]=useState(makeCard(itemList.slice(page*numShowItems, (page+1)*numShowItems)));

  useEffect( () => {
    setShowList(makeCard(itemList.slice(page*numShowItems, (page+1)*numShowItems)));
  }, [page, itemList]);

  return (
    <div className="container">
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 align-items-around g-3 my-5'>
        {showList}
      </div>
    </div>
  );
};

const makeCard = (itemList: Item[]) => {
  return itemList.map(
    (e: Item) => {
      return (
        <Card
          key={e.itemNum}
          itemNum={e.itemNum}
          title={e.title}
          price={e.price}
        />
      )
    }
  )
}
