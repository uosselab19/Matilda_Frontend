import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//component import
import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from './components/Home';
import { Explore } from './components/Explore/Explore';
import { Convert3D } from './components/Convert3D/Convert3D';
import { RegisterNFT } from './components/RegisterNFT/RegisterNFT';
import { Customize } from './components/Customize/Customize';
import { Signin } from './components/Sign/Signin';
import { Signup } from './components/Sign/Signup';
import { Mypage } from './components/Mypage/Mypage';
import { BuyNFTItem } from './components/BuyNFTItem';
import { SellNFTItem } from './components/SellNFTItem';
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
