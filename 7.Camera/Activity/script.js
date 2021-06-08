let mediaRecorder;
let buffer = []
let videoEle = document.querySelector("#video-ele");
let videoRecorder = document.querySelector("#record-btn");
let recordState = false;
let captureBtn = document.querySelector("#capture-btn");
let timer = document.querySelector(".timer");
let obj;
let allFilter = document.querySelectorAll(".filter");
let uiFilter = document.querySelector(".ui-filter");
let filterColor = "";
let plusBtn = document.querySelector(".fa-plus");
let minusBtn = document.querySelector(".fa-minus");
let zoomLevel = 1;

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
                        //  let url = window.URL.createObjectURL(blob);
                        addMediaToDB(blob,"video");
                        //  Download btn
                        // let a = document.createElement("a");
                        //  download
                        // a.download = "file.mp4"; 
                        // a.href = url;
                        // a.click();
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

    tool.scale(zoomLevel, zoomLevel);
    let x = (tool.canvas.width / zoomLevel - canvas.width) / 2;
    let y = (tool.canvas.height / zoomLevel - canvas.height) / 2;
    // draw image
    tool.drawImage(videoEle, x, y); 

    if(filterColor){
        // fill filter color in rectangle
        tool.fillStyle = filterColor;
        // translucent
        tool.fillRect(0,0,canvas.width,canvas.height);
    }


    // toDataUrl
    let link = canvas.toDataURL();
    addMediaToDB(link,"img");
    // let anchor = document.createElement("a");
    // anchor.href = link;
    // anchor.download = "file.png";
    // anchor.click();
    // anchor.remove();
    // canvas.remove();
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

// adding event listener to all filter

for(let i=0;i<allFilter.length;i++){
    allFilter[i].addEventListener("click",function(e){
        let color = allFilter[i].style.backgroundColor ;
        if(color!=""){
            uiFilter.classList.add("ui-filter-active");
            uiFilter.style.backgroundColor = color;
            filterColor = color;
        }
        else{
            uiFilter.classList.remove("ui-filter-active");
            uiFilter.style.backgroundColor = "" ;
            filterColor = "" ;
        }
    })
}

plusBtn.addEventListener("click",function(){
    if(zoomLevel<3){
        zoomLevel += 0.2;
        videoEle.style.transform = `scale(${zoomLevel})` ;
    }
})

minusBtn.addEventListener("click",function(){
    if(zoomLevel>1){
        zoomLevel -= 0.2;
        videoEle.style.transform = `scale(${zoomLevel})` ;
    }
})