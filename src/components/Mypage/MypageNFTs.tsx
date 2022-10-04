import Items from '../Items/Items';
import useItems from '../../hooks/useItems';
import { getItem, selectItems } from '../../services/itemService';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/cookieUtil';
import { alertError, confirmModal } from '../../utils/alertUtil';
import { getS3Url } from '../../utils/S3';

export const MypageNFTs = () => {
  const navigate = useNavigate();
  const [numShowItems, numShowPages] = [12, 5];

  const cookie = getUserInfo();

  const { count, items, page, setPage } = useItems(selectItems, { memberNum: cookie.num }, numShowItems);

  const handleCard = async (itemNum: number) => {
    const { data, error } = await getItem(itemNum);
    if (error) {
      console.log(error);
      alertError('아이템을 찾지 못 했어요!', '아이템 정보를 불러오는 중 문제가 발생했어요!');
    } else {
      console.log(data);
      const result = await confirmModal(data.title, data.description, "NFT 발행하기", "돌아가기", getS3Url(data.imgUrl), 'Not NFT Image');
      if (result.isConfirmed) {navigate(`/NFTItem?nft_id=${data.itemNum}`);}
      if (result.isDismissed) {alertError("취소했어요!", "다시 한 번 생각해보시고 찾아와주세요 ㅎㅎ");}
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
