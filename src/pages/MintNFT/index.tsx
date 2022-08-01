import { useState } from 'react';
import TextBox from '../../components/forms/TextBox';
import TextArea from '../../components/forms/TextArea';
import useForm from '../../hooks/useForm';
import testImage from '../../assets/images/NFTItem/mindul_NFT1.jpg';
import { Item, UpdateItem } from '../../types/Item';
import { isRequired, notMaxLength, notMinLength, isNumber } from '../../utils/validator';
import { selectItemwithMember } from '../../services/itemService';
import CardList from '../../components/Items/CardList';
import Pagination from '../../components/Items/Pagination';
import usePagination from '../../hooks/useItems';

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

export const MintNFT = () => {
  const callback = (values: UpdateItem) => {
    const { title, description, price } = values;
    if (title && description && price) {
      console.log(values);
    } else alert('빈칸을 모두 다 채워주세요!');
  };

  //3D 아이템 넣어주는 부분
  const [itemImage, setItemImage] = useState('');
  const { items, page, setPage } = usePagination(selectItemwithMember(2, { stateCode: 'CR' }));
  const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);

  const handleCard = (itemNum: number) => {
    const imgUrl = items.find((e: Item) => {
      return e.itemNum == itemNum;
    }) as Item;
    setItemImage(imgUrl.imgUrl);
  };

  return (
    <main className="container">
      <div className="d-flex justify-content-center align-items-center fw-bold fs-2 my-4">Marketplace</div>
      <div className="row g-3 w-100 d-flex justify-content-between">
        <div className="col-6 d-flex justify-content-center flex-column">
          <img className="mb-3 align-self-center" src={testImage} style={{ width: 350, height: 350 }} />
          <CardList page={page} items={items} numShowItems={3} size={'md'} handleCard={handleCard} />
          <Pagination page={page} setPage={setPage} numItems={items.length} numShowItems={3} numShowPages={5} />
        </div>
        <div className="col-6">
          <p>
            당신이 가지고 있던 3D 패션아이템을 NFT로 만들어주는 페이지입니다!
            <br />
            먼저, 왼쪽에서 NFT로 만들고 싶은 3D 패션아이템을 선택해주세요.
            <br />
            오른쪽에 필요한 내용을 모두 기입하고 Mint NFT 버튼을 눌러주세요. <br />
            그러면 3D 패션아이템이 NFT가 될 거에요!
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
                disabled={!itemImage.length}
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
                disabled={!itemImage.length}
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
                placeholder="10.597"
                disabled={!itemImage.length}
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
