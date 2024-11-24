const userEmail = document.querySelector(".user_email");
const userNombre = document.querySelector(".user_nombre");
const userApellido = document.querySelector(".user_apellido");
const userPass = document.querySelector(".user_contraseña");
const confirmPass = document.querySelector(".user_confirm_contraseña");
const userTel = document.querySelector(".user_telefono");
const userDir = document.querySelector(".user_direccion");
const userRol = document.querySelector(".user_rol");
const userEdad = document.querySelector(".user_edad");
const registerButton = document.querySelector(".register_button");

const crearRegistro = async () => {
  try {
    if (userPass.value === confirmPass.value) {
      const response = await axios.post("/usuario", {
        nombre: userNombre.value,
        apellido: userApellido.value,
        edad: userEdad.value,
        direccion: userDir.value,
        telefono: userTel.value,
        status: true,
        email: userEmail.value,
        contraseña: userPass.value,
        rol: userRol.value,
      });
      console.log("response.data", response.data);
      alert(`Bienvenido ${response.data.nombre}`);
      window.location.href = "/";
    } else {
      alert("La confirmación de la contraseña no coincide");
    }
  } catch (error) {
    console.log("error", error);
  }
};

registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  crearRegistro();
});
