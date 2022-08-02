import imageDR from '../assets/images/Convert3D/imageDR.png';
import imageTOP from '../assets/images/Convert3D/imageTOP.png';
import imageBTM from '../assets/images/Convert3D/imageBTM.png';
import imageHEA from '../assets/images/Convert3D/imageHEADWEAR.png';
import imageBRA from '../assets/images/Convert3D/imageBRACELET.png';
import imageNEC from '../assets/images/Convert3D/imageNECKLACE.png';
import imageBAG from '../assets/images/Convert3D/imageBAG.png';
import imageMAS from '../assets/images/Convert3D/imageMASK.png';

export default function useCategory() {
  return [
    { title: '전체', image: imageDR, catCode: '' },
    { title: '드레스', image: imageDR, catCode: 'DR' },
    { title: '상의', image: imageTOP, catCode: 'TOP' },
    { title: '하의', image: imageBTM, catCode: 'BTM' },
    { title: '모자', image: imageHEA, catCode: 'HEA' },
    { title: '팔찌', image: imageBRA, catCode: 'BRA' },
    { title: '목걸이', image: imageNEC, catCode: 'NEC' },
    { title: '가방', image: imageBAG, catCode: 'BAG' },
    { title: '마스크', image: imageMAS, catCode: 'MAS' },
  ];
}
