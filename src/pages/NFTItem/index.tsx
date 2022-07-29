//import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModalNFTItem } from '../../components/modal/ModalNFTItem';
import { Item } from '../../types/Item';
import { getItem } from '../../services/itemService';

interface NFTItemProps {
  mode: string;
}

export const NFTItem = (props: NFTItemProps) => {
  const { mode } = props;
  const [item, setItem] = useState({} as Item);
  const [searchParams] = useSearchParams();
  const itemNum = Number(searchParams.get('nft_id') as string);

  useEffect(() => {
    (async () => {
      const { data } = await getItem(itemNum);
      setItem(data as unknown as Item);
    })();
  }, []);

  return item ? (
    <main className="container">
      <div className="row my-5">
        {/* NFT 왼쪽 설명 부분 */}
        <div className="col-lg-5">
          <article className="blog-post m-4">
            <img src={item.imgUrl} width="100%" />
            <p />
            <h2 className="blog-post-title">Description</h2>
            <p>{item.description}</p>
          </article>
        </div>

        {/* NFT 오른쪽 설명 부분 */}
        <div className="col-lg-7">
          <article className="blog-post">
            <h1 className="blog-post-title mt-5 mb-3">{item.title}</h1>
            <p className="blog-post-meta">owned by {item.memberNickName}</p>

            <div className="row my-5">
              <div className="col-3">
                <h3 className="blog-post-title">Price : </h3>
              </div>
              <div className="col-9">
                <h3>{item.price} Klay</h3>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-primary btn-lg p-3 mb-5 w-50"
                data-bs-toggle="modal"
                data-bs-target={`#${'ModalNFTItem'}`}
              >
                {mode}
              </button>
              <ModalNFTItem item={item} mode={mode} id={'ModalNFTItem'} />
            </div>

            <h3>기타 정보</h3>
            <p>해당 부분에는 가격 변동사항, 판매 기간 등의 기타 정보가 들어감.</p>
          </article>
        </div>
      </div>
    </main>
  ) : null;
};
