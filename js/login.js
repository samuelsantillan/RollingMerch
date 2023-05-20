const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const Users = JSON.parse(localStorage.getItem('users')) || []

    const usuarioValido = Users.find(user => user.email === email && user.password === password)
    if(!usuarioValido){   
        loginForm.reset();     
        Swal.fire({
            icon: 'error',
            title: 'Usuario y/o contraseña incorrectos!',
            confirmButtonColor: '#C10001',
            background: '#31302F',
            color: 'white'           
          })            
    }else if(usuarioValido.email === "admin@gmail.com" && usuarioValido.password === 'Admin123'){                 
        localStorage.setItem('login_exitoso', JSON.stringify(usuarioValido))
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Bienvenido ${usuarioValido.name}`,
            showConfirmButton: false
            })
        setTimeout(function(){
            window.location.href = '../html/paginaAdmin.html';
        }, 1000);           
    }else{        
        localStorage.setItem('login_exitoso', JSON.stringify(usuarioValido))    
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Bienvenido ${usuarioValido.name}`,
            showConfirmButton: false
            })
        setTimeout(function(){
            window.location.href = '../html/home.html' ;
        }, 1000);             
    }
})

