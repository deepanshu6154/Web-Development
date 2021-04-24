let root = {

    name:"d10",
    children:[{
        name:"d20",
        children:[{
            name:"d40",
            children:[]
        } ,{
            name:"F1.txt",
            children:[]
        } ]
    },{
        name:"d30",
        children:[{
            name:"d50",
            children:[]
        }, {
            name:"d60",
            children:[]
        }]
    },{
        name:"F1.txt",
        children:[]
    }]


}

function gTree(node)
{
    let meNMyfamily = node.name+">-" ;
    for(let i=0;i<node.children.length;i++)
    {
        meNMyfamily += node.children[i].name + "," ;
    }
    console.log(meNMyfamily);

    for(let i=0;i<node.children.length;i++)
    {
        gTree(node.children[i]);
    }
}

gTree(root);