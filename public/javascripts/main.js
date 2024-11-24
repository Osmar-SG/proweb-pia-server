const loginEmail = document.querySelector(".login_email");
const loginPassword = document.querySelector(".login_password");
const loginButton = document.querySelector(".login_button");

const userLogin = async () => {
  try {
    const response = await axios.post("/usuario/login", {
      email: loginEmail.value,
      contraseña: loginPassword.value,
    });
    if (response.data && response.data.nombre) {
      //Guardamos los datos recibidos de la sesión en localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      //Después guardar la sesión en el locaStorage, redireccionamos a la página principal
      window.location.href = "/principal";
    }
  } catch (error) {
    console.log("error", error);
    if (error.status === 401) {
      alert(error.response.data.message);
      window.location.href = "/";
    } else if (error.status === 400) {
      alert(
        "Usuario no encontrado en el sistema, verifica la información o registrate."
      );
    }
  }
};

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  userLogin();
});

// document.addEventListener('DOMContentLoaded', function() {
//     const modals = ['pizza', 'bebidas', 'combos', 'extras'];

//     modals.forEach(modalType => {
//         const button = document.getElementById(`${modalType}Button`);
//         const modal = document.getElementById(`${modalType}Modal`);
//         const closeButton = modal.querySelector('.close-btn');
//         const itemList = document.getElementById(`${modalType}List`);

//         async function cargarItems() {
//             try {

//                 itemList.innerHTML = '';

//             } catch (error) {
//                 console.error(`Error loading ${modalType}:`, error);
//             }
//         }

//         button.addEventListener('click', () => {
//             modal.style.display = 'block';
//             cargarItems();
//         });

//         closeButton.addEventListener('click', () => {
//             modal.style.display = 'none';
//         });

//         window.addEventListener('click', (event) => {
//             if (event.target === modal) {
//                 modal.style.display = 'none';
//             }
//         });
//     });
// });
