import { useState, useEffect } from 'react';
import { Item } from '../types/Item';
import Swal from 'sweetalert2'

export default function useItems(promise:Function, initialSelectCondition:{}) {
  const [selectCondition, setSelectCondition] = useState(initialSelectCondition);
  const [items, setItems] = useState([] as Item[]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, error } = await promise(selectCondition);
      if(error) {
        console.log(error);
        return Swal.fire({
          icon: 'error',
          title: '아이템을 찾지 못 했어요!',
          text: '아이템 목록이 없는 것 같아요.',
        });
      }
      setItems(data);
      return;
      //timeout of 3000ms exceeded    -> handling은 어떻게 해야할까?
    })();
  }, [selectCondition, page]);

  return { items, page, setPage, setSelectCondition };
}
