import { useEffect, useState } from 'react';
import { getItem } from '../../services/itemService';
import { Item } from '../../types/Item';

interface ModalItemProps {
  modalID: string;
  itemNum: number;
}

export const ModalItem = (props: ModalItemProps) => {
  const { modalID, itemNum } = props;
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
    <div className="modal fade" id={modalID}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalID}Label`}>
              {item?.title}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <img src={item?.imgUrl} width="100%" />
            <div>owned by {item?.memberNickName}</div>
          </div>

          <div className="modal-footer">
            {}
          </div>
        </div>
      </div>
    </div>
  );
};
