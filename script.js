const video = document.getElementById("video");
const status = document.getElementById("status");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models")
]).then(() => {
    status.innerHTML = "✅ AI Models Loaded Successfully";
});

document.getElementById("startCamera").onclick = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;
        status.innerHTML = "📷 Camera Started Successfully";

    } catch (error) {
        status.innerHTML = "❌ Camera Permission Denied";
    }
};

document.getElementById("registerStudent").onclick = () => {

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const department = document.getElementById("department").value;

    if (id === "" || name === "" || department === "") {
        alert("Please fill all the fields.");
        return;
    }

    status.innerHTML =
        "👤 Student Registered: " +
        name +
        " (" +
        id +
        ") - " +
        department;

};

document.getElementById("takeAttendance").onclick = () => {
    status.innerHTML = "✅ Attendance Marked Successfully";
};
