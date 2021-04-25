let puppeteer = require("puppeteer");
let links = ["https://www.amazon.in/","https://www.flipkart.com/","https://paytmmall.com/"];
let fs = require("fs");
let pName = process.argv[2];

(async function launch(){
    try{

        let browserInstance = await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"]  })

        await getAmazonData(links[0],pName,browserInstance) ;
        await getFlipkartData(links[1],pName,browserInstance);
        await getPaytmMallData(links[2],pName,browserInstance);
    }
    catch(err){
        console.log(err);
    }
})()

async function getAmazonData(url,name,browser){
    let page = await browser.newPage();
    await page.goto(url);
    await page.type("input[type='text']",pName,{delay:200});
    await page.click("input[id='nav-search-submit-button']");
    await page.waitForSelector(".a-price-whole");

    function consoleFn(pNameSelector,priceSelector){
        let priceArr = document.querySelectorAll(priceSelector);
        let pNameArr = document.querySelectorAll(pNameSelector);
        let arr = [];
        for(let i=0;i<5;i++)
        {
            Price = priceArr[i].innerText;
            Name  = pNameArr[i].innerText;
            arr.push( 
                {Name,Price} )
        }

        return arr;
    }
        let details = await page.evaluate(consoleFn,".a-size-medium.a-color-base.a-text-normal",".a-price-whole");
        console.table(details);   
}

async function getFlipkartData(url,name,browser){
    let page = await browser.newPage();
    await page.goto(url);
    await page.click("button[class='_2KpZ6l _2doB4z']");
    await page.type("input[type='text']",pName,{delay:200});
    await page.click("button[type='submit']");
    await page.waitForSelector("._4rR01T");
    await page.waitForSelector("[class='_30jeq3 _1_WHN1']")

     async function consoleFn(pNameSelector,priceSelector){

            let priceArr = document.querySelectorAll(priceSelector);
            let pNameArr = document.querySelectorAll(pNameSelector);
            let arr = [];
            for(let i=0;i<5;i++)
            {
                let Price = priceArr[i].innerText;
                let Name = pNameArr[i].innerText;
                arr.push({
                    Name , Price})
            }
            return arr;
    }

    let details = await page.evaluate(consoleFn,"._4rR01T","[class='_30jeq3 _1_WHN1']");
    console.table(details);
}

async function getPaytmMallData(url,name,browser){
    let page = await browser.newPage();
    await page.goto(url);
    await page.type("input[type='search']",pName,{delay:200});
    await page.keyboard.press("Enter");
    await page.waitForSelector("[class='UGUy']");
    await page.waitForSelector("div._1kMS");

    async function consoleFn(pNameSelector,priceSelector){
        let pNameArr = document.querySelectorAll(pNameSelector);
        let priceArr = document.querySelectorAll(priceSelector);
        let arr = [];
        for(let i=0;i<5;i++)
        {
            let Name = pNameArr[i].innerText;
            let Price = priceArr[i].innerText;
            arr.push({
                Name , Price
            })
        }
        return arr;
    }
    let details = await page.evaluate(consoleFn,"[class='UGUy']","div._1kMS");
    console.table(details);

}