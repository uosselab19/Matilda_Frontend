import { useState, useEffect } from 'react';
import { Item } from '../types/Item';
import Swal from 'sweetalert2'
import { countItems } from '../services/itemService';

export default function useItems(promise: Function, initialSelectCondition: {}, numShowItems: number) {
  const [selectCondition, setSelectCondition] = useState(initialSelectCondition);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([] as Item[]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { count, countError } = await countItems(selectCondition);
      if (countError) {
        console.log(countError);
        Swal.fire({
          icon: 'error',
          title: '아이템을 찾지 못 했어요!',
          text: '아이템 목록이 없는 것 같아요.',
        });
        return;
      }
      setCount(count);

      const { data, error } = await promise({ ...selectCondition, ["skip"]: page*numShowItems, ["take"]: (page+1)*numShowItems-1 });
      if (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: '아이템을 찾지 못 했어요!',
          text: '아이템 목록이 없는 것 같아요.',
        });
        return;
      }
      setItems(data);
      return;
      //timeout of 3000ms exceeded    -> handling은 어떻게 해야할까?
    })();
  }, [selectCondition, page]);

  return { count, items, page, setPage, setSelectCondition };
}
