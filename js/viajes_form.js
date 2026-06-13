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

const viajesForm = document.forms['viajesForm'];

const getviajesForm = () => {
    return {
        programacion_viaje_id: viajesForm['programacion_viaje_id'].value,
        fecha: viajesForm['fecha'].value,
        hora: viajesForm['hora'].value,
        novedad: viajesForm['novedad'].value,
    };
};

const iniciarViaje = async () => {
    try {
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
        if (response.status == 201) {
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
        showModal('Error al conectar con el servidor', 'error');
    }
};

const validarviajesForm = (datos) => {
    document.getElementById('msgProgId').style.display = datos.programacion_viaje_id ? 'none' : 'block';
    document.getElementById('msgFecha').style.display = datos.fecha ? 'none' : 'block';
    document.getElementById('msgHora').style.display = datos.hora ? 'none' : 'block';
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