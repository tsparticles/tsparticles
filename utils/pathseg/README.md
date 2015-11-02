# SVGPathSeg polyfill

The SVGPathSeg API was difficult to use and has been removed from the SVG spec in favor of a new, awesomer API in the Paths module (https://lists.w3.org/Archives/Public/www-svg/2015Jun/0044.html). This polyfill is intended as a drop-in replacement for existing users of the old SVGPathSeg API.

## Implementation status

This is not yet ready to use.

Naively adding this to svg-edit does make the editor usable, though there are still bugs remaining.
