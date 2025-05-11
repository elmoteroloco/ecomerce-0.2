import { useState, useEffect } from "react"
import "../styles/Productos.css"
import { dispararSweetBasico } from "../assets/SweetAlert"
import { Card as RBCard, Button } from "react-bootstrap"

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
        <RBCard className={`producto-card h-100 ${isVisible ? "visible" : ""}`}>
            {" "}
            {/* Eliminamos el style={{ width: '18rem' }} y añadimos h-100 para que todas las cards en una fila tengan la misma altura si es necesario. */}
            {/* Se elimina la clase "producto-image" para permitir que Bootstrap maneje el ancho de la imagen de la tarjeta. */}
            <RBCard.Img variant="top" src={producto.imagen} />
            <RBCard.Body className="d-flex flex-column">
                {" "}
                {/* d-flex flex-column para que el footer (botón) se alinee abajo si las cards tienen alturas variables */}
                <RBCard.Title>{producto.nombre}</RBCard.Title>
                <RBCard.Text>{producto.descripcion}</RBCard.Text>
                <RBCard.Text>Precio: {producto.precio.toFixed(2)} $</RBCard.Text>
                <div className="mt-auto">
                    {" "}
                    {/* mt-auto empuja los siguientes elementos (contador y botón) hacia abajo */}
                    <div className="d-flex justify-content-center align-items-center mb-2">
                        <Button variant="outline-secondary" size="sm" onClick={restarContador}>
                            -
                        </Button>
                        <span style={{ margin: "0 10px" }}>{cantidad}</span>
                        <Button variant="outline-secondary" size="sm" onClick={sumarContador}>
                            +
                        </Button>
                    </div>
                    <Button variant="primary" onClick={agregarAlCarrito} className="w-100">
                        Agregar al carrito
                    </Button>
                </div>
            </RBCard.Body>
        </RBCard>
    )
}

export default Card
