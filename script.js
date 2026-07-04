const video = document.getElementById("video");
const status = document.getElementById("status");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models")
]).then(() => {
    status.innerHTML = "✅ AI Models Loaded Successfully";
});

document.getElementById("startCamera").onclick = async function () {

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;
        status.innerHTML = "📷 Camera Started";

    } catch (error) {
        status.innerHTML = "❌ Camera Permission Denied";
    }

};

document.getElementById("registerStudent").onclick = function () {
    alert("👤 Student Registration - Coming Soon");
};

document.getElementById("takeAttendance").onclick = function () {
    alert("✅ Attendance Marked - Coming Soon");
};
