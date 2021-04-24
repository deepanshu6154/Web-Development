let fs = require("fs");
function isFileChecker(dirPath)
{
    return fs.lstatSync(dirPath).isFile();
}

function readContent(dirPath)
{
    return fs.readdirSync(dirPath);
}

function viewFlat(dirPath)
{
    let isFile = isFileChecker(dirPath);
    if(isFile==true)
    {
        console.log(dirPath+"*");
    }
    else
    {
        console.log(dirPath+"/");
        let children = readContent(dirPath);

        for(let i=0;i<children.length;i++)
        {
            viewFlat(dirPath+"/"+children[i]);
        }

    }
}

viewFlat("d10");