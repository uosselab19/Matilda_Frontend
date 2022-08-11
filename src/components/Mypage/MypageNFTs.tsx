import Items from '../Items/Items';
import useItems from '../../hooks/useItems';
import { selectItemMember } from '../../services/itemService';
import ModalItem from '../modal/ModalItem';
import { useState } from 'react';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';

export const MypageNFTs = () => {
  const navigate = useNavigate();
  const { items, page, setPage } = useItems(selectItemMember, { memberNum: 2 });
  const [item, setItem] = useState({} as Item);
  const [numShowItems, numShowPages] = [15, 5];

  const ModalFooterButtons = [
    (
      (item.catCode) ?
        <button
          key={"modalFooterButton1"}
          type="button"
          className="btn btn-light btn-outline-dark w-25"
          data-bs-dismiss="modal"
          onClick={() => { navigate("/NFTminting"); }}>
          등록하기
        </button>
        :
        <button
          key={"modalFooterButton2"}
          type="button"
          className="btn btn-light w-25"
          data-bs-dismiss="modal"
          onClick={() => { navigate(`/mypage/NFTItem?nft_id=${item.itemNum}`); }}>
          판매하기
        </button>
    )
  ];

  return (
    <div className="row">
      <Items
        items={items}
        page={page}
        setPage={setPage}
        size={"md"}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={setItem}
        modalID={'modalMyNFTs'} />
      <ModalItem
        modalID={'modalMyNFTs'}
        item={item}
        footerButtons={ModalFooterButtons}
        isStatic={false} />
    </div>
  );
};
