const conductores = [];
let conductor = null;
const conductoresTB = document.getElementById('conductorTB');

const mostConductor = () => {
    const tbody = conductoresTB.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let item of conductores){
        const tr = document.createElement('tr');

        const nomTd = document.createElement('td');
        nomTd.textContent = item.nombres;

        const apelTd = document.createElement('td');
        apelTd.textContent = item.apellidos;

        const docTd = document.createElement('td');
        docTd.textContent = item.documento;

        const telefonoTd = document.createElement('td');
        telefonoTd.textContent = item.telefono;

        const correoTd = document.createElement('td');
        correoTd.textContent = item.correo;

        const licTd = document.createElement('td');
        licTd.textContent = item.numero_licencia;

        const catTd = document.createElement('td');
        catTd.textContent = item.categoria_licencia;

        const vencTd = document.createElement('td');
        vencTd.textContent = item.fecha_vencimiento_licencia;

        const estadoTd = document.createElement('td');
        estadoTd.textContent = item.estado;

        const accionTd = document.createElement('td');

        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.addEventListener('click', () => editarConductor(item));

        accionTd.appendChild(editarBtn);

        tr.appendChild(nomTd);
        tr.appendChild(apelTd);
        tr.appendChild(docTd);
        tr.appendChild(telefonoTd);
        tr.appendChild(correoTd);
        tr.appendChild(licTd);
        tr.appendChild(catTd);
        tr.appendChild(vencTd);
        tr.appendChild(estadoTd);
        tr.appendChild(accionTd);

        tbody.appendChild(tr);
    }
};

const consultarConductor = async () => {
    try {
        if (conductores.length > 0) {
            conductores.splice(0, conductores.length);
        }
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8001/conductores', {
            headers: {
                'Authorization': tkn,
            },
        });
        const body = await response.json();
        body.forEach((item) =>
            conductores.push({
                id: item.id,
                nombres: item.nombres,
                apellidos: item.apellidos,
                documento: item.documento,
                telefono: item.telefono,
                correo: item.correo,
                numero_licencia: item.numero_licencia,
                categoria_licencia: item.categoria_licencia,
                fecha_vencimiento_licencia: item.fecha_vencimiento_licencia,
                estado: item.estado,
            })
        );
        mostConductores();
    }catch(ex) {
        console.error('Error en el servicio');
    }
    console.log('Fin del request...');
};

const editarConductor = (value) => {
    conductor = value;
    setConductorForm(conductor);
};

consultarConductor();