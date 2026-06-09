const VehiculoForm = document.forms['VehiculoForm'];

const getVehiculoForm = () => {
    const datos = {
        placa: VehiculoForm['placa'].value,
        tipo_vehiculo: VehiculoForm['tipo_vehiculo'].value,
        capacidad_carga: VehiculoForm['capacidad_carga'].value,
        modelo: VehiculoForm['modelo'].value,
        marca: VehiculoForm['marca'].value,
    };
    return datos;
};

const setVehiculoForm = (vehiculo) =>{
    VehiculoForm['placa'].value = vehiculo.placa;
    VehiculoForm['tipo_vehiculo'].value = vehiculo.tipo_vehiculo;
    VehiculoForm['capacidad_carga'].value = vehiculo.capacidad_carga;
    VehiculoForm['modelo'].value = vehiculo.modelo;
    VehiculoForm['marca'].value = vehiculo.marca;
};

const registrarVehiculo= async () => {
    try{
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8002/vehiculos', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify(getVehiculoForm()),
        });
        const body = await response.json();
        const status = response.status;
        if(status == 201) {
            showModal('Vehiculo registrado');
            vehiculos.push({
                id: body.vehiculo.id,
                placa: body.vehiculo.placa,
                tipo_vehiculo: body.vehiculo.tipo_vehiculo,
                capacidad_carga: body.vehiculo.capacidad_carga,
                modelo: body.vehiculo.modelo,
                marca: body.vehiculo.marca,
                estado: body.vehiculo.estado,
            });
            mostVehiculos();
            VehiculoForm.reset();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
        showModal('Error al conectar con el servidor', 'error');
    }
    console.log('Fin del request...');
};

const actualizarVehiculo = async () => {
    try{
        const id = vehiculo.id;
        const tkm = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8002/vehiculos/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify(getVehiculoForm()),
        });
        const body = await response.json();
        const status = response.status;
        if(status == 200) {
            showModal('Vehiculo actualizado');
            consultarVehiculos();
            vehiculo = null;
            VehiculoForm.reset();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
        showModal('Error al conectar con el servidor', 'error');
    }
    console.log('Fin del request...');
};

const validarVehiculoForm = (datos) => {
    const msgPlaca = document.getElementById('msgPlaca');
    const msgTipo = document.getElementById('msgTipo');
    const msgCapacidad = document.getElementById('msgCapacidad');

    msgPlaca.style.display = datos.placa ? 'none' : 'block';
    msgTipo.style.display = datos.tipo_vehiculo ? 'none' : 'block';
    msgCapacidad.style.display = datos.capacidad_carga ? 'none' : 'block';
};

VehiculoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const datos = getVehiculoForm();
    validarVehiculoForm(datos);
    if(!datos.placa || !datos.tipo_vehiculo || !datos.capacidad_carga) {
        showModal('Los campos obligarorios están vacíos', 'error');
    } else {
        vehiculo ? actualizarVehiculo() : registrarVehiculo();
    }
});

VehiculoForm.addEventListener('reset', () => {
    vehiculo = null;
    document.getElementById('msgPlaca').style.display = 'none';
    document.getElementById('msgTipo').style.display = 'none';
    document.getElementById('msgCapacidad').style.display = 'none';
});
