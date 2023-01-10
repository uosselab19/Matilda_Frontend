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
      // 백엔드에서부터 아이템 정보와 아이템 개수를 가져옴
      // 따로 구별한 이유는 백엔드 담당자와 시스템 구조를 상의할 때 나온 아이디어를 구현하기 위해서입니다.
      const { count, countError } = await countItems(selectCondition);
      const { data, error } = await promise({ ...selectCondition, ['skip']: page * numShowItems, ['take']: numShowItems });

      // 아이템 개수를 백엔드에서부터 불러오지 못 할 때
      if (countError) {
        console.log(countError);
        return;
      }

      // 갱신된 condition로부터 promise 함수가 에러난 경우
      // 대게 백엔드로부터 item 정보를 불러오는 getItems 함수 등이 promise 함수로 사용됨
      if (error) {
        console.log(error);
        return;
      }

      // 제대로 값이 불러와졌다면 값을 넣어줌
      setCount(count);
      setItems(data);
    })();
  }, [selectCondition, page]);

  return { count, items, page, setPage, setSelectCondition };
}
