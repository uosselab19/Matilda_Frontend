import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Item } from '../../types/Item';
import { getItem } from '../../services/itemService';
import { alertError, confirmModal, confirmWarning } from '../../utils/alertUtil';

interface NFTItemProps {
  mode: string;
}

export const NFTItem = (props: NFTItemProps) => {
  const { mode } = props;
  const [item, setItem] = useState({} as Item);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemNum = Number(searchParams.get('nft_id') as string);

  useEffect(() => {
    (async () => {
      console.log(itemNum);
      const { data, error } = await getItem(itemNum);

      if (error) {
        console.log(error);
        alertError('아이템을 찾지 못 했어요!', '아이템 정보를 불러오는 중 문제가 발생했어요!');
        navigate(-1);
      } else {
        setItem(data as Item);
      }
    })();
  }, []);

  const handleButton = async () => {
    const result = await confirmModal("구매할까요?", "구매하기를 누르시면 구매가 확정됩니다. 주의해주세요!", "구매하기", "돌아가기", item.imgUrl, "Selling NFT", 500);
    if (result.isConfirmed) {
      const result = await confirmWarning("구매할까요?", "구매하기를 누르시면 구매가 확정됩니다. 주의해주세요!", "이동하기", "취소하기");
      if (result.isConfirmed) navigate('/mypage');
      else alertError("취소했어요!", "다시 한 번 생각해주시고 찾아와주세요 ㅎㅎ");
    } else {
      alertError("취소했어요!", "다시 한 번 생각해주시고 찾아와주세요 ㅎㅎ");
    }
  }

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
                onClick={handleButton}>
                {mode}
              </button>
            </div>

            <h3>기타 정보</h3>
            <p>해당 부분에는 가격 변동사항, 판매 기간 등의 기타 정보가 들어감.</p>
          </article>
        </div>
      </div>
    </main>
  ) : null;
};
