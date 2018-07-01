
const fs = require('fs');
const formidable = require('formidable');
const http = require('http');
const DFSController = require('./dfs_controller.js');
const countCharacters = require('./jobs/characterCount.js');
const countLines = require('./jobs/countLines.js');

var cummulativeResult = 0;
//creating the server object and function to upload files.
const server_obj = http.createServer( (req,res) => {
	if(req.url == '/upload') {
		var dfsc = new DFSController();
		var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
			var formidpath = files.filetoupload.path;
			var savingpath = "./uploads/" + files.filetoupload.name;
			fs.rename(formidpath,savingpath, err => {
				if(err) throw err
				else {
					dfsc.handleFileUploadFromUser(savingpath);
				  res.write("<p>file uploaded successfully!</p>");
					res.write("<a href='http://localhost:3000'>Go Home</a>");
					res.end();
				}
			});
		});
	}
	else if(req.url == '/start') {
		var dfsc = new DFSController();
		var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
			if(fields.job == 'lineCount') {
			  dfsc.handleJobUploadFromUser(fields.file, countLines);
			}
			if(fields.job == 'characterCount') {
				dfsc.handleJobUploadFromUser(fields.file, countCharacters);
			}
		});
		res.write("<a href='http://localhost:3000'>Go Home</a>");
		res.end();
	}
	else if(req.url == '/result' && req.method == 'POST') {
		var body = "";
		req.on("data", data => { body += data; });
		req.on("end", function() {
			cummulativeResult += JSON.parse(body).result;
		});
		res.end();
	}
	else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<h3>Upload a file</h3>');
		res.write('<form action="upload" method="post" enctype="multipart/form-data">');
		res.write('<input type="file" name="filetoupload"><br>');
		res.write('<br>');
		res.write('<input type="submit" value="upload">');
		res.write('</form>');
		res.write('<h3>Start a job</h3>');
		res.write('<form action="start" method="post" enctype="multipart/form-data">');
		fs.readdirSync('./uploads/').forEach(file => {
			res.write('<input type="radio" name="file" value=');
			res.write(file);
			res.write('>');
			res.write(file);
			res.write('<br>');
		});
		res.write('<br>');
		res.write('<input type="radio" name="job" value="characterCount">Count Characters <br>');
		res.write('<input type="radio" name="job" value="lineCount">Count Lines <br>');
		res.write('<input type="submit" value="start job">');
		res.write('</form>');
		res.write('<h3>Current Result: </h3>');
		res.write("" + cummulativeResult);
		res.end();
	}
});

//logging to the console whenever anyone accesses our main server.
server_obj.on('connection', (socket) => {
	console.log('main server connection detected.');
});
server_obj.listen(3000);
console.log('main server listening on port 3000');

