import Swal from "sweetalert2";

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

export const alertInfo = (title: string, text: string) => {
	return Swal.fire({
		icon: 'info',
		title: title,
		text: text,
	});
}

export const alertModal = async (title:string, text:string, url:string, alt?:string, width?:number) => {
	return Swal.fire({
		title: title,
		text: text,
		imageUrl: url,
		imageAlt: alt?alt:"Modal Image",
		imageWidth: width?width:380,
		imageHeight: width?width:380,
		width:width?width+60:470,

	})
}

export const confirmSuccess = async (title: string, text: string, confirmText: string, cancelText: string) => {
	return Swal.fire({
		icon: 'success',
		title: title,
		text: text,
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
		showCancelButton: true,
		confirmButtonText: confirmText,
		confirmButtonColor: '#81c147',
		cancelButtonText: cancelText,
		cancelButtonColor: '#d33',
	});
}

export const confirmModal = async (title:string, text:string, confirmText: string, cancelText: string, url:string, alt?:string, width?:number) => {
	return Swal.fire({
		title: title,
		text: text,
		imageUrl: url,
		imageWidth: width?width:500,
		imageHeight: width?width:500,
		width:width?width+60:560,
		imageAlt: alt?alt:"Modal Image",
		showCancelButton: true,
		confirmButtonText: confirmText,
		confirmButtonColor: '#81c147',
		cancelButtonText: cancelText,
		cancelButtonColor: '#d33'
	})
}

