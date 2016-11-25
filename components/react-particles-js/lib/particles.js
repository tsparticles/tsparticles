!function(a, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("react")) : "function" == typeof define && define.amd ? define([ "react" ], t) : "object" == typeof exports ? exports.Particles = t(require("react")) : a.Particles = t(a.React);
}(this, function(a) {
    return function(a) {
        function t(i) {
            if (e[i]) return e[i].exports;
            var s = e[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return a[i].call(s.exports, s, s.exports, t), s.loaded = !0, s.exports;
        }
        var e = {};
        return t.m = a, t.c = e, t.p = "", t(0);
    }([ function(a, t, e) {
        "use strict";
        var i = e(3);
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = i.default;
    }, function(a, t, e) {
        "use strict";
        function i(a) {
            for (var e in a) t.hasOwnProperty(e) || (t[e] = a[e]);
        }
        i(e(11)), i(e(9));
        var s = e(4);
        t.Interact = s.default;
        var r = e(5);
        t.Modes = r.default;
        var n = e(6);
        t.Particle = n.default;
        var o = e(7);
        t.ParticleManager = o.default;
        var c = e(8);
        t.ParticlesLibrary = c.default;
        var p = e(10);
        t.Vendors = p.default;
    }, function(t, e) {
        t.exports = a;
    }, function(a, t, e) {
        "use strict";
        function i(a, t) {
            if (!(a instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function s(a, t) {
            if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? a : t;
        }
        function r(a, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            a.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: a,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(a, t) : a.__proto__ = t);
        }
        var n = function() {
            function a(a, t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(a, i.key, i);
                }
            }
            return function(t, e, i) {
                return e && a(t.prototype, e), i && a(t, i), t;
            };
        }(), o = e(2), c = e(2), p = e(1), h = function(a) {
            function t(a) {
                return i(this, t), s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, a));
            }
            return r(t, a), n(t, [ {
                key: "componentDidMount",
                value: function() {
                    this.particlesLibrary = new p.ParticlesLibrary(this.canvas, this.props.params), 
                    this.particlesLibrary.start();
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    this.particlesLibrary.destroy();
                }
            }, {
                key: "render",
                value: function() {
                    var a = this, t = this.props, e = t.width, i = t.height;
                    return o.createElement("div", null, o.createElement("canvas", {
                        ref: function(t) {
                            return a.canvas = t;
                        },
                        style: {
                            width: e,
                            height: i
                        }
                    }));
                }
            } ]), t;
        }(c.Component);
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = h, h.defaultProps = {
            width: "100%",
            height: "100%",
            params: {}
        };
    }, function(a, t) {
        "use strict";
        function e(a, t) {
            if (!(a instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var i = function() {
            function a(a, t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(a, i.key, i);
                }
            }
            return function(t, e, i) {
                return e && a(t.prototype, e), i && a(t, i), t;
            };
        }(), s = function() {
            function a(t) {
                e(this, a), this.params = t, this.linkParticles = this.linkParticles.bind(this), 
                this.attractParticles = this.attractParticles.bind(this), this.bounceParticles = this.bounceParticles.bind(this), 
                this.params.fn.interact.linkParticles = this.linkParticles, this.params.fn.interact.attractParticles = this.attractParticles, 
                this.params.fn.interact.bounceParticles = this.bounceParticles;
            }
            return i(a, [ {
                key: "linkParticles",
                value: function(a, t) {
                    var e = a.x - t.x, i = a.y - t.y, s = Math.sqrt(e * e + i * i);
                    if (s <= this.params.particles.line_linked.distance) {
                        var r = this.params.particles.line_linked.opacity - s / (1 / this.params.particles.line_linked.opacity) / this.params.particles.line_linked.distance;
                        if (r > 0) {
                            var n = this.params.particles.line_linked.color_rgb_line, o = n.r, c = n.g, p = n.b;
                            this.params.canvas.ctx.strokeStyle = "rgba( " + o + ", " + c + ", " + p + ", " + r + " )", 
                            this.params.canvas.ctx.lineWidth = this.params.particles.line_linked.width, this.params.canvas.ctx.beginPath(), 
                            this.params.canvas.ctx.moveTo(a.x, a.y), this.params.canvas.ctx.lineTo(t.x, t.y), 
                            this.params.canvas.ctx.stroke(), this.params.canvas.ctx.closePath();
                        }
                    }
                }
            }, {
                key: "attractParticles",
                value: function(a, t) {
                    var e = a.x - t.x, i = a.y - t.y, s = Math.sqrt(e * e + i * i);
                    if (s <= this.params.particles.line_linked.distance) {
                        var r = e / (1e3 * this.params.particles.move.attract.rotateX), n = i / (1e3 * this.params.particles.move.attract.rotateY);
                        a.vx -= r, a.vy -= n, t.vx += r, t.vy += n;
                    }
                }
            }, {
                key: "bounceParticles",
                value: function(a, t) {
                    var e = a.x - t.x, i = a.y - t.y, s = Math.sqrt(e * e + i * i), r = a.radius + t.radius;
                    s <= r && (a.vx = -a.vx, a.vy = -a.vy, t.vx = -t.vx, t.vy = -t.vy);
                }
            } ]), a;
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = s;
    }, function(a, t, e) {
        "use strict";
        function i(a, t) {
            if (!(a instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var s = function() {
            function a(a, t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(a, i.key, i);
                }
            }
            return function(t, e, i) {
                return e && a(t.prototype, e), i && a(t, i), t;
            };
        }(), r = e(1), n = function() {
            function a(t) {
                i(this, a), this.params = t, this.pushParticles = this.pushParticles.bind(this), 
                this.removeParticles = this.removeParticles.bind(this), this.bubbleParticle = this.bubbleParticle.bind(this), 
                this.repulseParticle = this.repulseParticle.bind(this), this.grabParticle = this.grabParticle.bind(this), 
                this.params.fn.modes.pushParticles = this.pushParticles, this.params.fn.modes.removeParticles = this.removeParticles, 
                this.params.fn.modes.bubbleParticle = this.bubbleParticle, this.params.fn.modes.repulseParticle = this.repulseParticle, 
                this.params.fn.modes.grabParticle = this.grabParticle;
            }
            return s(a, [ {
                key: "pushParticles",
                value: function(a, t) {
                    this.params.tmp.pushing = !0, t || (t = {
                        pos_x: Math.random() * this.params.canvas.width,
                        pos_y: Math.random() * this.params.canvas.height
                    });
                    for (var e = 0; e < a; e++) this.params.particles.array.push(new r.Particle(this.params, this.params.particles.color, this.params.particles.opacity.value, {
                        x: t.pos_x,
                        y: t.pos_y
                    })), e == a - 1 && (this.params.particles.move.enable || this.params.fn.particlesDraw(), 
                    this.params.tmp.pushing = !1);
                }
            }, {
                key: "removeParticles",
                value: function(a) {
                    this.params.particles.array.splice(0, a), this.params.particles.move.enable || this.params.fn.particlesDraw();
                }
            }, {
                key: "bubbleParticle",
                value: function(a) {
                    var t = this;
                    if (this.params.interactivity.events.onhover.enable && r.isInArray("bubble", this.params.interactivity.events.onhover.mode)) {
                        var e = a.x - this.params.interactivity.mouse.pos_x, i = a.y - this.params.interactivity.mouse.pos_y, s = Math.sqrt(e * e + i * i), n = 1 - s / this.params.interactivity.modes.bubble.distance, o = function() {
                            a.opacity_bubble = a.opacity, a.radius_bubble = a.radius;
                        };
                        if (s <= this.params.interactivity.modes.bubble.distance) {
                            if (n >= 0 && "mousemove" == this.params.interactivity.status) {
                                if (this.params.interactivity.modes.bubble.size != this.params.particles.size.value) if (this.params.interactivity.modes.bubble.size > this.params.particles.size.value) {
                                    var c = a.radius + this.params.interactivity.modes.bubble.size * n;
                                    c >= 0 && (a.radius_bubble = c);
                                } else {
                                    var p = a.radius - this.params.interactivity.modes.bubble.size, h = a.radius - p * n;
                                    h > 0 ? a.radius_bubble = h : a.radius_bubble = 0;
                                }
                                if (this.params.interactivity.modes.bubble.opacity != this.params.particles.opacity.value) if (this.params.interactivity.modes.bubble.opacity > this.params.particles.opacity.value) {
                                    var l = this.params.interactivity.modes.bubble.opacity * n;
                                    l > a.opacity && l <= this.params.interactivity.modes.bubble.opacity && (a.opacity_bubble = l);
                                } else {
                                    var m = a.opacity - (this.params.particles.opacity.value - this.params.interactivity.modes.bubble.opacity) * n;
                                    m < a.opacity && m >= this.params.interactivity.modes.bubble.opacity && (a.opacity_bubble = m);
                                }
                            }
                        } else o();
                        "mouseleave" == this.params.interactivity.status && o();
                    } else this.params.interactivity.events.onclick.enable && r.isInArray("bubble", this.params.interactivity.events.onclick.mode) && this.params.tmp.bubble_clicking && !function() {
                        var e = a.x - t.params.interactivity.mouse.click_pos_x, i = a.y - t.params.interactivity.mouse.click_pos_y, s = Math.sqrt(e * e + i * i), r = (new Date().getTime() - t.params.interactivity.mouse.click_time) / 1e3;
                        r > t.params.interactivity.modes.bubble.duration && (t.params.tmp.bubble_duration_end = !0), 
                        r > 2 * t.params.interactivity.modes.bubble.duration && (t.params.tmp.bubble_clicking = !1, 
                        t.params.tmp.bubble_duration_end = !1);
                        var n = function(e, i, n, o, c) {
                            if (e != i) if (t.params.tmp.bubble_duration_end) {
                                if (void 0 != n) {
                                    var p = o - r * (o - e) / t.params.interactivity.modes.bubble.duration, h = e - p, l = e + h;
                                    "size" == c && (a.radius_bubble = l), "opacity" == c && (a.opacity_bubble = l);
                                }
                            } else if (s <= t.params.interactivity.modes.bubble.distance) {
                                var m = void 0;
                                if (m = void 0 != n ? n : o, m != e) {
                                    var u = o - r * (o - e) / t.params.interactivity.modes.bubble.duration;
                                    "size" == c && (a.radius_bubble = u), "opacity" == c && (a.opacity_bubble = u);
                                }
                            } else "size" == c && (a.radius_bubble = void 0), "opacity" == c && (a.opacity_bubble = void 0);
                        };
                        t.params.tmp.bubble_clicking && (n(t.params.interactivity.modes.bubble.size, t.params.particles.size.value, a.radius_bubble, a.radius, "size"), 
                        n(t.params.interactivity.modes.bubble.opacity, t.params.particles.opacity.value, a.opacity_bubble, a.opacity, "opacity"));
                    }();
                }
            }, {
                key: "repulseParticle",
                value: function(a) {
                    var t = this;
                    if (this.params.interactivity.events.onhover.enable && r.isInArray("repulse", this.params.interactivity.events.onhover.mode) && "mousemove" == this.params.interactivity.status) {
                        var e = a.x - this.params.interactivity.mouse.pos_x, i = a.y - this.params.interactivity.mouse.pos_y, s = Math.sqrt(e * e + i * i), n = {
                            x: e / s,
                            y: i / s
                        }, o = this.params.interactivity.modes.repulse.distance, c = 100, p = r.clamp(1 / o * (-1 * Math.pow(s / o, 2) + 1) * o * c, 0, 50), h = {
                            x: a.x + n.x * p,
                            y: a.y + n.y * p
                        };
                        "bounce" == this.params.particles.move.out_mode ? (h.x - a.radius > 0 && h.x + a.radius < this.params.canvas.width && (a.x = h.x), 
                        h.y - a.radius > 0 && h.y + a.radius < this.params.canvas.height && (a.y = h.y)) : (a.x = h.x, 
                        a.y = h.y);
                    } else this.params.interactivity.events.onclick.enable && r.isInArray("repulse", this.params.interactivity.events.onclick.mode) && (this.params.tmp.repulse_finish || (this.params.tmp.repulse_count++, 
                    this.params.tmp.repulse_count == this.params.particles.array.length && (this.params.tmp.repulse_finish = !0)), 
                    this.params.tmp.repulse_clicking ? !function() {
                        var e = Math.pow(t.params.interactivity.modes.repulse.distance / 6, 3), i = t.params.interactivity.mouse.click_pos_x - a.x, s = t.params.interactivity.mouse.click_pos_y - a.y, r = i * i + s * s, n = -e / r * 1, o = function() {
                            var e = Math.atan2(s, i);
                            if (a.vx = n * Math.cos(e), a.vy = n * Math.sin(e), "bounce" == t.params.particles.move.out_mode) {
                                var r = {
                                    x: a.x + a.vx,
                                    y: a.y + a.vy
                                };
                                r.x + a.radius > t.params.canvas.width ? a.vx = -a.vx : r.x - a.radius < 0 && (a.vx = -a.vx), 
                                r.y + a.radius > t.params.canvas.height ? a.vy = -a.vy : r.y - a.radius < 0 && (a.vy = -a.vy);
                            }
                        };
                        r <= e && o();
                    }() : 0 == this.params.tmp.repulse_clicking && (a.vx = a.vx_i, a.vy = a.vy_i));
                }
            }, {
                key: "grabParticle",
                value: function(a) {
                    if (this.params.interactivity.events.onhover.enable && "onmousemove" == this.params.interactivity.status) {
                        var t = a.x - this.params.interactivity.mouse.pos_x, e = a.y - this.params.interactivity.mouse.pos_y, i = Math.sqrt(t * t + e * e);
                        if (i <= this.params.interactivity.modes.grab.distance) {
                            var s = this.params.interactivity.modes.grab.line_linked.opacity - i / (1 / this.params.interactivity.modes.grab.line_linked.opacity) / this.params.interactivity.modes.grab.distance;
                            if (s > 0) {
                                var r = this.params.particles.line_linked.color_rgb_line, n = r.r, o = r.g, c = r.b;
                                this.params.canvas.ctx.strokeStyle = "rgba( " + n + ", " + o + ", " + c + ", " + s + " )", 
                                this.params.canvas.ctx.lineWidth = this.params.particles.line_linked.width, this.params.canvas.ctx.beginPath(), 
                                this.params.canvas.ctx.moveTo(a.x, a.y), this.params.canvas.ctx.lineTo(this.params.interactivity.mouse.pos_x, this.params.interactivity.mouse.pos_y), 
                                this.params.canvas.ctx.stroke(), this.params.canvas.ctx.closePath();
                            }
                        }
                    }
                }
            } ]), a;
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = n;
    }, function(a, t, e) {
        "use strict";
        function i(a, t) {
            if (!(a instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
            return typeof a;
        } : function(a) {
            return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
        }, r = function() {
            function a(a, t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(a, i.key, i);
                }
            }
            return function(t, e, i) {
                return e && a(t.prototype, e), i && a(t, i), t;
            };
        }(), n = e(1), o = function() {
            function a(t, e, s, r) {
                i(this, a), this.params = t, this.setupSize(), this.setupPosition(r), this.setupColor(e), 
                this.setupOpacity(), this.setupAnimation();
            }
            return r(a, [ {
                key: "setupSize",
                value: function() {
                    this.radius = (this.params.particles.size.random ? Math.random() : 1) * this.params.particles.size.value, 
                    this.params.particles.size.anim.enable && (this.size_status = !1, this.vs = this.params.particles.size.anim.speed / 100, 
                    this.params.particles.size.anim.sync || (this.vs = this.vs * Math.random()));
                }
            }, {
                key: "setupPosition",
                value: function(a) {
                    this.x = a ? a.x : Math.random() * this.params.canvas.width, this.y = a ? a.y : Math.random() * this.params.canvas.height, 
                    this.x > this.params.canvas.width - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius), 
                    this.y > this.params.canvas.height - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius), 
                    this.params.particles.move.bounce && this.params.fn.vendors.checkOverlap(this, a);
                }
            }, {
                key: "setupColor",
                value: function(a) {
                    if (this.color = {}, "object" == s(a.value)) if (a.value instanceof Array) {
                        var t = a.value[Math.floor(Math.random() * this.params.particles.color.value.length)];
                        this.color.rgb = n.hexToRgb(t);
                    } else {
                        if (void 0 != a.value.r && void 0 != a.value.g && void 0 != a.value.b) {
                            var e = a.value, i = e.r, r = e.g, o = e.b;
                            this.color.rgb = {
                                r: i,
                                g: r,
                                b: o
                            };
                        }
                        if (void 0 != a.value.h && void 0 != a.value.s && void 0 != a.value.l) {
                            var c = a.value, p = c.h, h = c.s, l = c.l;
                            this.color.hsl = {
                                h: p,
                                s: h,
                                l: l
                            };
                        }
                    } else "random" == a.value ? this.color.rgb = {
                        r: Math.floor(256 * Math.random()) + 0,
                        g: Math.floor(256 * Math.random()) + 0,
                        b: Math.floor(256 * Math.random()) + 0
                    } : "string" == typeof a.value && (this.color = a, this.color.rgb = n.hexToRgb(this.color.value));
                }
            }, {
                key: "setupOpacity",
                value: function() {
                    this.opacity = (this.params.particles.opacity.random ? Math.random() : 1) * this.params.particles.opacity.value, 
                    this.params.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = this.params.particles.opacity.anim.speed / 100, 
                    this.params.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
                }
            }, {
                key: "setupAnimation",
                value: function() {
                    var a = null;
                    switch (this.params.particles.move.direction) {
                      case "top":
                        a = {
                            x: 0,
                            y: -1
                        };
                        break;

                      case "top-right":
                        a = {
                            x: .5,
                            y: -.5
                        };
                        break;

                      case "right":
                        a = {
                            x: 1,
                            y: 0
                        };
                        break;

                      case "bottom-right":
                        a = {
                            x: .5,
                            y: .5
                        };
                        break;

                      case "bottom":
                        a = {
                            x: 0,
                            y: 1
                        };
                        break;

                      case "bottom-left":
                        a = {
                            x: -.5,
                            y: 1
                        };
                        break;

                      case "left":
                        a = {
                            x: -1,
                            y: 0
                        };
                        break;

                      case "top-left":
                        a = {
                            x: -.5,
                            y: -.5
                        };
                        break;

                      default:
                        a = {
                            x: 0,
                            y: 0
                        };
                    }
                    this.params.particles.move.straight ? (this.vx = a.x, this.vy = a.y, this.params.particles.move.random && (this.vx = this.vx * Math.random(), 
                    this.vy = this.vy * Math.random())) : (this.vx = a.x + Math.random() - .5, this.vy = a.y + Math.random() - .5), 
                    this.vx_i = this.vx, this.vy_i = this.vy;
                    var t = this.params.particles.shape.type;
                    if ("object" == ("undefined" == typeof t ? "undefined" : s(t))) {
                        if (t instanceof Array) {
                            var e = t[Math.floor(Math.random() * t.length)];
                            this.shape = e;
                        }
                    } else this.shape = t;
                    if ("image" == this.shape) {
                        var i = this.params.particles.shape;
                        this.img = {
                            src: i.image.src,
                            ratio: i.image.width / i.image.height
                        }, this.img.ratio || (this.img.ratio = 1), "svg" == this.params.tmp.img_type && void 0 != this.params.tmp.source_svg && (this.params.fn.vendors.createSvgImg(this), 
                        this.params.tmp.pushing && (this.img.loaded = !1));
                    }
                }
            }, {
                key: "draw",
                value: function a() {
                    var t = this, e = void 0;
                    e = void 0 != this.radius_bubble ? this.radius_bubble : this.radius;
                    var i = void 0;
                    i = void 0 != this.opacity_bubble ? this.opacity_bubble : this.opacity;
                    var s = void 0;
                    if (this.color.rgb) {
                        var r = this.color.rgb, n = r.r, o = r.g, c = r.b;
                        s = "rgba( " + n + ", " + o + ", " + c + ", " + i + " )";
                    } else {
                        var p = this.color.hsl, h = p.h, l = p.s, m = p.l;
                        s = "hsla( " + h + ", " + l + ", " + m + ", " + i + " )";
                    }
                    switch (this.params.canvas.ctx.fillStyle = s, this.params.canvas.ctx.beginPath(), 
                    this.shape) {
                      case "circle":
                        (Math.floor(100 * Math.random()) + 20) % 17 == 0, this.params.canvas.ctx.arc(this.x, this.y, e, 0, 2 * Math.PI, !1);
                        break;

                      case "edge":
                        this.params.canvas.ctx.rect(this.x - e, this.y - e, 2 * e, 2 * e);
                        break;

                      case "triangle":
                        this.params.fn.vendors.drawShape(this.params.canvas.ctx, this.x - e, this.y + e / 1.66, 2 * e, 3, 2);
                        break;

                      case "polygon":
                        this.params.fn.vendors.drawShape(this.params.canvas.ctx, this.x - e / (this.params.particles.shape.polygon.nb_sides / 3.5), this.y - e / .76, 2.66 * e / (this.params.particles.shape.polygon.nb_sides / 3), this.params.particles.shape.polygon.nb_sides, 1);
                        break;

                      case "star":
                        this.params.fn.vendors.drawShape(this.params.canvas.ctx, this.x - 2 * e / (this.params.particles.shape.polygon.nb_sides / 4), this.y - e / 1.52, 2 * e * 2.66 / (this.params.particles.shape.polygon.nb_sides / 3), this.params.particles.shape.polygon.nb_sides, 2);
                        break;

                      case "image":
                        var a = function(a) {
                            t.params.canvas.ctx.drawImage(a, t.x - e, t.y - e, 2 * e, 2 * e / t.img.ratio);
                        }, u = void 0;
                        u = "svg" == this.params.tmp.img_type ? this.img.obj : this.params.tmp.img_obj, 
                        u && a(u);
                    }
                    this.params.canvas.ctx.closePath(), this.params.particles.shape.stroke.width > 0 && (this.params.canvas.ctx.strokeStyle = this.params.particles.shape.stroke.color, 
                    this.params.canvas.ctx.lineWidth = this.params.particles.shape.stroke.width, this.params.canvas.ctx.stroke()), 
                    this.params.canvas.ctx.fill();
                }
            } ]), a;
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = o;
    }, function(a, t, e) {
        "use strict";
        function i(a, t) {
            if (!(a instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var s = function() {
            function a(a, t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(a, i.key, i);
                }
            }
            return function(t, e, i) {
                return e && a(t.prototype, e), i && a(t, i), t;
            };
        }(), r = e(1), n = function() {
            function a(t, e, s, r, n) {
                i(this, a), this.params = t, this.interact = e, this.modes = s, this.vendors = r, 
                this.lib = n, this.particlesCreate = this.particlesCreate.bind(this), this.particlesUpdate = this.particlesUpdate.bind(this), 
                this.particlesDraw = this.particlesDraw.bind(this), this.particlesEmpty = this.particlesEmpty.bind(this), 
                this.particlesRefresh = this.particlesRefresh.bind(this), this.extendParticleFunctionDefinition();
            }
            return s(a, [ {
                key: "extendParticleFunctionDefinition",
                value: function() {
                    this.params.fn.particlesCreate = this.particlesCreate, this.params.fn.particlesUpdate = this.particlesUpdate, 
                    this.params.fn.particlesDraw = this.particlesDraw, this.params.fn.particlesEmpty = this.particlesEmpty, 
                    this.params.fn.particlesRefresh = this.particlesRefresh;
                }
            }, {
                key: "particlesCreate",
                value: function() {
                    for (var a = this.params.particles, t = a.color, e = a.opacity, i = 0; i < this.params.particles.number.value; i++) this.params.particles.array.push(new r.Particle(this.params, t, e.value));
                }
            }, {
                key: "particlesUpdate",
                value: function() {
                    var a = this;
                    this.params.particles.array.forEach(function(t, e) {
                        if (a.params.particles.move.enable) {
                            var i = a.params.particles.move.speed / 2;
                            t.x += t.vx * i, t.y += t.vy * i;
                        }
                        a.params.particles.opacity.anim.enable && (1 == t.opacity_status ? (t.opacity >= a.params.particles.opacity.value && (t.opacity_status = !1), 
                        t.opacity += t.vo) : (t.opacity <= a.params.particles.opacity.anim.opacity_min && (t.opacity_status = !0), 
                        t.opacity -= t.vo), t.opacity < 0 && (t.opacity = 0)), a.params.particles.size.anim.enable && (1 == t.size_status ? (t.radius >= a.params.particles.size.value && (t.size_status = !1), 
                        t.radius += t.vs) : t.radius <= a.params.particles.size.anim.size_min && (t.radius -= t.vs), 
                        t.radius < 0 && (t.radius = 0));
                        var s = void 0;
                        switch (s = "bound" == a.params.particles.move.out_mode ? {
                            x_left: t.radius,
                            x_right: a.params.canvas.width,
                            y_top: t.radius,
                            y_bottom: a.params.canvas.height
                        } : {
                            x_left: -t.radius,
                            x_right: a.params.canvas.width + t.radius,
                            y_top: -t.radius,
                            y_bottom: a.params.canvas.height + t.radius
                        }, t.x - t.radius > a.params.canvas.width ? (t.x = s.x_left, t.y = Math.random() * a.params.canvas.height) : t.x + t.radius < 0 && (t.x = s.x_right, 
                        t.y = Math.random() * a.params.canvas.height), t.y - t.radius > a.params.canvas.height ? (t.y = s.y_top, 
                        t.x = Math.random() * a.params.canvas.width) : t.y + t.radius < 0 && (t.y = s.y_bottom, 
                        t.x = Math.random() * a.params.canvas.width), a.params.particles.move.out_mode) {
                          case "bounce":
                            t.x + t.radius > a.params.canvas.width ? t.vx = -t.vx : t.x - t.radius < 0 && (t.vx = -t.vx), 
                            t.y + t.radius > a.params.canvas.height ? t.vy = -t.vy : t.y - t.radius < 0 && (t.vy = -t.vy);
                        }
                        r.isInArray("grab", a.params.interactivity.events.onhover.mode) && a.params.fn.modes.grabParticle(t), 
                        (r.isInArray("bubble", a.params.interactivity.events.onhover.mode) || r.isInArray("bubble", a.params.interactivity.events.onclick.mode)) && a.params.fn.modes.bubbleParticle(t), 
                        (r.isInArray("repulse", a.params.interactivity.events.onhover.mode) || r.isInArray("repulse", a.params.interactivity.events.onclick.mode)) && a.params.fn.modes.repulseParticle(t);
                        var n = a.interact, o = n.linkParticles, c = n.attractParticles, p = n.bounceParticles;
                        if (a.params.particles.line_linked.enable || a.params.particles.move.attract.enable) for (var h = e + 1; h < a.params.particles.array.length; h++) {
                            var l = a.params.particles.array[h];
                            a.params.particles.line_linked.enable && o(t, l), a.params.particles.move.attract.enable && c(t, l), 
                            a.params.particles.move.bounce && p(t, l);
                        }
                    });
                }
            }, {
                key: "particlesDraw",
                value: function() {
                    this.params.canvas.ctx.clearRect(0, 0, this.params.canvas.width, this.params.canvas.height), 
                    this.params.fn.particlesUpdate(), this.params.particles.array.forEach(function(a) {
                        a.draw();
                    });
                }
            }, {
                key: "particlesEmpty",
                value: function() {
                    this.params.particles.array = [];
                }
            }, {
                key: "particlesRefresh",
                value: function() {
                    cancelAnimationFrame(this.params.fn.checkAnimFrame), cancelAnimationFrame(this.params.fn.drawAnimFrame), 
                    this.params.tmp.source_svg = void 0, this.params.tmp.img_obj = void 0, this.params.tmp.count_svg = 0, 
                    this.particlesEmpty(), this.lib.canvasClear(), this.params.fn.vendors.start();
                }
            } ]), a;
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = n;
    }, function(a, t, e) {
        "use strict";
        function i(a, t) {
            if (!(a instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var s = function() {
            function a(a, t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(a, i.key, i);
                }
            }
            return function(t, e, i) {
                return e && a(t.prototype, e), i && a(t, i), t;
            };
        }(), r = e(1), n = function() {
            function a(t, e) {
                i(this, a), r.deepExtend(r.defaultParams, e), this.params = r.defaultParams, this.extendParams(t), 
                this.interact = new r.Interact(this.params), this.modes = new r.Modes(this.params), 
                this.vendors = new r.Vendors(this.params), this.particleManager = new r.ParticleManager(this.params, this.interact, this.modes, this.vendors, this);
            }
            return s(a, [ {
                key: "start",
                value: function() {
                    this.params.fn.vendors.eventsListeners(), this.params.fn.vendors.start();
                }
            }, {
                key: "destroy",
                value: function() {
                    this.detachListeners(), this.vendors.detachListeners();
                }
            }, {
                key: "detachListeners",
                value: function() {
                    window.removeEventListener("resize", this.onWindowResize);
                }
            }, {
                key: "extendParams",
                value: function(a) {
                    this.extendCanvasDefinition(a), this.extendTmpDefinition(), this.onWindowResize = this.onWindowResize.bind(this), 
                    this.retinaInit = this.retinaInit.bind(this), this.canvasInit = this.canvasInit.bind(this), 
                    this.canvasSize = this.canvasSize.bind(this), this.canvasPaint = this.canvasPaint.bind(this), 
                    this.canvasClear = this.canvasClear.bind(this), this.extendRetinaFunctionDefinition(), 
                    this.extendCanvasFunctionDefinition(), this.extendParticleFunctionDefinition();
                }
            }, {
                key: "extendCanvasDefinition",
                value: function(a) {
                    this.params.canvas = {
                        element: a,
                        width: a.offsetWidth,
                        height: a.offsetHeight
                    };
                }
            }, {
                key: "extendTmpDefinition",
                value: function() {
                    this.params.tmp.obj = {
                        size_value: this.params.particles.size.value,
                        size_anim_speed: this.params.particles.size.anim.speed,
                        move_speed: this.params.particles.move.speed,
                        line_linked_distance: this.params.particles.line_linked.distance,
                        line_linked_width: this.params.particles.line_linked.width,
                        mode_grab_distance: this.params.interactivity.modes.grab.distance,
                        mode_bubble_distance: this.params.interactivity.modes.bubble.distance,
                        mode_bubble_size: this.params.interactivity.modes.bubble.size,
                        mode_repulse_distance: this.params.interactivity.modes.repulse.distance
                    };
                }
            }, {
                key: "extendRetinaFunctionDefinition",
                value: function() {
                    this.params.fn.retinaInit = this.retinaInit;
                }
            }, {
                key: "retinaInit",
                value: function() {
                    this.params.retina_detect && window.devicePixelRatio > 1 ? (this.params.canvas.pxratio = window.devicePixelRatio, 
                    this.params.tmp.retina = !0, this.params.canvas.width = this.params.canvas.element.offsetWidth * this.params.canvas.pxratio, 
                    this.params.canvas.height = this.params.canvas.element.offsetHeight * this.params.canvas.pxratio, 
                    this.params.particles.size.value = this.params.tmp.obj.size_value * this.params.canvas.pxratio, 
                    this.params.particles.size.anim.speed = this.params.tmp.obj.size_anim_speed * this.params.canvas.pxratio, 
                    this.params.particles.move.speed = this.params.tmp.obj.move_speed * this.params.canvas.pxratio, 
                    this.params.particles.line_linked.distance = this.params.tmp.obj.line_linked_distance * this.params.canvas.pxratio, 
                    this.params.interactivity.modes.grab.distance = this.params.tmp.obj.mode_grab_distance * this.params.canvas.pxratio, 
                    this.params.interactivity.modes.bubble.distance = this.params.tmp.obj.mode_bubble_distance * this.params.canvas.pxratio, 
                    this.params.particles.line_linked.width = this.params.tmp.obj.line_linked_width * this.params.canvas.pxratio, 
                    this.params.interactivity.modes.bubble.size = this.params.tmp.obj.mode_bubble_size * this.params.canvas.pxratio, 
                    this.params.interactivity.modes.repulse.distance = this.params.tmp.obj.mode_repulse_distance * this.params.canvas.pxratio) : (this.params.canvas.pxratio = 1, 
                    this.params.tmp.retina = !1);
                }
            }, {
                key: "extendCanvasFunctionDefinition",
                value: function() {
                    this.params.fn.canvasInit = this.canvasInit, this.params.fn.canvasSize = this.canvasSize, 
                    this.params.fn.canvasPaint = this.canvasPaint, this.params.fn.canvasClear = this.canvasClear;
                }
            }, {
                key: "canvasInit",
                value: function() {
                    this.params.canvas.ctx = this.params.canvas.element.getContext("2d");
                }
            }, {
                key: "canvasSize",
                value: function() {
                    this.params.canvas.element.width = this.params.canvas.width, this.params.canvas.element.height = this.params.canvas.height, 
                    this.params && this.params.interactivity.events.resize && window.addEventListener("resize", this.onWindowResize);
                }
            }, {
                key: "canvasPaint",
                value: function() {
                    this.params.canvas.ctx.fillRect(0, 0, this.params.canvas.width, this.params.canvas.height);
                }
            }, {
                key: "canvasClear",
                value: function() {
                    this.params.canvas.ctx.clearRect(0, 0, this.params.canvas.width, this.params.canvas.height);
                }
            }, {
                key: "extendParticleFunctionDefinition",
                value: function() {
                    this.params.fn.particle = r.Particle;
                }
            }, {
                key: "onWindowResize",
                value: function() {
                    this.params.canvas.width = this.params.canvas.element.offsetWidth, this.params.canvas.height = this.params.canvas.element.offsetHeight, 
                    this.params.tmp.retina && (this.params.canvas.width *= this.params.canvas.pxratio, 
                    this.params.canvas.height *= this.params.canvas.pxratio), this.params.canvas.element.width = this.params.canvas.width, 
                    this.params.canvas.element.height = this.params.canvas.height, this.params.particles.move.enable || (this.params.fn.particlesEmpty(), 
                    this.params.fn.particlesCreate(), this.params.fn.particlesDraw(), this.params.fn.vendors.densityAutoParticles()), 
                    this.params.fn.vendors.densityAutoParticles();
                }
            } ]), a;
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = n;
    }, function(a, t) {
        "use strict";
        t.hexToRgb = function(a) {
            var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            a = a.replace(t, function(a, t, e, i) {
                return t + t + e + e + i + i;
            });
            var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            return e ? {
                r: parseInt(e[1], 16),
                g: parseInt(e[2], 16),
                b: parseInt(e[3], 16)
            } : null;
        }, t.clamp = function(a, t, e) {
            return Math.min(Math.max(a, t), e);
        }, t.isInArray = function(a, t) {
            return t.indexOf(a) > -1;
        }, t.deepExtend = function(a, e) {
            for (var i in e) e[i] && e[i].constructor && e[i].constructor === Object ? (a[i] = a[i] || {}, 
            t.deepExtend(a[i], e[i])) : a[i] = e[i];
            return a;
        };
    }, function(a, t, e) {
        "use strict";
        function i(a, t) {
            if (!(a instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var s = function() {
            function a(a, t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(a, i.key, i);
                }
            }
            return function(t, e, i) {
                return e && a(t.prototype, e), i && a(t, i), t;
            };
        }(), r = e(1), n = function() {
            function a(t) {
                i(this, a), this.params = t, this.eventsListeners = this.eventsListeners.bind(this), 
                this.onMouseMove = this.onMouseMove.bind(this), this.onMouseLeave = this.onMouseLeave.bind(this), 
                this.onClick = this.onClick.bind(this), this.densityAutoParticles = this.densityAutoParticles.bind(this), 
                this.checkOverlap = this.checkOverlap.bind(this), this.createSvgImg = this.createSvgImg.bind(this), 
                this.destroy = this.destroy.bind(this), this.drawShape = this.drawShape.bind(this), 
                this.exportImg = this.exportImg.bind(this), this.loadImg = this.loadImg.bind(this), 
                this.draw = this.draw.bind(this), this.checkBeforeDraw = this.checkBeforeDraw.bind(this), 
                this.init = this.init.bind(this), this.start = this.start.bind(this), this.params.fn.vendors.eventsListeners = this.eventsListeners, 
                this.params.fn.vendors.densityAutoParticles = this.densityAutoParticles, this.params.fn.vendors.checkOverlap = this.checkOverlap, 
                this.params.fn.vendors.createSvgImg = this.createSvgImg, this.params.fn.vendors.destroy = this.destroy, 
                this.params.fn.vendors.drawShape = this.drawShape, this.params.fn.vendors.exportImg = this.exportImg, 
                this.params.fn.vendors.loadImg = this.loadImg, this.params.fn.vendors.draw = this.draw, 
                this.params.fn.vendors.checkBeforeDraw = this.checkBeforeDraw, this.params.fn.vendors.init = this.init, 
                this.params.fn.vendors.start = this.start;
            }
            return s(a, [ {
                key: "eventsListeners",
                value: function() {
                    var a = this.params, t = a.canvas, e = a.interactivity;
                    "window" == e.detect_on ? e.el = window : e.el = t.element, (e.events.onhover.enable || e.events.onclick.enable) && (e.el.addEventListener("mousemove", this.onMouseMove), 
                    e.el.addEventListener("mouseleave", this.onMouseLeave)), e.events.onclick.enable && e.el.addEventListener("click", this.onClick);
                }
            }, {
                key: "detachListeners",
                value: function() {
                    var a = this.params.interactivity;
                    a.el && ((a.events.onhover.enable || a.events.onclick.enable) && (a.el.removeEventListener("mousemove", this.onMouseMove), 
                    a.el.addEventListener("mouseleave", this.onMouseLeave)), a.events.onclick.enable && a.el.addEventListener("click", this.onClick)), 
                    window.cancelAnimationFrame(this.params.fn.drawAnimFrame);
                }
            }, {
                key: "onMouseMove",
                value: function(a) {
                    var t = this.params, e = t.canvas, i = t.interactivity, s = t.tmp, r = void 0;
                    r = i.el == window ? {
                        x: a.clientX,
                        y: a.clientY
                    } : {
                        x: a.offsetX || a.clientX,
                        y: a.offsetY || a.clientY
                    }, i.mouse.pos_x = r.x, i.mouse.pos_y = r.y, s.retina && (i.mouse.pos_x *= e.pxratio, 
                    i.mouse.pos_y *= e.pxratio), i.status = "mousemove";
                }
            }, {
                key: "onMouseLeave",
                value: function(a) {
                    var t = this.params.interactivity;
                    t.mouse.pos_x = null, t.mouse.pos_y = null, t.status = "mouseleave";
                }
            }, {
                key: "onClick",
                value: function() {
                    var a = this.params, t = a.fn, e = a.interactivity, i = a.particles, s = a.tmp;
                    if (e.mouse.click_pos_x = e.mouse.pos_x, e.mouse.click_pos_y = e.mouse.pos_y, e.mouse.click_time = new Date().getTime(), 
                    e.events.onclick.enable) switch (e.events.onclick.mode) {
                      case "push":
                        i.move.enable ? t.modes.pushParticles(e.modes.push.particles_nb, e.mouse) : 1 == e.modes.push.particles_nb ? t.modes.pushParticles(e.modes.push.particles_nb, e.mouse) : e.modes.push.particles_nb > 1 && t.modes.pushParticles(e.modes.push.particles_nb);
                        break;

                      case "remove":
                        t.modes.removeParticles(e.modes.remove.particles_nb);
                        break;

                      case "bubble":
                        s.bubble_clicking = !0;
                        break;

                      case "repulse":
                        s.repulse_clicking = !0, s.repulse_count = 0, s.repulse_finish = !1, setTimeout(function() {
                            s.repulse_clicking = !1;
                        }, 1e3 * e.modes.repulse.duration);
                    }
                }
            }, {
                key: "densityAutoParticles",
                value: function() {
                    var a = this.params, t = a.canvas, e = a.fn, i = a.particles, s = a.tmp;
                    if (i.number.density.enable) {
                        var r = t.element.width * t.element.height / 1e3;
                        s.retina && (r = r / t.pxratio * 2);
                        var n = r * i.number.value / i.number.density.value_area, o = i.array.length - n;
                        o < 0 ? e.modes.pushParticles(Math.abs(o)) : e.modes.removeParticles(o);
                    }
                }
            }, {
                key: "checkOverlap",
                value: function(a, t) {
                    var e = this.params, i = e.canvas, s = e.fn, r = e.particles;
                    r.array.forEach(function(e) {
                        var r = e, n = a.x - r.x, o = a.y - r.y, c = Math.sqrt(n * n + o * o);
                        c <= a.radius + r.radius && (a.x = t ? t.x : Math.random() * i.width, a.y = t ? t.y : Math.random() * i.height, 
                        s.vendors.checkOverlap(a));
                    });
                }
            }, {
                key: "createSvgImg",
                value: function(a) {
                    var t = this.params.tmp, e = t.source_svg, i = /#([0-9A-F]{3,6})/gi, s = e.replace(i, function(t, e, i, s) {
                        var r = void 0;
                        if (a.color.rgb) {
                            var n = a.color.rgb, o = n.r, c = n.g, p = n.b;
                            r = "rgba( " + o + ", " + c + ", " + p + ", " + a.opacity + " )";
                        } else {
                            var h = a.color.hsl, l = h.h, m = h.s, u = h.l;
                            r = "rgba( " + l + ", " + m + ", " + u + ", " + a.opacity + " )";
                        }
                        return r;
                    }), r = new Blob([ s ], {
                        type: "image/svg+xml;charset=utf-8"
                    }), n = window.URL || window, o = n.createObjectURL(r), c = new Image();
                    c.addEventListener("load", function() {
                        a.img.obj = c, a.img.loaded = !0, n.revokeObjectURL(o), t.count_svg++;
                    }), c.src = o;
                }
            }, {
                key: "destroy",
                value: function() {
                    var a = this.params, t = a.canvas, e = a.fn;
                    cancelAnimationFrame(e.drawAnimFrame), t.element.remove();
                }
            }, {
                key: "drawShape",
                value: function(a, t, e, i, s, r) {
                    var n = s * r, o = s / r, c = 180 * (o - 2) / o, p = Math.PI - Math.PI * c / 180;
                    a.save(), a.beginPath(), a.translate(t, e), a.moveTo(0, 0);
                    for (var h = 0; h < n; h++) a.lineTo(i, 0), a.translate(i, 0), a.rotate(p);
                    a.fill(), a.restore();
                }
            }, {
                key: "exportImg",
                value: function() {
                    var a = this.params.canvas;
                    window.open(a.element.toDataURL("image/png"), "_blank");
                }
            }, {
                key: "loadImg",
                value: function(a) {
                    var t = this.params, e = t.fn, i = t.particles, s = t.tmp;
                    s.img_error = void 0, "" != i.shape.image.src ? "svg" == a ? !function() {
                        var a = new XMLHttpRequest();
                        a.open("GET", i.shape.image.src), a.onreadystatechange = function(t) {
                            4 == a.readyState && (200 == a.status ? (s.source_svg = t.currentTarget.response, 
                            e.vendors.checkBeforeDraw()) : (console.log("Error react-particles-js - image not found"), 
                            s.img_error = !0));
                        }, a.send();
                    }() : !function() {
                        var a = new Image();
                        a.addEventListener("load", function() {
                            s.img_obj = a, e.vendors.checkBeforeDraw();
                        }), a.src = i.shape.image.src;
                    }() : (console.log("Error react-particles-js - no image.src"), s.img_error = !0);
                }
            }, {
                key: "draw",
                value: function() {
                    var a = this.params, t = a.fn, e = a.particles, i = a.tmp;
                    "image" == e.shape.type ? "svg" == i.img_type ? i.count_svg >= e.number.value ? (t.particlesDraw(), 
                    e.move.enable ? t.drawAnimFrame = requestAnimationFrame(t.vendors.draw) : cancelAnimationFrame(t.drawAnimFrame)) : i.img_error || (t.drawAnimFrame = requestAnimationFrame(t.vendors.draw)) : void 0 != i.img_obj ? (t.particlesDraw(), 
                    e.move.enable ? t.drawAnimFrame = requestAnimationFrame(t.vendors.draw) : cancelAnimationFrame(t.drawAnimFrame)) : i.img_error || (t.drawAnimFrame = requestAnimationFrame(t.vendors.draw)) : (t.particlesDraw(), 
                    e.move.enable ? t.drawAnimFrame = requestAnimationFrame(t.vendors.draw) : cancelAnimationFrame(t.drawAnimFrame));
                }
            }, {
                key: "checkBeforeDraw",
                value: function() {
                    var a = this.params, t = a.fn, e = a.particles, i = a.tmp;
                    if ("image" == e.shape.type) if ("svg" == i.img_type && void 0 == i.source_svg) {
                        var s = void 0;
                        i.checkAnimFrame = requestAnimationFrame(s);
                    } else cancelAnimationFrame(i.checkAnimFrame), i.img_error || (t.vendors.init(), 
                    t.vendors.draw()); else t.vendors.init(), t.vendors.draw();
                }
            }, {
                key: "init",
                value: function() {
                    var a = this.params, t = a.fn, e = a.particles;
                    t.retinaInit(), t.canvasInit(), t.canvasSize(), t.particlesCreate(), t.vendors.densityAutoParticles(), 
                    e.line_linked.color_rgb_line = r.hexToRgb(e.line_linked.color);
                }
            }, {
                key: "start",
                value: function() {
                    var a = this.params, t = a.fn, e = a.particles, i = a.tmp;
                    r.isInArray("image", e.shape.type) ? (i.img_type = e.shape.image.src.substr(e.shape.image.src.length - 3), 
                    t.vendors.loadImg(i.img_type)) : t.vendors.checkBeforeDraw();
                }
            } ]), a;
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = n;
    }, function(a, t) {
        "use strict";
        var e = {
            canvas: {
                element: null,
                width: null,
                height: null
            },
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: !1,
                        value_area: 1200
                    }
                },
                color: {
                    value: "#FFF"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: "",
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: .5,
                    random: !1,
                    anim: {
                        enable: !0,
                        speed: 1,
                        opacity_min: .1,
                        sync: !1
                    }
                },
                size: {
                    value: 2,
                    random: !1,
                    anim: {
                        enable: !1,
                        speed: 40,
                        size_min: 0,
                        sync: !1
                    }
                },
                line_linked: {
                    enable: !0,
                    distance: 150,
                    color: "#FFF",
                    opacity: .6,
                    width: 1
                },
                move: {
                    enable: !0,
                    speed: 4,
                    direction: "none",
                    random: !1,
                    straight: !1,
                    out_mode: "out",
                    bounce: !1,
                    attract: {
                        enable: !1,
                        rotateX: 3e3,
                        rotateY: 3e3
                    }
                },
                array: []
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: !0,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: !0,
                        mode: "push"
                    },
                    resize: !0
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 200,
                        size: 80,
                        duration: .4
                    },
                    repulse: {
                        distance: 100,
                        duration: .4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                },
                mouse: {}
            },
            retina_detect: !0,
            fn: {
                interact: {},
                modes: {},
                vendors: {}
            },
            tmp: {
                obj: null,
                retina: null
            }
        };
        t.defaultParams = e;
    } ]);
});