import Items from '../Items/Items';
import useItems from '../../hooks/useItems';
import { selectItems } from '../../services/itemService';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/cookieUtil';
import { confirmModal } from '../../utils/alertUtil';

export const MypageNFTs = () => {
  const navigate = useNavigate();
  const [numShowItems, numShowPages] = [15, 5];

  const cookie = getUserInfo();

  const { count, items, page, setPage } = useItems(selectItems, { memberNum: cookie.num }, numShowItems);

  const handleCard = async (item: Item) => {
    const result = await confirmModal(item.title, item.description, "NFT 발행하기", "수정하기", item.imgUrl, 'Not NFT Image');
    if (result.isConfirmed) {
      navigate("/NFTminting");
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
