let puppeteer = require("puppeteer");
let fs = require("fs");
let {email,password} = require("./secrets");
let {codes} = require("./code.js");

console.log("before");
(async function() {
    try{
    let browserInstance = await puppeteer.launch(
    {headless: false,
        defaultViewport : null,
        args: ["--start-maximized",]});
    let newTab = await browserInstance.newPage();           //New page function 
    await newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    await newTab.type("#input-1",email,{delay:100});
    await newTab.type("#input-2",password,{delay:100});
    await newTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled",newTab);
    await waitAndClick(".card-content h3[title='Interview Preparation Kit']",newTab);
    await waitAndClick(".card-content [data-attr1='warmup']",newTab);
    let url = newTab.url();
    for(let i=0;i<codes.length;i++)
    {
        await questionSolver(url, codes[i].soln, codes[i].qName, newTab);
    }
}
    catch(err)
    {
        console.log(err);
    }

}) ();


async function waitAndClick(selector,gtab){                   //self made promise for wait and selector
        await gtab.waitForSelector(selector,{visible:true});
        let clickSelector =  gtab.click(selector);  
        return clickSelector;      
    }


async function questionSolver(modulePageUrl,soln,questionName,newTab){
        await gtab.goto(modulePageUrl);

        async function browserConsole(questionName){
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

        await newTab.evaluate(browserConsole,questionName);
        await waitAndClick("div.label");
        await newTab.keyboard.type(soln);
        await newTab.keyboard.down("Control");
        await newTab.keyboard.press("a");
        await newTab.keyboard.press("x");
        await waitAndClick(".monaco-editor.no-user-select.vs");
        await newTab.keyboard.press("a");
        await newTab.keyboard.press("Backspace");
        await newTab.keyboard.press("v");
        await newTab.keyboard.up("Control");
        let submit =  newTab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
        return submit;
}