let request = indexedDB.open("camera",1);
let db;

request.onsuccess = function(e){
    db = e.target.result;
}

request.onerror = function(e){
    console.log("error")
}

request.onupgradeneeded = function(e){
    db = e.target.result;
    db.createObjectStore("img",{keyPath: "mid"});
    db.createObjectStore("video", {keyPath:"mid"});
}

function addMediaToDB(data,table){
    if(db){
        // first we need to get transaction
        let tx = db.transaction(table,"readwrite");
        // get table reference
        let store = tx.objectStore(table);
        // add
        store.add({mid: Date.now(), media: data});
    }
    else{
        alert("db is loading")
    }
}