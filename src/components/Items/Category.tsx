import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Category() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const mountCat = searchParams.get('cat_code');
  //첫 마운트 시 카테고리 정보 없으면 정보를 넣어주는 코드
  useEffect(() => {
    if (!mountCat) setSearchParams({ cat_code: 'ALL' });
  }, []);

  //실제 페이지, 그에 대한 함수
  //page는 페이지네이션으로 프론트엔드로 보여지는 숫자보다 1 작음.
  //ex) 화면에 1 2 3 4 5 라고 보여지면 page가 가질 수 있는 숫자는 0 1 2 3 4 임.
  const [category, setCategory] = useState(mountCat ? (searchParams.get('cat_code') as string) : 'ALL');
  
  const navItems = () => {
    const navItem = (cat_code: string, title: string) => {
      return (
        <button
          key={cat_code}
          type="button"
          className={`btn btn-outline-light text-dark ${category == cat_code ? 'fw-bold' : ''}`}
          onClick={() => {
            navigate(`/marketplace?cat_id=${cat_code}`, { replace: true });
            setCategory(cat_code);
          }}
        >
          {title}
        </button>
      );
    };

    // 카테고리 직접 입력해서 넣음
    const navItems = new Array();
    navItems.push(navItem('ALL', '전체'));
    navItems.push(navItem('DR', '한벌의상'));
    navItems.push(navItem('SANG', '상의'));
    navItems.push(navItem('BTM', '하의'));
    navItems.push(navItem('SOX', '양말'));
    navItems.push(navItem('SH', '신발류'));
    navItems.push(navItem('HAIR', '헤어'));
    navItems.push(navItem('HWEAR', '헤드웨어'));
    navItems.push(navItem('GLASS', '안경'));
    navItems.push(navItem('JEWEL', '쥬얼리'));
    navItems.push(navItem('ACS', '액세서리'));
    return navItems;
  };

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around">
      <div className="btn-group" role="group">
        {navItems()}
      </div>
    </div>
  );
}
