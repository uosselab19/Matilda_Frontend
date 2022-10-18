import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChangeItem, DetailItem, UpdateItem } from '../../types/Item';
import { changeItem, getItem, putItem } from '../../services/itemService';
import { alertError, alertInput, alertSuccess, alertWarning, confirmInputModal, confirmModal, confirmWarning } from '../../utils/alertUtil';
import { getS3Url } from '../../utils/S3';
import { getUserInfo } from '../../utils/cookieUtil';
import { HistoriesCard } from '../../components/NFTItem/HistoriesCard';
import { buyNFT, mint, setForSale, unsetForSale, updateKeyring } from '../../utils/caverUtil';
import { getCID } from '../../services/imageService';
import { getHistories } from '../../services/historiesService';
import { Histories } from '../../types/Histories';
import { decrypt } from '../../utils/cryptoUtil';

export const NFTItem = () => {
  const [mode, setMode] = useState('');
  const [item, setItem] = useState({} as DetailItem);
  const [histories, setHistories] = useState([] as Histories[]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemNum = Number(searchParams.get('nft_id') as string);
  const member = getUserInfo();

  useEffect(() => {
    (async () => {
      const { data, error } = await getItem(itemNum);
      if (error) {
        console.log(error);
        alertError('아이템을 찾지 못 했어요!', '아이템 정보를 불러오는 중 문제가 발생했어요!');
      } else {
        if (data.stateCode == 'CR') setMode('mint');
        else if (data.stateCode == 'NOS') setMode('sell');
        else if (data.stateCode == 'OS') {
          if (member?.num == data.memberNum) setMode('cancel');
          else setMode('buy');
        } else {
          alertError('코드 에러', '페이지를 열 수 없는 정보가 들어있어서 돌아갑니다.');
          navigate('/');
        }
        if (data.stateCode != item.stateCode) setItem(data as DetailItem);
      }

      if (member) updateKeyring(member.address, decrypt(member.privateKey));

      const histories = await getHistories({ itemNum: itemNum });
      if (histories.error) {
        console.log(histories.error);
        alertError('변경이력 에러', '변경이력을 불러오는 중에 문제가 발생했습니다.');
        return;
      }

      setHistories(histories.data);
    })();
  }, [mode]);

  const historiesList = histories
    .map((e) => {
      return <HistoriesCard histories={e} key={e.historyNum} />;
    })
    .reverse();

  const editButton = async (title: string, text: string, placeholder: string, key: string) => {
    const newValue = await alertInput(title, text, placeholder);
    const { data, error } = await putItem({ itemNum: itemNum, [key]: newValue } as UpdateItem);
    if (error) {
      return alertError('수정실패', '정보를 수정하는 중에 문제가 발생했습니다.');
    } else {
      setItem(data);
      if (newValue) return alertSuccess('수정완료', '수정이 완료되었습니다.');
      else return alertError('수정실패', '수정이 완료되지 않았습니다.');
    }
  };

  const handleButton = async () => {
    switch (mode) {
      case 'buy':
        handleBuy();
        break;
      case 'sell':
        handleSell();
        break;
      case 'cancel':
        handleCancel();
        break;
      case 'mint':
        handleMint();
        break;
    }
  };

  const handleBuy = async () => {
    const cookie = getUserInfo();
    if (!cookie) alertWarning('로그인이 필요해요!', '로그인 후 이용해주세요!');
    else {
      const result = await confirmModal(
        '구매할까요?',
        '마음에 드신다면 구매하기 버튼을 누르세요!',
        '구매하기',
        '돌아가기',
        getS3Url(item.imgUrl),
        'Selling NFT'
      );
      if (result.isConfirmed) {
        const result = await confirmWarning(
          '정말 구매할까요?',
          '구매하기를 누르시면 구매가 확정됩니다. 주의해주세요!',
          '구매하기',
          '취소하기'
        );
        if (result.isConfirmed) {
          console.log(item);
          const txHash = await buyNFT(member.address, item.tokenId, item.price);
          const newItem = await changeItem(itemNum, {
            buyerNum: member.num,
            price: item.price,
            option: 'TRADE',
            tokenId: item.tokenId,
            tokenUri: item.tokenUri,
            transactionHash: txHash.transactionHash
          } as ChangeItem);
          setItem(newItem.data);
          console.log(newItem);
          console.log(txHash);
          setMode('OS');
          await alertSuccess('구매 완료', '구매가 완료되었습니다!');
        }
      }
    }
  };

  const handleSell = async () => {
    const result = await confirmInputModal(
      '판매 등록하기',
      '가격을 적고 판매하기 버튼을 눌러주세요!',
      '판매하기',
      '돌아가기',
      '0',
      getS3Url(item.imgUrl),
      'on sale'
    );
    const value = Number(result.value);
    if (result.isConfirmed) {
      console.log(member.address);
      console.log(item.tokenId);
      const txHash = await setForSale(member.address, item.tokenId, value);
      const newItem = await changeItem(itemNum, {
        buyerNum: member.num,
        price: value,
        option: 'STATE_OS',
        tokenId: item.tokenId,
        tokenUri: item.tokenUri,
        transactionHash: txHash.transactionHash
      } as ChangeItem);
      setItem(newItem.data);
      console.log(txHash);
      setMode('NOS');
      await alertSuccess('등록 완료', '지금부터 Marketplace에 당신이 올려놓은 NFT가 보일 거에요!');
    }
  };

  const handleCancel = async () => {
    const result = await confirmModal(
      '거래 무르기',
      '거래 등록을 해제하고 싶으면 해제하기 버튼을 눌러주세요!',
      '해제하기',
      '돌아가기',
      getS3Url(item.imgUrl),
      'cancel on sale'
    );
    if (result.isConfirmed) {
      const txHash = await unsetForSale(member.address, item.tokenId);
      const newItem = await changeItem(itemNum, {
        buyerNum: member.num,
        option: 'STATE_NOS',
        tokenId: item.tokenId,
        tokenUri: item.tokenUri,
        transactionHash: txHash.transactionHash
      } as ChangeItem);
      setItem(newItem.data);
      console.log(txHash);
      setMode('NOS');
      await alertSuccess('무름~', '거래 등록을 해제했습니다.');
    }
  };

  const handleMint = async () => {
    const result = await confirmModal(
      'NFT 발행',
      'NFT를 발행하고 싶으면 발행하기 버튼을 눌러주세요!',
      '발행하기',
      '돌아가기',
      getS3Url(item.imgUrl),
      'Minting NFT'
    );
    if (result.isConfirmed) {
      console.log(item.objectUrl);
      const { data, error } = await getCID(itemNum);
      if (error) {
        alertError('CID 불러오기 에러', 'CID를 불러오는 중에 에러가 발생했어요!');
        console.log(error);
      } else {
        const tokenURI = `ipfs://${data}`;
        const txHash = await mint(member.address, tokenURI);
        const returnValues = txHash.events.tokenMinted.returnValues;
        const newItem = await changeItem(itemNum, {
          buyerNum: item.memberNum,
          option: 'MINT',
          tokenId: returnValues['tokenId'],
          tokenUri: returnValues['tokenURI'],
          transactionHash: txHash.transactionHash
        } as ChangeItem);
        setItem(newItem.data);
        setMode('NOS');
        await alertSuccess('발행 완료', '해당 아이템에 NFT 발행이 완료되었습니다!');
      }
    }
  };

  return item ? (
    <main className="container">
      <div className="row my-5">
        {/* NFT 왼쪽 설명 부분 */}
        <div className="col-lg-4">
          <article className="blog-post m-4">
            <img src={getS3Url(item.imgUrl)} width="100%" />
            <p />
            <h2 className="blog-post-title">
              Description
              <button
                type="button"
                className={`btn btn-sm btn-secondary ms-3 ${mode.length > 0 && mode != 'buy' ? '' : 'd-none'}`}
                onClick={() => {
                  editButton('설명 수정', '아이템의 설명을 수정하는 모달입니다.', item.description, 'description');
                }}
              >
                edit
              </button>
            </h2>
            <p>{item.description ? item.description : '설명이 없습니다.'}</p>
          </article>
        </div>

        {/* NFT 오른쪽 설명 부분 */}
        <div className="col-lg-7">
          <div className="row g-3">
            <div className="col-12 fs-1 fw-bold mt-5">
              {item.title}
              <button
                type="button"
                className={`btn btn-sm btn-secondary ms-3 ${mode.length > 0 && mode != 'buy' ? '' : 'd-none'}`}
                onClick={() => {
                  editButton('이름 수정', '아이템의 이름을 수정하는 모달입니다.', item.title, 'title');
                }}
              >
                edit
              </button>
            </div>
            <div className="col-12 fs-5 fw-normal mt-0">owned by {item.memberNickName}</div>
            <div className="col-12 fs-3">Price : {item.price} Klay</div>
            <div className="col-12">
              {mode.length > 0 ? (
                <button type="button" className="btn btn-primary w-50 fs-5 fw-bold" onClick={handleButton}>
                  {mode}
                </button>
              ) : (
                <button type="button" disabled={true} className="btn btn-secondary w-50 fs-5 fw-bold">
                  wait
                </button>
              )}
            </div>
            <div className="col-12 fs-3 mt-4">
              변경이력
              <div className="w-75 fs-5">{historiesList}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : null;
};
