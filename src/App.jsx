import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Nav from "./components/Nav"
import Header from "./components/Header"
import ProductosContainer from "./components/ProductosContainer"
import Carrito from "./components/Carrito"
import About from "./components/About"
import Contacto from "./components/Contacto"
import Home from "./layouts/Home"
import ProductoDetalle from "./components/ProductoDetalle"
import Login from "./components/Login"
import Admin from "./components/Admin"
import { dispararSweetBasico } from "./assets/SweetAlert"

function AppContent() {
    const [productosCarrito, setProductosCarrito] = useState([])
    const [usuarioLogueado, setUsuarioLogueado] = useState(false)
    const [adminLogueado, setAdminLogueado] = useState(false)

    function manejarLoginUsuario() {
        if (!usuarioLogueado) {
            dispararSweetBasico(
                "Bienvenido",
                "Sesión de usuario iniciada correctamente",
                "success",
                "Aceptar"
            )
        } else {
            dispararSweetBasico(
                "Sesión cerrada",
                "Has cerrado sesión de usuario",
                "info",
                "Aceptar"
            )
        }
        setUsuarioLogueado(!usuarioLogueado)
        if (adminLogueado) setAdminLogueado(false)
    }

    function manejarLoginAdmin() {
        setAdminLogueado(!adminLogueado)
        if (usuarioLogueado) setUsuarioLogueado(false)
    }

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

    const isHomePage = false // O manejarlo de otra forma si es necesario

    const navHeight = 65
    const headerOnHomeHeight = 529
    const footerHeight = 110

    const fixedTopContainerStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 3px 10px  var(--shadow-color)"
    }

    const totalPaddingTop = isHomePage
        ? `${navHeight + headerOnHomeHeight + 1}px`
        : `${navHeight}px`

    const contentWrapperStyle = {
        paddingTop: totalPaddingTop,
        paddingBottom: `${footerHeight - 23}px`
    }

    return (
        <div className="app-container">
            <div style={fixedTopContainerStyle}>
                <Nav
                    productosCarrito={productosCarrito}
                    usuarioLogueado={usuarioLogueado}
                    adminLogueado={adminLogueado}
                />
                {isHomePage && <Header />}
            </div>
            <div className="content-wrapper" style={contentWrapperStyle}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                usuarioLogueado={usuarioLogueado}
                                adminLogueado={adminLogueado}
                                manejarLoginUsuario={manejarLoginUsuario}
                                manejarLoginAdmin={manejarLoginAdmin}
                            />
                        }
                    />
                    <Route
                        path="/productos"
                        element={<ProductosContainer functionCarrito={funcionCarrito} />}
                    />
                    <Route
                        path="/productos/:id"
                        element={
                            <ProductoDetalle
                                funcionCarrito={funcionCarrito}
                                usuarioLogueado={usuarioLogueado}
                            />
                        }
                    />
                    <Route
                        path="/carrito"
                        element={
                            usuarioLogueado ? (
                                <Carrito
                                    productosCarrito={productosCarrito}
                                    funcionBorrar={borrarProductoCarrito}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            adminLogueado ? (
                                <Admin manejarLoginAdmin={manejarLoginAdmin} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
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
    const basename = "/ecomerce-0.2/"
    return (
        <Router basename={basename}>
            <AppContent />
        </Router>
    )
}

export default App
