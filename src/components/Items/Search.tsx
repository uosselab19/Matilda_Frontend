// import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import useForm from '../../hooks/useForm';
import { SelectItem } from '../../types/Item';
import { isRequired } from '../../utils/validator';
import SearchBox from '../forms/SearchBox';
import SelectBox from '../forms/SelectBox';

function validate(values: SelectItem) {
  const errors = { searched: isRequired(values?.title) };

  return errors;
}

interface SearchProps {
  size: string;
  handleSearch: Function;
}

export default function Search(props: SearchProps) {
  const { size, handleSearch } = props;
  const serach = () => {
    handleSearch(values);
  };

  // 3D 아이템 목록이 들어가는 리스트 생성하는 부분
  const categoryList = useCategory();

  const { handleChange, handleSubmit, values, errors } = useForm(serach, validate);

  return (
    <div
    className={`container text-center mb-${size=="lg"?"4":"3"}`}
    onKeyUp={(e)=>{if(e.key=="Enter") handleSubmit(e);}} >
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
              handleChange={(e) => {
                handleChange(e);
              }}
              value={values['catCode']}
              keyProperty="title"
              valueProperty="catCode" />
          </div>
          <div className="col-6">
            <SearchBox
              id="searchBox"
              name="title"
              readonly={false}
              disabled={false}
              size={size}
              handleChange={(e) => {
                handleChange(e);
              }}
              value={values['title']}
              error={errors['title']} />
          </div>
          <div className="col-3">
            <button
              type="submit"
              className="btn btn-outline-success w-100 h-100"
              onClick={(e) => {
                handleSubmit(e);
              }}>
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
