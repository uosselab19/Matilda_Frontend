import { useEffect, useState } from 'react';
import { selectItem } from '../../services/itemService';
import CardList from '../../components/Marketplace/CardList';
import Pagination from '../../components/Marketplace/Pagination';
import Search from '../../components/Marketplace/Search';
import Category from '../../components/Marketplace/Category';
import Card from '../../components/Marketplace/Card'
import { Item } from '../../types/Item';

export const Marketplace = () => {
  const [page, setPage] = useState(0);
  const [numShowItems, maxNumPagination] = [4, 10];
  const [itemList, setItemList] = useState([] as JSX.Element[]);

  useEffect(() => {
    (async () => {

      const { data } = await selectItem({
        skip: 0,
        sortKey: 'ID',
        sortOrder: 'ASC',
        take: numShowItems * maxNumPagination - 1
      });

      setItemList(data.map(
        (e: Item) => {
          return (
            <Card
              key={e.itemNum}
              itemNum={e.itemNum}
              title={(e.itemNum).toString()}
              price={e.price}
            />
          )
        }
      ));

    })();
  }, [page]);

  return (
    <main>
      <Search />
      <Category />
      {/* 카드 */}
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
