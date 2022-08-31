export const MypageWallet = () => {
  return (
    <div>
      <div className="my-5">
        <h1>클레이튼 관련 내용</h1>
        <p>
          지갑 정보 등, 클레이튼과 관련한 부분입니다!
          <br />
          어떤 내용이 추가될지 몰라 일단 만들어는 놨습니다.
        </p>
      </div>

      <form id="walletForm" className="needs-validation" noValidate>
        <div className="row g-3">
          {/* 지갑주소 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress1" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>

          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress2" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress3" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress4" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress5" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress6" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress7" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress8" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress9" placeholder="" type="text" required />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>
        </div>
      </form>
    </div>
  );
};
