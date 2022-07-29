import { useState } from 'react';
import { selectItem } from '../../services/itemService';
import CardList from '../../components/Marketplace/CardList';
import Pagination from '../../components/Marketplace/Pagination';
import Search from '../../components/Marketplace/Search';
import { useNavigate } from 'react-router-dom';
import usePagination from '../../hooks/usePagination';

export const Marketplace = () => {
  const [numShowItems, numShowPages] = [16, 10];
  const [selectCondition, setSelectCondition] = useState({});
  const { itemList, page, setPage } = usePagination(selectItem(selectCondition));

  const navigate = useNavigate();
  const handleCard = (id: number) => {
    navigate(`/marketplace/NFTItem?nft_id=${id}`, { replace: false });
  };

  return (
    <main>
      <div className="d-flex justify-content-center align-items-center fw-bold fs-2 my-5">Marketplace</div>
      <Search size="lg" callback={setSelectCondition} />
      {/* <Category /> */}
      <div className="my-5">
        <CardList page={page} itemList={itemList} numShowItems={numShowItems} size={'lg'} handleCard={handleCard} />
      </div>
      <Pagination page={page} setPage={setPage} numItems={itemList.length} numShowItems={numShowItems} numShowPages={numShowPages} />
    </main>
  );
};
