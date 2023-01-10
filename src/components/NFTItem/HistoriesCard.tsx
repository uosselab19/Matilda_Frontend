import { Histories } from '../../types/Histories';

interface HistoriesCardProps {
  histories: Histories;
}

// NFTItem의 거래이력을 나타내는 카드 컴포넌트
export const HistoriesCard = (props: HistoriesCardProps) => {
  const { histories } = props;

  // 문구는 stateCode마다 다르기 때문에 미리 저장해둠
  const setTitle = (histories: Histories) => {
    switch (histories.stateCode) {
      case 'CR':
        return `${histories.sellerNickName}님이 3D 패션 아이템 생성`;
      case 'MT':
        return `${histories.sellerNickName}님이 NFT 발행`;
      case 'OS':
        return `${histories.sellerNickName}님이 ${histories.price}KLAY에 판매 등록`;
      case 'TR':
        return `${histories.buyerNickName}님이 ${histories.sellerNickName}님으로부터 구매 완료`;
      case 'NOS':
        return `${histories.sellerNickName}님이 판매 등록 취소`;
      default:
        return `확인되지 않은 변경이력`;
    }
  };
  const title = setTitle(histories);

  return (
    <div className="card col-12 px-0 w-100 ms-0 my-1" key={histories.historyNum}>
      <div
        className="card-header w-100 p-0 bg-white"
        data-bs-toggle="collapse"
        data-bs-target={`#collapseHistory${histories.historyNum}`}
        aria-expanded="false"
        aria-controls={`collapseHistory${histories.historyNum}`}
      >
        <div className="w-100 my-1 ms-0">
          <span className="ps-3 py-2">{title}</span>
        </div>
      </div>
      <div className="card-body collapse py-1 row" id={`collapseHistory${histories.historyNum}`}>
        {/* 여기에 들어간 이상한 값은 임시로 넣어둔 값이고, 실제로는 개인 주소값이 들어가야 함 */}
        {/* 근데 이건 미처 수정 못 하고 프로젝트가 종료돼서 그냥 내버려 둠 */}
        {/* 아래 주소에 ${data}부분에 저 해시값 넣으면 해당 거래내역 들어가질 텐데 참고해서 개발하세요^^& */}
        <div className="col-12">txHash: {'0xe877149bae6be03ad1952c17d817344798f0351c629acafa627f5c6c055babe2'}</div>
        <div className="col-12">seller address: {'0x64469e021f23353a3e0757bc4d211a6f9756d37a'}</div>
        <div className="col-12">buyer address: {'0x04c1499f9fa23668c08c5322992a8e9bba709ede'}</div>
      </div>
    </div>
  );
};

//https://baobab.scope.klaytn.com/tx/${data}
