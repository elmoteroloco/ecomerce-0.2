import { useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "./Card"
import LoadingBar from "./LoadingBar"
import { Container, Row, Col } from "react-bootstrap"

function ProductosContainer() {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const API_URL = "https://682bcefcd29df7a95be47f49.mockapi.io/producto"

    useEffect(() => {
        fetch(API_URL)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`)
                }
                return respuesta.json()
            })
            .then((datos) => {
                setProductos(Array.isArray(datos) ? datos : [])
                setCargando(false)
            })
            .catch((err) => {
                setError(`Hubo un problema al cargar los productos: ${err.message}`)
                setCargando(false)
            })
    }, [])

    if (cargando) {
        return <LoadingBar />
    } else if (error) {
        return <p>{error}</p>
    } else if (productos.length === 0) {
        return <p>No hay productos disponibles en este momento.</p>
    } else {
        return (
            <Container fluid className="productos-conteiner-bootstrap py-3">
                <Row>
                    {productos.map((producto) => (
                        <Col key={producto.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
                            <Card producto={producto} />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default ProductosContainer
