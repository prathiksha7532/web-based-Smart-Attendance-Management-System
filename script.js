const video = document.getElementById("video");
const status = document.getElementById("status");

async function loadModels() {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("./models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("./models");

        if (status) {
            status.innerHTML = "✅ AI Models Loaded Successfully";
        }

        console.log("Models loaded");
    } catch (error) {
        console.error(error);
        if (status) {
            status.innerHTML = "❌ Error Loading AI Models";
        }
    }
}

loadModels();

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;

        if (status) {
            status.innerHTML = "📷 Camera Started";
        }

    } catch (error) {
        alert("Camera permission denied.");
    }
}

const startBtn = document.getElementById("startCamera");

if (startBtn) {
    startBtn.addEventListener("click", startCamera);
}
