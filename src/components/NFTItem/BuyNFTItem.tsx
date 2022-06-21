import { useSearchParams } from 'react-router-dom';
import imageFile from '../../assets/images/NFTItem/mindul_NFT1.jpg';
import { ModalBuyNFTItem } from './ModalBuyNFTItem';

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

export const BuyNFTItem = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get('nft_id') as string);
  const mode = 'Buy';

  const loadNFT = (id: number): NFT => {
    return {
      itemNum: id,
      catCode: 'all',
      title: `nft ${id}`,
      description: `nft ${id}`,
      makerName: `Mindul`,
      imgUrl: imageFile,
      nftAddress: `nft ${id}`,
      price: 10.597
    };
  };
  const NFTInfo = loadNFT(id);

  return (
    <main className="container">
      <div className="row my-5">
        {/* NFT 왼쪽 설명 부분 */}
        <div className="col-lg-5">
          <article className="blog-post m-4">
            <img src={NFTInfo.imgUrl} width="100%" />
            <p />
            <h2 className="blog-post-title">Description</h2>
            <p>{NFTInfo.description}</p>
          </article>
        </div>

        {/* NFT 오른쪽 설명 부분 */}
        <div className="col-lg-7">
          <article className="blog-post">
            <h1 className="blog-post-title mt-5 mb-3">{NFTInfo.title}</h1>
            <p className="blog-post-meta">owned by {NFTInfo.makerName}</p>

            <div className="row my-5">
              <div className="col-3">
                <h3 className="blog-post-title">Price : </h3>
              </div>
              <div className="col-9">
                <h3>{NFTInfo.price} Klay</h3>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-primary btn-lg p-3 mb-5 w-50"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {mode}
              </button>
              {ModalBuyNFTItem(NFTInfo, mode)}
            </div>

            <h3>기타 정보</h3>
            <p>해당 부분에는 가격 변동사항, 판매 기간 등의 기타 정보가 들어감.</p>
          </article>
        </div>
      </div>
    </main>
  );
};
