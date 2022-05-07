
const sha256 = require('./sha256.js');

const utils = { 

	convertCharToBinary: function (char) { 
		var asciiBinaryTemplate = "00000000";
		if(char === undefined) return asciiBinaryTemplate;
		if(char === '') return asciiBinaryTemplate;
		if(char.length > 1) return asciiBinaryTemplate;
		var charAsBinary = char[0].charCodeAt(0).toString(2);
		return (asciiBinaryTemplate + charAsBinary).slice(-asciiBinaryTemplate.length);
	},

	hash: function(stringToHash) { 
		var message = stringToHash.toString();
		var digest = sha256(message);
		return digest.toString();
	}

};

module.exports = utils;
