const adminElement = document.querySelectorAll(".admin-element");

//Al cargar la página "principal" verifique si el usuario tiene el rol de administrador, si no es asi, oculta elementos en la página
document.addEventListener("DOMContentLoaded", () => {
  if (user.rol !== "Administrador") {
    adminElement.forEach((el) => {
      el.style.display = "none";
    });
  }
});
