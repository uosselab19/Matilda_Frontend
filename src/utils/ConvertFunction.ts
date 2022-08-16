import { postImage } from "../services/imageService";

//이미지 변환해주는 함수
export const convertFunction = async (srcImage: File, category: Category) => {
  postImage({ file: srcImage, category: category.catCode });
};