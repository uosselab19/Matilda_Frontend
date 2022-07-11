import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//component import
import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from './Home';
import { Marketplace } from '../Marketplace/Marketplace';
import { Convert3D } from '../Convert3D/Convert3D';
import { MintNFT } from '../../pages/MintNFT/index';
import { Dressup } from '../Dressup/Dressup';
import { Signin } from '../../pages/SignIn/index';
import { Signup } from '../../pages/SignUp/index';
import { Mypage } from '../Mypage/Mypage';
import { NFTItem } from '../NFTItem/NFTItem';
import { NotFound } from '../../pages/NotFound/index';

//기타 필요한 부분
import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          {/*header에 연결된 component*/}

          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/3Dconversion" element={<Convert3D />} />
          <Route path="/NFTminting" element={<MintNFT />} />
          <Route path="/dressup" element={<Dressup />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />

          <Route path="/marketplace/NFTItem" element={<NFTItem mode={'Buy'} />} />
          <Route path="/marketplace/NFTItem" element={<NFTItem mode={'Sell'} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
