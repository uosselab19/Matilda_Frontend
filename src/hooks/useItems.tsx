import { useState, useEffect } from 'react';
import { Item } from '../types/Item';
import Swal from 'sweetalert2'
import { apiClient } from '../services/apiClient';
import { countItems } from '../services/itemService';

export default function useItems(promise: Function, initialSelectCondition: {}, numShowItems: number) {
  const [selectCondition, setSelectCondition] = useState(initialSelectCondition);
  const [items, setItems] = useState([] as Item[]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      setItems([]);
      let { count, countError } = await countItems(selectCondition);
      if (countError == `timeout of ${apiClient.defaults.timeout}ms exceeded`) {
        let maxRetryCount = 0;

        while (maxRetryCount < 10 && countError == `timeout of ${apiClient.defaults.timeout}ms exceeded`) {
          const retry = await countItems(selectCondition);
          count = retry.count;
          countError = retry.countError;
          maxRetryCount++;
        }
        if (maxRetryCount == 10) {
          Swal.fire({
            icon: 'error',
            title: '서버 통신 오류',
            text: '홈페이지 담당자가 일을 하지 않았나보네요!',
          });
          return;
        }
      } else if (countError) {
        console.log(countError);
        Swal.fire({
          icon: 'error',
          title: '아이템을 찾지 못 했어요!',
          text: '아이템 목록이 없는 것 같아요.',
        });
        return;
      }

      setCount(count);

      let { data, error } = await promise({ ...selectCondition, ["skip"]: page * numShowItems, ["take"]: numShowItems });

      if (error == `timeout of ${apiClient.defaults.timeout}ms exceeded`) {
        let maxRetryCount = 0;
        while (maxRetryCount < 10 && error == `timeout of ${apiClient.defaults.timeout}ms exceeded`) {
          const retry = await promise({ ...selectCondition, ["skip"]: page * numShowItems, ["take"]: numShowItems });
          data = retry.data;
          error = retry.error;
          maxRetryCount++;
        }
        if (maxRetryCount == 10) {
          Swal.fire({
            icon: 'error',
            title: '서버 통신 오류',
            text: '홈페이지 담당자가 일을 하지 않았나보네요!',
          });
          return;
        }
      } else if (error) {
        console.log(error);
        console.log(error == "timeout of 18F0ms exceeded");
        Swal.fire({
          icon: 'error',
          title: '아이템을 찾지 못 했어요!',
          text: '아이템 목록이 없는 것 같아요.',
        });
        return;
      }
      setItems(data);

      return;
    })();
  }, [selectCondition, page]);

  return { count, items, page, setPage, setSelectCondition };
}
