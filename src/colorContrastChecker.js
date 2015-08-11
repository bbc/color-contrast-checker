if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function () {

    "use strict";

    var ColorContrastChecker = function() {
    };

    ColorContrastChecker.prototype = {
        isValidColorCode : function (hex){
            var regColorcode = /^(#)?([0-9a-fA-F]{6})([0-9a-fA-F]{6})?$/;
            return regColorcode.test(hex);
        },
        getRelativeLuminance : function (foreground, background){
            if(!foreground || !background)
                return false;

            var color1, color2;
            var l1; /* higher value */
            var l2; /* lower value */
            var contrast;
            var l1R, l1G, l1B, l2R, l2G, l2B;
            var txtSizeOp;

            color1 = this.removeHash(foreground);
            color2 = this.removeHash(background);

            l1R = parseInt("0x"+color1.substr(0,2), 16)/255;
            if (l1R <= 0.03928) {
                l1R = l1R/12.92;
            } else {
                l1R = Math.pow(((l1R+0.055)/1.055),2.4);
            }
            l1G = parseInt("0x"+color1.substr(2,2), 16)/255;
            if (l1G <= 0.03928) {
                l1G = l1G/12.92;
            } else {
                l1G = Math.pow(((l1G+0.055)/1.055),2.4);
            }
            l1B = parseInt("0x"+color1.substr(4,2), 16)/255;
            if (l1B <= 0.03928) {
                l1B = l1B/12.92;
            } else {
                l1B = Math.pow(((l1B+0.055)/1.055),2.4);
            }
            l2R = parseInt("0x"+color2.substr(0,2), 16)/255;
            if (l2R <= 0.03928) {
                l2R = l2R/12.92;
            } else {
                l2R = Math.pow(((l2R+0.055)/1.055),2.4);
            }
            l2G = parseInt("0x"+color2.substr(2,2), 16)/255;
            if (l2G <= 0.03928) {
                l2G = l2G/12.92;
            } else {
                l2G = Math.pow(((l2G+0.055)/1.055),2.4);
            }
            l2B = parseInt("0x"+color2.substr(4,2), 16)/255;
            if (l2B <= 0.03928) {
                l2B = l2B/12.92;
            } else {
                l2B = Math.pow(((l2B+0.055)/1.055),2.4);
            }
            /* where L is luminosity and is defined as */
            l1 = (0.2126*l1R) + (0.7152*l1G) + (0.0722*l1B); /* using linearised R, G, and B value */
            l2 = (0.2126*l2R) + (0.7152*l2G) + (0.0722*l2B); /* using linearised R, G, and B value */
            /* and L2 is the lower value. */
            l1 = l1 + 0.05;
            l2 = l2 + 0.05;
            if (l1 < l2) {
              var temp = l1;
              l1 = l2;
              l2 = temp;
            }

            return {'l1': l1, 'l2': l2};
        },
        isLevelAA : function(foreground, background) {

            var luminance = this.getRelativeLuminance(foreground, background);

            var result = luminance.l1/luminance.l2;
            result = result.toFixed(1);

            if (result >= 3)
                return true;
            else
                return false;
        },
        removeHash : function (string) {
            if(string)  return string.replace("#","");
        },
        addHash : function (string) {
            if(string)  return "#" + string;
        }
    };

    return ColorContrastChecker;
});
