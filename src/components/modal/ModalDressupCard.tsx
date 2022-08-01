import { useEffect, useState } from 'react';
import { getItem } from '../../services/itemService';
import { Item } from '../../types/Item';

interface ModalDressupCardProps {
  id: string;
  itemNum: number;
}

export const ModalDressupCard = (props: ModalDressupCardProps) => {
  const { id, itemNum } = props;
  const [item, setItem] = useState(undefined as Item | undefined);
  useEffect(() => {
    (async () => {
      if (itemNum < 0) return;
      const { data, error } = await getItem(itemNum);

      if (error) return console.log(error);
      setItem(data);
    })();
  }, [itemNum]);

  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {item?.title}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <img src={item?.imgUrl} width="100%" />
            <div>owned by {item?.memberNickName}</div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={() => {}}>
              입히기
            </button>
            <button type="button" className="btn btn-primary" onClick={() => {}}>
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
