import { postImage } from "../services/imageService";

//이미지 변환해주는 함수
export const convertFunction = async (srcImage: File, category: Category) => {
  const file = (await (new Blob([srcImage]).arrayBuffer()));
  console.log(String.fromCharCode.apply(null, file));
  postImage({ file: file, category: category.catCode } );
};
