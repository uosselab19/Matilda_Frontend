import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChangeItem, DetailItem, UpdateItem } from '../../types/Item';
import { changeItem, getItem, putItem } from '../../services/itemService';
import { alertError, alertInput, alertSuccess, alertWarning, confirmInputModal, confirmModal, confirmWarning } from '../../utils/alertUtil';
import { getS3Url } from '../../utils/S3';
import { getUserInfo } from '../../utils/cookieUtil';
import { ReceiptCard } from '../../components/NFTItem/ReceiptCard';
import { selectMember } from '../../services/memberService';
import { buyNFT, mint, setForSale, unsetForSale, updateKeyring } from '../../utils/caverUtil';
//import { buyNFT, setForSale, mint, unsetForSale } from '../../utils/caverUtil';

export const NFTItem = () => {
  const [mode, setMode] = useState("");
  const [item, setItem] = useState({} as DetailItem);
  const [member, setMember] = useState({} as any);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemNum = Number(searchParams.get('nft_id') as string);

  useEffect(() => {
    (async () => {
      const { data, error } = await getItem(itemNum);
      if (error) {
        console.log(error);
        alertError('아이템을 찾지 못 했어요!', '아이템 정보를 불러오는 중 문제가 발생했어요!');
      } else {
        if (data.stateCode == "CR") setMode("mint");
        else if (data.stateCode == "NOS") setMode("sell");
        else if (data.stateCode == "OS") {
          if (getUserInfo()?.num == data.memberNum) setMode("cancel");
          else setMode("buy");
        }
        else {
          alertError("코드 에러", "페이지를 열 수 없는 정보가 들어있어서 돌아갑니다.");
          navigate("/");
        }
        setItem(data as DetailItem);
      }

      const member = await selectMember(getUserInfo().num);
      if (member.error) {
        console.log(member.error);
        alertError("불러오기 에러", "NFT 발행을 위한 클레이튼 주소를 불러오는데 문제가 발생했습니다.")
      } else {
        console.log(member.data);
        updateKeyring(member.data.walletAddress,
          (member.data.memberNum == 2) ? "0x2a3fb48ab0477963a7fb378da8b0a3944e91aec8726c18bb21816d305d439044" : "0xa8ac3335a8a7bacd59b7f00e14ce5e2fb884e7278e73955cdf8ad6bff97b0334");
        setMember(member.data);
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
          const txHash = await buyNFT(member.walletAddress, item.tokenId, item.price);
          const newItem = await changeItem(itemNum, {
            buyerNum: member.memberNum,
            price: item.price,
            option: "TRADE",
            tokenId: item.tokenId,
            tokenUri: item.tokenUri,
            transactionHash: txHash.transactionHash
          } as ChangeItem);
          setItem(newItem.data);
          console.log(newItem);
          console.log(txHash);
          await alertSuccess("구매 완료", "구매가 완료되었습니다!");
        }
      }
    }
  }

  const handleSell = async () => {
    const result = await confirmInputModal("판매 등록하기", "가격을 적고 판매하기 버튼을 눌러주세요!", "판매하기", "돌아가기", "0", getS3Url(item.imgUrl), "on sale");
    const value = Number(result.value);
    if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해보시고 찾아와주세요 ㅎㅎ");
    if (result.isConfirmed) {
      console.log(member.walletAddress);
      console.log(item.tokenId);
      const txHash = await setForSale(member.walletAddress, item.tokenId, value);
      const newItem = await changeItem(itemNum, {
        buyerNum: member.memberNum,
        price: value,
        option: "STATE_OS",
        tokenId: item.tokenId,
        tokenUri: item.tokenUri,
        transactionHash: txHash.transactionHash
      } as ChangeItem);
      setItem(newItem.data);
      console.log(txHash);
      alertSuccess("등록 완료", "지금부터 Marketplace에 당신이 올려놓은 NFT가 보일 거에요!");

    }
  }

  const handleCancel = async () => {
    const result = await confirmModal("거래 무르기", "거래 등록을 해제하고 싶으면 해제하기 버튼을 눌러주세요!", "해제하기", "돌아가기", getS3Url(item.imgUrl), "cancel on sale");
    if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해보시고 찾아와주세요 ㅎㅎ");
    if (result.isConfirmed) {
      const txHash = await unsetForSale(member.walletAddress, item.tokenId);
      const newItem = await changeItem(itemNum, {
        buyerNum: member.memberNum,
        option: "STATE_NOS",
        tokenId: item.tokenId,
        tokenUri: item.tokenUri,
        transactionHash: txHash.transactionHash
      } as ChangeItem);
      setItem(newItem.data);
      console.log(txHash);
      alertSuccess("무름~", "거래 등록을 해제했습니다.");
    }
  }

  const handleMint = async () => {
    const result = await confirmModal("NFT 발행", "NFT를 발행하고 싶으면 발행하기 버튼을 눌러주세요!", "발행하기", "돌아가기", getS3Url(item.imgUrl), "Minting NFT");
    if (result.isDismissed) alertError("취소했어요!", "다시 한 번 생각해주시고 찾아와주세요 ㅎㅎ");
    if (result.isConfirmed) {
      console.log(item.objectUrl);
      const txHash = await mint(member.walletAddress, item.objectUrl);
      const returnValues = txHash.events.tokenMinted.returnValues;
      const newItem = await changeItem(itemNum, {
        buyerNum: item.memberNum,
        option: "MINT",
        tokenId: returnValues["tokenId"],
        tokenUri: returnValues["tokenURI"],
        transactionHash: txHash.transactionHash
      } as ChangeItem);
      setItem(newItem.data);
      alertSuccess("발행 완료", "해당 아이템에 NFT 발행이 완료되었습니다!");
    }
  }

  return item ? (
    <main className="container">
      <div className="row my-5">
        {/* NFT 왼쪽 설명 부분 */}
        <div className="col-lg-3">
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
            <h1 className="blog-post-title mt-5 mb-4">{item.title}
              <button
                type='button'
                className={`btn btn-sm btn-secondary ms-3 ${(mode.length > 0 && mode != "buy") ? "" : "d-none"}`}
                onClick={() => {
                  editButton("이름 수정", "아이템의 이름을 수정하는 모달입니다.", item.title, "title");
                }}>
                edit
              </button>
              <span className="blog-post-meta fs-5 fw-normal ms-5">owned by {item.memberNickName}</span>
            </h1>

            <div className="row g-3">
              <div className="col-2 mt-3">
                <h3 className="blog-post-title">Price : </h3>
              </div>
              <div className="col-2">
                <h3>{item.price} Klay</h3>
              </div>
              <div className='col-6'>
                {(mode.length > 0) ? (
                  <button
                    type="button"
                    className="btn btn-primary w-50 fs-5 fw-bold"
                    onClick={handleButton}>
                    {mode}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={true}
                    className="btn btn-secondary w-50 fs-5 fw-bold">
                    wait
                  </button>
                )}
              </div>
              <div className='col-10 mt-2 fs-4'>
                <div className="fs-3 fw-bold">Histories</div>
                <ReceiptCard index={4} title={"buyNFT"} />
                <ReceiptCard index={1} title={"setForSale"} />
                <ReceiptCard index={6} title={"mint"} />
                <ReceiptCard index={0} title={"create"} />
              </div>
            </div>



          </article>
        </div>
      </div>
    </main>
  ) : null;
};
