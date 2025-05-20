import "../styles/Carrito.css"
// import { useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx"

export default function Carrito({ productosCarrito, funcionBorrar }) {
    const total = productosCarrito.reduce((acumulador, producto) => {
        return acumulador + producto.precio * producto.cantidad
    }, 0)

    function funcionDisparadora(id) {
        funcionBorrar(id)
    }

    return (
        <div className="carrito-conteiner">
            <div
                className="carrito-titulos"
                style={{
                    background: "#ffdac4",
                    color: "#181818",
                    borderRadius: 8,
                    padding: "0",
                    marginBottom: 8,
                    fontWeight: "bold"
                }}>
                <h2 className="carrito-titulo-producto"> Producto </h2>
                <h2 className="carrito-titulo-descripcion">Descripción</h2>
                <h2> </h2>
                <h2> Cantidad</h2>
                <h2> Precio</h2>
                <h2> Sub total</h2>
                <h2> </h2>
            </div>
            {productosCarrito.length > 0 ? (
                productosCarrito.map((producto) => (
                    <CarritoCard
                        key={producto.id}
                        producto={producto}
                        funcionDisparadora={funcionDisparadora}
                    />
                ))
            ) : (
                <p className="carrito-vacio-mensaje">Carrito vacío</p>
            )}
            {productosCarrito.length > 0 ? (
                <span className="carrito-total-pagar">Total a pagar: $ {total}</span>
            ) : null}
        </div>
    )
}
