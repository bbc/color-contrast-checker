'use strict';

var expect  = require('chai').expect;
var ColorContrastChecker = require('color-contrast-checker');
var ccc = new ColorContrastChecker();

describe('Three Digit Color Code Lengths', function() {
  it('should accept 3 digit color code', function() {
    var result = ccc.isValidThreeDigitColorCode("#FFF");
    expect(result).to.be.true;
  });

  it('should reject 2 digit color code', function() {
    var result = ccc.isValidThreeDigitColorCode("#FF");
    expect(result).to.be.false;
  });

  it('should reject 4 digit color code', function() {
    var result = ccc.isValidThreeDigitColorCode("#FFFF");
    expect(result).to.be.false;
  });
});

describe('Six Digit Color Code Lengths', function() {
  it('should accept 6 digit color code', function() {
    var result = ccc.isValidSixDigitColorCode("#FFFFFF");
    expect(result).to.be.true;
  });

  it('should reject 5 digit color code', function() {
    var result = ccc.isValidSixDigitColorCode("#FFFFF");
    expect(result).to.be.false;
  });

  it('should reject 7 digit color code', function() {
    var result = ccc.isValidSixDigitColorCode("#FFFFFFF");
    expect(result).to.be.false;
  });
});

describe('Supported Color Code Lengths', function() {
  it('should accept 3 digit color code', function() {
    var result = ccc.isValidColorCode("#FFF");
    expect(result).to.be.true;
  });

  it('should accept 6 digit color code', function() {
    var result = ccc.isValidColorCode("#FFFFFF");
    expect(result).to.be.true;
  });

  it('should reject 7 digit color code', function() {
    var result = ccc.isValidColorCode("#FFFFFFF");
    expect(result).to.be.false;
  });
});

describe('Convert Color from 3 digit to 6 digit', function() {
  it('should convert 3 digit color to 6 digit', function() {
    var result = ccc.convertColorToSixDigit("#FFF");
    expect(result).to.equal("#FFFFFF");
  });
});

describe('Convert Hex to Luminance', function() {
  it('should convert 3 digit color luminance value', function() {
    var result = ccc.hexToLuminance("#FFF");
    expect(result).to.equal(1);
  });
  
  it('should convert 6 digit color luminance value', function() {
    var result = ccc.hexToLuminance("#FFFFFF");
    expect(result).to.equal(1);
  });

  it('should convert blue color luminance value', function() {
    var result = ccc.hexToLuminance("#0000FF");
    expect(result).to.equal(0);
  });

   it('should convert yellow color luminance value', function() {
    var result = ccc.hexToLuminance("#ffff00");
    expect(result).to.equal(1);
  });
});

describe('Basic Validation for LevelAA', function() {
   it('should return true when contrast is valid for three digit color codes', function() {
    var result = ccc.isLevelAA("#FFF", "#000", 14);
    expect(result).to.be.true;
  });

  it('should return true when contrast is valid', function() {
    var result = ccc.isLevelAA("#FFFFFF", "#000000", 14);
    expect(result).to.be.true;
  });

  it('should return false when contrast is invalid', function() {
    var result = ccc.isLevelAA("#000000", "#000000", 14);
    expect(result).to.be.false;
  });
});

describe('Basic Validation for LevelAAA', function() {
   it('should return true when contrast is valid for three digit color codes', function() {
    var result = ccc.isLevelAA("#FFF", "#000", 14);
    expect(result).to.be.true;
  });

  it('should return true when contrast is valid', function() {
    var result = ccc.isLevelAA("#FFFFFF", "#000000", 14);
    expect(result).to.be.true;
  });

  it('should return false when contrast is invalid', function() {
    var result = ccc.isLevelAA("#000000", "#000000", 14);
    expect(result).to.be.false;
  });
});


describe('Six Digit Pair Validation for LevelAAA', function() {
  var pairs = [
      {
          'colorA': '#000000',
          'colorB': '#000000',  // All should fail
          'fontSize': 14
      },
      {
          'colorA': '#000000',
          'colorB': '#FFFFFF',  //All should pass
          'fontSize': 14
      },
      {
          'colorA': '#000000',
          'colorB': '#848484',  //AAA should fail
          'fontSize': 14
      },
      {
          'colorA': '#000000',
          'colorB': '#848484',  //All should pass (because of font)
          'fontSize': 19
      },
      {
          'colorA': '#000000',
          'colorB': '#757575',  //AA should pass AAA should fail
          'fontSize': 14
      },
      {
          'colorA': '#000000',
          'colorB': '#656565',  //All should fail
          'fontSize': 14
      }
  ];


  var expectedResults = [ 
    { WCAG_AA: false, WCAG_AAA: false },
    { WCAG_AA: true, WCAG_AAA: true },
    { WCAG_AA: true, WCAG_AAA: false },
    { WCAG_AA: true, WCAG_AAA: true },
    { WCAG_AA: true, WCAG_AAA: false },
    { WCAG_AA: false, WCAG_AAA: false } ];

  function objectsAreSame(x, y) {
     var objectsAreSame = true;
     for(var propertyName in x) {
        if(x[propertyName].WCAG_AA !== y[propertyName].WCAG_AA
           && x[propertyName].WCAG_AAA !== y[propertyName].WCAG_AAA) {
           objectsAreSame = false;
           break;
        }
     }
     return objectsAreSame;
  }

  it('should return the expectedResults for checkPairs', function() {
    var results = ccc.checkPairs(pairs);
    expect(results).to.be.an('array');
    expect(results).to.have.lengthOf(6);
    expect(objectsAreSame(results, expectedResults)).to.be.true;
  }); 
});

describe('Three Digit Pair Validation for LevelAAA', function() {
  var pairs = [
      {
          'colorA': '#000',
          'colorB': '#000',  // All should fail
          'fontSize': 14
      },
      {
          'colorA': '#000',
          'colorB': '#FFF',  //All should pass
          'fontSize': 14
      },
      {
          'colorA': '#000',
          'colorB': '#848',  //AAA should fail
          'fontSize': 14
      },
      {
          'colorA': '#000',
          'colorB': '#848',  //All should pass (because of font)
          'fontSize': 19
      },
      {
          'colorA': '#000',
          'colorB': '#757',  //AA should pass AAA should fail
          'fontSize': 14
      },
      {
          'colorA': '#000',
          'colorB': '#656',  //All should fail
          'fontSize': 14
      }
  ];


  var expectedResults = [ 
    { WCAG_AA: false, WCAG_AAA: false },
    { WCAG_AA: true, WCAG_AAA: true },
    { WCAG_AA: true, WCAG_AAA: false },
    { WCAG_AA: true, WCAG_AAA: true },
    { WCAG_AA: true, WCAG_AAA: false },
    { WCAG_AA: false, WCAG_AAA: false } ];

  function objectsAreSame(x, y) {
     var objectsAreSame = true;
     for(var propertyName in x) {
        if(x[propertyName].WCAG_AA !== y[propertyName].WCAG_AA
           && x[propertyName].WCAG_AAA !== y[propertyName].WCAG_AAA) {
           objectsAreSame = false;
           break;
        }
     }
     return objectsAreSame;
  }

  it('should return the expectedResults for checkPairs', function() {
    var results = ccc.checkPairs(pairs);
    expect(results).to.be.an('array');
    expect(results).to.have.lengthOf(6);
    expect(objectsAreSame(results, expectedResults)).to.be.true;
  }); 
});
