const http = require('http');
const fs = require('fs');

function sendResult(result) {
	var postData = {
		'childId' : process.argv[3],
		'childPort' : process.argv[2],
		'result' : result
	};
	postData = JSON.stringify(postData);
	var options = {
		hostname: 'localhost',
		port: 3000,
		path: '/result',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
			}
		};
	var req = http.request(options, res => { });
	req.write(postData);
	req.end();
};

const server = http.createServer( (req, res) => {
	if(req.url == '/uploadfile' && req.method == 'POST') {
		var body = "";
		req.on("data", data =>{ body += data; });
		req.on("end", function() {
			var localfilepath = "./server_" + process.argv[3] + "/" + JSON.parse(body).fileName;
			fs.appendFile(localfilepath, JSON.parse(body).writeData, err => { 
				if(err) throw err
			});
		});
	}
	else if(req.url == '/startjob' && req.method == 'POST') {
		var body = "";
		req.on("data", data => { body += data; });
		req.on("end", function() {
			console.log("child at port " + process.argv[2] + " received a job");
			var job = JSON.parse(body).job;
			var tempFn = new Function(job);
			var filename = JSON.parse(body).fileName;
			console.log(body);
			//var result = job(filename);
			//sendResult(result);
		});
	}
	res.end();
});




server.on('connection', (socket) => {
	console.log("child server connection detected on port" + socket.localPort);
});

server.listen(process.argv[2]);
console.log('child server listening on port ' + process.argv[2]);