/* global process */

var fs = require("fs");
var http = require("http");
var normalize = require("path").normalize;

var PORT = 8080; 

var indexFile = "" + fs.readFileSync(normalize(process.cwd() + "/test/index.html"));
var jsFile = "" + fs.readFileSync(normalize(process.cwd() + "/easy-ajax.js"));

var server = http.createServer(function (request, response) {
    
    console.log("\n\n\n------- INCOMING REQUEST -------\n");
    console.log("HTTP/" + request.httpVersion, request.method, request.url);
    
    console.log("\nHEADERS:\n");
    
    Object.keys(request.headers).forEach(function (key) {
        console.log("    " + key + ": " + request.headers[key]);
    });
    
    if (/\/index.html/.test(request.url)) {
        response.end(indexFile);
    }
    else if (/\/index.js/.test(request.url)) {
        response.end(jsFile);
    }
    else {
        response.end(JSON.stringify({
            foo: "bar"
        }));
    }
});

server.listen(PORT, function(){
    console.log("Go to http://localhost:" + PORT + "/index.html to test the library!");
});
