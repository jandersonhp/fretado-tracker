// Verifica se é admin
const params = new URLSearchParams(window.location.search);
const isAdmin = params.get("admin") === "meu123";
const toggleBtn = document.getElementById("toggleTracking");
if(isAdmin) toggleBtn.style.display = "block";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCshgPieBQ1zXGLfH_zp0nS_ab25HSTCto",
  authDomain: "fretado-tracker.firebaseapp.com",
  databaseURL: "https://fretado-tracker-default-rtdb.firebaseio.com",
  projectId: "fretado-tracker",
  storageBucket: "fretado-tracker.firebasestorage.app",
  messagingSenderId: "515634597476",
  appId: "1:515634597476:web:5ee62c9770474898529971"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const usersOnlineRef = db.ref("usersOnline");
const adminActiveRef = db.ref("tracker/adminActive");

const onlineCounterEl = document.getElementById("onlineCounter");

// Conexão online
const myConnection = usersOnlineRef.push(true);
myConnection.onDisconnect().remove();
usersOnlineRef.on("value", snapshot => {
  let count = 0;
  if(snapshot.exists()) count = Object.keys(snapshot.val()).length;
  if(onlineCounterEl) {
    onlineCounterEl.style.display = "block";
    onlineCounterEl.textContent = `👀 ${count} pessoas online`;
  }
});

const locationRef = db.ref("tracker/location");

// Mapa
const map = L.map('map').setView([-23.5284, -46.7758], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'© OpenStreetMap' }).addTo(map);

// Ícones
const busIcon = L.icon({ iconUrl:'assets/bus-stop.png', iconSize:[40,40], iconAnchor:[20,40] });

let busMarker = null;
let path = [];
let polyline = L.polyline(path,{ color:'blue' }).addTo(map);

let userMarker = null;
let lastUserPos = null;

function updateDistance() {
  if(lastUserPos && busMarker){
    const busLatLng = busMarker.getLatLng();
    const correctionFactor = 1.5;
    const distance = map.distance([lastUserPos.lat,lastUserPos.lng], busLatLng) * correctionFactor;
    let distanceText = distance < 1000 ? `${Math.round(distance)} metros` : `${(distance/1000).toFixed(1)} km`;

    const averageSpeedKmh = 13;
    const timeHours = (distance/1000) / averageSpeedKmh;
    let timeText = timeHours < 1 ? `${Math.round(timeHours*60)} min` : `${Math.floor(timeHours)}h ${Math.round((timeHours-Math.floor(timeHours))*60)}min`;

    document.getElementById("statusMsg").textContent = `Distância do fretado: ${distanceText} (~${timeText})`;
  }
}

function addOrUpdateUserMarker(lat,lng){
  lastUserPos = { lat,lng };
  if(!userMarker){
    userMarker = L.marker([lat,lng], {
      icon: L.icon({ iconUrl:'assets/placeholder.png', iconSize:[40,40], iconAnchor:[20,40] })
    }).addTo(map).bindPopup("Você está aqui");
  } else { userMarker.setLatLng([lat,lng]); }
  updateDistance();
}

// Atualiza fretado
locationRef.on("value", snapshot => {
  const data = snapshot.val();
  if(data){
    const latlng = [data.lat,data.lng];
    if(!busMarker) busMarker = L.marker(latlng,{icon:busIcon}).addTo(map);
    else busMarker.setLatLng(latlng);

    path.push(latlng);
    polyline.setLatLngs(path);
    updateDistance();
  }
});

// Botão admin com lock
let watchId = null;
toggleBtn.addEventListener("click", async () => {
  if(watchId){
    // Para rastreamento
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    locationRef.remove();
    polyline.setLatLngs([]);
    toggleBtn.textContent = "Iniciar Rastreamento";
    toggleBtn.classList.remove("active");

    // 🔹 Limpa admin ativo
    adminActiveRef.remove();
  } else {
    // 🔹 Checa se já existe outro admin ativo
    const snapshot = await adminActiveRef.get();
    if(snapshot.exists()){
      alert("Rastreamento em curso.");
      return;
    }

    // 🔹 Grava admin ativo (timestamp serve como UID único)
    const uid = Date.now().toString(); 
    adminActiveRef.set(uid);
    adminActiveRef.onDisconnect().remove(); // garante limpeza se fechar a aba

    // Inicia rastreamento
    if(navigator.geolocation){
      watchId = navigator.geolocation.watchPosition(pos => {
        locationRef.set({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
      toggleBtn.textContent = "Parar Rastreamento";
      toggleBtn.classList.add("active");
    } else {
      alert("Geolocalização não suportada!");
    }
  }
});

// Geolocalização usuário
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(pos => addOrUpdateUserMarker(pos.coords.latitude,pos.coords.longitude));
  navigator.geolocation.watchPosition(pos => addOrUpdateUserMarker(pos.coords.latitude,pos.coords.longitude),
    err => console.warn(err), { enableHighAccuracy:true, maximumAge:0 });
}

// Botões foco
document.getElementById("btnUser").addEventListener("click", () => {
  if(userMarker) map.setView(userMarker.getLatLng(),16);
});
document.getElementById("btnFretado").addEventListener("click", () => {
  if(busMarker) map.setView(busMarker.getLatLng(),16);
});
