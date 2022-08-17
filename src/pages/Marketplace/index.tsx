import Items from '../../components/Items/Items';
import Search from '../../components/Items/Search';
import { useNavigate } from 'react-router-dom';
import useItems from '../../hooks/useItems';
import { selectItems } from '../../services/itemService';
import { Item } from '../../types/Item';

export const Marketplace = () => {
  const [numShowItems, numShowPages] = [20, 10];
  const { count, items, page, setPage, setSelectCondition } = useItems(selectItems, {}, numShowItems);

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
        count={count}
        size={"lg"}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={handleCard} />
    </main>
  );
};
