import { useState } from 'react';
import { convertFunction } from '../../hooks/ConvertFunction';

import convertImage from '../../assets/images/Convert3D/convertImage.png';
import useCategory from '../../hooks/useCategory';

interface categoryItem {
  catCode: string;
  image: '*.png';
  title: string;
}

export const Convert3D = () => {
  const [clothes, setClothes] = useState({ catCode: '', image: convertImage, title: '' });

  //프리뷰 보여주는 함수
  const setPreview = (input: File) => {
    if (clothes.title.length==0) return alert('왼쪽 카테고리에서 종류를 선택해주세요!');
    if (!input) return; // 도중에 취소하면 아무것도 없음
    console.log(input);
    return convertFunction(input);
  };

  //드래그 & 드랍시 사용되는 핸들러 함수들
  const handleDrag = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === 'dragover') e.currentTarget.setAttribute('style', 'opacity: 0.5;');
    else e.currentTarget.setAttribute('style', 'opacity: 1;');
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDrag(e); //드래그 할 때 화면 투명도 바꾸는 거 한 번 더 적용시키기 위함.
    setPreview(e.dataTransfer.files[0]);
  };

  //그냥 클릭하고 사진 고르는 식일 때 사용되는 핸들러 함수
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files as FileList;
    const file = fileList.item(0) as File;
    setPreview(file);
  };

  //카테고리에 쓰일 아코디언
  const accordionItems = (category: categoryItem, index: Number) => {
    return (
      <div
        key={`key${index}`}
        className="btn btn-outline-secondary"
        onClick={() => {
          setClothes(category);
        }}
      >
        {category.title}
      </div>
    );
  };

  //아코디언 항목 대응시켜주는 부분
  const listAccordionItems = () => {
    const category=useCategory();
    const result=category.map((e: categoryItem, i: Number)=>{
      return accordionItems(e, i);
    });
    return result;
  };

  //컴포넌트 출력 결과
  return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <div className="row my-3">
        <div className="col-lg-3">
          {/* 아코디언 들어갈 부분 */}
          <div className="btn-group-vertical my-5 w-75" id="btn-group">
            {listAccordionItems()}
          </div>
        </div>

        {/* Convert 들어갈 부분 */}
        <div className="col-lg-9">
          <p className="mt-5 fs-4">사진을 넣으면 3D 패션아이템으로 재탄생합니다!</p>
          <div className="image-container">
            <label htmlFor="file-input">
              <div className="card text-white border-light">
                <img
                  id="preview-image"
                  width="100%"
                  height="100%"
                  alt=""
                  title="여기 맞아요, 사진을 넣어 주세요!"
                  src={clothes.image}
                  onDrop={handleDrop}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  draggable="false"
                />
                <div className="card-img-overlay h-75 d-flex flex-column justify-content-end">
                  <h5 className="card-title text-dark fs-2 fw-bold">{clothes.title}</h5>
                  <p className="card-text text-dark">여기에 사진을 넣어 주세요!</p>
                </div>
              </div>

              <input id="file-input" type="file" style={{ display: 'none' }} accept="image/*" onChange={handleInput} />
              {/* gif는 들어가면 안 됨 */}
            </label>
          </div>
        </div>
      </div>
    </main>
  );
};
