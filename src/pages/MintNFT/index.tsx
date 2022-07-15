import { useState } from 'react';
import testImage1 from '../../assets/images/Register/testImageRegister1.png';
import testImage2 from '../../assets/images/Register/testImageRegister2.png';
import testImage3 from '../../assets/images/Register/testImageRegister3.png';
import TextBox from '../../components/forms/TextBox';
import TextArea from '../../components/forms/TextArea';
import SelectBox from '../../components/forms/SelectBox';
import useForm from '../../hooks/useForm';
import { UpdateItem } from '../../types/Item';
import { isRequired, notMaxLength, notMinLength, isNumber } from '../../utils/validator';

function validate(values: UpdateItem) {
  const errors = {
    title:
      isRequired(values?.title) ||
      notMinLength(values?.title, 2, '타이틀을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.title, 10, '타이틀을 10글자 이하로 입력해 주세요.'),
    description:
      isRequired(values?.description) ||
      notMinLength(values?.description, 2, '설명을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.description, 10, '설명을 10글자 이하로 입력해 주세요.'),
    price: isRequired(values?.price) || isNumber(values?.price)
  };

  return errors;
}

const callback = () => {
  console.log('asdf');
};

export const MintNFT = () => {
  //3D 아이템 넣어주는 부분
  const itemList = [{title: 'Mindul1', imgUrl: testImage1}, {title: 'Mindul2', imgUrl: testImage2}, {title: 'Mindul3', imgUrl: testImage3}];

  const [itemImage, setItemImage] = useState(itemList[0].imgUrl);

  const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);

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
            handleChange={(e) => setItemImage(e.target.value)}
            value={itemImage}
            keyProperty="title"
            valueProperty="imgUrl"
          />
          <img src={itemImage} />
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
                name="title"
                id="title"
                label="Title"
                type="text"
                placeholder="title"
                disabled={false}
                readonly={false}
                handleChange={handleChange}
                handleClick={handleClick}
                value={values['title']}
                error={errors['title']}
              />
              {/* 설명 */}
              <TextArea
                name="description"
                id="description"
                label="Description"
                rows={7}
                placeholder="description"
                disabled={false}
                readonly={false}
                handleChange={handleChange}
                handleClick={handleClick}
                value={values['description']}
                error={errors['description']}
              />

              {/* 가격 */}
              <TextBox
                name="price"
                id="price"
                label="Price"
                type="text"
                placeholder="price"
                disabled={false}
                readonly={false}
                handleChange={handleChange}
                handleClick={handleClick}
                value={values['price']}
                error={errors['price']}
              />
            </div>
            <button className="w-100 btn btn-primary btn-lg bg-dark" type="submit" onClick={handleSubmit}>
              Mint NFT
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
