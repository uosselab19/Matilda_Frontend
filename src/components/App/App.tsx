import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from '../../pages/Home';
import { Marketplace } from '../../pages/Marketplace';
import { Convert3D } from '../../pages/Convert3D';
import { MintNFT } from '../../pages/MintNFT';
import { Dressup } from '../../pages/Dressup';
import { Signin } from '../../pages/SignIn';
import { Signup } from '../../pages/SignUp';
import { Mypage } from '../../pages/Mypage';
import { NFTItem } from '../../pages/NFTItem';
import { NotFound } from '../../pages/NotFound';
import { Test } from '../Test/Test';
import AxiosInterceptorNavigate from '../../configs/Interceptor';

export const App = () => {
  return (
    <BrowserRouter basename='/'>
      {<AxiosInterceptorNavigate />}
      <Header />
      <Routes>
        <Route path="" element={<Home />} />

        {/*header에 연결된 component*/}
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="3Dconversion" element={<Convert3D />} />
        <Route path="NFTminting" element={<MintNFT />} />
        <Route path="dressup" element={<Dressup />} />

        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="test" element={<Test />} />

        <Route path="marketplace/NFTItem" element={<NFTItem />} />
        <Route path="mypage/NFTItem" element={<NFTItem />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
