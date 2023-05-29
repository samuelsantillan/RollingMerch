//Obtenemos el json del local storage
let productos = JSON.parse(localStorage.getItem("productos"));

//Cargamos las cards de los productos
function cargarCatalogoAdm() {
  const contenedorCatalogo2 = document.getElementById("catalogo2");

  productos.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
        <img class="producto-imagen" src="${item.imagen}" alt="${item.nombre}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${item.nombre}</h3>
            <p class="producto-precio">$${item.precio}</p>
            <button  class="producto-agregar" id="${item.id}">Favoritos</button>      
        </div>
      `;

    contenedorCatalogo2.append(div);
  });
}

cargarCatalogoAdm();