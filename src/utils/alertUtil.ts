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