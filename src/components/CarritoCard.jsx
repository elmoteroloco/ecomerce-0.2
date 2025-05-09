import "../styles/Carrito.css"

function CarritoCard({ producto, funcionDisparadora }) {
    // Asegurarse de que precio y cantidad sean números
    const precioNumerico = parseFloat(producto.precio)
    const cantidadNumerica = parseInt(producto.cantidad, 10)
    const subtotal =
        isNaN(precioNumerico) || isNaN(cantidadNumerica) ? 0 : precioNumerico * cantidadNumerica

    function borrarDelCarrito() {
        // console.log("Paso 1")
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
                <span style={{ color: "black" }}>
                    {isNaN(precioNumerico) ? "N/A" : precioNumerico.toFixed(2)} $
                </span>
            </div>
            <div className="carrito-sub">
                <span style={{ color: "black" }}>{subtotal.toFixed(2)} $</span>
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
