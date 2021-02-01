let initialData = require('./initialData.js');

let masksAndMemoryValues = initialData.split('mask = ').slice(1);

(function () {
  let sum = 0;

  for (let m = 0; m < masksAndMemoryValues.length; m++) {
    let eachMaskAndMemory = masksAndMemoryValues[m].split('mem');

    let maskAndMemoryObj = { mask: eachMaskAndMemory[0] };
    maskAndMemoryObj['mem'] = [];

    saveDataToMemory(eachMaskAndMemory, maskAndMemoryObj);

    let finalSumOfDigits = maskAndMemoryObj.mem.reduce((a, b) => a + b, 0);

    console.log(finalSumOfDigits);
    sum += finalSumOfDigits;
  }
  console.log(sum);
})();

function saveDataToMemory(eachMaskAndMemory, maskAndMemoryObj) {
  let splitedMemoryValues;

  for (let j = 1; j < eachMaskAndMemory.length; j++) {
    let mask = eachMaskAndMemory[0];

    splitedMemoryValues = eachMaskAndMemory[j].split('] = ');

    let key = splitedMemoryValues[0].split('[')[1];
    let value = splitedMemoryValues[1];

    let newValue = applyMask(mask, value);

    maskAndMemoryObj.mem[key] = newValue;

    +key > maskAndMemoryObj.mem.length || j === 1
      ? (maskAndMemoryObj = fillMemoryWith0(maskAndMemoryObj))
      : null;
  }
}

function fillMemoryWith0(obj) {
  for (i = 0; i < obj.mem.length; i++) {
    if (obj.mem[i] == null) {
      obj.mem[i] = 0;
    }
  }
  return obj;
}

function applyMask(mask, value) {
  let binaryValue = makeBinaryNumber(value);

  for (let i = 0; i < mask.length; i++) {
    let sequentDigit = mask[i];
    let initialDigit = binaryValue[i];

    if (sequentDigit !== 'X') {
      if (initialDigit !== sequentDigit) {
        initialDigit = sequentDigit;

        binaryValue = replaceInString(sequentDigit, binaryValue, i);
      }
    }
  }
  return parseInt(binaryValue, 2);
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function makeBinaryNumber(value) {
  let binaryValue = dec2bin(value);
  binaryValue = binaryValue.padStart(36, '0');
  return binaryValue;
}

function replaceInString(sequentDigit, binaryValue, i) {
  binaryValue = binaryValue.split('');
  binaryValue[i] = sequentDigit;
  binaryValue = binaryValue.join('');

  return binaryValue;
}
