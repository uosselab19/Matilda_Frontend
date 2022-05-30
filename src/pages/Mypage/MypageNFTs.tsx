//import { useState, useEffect } from "react";
import testImage from './testImage1.png';
import { useNavigate } from 'react-router-dom';

export const MypageNFTs = () => {
  const navigate = useNavigate();
  const cardList = () => {
    const handleCard = (index: number) => {
      navigate(`/mypage/NFTItem?nft_id=${index}`, { replace: false });
    };

    const cardItem = (index: number) => {
      return (
        <div className="col" key={index}>
          <div
            className="card text-white bg-dark rounded-0"
            onClick={() => {
              handleCard(index);
            }}
          >
            <img src={testImage} className="card-img rounded-0" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">NFT {index}</h5>
            </div>
          </div>
        </div>
      );
    };

    return new Array(3 * 100).fill(0).map((_, i) => {
      return cardItem(i);
    });
  };

  return <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-0">{cardList()}</div>;
};
