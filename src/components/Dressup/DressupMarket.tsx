import { Clothes } from '../../types/Clothes';
import { selectItems } from '../../services/itemService';
import Items from '../Items/Items';
import Search from '../Items/Search';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';
import useItems from '../../hooks/useItems';
import { confirmModal } from '../../utils/alertUtil';
import { alertError, confirmWarning } from '../../utils/alertUtil';

interface DressupMarketProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];
}

export const DressupMarket = (props: DressupMarketProps) => {
  const { clothes, setClothes, presetList } = props;
  const [numShowItems, numShowPages] = [9, 5];
  const navigate = useNavigate();

  const { count, items, page, setPage, setSelectCondition } = useItems(selectItems, {}, numShowItems);
  
  const handleCard = async (item: Item) => {
    const result = await confirmModal(item.title, item.description, "입혀보기", "구매하기", 'https://unsplash.it/400/200', item.title, 400);
    if (result.isConfirmed) {
      setClothes((clothes) => ({ ...clothes, [item.catCode]: item }));
      console.log({ ...clothes, [item.catCode]: item });
    } else {
      if (!presetList.some((e) => { return e == clothes; })) {
        const result = await confirmWarning(`페이지 이동`, "아직 입고 있는 착장 정보가 프리셋에 저장이 되지 않았는데 페이지를 이동할까요?", '이동할게요.', `저장하고 올게요.`);
        if (result.isDismissed) alertError('멈췄어요!', "저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ");
        if (result.isConfirmed) navigate(`/marketplace/NFTitem?nft_id=${item.itemNum}`);
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
        size={"sm"}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={handleCard} />
    </div>
  );
};

