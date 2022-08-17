import Swal from "sweetalert2";
import { Clothes } from "../../types/Clothes";

interface resetbuyButtonProps {
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

const handleReset = (setClothes: React.Dispatch<React.SetStateAction<Clothes>>) => {
  Swal.fire({
    icon: 'warning',
    title: `리셋할 거에요!`,
    text: `지금 입은 옷을 리셋하는 게 맞나요?`,
    showCancelButton: true,
    confirmButtonText: '맞아요!',
    confirmButtonColor: '#81c147',
    cancelButtonText: `아니에요;;`,
    cancelButtonColor: '#d33',
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setClothes({});
      Swal.fire({
        icon: 'success',
        title: '리셋했습니다!',
        text: `리셋했습니다!`,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '취소했어요!',
        text: '아무 일도 일어나지 않았습니다.',
      });
    }
  });
};

const handleBuy = () => {
  Swal.fire({
    icon: 'question',
    title: `flex해버릴 거에요!`,
    text: `지금 입은 옷을 구매하는 게 맞나요?`,
    showCancelButton: true,
    confirmButtonText: '맞아요!',
    confirmButtonColor: '#81c147',
    cancelButtonText: `아니에요;;`,
    cancelButtonColor: '#d33',
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: '아이템 구매하는 버튼~',
        text: `옷을 전부 산 시나리오`,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '취소했어요!',
        text: '아무 일도 일어나지 않았습니다.',
      });
    }
  });
};

export const ResetbuyButton = (props: resetbuyButtonProps) => {
  const { setClothes } = props;
  return (
    < div className="btn-group-vertical w-100" role="group" >
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => { handleReset(setClothes); }}>
        Reset
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => { handleBuy(); }}>
        Buy All
      </button>
    </div >
  );
}