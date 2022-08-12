import { postImage } from "../services/imageService";

//이미지 변환해주는 함수
export const convertFunction = async (srcImage: File, category: Category) => {
  const reader = new FileReader();
  reader.readAsDataURL(new Blob([srcImage]));
  reader.onload = async (e) => {
    //console.log(e.target?.result);
    const base64=e.target?.result?.slice(37);
    postImage({ file: base64, category: category.catCode });
  };
  
};

// function ArrayBufferToString(buffer) {
//   return BinaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
// }

// function BinaryToString(binary) {
//   var error;

//   try {
//       return decodeURIComponent(escape(binary));
//   } catch (_error) {
//       error = _error;
//       if (error instanceof URIError) {
//           return binary;
//       } else {
//           throw error;
//       }
//   }
// }