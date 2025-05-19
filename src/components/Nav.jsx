import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import NavBS from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Badge from "react-bootstrap/Badge"
import Offcanvas from "react-bootstrap/Offcanvas"

function Nav({ productosCarrito, usuarioLogueado, adminLogueado }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Toggle aria-controls="offcanvas-navbar" />
                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    aria-labelledby="offcanvas-navbar-label"
                    placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvas-navbar-label">Menú</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <NavBS className="w-100 justify-content-around">
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
