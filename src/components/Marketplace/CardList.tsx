import { useEffect, useState } from 'react';
import Card from '../../components/Marketplace/Card';
import { Item } from '../../types/Item';

//컴포넌트가 받을 props
interface CardListProps {
  page: number;
  itemList: Item[];
  numShowItems: number;
  size: string;
  handleCard?: Function;
  modalID?: string;
}

export default function CardList(props: CardListProps) {
  const { page, itemList, numShowItems, size, handleCard, modalID } = props;
  const [showList, setShowList] = useState([] as JSX.Element[]);

  const makeCard = (size: string, itemList: Item[]) => {
    return itemList.map(
      (e: Item) => {
        return (
          <Card
            key={e.itemNum}
            size={size}
            itemNum={e.itemNum}
            title={e.title}
            price={e.price}
            handleCard={handleCard}
            modalID={modalID}
          />
        )
      }
    )
  }

  useEffect(() => {
    setShowList(makeCard(size, itemList.slice(page * numShowItems, (page + 1) * numShowItems)));
  }, [page, itemList]);

  return (
    <div className="container">
      <div className={`row row-cols-1 row-cols-sm-2 row-cols-md-${(size == "lg") ? 4 : 3} align-items-around g-2`}>
        {showList}
      </div>
    </div>
  );
};


