// LayoutTests/svg/dom/script-tests/path-segments.js
QUnit.test("Path segment types", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    assert.equal(SVGPathSeg.PATHSEG_UNKNOWN, "0");
    assert.equal(SVGPathSeg.PATHSEG_CLOSEPATH, "1");
    assert.equal(SVGPathSeg.PATHSEG_MOVETO_ABS, "2");
    assert.equal(SVGPathSeg.PATHSEG_MOVETO_REL, "3");
    assert.equal(SVGPathSeg.PATHSEG_LINETO_ABS, "4");
    assert.equal(SVGPathSeg.PATHSEG_LINETO_REL, "5");
    assert.equal(SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "6");
    assert.equal(SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "7");
    assert.equal(SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "8");
    assert.equal(SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "9");
    assert.equal(SVGPathSeg.PATHSEG_ARC_ABS, "10");
    assert.equal(SVGPathSeg.PATHSEG_ARC_REL, "11");
    assert.equal(SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "12");
    assert.equal(SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "13");
    assert.equal(SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "14");
    assert.equal(SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "15");
    assert.equal(SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "16");
    assert.equal(SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "17");
    assert.equal(SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "18");
    assert.equal(SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "19");

    assert.equal(path.createSVGPathSegClosePath().pathSegType, SVGPathSeg.PATHSEG_CLOSEPATH);
    assert.equal(path.createSVGPathSegClosePath().pathSegTypeAsLetter, "z");
    assert.equal(path.createSVGPathSegMovetoAbs(1, 2).pathSegType, SVGPathSeg.PATHSEG_MOVETO_ABS);
    assert.equal(path.createSVGPathSegMovetoAbs(1, 2).pathSegTypeAsLetter, "M");
    assert.equal(path.createSVGPathSegMovetoAbs(1, 2).x, "1");
    assert.equal(path.createSVGPathSegMovetoAbs(1, 2).y, "2");
    assert.equal(path.createSVGPathSegMovetoRel(1, 2).pathSegType, SVGPathSeg.PATHSEG_MOVETO_REL);
    assert.equal(path.createSVGPathSegMovetoRel(1, 2).pathSegTypeAsLetter, "m");
    assert.equal(path.createSVGPathSegMovetoRel(1, 2).x, "1");
    assert.equal(path.createSVGPathSegMovetoRel(1, 2).y, "2");
    assert.equal(path.createSVGPathSegLinetoAbs(1, 2).pathSegType, SVGPathSeg.PATHSEG_LINETO_ABS);
    assert.equal(path.createSVGPathSegLinetoAbs(1, 2).pathSegTypeAsLetter, "L");
    assert.equal(path.createSVGPathSegLinetoAbs(1, 2).x, "1");
    assert.equal(path.createSVGPathSegLinetoAbs(1, 2).y, "2");
    assert.equal(path.createSVGPathSegLinetoRel(1, 2).pathSegType, SVGPathSeg.PATHSEG_LINETO_REL);
    assert.equal(path.createSVGPathSegLinetoRel(1, 2).pathSegTypeAsLetter, "l");
    assert.equal(path.createSVGPathSegLinetoRel(1, 2).x, "1");
    assert.equal(path.createSVGPathSegLinetoRel(1, 2).y, "2");
    assert.equal(path.createSVGPathSegCurvetoCubicAbs(1, 2, 3, 4, 5, 6).pathSegType, SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS);
    assert.equal(path.createSVGPathSegCurvetoCubicAbs(1, 2, 3, 4, 5, 6).pathSegTypeAsLetter, "C");
    assert.equal(path.createSVGPathSegCurvetoCubicAbs(1, 2, 3, 4, 5, 6).x, "1");
    assert.equal(path.createSVGPathSegCurvetoCubicAbs(1, 2, 3, 4, 5, 6).y, "2");
    assert.equal(path.createSVGPathSegCurvetoCubicAbs(1, 2, 3, 4, 5, 6).x1, "3");
    assert.equal(path.createSVGPathSegCurvetoCubicAbs(1, 2, 3, 4, 5, 6).y1, "4");
    assert.equal(path.createSVGPathSegCurvetoCubicAbs(1, 2, 3, 4, 5, 6).x2, "5");
    assert.equal(path.createSVGPathSegCurvetoCubicAbs(1, 2, 3, 4, 5, 6).y2, "6");
    assert.equal(path.createSVGPathSegCurvetoCubicRel(1, 2, 3, 4, 5, 6).pathSegType, SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL);
    assert.equal(path.createSVGPathSegCurvetoCubicRel(1, 2, 3, 4, 5, 6).pathSegTypeAsLetter, "c");
    assert.equal(path.createSVGPathSegCurvetoCubicRel(1, 2, 3, 4, 5, 6).x, "1");
    assert.equal(path.createSVGPathSegCurvetoCubicRel(1, 2, 3, 4, 5, 6).y, "2");
    assert.equal(path.createSVGPathSegCurvetoCubicRel(1, 2, 3, 4, 5, 6).x1, "3");
    assert.equal(path.createSVGPathSegCurvetoCubicRel(1, 2, 3, 4, 5, 6).y1, "4");
    assert.equal(path.createSVGPathSegCurvetoCubicRel(1, 2, 3, 4, 5, 6).x2, "5");
    assert.equal(path.createSVGPathSegCurvetoCubicRel(1, 2, 3, 4, 5, 6).y2, "6");
    assert.equal(path.createSVGPathSegCurvetoQuadraticAbs(1, 2, 3, 4).pathSegType, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS);
    assert.equal(path.createSVGPathSegCurvetoQuadraticAbs(1, 2, 3, 4).pathSegTypeAsLetter, "Q");
    assert.equal(path.createSVGPathSegCurvetoQuadraticAbs(1, 2, 3, 4).x, "1");
    assert.equal(path.createSVGPathSegCurvetoQuadraticAbs(1, 2, 3, 4).y, "2");
    assert.equal(path.createSVGPathSegCurvetoQuadraticAbs(1, 2, 3, 4).x1, "3");
    assert.equal(path.createSVGPathSegCurvetoQuadraticAbs(1, 2, 3, 4).y1, "4");
    assert.equal(path.createSVGPathSegCurvetoQuadraticRel(1, 2, 3, 4).pathSegType, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL);
    assert.equal(path.createSVGPathSegCurvetoQuadraticRel(1, 2, 3, 4).pathSegTypeAsLetter, "q");
    assert.equal(path.createSVGPathSegCurvetoQuadraticRel(1, 2, 3, 4).x, "1");
    assert.equal(path.createSVGPathSegCurvetoQuadraticRel(1, 2, 3, 4).y, "2");
    assert.equal(path.createSVGPathSegCurvetoQuadraticRel(1, 2, 3, 4).x1, "3");
    assert.equal(path.createSVGPathSegCurvetoQuadraticRel(1, 2, 3, 4).y1, "4");
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).pathSegType, SVGPathSeg.PATHSEG_ARC_ABS);
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).pathSegTypeAsLetter, "A");
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).x, "1");
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).y, "2");
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).r1, "3");
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).r2, "4");
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).angle, "5");
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).largeArcFlag, false);
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, true, false).largeArcFlag, true);
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, false).sweepFlag, false);
    assert.equal(path.createSVGPathSegArcAbs(1, 2, 3, 4, 5, false, true).sweepFlag, true);
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).pathSegType, SVGPathSeg.PATHSEG_ARC_REL);
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).pathSegTypeAsLetter, "a");
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).x, "1");
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).y, "2");
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).r1, "3");
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).r2, "4");
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).angle, "5");
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).largeArcFlag, false);
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, true, false).largeArcFlag, true);
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, false).sweepFlag, false);
    assert.equal(path.createSVGPathSegArcRel(1, 2, 3, 4, 5, false, true).sweepFlag, true);
    assert.equal(path.createSVGPathSegLinetoHorizontalAbs(1).pathSegType, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS);
    assert.equal(path.createSVGPathSegLinetoHorizontalAbs(1).pathSegTypeAsLetter, "H");
    assert.equal(path.createSVGPathSegLinetoHorizontalAbs(1).x, "1");
    assert.equal(path.createSVGPathSegLinetoHorizontalRel(1).pathSegType, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL);
    assert.equal(path.createSVGPathSegLinetoHorizontalRel(1).pathSegTypeAsLetter, "h");
    assert.equal(path.createSVGPathSegLinetoHorizontalRel(1).x, "1");
    assert.equal(path.createSVGPathSegLinetoVerticalAbs(1).pathSegType, SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS);
    assert.equal(path.createSVGPathSegLinetoVerticalAbs(1).pathSegTypeAsLetter, "V");
    assert.equal(path.createSVGPathSegLinetoVerticalAbs(1).y, "1");
    assert.equal(path.createSVGPathSegLinetoVerticalRel(1).pathSegType, SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL);
    assert.equal(path.createSVGPathSegLinetoVerticalRel(1).pathSegTypeAsLetter, "v");
    assert.equal(path.createSVGPathSegLinetoVerticalRel(1).y, "1");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothAbs(1, 2, 3, 4).pathSegType, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS);
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothAbs(1, 2, 3, 4).pathSegTypeAsLetter, "S");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothAbs(1, 2, 3, 4).x, "1");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothAbs(1, 2, 3, 4).y, "2");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothAbs(1, 2, 3, 4).x2, "3");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothAbs(1, 2, 3, 4).y2, "4");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothRel(1, 2, 3, 4).pathSegType, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL);
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothRel(1, 2, 3, 4).pathSegTypeAsLetter, "s");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothRel(1, 2, 3, 4).x, "1");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothRel(1, 2, 3, 4).y, "2");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothRel(1, 2, 3, 4).x2, "3");
    assert.equal(path.createSVGPathSegCurvetoCubicSmoothRel(1, 2, 3, 4).y2, "4");
    assert.equal(path.createSVGPathSegCurvetoQuadraticSmoothAbs(1, 2).pathSegType, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS);
    assert.equal(path.createSVGPathSegCurvetoQuadraticSmoothAbs(1, 2).pathSegTypeAsLetter, "T");
    assert.equal(path.createSVGPathSegCurvetoQuadraticSmoothAbs(1, 2).x, "1");
    assert.equal(path.createSVGPathSegCurvetoQuadraticSmoothAbs(1, 2).y, "2");
    assert.equal(path.createSVGPathSegCurvetoQuadraticSmoothRel(1, 2).pathSegType, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL);
    assert.equal(path.createSVGPathSegCurvetoQuadraticSmoothRel(1, 2).pathSegTypeAsLetter, "t");
    assert.equal(path.createSVGPathSegCurvetoQuadraticSmoothRel(1, 2).x, "1");
    assert.equal(path.createSVGPathSegCurvetoQuadraticSmoothRel(1, 2).y, "2");
});

// LayoutTests/svg/dom/svg2-inheritance.html
QUnit.test("Validate the SVGPathSeg inheritance model", function(assert) {
    function checkParent(type, expectedParent) {
        assert.ok(window[type]);
        var parentPrototype = window[type].prototype.__proto__;
        var expectedPrototype = window[expectedParent] ? window[expectedParent].prototype : null;

        assert.equal(parentPrototype, expectedPrototype);
    }

    checkParent("SVGPathSeg", "Object");
    checkParent("SVGPathSegArcAbs", "SVGPathSeg");
    checkParent("SVGPathSegArcRel", "SVGPathSeg");
    checkParent("SVGPathSegClosePath", "SVGPathSeg");
    checkParent("SVGPathSegCurvetoCubicAbs", "SVGPathSeg");
    checkParent("SVGPathSegCurvetoCubicRel", "SVGPathSeg");
    checkParent("SVGPathSegCurvetoCubicSmoothAbs", "SVGPathSeg");
    checkParent("SVGPathSegCurvetoCubicSmoothRel", "SVGPathSeg");
    checkParent("SVGPathSegCurvetoQuadraticAbs", "SVGPathSeg");
    checkParent("SVGPathSegCurvetoQuadraticRel", "SVGPathSeg");
    checkParent("SVGPathSegCurvetoQuadraticSmoothAbs", "SVGPathSeg");
    checkParent("SVGPathSegCurvetoQuadraticSmoothRel", "SVGPathSeg");
    checkParent("SVGPathSegLinetoAbs", "SVGPathSeg");
    checkParent("SVGPathSegLinetoHorizontalAbs", "SVGPathSeg");
    checkParent("SVGPathSegLinetoHorizontalRel", "SVGPathSeg");
    checkParent("SVGPathSegLinetoRel", "SVGPathSeg");
    checkParent("SVGPathSegLinetoVerticalAbs", "SVGPathSeg");
    checkParent("SVGPathSegLinetoVerticalRel", "SVGPathSeg");
    checkParent("SVGPathSegList", "Object");
    checkParent("SVGPathSegMovetoAbs", "SVGPathSeg");
    checkParent("SVGPathSegMovetoRel", "SVGPathSeg");
});

QUnit.test("Validate the SVGPathSegList inheritance model", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    assert.ok(path.pathSegList instanceof SVGPathSegList);
});

// Source/core/svg/SVGPathParserTest.cpp
QUnit.test("Path parsing", function(assert) {
    // This test is only for the polyfill.
    if (!SVGPathSegList._pathSegArrayAsString) {
        expect(0);
        return;
    }

    function checkParsing(string, expected) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", string);
        var pathSegArray = path.pathSegList._parsePath(string);
        var actual = SVGPathSegList._pathSegArrayAsString(pathSegArray);
        assert.equal(actual, expected);
    }

    checkParsing("M1,2", "M 1 2");
    checkParsing("m1,2", "m 1 2");
    checkParsing("M100,200 m3,4", "M 100 200 m 3 4");
    checkParsing("M100,200 L3,4", "M 100 200 L 3 4");
    checkParsing("M100,200 l3,4", "M 100 200 l 3 4");
    checkParsing("M100,200 H3", "M 100 200 H 3");
    checkParsing("M100,200 h3", "M 100 200 h 3");
    checkParsing("M100,200 V3", "M 100 200 V 3");
    checkParsing("M100,200 v3", "M 100 200 v 3");
    checkParsing("M100,200 Z", "M 100 200 z");
    checkParsing("M100,200 z", "M 100 200 z");
    checkParsing("M100,200 C3,4,5,6,7,8", "M 100 200 C 3 4 5 6 7 8");
    checkParsing("M100,200 c3,4,5,6,7,8", "M 100 200 c 3 4 5 6 7 8");
    checkParsing("M100,200 S3,4,5,6", "M 100 200 S 3 4 5 6");
    checkParsing("M100,200 s3,4,5,6", "M 100 200 s 3 4 5 6");
    checkParsing("M100,200 Q3,4,5,6", "M 100 200 Q 3 4 5 6");
    checkParsing("M100,200 q3,4,5,6", "M 100 200 q 3 4 5 6");
    checkParsing("M100,200 T3,4", "M 100 200 T 3 4");
    checkParsing("M100,200 t3,4", "M 100 200 t 3 4");
    checkParsing("M100,200 A3,4,5,0,0,6,7", "M 100 200 A 3 4 5 0 0 6 7");
    checkParsing("M100,200 A3,4,5,1,0,6,7", "M 100 200 A 3 4 5 1 0 6 7");
    checkParsing("M100,200 A3,4,5,0,1,6,7", "M 100 200 A 3 4 5 0 1 6 7");
    checkParsing("M100,200 A3,4,5,1,1,6,7", "M 100 200 A 3 4 5 1 1 6 7");
    checkParsing("M100,200 a3,4,5,0,0,6,7", "M 100 200 a 3 4 5 0 0 6 7");
    checkParsing("M100,200 a3,4,5,0,1,6,7", "M 100 200 a 3 4 5 0 1 6 7");
    checkParsing("M100,200 a3,4,5,1,0,6,7", "M 100 200 a 3 4 5 1 0 6 7");
    checkParsing("M100,200 a3,4,5,1,1,6,7", "M 100 200 a 3 4 5 1 1 6 7");
    checkParsing("M100,200 a3,4,5,006,7", "M 100 200 a 3 4 5 0 0 6 7");
    checkParsing("M100,200 a3,4,5,016,7", "M 100 200 a 3 4 5 0 1 6 7");
    checkParsing("M100,200 a3,4,5,106,7", "M 100 200 a 3 4 5 1 0 6 7");
    checkParsing("M100,200 a3,4,5,116,7", "M 100 200 a 3 4 5 1 1 6 7");

    checkParsing("M100,200 a0,4,5,0,0,10,0 a4,0,5,0,0,0,10 a0,0,5,0,0,-10,0 z", "M 100 200 a 0 4 5 0 0 10 0 a 4 0 5 0 0 0 10 a 0 0 5 0 0 -10 0 z");

    checkParsing("M1,2,3,4", "M 1 2 L 3 4");
    checkParsing("m100,200,3,4", "m 100 200 l 3 4");

    checkParsing("M 100-200", "M 100 -200");
    checkParsing("M 0.6.5", "M 0.6 0.5");

    checkParsing(" M1,2", "M 1 2");
    checkParsing("  M1,2", "M 1 2");
    checkParsing("\tM1,2", "M 1 2");
    checkParsing("\nM1,2", "M 1 2");
    checkParsing("\rM1,2", "M 1 2");
    checkParsing("M1,2 ", "M 1 2");
    checkParsing("M1,2\t", "M 1 2");
    checkParsing("M1,2\n", "M 1 2");
    checkParsing("M1,2\r", "M 1 2");

    checkParsing("", "");
    checkParsing(" ", "");
    checkParsing("M.1 .2 L.3 .4 .5 .6", "M 0.1 0.2 L 0.3 0.4 L 0.5 0.6");

    checkParsing("M1,1h2,3", "M 1 1 h 2 h 3");
    checkParsing("M1,1H2,3", "M 1 1 H 2 H 3");
    checkParsing("M1,1v2,3", "M 1 1 v 2 v 3");
    checkParsing("M1,1V2,3", "M 1 1 V 2 V 3");

    checkParsing("M1,1c2,3 4,5 6,7 8,9 10,11 12,13", "M 1 1 c 2 3 4 5 6 7 c 8 9 10 11 12 13");
    checkParsing("M1,1C2,3 4,5 6,7 8,9 10,11 12,13", "M 1 1 C 2 3 4 5 6 7 C 8 9 10 11 12 13");
    checkParsing("M1,1s2,3 4,5 6,7 8,9", "M 1 1 s 2 3 4 5 s 6 7 8 9");
    checkParsing("M1,1S2,3 4,5 6,7 8,9", "M 1 1 S 2 3 4 5 S 6 7 8 9");
    checkParsing("M1,1q2,3 4,5 6,7 8,9", "M 1 1 q 2 3 4 5 q 6 7 8 9");
    checkParsing("M1,1Q2,3 4,5 6,7 8,9", "M 1 1 Q 2 3 4 5 Q 6 7 8 9");
    checkParsing("M1,1t2,3 4,5", "M 1 1 t 2 3 t 4 5");
    checkParsing("M1,1T2,3 4,5", "M 1 1 T 2 3 T 4 5");
    checkParsing("M1,1a2,3,4,0,0,5,6 7,8,9,0,0,10,11", "M 1 1 a 2 3 4 0 0 5 6 a 7 8 9 0 0 10 11");
    checkParsing("M1,1A2,3,4,0,0,5,6 7,8,9,0,0,10,11", "M 1 1 A 2 3 4 0 0 5 6 A 7 8 9 0 0 10 11");
});

// LayoutTests/svg/dom/SVGPathSegList-appendItem.xhtml
QUnit.test("Test of SVGPathSegList.appendItem", function(assert) {
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M 0 0 L 100 0 L 100 100");
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M 0 0 L 50 100 h 100 h 100 v 100");

    // Check initial 'pathSegList' value of path1
    assert.equal(path1.pathSegList.numberOfItems, "3");

    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "0");
    assert.equal(path1.pathSegList.getItem(0).y, "0");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(2).x, "100");
    assert.equal(path1.pathSegList.getItem(2).y, "100");

    // Check initial 'pathSegList' value of path2
    assert.equal(path2.pathSegList.numberOfItems, "5");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "0");
    assert.equal(path2.pathSegList.getItem(0).y, "0");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path2.pathSegList.getItem(1).x, "50");
    assert.equal(path2.pathSegList.getItem(1).y, "100");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(2).x, "100");
    assert.equal(path2.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(3).x, "100");
    assert.equal(path2.pathSegList.getItem(4).toString(), "[object SVGPathSegLinetoVerticalRel]");
    assert.equal(path2.pathSegList.getItem(4).y, "100");

    // Negate x value of fourth segment in path2
    assert.equal(path2.pathSegList.getItem(3).x = -path2.pathSegList.getItem(3).x, "-100");

    // Append second item from path1 to path2 list
    assert.equal(path2.pathSegList.appendItem(path2.pathSegList.getItem(3)).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.numberOfItems, "6");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "0");
    assert.equal(path2.pathSegList.getItem(0).y, "0");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path2.pathSegList.getItem(1).x, "50");
    assert.equal(path2.pathSegList.getItem(1).y, "100");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(2).x, "100");
    assert.equal(path2.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(3).x, "-100");
    assert.equal(path2.pathSegList.getItem(4).toString(), "[object SVGPathSegLinetoVerticalRel]");
    assert.equal(path2.pathSegList.getItem(4).y, "100");
    assert.equal(path2.pathSegList.getItem(5).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(5).x, "-100");

    // Append second item from path2 to path1 list
    assert.equal(path1.pathSegList.appendItem(path2.pathSegList.getItem(1)).toString(), "[object SVGPathSegLinetoAbs]");

    // Change last item of path1 list, that came from path2 list, assure it's updating path1
    assert.equal(path1.pathSegList.getItem(3).x -= 50, "0");

    // Reset points attribute to M 0 0 L 100 0 v 100"
    path2.setAttribute("d", "M 0 0 L 100 0 v 100");

    // Append fourth item from path1 to path2 list - now should look like a rectangle
    assert.equal(path2.pathSegList.appendItem(path1.pathSegList.getItem(3)).toString(), "[object SVGPathSegLinetoAbs]");

    // Check final 'pathSegList' value of path1
    assert.equal(path1.pathSegList.numberOfItems, "4");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "0");
    assert.equal(path1.pathSegList.getItem(0).y, "0");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(2).x, "100");
    assert.equal(path1.pathSegList.getItem(2).y, "100");
    assert.equal(path1.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(3).x, "0");
    assert.equal(path1.pathSegList.getItem(3).y, "100");

    // Check final 'pathSegList' value of path2
    assert.equal(path2.pathSegList.numberOfItems, "4");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "0");
    assert.equal(path2.pathSegList.getItem(0).y, "0");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path2.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoVerticalRel]");
    assert.equal(path2.pathSegList.getItem(2).y, "100");
    assert.equal(path2.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path2.pathSegList.getItem(3).x, "0");
    assert.equal(path1.pathSegList.getItem(3).y, "100");
});

// LayoutTests/svg/dom/SVGPathSegList-clear-and-initialize.xhtml
QUnit.test("Test of SVGPathSegList.clear and SVGPathSegList.initialize", function(assert) {
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M 100 100 L 100 0 L 100 100");
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M 50 50 L 0 100 M 0 0");

    // Check initial 'pathSegList' value of path1
    assert.equal(path1.pathSegList.numberOfItems, "3");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "100");
    assert.equal(path1.pathSegList.getItem(0).y, "100");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(2).x, "100");
    assert.equal(path1.pathSegList.getItem(2).y, "100");

    // Check initial 'pathSegList' value of path2
    assert.equal(path2.pathSegList.numberOfItems, "3");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "50");
    assert.equal(path2.pathSegList.getItem(0).y, "50");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path2.pathSegList.getItem(1).x, "0");
    assert.equal(path2.pathSegList.getItem(1).y, "100");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(2).x, "0");
    assert.equal(path2.pathSegList.getItem(2).y, "0");

    // Cache first item of path1 in local variable 'item0'
    var item0 = path1.pathSegList.getItem(0);
    assert.equal(item0.x, "100");
    assert.equal(item0.y, "100");

    // Clear path1 segment list
    path1.pathSegList.clear()

    // Verify that item0 is still alive, and can be modified
    assert.equal(item0.x, "100");
    assert.equal(item0.y, "100");
    assert.equal(item0.x += 50, "150");
    assert.equal(item0.y += 50, "150");

    // Check intermediate list state of path1
    assert.equal(path1.pathSegList.numberOfItems, "0");
    assert.throws(function() {
        path1.pathSegList.getItem(0);
    });

    // Check intermediate list state of path2
    assert.equal(path2.pathSegList.numberOfItems, "3");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "50");
    assert.equal(path2.pathSegList.getItem(0).y, "50");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path2.pathSegList.getItem(1).x, "0");
    assert.equal(path2.pathSegList.getItem(1).y, "100");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(2).x, "0");
    assert.equal(path2.pathSegList.getItem(2).y, "0");

    // Initialize path1 list with first item of path2
    assert.equal(path1.pathSegList.initialize(path2.pathSegList.getItem(0)).toString(), "[object SVGPathSegMovetoAbs]");

    // Check intermediate list state of path1
    assert.equal(path1.pathSegList.numberOfItems, "1");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "50");
    assert.equal(path1.pathSegList.getItem(0).y, "50");

    // Check intermediate list state of path2
    assert.equal(path2.pathSegList.numberOfItems, "3");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "50");
    assert.equal(path2.pathSegList.getItem(0).y, "50");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path2.pathSegList.getItem(1).x, "0");
    assert.equal(path2.pathSegList.getItem(1).y, "100");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(2).x, "0");
    assert.equal(path2.pathSegList.getItem(2).y, "0");

    // Initialize path2 list with item0
    assert.equal(path2.pathSegList.initialize(item0).toString(), "[object SVGPathSegMovetoAbs]");

    // Check final list state of path1
    assert.equal(path1.pathSegList.numberOfItems, "1");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "50");
    assert.equal(path1.pathSegList.getItem(0).y, "50");

    // Check final list state of path2
    assert.equal(path2.pathSegList.numberOfItems, "1");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "150");
    assert.equal(path2.pathSegList.getItem(0).y, "150");
});

// LayoutTests/svg/dom/SVGPathSegList-removeItem.xhtml
QUnit.test("Test of SVGPathSegList::removeItem", function(assert) {
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M 0 0 L 100 0 L 0 100 L 100 100");

    // Check initial 'pathSegList' value of path1.
    assert.equal(path1.pathSegList.numberOfItems, "4");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "0");
    assert.equal(path1.pathSegList.getItem(0).y, "0");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(2).x, "0");
    assert.equal(path1.pathSegList.getItem(2).y, "100");
    assert.equal(path1.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(3).x, "100");
    assert.equal(path1.pathSegList.getItem(3).y, "100");

    // Insert fourth item at position three using insertItemBefore().
    assert.equal(path1.pathSegList.insertItemBefore(path1.pathSegList.getItem(3), 2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.numberOfItems, "5");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "0");
    assert.equal(path1.pathSegList.getItem(0).y, "0");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(2).x, "100");
    assert.equal(path1.pathSegList.getItem(2).y, "100");
    assert.equal(path1.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(3).x, "0");
    assert.equal(path1.pathSegList.getItem(3).y, "100");
    assert.equal(path1.pathSegList.getItem(4).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(4).x, "100");
    assert.equal(path1.pathSegList.getItem(4).y, "100");

    // Change last item of path1 list.
    assert.equal(path1.pathSegList.getItem(4).x = 0, "0");

    // Check final 'pathSegList' value of path1.
    assert.equal(path1.pathSegList.numberOfItems, "5");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "0");
    assert.equal(path1.pathSegList.getItem(0).y, "0");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(2).x, "100");
    assert.equal(path1.pathSegList.getItem(2).y, "100");
    assert.equal(path1.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(3).x, "0");
    assert.equal(path1.pathSegList.getItem(3).y, "100");
    assert.equal(path1.pathSegList.getItem(4).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(4).x, "0");
    assert.equal(path1.pathSegList.getItem(4).y, "100");
});

// LayoutTests/svg/dom/SVGPathSegList-insertItemBefore.xhtml
QUnit.test("Test of SVGPathSegList.insertItemBefore", function(assert) {
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M 0 0 L 100 0 L 100 100 z L 0 100");
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M 0 0 h 100 z v 100 h -100");

    // Check initial 'pathSegList' value of path1.
    assert.equal(path1.pathSegList.numberOfItems, "5");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "0");
    assert.equal(path1.pathSegList.getItem(0).y, "0");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(2).x, "100");
    assert.equal(path1.pathSegList.getItem(2).y, "100");
    assert.equal(path1.pathSegList.getItem(3).toString(), "[object SVGPathSegClosePath]");
    assert.equal(path1.pathSegList.getItem(4).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(4).x, "0");
    assert.equal(path1.pathSegList.getItem(4).y, "100");

    // Check initial 'pathSegList' value of path2.
    assert.equal(path2.pathSegList.numberOfItems, "5");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "0");
    assert.equal(path2.pathSegList.getItem(0).y, "0");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(1).x, "100");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegClosePath]");
    assert.equal(path2.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoVerticalRel]");
    assert.equal(path2.pathSegList.getItem(3).y, "100");
    assert.equal(path2.pathSegList.getItem(4).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(4).x, "-100");

    // Remove fourth item of path1.
    assert.equal(path1.pathSegList.removeItem(3).toString(), "[object SVGPathSegClosePath]");

    // Remove third item of path2.
    assert.equal(path2.pathSegList.removeItem(2).toString(), "[object SVGPathSegClosePath]");
});

// LayoutTests/svg/dom/SVGPathSegList-replaceItem.xhtml
QUnit.test("Test of SVGPathSegList.replaceItem", function(assert) {
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M 0 0 L 100 100 L 100 0 L 100 100 v 100 L 0 100");
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M 0 0 h 100 L 200 100 h -100");

    // Check initial 'pathSegList' value of path1.
    assert.equal(path1.pathSegList.numberOfItems, "6");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "0");
    assert.equal(path1.pathSegList.getItem(0).y, "0");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "100");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(2).x, "100");
    assert.equal(path1.pathSegList.getItem(2).y, "0");
    assert.equal(path1.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(3).x, "100");
    assert.equal(path1.pathSegList.getItem(3).y, "100");
    assert.equal(path1.pathSegList.getItem(4).toString(), "[object SVGPathSegLinetoVerticalRel]");
    assert.equal(path1.pathSegList.getItem(4).y, "100");
    assert.equal(path1.pathSegList.getItem(5).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(5).x, "0");
    assert.equal(path1.pathSegList.getItem(5).y, "100");

    // Check initial 'pathSegList' value of path2.
    assert.equal(path2.pathSegList.numberOfItems, "4");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "0");
    assert.equal(path2.pathSegList.getItem(0).y, "0");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(1).x, "100");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path2.pathSegList.getItem(2).x, "200");
    assert.equal(path2.pathSegList.getItem(2).y, "100");
    assert.equal(path2.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(3).x, "-100");

    // Replace second item with third item of path1.
    assert.equal(path1.pathSegList.replaceItem(path1.pathSegList.getItem(2), 1).toString(), "[object SVGPathSegLinetoAbs]");

    // Replace third item of path2 with fourth item of path1.
    assert.equal(path2.pathSegList.replaceItem(path1.pathSegList.getItem(4), 2).toString(), "[object SVGPathSegLinetoVerticalRel]");

    // Reset points attribute to M 0 0 L 100 0 v 100.
    path1.setAttribute("d", "M 0 0 L 100 0 v 100 h 100");

    // Replace fourth item of path1 with third item of path2.
    assert.equal(path1.pathSegList.replaceItem(path2.pathSegList.getItem(3), 3).toString(), "[object SVGPathSegLinetoHorizontalRel]");

    // Check final 'pathSegList' value of path1.
    assert.equal(path1.pathSegList.numberOfItems, "4");
    assert.equal(path1.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path1.pathSegList.getItem(0).x, "0");
    assert.equal(path1.pathSegList.getItem(0).y, "0");
    assert.equal(path1.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
    assert.equal(path1.pathSegList.getItem(1).x, "100");
    assert.equal(path1.pathSegList.getItem(1).y, "0");
    assert.equal(path1.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoVerticalRel]");
    assert.equal(path1.pathSegList.getItem(2).y, "100");
    assert.equal(path1.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path1.pathSegList.getItem(3).x, "-100");

    // Check final 'pathSegList' value of path2.
    assert.equal(path2.pathSegList.numberOfItems, "4");
    assert.equal(path2.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(path2.pathSegList.getItem(0).x, "0");
    assert.equal(path2.pathSegList.getItem(0).y, "0");
    assert.equal(path2.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(1).x, "100");
    assert.equal(path2.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoVerticalRel]");
    assert.equal(path2.pathSegList.getItem(2).y, "100");
    assert.equal(path2.pathSegList.getItem(3).toString(), "[object SVGPathSegLinetoHorizontalRel]");
    assert.equal(path2.pathSegList.getItem(3).x, "-100");
});

// LayoutTests/svg/dom/SVGPathSegList-xml-dom-synchronization.xhtml
QUnit.test("Test how SVGLengthList reacts to XML DOM modifications", function(assert) {
    // Cross-browser formatting of the d string, needed so both gecko and blink can use the same test.
    function formatDAttribute(string) {
        return string.replace(/,/g, " ")          // Remove Firefox commas
                   .replace(/([A-Z])/g, " $1 ") // "M 100 0L 50 0" -> " M 100 0 L 50 0"
                   .replace(/^\s/, "")          // " M 100 0" -> "M 100 0"
                   .replace(/\s\s/g, " ");      // If there was already whitespace between coordinates & commands, fix it up again.
    }

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 200 0 L 100 0 L 100 100");

    assert.equal(path.pathSegList.numberOfItems, "3");

    // Check initial 'd' attribute value.
    assert.equal(formatDAttribute(path.getAttribute("d")), "M 200 0 L 100 0 L 100 100");

    // Append one item, check 'd' attribute changed.
    path.pathSegList.appendItem(path.createSVGPathSegLinetoAbs(0, 100));
    assert.equal(formatDAttribute(path.getAttribute("d")), "M 200 0 L 100 0 L 100 100 L 0 100");

    // Modify first item, check 'd' attribute changed.
    path.pathSegList.getItem(0).x -= 100;
    assert.equal(formatDAttribute(path.getAttribute("d")), "M 100 0 L 100 0 L 100 100 L 0 100");

    // Modify first item, check 'd' attribute changed, now a green rectangle should be visible.
    path.pathSegList.getItem(0).x -= 100;
    assert.equal(formatDAttribute(path.getAttribute("d")), "M 0 0 L 100 0 L 100 100 L 0 100");
});

// LayoutTests/svg/dom/svglist-exception-on-out-bounds-error.html
QUnit.test("Tests that out of bounds accesses of SVGPathSegList correctly throw exceptions", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var svgList = path.pathSegList;
    var indicesToTest = [-Infinity, NaN, -1, 0, 1, Infinity];
    for (var i = 0; i < indicesToTest.length; i++) {
        var index = indicesToTest[i];
        assert.throws(function() {
            svgList.getItem(index);
        });
        assert.throws(function() {
            svgList.insertItemBefore(null, index);
        });
        var seg = path.createSVGPathSegClosePath();
        assert.equal(svgList.insertItemBefore(seg, index), seg);
        svgList.removeItem(0);
        assert.throws(function() {
            svgList.replaceItem(seg, index);
        });
        assert.throws(function() {
            svgList.replaceItem(null, index);
        });
        assert.throws(function() {
            svgList.removeItem(index);
        });
    }
});

// LayoutTests/svg/dom/svglist-insertItemBefore-appends.html
QUnit.test("Tests that insertItemBefore correctly appends if its index is out of bounds", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var seg00 = path.createSVGPathSegMovetoAbs(0,0);
    var seg01 = path.createSVGPathSegMovetoAbs(0,1);
    var seg11 = path.createSVGPathSegMovetoAbs(1,1);
    var seg10 = path.createSVGPathSegMovetoAbs(1,0);
    var svgList = path.pathSegList;
    assert.equal(svgList.numberOfItems, "0");
    svgList.appendItem(seg01);
    assert.equal(svgList.numberOfItems, "1");
    assert.equal(svgList.getItem(0), seg01);
    svgList.appendItem(seg11);
    assert.equal(svgList.numberOfItems, "2");
    assert.equal(svgList.getItem(0), seg01);
    assert.equal(svgList.getItem(1), seg11);
    svgList.insertItemBefore(seg00, 0);
    assert.equal(svgList.numberOfItems, "3");
    assert.equal(svgList.getItem(0), seg00);
    assert.equal(svgList.getItem(1), seg01);
    assert.equal(svgList.getItem(2), seg11);
    svgList.insertItemBefore(seg10, 42);
    assert.equal(svgList.numberOfItems, "4");
    assert.equal(svgList.getItem(0), seg00);
    assert.equal(svgList.getItem(1), seg01);
    assert.equal(svgList.getItem(2), seg11);
    assert.equal(svgList.getItem(3), seg10);
});

QUnit.test("SVGEdit replaceItem browser sniffing support", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0,0 10,10");
    var seglist = path.pathSegList;
    var seg = path.createSVGPathSegLinetoAbs(5,5);
    var replaced = seglist.replaceItem(seg, 0);
    assert.equal(replaced, seg);
});

QUnit.test("SVGEdit insertItemBefore browser sniffing support", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0,0 10,10");
    var seglist = path.pathSegList;
    var seg = path.createSVGPathSegLinetoAbs(5,5);
    var inserted = seglist.insertItemBefore(seg, 0);
    assert.equal(inserted, seg);
});

QUnit.test("Asynchronous mutation observer", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 1 2 M 3 4 Z");
    var segList = path.pathSegList;
    var moveToSeg = segList.getItem(1);
    assert.equal(moveToSeg.toString(), "[object SVGPathSegMovetoAbs]");
    assert.equal(moveToSeg.x, "3");
    assert.equal(moveToSeg.y, "4");
    assert.equal(segList.numberOfItems, 3);
    path.setAttribute("d", "M50,51 L52,53 L54,55Z");

    var done = assert.async();
    setTimeout(function() {
        // This check is only for the polyfill and should pass whether the polyfill is used or not.
        if (SVGPathSegList._pathSegArrayAsString) {
            // Ensure the path seg list was updated asynchronously by checking the interal _list
            // member which will not synchronize the list automatically.
            assert.equal(segList._list.length, "4");
        }

        assert.equal(path.pathSegList.numberOfItems, "4");
        assert.equal(path.pathSegList.getItem(0).toString(), "[object SVGPathSegMovetoAbs]");
        assert.equal(path.pathSegList.getItem(0).x, "50");
        assert.equal(path.pathSegList.getItem(0).y, "51");
        assert.equal(path.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
        assert.equal(path.pathSegList.getItem(1).x, "52");
        assert.equal(path.pathSegList.getItem(1).y, "53");
        assert.equal(path.pathSegList.getItem(2).toString(), "[object SVGPathSegLinetoAbs]");
        assert.equal(path.pathSegList.getItem(2).x, "54");
        assert.equal(path.pathSegList.getItem(2).y, "55");
        assert.equal(path.pathSegList.getItem(3).toString(), "[object SVGPathSegClosePath]");

        // Path segs tearoffs should still be usable even if they are detached.
        assert.equal(moveToSeg.toString(), "[object SVGPathSegMovetoAbs]");
        assert.equal(moveToSeg.x, "3");
        assert.equal(moveToSeg.y, "4");
        moveToSeg.x += 5;
        moveToSeg.y += 10;
        assert.equal(moveToSeg.x, "8");
        assert.equal(moveToSeg.y, "14");

        // Detached path segs should not modify the old list.
        assert.equal(path.pathSegList.numberOfItems, "4");
        assert.equal(path.pathSegList.getItem(1).toString(), "[object SVGPathSegLinetoAbs]");
        assert.equal(path.pathSegList.getItem(1).x, "52");
        assert.equal(path.pathSegList.getItem(1).y, "53");
        done();
    });
});

QUnit.test("Test getPathSegAtLength length boundary conditions", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // Empty path.
    path.setAttribute("d", "");
    assert.equal(path.getPathSegAtLength(-10), "0");
    assert.equal(path.getPathSegAtLength(0), "0");
    assert.equal(path.getPathSegAtLength(1), "0");
    assert.equal(path.getPathSegAtLength(10), "0");

    // Path with one segment.
    path.setAttribute("d", "M1 1");
    assert.equal(path.getPathSegAtLength(-10), "0");
    assert.equal(path.getPathSegAtLength(0), "0");
    assert.equal(path.getPathSegAtLength(1), "0");
    assert.equal(path.getPathSegAtLength(10), "0");

    // Path with one close segment.
    path.setAttribute("d", "z");
    assert.equal(path.getPathSegAtLength(-10), "0");
    assert.equal(path.getPathSegAtLength(0), "0");
    assert.equal(path.getPathSegAtLength(1), "0");
    assert.equal(path.getPathSegAtLength(10), "0");
});

// LayoutTests/svg/dom/script-tests/svgpath-getPathSegAtLength.js
QUnit.test("Test the getPathSegAtLength API", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0 0 L0 5 L5 5 L 5 0");

    assert.equal(path.getPathSegAtLength(0), "0");
    assert.equal(path.getPathSegAtLength(1), "1");
    assert.equal(path.getPathSegAtLength(5), "1");
    assert.equal(path.getPathSegAtLength(6), "2");
    assert.equal(path.getPathSegAtLength(10), "2");
    assert.equal(path.getPathSegAtLength(11), "3");
    // WebKit/Opera/FF all return the last path segment if the distance exceeds the actual path length:
    assert.equal(path.getPathSegAtLength(16), "3");
    assert.equal(path.getPathSegAtLength(20), "3");
    assert.equal(path.getPathSegAtLength(24), "3");
    assert.equal(path.getPathSegAtLength(25), "3");
    assert.equal(path.getPathSegAtLength(100), "3");
});

// LayoutTests/svg/dom/SVGGeometryElement-valid-arguments.html
QUnit.test("Test invalid arguments when calling getPathSegAtLength", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    assert.throws(function() {
        path.getPathSegAtLength();
    });
    assert.throws(function() {
        path.getPathSegAtLength(NaN);
    });
    assert.throws(function() {
        path.getPathSegAtLength(Infinity);
    });
});

QUnit.test("Test getPathSegAtLength with non-trivial paths", function(assert) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // Absolute line-to.
    path.setAttribute("d", "M0 0 L0 5 L5 5 L5 0");
    assert.equal(path.getPathSegAtLength(0), "0");
    assert.equal(path.getPathSegAtLength(1), "1");
    assert.equal(path.getPathSegAtLength(5), "1");
    assert.equal(path.getPathSegAtLength(6), "2");

    // Relative line-to.
    path.setAttribute("d", "M0 0 l0 5 l5 0 l0 -5");
    assert.equal(path.getPathSegAtLength(0), "0");
    assert.equal(path.getPathSegAtLength(1), "1");
    assert.equal(path.getPathSegAtLength(5), "1");
    assert.equal(path.getPathSegAtLength(6), "2");

    // Cubic curve.
    path.setAttribute("d", "M100,250 C 100,50 400,50 400,250Z");
    assert.equal(path.getPathSegAtLength(0), "0");
    assert.equal(path.getPathSegAtLength(1), "1");
    assert.equal(path.getPathSegAtLength(100), "1");
    assert.equal(path.getPathSegAtLength(200), "1");
    assert.equal(path.getPathSegAtLength(300), "1");
    assert.equal(path.getPathSegAtLength(400), "1");
    assert.equal(path.getPathSegAtLength(500), "2");

    // Multiple quadratic curves.
    path.setAttribute("d", "M0,0 Q0,0 100,50 T100,100 T300, 300Z");
    assert.equal(path.getPathSegAtLength(0), "0");
    assert.equal(path.getPathSegAtLength(1), "1");
    assert.equal(path.getPathSegAtLength(100), "1");
    assert.equal(path.getPathSegAtLength(200), "2");
    assert.equal(path.getPathSegAtLength(400), "3");
    assert.equal(path.getPathSegAtLength(600), "4");

    // Discontinuous paths.
    // This didn't get spec'd (see: https://github.com/w3c/svgwg/issues/282) but had consistent behavior in Edge, Blink, WebKit, and Gecko.
    path.setAttribute("d", "M0,0 h100 M100,100 v0 M0,100 h0");
    assert.equal(path.getPathSegAtLength(99), "1");
    assert.equal(path.getPathSegAtLength(100), "1");
    assert.equal(path.getPathSegAtLength(101), "5");
    path.setAttribute("d", "M50,50 L150,50 M50,100 L150,100");
    assert.equal(path.getPathSegAtLength(99), "1");
    assert.equal(path.getPathSegAtLength(100), "1");
    assert.equal(path.getPathSegAtLength(101), "3");
});

QUnit.test("Test PathSegList.length", function(assert) {
	var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

	// Empty path.
	path.setAttribute("d", "");
	assert.equal(path.pathSegList.length, path.pathSegList.numberOfItems);
	assert.equal(path.pathSegList.length, 0);

	// Path with one segment.
	path.setAttribute("d", "M1 1");
	assert.equal(path.pathSegList.length, path.pathSegList.numberOfItems);
	assert.equal(path.pathSegList.length, 1);

	// Path with one close segment.
	path.setAttribute("d", "z");
	assert.equal(path.pathSegList.length, path.pathSegList.numberOfItems);
	assert.equal(path.pathSegList.length, 0);

	// Path with two segments and a close.
	path.setAttribute("d", "M1 1 L2 2Z");
	assert.equal(path.pathSegList.length, path.pathSegList.numberOfItems);
	assert.equal(path.pathSegList.length, 3);
});