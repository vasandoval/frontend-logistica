const RutaForm = document.forms['RutaForm'];

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
            showModal('Ruta creada con ID: ' + body.ruta.id);
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

const ProgramacionForm = document.forms['ProgramacionForm'];

const getProgramacionForm = () => {
    const datos = {
        conductor_id: ProgramacionForm['conductor_id'].value,
        vehiculo_id: ProgramacionForm['vehiculo_id'].value,
        ruta_id: ProgramacionForm['ruta_id'].value,
        fecha_salida: ProgramacionForm['fecha_salida'].value,
        hora_salida: ProgramacionForm['hora_salida'].value,
        fecha_estimada_llegada: ProgramacionForm['fecha_estimada_llegada'].value,
        observaciones: ProgramacionForm['observaciones'].value,
    };
    return datos;
};

const registrarProgramacion = async () => {
    try {
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8003/programaciones', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify(getProgramacionForm()),
        });
        const body = await response.json();
        const status = response.status;
        if (status == 201) {
            showModal('Programacion registrada con ID: ' + body.programacion.id);
            ProgramacionForm.reset();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
        showModal('Error al conectar con el servidor', 'error');
    }
};

const validarProgramacionForm = (datos) => {
    const msgConductorId = document.getElementById('msgConductorId');
    const msgVehiculoId = document.getElementById('msgVehiculoId');
    const msgRutaId = document.getElementById('msgRutaId');
    const msgFechaSalida = document.getElementById('msgFechaSalida');
    const msgHoraSalida = document.getElementById('msgHoraSalida');
    const msgFechaLlegada = document.getElementById('msgFechaLlegada');

    msgConductorId.style.display = datos.conductor_id ? 'none' : 'block';
    msgVehiculoId.style.display = datos.vehiculo_id ? 'none' : 'block';
    msgRutaId.style.display = datos.ruta_id ? 'none' : 'block';
    msgFechaSalida.style.display = datos.fecha_salida ? 'none' : 'block';
    msgHoraSalida.style.display = datos.hora_salida ? 'none' : 'block';
    msgFechaLlegada.style.display = datos.fecha_estimada_llegada ? 'none' : 'block';
};

ProgramacionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const datos = getProgramacionForm();
    validarProgramacionForm(datos);
    if (!datos.conductor_id || !datos.vehiculo_id || !datos.ruta_id || !datos.fecha_salida || !datos.hora_salida || !datos.fecha_estimada_llegada) {
        showModal('Los campos obligatorios están vacíos', 'error');
    } else {
        registrarProgramacion();
    }
});

ProgramacionForm.addEventListener('reset', () => {
    document.getElementById('msgConductorId').style.display = 'none';
    document.getElementById('msgVehiculoId').style.display = 'none';
    document.getElementById('msgRutaId').style.display = 'none';
    document.getElementById('msgFechaSalida').style.display = 'none';
    document.getElementById('msgHoraSalida').style.display = 'none';
    document.getElementById('msgFechaLlegada').style.display = 'none';
});