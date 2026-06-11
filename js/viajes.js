const viajes = [];
let viaje = null;
const viajeTB = document.getElementById('viajeTB');

const mostrarViajes = () => {
    const tbody = viajeTB.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let item of viajes) {
        const tr = document.createElement('tr');

        const progTd = document.createElement('td');
        progTd.textContent = item.programacion_viaje_id;

        const fechaTd = document.createElement('td');
        fechaTd.textContent = item.fecha;

        const horaTd = document.createElement('td');
        horaTd.textContent = item.hora;

        const estadoTd = document.createElement('td');
        estadoTd.textContent = item.estado;

        const novedadTd = document.createElement('td');
        novedadTd.textContent = item.novedad;

        const accionTd = document.createElement('td');

        const finalizarBtn = document.createElement('button');
        finalizarBtn.textContent = 'Finalizar';
        finalizarBtn.addEventListener('click', () => finalizarViaje(item));

        accionTd.appendChild(finalizarBtn);

        tr.appendChild(progTd);
        tr.appendChild(fechaTd);
        tr.appendChild(horaTd);
        tr.appendChild(estadoTd);
        tr.appendChild(novedadTd);
        tr.appendChild(accionTd);

        tbody.appendChild(tr);
    }
};

const consultarViajes = async () => {
    try {
        if (viajes.length > 0) {
            viajes.splice(0, viajes.length);
        }
        const tkn = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8004/viajes/todos', {
            headers: {
                'Authorization': tkn,
            },
        });
        const body = await response.json();
        body.forEach((item) =>
            viajes.push({
                id: item.id,
                programacion_viaje_id: item.programacion_viaje_id,
                fecha: item.fecha,
                hora: item.hora,
                estado: item.estado,
                novedad: item.novedad,
            })
        );
        mostrarViajes();
    } catch (ex) {
        console.error('Error en el servicio');
    }
    console.log('Fin del request...');
};

const finalizarViaje = async(item) => {
    const tkn = localStorage.getItem('token');
    try{
        const response = await fetch(`http://127.0.0.1:8004/viajes/${item.id}/finalizar`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tkn,
            },
            body: JSON.stringify({novedad: 'Viaje completado'}),
        });
        const body = await response.json();
        if(response.status == 200){
            showModal('Viaje finalizado');
            consultarViajes();
        } else {
            showModal(body.error, 'error');
        }
    } catch (ex) {
        console.error('Error en el servicio');
    }
};

const cargarProgramaciones = async () => {
    try {
        const tkn = localStorage.getItem('token');
        const resProg = await fetch('http://127.0.0.1:8003/programaciones', {
            headers: { 'Authorization': tkn }
        });
        const resRutas = await fetch('http://127.0.0.1:8003/rutas', {
            headers: { 'Authorization': tkn }
        });
        const programaciones = await resProg.json();
        const rutas = await resRutas.json();

        const select = document.getElementById('selectProgramacion');
        programaciones
            .filter(p => p.estado === 'programado')
            .forEach(p => {
                const ruta = rutas.find(r => r.id == p.ruta_id);
                const origen = ruta ? ruta.ciudad_origen : 'N/A';
                const destino = ruta ? ruta.ciudad_destino : 'N/A';
                const option = document.createElement('option');
                option.value = p.id;
                option.textContent = `ID ${p.id} — ${origen} → ${destino} — ${p.fecha_salida}`;
                select.appendChild(option);
            });
    } catch (ex) {
        console.error('Error cargando programaciones');
    }
};

cargarProgramaciones();
consultarViajes();