
const utils  = require("../src/js/utils.js");

test('convert undefined to binary string', () => { 
  expect(utils.convertCharToBinary(undefined)).toBe('00000000');
});

test('convert empty string to binary string', () => { 
  expect(utils.convertCharToBinary('')).toBe('00000000');
});

test('convert string, not char, to binary string', () => { 
  expect(utils.convertCharToBinary('abc')).toBe('00000000');
});

test('convert A to binary string', () => { 
  expect(utils.convertCharToBinary('A')).toBe('01000001');
});

test('convert a to binary string', () => { 
  expect(utils.convertCharToBinary('a')).toBe('01100001');
});

test('hash an empty string', () => { 
  expect(utils.hash('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
});
