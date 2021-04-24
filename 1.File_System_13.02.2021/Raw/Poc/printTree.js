let fs = require("fs");
let path = require("path");
function isFileChecker(dirPath)
{
    return fs.lstatSync(dirPath).isFile();
}

function readContent(dirPath)
{
    return fs.readdirSync(dirPath);
}

function viewTree(dirPath,indent)
{
    let isFile = isFileChecker(dirPath);
    if(isFile==true)
    {
        console.log(indent,path.basename(dirPath)+"*");
    }
    else
    {
        console.log(indent,path.basename(dirPath));
        let children = readContent(dirPath);

        for(let i=0;i<children.length;i++)
        {
            viewTree(path.join(dirPath,children[i]),indent+"\t" , );
        }

    }
}

viewTree("E:\\Placement Program\\File_System_13.02.2021","");