import { useEffect, useState } from 'react';

//컴포넌트가 받을 props
interface CardListProps {
  page: number;
  itemList: JSX.Element[];
  numShowItems: number;
}

export default function CardList(props: CardListProps) {
  const {page, itemList, numShowItems} = props;
  const [showList, setShowList]=useState(itemList.slice(page));

  useEffect(() => { (async () => {
    setShowList(itemList.slice(page*numShowItems, (page+1)*numShowItems));
  })();}, [page]);

  return (
    <div className="container">
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 align-items-around g-3 my-5'>
        {showList}
      </div>
    </div>
  );
};
