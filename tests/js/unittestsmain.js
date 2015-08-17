"use strict";

require.config({
    paths: {
        'QUnit': 'libs/qunit',
        "ColorContrastChecker": "../../src/ColorContrastChecker"
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});

// require the unit tests.
require(
    ['QUnit', 'tests/pairsTest'],
    function(QUnit, pairsTest) {
        
        // run the tests.
        pairsTest.run();
        
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);