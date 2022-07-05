import { useState } from 'react';
import testImage1 from '../../assets/images/Register/testImageRegister1.png';
import testImage2 from '../../assets/images/Register/testImageRegister2.png';
import testImage3 from '../../assets/images/Register/testImageRegister3.png';
import TextBox from '../forms/TextBox';
import TextArea from '../forms/TextArea';
import SelectBox from '../forms/SelectBox';

/* interface NFTInfo {
  title: string;
  image: '*.png';
} */

export const MintNFT = () => {
  //item 변수에는 선택한 NFT 아이템이 들어가있을 예정
  //null 값 들어가는 경우를 고려하기
  

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(10.597);

  //3D 아이템 넣어주는 부분
  const itemList = new Array();
  itemList.push({
    name: "Name1",
    title: 'Mindul1',
    image: testImage1
  });
  itemList.push({
    name: "Name2",
    title: 'Mindul2',
    image: testImage2
  });
  itemList.push({
    name: "Name3",
    title: 'Mindul3',
    image: testImage3
  });
  const [itemValue, setItemValue] = useState(itemList[0].title);

  /* const NFTInfo = (item: NFTInfo) => {
    // NFT에 대한 정보 나열하는 JSX
    return (
      <div className="d-flex justify-content-center mx-auto">
        <img className="w-100" alt="" src={item.image} />
      </div>
    );
  }; */

  const fetchMint = () => {
    alert(`NFT로 바꿀 3D Object 이름: ${itemValue}\ntitle: ${title}, desc: ${desc}, price: ${price}`);
  };

  return (
    <main className="container">
      <div className="row g-3 w-100 mt-5 d-flex justify-content-between">
        <div className="col-6 row d-flex justify-content-center">
          <SelectBox
	          id="test"
	          label="NFT로 변환할 3D 오브젝트를 골라주세요!"
	          placeholder=""
	          helpText="Please enter a valid TEST"
	          disabled={false}
	          options={itemList}
            handleChange={(e) => setItemValue(e.target.value)}
            value={itemValue}
            keyProperty="name"
            valueProperty="title"/>
            { itemValue }
        </div>
        <div className="col-6">
          <h2>Mint an NFT</h2>
          <p>
            NFT로 바꿔주는 부분입니다!
            <br />
            NFT로 바꿔주는 부분입니다!
          </p>
          <form id="signupForm" className="needs-validation" noValidate>
            <div className="row g-3 mb-4">
              {/* 타이틀 */}
              <TextBox
                id="title"
                label="Title"
                type="text"
                placeholder="title"
                helpText="Please enter a valid Title"
                disabled={false}
                readonly={false}
                handleChange={(e) => setTitle(e.target.value)}
                value={title}
              />

              {/* 설명 */}
              <TextArea
                id="desc"
                label="Description"
                rows={7}
                placeholder="description"
                helpText="Please enter a valid Description"
                disabled={false}
                readonly={false}
                handleChange={(e) => setDesc(e.target.value)}
                value={desc}
              />

              {/* 가격 */}
              <TextBox
                id="price"
                label="Price"
                type="text"
                placeholder="price"
                helpText="Please enter a valid Title"
                disabled={false}
                readonly={false}
                handleChange={(e) => setPrice(Number(e.target.value))}
                value={price}
              />
            </div>

            <button className="w-100 btn btn-primary btn-lg bg-dark" type="submit" onClick={fetchMint}>
              Mint NFT
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
