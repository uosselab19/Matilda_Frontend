import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';

import { Card } from './Card';

export const Explore = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const mountCat = searchParams.get('cat_code');
  //첫 마운트 시 카테고리 정보 없으면 정보를 넣어주는 코드
  useEffect(() => {
    if (mountCat == null) {
      setSearchParams({ cat_code: 'ALL' });
    }
  }, []);

  //실제 페이지, 그에 대한 함수
  //page는 페이지네이션으로 프론트엔드로 보여지는 숫자보다 1 작음.
  //ex) 화면에 1 2 3 4 5 라고 보여지면 page가 가질 수 있는 숫자는 0 1 2 3 4 임.
  const [numItems, numShowItems] = [109, 12]; //아이템 개수, 메인에 보여줄 아이템 개수
  const [category, setCategory] = useState(mountCat ? searchParams.get('cat_code') : 'ALL');
  const [page, setPage] = useState(0);

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

  const fetchSearch = async (e: any) => {
    console.log(e.target);
    navigate(`/marketplace?search=${1}`, { replace: true });
  };

  return (
    <main>
      {/* 마틸다 이름 들어갈 부분 */}
      <section className="container py-5 text-center">
        <form>
          <div className="row">
            <div className="col-3 fw-bold fs-4">
              <img src={matilda} width="64" alt=""></img> MATILDA
            </div>
            <input className="col-6" type="search" placeholder="Search" aria-label="Search" />
            <button
              className="btn btn-outline-success mx-5 col-1"
              type="submit"
              onClick={(e) => {
                fetchSearch(e);
              }}
            >
              Search
            </button>
          </div>
        </form>
      </section>

      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around">
        <div className="btn-group" role="group">
          {navItems()}
        </div>
      </nav>

      <section className="container py-5">
        {/* 페이지네이션 */}
        <Card
          category={category as string}
          page={page}
          setPage={setPage}
          numItems={numItems}
          numShowItems={numShowItems}
        />
      </section>
    </main>
  );
};
