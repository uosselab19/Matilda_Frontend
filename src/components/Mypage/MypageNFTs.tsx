//import { useState, useEffect } from "react";
import testImage1 from '../../assets/images/Mypage/testImage1.png';
import testImage2 from '../../assets/images/Mypage/testImage2.png';
import testImage3 from '../../assets/images/Mypage/testImage3.png';
import { useNavigate } from 'react-router-dom';

interface itemInfo {
  id: number
  title: string
  thumbImg: "*.png"
}

export const MypageNFTs = () => {
  const navigate = useNavigate();
  const cardList = () => {
    const handleCard = (index: number) => {
      navigate(`/mypage/NFTItem?nft_id=${index}`, { replace: false });
    };

    const handleMouse = (e: React.MouseEvent): void => {
      e.stopPropagation();
      e.preventDefault();
      if (e.type === 'mouseover') {
        e.currentTarget.setAttribute('style', 'opacity: 0.7');
      } else {
        e.currentTarget.setAttribute('style', 'opacity: 1');
      }
    }

    const loadItemInfo = (index: number) => {
      const img=(i:number)=>{
        if(i%3==0) return testImage1;
        else if(i%3==1) return testImage2;
        else if(i%3==2) return testImage3;
      }
      return {
        id: index,
        title: `NFT ${index}`,
        thumbImg: img(index)
      }
    }

    const cardItem = (index: number, info: itemInfo) => {
      return (
        <div className="col" key={index}>
          <div
            className="card text-white bg-dark rounded-0"
            onMouseOver={handleMouse}
            onMouseLeave={handleMouse}
            onClick={() => {
              handleCard(info.id);
            }}
          >
            <img src={info.thumbImg} className="card-img rounded-0" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">{info.title}</h5>
            </div>
          </div>
        </div>
      );
    };

    const cardItems = new Array(3 * 100).fill(0);
    return cardItems.map((_, i) => {
      return cardItem(i, loadItemInfo(i));
    });
  };

  return <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-0">{cardList()}</div>;
};
