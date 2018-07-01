const readline = require('readline');
const fs = require('fs');

function characterCount(filepath, char) {
	var count = 0;
	var fileopen = fs.createReadStream(filepath);
	var lineReader = readline.createInterface(fileopen)
	lineReader.on('line', line => {
		for(var i = 0; i < line.length; i++) {
			if(line.charAt(i) == char) {
				count++;
			}
		}
	});
	lineReader.on('close', function() {
		return count;
	});
}

module.exports = characterCount;