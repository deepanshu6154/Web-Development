let puppeteer = require("puppeteer");
let fs = require("fs");
let {email,password} = require("./secrets");
let {codes} = require("./code.js");
// const { type } = require("node:os");
let gtab;
console.log("before");
let browserPromise = puppeteer.launch(
    {headless: false,
        defaultViewport : null,
        args: ["--start-maximized",]
    }
)

browserPromise.then(function (browserInstance){
    let newPagePromise = browserInstance.newPage();           //New page function 
    return newPagePromise;
}).then(function (newTab){
        let loginPagePromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        gtab = newTab;
        return loginPagePromise;
}).then(function(){
        let emailTypePromise = gtab.type("#input-1",email,{delay:100});
        return emailTypePromise;
}).then(function(){
        let passwordTypePromise = gtab.type("#input-2",password,{delay:100});
        return passwordTypePromise;
}).then(function(){
        let clickLoginPromise = gtab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        return clickLoginPromise;
}).then(function(){
        let InterviewPreparationClickPromise = waitAndClick(".card-content h3[title='Interview Preparation Kit']");
        return InterviewPreparationClickPromise;
}).then(function(){
        let warmupChallengesClickPromise = waitAndClick(".card-content [data-attr1='warmup']");
        return warmupChallengesClickPromise;
}).then(function(){
        let url = gtab.url();
        return url;
}).then(function(url){
        let questionObj = codes[0];
        console.log("go for QS");
        questionSolver(url, questionObj.soln, questionObj.qName);
}).catch(function (err){
    console.log(err);
})


function waitAndClick(selector){                   //self made promise for wait and selector
    return new Promise(function(resolve,reject)     //bound in a wrapper of new promise
    {
        let selectorWaitforPromise = gtab.waitForSelector(selector,{visible:true});
        selectorWaitforPromise.then(function(){
            let selectorClickPromise = gtab.click(selector);
            return selectorClickPromise;
        }).then(function(){
            resolve();
        }).catch(function(){
            reject(err);
        })
    })
}


function questionSolver(modulePageUrl,soln,questionName){
    return new Promise(function(resolve,reject){
        let reachedPagePromise = gtab.goto(modulePageUrl);
        reachedPagePromise.then(function(){

            function browserConsole(questionName){
                    let allh4Ele = document.querySelectorAll("h4");    // all the questions in h4 Ele  with the help of query Sel
                    let textArr = [];              //textArr in which we fill all the question from browser
                    for(let i=0;i<allh4Ele.length;i++)
                    { 
                         textArr.push(allh4Ele[i].innerText.split("\n")[0]); 
                     }
                     let idx = textArr.indexOf(questionName);     // indexOf tells the index in an array by passing it string name
                     console.log(idx);
                     allh4Ele[idx].click();
            }

            let pageClickPromise = gtab.evaluate(browserConsole,questionName);
            return pageClickPromise; 

        }).then(function(){
            let inputClickPromise = waitAndClick("div.label");
            return inputClickPromise;
        }).then(function() {
            let typeCodepromise = gtab.keyboard.type(soln);
            return typeCodepromise;
        }).then(function () {
            let controlIsHoldPromise = gtab.keyboard.down("Control");
            return controlIsHoldPromise;
        }).then(function () {
            // ctrl a
            let aisPressedpromise = gtab.keyboard.press("a");
            return aisPressedpromise;
        }).the(function(){
            let XisPressedPromise = gtab.keyboard.press("x");
            return XisPressedPromise;
        }).then(function(){
            let inputWillBeClickedPromise = waitAndClick(".monaco-editor.no-user-select.vs");
            return inputWillBeClickedPromise;
        }).then(function () {
            // ctrl a
            let aisPressedpromise = gtab.keyboard.press("a");
            return aisPressedpromise;
            // backspace
        }).then(function(){
            let backPressedpromise = gtab.keyboard.press("Backspace");
            return backPressedpromise;
        }).then(function(){
            let vPressedPromise = gtab.keyboard.press("v");
            return vPressedPromise;
        }).then(function () {
            let controlLeaveHoldPromise = gtab.keyboard.up("Control");
            return controlLeaveHoldPromise;
        }).then(function () {
            let submitIsClickedPromise = gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return submitIsClickedPromise;
        }).then(function (){
            resolve();
        }).then(function(){
            reject(err);
        })
        
    })
}