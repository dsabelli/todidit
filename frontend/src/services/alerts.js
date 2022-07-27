import Swal from "sweetalert2";

const alert = (title) => {
  const alert = Swal.fire({
    title: "Are you sure you want to delete?",
    text: `Project ${title}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#009485",
    background: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  return alert;
};

const success = (title) => {
  return Swal.fire({
    background: "text-primary",
    title: "Deleted!",
    text: `Project ${title} has been deleted.`,
    icon: "success",
  });
};

const userAlert = () => {
  const alert = Swal.fire({
    title: "Are you sure you want to delete your account?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#009485",
    background: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  return alert;
};

const userSuccess = () => {
  return Swal.fire({
    background: "#000",
    title: "Deleted!",
    text: `Your account has successfully been deleted. Thank you for using toDidit.`,
    icon: "success",
  });
};

export default { alert, success, userAlert, userSuccess };
