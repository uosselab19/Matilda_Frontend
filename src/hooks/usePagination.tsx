import { useState, useEffect } from 'react';
import { Item } from '../types/Item';

export default function usePagination(selectItem: Promise<any>) {
  const [itemList, setItemList] = useState([] as Item[]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await selectItem;
      setItemList(data);
    })();
  }, []);

  return { itemList, page, setPage };
}
