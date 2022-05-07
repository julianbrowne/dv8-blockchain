
const utils = require("./utils");

function Miner(blockData, targetHashPrefix, updateDisplayFunction) { 

		var miner = this;
		this.blockData = blockData;
		this.timer = null;
		this.mineAttempts = 0;
		this.maxAttempts = 250000;
		this.targetHashPrefix = targetHashPrefix;
		this.targetHashPrefixLength = targetHashPrefix.length
		this.success = null;
		this.digest = null;

		this.mine = function() { 

			miner.mineAttempts++;
			miner.digest = utils.hash(this.blockData + miner.mineAttempts);
			updateDisplayFunction(miner.mineAttempts, miner.digest);

			if(miner.digest.substr(0, miner.targetHashPrefixLength) === this.targetHashPrefix) { 
				clearTimeout(timer);
				if(miner.success) miner.success(true);
				return;
			}

			if(miner.mineAttempts > miner.maxAttempts) { 
				clearTimeout(timer);
				if(miner.success) miner.success(false);
				return;
			}

			if(miner.mineAttempts % 100 == 0) { 
				timer = setTimeout(miner.mine, 1);
			}
			else { 
				miner.mine();
			}
		};

		this.done = function(successFunction) { 
			miner.success = successFunction;
		};

};

module.exports = Miner;
