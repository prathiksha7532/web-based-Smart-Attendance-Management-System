const video = document.getElementById("video");
const status = document.getElementById("status");

async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("./models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("./models");

    status.innerHTML = "✅ AI Models Loaded Successfully";
}

loadModels();

async function startCamera() {

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });

    video.srcObject = stream;

    status.innerHTML = "📷 Camera Started";

}

document.getElementById("startCamera").addEventListener("click", startCamera);

video.addEventListener("play", () => {

    const canvas = faceapi.createCanvasFromMedia(video);

    document.body.append(canvas);

    const displaySize = {
        width: video.width,
        height: video.height
    };

    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {

        const detections = await faceapi
            .detectAllFaces(
                video,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptors();

        const resized = faceapi.resizeResults(detections, displaySize);

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceLandmarks(canvas, resized);

        status.innerHTML = "😊 Faces Detected: " + detections.length;

    }, 100);

});
