let fs = require("fs");
let path = require("path");
let cheerio = require("cheerio");
let request = require("request");
let PDFDocument = require("pdfkit");
const { table } = require("node:console");
let url = "https://www.imdb.com/chart/top/";

request(url,cb);

function cb(err,response,html)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        // console.log(html);
        ExtractHTML(html);
    }
}

function ExtractHTML(html)
{
    let selTool = cheerio.load(html);
    let movieTag = selTool("tbody.lister-list .titleColumn");
    let ratingTag = selTool("td.ratingColumn.imdbRating");
    let anchorTag = selTool("td.titleColumn a");
    for(let i=0;i<15;i++)
    {
        let link = selTool(anchorTag[i]).attr("href");
        let fullLink = "https://www.imdb.com" + link ;
        let movieName = selTool(movieTag[i]).text().split(".");
        movieName = movieName.pop().trim();
        movieName = movieName.split("(");
        let ReleaseYear = movieName.pop();
        ReleaseYear = ReleaseYear.split(")")[0].trim();
        movieName = movieName[0].trim();
        // console.log(movieName +"  " + ReleaseYear);

        let rating = selTool(ratingTag[i]).text().trim();
        // console.log(movieName +" is released in " + ReleaseYear +" with rating "+ rating);
        // console.log("**********************************************");
        // console.log(link);
        // dirCreater(movieName);
        getSummary(fullLink,movieName,rating,ReleaseYear);
    }
    
}

function getSummary(fullLink,movieName,rating,ReleaseYear)
{
    request(fullLink,cb);
    function cb(err,response,html)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            extractSummary(html,movieName,rating,ReleaseYear);
        }
    }
}


function extractSummary(html,movieName,rating,ReleaseYear)
{
    let summaryPage = cheerio.load(html);
    let summaryText = summaryPage("div.summary_text").text().trim();
    let summaryItem = summaryPage("div.credit_summary_item");
    let s = ""+summaryText //+"\n";
    for(let i=0;i<summaryItem.length;i++)
    {
        let item = summaryPage(summaryItem[i]).text().trim();
        item = item.split("|")[0].trim();
        s = s+item ;  //+ "\n";
        
    }
    let arr = [];
    // console.log(s);
    // console.log("**********************************************");
    // summaryPlot = summaryPlot.split(".").trim()
    // console.log(summarPlot);
    arr.push(
        {movieName,
            rating ,
         ReleaseYear,
       "Summary " : s}
    )

    console.log(arr);
    // let filePath = path.join(__dirname , movieName + ".pdf");
    // let pdfDoc = new PDFDocument;
    // pdfDoc.pipe(fs.createWriteStream(filePath));
    // pdfDoc.text(JSON.stringify(arr));
    // pdfDoc.end();
}


// function dirCreater(topicName) {
//     let pathOfFolder = path.join(__dirname, topicName);
//     if (fs.existsSync(pathOfFolder) == false) {
//         fs.mkdirSync(pathOfFolder);
//     }
// }

