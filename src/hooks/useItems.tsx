import { useState, useEffect } from 'react';
import { selectItem } from '../services/itemService';
import { Item } from '../types/Item';

export default function useItems(selectCondition: {}) {
  const [items, setItems] = useState([] as Item[]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, error } = await selectItem(selectCondition);
      if(error) {console.log(error); return alert(error);}
      setItems(data);
      console.log("Asfsdf");
      
      //timeout of 3000ms exceeded    -> handling은 어떻게 해야할까?
    })();
  }, [selectCondition]);

  return { items, page, setPage };
}
