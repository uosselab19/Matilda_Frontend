import { useNavigate } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';
import matildaWhite from '../../assets/images/matilda_white.png';
import { CapitalText } from '../../components/CapitalText';

export const Home = () => {
  const navigate = useNavigate();
  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };
  const explore = () => {
    scrollTop();
    navigate('/marketplace', { replace: true });
  };

  return (
    <main>
      <div className="d-flex justify-content-center p-3 p-md-5 text-center bg-light">
        <div className="col-md-5 py-5 w-100">
          <img className="d-block mx-auto my-5" src={matilda} width="128"></img>
          <h1 className="display-4 fw-normal">MATILDA</h1>
          <CapitalText text={'Machine learning And non-fungible Token, Image to cLothes Design Application'} size={4} />
        </div>
      </div>

      <div className="d-flex justify-content-center p-3 p-md-5 text-left bg-dark text-light">
        <div className="col-md-5 py-5 w-75">
          <div className="row">
            <div className="col-7">
              <h1 className="display-4 fw-normal mb-5">이런 기능들이 있어요!</h1>
              <ul className="lead fw-normal">
                <li>
                  <p>2D 이미지 3D로 바꿔주기</p>
                </li>
                {/*하이퍼링크 달아주면 좋을 듯!*/}
                <li>
                  <p>NFT 변환해주기</p>
                </li>
                <li>
                  <p>NFT 구경하기</p>
                </li>
                <li>
                  <p>구경한 NFT를 마네킹에 입혀보기</p>
                </li>
              </ul>
            </div>

            <div className="col-5">
              <img className="d-block mx-auto my-5" src={matildaWhite} width="128"></img>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center p-3 p-md-5 bg-light">
        <div className="col-md-5 py-5 w-75">
          <div className="row">
            <h1 className="col-6 display-4 fw-normal my-5">
              무엇이 MATILDA를
              <br /> 참신하게 만드나요?
            </h1>
            <ul className="col-6 lead fw-normal text-right">
              <li className="my-5">
                <p />
                <h4 className="fw-bold">MATILDA는 2D 이미지만으로도 3D로 바꿔줘요!</h4>
                뒷면 사진이 필요하진 않을까 걱정하지 않아도 돼요,
                <br />
                MATILDA는 2D 이미지 한 장이면 충분하거든요!
                <br />
                기계학습을 통해 이미 어느정도 패턴을 알고 있어요.
                <br />
                여러분은 바꾸고 싶은 사진만 가져오시면 돼요!
              </li>

              <li className="my-5">
                <p />
                <h4 className="fw-bold">바꾼 3D 이미지를 NFT로도 만들어줄 수 있어요!</h4>
                MATILDA가 가이드라인을 제공하고 있어요!
                <br />
                당장 바꿀 필요도 없이 바꾸고 싶을 때 바꾸세요!
                <br />
              </li>

              <li className="my-5">
                <p />
                <h4 className="fw-bold">커스터마이징을 해볼 수 있어요!</h4>
                다른 사람이 만든 패션아이템을 미리 입어볼 수 있어요!
                <br />
                일단 입어보고 마음에 들면 구매할 수 있어요!
                <br />
                MATILDA가 마네킹을 빌려줄게요~
                <br />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center p-3 p-md-5 text-center bg-dark text-light">
        <div className="col-md-5 py-5 w-75">
          <h1 className="display-4 fw-normal">Explore the Marketplace</h1>
          <p className="lead fw-normal">여러분의 아이디어는 이곳에서 볼 수 있습니다!</p>
          <button className="btn btn-lg btn-light my-5 w-50" onClick={explore}>
            Explore the Markplace
          </button>
        </div>
      </div>
    </main>
  );
};
