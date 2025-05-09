import { useState, useEffect } from "react"
import "../styles/Productos.css"
import { dispararSweetBasico } from "../assets/SweetAlert"

function Card({ producto, funcionCarrito }) {
    const [cantidad, setCantidad] = useState(1)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 50)
        return () => clearTimeout(timer)
    }, [])

    function agregarAlCarrito() {
        if (cantidad < 1) return
        dispararSweetBasico(
            "Producto Agregado",
            "El producto fue agregado al carrito con éxito",
            "success",
            "Cerrar"
        )
        funcionCarrito({ ...producto, cantidad }) // Pasamos también la cantidad
    }

    function sumarContador() {
        setCantidad(cantidad + 1)
    }

    function restarContador() {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    return (
        <div className={`producto-card ${isVisible ? "visible" : ""}`}>
            <h2 style={{ color: "black" }}>{producto.nombre}</h2>
            <p style={{ color: "black" }}>{producto.descripcion}</p>
            <img className="producto-image" src={producto.imagen}></img>
            <p style={{ color: "black" }}>{producto.precio} $</p>
            <div>
                <button onClick={restarContador}>-</button>
                <span style={{ margin: "0 10px", color: "black" }}>{cantidad}</span>
                <button onClick={sumarContador}>+</button>
            </div>
            <button onClick={agregarAlCarrito} style={{ color: "black" }}>
                Agregar al carrito
            </button>
        </div>
    )
}

export default Card
