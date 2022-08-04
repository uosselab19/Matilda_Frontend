import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//component import
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
          <Route path="/mypage/NFTItem" element={<NFTItem mode={'Sell'} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
