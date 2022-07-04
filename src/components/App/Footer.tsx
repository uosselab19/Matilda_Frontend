import { selectItem } from '../../services/itemService';
//import { selectMember } from '../../services/memberService';

export const Footer = () => {
  //Footer는 현재는 디버그용 버튼으로 활용 중
  const scrollTop = async () => {
    // window.scrollTo({ top: 0 });
    const { data, error } = await selectItem({
      skip: 0,
      sortKey: 'ID',
      sortOrder: 'ASC',
      take: 100
    });
    console.log(data);
    console.log(error);

    // const { data, error } = await selectMember(2);
    // console.log(data);
    // console.log(error);
  };

  return (
    <footer className="text-muted text-center py-5">
      <div className="container">
        <p className="float mb-3">
          <button className="btn btn-link link-dark" onClick={scrollTop}>
            Back to top
          </button>
        </p>
        <p className="mb-1">Develop by Mindul-Mendul</p>
        <p className="mb-0">Copyright ©2022 by selab. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
