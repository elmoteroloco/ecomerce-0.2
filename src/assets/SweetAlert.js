import Swal from "sweetalert2"
import "animate.css"

export function dispararSweetBasico(titulo, text, icon, textoBoton) {
    Swal.fire({
        title: titulo,
        text: text,
        icon: icon,
        confirmButtonText: textoBoton,
        theme: "dark",
        showClass: {
            popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutUp"
        }
    })
}
