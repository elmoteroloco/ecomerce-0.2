import { useState } from "react"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import NavBS from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Badge from "react-bootstrap/Badge"
import Offcanvas from "react-bootstrap/Offcanvas"

function Nav({ productosCarrito, usuarioLogueado, adminLogueado }) {
    const [showOffcanvas, setShowOffcanvas] = useState(false)
    const handleShow = () => setShowOffcanvas(true)
    const handleClose = () => setShowOffcanvas(false)
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Toggle
                    aria-controls="offcanvas-navbar"
                    onClick={handleShow}
                    className="d-lg-none"
                />
                <NavBS className="navbar-nav justify-content-evenly d-none d-lg-flex w-100">
                    {/* Links del menú principal (solo desktop) */}
                    <NavBS.Link as={Link} to="/">
                        Inicio
                    </NavBS.Link>
                    <NavBS.Link as={Link} to="/productos">
                        Productos
                    </NavBS.Link>
                    <NavBS.Link as={Link} to="/nosotros">
                        Nosotros
                    </NavBS.Link>
                    <NavBS.Link as={Link} to="/contacto">
                        Contacto
                    </NavBS.Link>
                    <NavBS.Link as={Link} to="/carrito">
                        Carrito{" "}
                        {productosCarrito.length > 0 && (
                            <Badge bg="success" pill>
                                {productosCarrito.length}
                            </Badge>
                        )}
                    </NavBS.Link>
                    <NavBS.Link as={Link} to="/login">
                        {usuarioLogueado
                            ? "Cerrar sesión Usuario"
                            : !usuarioLogueado && !adminLogueado
                            ? "Login"
                            : null}
                    </NavBS.Link>
                    {adminLogueado && (
                        <NavBS.Link as={Link} to="/login">
                            Cerrar sesión Admin
                        </NavBS.Link>
                    )}
                </NavBS>
                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    aria-labelledby="offcanvas-navbar-label"
                    placement="end"
                    show={showOffcanvas}
                    onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvas-navbar-label">Menú</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <NavBS className="justify-content-evenly d-lg-none">
                            {/* Links del menú Offcanvas (solo mobile) */}
                            <NavBS.Link as={Link} to="/" onClick={handleClose}>
                                Inicio
                            </NavBS.Link>
                            <NavBS.Link as={Link} to="/productos" onClick={handleClose}>
                                Productos
                            </NavBS.Link>
                            <NavBS.Link as={Link} to="/nosotros" onClick={handleClose}>
                                Nosotros
                            </NavBS.Link>
                            <NavBS.Link as={Link} to="/contacto" onClick={handleClose}>
                                Contacto
                            </NavBS.Link>
                            <NavBS.Link as={Link} to="/carrito" onClick={handleClose}>
                                Carrito{" "}
                                {productosCarrito.length > 0 && (
                                    <Badge bg="success" pill>
                                        {productosCarrito.length}
                                    </Badge>
                                )}
                            </NavBS.Link>
                            <NavBS.Link as={Link} to="/login" onClick={handleClose}>
                                {usuarioLogueado
                                    ? "Cerrar sesión Usuario"
                                    : !usuarioLogueado && !adminLogueado
                                    ? "Login"
                                    : null}
                            </NavBS.Link>
                            {adminLogueado && (
                                <NavBS.Link as={Link} to="/login" onClick={handleClose}>
                                    Cerrar sesión Admin
                                </NavBS.Link>
                            )}
                        </NavBS>
                        <span style={{ color: "white", marginLeft: "1rem" }}>
                            {usuarioLogueado && "Usuario logueado"}
                            {adminLogueado && "Admin logueado"}
                        </span>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Nav
