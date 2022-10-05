import { createAccount, getBalance } from "../../utils/caverUtil";
import { SelectMember } from "../../types/Member";
import { putMemberKlaytn } from "../../services/memberService";
import { alertError, alertSuccess } from "../../utils/alertUtil";
import { useEffect, useState } from "react";

interface MypageKlaytnProps {
  userInfo: SelectMember;
  setUserInfo: React.Dispatch<React.SetStateAction<SelectMember>>;
}

export const MypageKlaytn = (props: MypageKlaytnProps) => {
  const { userInfo, setUserInfo } = props;
  const address = userInfo.walletAddress;
  const [balance, setBalance] = useState("0");

  const createWallet = async () => {
    const { address, privateKey } = createAccount();
    const { data, error } = await putMemberKlaytn(userInfo.memberNum, { walletAddress: address, walletPrivateKey: privateKey });
    if (error) {
      alertError("멤버 수정 오류", "클레이튼 계정 생성에 오류가 있었습니다. 다시 시도해주세요!");
    } else {
      setUserInfo(data);
      alertSuccess("생성 완료!","지갑 주소가 새로 생성되었습니다!");
    }
  }

  useEffect(() => {
    (async () => {
      if (userInfo.walletAddress) setBalance(await getBalance(userInfo.walletAddress));
    })();
  }, [userInfo]);

  return (userInfo) ? (
    <div>
      <div className="mt-5">
        <h1>클레이튼</h1>
        <p>
          클레이튼 네트워크에 사용될 계정의 정보입니다.
        </p>
      </div>

      <form id="KlaytnForm" className="needs-validation" noValidate>
        <div className="row g-3">
          {/* 지갑주소 */}
          <div className="col-12 row my-3">
            <div className="col-12 fs-3">Wallet</div>
            <div className="col-2 fs-4">Address:</div>
            {(userInfo.walletAddress) ?
              <div className="col-10 fs-5">{address}</div>
              :
              <button
                type="button"
                className="btn btn-lg btn-white col-10 fs-5"
                onClick={createWallet}>
                지갑을 만들까요?
              </button>
            }
          </div>
          {/* 클레이 보유 금액 */}
          <div className="col-12 row my-3">
            <div className="col-12 fs-3">Account</div>
            <div className="col-8 fs-4">{balance}</div>
            <div className="col-4 fs-5">KLAY</div>
          </div>
        </div>
      </form>
    </div>
  ) : null;
};
