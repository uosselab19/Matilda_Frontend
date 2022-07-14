import item_img1 from '../../assets/images/Explore/item_img.png';
import { useNavigate } from 'react-router-dom';
import makerThumbImg1 from '../../assets/images/Profile/thumbProfileImage.png'

//컴포넌트가 받을 props
interface CardProps {
  itemNum:number;
  title:string;
  price:number;
  size: string;
}

export default function Card (props: CardProps) {
  const { itemNum, title, price, size } = props;
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
        'transition: width height;' + 'transition-duration: 1.25s;' + 'transition-timing-function: easy-in;' + 'transform:scale(1.5,1.5);'
      );
      childEffect.setAttribute(
        'style',
        'transition-duration: 1.25s;' + 'transition-timing-function: easy-in;' + 'background-color: black;' + 'top: 0%;' + 'opacity: 0.8;'
      );
      childDesc.setAttribute('style', 'transition-duration: 0.5s;' + 'transition-timing-function: easy-in;' + 'opacity:0;');
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
        'transition-duration: 1.25s;' + 'transition-timing-function: easy-in;' + 'background-color:black;' + 'opacity:0.8;' + 'top: 70%;'
      );
      childDesc.setAttribute(
        'style',
        'transition-delay: 0.5s;' + 'transition-duration: 0.8s;' + 'transition-timing-function: easy-out;' + 'opacity:1;'
      );
      childTitle.setAttribute('style', 'transition-delay: 0.3s;' + 'opacity:0;');
    }
  };

  return (
    <div
      key={itemNum}
      className={`${size}`}
      onClick={() => {
        handleCard(itemNum);
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
        <div className="card-img-overlay" style={{ top: '70%', backgroundColor: 'black', opacity: 0.8 }}></div>
        <div className="card-img-overlay d-flex flex-column">
          <div className={`card-text mt-auto d-flex justify-content-between px-2 ${(size=='lg')?"py-2":""}`}>
            {(size=="lg")?<img src={makerThumbImg1} alt="profile" width="32" height="32" className="rounded-circle me-3" />:null}
            <div>{`${title.slice(0,8)}${(title.length>8)?"...":''}`}</div>
            {(size=="lg")?<div>{`${price} KLAY`}</div>:null}
          </div>
        </div>
        <div className="card-img-overlay d-flex justify-content-center align-items-center mx-auto my-auto" style={{ opacity: 0 }}>
          <h2>{`${title.slice(0,(1+Number(size=="lg"))*15)}${(title.length>(1+Number(size=="lg"))*15)?"...":''}`}</h2>
        </div>
      </div>
    </div>
  );
};
