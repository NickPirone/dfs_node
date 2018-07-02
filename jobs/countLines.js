const readline = require('readline');
const fs = require('fs');

var countLines = function(filepath) {
	console.log("countLines started on filepath: " + filepath);
	var lines = fs.readFileSync(filepath).toString().split(/[\n\r]/);
	return lines.length;
}

/*
function stringify_replacer(key,value) {
  return typeof value === "function" ? value.toString() : value;
};

function reviveFunctionEval(key,value) {
	if(typeof value === "string" && value.indexOf('function') === 0) {
		var functionTemplate = '(' + value + ')';
		var fn = eval(functionTemplate);
		return fn;
	}
};

function reviveFunctionNew(key,value) {
	if(typeof value === "string" && value.indexOf('function') === 0) {
		var functionTemplate = '(' + value + ').call(this)';
		var fn = new Function(functionTemplate);
		return fn;
	}
};
*/

module.exports = countLines;

/*
//var tost = countLines.toString();
var jsontost = JSON.stringify(countLines,stringify_replacer);
//console.log(tost);
console.log(jsontost);

var revived = JSON.parse(jsontost, reviveFunctionEval);
console.log(revived);

revived("characterCount.js");
*/

