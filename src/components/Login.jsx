import { useNavigate } from "react-router-dom"

function Login({ usuarioLogueado, adminLogueado, manejarLoginUsuario, manejarLoginAdmin }) {
    const navigate = useNavigate()

    function handleUserLogin() {
        manejarLoginUsuario()
        navigate("/productos")
    }

    function handleAdminLogin() {
        manejarLoginAdmin()
        navigate("/admin")
    }

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2 className="login-title">Iniciar/Cerrar Sesión</h2>
            <button
                className="btn-login-estilo btn-efecto"
                onClick={handleUserLogin}
                style={{ margin: "1rem" }}>
                {usuarioLogueado ? "Cerrar sesión Usuario" : "Iniciar sesión Usuario"}
            </button>
            <button
                className="btn-login-estilo btn-efecto"
                onClick={handleAdminLogin}
                style={{ margin: "1rem" }}>
                {adminLogueado ? "Cerrar sesión Admin" : "Iniciar sesión Admin"}
            </button>
        </div>
    )
}

export default Login
