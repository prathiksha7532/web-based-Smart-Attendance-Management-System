const video = document.getElementById("video");
const status = document.getElementById("status");

async function loadModels() {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("./models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("./models");

        status.innerHTML = "✅ AI Models Loaded Successfully";
    } catch (err) {
        status.innerHTML = "❌ Failed to load AI models";
        console.log(err);
    }
}

loadModels();

async function startCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;

        status.innerHTML = "📷 Camera Started";

    } catch (err) {

        status.innerHTML = "❌ Camera Permission Denied";

    }

}

const startButton = document.getElementById("startCamera");

if(startButton){
    startButton.addEventListener("click", startCamera);
}

if(video){

video.addEventListener("play", () => {

    const canvas = faceapi.createCanvasFromMedia(video);

    document.body.append(canvas);

    const displaySize = {
        width: video.width,
        height: video.height
    };

    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {

        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptors();

        const resized = faceapi.resizeResults(detections, displaySize);

        canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);

        faceapi.draw.drawDetections(canvas,resized);
        faceapi.draw.drawFaceLandmarks(canvas,resized);

        status.innerHTML="😊 Faces Detected : "+detections.length;

    },100);

});

}

const attendanceButton = document.getElementById("takeAttendance");

if(attendanceButton){

attendanceButton.addEventListener("click",()=>{

const today=new Date();

alert("✅ Attendance Marked Successfully\n\nDate : "
+today.toLocaleDateString()+
"\nTime : "
+today.toLocaleTimeString());

});

}

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
