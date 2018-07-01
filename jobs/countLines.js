const readline = require('readline');
const fs = require('fs');

function countLines(filepath) {
	var count = 0;
	var fileopen = fs.createReadStream(filepath);
	var lineReader = readline.createInterface(fileopen)
	lineReader.on('line', line => {
		count += 1;
	});
	lineReader.on('close', function() {
		return count;
	});
}

module.exports = countLines;