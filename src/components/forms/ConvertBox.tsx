import Swal from 'sweetalert2';
import { convertFunction } from '../../utils/ConvertFunction';

interface Clothes {
  catCode: string;
  image: '*.png';
  title: string;
}

interface ConvertBoxProps {
  clothes: Clothes;
  setLoading: Function;
}

export default function ConvertBox(props: ConvertBoxProps) {
  const { clothes, setLoading } = props;

  //프리뷰 보여주는 함수
  const setPreview = (input: File) => {
    if (!clothes.title.length) {
      return Swal.fire({
        icon: 'error',
        title: '카테고리를 골라주세요!',
        text: '왼쪽 카테고리에서 종류를 선택해주세요!',
      });
    }

    if (!input) {
      return Swal.fire({
        icon: 'error',
        title: '취소했어요!',
        text: '입력이 없어요, 다시 한 번 확인해보세요 ㅎㅎ;;',
      }); // 도중에 취소하면 아무것도 없음
    }

    setLoading(true);

    console.log(input);
    return convertFunction(input);
  };

  //드래그 & 드랍시 사용되는 핸들러 함수들
  const handleDrag = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === 'dragover') e.currentTarget.setAttribute('style', 'opacity: 0.5;');
    else e.currentTarget.setAttribute('style', 'opacity: 1;');
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDrag(e); //드래그 할 때 화면 투명도 바꾸는 거 한 번 더 적용시키기 위함.
    setPreview(e.dataTransfer.files[0]);
  };

  //그냥 클릭하고 사진 고르는 식일 때 사용되는 핸들러 함수
  const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
    if (clothes.title.length == 0) {
      e.stopPropagation();
      e.preventDefault();
      Swal.fire({
        icon: 'error',
        title: '카테고리를 골라주세요!',
        text: '왼쪽 카테고리에서 종류를 선택해주세요!',
      });
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files as FileList;
    const file = fileList.item(0) as File;
    setPreview(file);
  };

  return (
    <label htmlFor="file-input">
      <div className="card text-white border-white text-center" onDrop={handleDrop} onDragOver={handleDrag} onDragLeave={handleDrag}>
        <img id="preview-image" style={{ width: "768px", height: "600px" }} alt="여기 맞아요, 사진을 넣어 주세요!" src={clothes.image} draggable="false" />
        <div className="card-img-overlay h-75 d-flex flex-column justify-content-end">
          <h5 className="card-title text-dark fs-2 fw-bold">{clothes.title}</h5>
          <p className="card-text text-dark">
            {clothes.title.length ? '여기에 사진을 넣어 주세요!' : '왼쪽 카테고리에서 종류를 선택해주세요!'}
          </p>
        </div>
      </div>
      <input id="file-input" type="file" style={{ display: 'none' }} accept="image/*" onChange={handleChange} onClick={handleClick} />
    </label>
  );
}
