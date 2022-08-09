import { useState, useEffect } from 'react';
import { Item } from '../types/Item';

export default function useItems(selectItem: Promise<any>) {
  const [items, setItems] = useState([] as Item[]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, error } = await selectItem;
      if(error) {console.log(error); return alert(error);}
      setItems(data);
      
      //timeout of 3000ms exceeded    -> handling은 어떻게 해야할까?
    })();
  }, []);

  return { items, page, setPage };
}
