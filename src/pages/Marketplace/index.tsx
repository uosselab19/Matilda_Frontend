import { useEffect, useState } from 'react';
import { selectItem } from '../../services/itemService';
import CardList from '../../components/Marketplace/CardList';
import Pagination from '../../components/Marketplace/Pagination';
import Search from '../../components/Marketplace/Search';
//import Category from '../../components/Marketplace/Category';
import { Item } from '../../types/Item';

export const Marketplace = () => {
  const [page, setPage] = useState(0);
  const [numShowItems, maxNumPagination] = [10, 10];
  const [itemList, setItemList] = useState([] as Item[]);

  useEffect(() => {
    (async () => {
      const { data } = await selectItem({});

      setItemList(data);
    })();
  }, [page]);

  return (
    <main>
      <div className="d-flex justify-content-center align-items-center fw-bold fs-2 my-5">Marketplace</div>
      <Search />
      {/* <Category /> */}
      <CardList
        page={page}
        itemList={itemList}
        numShowItems={numShowItems}
      />
      <Pagination
        page={page}
        setPage={setPage}
        numItems={itemList.length}
        numShowItems={numShowItems}
        maxNumPagination={maxNumPagination}
      />
    </main>
  );
};
