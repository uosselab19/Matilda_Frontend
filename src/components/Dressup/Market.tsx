import React, { useEffect, useState } from 'react';
import { Clothes } from '../../types/Clothes';
import { getItem, selectItem } from '../../services/itemService';
import CardList from '../Items/CardList';
import Pagination from '../Items/Pagination';
import Search from '../Items/Search';
import usePagination from '../../hooks/useItems';
import ModalItem from '../modal/ModalItem';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';

interface DressupMarketProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

export const Market = (props: DressupMarketProps) => {
  const [numShowItems, numShowPages] = [9, 5];
  const navigate = useNavigate();
  const [selectCondition, setSelectCondition] = useState({});
  const { items, page, setPage } = usePagination(selectItem(selectCondition));
  const [itemNum, setItemNum] = useState(-1);
  const [item, setItem] = useState({} as Item);

  const ModalFooterButtons = [
    <div
      className="btn btn-light btn-outline-dark w-25"
      data-bs-dismiss="modal"
      onClick={() => { alert("아직 입히는 거 작동 안 함 ㅅㄱ"); }}
    >입혀보기</div>,
    <div
      className="btn btn-dark w-25"
      data-bs-dismiss="modal"
      onClick={() => { navigate(`/marketplace/NFTitem?NFT_id=${itemNum}`); }}
    >구매하기</div>
  ];

  useEffect(() => {
    (async () => {
      if (itemNum < 0) return;
      const { data, error } = await getItem(itemNum);

      if (error) { console.log(error); return alert(error); }
      setItem(data as Item);
    })();
  }, [itemNum]);

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
          item={item}
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

