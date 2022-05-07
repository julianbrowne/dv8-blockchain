
const Miner  = require("../src/js/Miner.js");

test('Miner object exists', () => { 
	const display = jest.fn();
	var miner = new Miner([], '000', display);
	expect(miner).toBeInstanceOf(Miner);
});

test('Miner runs and drops results into output function', done => { 
	const target = '000';
	const display = jest.fn();
	const results = function(success) { 
		expect(success).toBeTruthy();
		expect(miner.mineAttempts).toEqual(886);
		expect(miner.digest.substring(0, 3)).toEqual(target);
		done();
	};
	var miner = new Miner([], target, display);
	miner.done(results);
	miner.mine();
});

test('Miner times out after max attempts', done => { 
	const display = jest.fn();
	const results = function(success) { 
		expect(success).toBeFalsy();
		expect(miner.mineAttempts).toBeGreaterThan(miner.maxAttempts);
		done();
	};
	var miner = new Miner([], '00000000', display);
	miner.done(results);
	miner.mine();
});
