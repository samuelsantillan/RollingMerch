//Si no hay usuario logueado te redirige a index

const user = JSON.parse(localStorage.getItem('login_exitoso')) || false
if(!user){
    window.location.href = '../html/error404.html'
}

//Funcion Cerrar Sesion

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    Swal.fire({
        icon: 'warning',
        title: 'Cerrar Sesión?',
        showCancelButton: true,
        confirmButtonText: 'Aceptar', 
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#C10001',
        cancelButtonColor: '#9A9693',
        background: '#31302F',
        color: 'white',
        backdrop: `rgba(0,0,14,0.4)` 
      }).then((result) => {        
        if (result.isConfirmed) {
            localStorage.removeItem('login_exitoso')
            window.location.href = '../index.html'
        } else if (result.isDenied) {
          return
        }
      })
});

