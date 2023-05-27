//Obtenemos el json del local storage
let productosLS = JSON.parse(localStorage.getItem("productos"));

//Declaro el array de catalogo donde se guardaran los productos del archivo productos.json
let catalogo = [];


//obtengo los productos del archivo 

fetch("../productos.json")
    .then(response => response.json()) 
    .then(data => {
      catalogo = data;
      cargarCatalogo(catalogo);      
    })
    .catch(error => {
      console.error("Error al cargar catalogo:", error);
  });

  const contenedorCatalogo=document.getElementById('catalogo')
    function cargarCatalogo(){
  
      catalogo.forEach(item=> {
              const div = document.createElement("div");
          div.classList.add("item");
          div.innerHTML = `
              <img class="producto-imagen" src="${item.imagen}" alt="${item.nombre}">
              <div class="producto-detalles">
                  <h3 class="producto-titulo">${item.nombre}</h3>
                  <p class="producto-precio">$${item.precio}</p>
                   <a href="./error404.html"> <button class="producto-agregar" id="${item.id}">Agregar</button> </a>                 
              </div>              
              `;
             
          contenedorCatalogo.append(div);
          }
      )  
  };

//Buscar un producto con onclick con modal

const prod = document.getElementById("productoBuscado");
const contenedorBuscados = document.getElementById("buscados");
const section = document.getElementById("section");

const buscarProducto = (producto) => {
  console.log(catalogo);
  //Concateno el array de catalogo y productos
  let allProductos = catalogo.concat(productosLS);    
  let productoFiltrado = allProductos.filter((item) => item.nombre.includes(producto.value)); 
  
  contenedorBuscados.innerHTML = "";
  contenedorBuscados.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Resultados de tu búsqueda</h1>
    `;
  contenedorBuscados.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerHTML = `<i class="fa-regular fa-circle-xmark" style="color: #fafafa;"></i>`;
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
  contenedorBuscados.style.display = "none";
  });

  modalHeader.append(modalbutton);
    
    if(!productoFiltrado[0]  || prod.value == ""){
      prod.value = "";
      contenedorBuscados.style.display = 'none';    
      const h2 = document.createElement("h2");
      h2.classList.add("form-colors");
      h2.innerHTML = `<h2>No se encontraron resultados</h2>`;
      section.append(h2);         
      setTimeout(function(){
        section.innerHTML= "";         
        }, 5000);  
               
    }else{
       prod.value = "";   
        productoFiltrado.map((item) => {
          let busquedaContent = document.createElement("div");
          busquedaContent.classList.add("item");          
          busquedaContent.innerHTML = `
          <img class="producto-imagen" src="${item.imagen}" alt="${item.nombre}">
          <div class="producto-buscados">
              <h3 class="producto-titulo">${item.nombre}</h3>
              <p class="producto-precio">$${item.precio}</p>
                <button  class="producto-agregar" id="${item.id}">Agregar</button>                  
          </div>                          
            `;
      
          contenedorBuscados.append(busquedaContent);
        }        
      ) 
}          
};  
 
contenedorBuscados.style.display = 'none'; 

//Buscar un producto con onclick sin modal

/* const prod = document.getElementById("productoBuscado");
const contenedorBuscados = document.getElementById("buscados");
const section = document.getElementById("section");

const buscarProducto = (producto) => {
  console.log(catalogo);
  //Concateno el array de catalogo y productos
  let allProductos = catalogo.concat(productosLS);    
  let productoFiltrado = allProductos.filter((item) => item.nombre.includes(producto.value));  
    
    if(!productoFiltrado[0]  || prod.value == ""){
      prod.value = "";
      const h2 = document.createElement("h2");
      h2.classList.add("form-colors");
      h2.innerHTML = `<h2>No se encontraron resultados</h2>`;
      section.append(h2);
      setTimeout(function(){
        section.innerHTML= "";
        contenedorBuscados.innerHTML= "";
        }, 5000);         
    }else{
       prod.value = "";   
       const h2 = document.createElement("h2");
       h2.classList.add("form-colors");
       h2.innerHTML = `<h2>Resultado de tu busqueda:</h2>`;
       
       productoFiltrado.map(item=> {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <img class="producto-imagen" src="${item.imagen}" alt="${item.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${item.nombre}</h3>
                <p class="producto-precio">$${item.precio}</p>
                <button class="producto-agregar" id="${item.id}">Agregar</button>                  
            </div>              
            `;
        section.append(h2);
        contenedorBuscados.append(div);
        setTimeout(function(){
          section.innerHTML= "";
          contenedorBuscados.innerHTML= "";
        }, 5000); 
        }
      )        
  }       
};   */


