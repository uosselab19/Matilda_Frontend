import { Item } from '../../types/Item';

interface NFTItemModalProps {
  item: Item;
  mode: string;
  id: string;
}

export const ModalNFTItem = (props: NFTItemModalProps) => {
  const { item, mode, id } = props;
  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title" id={`${id}Label`}>
              {item.title}
            </h1>
            <div className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>

          <div className="modal-body row">
            <img src={item.imgUrl} width="100%" />
            <div>owned by {item.memberNickName}</div>
            <div className="row">
              <h3 className="col-7">Price </h3>
              <h3 className="col-5">{item.price} Klay</h3>
            </div>
            <span className="fs-4">{item.title}</span> 를 정말 {mode == 'Buy' ? '구매' : '판매'}하시겠습니까?
          </div>

          <div className="modal-footer">
            <div className="btn btn-primary w-25">{mode}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
