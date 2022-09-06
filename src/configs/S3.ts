import AWS from 'aws-sdk';
import item_img1 from '../assets/images/Marketplace/item_img.png';

export const getS3ImgUrl = (key: string)=> {
    const s3 = new AWS.S3({
        accessKeyId: process.env.s3AccessKeyID,
        region: 'us-east-2',
        secretAccessKey: process.env.s3SecretAccessKey,
    });

    const url = s3.getSignedUrl('getObject', {
        Bucket: "matilda.image-storage",
        Key: key,
        Expires: 60 * 1
    });

    return url.includes("no%20img")?item_img1:url;
}