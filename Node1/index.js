const http = require('http');
const fs = require('fs');

let dir = process.argv[2];

var outputPromisse = new Promise(function (resolve, reject) {
    fs.readdir(dir, function (err, files) {
        resolve(files);
    });
});

const server = http.createServer(function (req, res) {
    if (typeof process.argv[2] === "undefined") {
        res.write("Diretório não informado");
    }
    else {
        outputPromisse.then(function(output){
            console.log(output);
            output.forEach(function (element) {
                res.write(element+'\n');
            });
            res.end();
        });
    }

});
server.listen(3000);