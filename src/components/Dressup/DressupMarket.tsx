import { Clothes } from '../../types/Clothes';
import { selectItems } from '../../services/itemService';
import Items from '../Items/Items';
import Search from '../Items/Search';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';
import useItems from '../../hooks/useItems';
import { confirmModal } from '../../utils/alertUtil';
import { alertError, confirmWarning } from '../../utils/alertUtil';
import { getS3Url } from '../../utils/S3';
import { getUserInfo } from '../../utils/cookieUtil';

interface DressupMarketProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];

  setChangedClothes: React.Dispatch<React.SetStateAction<Item>>;
}

export const DressupMarket = (props: DressupMarketProps) => {
  const { clothes, setClothes, presetList, setChangedClothes } = props;
  const [numShowItems, numShowPages] = [12, 10];
  const navigate = useNavigate();

  const { count, items, page, setPage, setSelectCondition } = useItems(selectItems, {}, numShowItems);
  
  const handleCard = async (item: Item) => {
    const result = await confirmModal(item.title, item.description, "입혀보기", "구매하기", getS3Url(item.imgUrl), item.title, 400);
    if (result.isConfirmed) {
      setClothes((clothes) => ({ ...clothes, [item.catCode]: item }));
      setChangedClothes(item);
    }
    
    if (result.isDismissed) {
      if(!getUserInfo()) alertError('회원정보 없음!', "저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ");
      else {
        if (!presetList.some((e) => { return e == clothes; })) {
          const result = await confirmWarning(`페이지 이동`, "아직 입고 있는 착장 정보가 프리셋에 저장이 되지 않았는데 페이지를 이동할까요?", `저장하고 올게요.`, '이동할게요.');
          if (result.isDismissed) navigate(`/marketplace/NFTitem?nft_id=${item.itemNum}`);
          if (result.isConfirmed) alertError('멈췄어요!', "저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ");
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

