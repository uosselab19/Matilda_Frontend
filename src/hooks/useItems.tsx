import { useState, useEffect } from 'react';
import { Item } from '../types/Item';
import { apiClient } from '../configs/apiClient';
import { countItems } from '../services/itemService';
import { alertError } from '../utils/alertUtil';

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
          alertError('서버 통신 오류', '홈페이지 담당자가 일을 하지 않았나보네요!');
          return;
        }
      } else if (countError) {
        console.log(countError);
        alertError('아이템을 찾지 못 했어요!', '아이템 목록이 없는 것 같아요.');
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
          alertError('서버 통신 오류', '홈페이지 담당자가 일을 하지 않았나보네요!');
          return;
        }
      } else if (error) {
        console.log(error);
        alertError('아이템을 찾지 못 했어요!', '아이템 목록이 없는 것 같아요.');
        return;
      }
      setItems(data);

      return;
    })();
  }, [selectCondition, page]);

  return { count, items, page, setPage, setSelectCondition };
}
