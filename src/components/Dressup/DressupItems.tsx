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

export const DressupItems = (props: DressupItemsProps) => {
  const { clothes, setClothes, presetList, options, setChangedClothes } = props;
  const [numShowItems, numShowPages] = [12, 10];
  const navigate = useNavigate();

  const { count, items, page, setPage, setSelectCondition } = useItems(selectItems, options, numShowItems);

  const handleCard = async (itemNum: number) => {
    const { data, error } = await getItem(itemNum);
    if (error) {
      console.log(error);
      alertError('아이템을 찾지 못 했어요!', '아이템 정보를 불러오는 중 문제가 발생했어요!');
    } else {
      const result = await confirmModal(data.title, data.description, "입혀보기", "구매하기", getS3Url(data.imgUrl), data.title, 400);
      if (result.isConfirmed) {
        setClothes((clothes) => ({ ...clothes, [data.catCode]: data }));
        setChangedClothes(data);
      }
      if (result.isDenied) {
        if (!getUserInfo()) alertError('회원정보 없음!', "저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ");
        else {
          if (!presetList.some((e) => { return e == clothes; })) {
            const result = await confirmWarning(`페이지 이동`, "아직 입고 있는 착장 정보가 프리셋에 저장이 되지 않았는데 페이지를 이동할까요?", `저장하고 올게요.`, '이동할게요.');
            if (result.isDenied) navigate(`/NFTitem?nft_id=${itemNum}`);
            if (result.isConfirmed) alertError('멈췄어요!', "저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ");
          }
        }
      }
    }
  }

  return (
    <div>
      <Search
        size={"lg"}
        handleSearch={setSelectCondition} />
      <Items
        items={items}
        page={page}
        setPage={setPage}
        count={count}
        size={"lg"}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={handleCard} />
    </div>
  );
};

