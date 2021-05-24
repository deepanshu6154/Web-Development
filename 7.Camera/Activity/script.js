let mediaRecorder;
let buffer = []
let videoEle = document.querySelector("#video-ele");
let videoRecorder = document.querySelector("#record-btn");
let recordState = false;

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
        mediaRecorder.start();
        videoRecorder.innerHTML = "Recording....";
        recordState = true;
    }
    else{
        mediaRecorder.stop();
        videoRecorder.innerHTML = "Record";
        recordState = false;
    }
})