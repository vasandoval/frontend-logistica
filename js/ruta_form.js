/* definición de variables */
const RutaForm = document.forms['RutaForm'];

/* definición de métodos */
const getRutaForm = () => {
    const datos = {
        ciudad_origen: RutaForm['ciudad_origen'].value,
        ciudad_destino: RutaForm['ciudad_destino'].value,
        distancia: RutaForm['distancia'].value,
        tiempo_estimado: RutaForm['tiempo_estimado'].value,
        observaciones: RutaForm['observaciones'].value,
    };
    return datos;
};

const setRutaForm = (ruta) => {
    RutaForm['ciudad_origen'].value = ruta.ciudad_origen;
    RutaForm['ciudad_destino'].value = ruta.ciudad_destino;
    RutaForm['distancia'].value = ruta.distancia;
    RutaForm['tiempo_estimado'].value = ruta.tiempo_estimado;
    RutaForm['observaciones'].value = ruta.observaciones;
};

const registrarRuta = async () => {
    try {
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8003/rutas', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify(getRutaForm()),
        });
        const body = await response.json();
        const status = response.status;
        if (status == 201) {
            showModal('Ruta registrada');
            rutas.push({
                id: body.ruta.id,
                ciudad_origen: body.ruta.ciudad_origen,
                ciudad_destino: body.ruta.ciudad_destino,
                distancia: body.ruta.distancia,
                tiempo_estimado: body.ruta.tiempo_estimado,
                observaciones: body.ruta.observaciones,
            });
            mostrarRutas();
            RutaForm.reset();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
    }
    console.log('Fin del request...');
};

const actualizarRuta = async () => {
    try {
        const id = ruta.id;
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8003/rutas/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify(getRutaForm()),
        });
        const body = await response.json();
        const status = response.status;
        if (status == 200) {
            showModal('Ruta actualizada');
            consultarRutas();
            ruta = null;
            RutaForm.reset();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
        showModal('Error al conectar con el servidor', 'error');
    }
    console.log('Fin del request...');
};

const validarRutaForm = (datos) => {
    const msgOrigen = document.getElementById('msgOrigen');
    const msgDestino = document.getElementById('msgDestino');
    const msgDistancia = document.getElementById('msgDistancia');

    msgOrigen.style.display = datos.ciudad_origen ? 'none' : 'block';
    msgDestino.style.display = datos.ciudad_destino ? 'none' : 'block';
    msgDistancia.style.display = datos.distancia ? 'none' : 'block';
};

/* definición de eventos */
RutaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const datos = getRutaForm();
    validarRutaForm(datos);
    if (!datos.ciudad_origen || !datos.ciudad_destino || !datos.distancia) {
        showModal('Los campos obligatorios están vacíos', 'error');
    } else {
        ruta ? actualizarRuta() : registrarRuta();
    }
});

RutaForm.addEventListener('reset', () => {
    ruta = null;
    document.getElementById('msgOrigen').style.display = 'none';
    document.getElementById('msgDestino').style.display = 'none';
    document.getElementById('msgDistancia').style.display = 'none';
});