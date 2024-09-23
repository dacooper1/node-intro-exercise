const fs = require('fs');
const process = require('process')
const argv = process.argv;
const axios = require('axios')

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
        console.log(`DATA FROM ${URL}: ${res.data} `)
    } catch {
        console.log("ERR: Unable to retrieve data")
    }
}


if (argv[2].startsWith("http")) {
    webCat(argv[2])
} else {
    cat(argv[2])
}

// for ( let arg of argv ) {
//     console.log(arg)
// }

