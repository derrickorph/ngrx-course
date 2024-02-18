import Swal from 'sweetalert2';

export const successSweetAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    customClass: {
      confirmButton: 'btn btn-success btn-sm',
    },
    confirmButtonText: 'Ok',
  });
};
export const errorSweetAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    customClass: {
      confirmButton: 'btn btn-danger btn-sm',
    },
    confirmButtonText: 'Ok',
  });
};