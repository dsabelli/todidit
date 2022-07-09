import Swal from "sweetalert2";

const alert = (title) => {
  const alert = Swal.fire({
    title: "Are you sure you want to delete?",
    text: `Project ${title}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  return alert;
};

const success = (title) => {
  return Swal.fire("Deleted!", `Project ${title} has been deleted.`, "success");
};

export default { alert, success };
