import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from '../../pages/Home';
import { Marketplace } from '../../pages/Marketplace';
import { Convert3D } from '../../pages/Convert3D';
import { Dressup } from '../../pages/Dressup';
import { Signin } from '../../pages/SignIn';
import { Signup } from '../../pages/SignUp';
import { Mypage } from '../../pages/Mypage';
import { NFTItem } from '../../pages/NFTItem';
import { NotFound } from '../../pages/NotFound';
import { AxiosInterceptorSetup } from '../../configs/Interceptor';

/* 
function AxiosInterceptorNavigate() {
  해당 코드는 컴포넌트 밖을 벗어나는 함수에 대해
  함수 호출 시 페이지를 옮겨야 하는 경우 사용
  AxiosInterceptorSetup();
  return <></>;
}
*/

export const App = () => {
  /*
    페이지를 직접 그리는 컴포넌트
    BrowserRouter로부터 Header / Routes / Footer 를 차례대로 화면에 출력함
    Header와 Footer는 현재 폴더의 컴포넌트로 각각 연결되며,
    Routes로 components의 pages 컴포넌트를 서브라우팅한다.
  */
  AxiosInterceptorSetup(); // 액시오스 인터셉터를 호출하기 위해 사용하는 함수
  return (
    <BrowserRouter basename="/">
      {/* {<AxiosInterceptorNavigate />} */}
      <Header />
      <Routes>
        <Route path="" element={<Home />} />

        {/*header에 연결된 component*/}
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="3Dconversion" element={<Convert3D />} />
        <Route path="dressup" element={<Dressup />} />

        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="mypage" element={<Mypage />} />

        <Route path="NFTItem" element={<NFTItem />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
