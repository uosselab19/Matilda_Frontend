//컴포넌트가 받을 props
interface props {
    category: string;
    page: number;
    setPage: Function;
    numItems: number;
    numShowItems: number;
  }

export const Pagination = (props: props) => {
    const page = props.page;
    const setPage = props.setPage;
    const [numItems, numShowItems] = [props.numItems, props.numShowItems];
    const maxNumItems = Math.floor(numItems / numShowItems); //페이지네이션 변수
    const maxShowPage = 10;
  
    const prevPage = () => {
      if (page > maxShowPage - 1)
        // 1 2 3 4 5 중에 하나가 되면 안 됨
        setPage(page - ((page % maxShowPage) + 1)); // 다음 수열 중에 가장 큰 숫자로 이동.
      // ex) 6 7 8 9 10 => 1 2 3 4 5 면 page는 4
    };
    const nextPage = () => {
      if (page + (maxShowPage - (page % maxShowPage)) < maxNumItems) setPage(page + (maxShowPage - (page % maxShowPage))); // 다음 수열 중에 가장 큰 숫자로 이동.
      // ex) 1 2 3 4 5 => 6 7 8 9 10 면 page는 5
    };
  
    const pagigationButton = (number: number, selected: boolean) => {
      //페이지네이션 숫자 버튼 만드는 jsx 반환
      return (
        <li className="page-item" key={number}>
          <button
            className={`page-link link-dark ${selected ? 'fw-bold' : ''}`}
            onClick={() => {
              setPage(number - 1);
              window.scrollTo({ top: 0 });
            }}
          >
            {number}
          </button>
        </li>
      );
    };
  
    const paginationManage = (page: any) => {
      //숫자가 예쁘게 1 2 3 4 5 이런 식으로 잘 나오도록 리스트 만들어서 버튼 집어넣는 함수
  
      const Page = page - (page % maxShowPage);
      //페이지네이션에서 실제로 보일 숫자들 중에 가장 작은 숫자
      //ex) < 1 2 3 4 5 > 이런 식으로 있으면 page는 0 1 2 3 4 중에 하나가 될 수 있지만, Page는 무조건 0.
      return new Array(maxShowPage).fill([]).map((_, i) => {
        if (Page + i > maxNumItems) return null;
        return pagigationButton(Page + (i + 1), page === Page + i); //버튼 만드는 부분
      });
    };
  
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link link-dark"
              onClick={() => {
                prevPage();
                window.scrollTo({ top: 0 });
              }}
            >
              Prev
            </button>
          </li>
          {paginationManage(page)}
          <li className="page-item">
            <button
              className="page-link link-dark"
              onClick={() => {
                nextPage();
                window.scrollTo({ top: 0 });
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };