import { useState, useEffect } from "react"
import "../styles/Productos.css"
import { Card as RBCard, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function Card({ producto }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 50)
        return () => clearTimeout(timer)
    }, [])

    return (
        <RBCard className={`producto-card h-100 tarjeta-opaca ${isVisible ? "visible" : ""}`}>
            <RBCard.Img variant="top" src={producto.imagen} />
            <RBCard.Body className="d-flex flex-column justify-content-end">
                <Link
                    to={`/productos/${producto.id}`}
                    style={{ textDecoration: "none", width: "100%" }}>
                    <Button variant="primary" className="w-100 btn-agregar">
                        Ver detalles del producto
                    </Button>
                </Link>
            </RBCard.Body>
        </RBCard>
    )
}

export default Card
