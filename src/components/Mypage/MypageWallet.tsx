import useItems from "../../hooks/useItems";
import { getUserInfo } from "../../utils/cookieUtil";
import Items from "../Items/Items";
import { selectItems } from '../../services/itemService';
import { confirmModal } from "../../utils/alertUtil";
import { Item } from "../../types/Item";
import { useNavigate } from "react-router-dom";

export const MypageWallet = () => {
  const navigate = useNavigate();
  const [numShowItems, numShowPages] = [12, 5];

  const cookie = getUserInfo();
  const { count, items, page, setPage } = useItems(selectItems, { memberNum: cookie.num }, numShowItems);

  const handleCard = async (item: Item) => {
    const result = await confirmModal(item.title, item.description, "판매하기", "수정하기", item.imgUrl, 'Not NFT Image');
    if (result.isConfirmed) {
      navigate(`/mypage/NFTItem?nft_id=${item.itemNum}`);
    }
  }

  return (
    <div>
      <div className="mt-5">
        <h1>클레이튼 관련 내용</h1>
        <p>
          지갑 정보 등, 클레이튼과 관련한 부분입니다!
        </p>
      </div>

      <form id="walletForm" className="needs-validation" noValidate>
        <div className="row g-3">
          {/* 지갑주소 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress1" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
          {/* 지갑주소 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            klay
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress1" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>

          <div className="mt-4">
            <Items
              items={items}
              page={page}
              setPage={setPage}
              count={count}
              size={"md"}
              numShowItems={numShowItems}
              numShowPages={numShowPages}
              handleCard={handleCard} />
          </div>

        </div>
      </form>
    </div>
  );
};
