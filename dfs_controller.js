const fs = require('fs');
const readline = require('readline');
const path = require('path');
const os = require('os');
const http = require('http');

class DFSController { 
	
	handleFileUploadFromUser(filepath) { 
		console.log(filepath);
		this.spliceAndSendToChildren(filepath);
	};
	
	handleJobUploadFromUser(filename, job) {
		console.log(job);
		var childServer = 8080;
		var postData = {
			'fileName' : path.parse(filename).base,
			'job' : job.toString()
		};
		postData = JSON.stringify(postData);
		var options = {
			hostname: 'localhost',
			port: childServer,
			path: '/startjob',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(postData)
				}
			};
		for(var i = 0; i < 3; i++) {
			options.port = (childServer + i);
			var req = http.request(options, res => { });
			req.write(postData);
			req.end();
		}
	};
	
	spliceAndSendToChildren(filepath) {
		var childServer = 8080;
		var linesCounted = 0;
		fs.readFile(filepath, (err,data) => {
			var reader = readline.createInterface({
				input: fs.createReadStream(filepath),
				console: false
			});
			reader.on('line', line => {
				linesCounted += 1;
				if(linesCounted > 10) {
					childServer += 1;
					linesCounted = 0;
					if(childServer > 8082) childServer = 8080;
				}
				var postData = {
					'fileName' : path.parse(filepath).base,
					'writeData' : (line + os.EOL)
				};
				postData = JSON.stringify(postData);
				var options = {
					hostname: 'localhost',
  				port: childServer,
  				path: '/uploadfile',
					method: 'POST',
  				headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Content-Length': Buffer.byteLength(postData)
					}
  			};
				var req = http.request(options, (res) => {   });
				req.write(postData);
				req.end();
			});
		});
	};
	
};

module.exports = DFSController;//we set our module.exports to the class so that only that is exported.
//when we require() it, the return value will be the class.