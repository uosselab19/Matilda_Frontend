import { useState, useEffect } from 'react';
import { Item } from '../types/Item';
import { countItems } from '../services/itemService';

export default function useItems(promise: Function, initialSelectCondition: {}, numShowItems: number) {
  const [selectCondition, setSelectCondition] = useState(initialSelectCondition);
  const [items, setItems] = useState([] as Item[]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      setItems([]);
      const { count, countError } = await countItems(selectCondition);
      const { data, error } = await promise({ ...selectCondition, ["skip"]: page * numShowItems, ["take"]: numShowItems });

      if (countError) {
        console.log(countError);
        //alertError('아이템을 찾지 못 했어요!', '아이템 목록이 없는 것 같아요!');
        return;
      }
      
      if (error) {
        console.log(error);
        //alertError('아이템을 찾지 못 했어요!', '아이템 목록이 없는 것 같아요..');
        return;
      }

      console.log(selectCondition);
      console.log(data);
      setCount(count);
      setItems(data);
    })();
  }, [selectCondition, page]);

  return { count, items, page, setPage, setSelectCondition };
}
