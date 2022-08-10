import CardList from '../../components/Items/CardList';
import Pagination from '../../components/Items/Pagination';
import Search from '../../components/Items/Search';
import { useNavigate } from 'react-router-dom';
import useItems from '../../hooks/useItems';
import { selectItem } from '../../services/itemService';

export const Marketplace = () => {
  const [numShowItems, numShowPages] = [24, 10];
  const { items, page, setPage, setSelectCondition } = useItems(selectItem, {});

  const navigate = useNavigate();
  const handleCard = (id: number) => {
    navigate(`/marketplace/NFTItem?nft_id=${id}`, { replace: false });
  };

  return (
    <main>
      <div className="d-flex justify-content-center align-items-center fw-bold fs-2 my-5">Marketplace</div>
      <Search
        size="lg"
        handleSearch={setSelectCondition} />
      {/* <Category /> */}
      <div className="my-5">
        <CardList
          page={page}
          items={items}
          numShowItems={numShowItems}
          size={'lg'}
          handleCard={handleCard} />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        numItems={items.length}
        numShowItems={numShowItems}
        numShowPages={numShowPages} />
    </main>
  );
};
