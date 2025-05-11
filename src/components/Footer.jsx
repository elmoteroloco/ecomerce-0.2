import { Container, Row, Col } from "react-bootstrap"
import { BsYoutube, BsReddit, BsGithub, BsWhatsapp } from "react-icons/bs"

function Footer() {
    const footerStyle = {
        backgroundColor: "darkred", // Puedes cambiar esto a 'var(--bs-dark)' o un color de tu paleta
        padding: "20px 0", // Ajustado para que el Container maneje el padding horizontal
        textAlign: "center",
        // marginTop: "30px", // No es necesario si es fixed
        color: "white", // Cambiado para mejor contraste con fondo oscuro
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1030 // Para asegurar que esté sobre otros elementos si es necesario
    }

    return (
        <footer
            style={footerStyle}
            // Opcionalmente, podrías usar clases de Bootstrap aquí también si prefieres:
            // className="bg-dark text-light fixed-bottom py-3"
        >
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
                        <p className="mb-1">&copy; 2025 - Crisol E-commerce</p>
                        <p style={{ fontSize: "0.8rem", opacity: 0.7 }} className="mb-0">
                            Este sitio web es un proyecto personal desarrollado con fines educativos
                            y de demostración. No representa una entidad comercial real ni ofrece
                            productos/servicios para la venta.
                        </p>
                    </Col>
                    <Col md={6} className="text-md-end text-center">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light me-3">
                            <BsYoutube size={24} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light me-3">
                            <BsReddit size={24} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light me-3">
                            <BsGithub size={24} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light">
                            <BsWhatsapp size={24} />
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer
