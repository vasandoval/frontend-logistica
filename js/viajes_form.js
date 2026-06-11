const viajesForm = document.forms['viajesForm'];
const ProgramacionForm = document.forms['ProgramacionForm'];


const getviajesForm = () => {
    const datos = {
        programacion_viaje_id: viajesForm['programacion_viaje_id'].value,
        fecha: viajesForm['fecha'].value,
        hora: viajesForm['hora'].value,
        novedad: viajesForm['novedad'].value,
    };
    return datos;
};

const iniciarViaje = async () => {
    try{
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8004/viajes/iniciar', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify(getviajesForm()),
        });
        const body = await response.json();
        const status = response.status;
        if (status == 201){
            showModal('Viaje iniciado');
            viajes.push({
                id: body.seguimiento.id,
                programacion_viaje_id: body.seguimiento.programacion_viaje_id,
                fecha: body.seguimiento.fecha,
                hora: body.seguimiento.hora,
                estado: body.seguimiento.estado,
                novedad: body.seguimiento.novedad,
            });
            mostrarViajes();
            viajesForm.reset();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Erroren el servicio');
        showModal('Error al conectar con el servidor', 'error');
    }
};

const validarviajesForm = (datos) => {
    const msgProgId = document.getElementById('msgProgId');
    const msgFecha = document.getElementById('msgFecha');
    const msgHora = document.getElementById('msgHora');

    msgProgId.style.display = datos.programacion_viaje_id ? 'none' : 'block';
    msgFecha.style.display = datos.fecha ? 'none' : 'block';
    msgHora.style.display = datos.hora ? 'none' : 'block';
};

viajesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const datos = getviajesForm();
    validarviajesForm(datos);
    if (!datos.programacion_viaje_id || !datos.fecha || !datos.hora) {
        showModal('Los campos obligatorios están vacíos', 'error');
    } else {
        iniciarViaje();
    }
});

viajesForm.addEventListener('reset', () => {
    viaje = null;
    document.getElementById('msgProgId').style.display = 'none';
    document.getElementById('msgFecha').style.display = 'none';
    document.getElementById('msgHora').style.display = 'none';
});

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