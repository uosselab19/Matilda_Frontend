import { useEffect, useState } from 'react';
import convertImage from '../../assets/images/Convert3D/convertImage.png';
import useCategory from '../../hooks/useCategory';
import ConvertBox from '../../components/forms/ConvertBox';
import Spinner from '../../components/load/Spinner';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/cookieUtil';
import { alertError } from '../../utils/alertUtil';

export const Convert3D = () => {
  const [category, setCategory] = useState({ catCode: '', image: convertImage, title: '' } as Category);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const cookieData = getUserInfo();
      if (!cookieData) {
        alertError('누구세요...?', '로그인이 필요한 페이지입니다. 유저정보가 없어서 홈페이지로 이동합니다.');
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
        className="btn btn-boundary-white fs-5 fw-bold d-flex justify-content-center align-items-center"
        onClick={() => {
          setCategory(categoryElement);
        }}
      >
        {categoryElement.title}
      </button>
    );
  });
  categoryItems.shift();

  //컴포넌트 출력 결과
  return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <div className="align-items-center fw-bold fs-2 my-4">3D Conversion</div>

      <div className="row g-0">
        <div className="col-lg-4">
          <div className="card w-75 h-100 border-secondary">
            <div className="card-header fs-4 fw-bold text-bg-secondary">카테고리</div>
            <div className="card-list btn-group-vertical h-100" role="group" id="btn-group">
              {categoryItems}
            </div>
          </div>
        </div>

        {/* Convert 들어갈 부분 */}
        <div className="col-lg-8 d-flex flex-column">
          <span className="my-2 fs-4">{loading ? '변환 중입니다.' : '사진을 넣으면 3D 패션아이템으로 재탄생합니다!'}</span>
          <div className="h-100 d-flex justify-content-center align-items-center">
            {loading ? (
              // 로딩 중이면 로딩창 소환
              <Spinner delay={1.5} radius={1.5} />
            ) : (
              //아니라면 이미지 받을 준비
              <ConvertBox category={category} setLoading={setLoading} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
