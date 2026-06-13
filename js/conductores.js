const conductores = [];
let conductor = null;
const conductoresTB = document.getElementById('conductorTB');

const mostConductor = () => {
    const tbody = conductoresTB.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let item of conductores){
        const tr = document.createElement('tr');

        const idTd = document.createElement('td');
        idTd.textContent = item.id;

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

        const estadoBtn = document.createElement('button');
        estadoBtn.textContent = 'Estado';
        estadoBtn.addEventListener('click', () => cambiarEstadoConductor(item));
        accionTd.appendChild(estadoBtn);

        tr.appendChild(idTd);
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
        mostConductor();
    }catch(ex) {
        console.error('Error en el servicio');
    }
};

const consultarConductores = consultarConductor;

const cambiarEstadoConductor = async (item) => {
    const estados = ['disponible', 'en_ruta', 'inactivo'];
    const actual = item.estado;
    const siguiente = estados[(estados.indexOf(actual) + 1) % estados.length];

    const tkn = localStorage.getItem('token');
    try {
        const response = await fetch(`http://127.0.0.1:8001/conductores/${item.id}/estado`, {
        method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify({ estado: siguiente }),
        });
        const body = await response.json();
        if (response.status == 200) {
            showModal(`Estado cambiado a ${siguiente}`);
            consultarConductores();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
    }
};

const editarConductor = (value) => {
    conductor = value;
    setConductorForm(conductor);
    document.getElementById('formTitle').textContent = 'Editar conductor';
    document.getElementById('formDesc').textContent = 'Modifica los datos del conductor seleccionado';
    document.getElementById('submitBtn').textContent = 'Actualizar';
};

const cambiarFiltro = () => {
    const tipo = document.getElementById('tipoBusqueda').value;
    const input = document.getElementById('valorBusqueda');
    const selectEstado = document.getElementById('valorEstado');

    if (tipo === 'estado') {
        input.style.display = 'none';
        selectEstado.style.display = 'block';
    } else {
        input.style.display = 'block';
        selectEstado.style.display = 'none';
        input.value = ''; // limpiar valor anterior
    }

    if (tipo === 'todos') buscarConductor();
};

const buscarConductor = async () => {
    const tipo = document.getElementById('tipoBusqueda').value;
    const valor = document.getElementById('valorBusqueda').value.trim();
    const estado = document.getElementById('valorEstado').value;
    const tkn = localStorage.getItem('token');

    // Validar que haya valor cuando se necesita
    if ((tipo === 'documento' || tipo === 'licencia') && !valor) {
        showModal('Ingresa un valor para buscar', 'error');
        return;
    }

    let url = 'http://127.0.0.1:8001/conductores';
    if (tipo === 'documento') url = `http://127.0.0.1:8001/conductores/documento/${valor}`;
    if (tipo === 'licencia')  url = `http://127.0.0.1:8001/conductores/licencia/${valor}`;
    if (tipo === 'estado')    url = `http://127.0.0.1:8001/conductores/estado/${estado}`;

    try {
        const response = await fetch(url, { headers: { 'Authorization': tkn } });
        const body = await response.json();

        if (!response.ok) {
            showModal(body.error || 'No se encontraron resultados', 'error');
            return;
        }

        conductores.splice(0, conductores.length);

        // Por documento retorna objeto, los demás retornan array
        if (tipo === 'documento') {
            conductores.push(body);
        } else {
            body.forEach(item => conductores.push(item));
        }

        mostConductor();
    } catch (ex) {
        console.error('Error en el servicio');
        showModal('Error al conectar con el servidor', 'error');
    }
};

consultarConductor();