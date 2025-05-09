import "../styles/Carrito.css"
// import { useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx"

export default function Carrito({ productosCarrito, funcionBorrar }) {
    //console.log("Productos: " + productosCarrito)

    const total = productosCarrito.reduce(
        //(subTotal, producto) => subTotal + producto.precio * producto.cantidad,
        (acumulador, producto) => {
            const precio = parseFloat(producto.precio)
            // Convertimos cantidad a número para la operación,
            // asumiendo que si no es un número válido, la multiplicación resultará en NaN
            // lo cual será manejado por la condición !isNaN(total) al mostrar.
            const cantidad = parseInt(producto.cantidad, 10)

            if (isNaN(precio)) {
                // console.warn(
                //     `Producto con ID ${producto.id} tiene precio no numérico: ${producto.precio}. No se sumará al total.`
                // );
                return acumulador // No sumar este producto si el precio es inválido
            }
            // Si cantidad fuera NaN, precio * cantidad también sería NaN.
            return acumulador + precio * cantidad
        },
        0
    )

    function funcionDisparadora(id) {
        funcionBorrar(id)
    }

    //console.log("Total: " + total)

    return (
        <div className="carrito-conteiner">
            <div className="carrito-titulos">
                <h2 className="carrito-titulo-producto"> Producto </h2>
                <h2 className="carrito-titulo-descripcion">Descripción</h2>
                <h2> </h2>
                <h2> Cantidad </h2>
                <h2> Precio unitario </h2>
                <h2> Sub total </h2>
                <h2> </h2>
            </div>
            {productosCarrito.length > 0 ? (
                // productosCarrito.map((producto) => (
                //     <CarritoCard producto={producto} funcionDisparadora={funcionDisparadora} />
                productosCarrito.map(
                    (
                        producto // Añadir key a los elementos de la lista
                    ) => (
                        <CarritoCard
                            key={producto.id}
                            producto={producto}
                            funcionDisparadora={funcionDisparadora}
                        />
                    )
                )
            ) : (
                <p>Carrito vacío</p>
            )}
            {/* {total > 0 ? <span>Total a pagar: {total.toFixed(2)} $</span> : <></>} */}
            {/* Mostrar el total si hay productos y el total es un número válido (incluyendo 0.00) */}
            {productosCarrito.length > 0 && !isNaN(total) ? (
                <span className="carrito-total-pagar">Total a pagar: {total.toFixed(2)} $</span>
            ) : null}
        </div>
    )
}
