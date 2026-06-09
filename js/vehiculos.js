const vehiculos = [];
let vehiculo = null;
const vehiculoTB = document.getElementById('vehiculoTB');

const mostVehiculos = () => {
    const tbody = vehiculoTB.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for(let item of vehiculos) {
        const tr = document.createElement('tr');

        const placaTd = document.createElement('td');
        placaTd.textContent = item.placa;

        const tipoTd = document.createElement('td');
        tipoTd.textContent = item.tipo_vehiculo;

        const capacidadTd = document.createElement('td');
        capacidadTd.textContent = item.capacidad_carga;

        const modeloTd = document.createElement('td');
        modeloTd.textContent = item.modelo;

        const marcaTd = document.createElement('td');
        marcaTd.textContent = item.marca;

        const estadoTd = document.createElement('td');
        estadoTd.textContent = item.estado;

        const accionTd = document.createElement('td');

        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.addEventListener('click', () => editarVehiculo(item));

        accionTd.appendChild(editarBtn);

        tr.appendChild(placaTd);
        tr.appendChild(tipoTd);
        tr.appendChild(capacidadTd);
        tr.appendChild(modeloTd);
        tr.appendChild(marcaTd);
        tr.appendChild(estadoTd);
        tr.appendChild(accionTd);

        tbody.appendChild(tr);
    }
};

const consultarVehiculos = async () => {
    try{
        if(vehiculos.length > 0){
            vehiculos.splice(0, vehiculos.length);
        }
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8002/vehiculos', {
            headers: {
                'Authorization': tkn,
            },
        });

        const body = await response.json();
        body.forEach((item) =>
            vehiculos.push({
                id: item.id,
                placa: item.placa,
                tipo_vehiculo: item.tipo_vehiculo,
                capacidad_carga: item.capacidad_carga,
                modelo: item.modelo,
                marca: item.marca,
                estado: item.estado,
            })
        );
        mostVehiculos();
    }catch (ex) {
        console.error('Error en el servidor');
    }
    console.log('Fin del request...');
};

const editarVehiculo = (value) => {
    vehiculo = value;
    setVehiculoForm(vehiculo);
};

consultarVehiculos();