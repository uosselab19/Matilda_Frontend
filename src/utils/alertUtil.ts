import Swal from 'sweetalert2';
import item_img1 from '../assets/images/Marketplace/item_img.png';

export const alertSuccess = (title: string, text: string) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text
  });
};

export const alertWarning = (title: string, text: string) => {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: text
  });
};

export const alertError = (title: string, text: string) => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: text
  });
};

export const alertInfo = (title: string, text: any) => {
  return Swal.fire({
    icon: 'info',
    title: title,
    text: text
  });
};

export const alertModal = async (title: string, text: string, url: string, alt?: string, width?: number) => {
  return Swal.fire({
    title: title,
    text: text,
    imageUrl: url.length > 0 && url != 'no img' ? url : item_img1,
    imageAlt: alt ? alt : 'Modal Image',
    imageWidth: width ? width : 500,
    imageHeight: width ? width : 500,
    width: width ? width + 60 : 560
  });
};

export const confirmSuccess = async (title: string, text: string, confirmText: string, denyText: string) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33'
  });
};

export const confirmWarning = async (title: string, text: string, confirmText: string, denyText: string) => {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33'
  });
};

export const confirmQuestion = async (title: string, text: string, confirmText: string, denyText: string) => {
  return Swal.fire({
    icon: 'question',
    title: title,
    text: text,
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33'
  });
};

export const confirmModal = async (
  title: string,
  text: string,
  confirmText: string,
  denyText: string,
  url: string,
  alt?: string,
  width?: number
) => {
  return Swal.fire({
    title: title,
    text: text,
    imageUrl: url.length > 0 && url != 'no img' ? url : item_img1,
    imageWidth: width ? width : 500,
    imageHeight: width ? width : 500,
    width: width ? width + 60 : 560,
    imageAlt: alt ? alt : 'Modal Image',
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33'
  });
};

export const alertInput = async (title: string, text: string, placeholder: string) => {
  const { value: newValue } = await Swal.fire({
    title: title,
    input: 'text',
    inputLabel: text,
    inputPlaceholder: placeholder,
    showCloseButton: true,
    showDenyButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!';
      }
      return '';
    }
  });

  return newValue;
};

export const confirmInputModal = async (
  title: string,
  text: string,
  confirmText: string,
  denyText: string,
  placeholder: string,
  url: string,
  alt?: string
) => {
  return await Swal.fire({
    title: title,
    imageUrl: url.length > 0 && url != 'no img' ? url : item_img1,
    imageAlt: alt ? alt : 'Modal Image',
    input: 'text',
    inputLabel: text,
    inputPlaceholder: placeholder,
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33',
    inputValidator: (value) => {
      if (!value) {
        return '????????? ???????????????!';
      } else if (isNaN(Number(value))) {
        return '????????? ??????????????????!';
      }
      return '';
    }
  });
};

export const alertLoading = async (title: string) => {
  return Swal.fire({
    title: title,
    allowOutsideClick: false,
    showCloseButton: true,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

export const alertProgress = async (title: string, progress: any) => {
  let timerInterval;
  return Swal.fire({
    title: title,
    html: `????????? : <b></b>%`,
    timer: 500,
    allowOutsideClick: false,
    showCloseButton: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer()?.querySelector('b') as HTMLElement;
      let progressPoint = (progress.value / progress.total) * 100;
      timerInterval = setInterval(() => {
        if (progress.error) clearInterval(timerInterval);
        progressPoint = (progress.value / progress.total) * 100;
        b.textContent = progressPoint.toString();
        if (progressPoint < 100) Swal.increaseTimer(100);
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  });
};
