# Color Contast Checker v0.1

An accessibility checker tool for validating the color contrast based on WCAG 2.0 standard.

The formula (L1/L2) for contrast is based on [ISO-9241-3] and [ANSI-HFES-100-1988] standards as described here : http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef

Installation:
------------

```
npm install color-contrast-checker
```
or using package.json

```
{
  "name": "my-app",
  ..
  "devDependencies": {
    ..
    "color-contrast-checker": "0.1.0"
  }
}
```
Then do `npm install`

Usage:
-----

```
var ccc = new ColorContrastChecker();

var color1 = "#FFFFFF";
var color2 = "#000000;

if (ccc.isLevelAA(color1, color2)) {
    alert("Valid Level AA");
} else {
    alert("Invalid Contrast");
}

```

Its sweet and simple completely based on http://www.w3.org/TR/WCAG20/#contrast-ratiodef.