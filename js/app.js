const modalContainer = document.getElementById("modal-container");
const verCarrito = document.getElementById("verCarrito");

const userLogged = JSON.parse(localStorage.getItem('login_exitoso'));

const addFavorites = (item) => {
  const wishlists = JSON.parse(localStorage.getItem('wishlists')) || [];
  const userWishlist = wishlists.find(list => list.owner === userLogged.email) || {
    owner: userLogged.email,
    products: [],
  };
  
  // AGREGAR ITEM Y CONTROLAR QUE NO EXISTA YA DENTRO DE LA LISTA
  const itemFound = userWishlist.products.find(product => product.id === item.id)
  if (itemFound) {
    alert('producto ya en lista');
  } else {
    userWishlist.products.push(item);

    // CONTROLA SI HAY UNA LISTA ASIGNADA A UN USUARIO Y EN EL CASO DE QUE NO, LA AGREGA A LAS LISTAS
    const listFound = wishlists.find(list => list.owner === userWishlist.owner);
    if (listFound) {
      const index = wishlists.indexOf(listFound);
      wishlists.splice(index, 1, userWishlist)
    } else {
      wishlists.push(userWishlist);
    }
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
  }
  pintarCarrito();
}


const eliminarProducto = (id) => {
  const wishlists = JSON.parse(localStorage.getItem('wishlists')) || [];
  const userWishlist = wishlists.find(list => list.owner === userLogged.email) || {
    owner: userLogged.email,
    products: [],
  };

  const updatedProductList = userWishlist.products.filter(product => {
    return product.id !== id;
  });
  
  if (updatedProductList) {
    const updatedWishlist = { ...userWishlist, products: updatedProductList };
    const listFound = wishlists.find(list => list.owner === updatedWishlist.owner);
    const index = wishlists.indexOf(listFound);
    wishlists.splice(index, 1, updatedWishlist)
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
    pintarCarrito();
  } else {
    alert('nada que borrar')
  }
};

const pintarCarrito = () => {
  const wishlists = JSON.parse(localStorage.getItem('wishlists')) || [];
  const userWishlist = wishlists.find(list => list.owner === userLogged.email) || {
    owner: userLogged.email,
    products: [],
  };

  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">Favoritos</h1>
  `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  if (userWishlist.products.length === 0) {
    const carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <h1>LISTA VACIA</h1>
    `;
    modalContainer.append(carritoContent);
  } else {
    userWishlist.products.forEach(product => {
      const carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
        <img src="${product.imagen}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="delete-product"> ❌ </span>
      `;
      modalContainer.append(carritoContent);

      const eliminar = carritoContent.querySelector(".delete-product");
      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });
    });
  }

};

verCarrito.addEventListener("click", pintarCarrito);