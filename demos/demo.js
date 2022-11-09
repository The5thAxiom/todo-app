const http = require('http');
const url = require('url');
const fs = require('fs');

// create a server on port '1234'
http.createServer((req, res) => {
    // setting the http headers
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // accessing the url
    res.write(`Hello!!!, you're on ${req.url}<br>`);

    // we can even parse the url for query parameters
    const qs = url.parse(req.url, true).query;
    for (let q in qs) {
        res.write(`${q}: ${qs[q]}<br>`);
    }

    // append the request details to a file
    fs.appendFile(
        'queries.txt',
        `${new Date().toLocaleString()}: ${req.url}\n`,
        err => {
            if (err) throw err;
            console.log('appended query');
        }
    );

    // end the request
    res.end();
}).listen(1234);

console.log("Server started at 'http://localhost:1234'");
