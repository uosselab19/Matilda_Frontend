import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DetailItem, UpdateItem } from '../../types/Item';
import { getItem, putItem } from '../../services/itemService';
import { alertError, alertInput, alertSuccess, alertWarning, confirmModal, confirmWarning } from '../../utils/alertUtil';
import { getS3Url } from '../../utils/S3';
import { getUserInfo } from '../../utils/cookieUtil';
import { ReceiptCard } from '../../components/NFTItem/ReceiptCard';
import { buyNFT, setForSale, mint, unsetForSale } from '../../utils/caverUtil';

export const NFTItem = () => {
  const [mode, setMode] = useState("");
  const [item, setItem] = useState({} as DetailItem);
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
        if (location == "marketplace") {
          if(getUserInfo()?.num == data.memberNum) setMode("cancel");
          else setMode("buy");
        } else if (location == "mypage") {
          if (data.stateCode == "CR") setMode("mint");
          else if (data.stateCode == "NOS") setMode("sell");
          else if (data.stateCode == "OS") setMode("cancel");
        }
        setItem(data as DetailItem);
      }
    })();
  }, []);

  const editButton = async (title: string, text: string, placeholder: string, key: string) => {
    const newValue = await alertInput(title, text, placeholder);

    const { data, error } = await putItem({ itemNum: itemNum, [key]: newValue } as UpdateItem);
    if (error) { return alertError("수정실패", "정보를 수정하는 중에 문제가 발생했습니다."); }
    else {
      setItem(data);
      if (newValue) return alertSuccess("수정완료", "수정이 완료되었습니다.");
      else return alertError("수정실패", "수정이 완료되지 않았습니다.");
    }
  }

  const handleButton = async () => {
    switch (mode) {
      case "buy": handleBuy(); break;
      case "sell": handleSell(); break;
      case "cancel": handleCancel(); break;
      case "mint": handleMint(); break;
    }
  }

  const handleBuy = async () => {
    const cookie = getUserInfo();
    if (!cookie) alertWarning("로그인이 필요해요!", "로그인 후 이용해주세요!");
    else {
      const result = await confirmModal("구매할까요?", "마음에 드신다면 구매하기 버튼을 누르세요!", "구매하기", "돌아가기", getS3Url(item.imgUrl), "Selling NFT");
      if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해주시고 찾아와주세요 ㅎㅎ");
      if (result.isConfirmed) {
        const result = await confirmWarning("정말 구매할까요?", "구매하기를 누르시면 구매가 확정됩니다. 주의해주세요!", "구매하기", "취소하기");
        if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해주시고 찾아와주세요 ㅎㅎ");
        if (result.isConfirmed) {
          buyNFT(address, item.tokenID, item.price);
          await alertSuccess("페이지 이동", "구매가 완료되었습니다!");
        }
      }
    }
  }

  const handleSell = async () => {
    const result = await confirmModal("판매 등록하기", "판매를 등록하고 싶으면 등록하기 버튼을 눌러주세요!", "등록하기", "돌아가기", getS3Url(item.imgUrl), "cancel on sale");
    if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해보시고 찾아와주세요 ㅎㅎ");
    if (result.isConfirmed) {
      await setForSale(address, item.tokenID, item.price);
      alertSuccess("등록 완료", "지금부터 Marketplace에 당신이 올려놓은 NFT가 보일 거에요!");
    }
  }

  const handleCancel = async () => {
    const result = await confirmModal("거래 무르기", "거래 등록을 해제하고 싶으면 해제하기 버튼을 눌러주세요!", "해제하기", "돌아가기", getS3Url(item.imgUrl), "cancel on sale");
    if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해보시고 찾아와주세요 ㅎㅎ");
    if (result.isConfirmed) {
      await unsetForSale(address, item.tokenID);
      alertSuccess("무름~", "거래 등록을 해제했습니다.");
    }
  }

  const handleMint = async () => {
    const result = await confirmModal("NFT 발행", "NFT를 발행하고 싶으면 발행하기 버튼을 눌러주세요!", "발행하기", "돌아가기", getS3Url(item.imgUrl), "Minting NFT");
    if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해주시고 찾아와주세요 ㅎㅎ");
    if (result.isConfirmed) {
      await mint(minter, tokenURI);
      alertSuccess("발행 완료", "해당 아이템에 NFT 발행이 완료되었습니다!");
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
            <h2 className="blog-post-title">Description
              <button
                type='button'
                className={`btn btn-sm btn-secondary ms-3 ${(mode.length > 0 && mode != "buy") ? "" : "d-none"}`}
                onClick={() => {
                  editButton("설명 수정", "아이템의 설명을 수정하는 모달입니다.", item.description, "description");
                }}>
                edit
              </button>
            </h2>
            <p>{item.description ? item.description : "설명이 없습니다."}</p>
          </article>
        </div>

        {/* NFT 오른쪽 설명 부분 */}
        <div className="col-lg-7">
          <article className="blog-post">
            <h1 className="blog-post-title mt-5 mb-3">{item.title}
              <button
                type='button'
                className={`btn btn-sm btn-secondary ms-3 ${(mode.length > 0 && mode != "buy") ? "" : "d-none"}`}
                onClick={() => {
                  editButton("이름 수정", "아이템의 이름을 수정하는 모달입니다.", item.title, "title");
                }}>
                edit
              </button>
            </h1>
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
              <div className='col-12'>
                {(mode.length > 0) ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg p-3 mb-5 w-50"
                    onClick={handleButton}>
                    {mode}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={true}
                    className="btn btn-secondary btn-lg p-3 mb-5 w-50">
                    wait
                  </button>
                )}
              </div>
            </div>

            <h3>History</h3>
            <div className='card py-2 px-1 mt-3'>
              {/* <ReceiptCard index={5} title={"setForSale"} />
              <ReceiptCard index={4} title={"butNFT"} />
              <ReceiptCard index={3} title={"setForSale"} />
              <ReceiptCard index={2} title={"unsetForSale"} />
              <ReceiptCard index={1} title={"setForSale"} /> */}
              <ReceiptCard index={0} title={"create"} />
            </div>
          </article>
        </div>
      </div>
    </main>
  ) : null;
};
