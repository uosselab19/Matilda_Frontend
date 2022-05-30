import { useState } from 'react';
import { convertFunction } from './ConvertFunction';

import convertImage from '../../assets/images/Convert3D/convertImage.png';
import imageDR from '../../assets/images/Convert3D/imageDR.png';
import imageTOP from '../../assets/images/Convert3D/imageTOP.png';
import imageOTR from '../../assets/images/Convert3D/imageOTR.png';
import imageBTM from '../../assets/images/Convert3D/imageBTM.png';
import imageSOX from '../../assets/images/Convert3D/imageSOX.png';
import imageSH from '../../assets/images/Convert3D/imageSH.png';
import imageHAIR from '../../assets/images/Convert3D/imageHAIR.png';
import imageHEADWEAR from '../../assets/images/Convert3D/imageHEADWEAR.png';
import imageGLASSES from '../../assets/images/Convert3D/imageGLASSES.png';
import imageBRACELET from '../../assets/images/Convert3D/imageBRACELET.png';
import imageNECKLACE from '../../assets/images/Convert3D/imageNECKLACE.png';
import imageEARRING from '../../assets/images/Convert3D/imageEARRING.png';
import imageBAG from '../../assets/images/Convert3D/imageBAG.png';
import imageMASK from '../../assets/images/Convert3D/imageMASK.png';
import imageWING from '../../assets/images/Convert3D/imageWING.png';
import imageNAIL from '../../assets/images/Convert3D/imageNAIL.png';
import imageGLOVE from '../../assets/images/Convert3D/imageGLOVE.png';

interface categoryItem {
  id: string;
  type: string;
  name: string;
  image: '*.png';
}

export const Convert3D = () => {
  const [clothes, setClothes] = useState(convertImage);
  const [desc, setDesc] = useState(String);

  //프리뷰 보여주는 함수
  const setPreview = (input: File): File | void => {
    if (desc == '') return alert('왼쪽 카테고리에서 종류를 선택해주세요!');
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

  const handleAccordionItem = (e: categoryItem) => {
    setClothes(e.image);
    setDesc(e.name);
  };

  //카테고리에 쓰일 아코디언
  const accordionItems = (
    index: Number,
    firstCategoryName: string,
    subCategoryNameList: Array<categoryItem>
  ): JSX.Element => {
    //소항목에 들어갈 항목 집어넣어주는 함수
    const accordionItemLink = (subList: Array<categoryItem>): JSX.Element => {
      const linkList = [...subList].map((e, i) => {
        return (
          <li key={i} className="list-group-item">
            <button
              className="btn link-dark text-decoration-none"
              onClick={() => {
                handleAccordionItem(e);
              }}
            >
              {e.name}
            </button>
          </li>
        );
      });

      return <ul className="list-group">{linkList}</ul>;
    };
    subCategoryNameList;

    //실제 카테고리 부분
    return (
      <div key={`key${index}`} className="accordion-item">
        {/* 전제항목 분류 부분 */}
        <h2 className="accordion-header" id={`heading${index}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${index}`}
            aria-expanded="false"
            aria-controls={`collapse${index}`}
          >
            <span className="fw-bold">{firstCategoryName}</span>
          </button>
        </h2>

        {/* 소항목 분류 부분 */}
        <div
          id={`collapse${index}`}
          className="accordion-collapse collapse"
          aria-labelledby={`collapse${index}`}
          data-bs-parent="#accordionCategory"
        >
          <div className="accordion-body">{accordionItemLink(subCategoryNameList)}</div>
        </div>
      </div>
    );
  };

  //아코디언 항목 대응시켜주는 부분
  const listAccordionItems = () => {
    const result: Array<JSX.Element> = new Array();
    result.push(
      accordionItems(1, '한 벌 의상(DR)', [
        { id: 'minidress', type: 'DR', name: '미니 드레스', image: imageDR },
        { id: 'longdress', type: 'DR', name: '롱 드레스', image: imageDR },
        { id: 'casual', type: 'DR', name: '캐쥬얼', image: imageDR },
        { id: 'suit', type: 'DR', name: '정장', image: imageDR }
      ])
    );
    result.push(
      accordionItems(2, '상의(TOP)', [
        { id: 'T-shirt', type: 'TOP', name: '티셔츠', image: imageTOP },
        { id: 'shirt', type: 'TOP', name: '셔츠', image: imageTOP },
        { id: 'hoodie', type: 'TOP', name: '후드티', image: imageTOP },
        { id: 'croptop', type: 'TOP', name: '크롭티', image: imageTOP }
      ])
    );
    result.push(
      accordionItems(3, '아우터(OTR)', [
        { id: 'short jacket', type: 'OTR', name: '숏', image: imageOTR },
        { id: 'medium jacket', type: 'OTR', name: '미디움', image: imageOTR },
        { id: 'long jacket', type: 'OTR', name: '롱', image: imageOTR }
      ])
    );
    result.push(
      accordionItems(4, '하의(BTM)', [
        { id: 'short pants', type: 'BTM', name: '숏', image: imageBTM },
        { id: 'medium pants', type: 'BTM', name: '미디움', image: imageBTM },
        { id: 'long pants', type: 'BTM', name: '롱', image: imageBTM }
      ])
    );
    result.push(
      accordionItems(5, '양말(SOX)', [
        { id: 'ankle', type: 'SOX', name: '발목', image: imageSOX },
        { id: 'basic', type: 'SOX', name: '기본', image: imageSOX },
        { id: 'knee', type: 'SOX', name: '무릎', image: imageSOX },
        { id: 'muruff-we', type: 'SOX', name: '무릎 위', image: imageSOX },
        { id: 'herlee', type: 'SOX', name: '허리', image: imageSOX }
      ])
    );
    result.push(
      accordionItems(6, '신발류(SH)', [
        { id: 'shoe', type: 'SH', name: '구두', image: imageSH },
        { id: 'sneakers', type: 'SH', name: '스니커즈', image: imageSH },
        { id: 'sandle', type: 'SH', name: '샌들', image: imageSH },
        { id: 'boots', type: 'SH', name: '부츠', image: imageSH }
      ])
    );
    result.push(
      accordionItems(7, '헤어(HAIR)', [
        { id: 'tovan', type: 'HAIR', name: '위', image: imageHAIR },
        { id: 'short', type: 'HAIR', name: '숏', image: imageHAIR },
        { id: 'medium', type: 'HAIR', name: '미디움', image: imageHAIR },
        { id: 'long', type: 'HAIR', name: '롱', image: imageHAIR },
        { id: 'tied', type: 'HAIR', name: '묶음', image: imageHAIR },
        { id: 'accesary-hair', type: 'HAIR', name: '장식헤어', image: imageHAIR }
      ])
    );
    result.push(
      accordionItems(8, '헤드웨어(HEADWEAR)', [
        { id: 'tal', type: 'HEADWEAR', name: '탈', image: imageHEADWEAR },
        { id: 'accesary-headwear', type: 'HEADWEAR', name: '액세서리', image: imageHEADWEAR },
        { id: 'hat', type: 'HEADWEAR', name: '모자', image: imageHEADWEAR }
      ])
    );
    result.push(
      accordionItems(9, '안경(GLASSES)', [
        { id: 'fashionglasses', type: 'GLASSES', name: '패션', image: imageGLASSES },
        { id: 'sunglasses', type: 'GLASSES', name: '선글라스', image: imageGLASSES }
      ])
    );
    result.push(
      accordionItems(10, '쥬얼리', [
        { id: 'bracelet', type: 'BRACELET', name: '팔찌(BRACELET)', image: imageBRACELET },
        { id: 'necklace', type: 'NECKLACE', name: '목걸이(NECKLACE)', image: imageNECKLACE },
        { id: 'earring', type: 'EARRING', name: '귀걸이(EARRING)', image: imageEARRING }
      ])
    );
    result.push(
      accordionItems(11, '액세서리', [
        { id: 'bag', type: 'BAG', name: '가방(BAG)', image: imageBAG },
        { id: 'mask', type: 'MASK', name: '마스크(MASK)', image: imageMASK },
        { id: 'wing', type: 'WING', name: '날개(WING)', image: imageWING },
        { id: 'nail', type: 'NAIL', name: '네일아트(NAIL)', image: imageNAIL },
        { id: 'glove', type: 'GLOVE', name: '장갑(GLOVE)', image: imageGLOVE }
      ])
    );
    return result;
  };

  //컴포넌트 출력 결과
  return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <div className="row my-3">
        <div className="col-lg-3">
          {/* 아코디언 들어갈 부분 */}
          <div className="accordion my-5" id="accordionCategory">
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
                  src={clothes}
                  onDrop={handleDrop}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  draggable="false"
                />
                <div className="card-img-overlay h-75 d-flex flex-column justify-content-end">
                  <h5 className="card-title text-dark fs-2 fw-bold">{desc}</h5>
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
