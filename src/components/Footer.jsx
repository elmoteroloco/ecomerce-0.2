import { Container, Row, Col } from "react-bootstrap"
import { BsYoutube, BsReddit, BsGithub, BsWhatsapp } from "react-icons/bs"

function Footer() {
    const footerStyle = {
        backgroundColor: "darkred",
        padding: "2px 0",
        textAlign: "center",
        color: "white",
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1030
    }

    return (
        <footer style={footerStyle}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
                        <p className="mb-1">&copy; 2025 - Crisol E-commerce</p>
                        <p style={{ fontSize: "0.6rem", opacity: 0.7 }} className="mb-0">
                            Este sitio web es un proyecto personal desarrollado con fines educativos
                            y de demostración. No representa una entidad comercial real ni ofrece
                            productos/servicios para la venta.
                        </p>
                    </Col>
                    <Col md={6} className="text-md-end text-center">
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light me-3">
                            <BsYoutube size={24} />
                        </a>
                        <a
                            href="https://reddit.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light me-3">
                            <BsReddit size={24} />
                        </a>
                        <a
                            href="https://Github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light me-3">
                            <BsGithub size={24} />
                        </a>
                        <a
                            href="https://whatsapp.com"
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
