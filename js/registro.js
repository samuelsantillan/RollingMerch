const registerForm = document.querySelector('#registerForm')

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const lastname = document.querySelector('#lastname').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const usuarioRegistrado = Users.find(user => user.email === email)
    if(usuarioRegistrado){
        registerForm.reset();
        return Swal.fire({
            icon: 'error',
            title: 'El usuario ya está registrado.',
            showConfirmButton: true,  
            confirmButtonColor: '#C10001',          
            background: '#31302F',
            color: 'white',
            backdrop: `rgba(0,0,14,0.4)`           
          })         
    }else{
        Users.push({name: name,lastname: lastname, email: email, password: password})
        localStorage.setItem('users', JSON.stringify(Users))        
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            confirmButtonColor: '#C10001'           
          })
        setTimeout(function(){
            window.location.href = '../index.html';
        }, 1500);
    }
})


    