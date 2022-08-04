import { useEffect, useState } from 'react';

import convertImage from '../../assets/images/Convert3D/convertImage.png';
import useCategory from '../../hooks/useCategory';
import ConvertBox from '../../components/forms/ConvertBox';
import Spinner from '../../components/load/Spinner';
import { useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

interface categoryItem {
  catCode: string;
  image: '*.png';
  title: string;
}

export const Convert3D = () => {
  const [clothes, setClothes] = useState({ catCode: '', image: convertImage, title: '' });
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const { getCookie } = useCookie();

  useEffect(() => {
    (async () => {
      const cookieData = getCookie();
      if (!cookieData) {
        alert('유저정보가 없어서 홈페이지로 이동합니다.');
        navigate('/');
      }
    })();
  }, []);

  //아코디언 항목 대응시켜주는 부분
  const categoryItems = useCategory().map((categoryElement: categoryItem, index: Number) => {
    return (
      <div
        key={`category${index}`}
        className="btn btn-outline-secondary"
        onClick={() => { setClothes(categoryElement); }}
      >{categoryElement.title}
      </div>
    );
  });
  categoryItems.shift();

  //컴포넌트 출력 결과
  return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <div className="row my-3">
        <div className="col-lg-3">
          {/* 아코디언 들어갈 부분 */}
          <div className="btn-group-vertical my-5 w-75 h-100" id="btn-group">
            {categoryItems}
          </div>
        </div>

        {/* Convert 들어갈 부분 */}
        <div className="col-lg-9 d-flex flex-column">
          <p className="mt-5 fs-4">
            {loading ? '변환 중입니다, 시간이 1분 이상 걸릴 수 있습니다.' : '사진을 넣으면 3D 패션아이템으로 재탄생합니다!'}
          </p>
          <div className="h-100 d-flex justify-content-center align-items-center">
            {loading ? <Spinner delay={1.5} radius={1.5} /> : <ConvertBox clothes={clothes} setLoading={setLoading} />}
          </div>
        </div>
      </div>
    </main>
  );
};
