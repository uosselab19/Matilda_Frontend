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
  해당 코드는 컴포넌트 밖을 벗어나는 함수에 대해
  함수 호출 시 페이지를 옮겨야 하는 경우 사용
 */
// function AxiosInterceptorNavigate() {
//   AxiosInterceptorSetup();
//   return <></>;
// }

export const App = () => {
  AxiosInterceptorSetup();
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
