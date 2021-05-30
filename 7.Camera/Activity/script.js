let mediaRecorder;
let buffer = []
let videoEle = document.querySelector("#video-ele");
let videoRecorder = document.querySelector("#record-btn");
let recordState = false;
let captureBtn = document.querySelector("#capture-btn");
let timer = document.querySelector(".timer");
let obj;
// let audioEle = document.querySelector("audio");
let constraints = {
    video: true,
    audio: true
}
navigator.mediaDevices.getUserMedia(constraints)
         .then(function (mediaStream){

             videoEle.srcObject = mediaStream;
             mediaRecorder = new MediaRecorder(mediaStream);
             mediaRecorder.addEventListener("dataavailable", function(e){
                buffer.push(e.data);
             })
             mediaRecorder.addEventListener("stop", function() {
                // convert that data into a blob
                        // mime type
                        let blob = new Blob(buffer, { type: "video/mp4"});
                        // blob convert -> url
                         let url = window.URL.createObjectURL(blob);
                        //  Download btn
                        let a = document.createElement("a");
                        //  download
                        a.download = "file.mp4"; 
                        a.href = url;
                        a.click();
                        buffer = [];
             })
            
         }).catch(function (err){
             console.log(err);
         });

videoRecorder.addEventListener("click", function() {
    if(!mediaRecorder)
    {
        alert("Allow permissions");
        return ;
    }
    if(recordState==false)
    {
        videoRecorder.classList.add("active");
        mediaRecorder.start();
        startTimer();
        // videoRecorder.innerHTML = "Recording....";
        recordState = true;
    }
    else{
        videoRecorder.classList.remove("active");
        mediaRecorder.stop();
        // videoRecorder.innerHTML = "Record";
        stopTimer();
        recordState = false;
    }
})

captureBtn.addEventListener("click",function(){
    // create canvas element equal to video frame
    captureBtn.classList.add("short-active");
    let canvas = document.createElement("canvas");
    canvas.width = videoEle.videoWidth;
    canvas.height = videoEle.videoHeight;
    let tool = canvas.getContext("2d");
    // draw a frame on that canvas
    tool.drawImage(videoEle,0,0);
    // toDataUrl
    let link = canvas.toDataURL();
    let anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = "file.png";
    anchor.click();
    anchor.remove();
    canvas.remove();
    setTimeout(function(){
        captureBtn.classList.remove("short-active");
    },1000)
})

function startTimer(){
    let count = 0;
    timer.classList.add("active-timer");
    obj = setInterval(function() {
        let sec = (count%60)<10 ? `0${count%60}` : `${count%60}` ;
        let min = (count/60)<10 ? `0${Number.parseInt(count/60)}` : `${Number.parseInt(count/60)}`;
        let hr = (count/3600)<10 ? `0${Number.parseInt(count/3600)}` : `${Number.parseInt(count/3600)}` ;
        timer.innerText = `${hr}:${min}:${sec}` ;
        count++;
    }, 1000);

}

function stopTimer(){
    timer.classList.remove("active-timer");
    timer.innerText = "00:00:00" ;
    clearInterval(obj);
}