//import { useState, useEffect } from "react";
import testImage from "./testImage1.png"

export const MypageNFTs = () => {
  const cardList = () => {
    const cardItem = (index: number) => {
      return (
        <div className="col">
          <div key={index} className="card text-white bg-dark rounded-0">
            <img src={testImage} className="card-img rounded-0" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">NFT {index}</h5>
            </div>
          </div>
        </div>
      );
    }

    return new Array(3 * 100).fill(0).map((_, i) => { return cardItem(i); })
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-0">
      {cardList()}
    </div>
  );
}