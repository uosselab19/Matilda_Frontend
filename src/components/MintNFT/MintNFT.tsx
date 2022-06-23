import { ChangeEvent, useState } from 'react';
import testImage1 from '../../assets/images/Register/testImageRegister1.png';
import testImage2 from '../../assets/images/Register/testImageRegister2.png';
import testImage3 from '../../assets/images/Register/testImageRegister3.png';

interface NFTInfo {
  title: string;
  image: '*.png';
}
export const MintNFT = () => {
  //item 변수에는 선택한 NFT 아이템이 들어가있을 예정
  //null 값 들어가는 경우를 고려하기
  const [itemIndex, setItemIndex] = useState(0);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(141.141);

  //3D 아이템 넣어주는 부분
  const itemList = new Array();
  itemList.push({
    title: 'Mindul1',
    image: testImage1
  });
  itemList.push({
    title: 'Mindul2',
    image: testImage2
  });
  itemList.push({
    title: 'Mindul3',
    image: testImage3
  });

  // 3D 아이템 목록이 들어가는 리스트 생성하는 부분
  const optionList = new Array();
  itemList.forEach((info, index) => {
    optionList.push(
      <option key={index} value={index}>
        {info.title}
      </option>
    );
  });

  const NFTInfo = (item: NFTInfo) => {
    // NFT에 대한 정보 나열하는 JSX
    return (
      <div className="d-flex justify-content-center mx-auto">
        <img alt="" src={item.image} width="512" height="512" />
      </div>
    );
  };

  const fetchMint = () => {
    alert(`NFT로 바꿀 3D Object 이름: ${itemList[itemIndex].title}\ntitle: ${title}, desc: ${desc}, price: ${price}`);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  return (
    <main className="container">
      <div className="row w-100 mt-5 d-flex justify-content-between">
        <div className="col-6 row d-flex justify-content-center">
          <label className="col-9">NFT로 변환할 3D 오브젝트를 골라주세요!</label>
          <select
            className="custom-select custom-select-lg mb-3 col-9"
            defaultValue={itemIndex}
            onChange={(e) => {
              setItemIndex(Number(e.target.value));
            }}
          >
            {optionList}
          </select>

          {NFTInfo(itemList[itemIndex])}
        </div>
        <div className="col-6">
          <h2>Mint an NFT</h2>
          <p>
            NFT로 바꿔주는 부분입니다!
            <br />
            NFT로 바꿔주는 부분입니다!
          </p>
          <form id="signupForm" className="needs-validation" noValidate>
            <div className="row g-3">
              {/* 타이틀 */}
              <div className="col-12">
                <label htmlFor="id" className="form-label">
                  Title
                </label>
                <input
                  className="form-control border-dark"
                  id="id"
                  placeholder={itemList[itemIndex].title}
                  type="id"
                  onChange={handleTitle}
                  required
                />
                <div className="invalid-feedback">Please enter a valid Title</div>
              </div>

              {/* 설명 */}
              <div className="col-12">
                <label htmlFor="text" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control border-dark "
                  id="text"
                  rows={7}
                  onChange={handleDesc}
                  style={{ resize: 'none' }}
                />
              </div>

              {/* 가격 */}
              <div className="col-12">
                <label htmlFor="nickname" className="form-label">
                  Price
                </label>
                <div className="input-group has-validation">
                  <input
                    className="form-control border-dark"
                    id="nickname"
                    placeholder="10.597"
                    pattern="[*0-9].[*0-9]"
                    onChange={handlePrice}
                    required
                  />
                  <span className="input-group-text border-dark">Klay</span>
                </div>
              </div>
            </div>

            <p />

            <button className="w-100 btn btn-primary btn-lg bg-dark" type="submit" onClick={fetchMint}>
              Mint NFT
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
