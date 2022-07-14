// import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import useForm from '../../hooks/useForm';
import { SearchItem } from '../../types/Item';
import { isRequired } from '../../utils/validator';
import SearchBox from '../forms/SearchBox';
import SelectBox from '../forms/SelectBox';

function validate(values: SearchItem) {
  const errors = {searched:isRequired(values?.keyword)};

  return errors;
}

const callback = () => {
  alert('asdf');
}

interface SearchProps {
  size?:string;
}

export default function Search(props: SearchProps) {
  const {size}=props;
  // const navigate = useNavigate();
  // const fetchSearch = async (e: any) => {
  //   console.log(e.target);
  //   navigate(`/marketplace?search=${1}`, { replace: true });
  // };

  // 3D 아이템 목록이 들어가는 리스트 생성하는 부분
  const categoryList = useCategory();

  const { handleChange, handleSubmit, values, errors } = useForm(callback, validate);

  return (
    <div className="container text-center">
      <form>
        <div className="row d-flex justify-content-between">
          <div className="col-3">
            <SelectBox
              id="test"
              label=""
              placeholder=""
              helpText="Please enter a valid TEST"
              disabled={false}
              size={size}
              options={categoryList}
              handleChange={(e) => { handleChange(e) }}
              value={values['catCode']}
              keyProperty="title"
              valueProperty="catCode"
            />
          </div>
          <div className="col-6">
            <SearchBox
              id="keyword"
              name="keyword"
              readonly={false}
              disabled={false}
              size={size}
              handleChange={(e) => { handleChange(e) }}
              value={values['keyword']}
              error={errors['keyword']}
            />
          </div>
          <div className="col-3">
            <button
              className="btn btn-outline-success w-100 h-100"
              type="submit"
              onClick={(e) => { handleSubmit(e) }}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}