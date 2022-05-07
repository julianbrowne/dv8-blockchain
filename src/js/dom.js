
const utils = require("./utils");

const dom = { 

	computeDigestAndInsertForInputElement: function(element) { 
		var partnerDigestElement = $("#"+element.attr("id")+"-digest");
		partnerDigestElement.val(utils.hash(element.val()));
	}

	/*
	// return the paired digest element for a given text input element

	getPartnerDigestDisplayElement: function(textElement) { 
		return textElement
			.closest(".bc-group")
			.find(".bc-hash-text-display")
			.first();
	},

	// display digest of message from one element in another

	displayDigestOfElementMessageInElement: function(messageElement, digestElement) { 
		var messageElementValue = messageElement.val();
		var digestValue = utils.hash(messageElementValue);
		digestElement.val(digestValue);
	},

	// retreive value of element

	updateHashValueForTextInput: function(element, value) { 
		var element = (element == undefined) ? $(this) : element;
		var textInputElementValue = (value == undefined) ? element.val() : value;
		var digest = utils.hash(textInputElementValue);
		var partnerHashTextDisplayElement = dom.getPartnerDigestDisplayElement(element);
		partnerHashTextDisplayElement.val(digest);
	}
	*/

};

module.exports = dom;
