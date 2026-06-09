/* definición de variables */
const loginForm = document.forms['InicioSesion'];
const modalLogin = document.getElementById('modalLogin');
const btnAbrirLogin = document.getElementById('btnAbrirLogin');

/* definición de métodos */
const abrirLogin = () => {
    modalLogin.classList.remove('oculto');
};

const getDatosLogin = () => {
    const datos = {
        usuario: loginForm['usuario'].value,
        contrasena: loginForm['contrasena'].value,
    };
    return datos;
};

const validarLogin = (datos) => {
    const msgUsuario = document.getElementById('msgInputUsuario');
    const msgContrasena = document.getElementById('msgInputContra');

    if (!datos.usuario) {
        msgUsuario.style.display = 'block';
    } else {
        msgUsuario.style.display = 'none';
    }

    if (!datos.contrasena) {
        msgContrasena.style.display = 'block';
    } else {
        msgContrasena.style.display = 'none';
    }
};

const iniciarSesion = async () => {
    try {
        const datos = getDatosLogin();
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
        const body = await response.json();
        const status = response.status;
        if (status == 200) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('usuario', body.usuario);
            localStorage.setItem('nombre', body.nombre);
            localStorage.setItem('rol', body.rol);
            window.location.href = 'conductores.html';
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
        showModal('Error al conectar con el servidor', 'error');
    }
    console.log('Fin del request...');
};

const cerrarSesion = async () => {
    try {
        const tkn = localStorage.getItem('token');
        await fetch('http://127.0.0.1:8000/logout', {
            method: 'post',
            headers: {
                'Authorization': tkn,
            },
        });
    } catch (ex) {
        console.error('Error en el servicio');
    }
    localStorage.clear();
    window.location.href = 'index.html';
};

/* definición de eventos */
btnAbrirLogin.addEventListener('click', () => {
    abrirLogin();
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const datos = getDatosLogin();
    validarLogin(datos);
    if (!datos.usuario || !datos.contrasena) {
        showModal('Todos los campos son obligatorios', 'error');
    } else {
        iniciarSesion();
    }
});

loginForm.addEventListener('reset', () => {
    modalLogin.classList.add('oculto');
    document.getElementById('msgInputUsuario').style.display = 'none';
    document.getElementById('msgInputContra').style.display = 'none';
});