import CardList from '../Items/CardList';
import Pagination from '../Items/Pagination';
import useItems from '../../hooks/useItems';
import { selectItemwithMember } from '../../services/itemService';
import ModalItem from '../modal/ModalItem';
import { useState } from 'react';

export const MypageNFTs = () => {
  const { items, page, setPage } = useItems(selectItemwithMember(2, {}));
  const [itemNum, setItemNum] = useState(-1);
  const [numShowItems, numShowPages] = [15, 5];

  const ModalFooterButtons = [
    <div className="btn btn-light w-25">등록하기</div>,
    <div className="btn btn-dark w-25">판매하기</div>
  ];

  return (
    <div className="row">
      <div className='mb-3'>
        <CardList
          page={page}
          items={items}
          size={"sm"}
          numShowItems={numShowItems}
          handleCard={setItemNum}
          modalID={'modalMyNFTs'} />
        <ModalItem
          modalID={'modalMyNFTs'}
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
