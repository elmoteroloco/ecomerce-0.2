import { useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "./Card"
import LoadingBar from "./LoadingBar"
import { Container, Row, Col } from "react-bootstrap"

function ProductosContainer({ functionCarrito }) {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const JSONBIN_URL = "https://api.jsonbin.io/v3/b/681d10b68561e97a50101e33/latest"

    useEffect(() => {
        fetch(JSONBIN_URL)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`)
                }
                return respuesta.json()
            })
            .then((datos) => {
                if (datos && datos.record) {
                    const productosTransformados = datos.record.map((prod) => ({
                        ...prod,
                        precio: parseFloat(prod.precio) || 0
                    }))
                    setProductos(productosTransformados)
                } else {
                    setProductos(datos && Array.isArray(datos) ? datos : [])
                }
                setCargando(false)
            })
            .catch((err) => {
                setError(`Hubo un problema al cargar los productos: ${err.message}`)
                setCargando(false)
            })
    }, [])

    function functionEnProductos(producto) {
        functionCarrito(producto)
    }

    if (cargando) {
        return <LoadingBar />
    } else if (error) {
        return <p>{error}</p>
    } else if (productos.length === 0) {
        return <p>No hay productos disponibles en este momento.</p>
    } else {
        return (
            <Container fluid className="productos-conteiner-bootstrap py-3">
                {" "}
                {/* Reemplazamos el div y añadimos padding vertical */}
                <Row>
                    {productos.map((producto) => (
                        <Col key={producto.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
                            {" "}
                            {/* mb-4 para margen inferior, d-flex para que h-100 en Card funcione bien */}
                            <Card producto={producto} funcionCarrito={functionEnProductos} />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default ProductosContainer
