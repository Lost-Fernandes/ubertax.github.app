let watchId;
let kmPercorrido = 0;
let valorTotal = 0;
let ultimaPosicao = null;

function iniciar() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(posicao, erro, {
            enableHighAccuracy: true
        });
    } else {
        alert("Geolocalização não suportada.");
    }
}

function parar() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
}

function zerar() {
    parar();
    kmPercorrido = 0;
    valorTotal = 0;
    ultimaPosicao = null;
    atualizarDisplay();
}

function posicao(position) {
    const { latitude, longitude } = position.coords;
    if (ultimaPosicao) {
        const distancia = calcularDistancia(
            ultimaPosicao.latitude, ultimaPosicao.longitude,
            latitude, longitude
        );
        kmPercorrido += distancia;
        const valorKM = parseFloat(document.getElementById("valorKM").value);
        valorTotal = kmPercorrido * valorKM;
        atualizarDisplay();
    }
    ultimaPosicao = { latitude, longitude };
}

function atualizarDisplay() {
    document.getElementById("km").innerText = kmPercorrido.toFixed(2);
    document.getElementById("valor").innerText = valorTotal.toFixed(2);
}

function erro(err) {
    console.warn(`ERRO(${err.code}): ${err.message}`);
}

// Fórmula de Haversine para calcular distância entre dois pontos
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em KM
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distancia = R * c;
    return distancia;
}
