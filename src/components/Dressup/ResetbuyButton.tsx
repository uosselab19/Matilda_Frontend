import { Clothes } from "../../types/Clothes";
import { alertError, alertSuccess, confirmQuestion, confirmWarning } from "../../utils/alertUtil";

interface resetbuyButtonProps {
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

const handleReset = async (setClothes: React.Dispatch<React.SetStateAction<Clothes>>) => {
  const result = await confirmWarning(`리셋할 거에요!`, `지금 입은 옷을 리셋하는 게 맞나요?`, '맞아요!', `아니에요;;`,)
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    setClothes({});
    alertSuccess('리셋했습니다!', `리셋했습니다!`);
  } else {
    alertError('취소했어요!', '아무 일도 일어나지 않았습니다.',);
  }
};

const handleBuy = async () => {
  const result = await confirmQuestion(`flex해버릴 거에요!`, `지금 입은 옷을 구매하는 게 맞나요?`, '맞아요!', `아니에요;;`,)
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    alertSuccess('아이템 구매하는 버튼~', `옷을 전부 산 시나리오`);
  } else {
    alertError('취소했어요!', '아무 일도 일어나지 않았습니다.',);
  }
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