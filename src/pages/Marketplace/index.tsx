import Items from '../../components/Items/Items';
import Search from '../../components/Items/Search';
import { useNavigate } from 'react-router-dom';
import useItems from '../../hooks/useItems';
import { selectItem } from '../../services/itemService';
import { Item } from '../../types/Item';

export const Marketplace = () => {
  const [numShowItems, numShowPages] = [24, 10];
  const { items, page, setPage, setSelectCondition } = useItems(selectItem, {});

  const navigate = useNavigate();
  const handleCard = (item: Item) => {
    navigate(`/marketplace/NFTItem?nft_id=${item.itemNum}`, { replace: false });
  };

  return (
    <main>
      <div className="d-flex justify-content-center align-items-center fw-bold fs-2 my-5">Marketplace</div>
      <Search
        size="lg"
        handleSearch={setSelectCondition} />
      {/* <Category /> */}
      <Items
        items={items}
        page={page}
        setPage={setPage}
        size={"lg"}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={handleCard} />
    </main>
  );
};
