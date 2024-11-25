const textoUsuario = document.querySelector(".usuario-nombre");
const logoutButton = document.querySelector(".logout");
const user = JSON.parse(localStorage.getItem("user"));

textoUsuario.innerText = user.nombre.toUpperCase(); //Cambiamos el nombre del usuario logueado en el encabezado

//Creamos la función de cerrar sesión
const logoutFunction = async () => {
  try {
    const response = await axios.post("/usuario/logout");
    if (response.statusText === "OK") {
      alert("Hasta luego! Vuelve pronto...");
      localStorage.clear("user");
      window.location.href = "/";
    }
  } catch (error) {
    console.log("Error al cerrar la sesión", error);
    alert("No se pudo cerrar la sesión correctamente");
  }
};

logoutButton.addEventListener("click", logoutFunction);
