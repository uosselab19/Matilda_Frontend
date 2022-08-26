import { useEffect, useState } from 'react';

import convertImage from '../../assets/images/Convert3D/convertImage.png';
import useCategory from '../../hooks/useCategory';
import ConvertBox from '../../components/forms/ConvertBox';
import Spinner from '../../components/load/Spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getUserInfo } from '../../configs/Cookie';

export const Convert3D = () => {
  const [category, setCategory] = useState({ catCode: '', image: convertImage, title: '' } as Category);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const cookieData = getUserInfo();
      if (!cookieData) {
        Swal.fire({
          icon: 'error',
          title: '누구세요...?',
          text: '유저정보가 없어서 홈페이지로 이동합니다.',
        });
        navigate('/');
      }
    })();
  }, []);

  //아코디언 항목 대응시켜주는 부분
  const categoryItems = useCategory().map((categoryElement: Category, index: Number) => {
    return (
      <button
        key={`category${index}`}
        type="button"
        className="btn btn-outline-secondary d-flex justify-content-center align-items-center"
        onClick={() => { setCategory(categoryElement); }}>
        {categoryElement.title}
      </button>
    );
  });
  categoryItems.shift();

  //컴포넌트 출력 결과
  return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <div className="row">
      <div className="d-flex justify-content-center align-items-center fw-bold fs-2 my-4">3D Conversion</div>
        <div className="col-lg-3">
          {/* 아코디언 들어갈 부분 */}
          <div className="btn-group-vertical w-75 h-100" role="group" id="btn-group">
            {categoryItems}
          </div>
        </div>

        {/* Convert 들어갈 부분 */}
        <div className="col-lg-9 d-flex flex-column">
          <span className="my-2 fs-4">
            {loading ? '변환 중입니다.' : '사진을 넣으면 3D 패션아이템으로 재탄생합니다!'}
          </span>
          <div className="h-100 d-flex justify-content-center align-items-center">
            {loading ? <Spinner delay={1.5} radius={1.5} /> : <ConvertBox category={category} setLoading={setLoading} />}
          </div>
        </div>
      </div>
    </main>
  );
};
