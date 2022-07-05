import { useState } from 'react';
import testImage1 from '../../assets/images/Register/testImageRegister1.png';
import testImage2 from '../../assets/images/Register/testImageRegister2.png';
import testImage3 from '../../assets/images/Register/testImageRegister3.png';
import TextBox from '../forms/TextBox';
import TextArea from '../forms/TextArea';
import SelectBox from '../forms/SelectBox';
import useForm from '../../hooks/useForm';

function validate(values) {
  let errors = {};
  const title=values.title;
  if (!title) {
    errors['title'] = 'title is required';
  } else if (title.length<2 || title.length>10) {
    errors['title'] = 'Email address is invalid';
  }

  return errors;
};

export const MintNFT = () => {
  //3D 아이템 넣어주는 부분
  const itemList: any[] = [];
  itemList.push({
    name: 'Name1',
    title: 'Mindul1',
    image: testImage1
  });
  itemList.push({
    name: 'Name2',
    title: 'Mindul2',
    image: testImage2
  });
  itemList.push({
    name: 'Name3',
    title: 'Mindul3',
    image: testImage3
  });

  const [itemValue, setItemValue] = useState(itemList[0].title);
  const callback=()=>{
    console.log(values)
    console.log(errors)
  };

  const { handleChange, handleSubmit, values, errors } = useForm(callback, validate);

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
            valueProperty="title"
          />
          {itemValue}
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
                value={values['title']}
                errors={errors['title']}
              />
              {/* 설명 */}
              <TextArea
                name="desc"
                id="desc"
                label="Description"
                rows={7}
                placeholder="description"
                //errors={errors.desc}
                disabled={false}
                readonly={false}
                handleChange={handleChange}
                value={values['desc']}
              />

              {/* 가격 */}
              <TextBox
                name="price"
                id="price"
                label="Price"
                type="text"
                placeholder="price"
                //errors={errors.price}
                disabled={false}
                readonly={false}
                handleChange={handleChange}
                value={values['price']}
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
