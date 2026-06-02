function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }
}

function openPopup() {
  const popup = document.getElementById('popup');
  if (popup) popup.classList.remove('hidden');
}

function closePopup() {
  const popup = document.getElementById('popup');
  if (popup) popup.classList.add('hidden');
}

async function startCamera() {
  const video = document.getElementById('camera');
  if (!video) return;

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
  if (!video) return;

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
    text: "De mysterieuze ingang van Nevermore Academy."
  },
  {
    title: "Nightshades Library",
    image: "images/location2.jpg",
    text: "Een verborgen plek vol geheimen binnen Nevermore."
  },
  {
    title: "Courtyard",
    image: "images/location3.jpg",
    text: "Een centrale plek waar de gotische sfeer samenkomt."
  }
];

let currentLocation = 0;
let locationInterval;

function updateLocation() {
  const title = document.getElementById("locationTitle");
  const image = document.getElementById("locationImage");
  const text = document.getElementById("locationText");

  if (title) title.textContent = locations[currentLocation].title;
  if (image) {
    image.src = locations[currentLocation].image;
    image.alt = locations[currentLocation].title;
  }
  if (text) text.textContent = locations[currentLocation].text;
}

function startLocationTour() {
  currentLocation = 0;
  updateLocation();

  locationInterval = setInterval(() => {
    if (currentLocation < locations.length - 1) {
      currentLocation++;
      updateLocation();
    }
  }, 4000);
}

function stopLocationTour() {
  clearInterval(locationInterval);
}

const infoBtn = document.getElementById('infoBtn');
if (infoBtn) {
  infoBtn.addEventListener('click', () => showScreen('info'));
}

const backHomeFromInfo = document.getElementById('backHomeFromInfo');
if (backHomeFromInfo) {
  backHomeFromInfo.addEventListener('click', () => showScreen('home'));
}

const startBtn = document.getElementById('startBtn');
if (startBtn) {
  startBtn.addEventListener('click', () => openPopup());
}

const yesBtn = document.getElementById('yesBtn');
if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    closePopup();
    showScreen('welcome');
  });
}

const noBtn = document.getElementById('noBtn');
if (noBtn) {
  noBtn.addEventListener('click', () => closePopup());
}

const beginTourBtn = document.getElementById('beginTourBtn');
if (beginTourBtn) {
  beginTourBtn.addEventListener('click', async () => {
    showScreen('tour');
    await startCamera();
    startLocationTour();
  });
}

const finishTourBtn = document.getElementById('finishTourBtn');
if (finishTourBtn) {
  finishTourBtn.addEventListener('click', () => {
    stopLocationTour();
    stopCamera();
    showScreen('end');
  });
}

const backToHomeBtn = document.getElementById('backToHomeBtn');
if (backToHomeBtn) {
  backToHomeBtn.addEventListener('click', () => showScreen('home'));
}
