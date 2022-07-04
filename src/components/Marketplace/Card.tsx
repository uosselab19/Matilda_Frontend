import item_img1 from '../../assets/images/Explore/item_img.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { Pagination } from './Pagination';

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
  const itemList = [];

  //loadItemList에서 쿼리스트링을 통한 통신으로 받으면 되지 않을까...?
  const loadItemList = async (itemList:Array<JSX.Element>) => {
    return (
      await axios.get('/items', {
        params: {
          skip: 0,
          sortKey: 'ID',
          sortOrder: 'ASC',
          take: 100
        }
      })
    ).data.itemList.forEach((e) => {
      itemList.push(cardItem(loadNFTInfo(e)));
    });
  };

  useEffect(() => {
    try {
      const load = async () => {
        loadItemList(itemList);
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
