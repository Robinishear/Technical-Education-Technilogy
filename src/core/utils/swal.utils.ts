import Swal from 'sweetalert2';

export const confirmDelete = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  return result.isConfirmed;
};

export const showSuccess = (message: string) => {
  return Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

export const showError = (message: string) => {
  return Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
  });
};

export const showAutoClose = (message: string, timer = 2000) => {
  return Swal.fire({
    title: message,
    timer,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: () => Swal.showLoading(),
  });
};