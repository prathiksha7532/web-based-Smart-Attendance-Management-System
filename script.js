const video = document.getElementById("video");
const startButton = document.getElementById("startCamera");

startButton.addEventListener("click", async () => {

    await faceapi.nets.tinyFaceDetector.loadFromUri("models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("models");

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            alert("Camera access denied!");
            console.log(err);
        });

});
