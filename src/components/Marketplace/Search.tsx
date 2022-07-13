import { useNavigate } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';

export default function Search () {
	const navigate = useNavigate();
    const fetchSearch = async (e: any) => {
        console.log(e.target);
        navigate(`/marketplace?search=${1}`, { replace: true });
      };

    return (
    <div className="container py-5 text-center">
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
    </div>
    );
}