
const dom = require('./dom');
const Miner = require('./Miner');

Reveal.initialize({ 
	history: true,
	center: false,
	dependencies: [ 
		{ src: 'vendor/external/external.js', 
			condition: function() { 
				return !!document.querySelector( '[data-external]' ); }
		}
	]
});

Reveal.addEventListener("pinboard", function() { 

	$("#frame").closest("section").first().addClass("scrollable");

	var modal = $("#image-modal");

	modal.prependTo($("body"));

	modal.on("click", function() { 
		modal.css("display", "none");
	});

	modal.find("img").on("click", function() { 
		modal.css("display", "none");
	});

	$("#frame .note img").each(function() { 
		$(this).on("click", function() { 
			var imageSource = $(this).attr("src");
			modal.css("display","block");
			modal.find("img").attr("src", imageSource);
		})
	});

});

Reveal.addEventListener("xor", function() { 

	var textInputs = $("section.present input.data-entry");

	var displayElemenents = $("section.present input.info-only")
		.filter("input:not(.transparent)")
		.filter("input:not(.invisible)");

	function parseCharacterInput() { 
		var char = $(this).val();
		var charAsBinaryString = BCDemo.utils.convertCharToBinary(char);
		$(this).data("bin-string", charAsBinaryString);
		for(var i=0; i<charAsBinaryString.length; i++) { 
			var outputTargetSelector = "#" + $(this).attr("id") + "-" + i;
			$(outputTargetSelector).val(charAsBinaryString[i]);
		}
	}

	textInputs.keyup(parseCharacterInput);

	$("#clear-digits").on("click", function() { 
		textInputs.val("");
		displayElemenents.val("");
		displayElemenents.css("background", "#15B5D5");
	});

	$("#do-xor").on("click", function() { 

		displayElemenents.css("background", "#15B5D5");

		var lastBinaryString = "";
		var result = [];

		textInputs.each(function() { 
			if($(this).val()==="") return;
			var thisBinaryString = $(this).data("bin-string").toString();
			if(lastBinaryString === "") { 
				lastBinaryString = thisBinaryString;
			}
			else { 
				for(var i=0; i<thisBinaryString.length; i++) { 
					var a = parseInt(lastBinaryString[i]);
					var b = parseInt(thisBinaryString[i]);
					isXOR = (( a || b ) && !( a && b ));
					var newDigit = isXOR ? "1" : "0";
					result[i] = newDigit;
					$("#xor-out-" + i).val(newDigit);
					if(newDigit==="1") { 
						$("#xor-char1-" + i).css("background", "#F00058");
						$("#xor-char2-" + i).css("background", "#F00058");
					}
				}
			}
		})
		.promise()
    	.done(function() { 
    		if(result.length===8)
    			$("#xor-out").val(parseInt(result.join(""), 2).toString());
    	});
	});

});

Reveal.addEventListener("hash", function() { 

	function init() { 
		$("#message-input").val("");
		$("#digest-output").val("");
		$("#digest-save").val("");
		$("#digest-output").val(BCDemo.utils.hash($("#message-input").val()));
	};

	init();

	var modal = $("#search-modal");
	modal.prependTo($("body"));
	modal.on("click", function() { 
		modal.css("display", "none");
	});

	$("#message-input").keyup(function() { 
		$("#digest-output").val(BCDemo.utils.hash($("#message-input").val()));
	});

	$("#clear-textarea").on("click", init);

	$("#save-hash").on("click", function() { 
		$("#digest-save").val($("#digest-output").val());
	});

	$("#shakespeare").on("click", function() { 
		$("#message-input").val("I have of late, wherefore I know not, lost all my mirth, forgone all custom of exercises, and indeed it goes so heavily with my disposition that this goodly frame, the earth, seems to me a sterile promontory; this most excellent canopy, the air, look you, this brave o'erhanging firmament, this majestical roof fretted with golden fire, why it appears no other thing to me than a foul and pestilent congregation of vapors. What a piece of work is a man! How noble in reason, how infinite in faculty! In form and moving how express and admirable! In action how like an angel, in apprehension how like a god! The beauty of the world. The paragon of animals. And yet, to me, what is this quintessence of dust? Man delights not me. No, nor woman neither");
		$("#digest-output").val(BCDemo.utils.hash($("#message-input").val()));
	});

	$("#sign-alice").on("click", function() { 
		$("#message-input").val("????");
		$("#digest-output").val("????");
		$("#digest-save").val(BCDemo.utils.hash("alice"));
	});

	$("#google").on("click", function() { 
		const search = "https://www.google.co.uk/search";
		modal.find("iframe").attr("src", search + "?q=" + $("#digest-output").val());
		modal.css("display","block");
	});

});

Reveal.addEventListener('links', function() { 

	var textInputs = $("section.present .hash-chain-data input.data-entry");
	var formRows = $("section.present .hash-chain-data .form-row");

	function resetInputs() { 
		textInputs.each(function() { $(this).val(""); });
	};

	function cascadeHashes() { 
		lastHash = null;
		textInputs.each(function() { 

			var partnerDigestElement = $("#"+$(this).attr("id")+"-digest");

			if(!lastHash) { 
				partnerDigestElement.val(BCDemo.utils.hash($(this).val()));
			}
			else { 
				partnerDigestElement.val(BCDemo.utils.hash(lastHash + $(this).val()));
			}

			lastHash = partnerDigestElement.val();

			if(partnerDigestElement.hasClass("saved")) { 

				if(partnerDigestElement.data("stored-hash")!==partnerDigestElement.val()) { 
					partnerDigestElement.addClass("alert");
				}
				else { 
					partnerDigestElement.data("stored-hash", partnerDigestElement.val());
					partnerDigestElement.removeClass("alert");
				}

			}
		});
	};

	$("#clear-all").on("click", function() { 
		resetInputs();
		cascadeHashes();
	});

	$("#add-row").on("click", function() { 
		var hiddenFormRows = $('section.present .form-row[style*="display: none"]');
		if(hiddenFormRows.length > 1) { 
			$(hiddenFormRows).eq(0).show();
			$(hiddenFormRows).eq(1).show();
		}
	});

	$(textInputs).keyup(function() { 
		cascadeHashes();
	});

	$("#add-legal").on("click", function() { 
		$("#s10-message-01").val("I leave all my money to Alice");
		$("#s10-message-02").val("I leave 50% of my money to Alice, 50% to the Cat's Home");
		$("#s10-message-03").val("I leave 100% of my money to the Cat's Home");
		cascadeHashes();
	});

	$(".remember-digest").on("click", function() { 
		var thisImage = $(this).attr("src");
		var newImage = (thisImage === "assets/img/icons/padlock-unlocked.png") ? "assets/img/icons/padlock-locked.png" : "assets/img/icons/padlock-unlocked.png";
		$(this).attr("src", newImage);
		var inputElement = $(this).prev();
		inputElement.toggleClass("saved");
		inputElement.removeClass("alert");
		inputElement.data("stored-hash", inputElement.val());
	});

	// initialise 

	resetInputs();
	cascadeHashes();
	formRows.hide();
	$(formRows).eq(0).show();
	$(formRows).eq(1).show();

});

Reveal.addEventListener("trees", function() { 

	var masterDigestElement = $("section.present input.master-digest");
	var parentDigestElements = $("section.present input.parent-digest");
	var textInputElements = $("section.present input.data-entry");
	var allDigestElements = $("section.present input.digest");

	function computeParentDigest(parentDigestElement) { 
		var digests = parentDigestElement
			.closest('.message-group')
			.find('input.digest')
			.filter('input:not(.parent-digest)');
		var childDigests = [];
		digests.each(function() { 
			childDigests.push($(this).val());
		});
		parentDigestElement.val(BCDemo.utils.hash(childDigests));
	}

	function computeMasterDigest(masterDigestElement) { 
		var parentDigests = $(masterDigestElement)
			.closest('.message-group')
			.find('input.parent-digest');
		var digestsToHash = [];
		parentDigests.each(function() { 
			digestsToHash.push($(this).val());
		});
		masterDigestElement.val(BCDemo.utils.hash(digestsToHash));
	}

	function saveStates() {
		allDigestElements.each(function() { 
			$(this).data("original-value", $(this).val());
		});
	}

	function refresh() { 

		textInputElements.each(function() { 
			dom.computeDigestAndInsertForInputElement($(this));
		});

		parentDigestElements.each(function() { 
			computeParentDigest($(this));
		});

		computeMasterDigest(masterDigestElement);
	}

	refresh();
	saveStates();

	$(textInputElements).keyup(function() { 
		refresh();
		allDigestElements.each(function() { 
			var original = $(this).data("original-value");
			var current = $(this).val();
			if(original !== current)
				$(this).addClass("alert");
			else
				$(this).removeClass("alert");				
		});
	});

});

Reveal.addEventListener("mining", function() { 

	var textInputElements = $("section.present input.data-entry");

	function computeInputElementHashes() { 
		textInputElements.each(function() { 
			dom.computeDigestAndInsertForInputElement($(this));
		});
	}

	function getBlockDataItems() { 
		var digestElements = $("section.present .block-data");
		var digestList = [];
		digestElements.each(function() { 
			digestList.push($(this).val());
		});
		return digestList;
	}

	function computeTopHash() { 
		var blockDataItems = getBlockDataItems();
		$("#mining-digest").val(BCDemo.utils.hash(blockDataItems + $('#mining-nonce-guess').val() ));
	}

	function refresh() { 
		$("#mining-bitcoin").hide();
		$("#mining-fail").hide();
		computeInputElementHashes();
		computeTopHash();
	}

	refresh();

	textInputElements.keyup(refresh);

	$("#mining-start").click(function() { 

		var blockData = getBlockDataItems();
		var hashTarget = $("#mining-hash-target").val().toString();

		function progressUpdate(counter, hash) { 
			$('#mining-nonce-guess').val(counter);
			$("#mining-digest").val(hash);
		}

		var miner = new Miner(blockData, hashTarget, progressUpdate);

		miner.done(function(success) { 
			//console.log(success);
			if(success)
				$("#mining-bitcoin").show();
			else
				$("#mining-fail").show();
		});

		miner.mine();

	});

});

Reveal.addEventListener('thanks', function() { 
	$("#thanks-hash").val(BCDemo.utils.hash("thank you"));
});
