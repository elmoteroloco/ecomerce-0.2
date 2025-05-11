import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import NavBS from "react-bootstrap/Nav" // Usamos NavBS para el componente Nav de React-Bootstrap
import Navbar from "react-bootstrap/Navbar"
import Badge from "react-bootstrap/Badge"

function Nav({ productosCarrito }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ width: "100%" }}>
            <Container>
                {/* Opcional: Puedes añadir un Brand/Logo aquí si lo deseas */}
                {/* <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand> */}
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
                    </NavBS>
                    <NavBS>
                        <NavBS.Link as={Link} to="/carrito">
                            Carrito{" "}
                            {productosCarrito.length > 0 && (
                                <Badge bg="success" pill>
                                    {productosCarrito.length}
                                </Badge>
                            )}
                        </NavBS.Link>
                    </NavBS>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Nav
