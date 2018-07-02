const readline = require('readline');
const fs = require('fs');

var characterCount = function(filepath) {
	var count = 0;
	console.log("countLines started on filepath: " + filepath);
	var lines = fs.readFileSync(filepath).toString().split(/[\n\r]/);
	for(var i = 0; i < lines.length; i++) {
		count += lines[i].length;
	}
	return count;
}

module.exports = characterCount;