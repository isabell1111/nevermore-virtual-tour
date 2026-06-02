function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.getElementById(screenId).classList.add('active');
}

function openPopup() {
    document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

async function startCamera() {
    const video = document.getElementById('camera');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false
        });
        video.srcObject = stream;
    } catch (error) {
        console.error("Camera kon niet worden geopend:", error);
        alert("De camera kon niet worden geopend op dit apparaat of in deze browser.");
    }
}

function stopCamera() {
    const video = document.getElementById('camera');
    const stream = video.srcObject;

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
}

const locations = [
    {
        title: "Nevermore Gate",
        image: "images/location1.jpg",
        text: "De poort van Nevermore vormt de mysterieuze ingang van de academie en zet direct de donkere sfeer van de school neer."
    },
    {
        title: "Nightshades Library",
        image: "images/location2.jpg",
        text: "Een verborgen en mysterieuze plek binnen Nevermore, verbonden aan de Nightshades en de geheimen van de school."
    },
    {
        title: "Courtyard",
        image: "images/location3.jpg",
        text: "De courtyard is een centrale plek binnen Nevermore waar studenten samenkomen en waar de gotische sfeer van de school sterk naar voren komt."
    }
];

let currentLocation = 0;
let locationInterval;

function updateLocation() {
    document.getElementById("locationTitle").textContent = locations[currentLocation].title;
    document.getElementById("locationImage").src = locations[currentLocation].image;
    document.getElementById("locationImage").alt = locations[currentLocation].title;
    document.getElementById("locationText").textContent = locations[currentLocation].text;
}

function startLocationTour() {
    currentLocation = 0;
    updateLocation();

    locationInterval = setInterval(() => {
        if (currentLocation < locations.length - 1) {
            currentLocation++;
            updateLocation();
        }
    }, 4000); // elke 4 seconden nieuwe locatie
}

function stopLocationTour() {
    clearInterval(locationInterval);
}

document.getElementById('infoBtn').addEventListener('click', () => {
    showScreen('info');
});

document.getElementById('backHomeFromInfo').addEventListener('click', () => {
    showScreen('home');
});

document.getElementById('startBtn').addEventListener('click', () => {
    openPopup();
});

document.getElementById('yesBtn').addEventListener('click', () => {
    closePopup();
    showScreen('welcome');
});

document.getElementById('noBtn').addEventListener('click', () => {
    closePopup();
});

document.getElementById('beginTourBtn').addEventListener('click', async () => {
    showScreen('tour');
    await startCamera();
    startLocationTour();
});

document.getElementById('finishTourBtn').addEventListener('click', () => {
    stopLocationTour();
    stopCamera();
    showScreen('end');
});

document.getElementById('backToHomeBtn').addEventListener('click', () => {
    showScreen('home');
});