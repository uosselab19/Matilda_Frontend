import Items from '../Items/Items';
import useItems from '../../hooks/useItems';
import { selectItems } from '../../services/itemService';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/cookieUtil';
import { confirmModal } from '../../utils/alertUtil';
import { SweetAlertResult } from 'sweetalert2';

export const MypageNFTs = () => {
  const navigate = useNavigate();
  const [numShowItems, numShowPages] = [15, 5];

  const cookie = getUserInfo();

  const { count, items, page, setPage } = useItems(selectItems, { memberNum: cookie.num }, numShowItems);

  const handleCard = async (item: Item) => {
    let result: SweetAlertResult<any>;
    if (item.catCode) {
      result = await confirmModal('변환 성공', '변환이 이뤄진 모습을 확인해보세요!', "등록하기", "돌아가기", item.imgUrl, 'Not NFT Image', 500);
      if (result.isConfirmed) navigate("/NFTminting");
    } else {
      result = await confirmModal('판매하기', '판매를 위한 페이지입니다.', "판매하기", "돌아가기", item.imgUrl, 'Completely NFT Image', 500);
      if (result.isConfirmed) navigate(`/mypage/NFTItem?nft_id=${item.itemNum}`);
    }
  }

  return (
    <div className="row">
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
  );
};
