import React from 'react';
import item_img1 from '../../assets/images/Explore/item_img.png';
import { Clothes } from '../../pages/Dressup';

interface props {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

export const Market = (props: props) => {
  //3D 아이템 넣어주는 부분
  const optionItemList = new Array();
  optionItemList.push('전체');
  optionItemList.push('한벌의상');
  optionItemList.push('상의');
  optionItemList.push('하의');
  optionItemList.push('양말');
  optionItemList.push('신발류');
  optionItemList.push('헤어');
  optionItemList.push('헤드웨어');
  optionItemList.push('안경');
  optionItemList.push('쥬얼리');
  optionItemList.push('액세서리');

  // 3D 아이템 목록이 들어가는 리스트 생성하는 부분
  const optionList = new Array();
  optionItemList.forEach((info, index) => {
    optionList.push(
      <option key={index} value={index}>
        {info}
      </option>
    );
  });

  const cardList = new Array();
  const searchCardList = () => {
    const cardItem = (e: number) => {
      return (
        <div className="col-4" key={e}>
          <div className="card">
            <img alt="" className="card-img" src={item_img1}></img>
          </div>
        </div>
      );
    };

    cardList.push(cardItem(0));
    cardList.push(cardItem(1));
    cardList.push(cardItem(2));
    cardList.push(cardItem(3));
    cardList.push(cardItem(4));
    cardList.push(cardItem(5));
    cardList.push(cardItem(6));
    cardList.push(cardItem(7));
    cardList.push(cardItem(8));
  };

  searchCardList();

  return (
    <div className="col-5 text-center">
      <form className="py-3">
        <div className="d-flex justify-content-between mx-auto">
          <select
            className="custom-select custom-select-lg col-3"
            defaultValue={0}
            onChange={(e) => {
              //setItemIndex(Number(e.target.value));
            }}
          >
            {optionList}
          </select>
          <input className="col-7" type="search" placeholder="Search" aria-label="Search" />
          <button
            className="btn btn-outline-success col-2"
            type="submit"
            onClick={() => {
              alert('아직은 검색 기능이 없어요!');
            }}
          >
            {' '}
            Search{' '}
          </button>
        </div>
      </form>
      <div className="row g-2">{cardList}</div>
    </div>
  );
};
