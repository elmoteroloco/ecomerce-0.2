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
                    // Si la respuesta no es OK (ej. 404, 500),
                    // lanzamos un error para que lo capture el .catch()
                    throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`)
                }
                return respuesta.json()
            })
            .then((datos) => {
                if (datos && datos.record) {
                    // setProductos(datos.record)
                    // console.log("Productos cargados desde jsonbin:", datos.record)
                    // Transformar los productos para asegurar que el precio sea numérico
                    const productosTransformados = datos.record.map((prod) => ({
                        ...prod,
                        // Intenta convertir el precio a número. Si falla, será NaN.
                        // También nos aseguramos de que si el precio no existe o es inválido, se asigne NaN
                        // para que las comprobaciones posteriores (isNaN) funcionen correctamente.
                        precio:
                            prod.precio !== undefined && prod.precio !== null
                                ? parseFloat(prod.precio)
                                : NaN
                    }))
                    setProductos(productosTransformados)
                    // console.log("Productos cargados desde jsonbin (original):", datos.record);
                    // console.log("Productos transformados (precio como número):", productosTransformados);
                } else {
                    // console.warn(
                    //     "La respuesta de jsonbin.io no contiene la propiedad 'record' esperada:",
                    //     datos
                    // )
                    // setProductos(datos || [])
                    // console.warn(
                    //     "La respuesta de jsonbin.io no contiene la propiedad 'record' esperada:",
                    //     datos
                    // );
                    setProductos(datos && Array.isArray(datos) ? datos : []) // Asegurar que sea un array
                }
                setCargando(false)
            })
            .catch((err) => {
                // Cambiado 'error' a 'err' para evitar sombrear el estado 'error'
                //console.error("Error al cargar productos:", err)
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
