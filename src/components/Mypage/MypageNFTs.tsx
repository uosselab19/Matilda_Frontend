import CardList from '../Items/CardList';
import Pagination from '../Items/Pagination';
import useItems from '../../hooks/useItems';
import { selectItemwithMember } from '../../services/itemService';

export const MypageNFTs = () => {
  const { items, page, setPage } = useItems(selectItemwithMember(2, {}));
  const [numShowItems, numShowPages] = [15, 5];

  return (
    <div className="row">
      <div className='mb-3'>
        <CardList
          page={page}
          items={items}
          numShowItems={numShowItems}
          size="sm"
          handleCard={() => { }} />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        numItems={items.length}
        numShowItems={numShowItems}
        numShowPages={numShowPages} />
    </div>
  );
};
