const fs = require('fs');
const process = require('process')
const argv = process.argv;

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

cat(argv[2])

