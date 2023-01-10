import AWS from 'aws-sdk';
import item_img1 from '../assets/images/Marketplace/item_img.png';

// 3D Conversion이 진행됐다면 AWS S3라는 이미지 클라우드에 변환된 3D의 썸네일 이미지가 저장됨
// 사진은 백엔드에서 이미 생성되어 있으므로, 프론트엔드에서는 그냥 만들어진 사진을 가져오기만 하면 됨
// AWS S3계정이 따로 필요한데, 이건 .env에 저장해둠
export const getS3Url = (key: string | undefined) => {
  if (!key) return item_img1;

  const s3 = new AWS.S3({
    accessKeyId: process.env.s3AccessKeyID,
    region: 'us-east-2', // AWS를 이용하는 국가가 어딘지 백엔드 담당께 물어보고 적어두기. 나라마다 한 달동안 나가는 비용이 다름
    secretAccessKey: process.env.s3SecretAccessKey
  });

  // 백엔드의 환경설정을 그대로 가져온 거라, 프론트엔드에서 독단적으로 바꾸는 부분이 아님
  // 전적으로 백엔드 관리자가 적어둔 string을 적어둔 것이므로 프론트엔드 개발자는 수동적으로 접근하길 바람
  const url = s3.getSignedUrl('getObject', {
    Bucket: 'matilda.image-storage',
    Key: key,
    Expires: 60 * 1
  });

  // 이미지 벡엔드에서 사진을 생성하다가 에러가 나면 사진이 없음.
  // 그러면 백엔드에서부터 "no%20img"로 (에러가 아닌) 정상적인 응답을 받게되는데, 그걸 해결하기 위해 적어둠
  // 프론트엔드에서 에러가 나면 url이 undefined 값으로 들어가는데, 그러면 사진이 애초에 올라오지 않아서 신경쓰지 않았음
  return url.includes('no%20img') ? item_img1 : url;
};
