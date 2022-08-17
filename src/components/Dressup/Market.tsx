import React, { useState } from 'react';
import { Clothes } from '../../types/Clothes';
import { selectItems } from '../../services/itemService';
import Items from '../Items/Items';
import Search from '../Items/Search';
import ModalItem from '../modal/ModalItem';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';
import useItems from '../../hooks/useItems';
import Swal from 'sweetalert2';

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

  const { count, items, page, setPage, setSelectCondition } = useItems(selectItems, {}, numShowItems);
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
      }} >
      입혀보기
    </button>,
    <button
      key={"modalFooterButton2"}
      type="button"
      className="btn btn-dark w-25"
      data-bs-dismiss="modal"
      onClick={() => {
        if (!presetList.some((e) => { return e == clothes; })) {
          Swal.fire({
            icon: 'warning',
            title: `페이지 이동`,
            text: "아직 입고 있는 착장 정보가 프리셋에 저장이 되지 않았는데 페이지를 이동할까요?",
            showCancelButton: true,
            confirmButtonText: '이동할게요.',
            confirmButtonColor: '#81c147',
            cancelButtonText: `저장하고 올게요.`,
            cancelButtonColor: '#d33',
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              navigate(`/marketplace/NFTitem?NFT_id=${item.itemNum}`);
            } else {
              Swal.fire({
                icon: 'error',
                title: '멈췄어요!',
                text: "저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ",
              });
            }
          })
        }
      }} >
      구매하기
    </button>
  ];

  return (
    <div>
      <Search
        size={"lg"}
        handleSearch={setSelectCondition} />
      <Items
        items={items}
        page={page}
        setPage={setPage}
        count={count}
        size={"sm"}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={setItem}
        modalID={'modalDressup'} />
      <ModalItem
        modalID={`modalDressup`}
        item={item}
        footerButtons={ModalFooterButtons}
        isStatic={false} />
    </div>
  );
};

