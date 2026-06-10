const rutas = [];
let ruta = null;
const rutaTB = document.getElementById('rutaTB');

const mostrarRutas = () => {
    const tbody = rutaTB.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let item of rutas) {
        const tr = document.createElement('tr');

        const origenTd = document.createElement('td');
        origenTd.textContent = item.ciudad_origen;

        const destinoTd = document.createElement('td');
        destinoTd.textContent = item.ciudad_destino;

        const distanciaTd = document.createElement('td');
        distanciaTd.textContent = item.distancia;

        const tiempoTd = document.createElement('td');
        tiempoTd.textContent = item.tiempo_estimado;

        const obsTd = document.createElement('td');
        obsTd.textContent = item.observaciones;

        const accionTd = document.createElement('td');

        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.addEventListener('click', () => editarRuta(item));

        accionTd.appendChild(editarBtn);

        tr.appendChild(origenTd);
        tr.appendChild(destinoTd);
        tr.appendChild(distanciaTd);
        tr.appendChild(tiempoTd);
        tr.appendChild(obsTd);
        tr.appendChild(accionTd);

        tbody.appendChild(tr);
    }
};

const consultarRutas = async () => {
    try {
        if (rutas.length > 0) {
            rutas.splice(0, rutas.length);
        }
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8003/rutas', {
            headers: {
                'Authorization': tkn,
            },
        });
        const body = await response.json();
        body.forEach((item) =>
            rutas.push({
                id: item.id,
                ciudad_origen: item.ciudad_origen,
                ciudad_destino: item.ciudad_destino,
                distancia: item.distancia,
                tiempo_estimado: item.tiempo_estimado,
                observaciones: item.observaciones,
            })
        );
        mostrarRutas();
    } catch (ex) {
        console.error('Error en el servicio');
    }
    console.log('Fin del request...');
};

const editarRuta = (value) => {
    ruta = value;
    setRutaForm(ruta);
};

consultarRutas();