import { useState, useEffect } from 'react';
import { Item } from '../types/Item';
import { countItems } from '../services/itemService';
import { alertError } from '../utils/alertUtil';

export default function useItems(promise: Function, initialSelectCondition: {}, numShowItems: number, exceptionCodes?:string[]) {
  const [selectCondition, setSelectCondition] = useState(initialSelectCondition);
  const [items, setItems] = useState([] as Item[]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      setItems([]);
      let { count, countError } = await countItems(selectCondition);
      
      if (countError) {
        console.log(countError);
        alertError('아이템을 찾지 못 했어요!', '아이템 목록이 없는 것 같아요.');
        return;
      }
      
      let { data, error } = await promise({ ...selectCondition, ["skip"]: page * numShowItems, ["take"]: numShowItems });
      
      if (error) {
        console.log(error);
        alertError('아이템을 찾지 못 했어요!', '아이템 목록이 없는 것 같아요.');
        return;
      }

      setCount(count);
      console.log(`count ${count-(page*numShowItems)}`);
      const _items=items.filter((e)=>{return !exceptionCodes?.includes(e.stateCode);});
      console.log(items);
      console.log(_items);
      console.log(_items.length);

      setItems(data);

      return;
    })();
  }, [selectCondition, page]);

  return { count, items, page, setPage, setSelectCondition };
}
