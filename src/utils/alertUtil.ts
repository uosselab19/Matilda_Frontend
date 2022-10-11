import Swal from "sweetalert2";
import item_img1 from '../assets/images/Marketplace/item_img.png';

export const alertSuccess = (title: string, text: string) => {
	return Swal.fire({
		icon: 'success',
		title: title,
		text: text,
	});
}

export const alertWarning = (title: string, text: string) => {
	return Swal.fire({
		icon: 'warning',
		title: title,
		text: text,
	});
}

export const alertError = (title: string, text: string) => {
	return Swal.fire({
		icon: 'error',
		title: title,
		text: text,
	});
}

export const alertInfo = (title: string, text: any) => {
	return Swal.fire({
		icon: 'info',
		title: title,
		text: text,
	});
}

export const alertModal = async (title: string, text: string, url: string, alt?: string, width?: number) => {
	return Swal.fire({
		title: title,
		text: text,
		imageUrl: (url.length > 0 && url != "no img") ? url : item_img1,
		imageAlt: alt ? alt : "Modal Image",
		imageWidth: width ? width : 500,
		imageHeight: width ? width : 500,
		width: width ? width + 60 : 560,
	})
}

export const confirmSuccess = async (title: string, text: string, confirmText: string, cancelText: string) => {
	return Swal.fire({
		icon: 'success',
		title: title,
		text: text,
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonText: confirmText,
		confirmButtonColor: '#81c147',
		cancelButtonText: cancelText,
		cancelButtonColor: '#d33',
	});
}

export const confirmWarning = async (title: string, text: string, confirmText: string, cancelText: string) => {
	return Swal.fire({
		icon: 'warning',
		title: title,
		text: text,
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonText: confirmText,
		confirmButtonColor: '#81c147',
		cancelButtonText: cancelText,
		cancelButtonColor: '#d33',
	});
}

export const confirmQuestion = async (title: string, text: string, confirmText: string, cancelText: string) => {
	return Swal.fire({
		icon: 'question',
		title: title,
		text: text,
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonText: confirmText,
		confirmButtonColor: '#81c147',
		cancelButtonText: cancelText,
		cancelButtonColor: '#d33',
	});
}

export const confirmModal = async (title: string, text: string, confirmText: string, cancelText: string, url: string, alt?: string, width?: number) => {
	return Swal.fire({
		title: title,
		text: text,
		imageUrl: (url.length > 0 && url != "no img") ? url : item_img1,
		imageWidth: width ? width : 500,
		imageHeight: width ? width : 500,
		width: width ? width + 60 : 560,
		imageAlt: alt ? alt : "Modal Image",
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonText: confirmText,
		confirmButtonColor: '#81c147',
		cancelButtonText: cancelText,
		cancelButtonColor: '#d33'
	})
}

export const alertInput = async (title: string, text: string, placeholder: string) => {
	const { value: newValue } = await Swal.fire({
		title: title,
		input: 'text',
		inputLabel: text,
		inputPlaceholder: placeholder,
		showCancelButton: true,
		inputValidator: (value) => {
			if (!value) { return 'You need to write something!' }
			return "";
		}
	})

	return newValue;
}

export const confirmInputModal = async (title: string, text: string, confirmText: string, cancelText: string, placeholder: string, url: string, alt?: string) => {
	return await Swal.fire({
		title: title,
		imageUrl: (url.length > 0 && url != "no img") ? url : item_img1,
		imageAlt: alt ? alt : "Modal Image",
		input: 'text',
		inputLabel: text,
		inputPlaceholder: placeholder,
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonText: confirmText,
		confirmButtonColor: '#81c147',
		cancelButtonText: cancelText,
		cancelButtonColor: '#d33',
		inputValidator: (value) => {
			if (!value) {
				return '빈칸을 채워주세요!'
			} else if (isNaN(Number(value))) {
				return '숫자로 입력해주세요!';
			}
			return "";
		}
	})
}

