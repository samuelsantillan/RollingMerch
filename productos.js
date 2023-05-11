let productos = [];

fetch("productos.json")
    .then(response => response.json()) 
    .then(data => {
        productos = data;
        cargarProducto(productos);
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });


const contenedorProductos=document.getElementById('catalogo')

function cargarProducto(){

    productos.forEach(producto=> {
            const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
        }
    )

}
