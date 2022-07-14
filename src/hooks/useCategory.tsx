import imageDR from '../assets/images/Convert3D/imageDR.png';
import imageTOP from '../assets/images/Convert3D/imageTOP.png';
import imageOTR from '../assets/images/Convert3D/imageOTR.png';
import imageBTM from '../assets/images/Convert3D/imageBTM.png';
import imageSOX from '../assets/images/Convert3D/imageSOX.png';
import imageSH from '../assets/images/Convert3D/imageSH.png';
import imageHAI from '../assets/images/Convert3D/imageHAIR.png';
import imageHEA from '../assets/images/Convert3D/imageHEADWEAR.png';
import imageGLA from '../assets/images/Convert3D/imageGLASSES.png';
import imageBRA from '../assets/images/Convert3D/imageBRACELET.png';
import imageNEC from '../assets/images/Convert3D/imageNECKLACE.png';
import imageEAR from '../assets/images/Convert3D/imageEARRING.png';
import imageBAG from '../assets/images/Convert3D/imageBAG.png';
import imageMAS from '../assets/images/Convert3D/imageMASK.png';
import imageWIN from '../assets/images/Convert3D/imageWING.png';
import imageNAI from '../assets/images/Convert3D/imageNAIL.png';
import imageGLO from '../assets/images/Convert3D/imageGLOVE.png';

export default function useCategory() {
	return [
		{ title: '전체', image: imageDR, catCode: 'ALL' },
		{ title: '한 벌 의상', image: imageDR, catCode: 'DR' },
		{ title: '상의', image: imageTOP, catCode: 'TOP' },
		{ title: '아우터', image: imageOTR, catCode: 'OTR' },
		{ title: '하의', image: imageBTM, catCode: 'BTM' },
		{ title: '양말', image: imageSOX, catCode: 'SOX' },
		{ title: '신발류', image: imageSH, catCode: 'SH' },
		{ title: '헤어', image: imageHAI, catCode: 'HAI' },
		{ title: '헤드웨어', image: imageHEA, catCode: 'HEA' },
		{ title: '안경', image: imageGLA, catCode: 'GLA' },
		{ title: '팔찌', image: imageBRA, catCode: 'BRA' },
		{ title: '목걸이', image: imageNEC, catCode: 'NEC' },
		{ title: '귀걸이', image: imageEAR, catCode: 'EAR' },
		{ title: '가방', image: imageBAG, catCode: 'BAG' },
		{ title: '마스크', image: imageMAS, catCode: 'MAS' },
		{ title: '날개', image: imageWIN, catCode: 'WIN' },
		{ title: '네일아트', image: imageNAI, catCode: 'NAI' },
		{ title: '장갑', image: imageGLO, catCode: 'GLO' },
	];
} 