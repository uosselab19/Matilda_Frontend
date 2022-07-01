import { useState } from 'react';
import { convertFunction } from './ConvertFunction';

import convertImage from '../../assets/images/Convert3D/convertImage.png';
import imageDR from '../../assets/images/Convert3D/imageDR.png';
import imageTOP from '../../assets/images/Convert3D/imageTOP.png';
import imageOTR from '../../assets/images/Convert3D/imageOTR.png';
import imageBTM from '../../assets/images/Convert3D/imageBTM.png';
import imageSOX from '../../assets/images/Convert3D/imageSOX.png';
import imageSH from '../../assets/images/Convert3D/imageSH.png';
import imageHAI from '../../assets/images/Convert3D/imageHAIR.png';
import imageHEA from '../../assets/images/Convert3D/imageHEADWEAR.png';
import imageGLA from '../../assets/images/Convert3D/imageGLASSES.png';
import imageBRA from '../../assets/images/Convert3D/imageBRACELET.png';
import imageNEC from '../../assets/images/Convert3D/imageNECKLACE.png';
import imageEAR from '../../assets/images/Convert3D/imageEARRING.png';
import imageBAG from '../../assets/images/Convert3D/imageBAG.png';
import imageMAS from '../../assets/images/Convert3D/imageMASK.png';
import imageWIN from '../../assets/images/Convert3D/imageWING.png';
import imageNAI from '../../assets/images/Convert3D/imageNAIL.png';
import imageGLO from '../../assets/images/Convert3D/imageGLOVE.png';

interface categoryItem {
  catCode: string;
  image: '*.png';
  title: string;
}

const initClothes = { catCode: '', image: convertImage, title: '' };

export const Convert3D = () => {
  const [clothes, setClothes] = useState(initClothes);

  //프리뷰 보여주는 함수
  const setPreview = (input: File): File | void => {
    if (clothes == initClothes) return alert('왼쪽 카테고리에서 종류를 선택해주세요!');
    if (!input) return; // 도중에 취소하면 아무것도 없음
    console.log(input);
    return convertFunction(input);
  };

  //드래그 & 드랍시 사용되는 핸들러 함수들
  const handleDrag = (e: React.DragEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === 'dragover') e.currentTarget.setAttribute('style', 'opacity: 0.5;');
    else e.currentTarget.setAttribute('style', 'opacity: 1;');
  };

  const handleDrop = (e: React.DragEvent): void => {
    handleDrag(e); //드래그 할 때 화면 투명도 바꾸는 거 한 번 더 적용시키기 위함.
    setPreview(e.dataTransfer.files[0]);
  };

  //그냥 클릭하고 사진 고르는 식일 때 사용되는 핸들러 함수
  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const fileList = e.currentTarget.files as FileList;
    const file = fileList.item(0) as File;
    setPreview(file);
  };

  //카테고리에 쓰일 아코디언
  const accordionItems = (index: Number, category: categoryItem): JSX.Element => {
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
    const result: Array<JSX.Element> = new Array();
    result.push(accordionItems(1, { catCode: 'DR', image: imageDR, title: '한 벌 의상' }));
    result.push(accordionItems(2, { catCode: 'TOP', image: imageTOP, title: '상의' }));
    result.push(accordionItems(3, { catCode: 'OTR', image: imageOTR, title: '아우터' }));
    result.push(accordionItems(4, { catCode: 'BTM', image: imageBTM, title: '하의' }));
    result.push(accordionItems(5, { catCode: 'SOX', image: imageSOX, title: '양말' }));
    result.push(accordionItems(6, { catCode: 'SH', image: imageSH, title: '신발류' }));
    result.push(accordionItems(7, { catCode: 'HAI', image: imageHAI, title: '헤어' }));
    result.push(accordionItems(8, { catCode: 'HEA', image: imageHEA, title: '헤드웨어' }));
    result.push(accordionItems(9, { catCode: 'GLA', image: imageGLA, title: '안경' }));
    result.push(accordionItems(10, { catCode: 'BRA', image: imageBRA, title: '팔찌' }));
    result.push(accordionItems(11, { catCode: 'NEC', image: imageNEC, title: '목걸이' }));
    result.push(accordionItems(12, { catCode: 'EAR', image: imageEAR, title: '귀걸이' }));
    result.push(accordionItems(13, { catCode: 'BAG', image: imageBAG, title: '가방' }));
    result.push(accordionItems(14, { catCode: 'MAS', image: imageMAS, title: '마스크' }));
    result.push(accordionItems(15, { catCode: 'WIN', image: imageWIN, title: '날개' }));
    result.push(accordionItems(16, { catCode: 'NAI', image: imageNAI, title: '네일아트' }));
    result.push(accordionItems(17, { catCode: 'GLO', image: imageGLO, title: '장갑' }));
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
