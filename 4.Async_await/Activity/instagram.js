let puppeteer = require("puppeteer");
let {username,password} = require("./secrets.js");
let url = "https://www.instagram.com/";
let numOfPost = process.argv[2];

(async function launch(){
    let browserInstance = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    })

    await InstagramLike(url,browserInstance);

})()

async function InstagramLike(url,browser){
    let page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']",username,{delay:200});
    await page.type("input[name='password']",password,{delay:200});
    await page.click("button[type='submit']");
    await page.waitForSelector(".cmbtv button[type='button']");
    await page.click(".cmbtv button[type='button']");
    await page.waitForSelector(".aOOlW.bIiDR ");
    await page.click(".aOOlW.bIiDR ");
    // await page.waitForSelector("input[placeholder='Search']");
    await page.type("input[placeholder='Search']","Pepcoding",{delay:200});   //type pepcoding
    await page.waitForSelector("a[class='-qQT3']");   //wait for pepcoding page
    await page.click("a[class='-qQT3']");     //click on pepcoding page
    
    await page.waitForSelector("._9AhH0",{visible:true});
    await Promise.all([
        page.waitForNavigation({waitUntil:"networkidle2"}),
        page.click("._9AhH0")
    ]);
    
    for(let i=0;i<numOfPost;i++)
    {

            await page.waitForSelector(".fr66n .wpO6b",{visible:true});
            await page.click(".fr66n .wpO6b");

            await page.waitForSelector("._65Bje.coreSpriteRightPaginationArrow",{visible:true});
            await page.click("._65Bje.coreSpriteRightPaginationArrow");
    }

}

