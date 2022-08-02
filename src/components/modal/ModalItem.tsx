import { Item } from '../../types/Item';

interface ModalItemProps {
  modalID: string;
  item?: Item;
  footerButtons: JSX.Element[];
  footerDescription?:string;
  isStatic?: boolean;
}

export default function ModalItem (props: ModalItemProps) {
  const { modalID, item, footerDescription, footerButtons, isStatic } = props;

  return (
    <div
      className="modal fade"
      id={modalID}
      data-bs-backdrop={isStatic ? "static" : null}
      data-bs-keyboard="false"
      aria-labelledby={`${modalID}Label`}
      aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-light" style={{ backgroundColor: "black" }}>
            <h5 className="modal-title" id={`${modalID}Label`}>
              {item?.title}
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
          </div>

          <div className="modal-body">
            <img src={item?.imgUrl} width="100%" />
            <div>owned by {item?.memberNickName}</div>
            <div className="row d-flex justify-content-between">
              <h3 className="col-4">Price </h3>
              <h3 className="col-4 text-end">{item?.price}</h3>
              <h3 className="col-4">Klay</h3>
            </div>
            <div>{item?.description}</div>
          </div>

          <div className="modal-footer w-100 d-flex justify-content-between" style={{ backgroundColor: "lightgray" }}>
            <div>{footerDescription}</div>
            <div className='btn-group'>
              {footerButtons}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
