import Swal from "sweetalert2";

// 🔴 Confirm (Delete / Archive / Warning)
export const confirmAction = async (message) => {
  const result = await Swal.fire({
    title: "Alert",
    text: message,
    //icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "#22c55e", // green
    cancelButtonColor: "#ef4444", // red
  });

  return result.isConfirmed;
};


// 🟢 Success Alert
export const showSuccess = (message) => {
  Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
};


// 🔴 Error Alert
export const showError = (message) => {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
};