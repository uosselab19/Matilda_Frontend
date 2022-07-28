import React, { useState } from 'react';
//import item_img1 from '../../assets/images/Explore/item_img.png';
import { Clothes } from '../../types/Clothes';
import { selectItem } from '../../services/itemService';
import CardList from '../Marketplace/CardList';
import Pagination from '../Marketplace/Pagination';
import Search from '../Marketplace/Search';
import usePagination from '../../hooks/usePagination';
import { ModalDressupCard } from '../modal/ModalDressupCard';

interface DressupMarketProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

export const Market = (props: DressupMarketProps) => {
  //const { clothes, setClothes } = props;
  const [numShowItems, numShowPages] = [9, 5];
  const [selectCondition, setSelectCondition] = useState({});
  const {itemList, page, setPage} = usePagination(selectItem(selectCondition));
  const [itemNum, setItemNum] = useState(-1);

  return (
    <div>
      <Search callback={setSelectCondition} />
      {/* <Category /> */}
      <div className="my-3">
        <CardList
          page={page}
          itemList={itemList}
          numShowItems={numShowItems}
          size="sm"
          handleCard={setItemNum}
          modalID={"modalDressup"} />
      </div>
      <ModalDressupCard
        id={"modalDressup"}
        itemNum={itemNum}/>
      <Pagination
        page={page}
        setPage={setPage}
        numItems={itemList.length}
        numShowItems={numShowItems}
        numShowPages={numShowPages} />
    </div>
  );
};
