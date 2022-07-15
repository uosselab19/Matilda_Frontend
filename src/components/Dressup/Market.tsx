import React, { useEffect, useState } from 'react';
//import item_img1 from '../../assets/images/Explore/item_img.png';
import { Clothes } from '../../pages/Dressup';
import { selectItem } from '../../services/itemService';
import { Item } from '../../types/Item';
import CardList from '../Marketplace/CardList';
import Pagination from '../Marketplace/Pagination';
import Search from '../Marketplace/Search';

interface DressupMarketProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

export const Market = (props: DressupMarketProps) => {
  const { clothes } = props;
  const [numShowItems, numShowPages]=[9, 5];
  const [page, setPage]=useState(0);
  const [itemList, setItemList] = useState([] as Item[]);
  const [selectCondition, setSelectCondition] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await selectItem(selectCondition);

      setItemList(data);
    })();
  }, [page, selectCondition]);
  console.log(clothes);
  
  return (
    <div>
      <Search
        callback={setSelectCondition}
        />
      {/* <Category /> */}
      <div className="my-3">
        <CardList
          page={page}
          itemList={itemList}
          numShowItems={numShowItems}
          size="sm"
        />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        numItems={itemList.length}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
      />
    </div>
  );
};
