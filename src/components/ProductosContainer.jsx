import { useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "./Card"

function ProductosContainer({ functionCarrito }) {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const JSONBIN_URL = "https://api.jsonbin.io/v3/b/681d10b68561e97a50101e33/latest"

    useEffect(() => {
        fetch(JSONBIN_URL)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    // Si 'respuesta' no es OK (ej. 404, 500) se fuerza un error para el .catch()
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
        return <p>Cargando productos...</p>
    } else if (error) {
        return <p>{error}</p>
    } else if (productos.length === 0) {
        return <p>No hay productos disponibles en este momento.</p>
    } else {
        return (
            <div className="productos-conteiner">
                {productos.map((producto) => (
                    <Card producto={producto} funcionCarrito={functionEnProductos} />
                ))}
            </div>
        )
    }
}

export default ProductosContainer
