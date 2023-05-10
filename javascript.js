let productos = [];

//Obtener los elementos del DOM

const listaProductos = document.getElementById("lista-productos");
const agregarProductosForm = document.getElementById("agregarProductosForm");
const nombreProducto = document.getElementById("nombreProducto");
const precioProducto = document.getElementById("precioProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const addProductoButton = document.getElementById("addProductoButton");

//Funcion para agregar productos

addProductoButton.addEventListener("click", (e) => {
  e.preventDefault();

  const nombre = nombreProducto.value; // value es el valor que tiene el input
  const precio = precioProducto.value;
  const descripcion = descripcionProducto.value;
  const mode = agregarProductosForm.dataset.mode; // dataset es un objeto que contiene todos los atributos de un elemento
  const editId = agregarProductosForm.dataset.editId;

  if (mode === "add") {
    const id = uuidv4();
    const producto = { id, nombre, precio, descripcion };
    productos.push(producto);
  } else if (mode === "edit") {
    const index = productos.findIndex((producto) => producto.id === editId);
    if (index !== -1) {
      const producto = productos[index];
      producto.nombre = nombre;
      producto.precio = precio;
      producto.descripcion = descripcion;
    }
  }

  //Limpiar el formulario
  agregarProductosForm.reset();
  agregarProductosForm.dataset.mode = "add";
  addProductoButton.textContent = "Agregar";

  //llamar a una funcion que actualiza la lista de productos
  mostrarProductos();
});

// Funcion para editar productos

listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) { // Si cuando escucha el click el elemento tiene la clase edit retorna true 
    const idCapturado = e.target.dataset.id; // dataset es un objeto que contiene todos los atributos de un elemento
    const producto = productos.find((producto) => ( 
      producto.id === idCapturado ));  

    if (producto) {
      document.getElementById("nombreProducto").value = producto.nombre;
      document.getElementById("descripcionProducto").value =
      producto.descripcion;
      document.getElementById("precioProducto").value = producto.precio;

        
      // Setear el formulario para que este en modo editar
      agregarProductosForm.dataset.mode = "edit";
      // almacenar el id del producto que se esta editando
      agregarProductosForm.dataset.editId = id; // va con la linea 29
      // cambiar el texto del boton
      addProductoButton.textContent = "Editar";
    }
  }
});

// Funcion para eliminar productos

listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.dataset.id;
    const index = productos.findIndex((producto) => producto.id === id); // tiene que ser true para que lo encuentre
    if (index !== -1) {
      productos.splice(index, 1);
      mostrarProductos();
    }
  }
});

// Funcion para mostrar los productos en el DOM

const mostrarProductos = () => {
  listaProductos.querySelector("tbody").innerHTML = ""; // para que pueda resetear la tabla
  productos.forEach((producto) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${producto.nombre}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.precio}</td>
    <td>
    <button class="btn btn-primary edit" data-id="${producto.id}">Editar</button>
    <button class="btn btn-danger delete" data-id="${producto.id}">Eliminar</button>
    </td>
    `;
    listaProductos.querySelector("tbody").appendChild(tr);
  });

  // Guardar los productos en el local storage
  localStorage.setItem("productos", JSON.stringify(productos));
};

// Funcion para generar un id unico

function uuidv4() {
  return crypto.randomUUID();
}
// obtener los productos del local storage

const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));
 
if (productosLocalStorage) {
  productos = productosLocalStorage;
  mostrarProductos();
}