const video = document.getElementById("video");
const startButton = document.getElementById("startCamera");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models")
]).then(() => {
    console.log("Models Loaded Successfully");
});

startButton.addEventListener("click", async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });

    video.srcObject = stream;

    video.addEventListener("play", () => {

        setInterval(async () => {

            const detections = await faceapi.detectAllFaces(
                video,
                new faceapi.TinyFaceDetectorOptions()
            ).withFaceLandmarks().withFaceDescriptors();

            console.clear();
            console.log("Faces Detected:", detections.length);

        }, 1000);

    });

});
