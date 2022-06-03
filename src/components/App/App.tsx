import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//component import
import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from './Home';
import { Explore } from '../Explore/Explore';
import { Convert3D } from '../Convert3D/Convert3D';
import { MintNFT } from '../MintNFT/MintNFT';
import { Customize } from '../Customize/Customize';
import { Signin } from '../Sign/Signin';
import { Signup } from '../Sign/Signup';
import { Mypage } from '../Mypage/Mypage';
import { BuyNFTItem } from '../NFTItem/BuyNFTItem';
import { SellNFTItem } from '../NFTItem/SellNFTItem';
import { NotFound } from '../NotFound/NotFound';

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
          <Route path="/MintNFT" element={<MintNFT />} />
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
