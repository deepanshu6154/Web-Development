// types of extension of all files



let input = process.argv.slice(2);
let dirPath = input[0];

function dirCreator(dirPath)
{
    if(fs.existsSync(dirPath)==false)
    {
        fs.mkdirSync(dirPath);
    }
}




// get directory name function
function getDirectoryName(dirPath)
{
    let strArray = dirPath.split(".");
    let ext = strArray.pop();

    for(let key in types)
    {
        for(let i=0;i<types[key].length;i++)
        {
            if(types[key][i]==ext)
            {
                return key;
            }
        }
    }
    return "others";
}

function isFileChecker(dirPath)
{
    return fs.lstatSync(dirPath).isFile();
}

function readContent(dirPath)
{
    return fs.readdirSync(dirPath);
}

function copyFiletoFolder(dirPath,destFolder)
{
    let orgFileName = path.basename(dirPath);
    let destFilePath = path.join(destFolder,orgFileName);
    fs.copyFileSync(dirPath,destFilePath);
}


function OrganizeDir(dirPath)
{
    let isFile = isFileChecker(dirPath);
    if(isFile==true)
    {
        let folderName = getDirectoryName(dirPath);
        console.log(dirPath + "->" + folderName);
        let destFolder = path.join(orgFileName);
        fs.copyFiletoFolder(dirPath,destFolder);
    }
    else
    {
        
        let content = readContent(dirPath);

        for(let i=0;i<content.length;i++)
        {
            let childPath = path.join(dirPath,content[i]);
            OrganizeDir(childPath);
        }

    }
}
OrganizeDir(dirPath);
