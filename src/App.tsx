import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//component import
import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore/Explore';
import { Convert3D } from './pages/Convert3D/Convert3D';
import { RegisterNFT } from './pages/RegisterNFT/RegisterNFT';
import { Customize } from './pages/Customize/Customize';
import { Signin } from './pages/Sign/Signin';
import { Signup } from './pages/Sign/Signup';
import { Mypage } from './pages/Mypage/Mypage';
import { BuyNFTItem } from './pages/BuyNFTItem';
import { SellNFTItem } from './pages/SellNFTItem';
import { NotFound } from './NotFound';

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

          <Route path="/explore" element={<Explore />} />
          <Route path="/convert3D" element={<Convert3D />} />
          <Route path="/registerNFT" element={<RegisterNFT />} />
          <Route path="/customize" element={<Customize />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />

          <Route path="/explore/NFTItem" element={<BuyNFTItem />} />
          <Route path="/mypage/NFTItem" element={<SellNFTItem />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
