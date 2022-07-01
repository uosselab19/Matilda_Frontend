import item_img1 from '../../assets/images/Explore/item_img.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

//컴포넌트가 받을 props
interface props {
  category: string;
  page: number;
  setPage: Function;
  numItems: number;
  numShowItems: number;
}

interface info {
  id: number;
  title: string;
  makerThumbImg: '*.png';
  link: string;
  thumbnail: '*.png';
  price: number;
}

const Pagination = (props: props) => {
  const page = props.page;
  const setPage = props.setPage;
  const [numItems, numShowItems] = [props.numItems, props.numShowItems];
  const maxNumItems = Math.floor(numItems / numShowItems); //페이지네이션 변수
  const maxShowPage = 10;

  const prevPage = () => {
    if (page > maxShowPage - 1)
      // 1 2 3 4 5 중에 하나가 되면 안 됨
      setPage(page - ((page % maxShowPage) + 1)); // 다음 수열 중에 가장 큰 숫자로 이동.
    // ex) 6 7 8 9 10 => 1 2 3 4 5 면 page는 4
  };
  const nextPage = () => {
    if (page + (maxShowPage - (page % maxShowPage)) < maxNumItems) setPage(page + (maxShowPage - (page % maxShowPage))); // 다음 수열 중에 가장 큰 숫자로 이동.
    // ex) 1 2 3 4 5 => 6 7 8 9 10 면 page는 5
  };

  const pagigationButton = (number: number, selected: boolean) => {
    //페이지네이션 숫자 버튼 만드는 jsx 반환
    return (
      <li className="page-item" key={number}>
        <button
          className={`page-link link-dark ${selected ? 'fw-bold' : ''}`}
          onClick={() => {
            setPage(number - 1);
            window.scrollTo({ top: 0 });
          }}
        >
          {number}
        </button>
      </li>
    );
  };

  const paginationManage = (page: any) => {
    //숫자가 예쁘게 1 2 3 4 5 이런 식으로 잘 나오도록 리스트 만들어서 버튼 집어넣는 함수

    const Page = page - (page % maxShowPage);
    //페이지네이션에서 실제로 보일 숫자들 중에 가장 작은 숫자
    //ex) < 1 2 3 4 5 > 이런 식으로 있으면 page는 0 1 2 3 4 중에 하나가 될 수 있지만, Page는 무조건 0.
    return new Array(maxShowPage).fill([]).map((_, i) => {
      if (Page + i > maxNumItems) return null;
      return pagigationButton(Page + (i + 1), page === Page + i); //버튼 만드는 부분
    });
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link link-dark"
            onClick={() => {
              prevPage();
              window.scrollTo({ top: 0 });
            }}
          >
            Prev
          </button>
        </li>
        {paginationManage(page)}
        <li className="page-item">
          <button
            className="page-link link-dark"
            onClick={() => {
              nextPage();
              window.scrollTo({ top: 0 });
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export const Card = (props: props) => {
  const [page, numShowItems] = [props.page, props.numShowItems];
  const navigate = useNavigate();

  const handleCard = (id: number) => {
    navigate(`/marketplace/NFTItem?nft_id=${id}`, { replace: false });
  };

  const handleMouse = (e: React.MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    const childImg = e.currentTarget.children.item(0) as Element;
    const childEffect = e.currentTarget.children.item(1) as Element;
    const childDesc = e.currentTarget.children.item(2) as Element;
    const childTitle = e.currentTarget.children.item(3) as Element;
    if (e.type === 'mouseover') {
      childImg.setAttribute(
        'style',
        'transition: width height;' +
          'transition-duration: 1.25s;' +
          'transition-timing-function: easy-in;' +
          'transform:scale(1.5,1.5);'
      );
      childEffect.setAttribute(
        'style',
        'transition-duration: 1.25s;' +
          'transition-timing-function: easy-in;' +
          'background-color: black;' +
          'top: 0%;' +
          'opacity: 0.8;'
      );
      childDesc.setAttribute(
        'style',
        'transition-duration: 0.5s;' + 'transition-timing-function: easy-in;' + 'opacity:0;'
      );
      childTitle.setAttribute('style', 'transition-delay: 0.5s;' + 'opacity:1;');
    } else {
      childImg.setAttribute(
        'style',
        'transition-property: width height;' +
          'transition-duration: 01.25s;' +
          'transition-timing-function: easy-in;' +
          'transform:scale(1,1);'
      );
      childEffect.setAttribute(
        'style',
        'transition-duration: 1.25s;' +
          'transition-timing-function: easy-in;' +
          'background-color:black;' +
          'opacity:0.8;' +
          'top: 80%;'
      );
      childDesc.setAttribute(
        'style',
        'transition-delay: 0.5s;' +
          'transition-duration: 0.8s;' +
          'transition-timing-function: easy-out;' +
          'opacity:1;'
      );
      childTitle.setAttribute('style', 'transition-delay: 0.3s;' + 'opacity:0;');
    }
  };

  const loadNFTInfo = (itemInfo: info): info => {
    //카드 안에 담길 정보 생성 함수
    return {
      id: itemInfo.id,
      link: `/NFTItem/?nft_id=${itemInfo.id}`,
      thumbnail: item_img1,
      title: itemInfo.title,
      makerThumbImg: itemInfo.makerThumbImg,
      price: itemInfo.price
    };
  };

  //카드 리스트
  let itemList = [];

  //loadItemList에서 쿼리스트링을 통한 통신으로 받으면 되지 않을까...?
  const loadItemList = async (category: string) => {
    return (
      await axios.get('/items', {
        params: {
          skip: 0,
          sortKey: 'ID',
          sortOrder: 'ASC',
          take: 100
        }
      })
    ).data.itemList.map((e) => {
      return cardItem(loadNFTInfo(e));
    });
  };

  useEffect(() => {
    try {
      const load = async () => {
        itemList = await loadItemList('ALL');
      };
      load();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const cardItem = (info: info) => {
    //Main에 올라갈 card item JSX 만드는 함수
    //borderTopRightRadius: 30, borderTopLeftRadius: 30
    //borderRadius: 30
    return (
      <div
        key={info.id}
        className="col"
        onClick={() => {
          handleCard(info.id);
        }}
        draggable="false"
      >
        <div
          className="card overflow-hidden text-white d-flex flex-column"
          onMouseOver={handleMouse}
          onMouseLeave={handleMouse}
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10
          }}
        >
          <img alt="" className="card-img" src={item_img1}></img>
          <div className="card-img-overlay" style={{ top: '80%', backgroundColor: 'black', opacity: 0.8 }}></div>
          <div className="card-img-overlay d-flex flex-column">
            <div className="card-text mt-auto d-flex justify-content-between px-2 py-2">
              <div>{`${info.title}`}</div>
              <img src={`${info.makerThumbImg}`} alt="profile" width="32" height="32" className="rounded-circle me-3" />
              <div>{`${info.price} KLAY`}</div>
            </div>
          </div>
          <div
            className="card-img-overlay d-flex justify-content-center align-items-center mx-auto my-auto"
            style={{ opacity: 0 }}
          >
            <h2>{info.title}</h2>
          </div>
        </div>
      </div>
    );
  };

  return itemList ? (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 align-items-around g-3">
        {itemList.slice(page * numShowItems, (page + 1) * numShowItems)}
      </div>
      <p />
      {Pagination(props)}
    </div>
  ) : null;
};
