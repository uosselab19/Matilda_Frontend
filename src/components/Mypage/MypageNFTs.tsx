import CardList from '../Items/CardList';
import Pagination from '../Items/Pagination';
import useItems from '../../hooks/useItems';
import { getItem, selectItemwithMember } from '../../services/itemService';
import ModalItem from '../modal/ModalItem';
import { useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';

export const MypageNFTs = () => {
  const navigate = useNavigate();
  const { items, page, setPage } = useItems(selectItemwithMember, {memberNum:2});
  const [itemNum, setItemNum] = useState(-1);
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
          onClick={() => { navigate(`/mypage/NFTItem?nft_id=${itemNum}`); }}>
          판매하기
        </button>
    )
  ];

  useEffect(() => {
    (async () => {
      if (itemNum < 0) return;
      const { data, error } = await getItem(itemNum);
      console.log(data);
      if (error) { console.log(error); return alert(error); }
      setItem(data as Item);
    })();
  }, [itemNum]);

  return (
    <div className="row">
      <div className='mb-3'>
        <CardList
          page={page}
          items={items}
          size={"md"}
          numShowItems={numShowItems}
          handleCard={setItemNum}
          modalID={'modalMyNFTs'} />
        <ModalItem
          modalID={'modalMyNFTs'}
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
