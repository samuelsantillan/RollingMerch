//INICIO PAGINA ADMIN

let productos = [];

//Obtener los elementos del DOM

const listaProductos = document.getElementById("lista-productos");
const agregarProductosForm = document.getElementById("agregarProductosForm");
const nombreProducto = document.getElementById("nombreProducto");
const precioProducto = document.getElementById("precioProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const imagenProducto = document.getElementById("urlProducto");
const addProductoButton = document.getElementById("addProductoButton");
const listaUsuarios = document.getElementById("lista-usuarios");

//Funcion para agregar productos

addProductoButton.addEventListener("click", (e) => {
  e.preventDefault();

  const nombre = nombreProducto.value; // value es el valor que tiene el input
  const precio = precioProducto.value;
  const descripcion = descripcionProducto.value;
  const imagen = imagenProducto.value;
  const mode = agregarProductosForm.dataset.mode; // dataset es un objeto que contiene todos los atributos de un elemento
  const editId = agregarProductosForm.dataset.editId;
  if (nombre == "" && precio == "" && descripcion == "" && imagen == "") {
    alert("Ningun campo puede estar vacio");
  } else {
    if (mode === "add") {
      const id = uuidv4();
      const producto = { id, nombre, precio, descripcion, imagen };
      productos.push(producto);
      alert("Producto agregado");
    } else if (mode === "edit") {
      const index = productos.findIndex((producto) => producto.id === editId);
      if (index !== -1) {
        const producto = productos[index];
        producto.nombre = nombre;
        producto.precio = precio;
        producto.descripcion = descripcion;
        producto.imagen = imagen;
        alert("Producto editado");
      }
    }

    //Limpiar el formulario
    agregarProductosForm.reset();
    agregarProductosForm.dataset.mode = "add";
    addProductoButton.textContent = "Agregar";

    //llamar a una funcion que actualiza la lista de productos
    mostrarProductos();
  }
});

// Funcion para editar productos

listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const idCapturado = e.target.dataset.id;
    const producto = productos.find((producto) => producto.id === idCapturado);
    if (producto) {
      document.getElementById("nombreProducto").value = producto.nombre;
      document.getElementById("precioProducto").value = producto.precio;
      document.getElementById("descripcionProducto").value =
        producto.descripcion;
      document.getElementById("urlProducto").value = producto.imagen;
      // Setear el formulario para que este en modo editar
      agregarProductosForm.dataset.mode = "edit";
      // almacenar el id del producto que se esta editando
      agregarProductosForm.dataset.editId = idCapturado; // usar editId en vez de id
      // cambiar el texto del boton
      addProductoButton.textContent = "Editar";
    }
  }
});

// Funcion para eliminar productos

listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const idCapturado = e.target.dataset.id;
    const index = productos.findIndex(
      (producto) => producto.id === idCapturado
    );
    if (index !== -1) {
      productos.splice(index, 1);
      mostrarProductos();
      alert("Producto eliminado");
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
    <td>${producto.precio}</td>
    <td>${producto.descripcion}</td>
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

// Funcion para mostrar los usuarios en el DOM
const Users = JSON.parse(localStorage.getItem('users')) || []

const mostrarUsuarios = () => {
  listaUsuarios.querySelector("tbody").innerHTML = ""; // para que pueda resetear la tabla  

  Users.forEach((usuario) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${usuario.name}</td>
    <td>${usuario.lastname}</td>
    <td>${usuario.email}</td>
    <td>    
    <button class="btn btn-danger delete" data-email="${usuario.email}">Eliminar</button>
    </td>
    `;
    listaUsuarios.querySelector("tbody").appendChild(tr);
  });
}

mostrarUsuarios();

// Funcion para eliminar usuarios

listaUsuarios.addEventListener("click", (e) => {
  
  if (e.target.classList.contains("delete")) {
    const emailCapturado = e.target.dataset.email;
    const index = Users.findIndex(
      (usuario) => usuario.email === emailCapturado
      
    );
    console.log(emailCapturado)
    if (index !== -1) {
      Users.splice(index, 1);
      mostrarUsuarios();
      alert("Usuario eliminado");
      let userJSON = JSON.stringify(Users);
      localStorage.setItem("users", userJSON); 
    }
  }
});

//FIN PAGINA ADMIN

