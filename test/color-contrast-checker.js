'use strict';

var expect  = require('chai').expect;
var ColorContrastChecker = require('color-contrast-checker');
var ccc = new ColorContrastChecker();

describe('Basic Validation for LevelAA', function() {
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
  it('should return true when contrast is valid', function() {
    var result = ccc.isLevelAA("#FFFFFF", "#000000", 14);
    expect(result).to.be.true;
  });

  it('should return false when contrast is invalid', function() {
    var result = ccc.isLevelAA("#000000", "#000000", 14);
    expect(result).to.be.false;
  });
});


describe('Pair Validation for LevelAAA', function() {
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
