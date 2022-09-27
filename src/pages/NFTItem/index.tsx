import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Item } from '../../types/Item';
import { getItem } from '../../services/itemService';
import { alertError, confirmModal, confirmSuccess, confirmWarning } from '../../utils/alertUtil';
import { getS3Url } from '../../utils/S3';
import { getUserInfo } from '../../utils/cookieUtil';
import { selectMember } from '../../services/memberService';

interface ReceiptCard {
  index: number;
  title: string;
}

const ReceiptCard = (props: ReceiptCard) => {
  const { index, title } = props;
  return (
    <div className="card col-12 px-0 w-100 ms-0 my-1" key={index}>
      <div
        className="card-header w-100 p-0 bg-white"
        data-bs-toggle="collapse"
        data-bs-target={`#collapseReceipt${index + 1}`}
        aria-expanded="false"
        aria-controls={`collapseReceipt${index + 1}`}>
        <div className='w-100 my-1 ms-0'>
          <span className="fs-5 fw-bold ps-3 py-2">Receipt {index + 1} </span>
          <span className="ps-3 py-2"> Method: {title}</span>
        </div>
      </div>
      <div className='card-body collapse py-1 row' id={`collapseReceipt${index + 1}`}>
        <div className='col-4'>txHash: {"asdf"}</div>
        <div className='col-12'>seller address: {"0x64469e021f23353a3e0757bc4d211a6f9756d37a"}</div>
        <div className='col-12'>buyer address: {"0x04c1499f9fa23668c08c5322992a8e9bba709ede"}</div>
      </div>
    </div>
  );
}

export const NFTItem = () => {
  const [mode, setMode] = useState("");
  const [item, setItem] = useState({} as Item);
  const [searchParams] = useSearchParams();
  const location = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  const itemNum = Number(searchParams.get('nft_id') as string);
  useEffect(() => {
    (async () => {
      const { data, error } = await getItem(itemNum);
      if (error) {
        console.log(error);
        alertError('아이템을 찾지 못 했어요!', '아이템 정보를 불러오는 중 문제가 발생했어요!');
        navigate(`/${location}`);
      } else {
        setItem(data as Item);
        const memberNickName = data.memberNickName;
        if (location == "marketplace") {
          const cookie = getUserInfo();
          if (cookie) {
            const { data, error } = await selectMember(cookie.num);
            console.log(data.nickname);
            console.log(memberNickName);
            if (error) { alertError("회원정보 에러", "회원정보를 불러오는 중에 문제가 발생했어요!"); }
            else if (data.nickname == memberNickName) setMode("cancel");
          }
          else setMode("buy");
        } else if (location == "mypage") {
          if (data.stateCode == "CR") setMode("mint");
          else setMode("sell")
        }
      }
    })();
  }, []);

  const editButton = () => {
    const result = await alertText("구매할까요?", "마음에 드신다면 구매하기 버튼을 누르세요!", "구매하기", "돌아가기", getS3Url(item.imgUrl), "Selling NFT");
  }

  const handleButton = async () => {
    const result = await confirmModal("구매할까요?", "마음에 드신다면 구매하기 버튼을 누르세요!", "구매하기", "돌아가기", getS3Url(item.imgUrl), "Selling NFT");
    if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해주시고 찾아와주세요 ㅎㅎ");
    if (result.isConfirmed) {
      const result = await confirmWarning("정말 구매할까요?", "구매하기를 누르시면 구매가 확정됩니다. 주의해주세요!", "구매하기", "취소하기");
      if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해주시고 찾아와주세요 ㅎㅎ");
      if (result.isConfirmed) {
        const result = await confirmSuccess("페이지 이동", "구매가 완료되었습니다! 마켓플레이스로 페이지를 이동할까요?", "이동하기", "취소하기");
        if (result.isConfirmed) navigate('/mypage');
      }
    }
  }

  return item ? (
    <main className="container">
      <div className="row my-5">
        {/* NFT 왼쪽 설명 부분 */}
        <div className="col-lg-5">
          <article className="blog-post m-4">
            <img src={getS3Url(item.imgUrl)} width="100%" />
            <p />
            <h2 className="blog-post-title">Description</h2>
            <p>{item.description ? item.description : "설명이 없습니다."}</p>
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

            <div className="row">
              <div className='col-6 d-flex justify-content-center'>
                {(mode.length > 0) ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg p-3 mb-5 w-100"
                    onClick={handleButton}>
                    {mode}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={true}
                    className="btn btn-secondary btn-lg p-3 mb-5 w-100">
                    wait
                  </button>
                )}
              </div>
              <div className='col-6 d-flex justify-content-center'>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg p-3 mb-5 w-50"
                  onClick={editButton}>
                  edit
                </button>
              </div>
            </div>

            <h3>NFT Receipt</h3>
            <div className='card py-2 px-1 mt-3'>
              <ReceiptCard index={5} title={"setForSale"} />
              <ReceiptCard index={4} title={"butNFT"} />
              <ReceiptCard index={3} title={"setForSale"} />
              <ReceiptCard index={2} title={"unsetForSale"} />
              <ReceiptCard index={1} title={"setForSale"} />
              <ReceiptCard index={0} title={"create"} />
            </div>
          </article>
        </div>
      </div>
    </main>
  ) : null;
};
