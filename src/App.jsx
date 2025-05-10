import { useState } from "react"
import "./App.css"
import Home from "./layouts/Home"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Nav from "./components/Nav"
import Header from "./components/Header"
import ProductosContainer from "./components/ProductosContainer"
import Carrito from "./components/Carrito"
import About from "./components/About"
import Contacto from "./components/Contacto"

function AppContent() {
    const location = useLocation()
    const [productosCarrito, setProductosCarrito] = useState([])

    function funcionCarrito(producto) {
        const existe = productosCarrito.find((p) => p.id === producto.id)
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
            const nuevoCarrito = [...productosCarrito, producto]
            setProductosCarrito(nuevoCarrito)
        }
    }

    function borrarProductoCarrito(id) {
        const nuevoCarrito = productosCarrito.filter((p) => p.id !== id)
        setProductosCarrito(nuevoCarrito)
    }

    const isHomePage = location.pathname === "/"

    const navHeight = 40
    const headerOnHomeHeight = 210

    const fixedTopContainerStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.12)"
    }

    const totalPaddingTop = isHomePage
        ? `${navHeight + headerOnHomeHeight + 1}px`
        : `${navHeight}px`

    const contentWrapperStyle = {
        paddingTop: totalPaddingTop
    }

    return (
        <div className="app-container">
            <div style={fixedTopContainerStyle}>
                <Nav productosCarrito={productosCarrito} />
                {isHomePage && <Header />}
            </div>
            <div className="content-wrapper" style={contentWrapperStyle}>
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
    )
}

function App() {
    //basename: ruta en GitHub-pages para los Link
    const basename = "/ecomerce-0.2/"
    return (
        <Router basename={basename}>
            <AppContent />
        </Router>
    )
}

export default App
