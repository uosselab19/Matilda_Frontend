import { useState, useEffect } from 'react';
import { Item } from '../types/Item';

export default function useItems(selectItem: Promise<any>) {
  const [items, setItems] = useState([] as Item[]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, error } = await selectItem;
      console.log(error);
      if(error) return alert(error);
      setItems(data);
      
      //timeout of 1000ms exceeded    -> handling은 어떻게 해야할까?
    })();
  }, []);

  return { items, page, setPage };
}
