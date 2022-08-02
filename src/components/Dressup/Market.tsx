import React, { useState } from 'react';
import { Clothes } from '../../types/Clothes';
import { selectItem } from '../../services/itemService';
import CardList from '../Items/CardList';
import Pagination from '../Items/Pagination';
import Search from '../Items/Search';
import usePagination from '../../hooks/useItems';
import ModalItem from '../modal/ModalItem';

interface DressupMarketProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

export const Market = (props: DressupMarketProps) => {
  const [numShowItems, numShowPages] = [9, 5];
  const [selectCondition, setSelectCondition] = useState({});
  const { items, page, setPage } = usePagination(selectItem(selectCondition));
  const [itemNum, setItemNum] = useState(-1);

  const ModalFooterButtons = [
    <div className="btn btn-light w-25" >입혀보기</div>,
    <div className="btn btn-dark w-25">구매하기</div>
  ];

  return (
    <div>
      <Search callback={setSelectCondition} />
      <div className="my-3">
        <CardList
          page={page}
          items={items}
          size={"sm"}
          numShowItems={numShowItems}
          handleCard={setItemNum}
          modalID={'modalDressup'} />
        <ModalItem
          modalID={'modalDressup'}
          itemNum={itemNum}
          footerButtons={ModalFooterButtons}
          isStatic={false} />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        numItems={items.length}
        numShowItems={numShowItems}
        numShowPages={numShowPages} />
    </div>
  );
};
