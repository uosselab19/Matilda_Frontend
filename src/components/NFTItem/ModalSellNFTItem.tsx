interface NFT {
  itemNum: number;
  catCode: string;
  title: string;
  description: string;
  makerName: string;
  imgUrl: string;
  nftAddress: string;
  price: number;
}

export const ModalSellNFTItem = (NFTInfo: NFT, mode: string) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title" id="staticBackdropLabel">
              {NFTInfo.title}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* 해당 부분은 구매 페이지 모달 본문입니다. */}
            <div className="col-lg-12">
              <article className="blog-post mx-2">
                <img src={NFTInfo.imgUrl} width="100%" />
              </article>
            </div>

            <div className="col-lg-12">
              <article className="blog-post">
                <p className="blog-post-meta">owned by {NFTInfo.makerName}</p>

                <div className="row">
                  <div className="col-7">
                    <h3 className="blog-post-title">Price </h3>
                  </div>
                  <div className="col-5">
                    <h3>{NFTInfo.price} Klay</h3>
                  </div>
                </div>
                <p className="fs-5">
                  <span className="fs-4">{NFTInfo.title}</span> 를 정말 판매하시겠습니까?
                </p>
              </article>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary w-25">
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
