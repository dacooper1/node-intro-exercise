const fs = require('fs');
const process = require('process')
const argv = process.argv;
const axios = require('axios')

let outputFileName;
let path;

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
       if (err) {
        console.log(`ERROR: ${err}`)
        process.exit(1)
       } else {
        console.log(data)
       }
    });
}

async function webCat(URL) {
    try {
        let res = await axios.get(URL)
        console.log(`DATA FROM ${URL}: ${res.data}`)
    } catch {
        console.log("ERR: Unable to retrieve data")
    }
}


function determineDataOutput (data, outputFileName) {
    if (outputFileName) {
        fs.writeFile(outputFileName, data, 'utf8', function(err) {
            if (err) {
                console.log(`ERR: ${err}`)
                process.exit(1)
            } 
        });
    }  else {
        console.log(data);
    }
}

function catWrite(path, outputFileName) {
    fs.readFile(path,'utf8', function(err, data){
        if (err) {
            console.log(`ERROR: ${err}`)
            process.exit(1)
        } else {
            determineDataOutput(data, outputFileName)
        }
    });
}

async function webCatWrite(URL, outputFileName) {
    try {
        let res = await axios.get(URL)
        determineDataOutput(res.data, outputFileName)
    } catch (err) {
        console.log(`ERR: Unable to retrieve data ${err}`)
        process.exit(1)
    }
}

if (argv[2].startsWith("--out")) {
    outputFileName = argv[3];
    path = argv[4];
} else {
    path = argv[2];
}

if (path.startsWith("http")) {
    webCatWrite(path, outputFileName)
} else {
    catWrite(path, outputFileName)
}