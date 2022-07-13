import { useNavigate } from 'react-router-dom';


export default function Search() {
  const navigate = useNavigate();
  const fetchSearch = async (e: any) => {
    console.log(e.target);
    navigate(`/marketplace?search=${1}`, { replace: true });
  };

  const optionItemList = new Array();
  optionItemList.push('전체');
  optionItemList.push('한벌의상');
  optionItemList.push('상의');
  optionItemList.push('하의');
  optionItemList.push('양말');
  optionItemList.push('신발류');
  optionItemList.push('헤어');
  optionItemList.push('헤드웨어');
  optionItemList.push('안경');
  optionItemList.push('쥬얼리');
  optionItemList.push('액세서리');

  // 3D 아이템 목록이 들어가는 리스트 생성하는 부분
  const optionList = new Array();
  optionItemList.forEach((info, index) => {
    optionList.push(
      <option key={index} value={index}>
        {info}
      </option>
    );
  });

  return (
    <div className="container py-5 text-center ">
      <form>
        <div className="row d-flex justify-content-between">
          <select
            className="custom-select custom-select-lg col-2"
            defaultValue={0}
            onChange={() => {
              //setItemIndex(Number(e.target.value));
            }}
          >
            {optionList}
          </select>
          <input className="col-8" type="search" placeholder="Search" aria-label="Search" />
          <button
            className="btn btn-outline-success col-2"
            type="submit"
            onClick={(e) => {
              fetchSearch(e);
            }}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}