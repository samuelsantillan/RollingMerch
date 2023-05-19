let catalogo = [];

//obtengo los productos del archivo 

fetch("../productos.json")
    .then(response => response.json()) 
    .then(data => {
      catalogo = data;
      cargarCatalogo(catalogo);
      console.log(catalogo)
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
              <img class="producto-imagen" src="${item.imagen}" alt="${item.titulo}">
              <div class="producto-detalles">
                  <h3 class="producto-titulo">${item.titulo}</h3>
                  <p class="producto-precio">$${item.precio}</p>
                  <button class="producto-agregar" id="${item.id}">Agregar</button>                  
              </div>              
              `;
  
          contenedorCatalogo.append(div);
          }
      )
  
  };
  
//Buscar un producto

const prod = document.getElementById("productoBuscado");

const buscarProducto = (producto) => {
  console.log(catalogo);
  let productoFiltrado = catalogo.filter((item) => item.titulo == producto.value);    
  console.log(productoFiltrado) 
  console.log(producto.value);
  console.log(catalogo.includes(productoFiltrado[0]));    
    if(!productoFiltrado[0]){
      prod.value = "";
      return alert('Producto no encontrado.') ;           
    }else{
      prod.value = "";
      return  alert('Producto encontrado: ' + productoFiltrado[0].titulo);      
  }     
};  
   

/* const buscar = async (producto) => {
  try {
      const res = await fetch('/productos.json')
      const catalogo = await res.json()

      var prod = document.getElementById("productoBuscado").value
      let productoFiltrado = catalogo.filter((item) => item.titulo == producto.value);
      if(!productoFiltrado[0]){
        prod.value = "";
        return alert('Producto no encontrado.') ;           
      }else{
        prod.value = "";
        console.log(productoFiltrado)
        cargarCatalogo(productoFiltrado)    
    }     
      
  }
  catch (e){
      console.log(e)
  }
} */