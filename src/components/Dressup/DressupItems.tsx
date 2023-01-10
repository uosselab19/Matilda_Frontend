import { Clothes } from '../../types/Clothes';
import { getItem, selectItems } from '../../services/itemService';
import Items from '../Items/Items';
import Search from '../Items/Search';
import { DetailItem } from '../../types/Item';
import { useNavigate } from 'react-router-dom';
import useItems from '../../hooks/useItems';
import { confirmModal } from '../../utils/alertUtil';
import { alertError, confirmWarning } from '../../utils/alertUtil';
import { getS3Url } from '../../utils/S3';
import { getUserInfo } from '../../utils/cookieUtil';

interface DressupItemsProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];
  options: {};
  setChangedClothes: React.Dispatch<React.SetStateAction<DetailItem>>;
}

//드레스업에서 아이템 보여주는 컴포넌트
export const DressupItems = (props: DressupItemsProps) => {
  const { clothes, setClothes, presetList, options, setChangedClothes } = props;
  const [numShowItems, numShowPages] = [12, 10];
  const navigate = useNavigate();

  const { count, items, page, setPage, setSelectCondition } = useItems(selectItems, options, numShowItems);

  // 아이템 정보가 담긴 카드를 핸들링하는 함수
  const handleCard = async (itemNum: number) => {
    //아이템 정보 가져오기
    const { data, error } = await getItem(itemNum);
    if (error) {
      //에러가 있을 경우
      console.log(error);
      alertError('아이템을 찾지 못 했어요!', '아이템 정보를 불러오는 중 문제가 발생했어요!');
    } else {
      //아이템 불러오기 성공한 경우
      //모달 띄워서 구매/입혀보기 선택하기
      const result = await confirmModal(data.title, data.description, '입혀보기', '구매하기', getS3Url(data.imgUrl), data.title, 400);
      
      //옷 입히기
      if (result.isConfirmed) {
        setClothes((clothes) => ({ ...clothes, [data.catCode]: data }));
        setChangedClothes(data);
      }

      //구매하기
      if (result.isDenied) {
        if (!getUserInfo()) alertError('회원정보 없음!', '저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ');
        else {
          //회원정보가 있어야만 검색 가능
          if (
            !presetList.some((e) => {
              return e == clothes; // 옷 정보에 아무것도 없을 경우
            })
          ) {
            const result = await confirmWarning(
              `페이지 이동`,
              '아직 입고 있는 착장 정보가 프리셋에 저장이 되지 않았는데 페이지를 이동할까요?',
              `저장하고 올게요.`,
              '이동할게요.'
            );
            if (result.isDenied) navigate(`/NFTitem?nft_id=${itemNum}`);
            if (result.isConfirmed) alertError('멈췄어요!', '저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ');
          }
        }
      }
    }
  };

  return (
    <div>
      <Search size={'lg'} handleSearch={setSelectCondition} />
      <Items
        items={items}
        page={page}
        setPage={setPage}
        count={count}
        size={'lg'}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={handleCard}
      />
    </div>
  );
};
