// no of videos
// Number of views
// time length of video
// list of videos - excel

let puppeteer = require("puppeteer");
let fs = require("fs");


// let arr= document.querySelectorAll("#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
// let newArr = [];
// newArr.push(arr[0].innerText,arr[1].innerText);
// newArr


// let arr = document.querySelectorAll(".style-scope.ytd-thumbnail-overlay-time-status-renderer")
// let newArr= [];
// for(let i=0;i<arr.length;i++){
//     if(i%2==1){
//         newArr.push(arr[i].innerText)}
// }
// newArr


(async function launch(){
    let browserInstance = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args :["--startmaximized"]
    })

    let page = await browserInstance.newPage();
    await page.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");

    let numOfviewsandVideos = await page.evaluate(viewsAndVideos,"#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
    let numOfVideos = numOfviewsandVideos[0].split(" ")[0];
    numOfVideos = Number(numOfVideos);
    
})()


async function viewsAndVideos(viewsSelector,timeSelector){
    let arr= document.querySelectorAll(viewsSelector);
    let newArr = [];
    newArr.push(arr[0].innerText,arr[1].innerText);
    return newArr;
}