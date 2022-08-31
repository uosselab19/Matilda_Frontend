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
      result = await confirmModal('NFT 등록', '아직 민팅하지 않은 3D 오브젝트에요. 해당 오브젝트를 NFT로 만들까요?', "민팅하기", "돌아가기", item.imgUrl, 'Not NFT Image');
      if (result.isConfirmed) navigate("/NFTminting");
    } else {
      result = await confirmModal('판매하기', '해당 NFT를 판매할 수 있어요. 판매할까요?', "판매하기", "돌아가기", item.imgUrl, 'Completely NFT Image');
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
