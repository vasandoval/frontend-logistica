const ConductorForm = document.forms['ConductorForm'];

const getConductorForm = () => {
    const datos = {
        nombres: ConductorForm['nombres'].value,
        apellidos: ConductorForm['apellidos'].value,
        documento: ConductorForm['documento'].value,
        telefono: ConductorForm['telefono'].value,
        correo: ConductorForm['correo'].value,
        numero_licencia: ConductorForm['numero_licencia'].value,
        categoria_licencia: ConductorForm['categoria_licencia'].value,
        fecha_vencimiento_licencia: ConductorForm['fecha_vencimiento_licencia'].value,
    };
    return datos;
};

const setConductorForm = (conductor) => {
    ConductorForm['nombres'].value = conductor.nombres;
    ConductorForm['apellidos'].value = conductor.apellidos;
    ConductorForm['documento'].value = conductor.documento;
    ConductorForm['telefono'].value = conductor.telefono;
    ConductorForm['correo'].value = conductor.correo;
    ConductorForm['numero_licencia'].value = conductor.numero_licencia;
    ConductorForm['categoria_licencia'].value = conductor.categoria_licencia;
    ConductorForm['fecha_vencimiento_licencia'].value = conductor.fecha_vencimiento_licencia;
};

const registrarConductor = async () => {
    try {
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8001/conductores', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify(getConductorForm()),
        });
        const body = await response.json();
        const status = response.status;
        if (status == 201) {
            showModal('Conductor registrado');
            conductores.push({
                id: body.conductor.id,
                nombres: body.conductor.nombres,
                apellidos: body.conductor.apellidos,
                documento: body.conductor.documento,
                telefono: body.conductor.telefono,
                correo: body.conductor.correo,
                numero_licencia: body.conductor.numero_licencia,
                categoria_licencia: body.conductor.categoria_licencia,
                fecha_vencimiento_licencia: body.conductor.fecha_vencimiento_licencia,
                estado: body.conductor.estado,
            });
            mostConductor();
            ConductorForm.reset();
        }else{
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
        showModal('Error al conectar con el servidor', 'error');
    }
    console.log('Fin del request...');
};

const actualizarConductor = async () => {
    try{
        const id = conductor.id;
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8001/conductores/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify(getConductorForm()),
        });
        const body = await response.json();
        const status = response.status;
        if (status == 200){
            showModal('Conductor actualizado');
            consultarConductores();
            conductor = null;
            ConductorForm.reset();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
        showModal('Error el conectar con el servidor', 'error');
    }
    console.log('Fin del request...');
};

const validarConductorForm = (datos) => {
    const msgNombres = document.getElementById('msgNombres');
    const msgApellidos = document.getElementById('msgApellidos');
    const msgDocumento = document.getElementById('msgDocID');
    const msgLicencia = document.getElementById('msgLice');

    msgNombres.style.display = datos.nombres ? 'none' : 'block';
    msgApellidos.style.display = datos.apellidos ? 'none' : 'block';
    msgDocumento.style.display = datos.documento ? 'none' : 'block';
    msgLicencia.style.display = datos.numero_licencia ? 'none' : 'block';
};

ConductorForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const datos = getConductorForm();
    validarConductorForm(datos);
    if(!datos.nombres || !datos.apellidos || !datos.documento || !datos.numero_licencia){
        showModal('Los campos obligatorios están vacíos', 'error');
    } else {
        conductor ? actualizarConductor() : registrarConductor();
    }
}); 

ConductorForm.addEventListener('reset', () => {
    conductor = null;
    document.getElementById('msgNombres').style.display = 'none';
    document.getElementById('msgApellidos').style.display = 'none';
    document.getElementById('msgDocID').style.display = 'none';
    document.getElementById('msgLice').style.display = 'none';
});