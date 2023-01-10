import Items from '../Items/Items';
import useItems from '../../hooks/useItems';
import { getItem, selectItems } from '../../services/itemService';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/cookieUtil';
import { alertError, confirmModal } from '../../utils/alertUtil';
import { getS3Url } from '../../utils/S3';

//마이페이지 중 NFT 목록을 담당하는 컴포넌트
export const MypageNFTs = () => {
  const navigate = useNavigate(); // 네비게이터 훅을 위함
  const [numShowItems, numShowPages] = [12, 5]; // 아이템 몇 개를 보여주는지에 대한 변수

  const cookie = getUserInfo(); // 유저 정보를 쿠키로부터 불러오는 함수
 
  //NFT 아이템 정보를 불러오는 훅
  const { count, items, page, setPage } = useItems(selectItems, { memberNum: cookie.num }, numShowItems);

  // 카드를 눌렀을 때 반응을 구현하는 함수
  const handleCard = async (itemNum: number) => {
    const { data, error } = await getItem(itemNum); // 아이템 정보를 백엔드에서 가져오는 부분
    if (error) {
      //에러가 나면 에러메시지 출력
      alertError('아이템을 찾지 못 했어요!', '아이템 정보를 불러오는 중 문제가 발생했어요!');
    } else {
      //아이템 정보를 잘 불러온 경우
      console.log(data);
      const result = await confirmModal(
        data.title,
        data.description,
        data.stateCode == 'CR' ? 'NFT 발행하기' : '판매하기',
        '돌아가기',
        getS3Url(data.imgUrl), // 사진은 AWS S3에서부터 가져옴.
        'Not NFT Image'
      );
      if (result.isConfirmed) {
        navigate(`/NFTItem?nft_id=${data.itemNum}`);
      }
    }
  };

  return (
      <Items
        items={items}
        page={page}
        setPage={setPage}
        count={count}
        size={'md'}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={handleCard}
      />
  );
};
