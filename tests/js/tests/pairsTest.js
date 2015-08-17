"use strict";

define(
    ['ColorContrastChecker'],
    function(ColorContrastChecker) {
        
        var run = function() {
            test('Pairs should return right results', function() {
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

                var ccc     = new ColorContrastChecker();
                var results = ccc.checkPairs(pairs);

                var expectedResults = [
                    {
                        'WCAG_AA' : false,
                        'WCAG_AAA': false
                    },
                    {
                        'WCAG_AA' : true,
                        'WCAG_AAA': true
                    },
                    {
                        'WCAG_AA' : true,
                        'WCAG_AAA': false
                    },
                    {
                        'WCAG_AA' : true,
                        'WCAG_AAA': true
                    },
                    {
                        'WCAG_AA' : true,
                        'WCAG_AAA': false
                    },
                    {
                        'WCAG_AA' : false,
                        'WCAG_AAA': false
                    }
                ];

                for (var i in results) {
                    equal(
                        results[i].WCAG_AA,
                        expectedResults[i].WCAG_AA,
                        'The result should be ' + expectedResults[i].WCAG_AA ? "true" : "false"
                    );
                }

            });
        };
        
        return {run: run}
    }
);