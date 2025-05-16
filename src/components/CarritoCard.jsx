import "../styles/Carrito.css"

function CarritoCard({ producto, funcionDisparadora }) {
    const subtotal = producto.precio * producto.cantidad

    function borrarDelCarrito() {
        funcionDisparadora(producto.id)
    }

    return (
        <div className="carrito-card">
            <h3 className="carrito-producto" style={{ color: "black" }}>
                {producto.nombre}
            </h3>

            <p className="descripcion-carrito" style={{ color: "black" }}>
                {producto.descripcion}
            </p>

            <img className="carrito-image" src={producto.imagen}></img>
            <span style={{ color: "black" }}>{producto.cantidad}</span>
            <div className="carrito-unitario">
                <span style={{ color: "black" }}>$ {producto.precio}</span>
            </div>
            <div className="carrito-sub">
                <span style={{ color: "black" }}>$ {subtotal}</span>
            </div>
            <button
                className="boton-carrito"
                onClick={borrarDelCarrito}
                style={{ backgroundColor: "firebrick", color: "black", fontWeight: "bolder" }}>
                X
            </button>
        </div>
    )
}

export default CarritoCard
