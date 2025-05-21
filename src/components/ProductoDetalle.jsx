import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { dispararSweetBasico } from "../assets/SweetAlert"
import LoadingBar from "./LoadingBar"

function ProductoDetalle({ funcionCarrito, usuarioLogueado }) {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [cantidad, setCantidad] = useState(1)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`https://682bcefcd29df7a95be47f49.mockapi.io/producto/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status} ${res.statusText}`)
                }
                return res.json()
            })
            .then((producto) => {
                if (producto && producto.id) {
                    setProducto(producto)
                } else {
                    setError("Producto no encontrado.")
                }
                setCargando(false)
            })
            .catch(() => {
                setError("Hubo un error al obtener el producto.")
                setCargando(false)
            })
    }, [id])

    function agregarAlCarrito() {
        if (!usuarioLogueado) {
            dispararSweetBasico(
                "Inicia sesión",
                "Por favor, inicia sesión para agregar productos al carrito.",
                "warning",
                "Ir a login"
            )
            return
        }
        if (cantidad < 1) return
        dispararSweetBasico(
            "Producto agregado",
            "El producto fue agregado al carrito con éxito",
            "success",
            "Cerrar"
        )
        funcionCarrito({ ...producto, cantidad })
    }

    function sumarContador() {
        setCantidad(cantidad + 1)
    }

    function restarContador() {
        if (cantidad > 1) setCantidad(cantidad - 1)
    }

    if (cargando) return <LoadingBar />
    if (error) return <p>{error}</p>
    if (!producto) return null

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "70vh",
                marginTop: "2rem"
            }}>
            <style>{`
                .fade-in-card {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.39,.58,.57,1);
                }
                .fade-in-card.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
            <div className={`fade-in-card visible`} style={{ width: "100%", maxWidth: 500 }}>
                <div
                    className="card shadow-lg tarjeta-opaca"
                    style={{ borderRadius: 18, padding: 24 }}>
                    <div
                        style={{
                            width: "100%",
                            height: "300px",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="card-img-top"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                marginBottom: 24,
                                borderRadius: 12,
                                background: "#fff"
                            }}
                        />
                    </div>
                    <div className="card-body text-center">
                        <h2 className="card-title" style={{ fontSize: "2rem", fontWeight: "bold" }}>
                            {producto.nombre}
                        </h2>
                        <p className="card-text">{producto.descripcion}</p>
                        <p className="card-text" style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                            $ {producto.precio}
                        </p>
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <button
                                className="btn btn-outline-secondary btn-efecto"
                                onClick={restarContador}
                                style={{ fontSize: "1.2rem" }}>
                                -
                            </button>
                            <span style={{ margin: "0 1.2rem", fontSize: "1.2rem" }}>
                                {cantidad}
                            </span>
                            <button
                                className="btn btn-outline-secondary btn-efecto"
                                onClick={sumarContador}
                                style={{ fontSize: "1.2rem" }}>
                                +
                            </button>
                        </div>
                        {!usuarioLogueado && (
                            <p style={{ color: "red", marginTop: "1rem" }}>
                                ATENCIÓN: <br />
                                Iniciar sesión como usuario para agregar productos.
                            </p>
                        )}
                        <button
                            className="btn btn-primary btn-agregar w-100 btn-efecto"
                            onClick={agregarAlCarrito}
                            disabled={!usuarioLogueado}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductoDetalle
