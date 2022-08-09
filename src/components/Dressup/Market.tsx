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
  presetList: Clothes[];
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>;
}

export const Market = (props: DressupMarketProps) => {
  const { clothes, setClothes, presetList } = props;
  const [numShowItems, numShowPages] = [9, 5];
  const navigate = useNavigate();

  const [selectCondition, setSelectCondition] = useState({}); //stateCode:"OS"
  const { items, page, setPage } = usePagination(selectItem(selectCondition));
  const [itemNum, setItemNum] = useState(-1);
  const [item, setItem] = useState({} as Item);

  const ModalFooterButtons = [
    <button
      key={"modalFooterButton1"}
      type="button"
      className="btn btn-light btn-outline-dark w-25"
      data-bs-dismiss="modal"
      onClick={() => {
        setClothes((clothes) => ({ ...clothes, [item.catCode]: item }));
        console.log(clothes);
      }}>
      입혀보기
    </button>,
    <button
      key={"modalFooterButton2"}
      type="button"
      className="btn btn-dark w-25"
      data-bs-dismiss="modal"
      onClick={() => {
        if (!presetList.some((e) => { return e == clothes; }))
          if (!confirm("아직 저장이 되지 않았는데 괜찮을까요?"))
            alert("저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ")
        navigate(`/marketplace/NFTitem?NFT_id=${itemNum}`);
      }}>
      구매하기
    </button>
  ];

  useEffect(() => {
    (async () => {
      if (itemNum < 0) return;
      const { data, error } = await getItem(itemNum);

      if (error) { console.log(error); return alert(error); }
      setItem(data);
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
          modalID={`modalDressup`}
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

