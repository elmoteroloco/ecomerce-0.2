import { useState } from "react"
import "./App.css"
import Home from "./layouts/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import ProductosContainer from "./components/ProductosContainer"
import Carrito from "./components/Carrito"
import About from "./components/About"
import Contacto from "./components/Contacto"

function App() {
    const [productosCarrito, setProductosCarrito] = useState([])

    function funcionCarrito(producto) {
        const existe = productosCarrito.find((p) => p.id === producto.id)
        //console.log(existe)
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id) {
                    const productoActualizado = { ...p, cantidad: p.cantidad + producto.cantidad }
                    return productoActualizado
                } else {
                    return p
                }
            })
            setProductosCarrito(carritoActualizado)
        } else {
            // Si no existe, lo agregamos con su cantidad
            const nuevoCarrito = [...productosCarrito, producto]
            setProductosCarrito(nuevoCarrito)
        }
    }

    function borrarProductoCarrito(id) {
        //console.log(id)
        const nuevoCarrito = productosCarrito.filter((p) => p.id !== id)
        setProductosCarrito(nuevoCarrito)
    }
    // basename "forzado" para asegurar que al refrescar GitHub-pages se mantenga en ruta correcta
    const basename = "/ecomerce-0.2/"
    return (
        <Router basename={basename}>
            <div className="app-container">
                {" "}
                {/* Contenedor principal de la app */}
                <Nav productosCarrito={productosCarrito} />
                <div className="content-wrapper">
                    {" "}
                    {/* Contenedor para el contenido de las rutas */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/productos"
                            element={<ProductosContainer functionCarrito={funcionCarrito} />}
                        />
                        <Route
                            path="/carrito"
                            element={
                                <Carrito
                                    productosCarrito={productosCarrito}
                                    funcionBorrar={borrarProductoCarrito}
                                />
                            }
                        />
                        <Route path="/nosotros" element={<About />} />
                        <Route path="/contacto" element={<Contacto />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
