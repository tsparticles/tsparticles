# SVGPathSeg polyfill

This is a drop-in replacement for the SVGPathSeg and SVGPathSegList APIs that were removed from SVG2 (https://lists.w3.org/Archives/Public/www-svg/2015Jun/0044.html). Existing code that uses the SVGPathSeg or SVGPathSegList APIs can use this polyfill to keep working. This polyfill is based on the exact code and tests that were removed from Chromium 47.

The SVGPathSeg API was difficult to use and has been removed from the SVG spec in favor of a new, awesomer API in the Paths module (https://lists.w3.org/Archives/Public/www-svg/2015Jun/0044.html). All new development should use the SVG Path Data API. There's a polyfill ([path-data-polyfill.js](https://github.com/jarek-foksa/path-data-polyfill.js)) for browsers that do not yet support the new API.

## Implementation status

Now passing all SVGPathSeg tests from the Chromium repository.

Now used by [svg-edit](https://github.com/SVG-Edit/svgedit) and passes all svg-edit path tests.

## Using pathseg.js
Just add pathseg.js to your server and drop this in your html or svg files:
```
<script src="pathseg.js"></script>
```

## Example API usage
```
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
var moveToSeg = path.createSVGPathSegMovetoRel(10, 10);
var lineToSeg = path.createSVGPathSegLinetoRel(100, 100);
path.pathSegList.appendItem(moveToSeg);
path.pathSegList.appendItem(lineToSeg);
console.log(path.getAttribute('d')); // m 10 10 l 100 100
moveToSeg.x += 200;
moveToSeg.y += 200;
console.log(path.getAttribute('d')); // m 210 210 l 100 100
```

These APIs have been removed from SVG 2 but their original definitions can be found at:

http://www.w3.org/TR/SVG/single-page.html#paths-InterfaceSVGPathSeg

http://www.w3.org/TR/SVG/single-page.html#paths-InterfaceSVGPathSegList
