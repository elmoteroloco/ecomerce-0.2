import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import NavBS from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Badge from "react-bootstrap/Badge"

function Nav({ productosCarrito, usuarioLogueado, adminLogueado }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ width: "100%" }}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Nav
