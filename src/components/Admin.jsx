import knightGif from "../assets/knight-code.gif"
import matrixGif from "../assets/matrix.gif"
import { useNavigate } from "react-router-dom"

export default function Admin({ manejarLoginAdmin }) {
    const navigate = useNavigate()

    function handleAdminLogout() {
        manejarLoginAdmin()
        navigate("/productos")
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 2000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <section
                className="about-section"
                style={{
                    maxWidth: 900,
                    background: "rgba(42,42,50,0.5)",
                    borderRadius: 12,
                    boxShadow: "0 4px 16px #a33f3f",
                    padding: 32,
                    textAlign: "center"
                }}>
                <h2
                    className="login-title"
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        background: "#ffdac4",
                        color: "#181818",
                        borderRadius: 8,
                        padding: "0.2em 0.4em",
                        display: "inline-block"
                    }}>
                    Panel de Administración
                </h2>
                <div
                    style={{
                        position: "relative",
                        width: "50vw",
                        maxWidth: 700,
                        margin: "32px auto",
                        aspectRatio: "16/9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <img
                        src={knightGif}
                        alt="Knight code"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 12,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1
                        }}
                    />
                    <img
                        src={matrixGif}
                        alt="Matrix code"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: 12,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            opacity: 0.7
                        }}
                    />
                </div>
                <button
                    className="btn-login-estilo"
                    style={{ marginTop: 32 }}
                    onClick={handleAdminLogout}>
                    Cerrar sesión Admin
                </button>
            </section>
        </div>
    )
}
