import { useNavigate } from "react-router-dom"

function Login({ usuarioLogueado, adminLogueado, manejarLoginUsuario, manejarLoginAdmin }) {
    const navigate = useNavigate()

    function handleUserLogin() {
        manejarLoginUsuario()
        navigate("/")
    }

    function handleAdminLogin() {
        manejarLoginAdmin()
        navigate("/")
    }

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2 className="login-title">Iniciar/Cerrar Sesión</h2>
            <button
                className="btn-login-estilo"
                onClick={handleUserLogin}
                style={{ margin: "1rem" }}>
                {usuarioLogueado ? "Cerrar sesión Usuario" : "Iniciar sesión Usuario"}
            </button>
            <button
                className="btn-login-estilo"
                onClick={handleAdminLogin}
                style={{ margin: "1rem" }}>
                {adminLogueado ? "Cerrar sesión Admin" : "Iniciar sesión Admin"}
            </button>
        </div>
    )
}

export default Login
