import { Link, useSearchParams } from 'react-router-dom';
import imageFile from '../assets/images/NFTItem/mindul_NFT1.jpg';

interface NFT {
  item_num: number;
  cat_code: string;
  title: string;
  description: string;
  img_url: string;
  nft_address: string;
  price: number;
}

export const SellNFTItem = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get('nft_id') as string);

  const loadNFT = (id: number): NFT => {
    return {
      item_num: id,
      cat_code: 'all',
      title: `nft ${id}`,
      description: `nft ${id}`,
      img_url: `nft ${id}`,
      nft_address: `nft ${id}`,
      price: 10.597
    };
  };
  const NFT_info = loadNFT(id);

  return (
    <main className="container">
      <div className="row my-5">
        {/* NFT 왼쪽 설명 부분 */}
        <div className="col-lg-5">
          <article className="blog-post m-4">
            <img src={imageFile} width="100%" />
            <p />
            <h2 className="blog-post-title">Description</h2>
            <p>{NFT_info.description}</p>
          </article>
        </div>

        {/* NFT 오른쪽 설명 부분 */}
        <div className="col-lg-7">
          <article className="blog-post">
            <h1 className="blog-post-title my-5">{NFT_info.title}</h1>
            <p className="blog-post-meta">
              maked by <Link to="#">Mindul</Link>
            </p>

            <p>해당 부분에 NFT에 대한 자세한 설명이 들어감. 이 부분은 첫 번째 단락임.</p>
            <p>해당 부분에 NFT에 대한 자세한 설명이 들어감. 이 부분은 두 번째 단락임.</p>

            <div className="row my-5">
              <div className="col-3">
                <h3 className="blog-post-title">Price</h3>
              </div>
              <div className="col-9">
                <h3>{NFT_info.price}\</h3>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-primary btn-lg p-3 w-50"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Sell
              </button>
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
                        {NFT_info.title}
                      </h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {/* 해당 부분은 구매 페이지 본문입니다. */}
                      {/* NFT 왼쪽 설명 부분 */}
                      <div className="col-lg-12">
                        <article className="blog-post mx-2">
                          <img src={imageFile} width="100%" />
                        </article>
                      </div>

                      {/* NFT 오른쪽 설명 부분 */}
                      <div className="col-lg-12">
                        <article className="blog-post">
                          <p className="blog-post-meta">owned by Mindul</p>

                          <div className="row">
                            <div className="col-7">
                              <h3 className="blog-post-title">Price</h3>
                            </div>
                            <div className="col-5">
                              <h3>{NFT_info.price}\</h3>
                            </div>
                          </div>
                          <p className="fs-5">
                            <span className="fs-4">{NFT_info.title}</span> 를 정말 판매하시겠습니까?
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
            </div>

            <h3>기타 정보</h3>
            <p>해당 부분에는 가격 변동사항, 판매 기간 등의 기타 정보가 들어감.</p>
          </article>
        </div>
      </div>
    </main>
  );
};
