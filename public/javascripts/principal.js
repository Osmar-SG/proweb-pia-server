const adminElement = document.querySelectorAll(".admin-element");

document.addEventListener("DOMContentLoaded", () => {
  if (user.rol !== "Administrador") {
    adminElement.forEach((el) => {
      el.style.display = "none";
    });
  }
});
