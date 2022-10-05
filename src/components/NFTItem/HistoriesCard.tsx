import { Histories } from "../../types/Histories";

interface HistoriesCardProps {
    histories: Histories;
}

export const HistoriesCard = (props: HistoriesCardProps) => {
    const { histories } = props;
    console.log(histories);

    const setTitle = (histories: Histories) => {
        switch (histories.stateCode) {
            case "CR": return `${histories.sellerNickName}님이 3D 패션 아이템 생성`;
            case "MT": return `${histories.sellerNickName}님이 NFT 발행`;
            case "OS": return `${histories.sellerNickName}님이 ${histories.price}KLAY에 판매 등록`;
            case "TR": return `${histories.buyerNickName}님이 ${histories.sellerNickName}님으로부터 구매 완료`;
            case "NOS": return `${histories.sellerNickName}님이 판매 등록 취소`;
            default: return `확인되지 않은 변경이력`;
        };
    }
    const title = setTitle(histories);
    return (
        <div className="card col-12 px-0 w-100 ms-0 my-1" key={histories.historyNum}>
            <div
                className="card-header w-100 p-0 bg-white"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseHistory${histories.historyNum}`}
                aria-expanded="false"
                aria-controls={`collapseHistory${histories.historyNum}`}>
                <div className='w-100 my-1 ms-0'>
                    <span className="ps-3 py-2 fw-bold">{title}</span>
                </div>
            </div>
            <div className='card-body collapse py-1 row fw-bold' id={`collapseHistory${histories.historyNum}`}>
                <div className='col-12'>txHash: {"0xe877149bae6be03ad1952c17d817344798f0351c629acafa627f5c6c055babe2"}</div>
                <div className='col-12'>seller address: {"0x64469e021f23353a3e0757bc4d211a6f9756d37a"}</div>
                <div className='col-12'>buyer address: {"0x04c1499f9fa23668c08c5322992a8e9bba709ede"}</div>
            </div>
        </div>
    );
}

//https://baobab.scope.klaytn.com/tx/${data}