import { useEffect, useState } from 'react';
import { selectItem } from '../../services/itemService';
import CardList from '../../components/Marketplace/CardList';
import Pagination from '../../components/Marketplace/Pagination';
import Search from '../../components/Marketplace/Search';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';

export const Marketplace = () => {
  const [page, setPage] = useState(0);
  const [numShowItems, numShowPages] = [16, 10];
  const [itemList, setItemList] = useState([] as Item[]);
  const [selectCondition, setSelectCondition] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await selectItem(selectCondition);

      setItemList(data);
    })();
  }, [page, selectCondition]);

  const navigate = useNavigate();
  const handleCard = (id: number) => {
    navigate(`/marketplace/NFTItem?nft_id=${id}`, { replace: false });
  };

  return (
    <main>
      <div className="d-flex justify-content-center align-items-center fw-bold fs-2 my-5">Marketplace</div>
      <Search
        size="lg"
        callback={setSelectCondition}
        />
      {/* <Category /> */}
      <div className='my-5'>
        <CardList
          page={page}
          itemList={itemList}
          numShowItems={numShowItems}
          size={"lg"}
          handleCard={handleCard}
        />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        numItems={itemList.length}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
      />
    </main>
  );
};
