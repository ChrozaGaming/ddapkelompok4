/**
 * Highmaps JS v11.3.0 (2024-01-10)
 *
 * (c) 2011-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */!function (t, e) {
    "object" == typeof module && module.exports ? (e.default = e, module.exports = t && t.document ? e(t) : e) : "function" == typeof define && define.amd ? define("highcharts/highmaps", function () {
        return e(t)
    }) : (t.Highcharts && t.Highcharts.error(16, !0), t.Highcharts = e(t))
}("undefined" != typeof window ? window : this, function (t) {
    "use strict";
    var e = {};

    function i(e, i, o, r) {
        e.hasOwnProperty(i) || (e[i] = r.apply(null, o), "function" == typeof CustomEvent && t.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: i,
                module: e[i]
            }
        })))
    }

    return i(e, "Core/Globals.js", [], function () {
        var e, i;
        return (i = e || (e = {})).SVG_NS = "http://www.w3.org/2000/svg", i.product = "Highcharts", i.version = "11.3.0", i.win = void 0 !== t ? t : {}, i.doc = i.win.document, i.svg = i.doc && i.doc.createElementNS && !!i.doc.createElementNS(i.SVG_NS, "svg").createSVGRect, i.userAgent = i.win.navigator && i.win.navigator.userAgent || "", i.isChrome = -1 !== i.userAgent.indexOf("Chrome"), i.isFirefox = -1 !== i.userAgent.indexOf("Firefox"), i.isMS = /(edge|msie|trident)/i.test(i.userAgent) && !i.win.opera, i.isSafari = !i.isChrome && -1 !== i.userAgent.indexOf("Safari"), i.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(i.userAgent), i.isWebKit = -1 !== i.userAgent.indexOf("AppleWebKit"), i.deg2rad = 2 * Math.PI / 360, i.hasBidiBug = i.isFirefox && 4 > parseInt(i.userAgent.split("Firefox/")[1], 10), i.hasTouch = !!i.win.TouchEvent, i.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"], i.noop = function () {
        }, i.supportsPassiveEvents = function () {
            var t = !1;
            if (!i.isMS) {
                var e = Object.defineProperty({}, "passive", {
                    get: function () {
                        t = !0
                    }
                });
                i.win.addEventListener && i.win.removeEventListener && (i.win.addEventListener("testPassive", i.noop, e), i.win.removeEventListener("testPassive", i.noop, e))
            }
            return t
        }(), i.charts = [], i.composed = [], i.dateFormats = {}, i.seriesTypes = {}, i.symbolSizes = {}, i.chartCount = 0, e
    }), i(e, "Core/Utilities.js", [e["Core/Globals.js"]], function (t) {
        var e, i, o, r = t.charts, s = t.doc, n = t.win;

        function a(e, i, o, r) {
            var s = i ? "Highcharts error" : "Highcharts warning";
            32 === e && (e = "".concat(s, ": Deprecated member"));
            var h = f(e),
                l = h ? "".concat(s, " #").concat(e, ": www.highcharts.com/errors/").concat(e, "/") : e.toString();
            if (void 0 !== r) {
                var c = "";
                h && (l += "?"), w(r, function (t, e) {
                    c += "\n - ".concat(e, ": ").concat(t), h && (l += encodeURI(e) + "=" + encodeURI(t))
                }), l += c
            }
            A(t, "displayError", {chart: o, code: e, message: l, params: r}, function () {
                if (i) throw Error(l);
                n.console && -1 === a.messages.indexOf(l) && console.warn(l)
            }), a.messages.push(l)
        }

        function h(t, e) {
            return parseInt(t, e || 10)
        }

        function l(t) {
            return "string" == typeof t
        }

        function c(t) {
            var e = Object.prototype.toString.call(t);
            return "[object Array]" === e || "[object Array Iterator]" === e
        }

        function p(t, e) {
            return !!t && "object" == typeof t && (!e || !c(t))
        }

        function d(t) {
            return p(t) && "number" == typeof t.nodeType
        }

        function u(t) {
            var e = t && t.constructor;
            return !!(p(t, !0) && !d(t) && e && e.name && "Object" !== e.name)
        }

        function f(t) {
            return "number" == typeof t && !isNaN(t) && t < 1 / 0 && t > -1 / 0
        }

        function g(t) {
            return null != t
        }

        function m(t, e, i) {
            var o, r = l(e) && !g(i), s = function (e, i) {
                g(e) ? t.setAttribute(i, e) : r ? (o = t.getAttribute(i)) || "class" !== i || (o = t.getAttribute(i + "Name")) : t.removeAttribute(i)
            };
            return l(e) ? s(i, e) : w(e, s), o
        }

        function y(t) {
            return c(t) ? t : [t]
        }

        function v(t, e) {
            var i;
            for (i in t || (t = {}), e) t[i] = e[i];
            return t
        }

        function x() {
            for (var t = arguments, e = t.length, i = 0; i < e; i++) {
                var o = t[i];
                if (null != o) return o
            }
        }

        function b(e, i) {
            t.isMS && !t.svg && i && g(i.opacity) && (i.filter = "alpha(opacity=".concat(100 * i.opacity, ")")), v(e.style, i)
        }

        function M(t) {
            return Math.pow(10, Math.floor(Math.log(t) / Math.LN10))
        }

        function C(t, e) {
            return t > 1e14 ? t : parseFloat(t.toPrecision(e || 14))
        }

        (a || (a = {})).messages = [], Math.easeInOutSine = function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        };
        var S = Array.prototype.find ? function (t, e) {
            return t.find(e)
        } : function (t, e) {
            var i, o = t.length;
            for (i = 0; i < o; i++) if (e(t[i], i)) return t[i]
        };

        function w(t, e, i) {
            for (var o in t) Object.hasOwnProperty.call(t, o) && e.call(i || t[o], t[o], o, t)
        }

        function k(t, e, i) {
            function o(e, i) {
                var o = t.removeEventListener;
                o && o.call(t, e, i, !1)
            }

            function r(i) {
                var r, s;
                t.nodeName && (e ? (r = {})[e] = !0 : r = i, w(r, function (t, e) {
                    if (i[e]) for (s = i[e].length; s--;) o(e, i[e][s].fn)
                }))
            }

            var s = "function" == typeof t && t.prototype || t;
            if (Object.hasOwnProperty.call(s, "hcEvents")) {
                var n = s.hcEvents;
                if (e) {
                    var a = n[e] || [];
                    i ? (n[e] = a.filter(function (t) {
                        return i !== t.fn
                    }), o(e, i)) : (r(n), n[e] = [])
                } else r(n), delete s.hcEvents
            }
        }

        function A(e, i, o, r) {
            var n;
            if (o = o || {}, s.createEvent && (e.dispatchEvent || e.fireEvent && e !== t)) (n = s.createEvent("Events")).initEvent(i, !0, !0), o = v(n, o), e.dispatchEvent ? e.dispatchEvent(o) : e.fireEvent(i, o); else if (e.hcEvents) {
                o.target || v(o, {
                    preventDefault: function () {
                        o.defaultPrevented = !0
                    }, target: e, type: i
                });
                for (var a = [], h = e, l = !1; h.hcEvents;) Object.hasOwnProperty.call(h, "hcEvents") && h.hcEvents[i] && (a.length && (l = !0), a.unshift.apply(a, h.hcEvents[i])), h = Object.getPrototypeOf(h);
                l && a.sort(function (t, e) {
                    return t.order - e.order
                }), a.forEach(function (t) {
                    !1 === t.fn.call(e, o) && o.preventDefault()
                })
            }
            r && !o.defaultPrevented && r.call(e, o)
        }

        w({map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some"}, function (e, i) {
            t[i] = function (t) {
                var o;
                return a(32, !1, void 0, ((o = {})["Highcharts.".concat(i)] = "use Array.".concat(e), o)), Array.prototype[e].apply(t, [].slice.call(arguments, 1))
            }
        });
        var T = (e = Math.random().toString(36).substring(2, 9) + "-", i = 0, function () {
            return "highcharts-" + (o ? "" : e) + i++
        });
        return n.jQuery && (n.jQuery.fn.highcharts = function () {
            var e = [].slice.call(arguments);
            if (this[0]) return e[0] ? (new t[l(e[0]) ? e.shift() : "Chart"](this[0], e[0], e[1]), this) : r[m(this[0], "data-highcharts-chart")]
        }), {
            addEvent: function (e, i, o, r) {
                void 0 === r && (r = {});
                var s = "function" == typeof e && e.prototype || e;
                Object.hasOwnProperty.call(s, "hcEvents") || (s.hcEvents = {});
                var n = s.hcEvents;
                t.Point && e instanceof t.Point && e.series && e.series.chart && (e.series.chart.runTrackerClick = !0);
                var a = e.addEventListener;
                a && a.call(e, i, o, !!t.supportsPassiveEvents && {
                    passive: void 0 === r.passive ? -1 !== i.indexOf("touch") : r.passive,
                    capture: !1
                }), n[i] || (n[i] = []);
                var h = {fn: o, order: "number" == typeof r.order ? r.order : 1 / 0};
                return n[i].push(h), n[i].sort(function (t, e) {
                    return t.order - e.order
                }), function () {
                    k(e, i, o)
                }
            },
            arrayMax: function (t) {
                for (var e = t.length, i = t[0]; e--;) t[e] > i && (i = t[e]);
                return i
            },
            arrayMin: function (t) {
                for (var e = t.length, i = t[0]; e--;) t[e] < i && (i = t[e]);
                return i
            },
            attr: m,
            clamp: function (t, e, i) {
                return t > e ? t < i ? t : i : e
            },
            clearTimeout: function (t) {
                g(t) && clearTimeout(t)
            },
            correctFloat: C,
            createElement: function (t, e, i, o, r) {
                var n = s.createElement(t);
                return e && v(n, e), r && b(n, {
                    padding: "0",
                    border: "none",
                    margin: "0"
                }), i && b(n, i), o && o.appendChild(n), n
            },
            css: b,
            defined: g,
            destroyObjectProperties: function (t, e) {
                w(t, function (i, o) {
                    i && i !== e && i.destroy && i.destroy(), delete t[o]
                })
            },
            diffObjects: function (t, e, i, o) {
                var r = {};
                return function t(e, r, s, n) {
                    var a = i ? r : e;
                    w(e, function (i, h) {
                        if (!n && o && o.indexOf(h) > -1 && r[h]) {
                            i = y(i), s[h] = [];
                            for (var l = 0; l < Math.max(i.length, r[h].length); l++) r[h][l] && (void 0 === i[l] ? s[h][l] = r[h][l] : (s[h][l] = {}, t(i[l], r[h][l], s[h][l], n + 1)))
                        } else p(i, !0) && !i.nodeType ? (s[h] = c(i) ? [] : {}, t(i, r[h] || {}, s[h], n + 1), 0 !== Object.keys(s[h]).length || "colorAxis" === h && 0 === n || delete s[h]) : (e[h] !== r[h] || h in e && !(h in r)) && (s[h] = a[h])
                    })
                }(t, e, r, 0), r
            },
            discardElement: function (t) {
                t && t.parentElement && t.parentElement.removeChild(t)
            },
            erase: function (t, e) {
                for (var i = t.length; i--;) if (t[i] === e) {
                    t.splice(i, 1);
                    break
                }
            },
            error: a,
            extend: v,
            extendClass: function (t, e) {
                var i = function () {
                };
                return i.prototype = new t, v(i.prototype, e), i
            },
            find: S,
            fireEvent: A,
            getClosestDistance: function (t, e) {
                var i, o, r, s = !e;
                return t.forEach(function (t) {
                    if (t.length > 1) for (r = t.length - 1; r > 0; r--) (o = t[r] - t[r - 1]) < 0 && !s ? (null == e || e(), e = void 0) : o && (void 0 === i || o < i) && (i = o)
                }), i
            },
            getMagnitude: M,
            getNestedProperty: function (t, e) {
                for (var i = t.split("."); i.length && g(e);) {
                    var o = i.shift();
                    if (void 0 === o || "__proto__" === o) return;
                    if ("this" === o) {
                        var r = void 0;
                        return p(e) && (r = e["@this"]), null != r ? r : e
                    }
                    var s = e[o];
                    if (!g(s) || "function" == typeof s || "number" == typeof s.nodeType || s === n) return;
                    e = s
                }
                return e
            },
            getStyle: function t(e, i, o) {
                if ("width" === i) {
                    var r, s = Math.min(e.offsetWidth, e.scrollWidth),
                        a = e.getBoundingClientRect && e.getBoundingClientRect().width;
                    return a < s && a >= s - 1 && (s = Math.floor(a)), Math.max(0, s - (t(e, "padding-left", !0) || 0) - (t(e, "padding-right", !0) || 0))
                }
                if ("height" === i) return Math.max(0, Math.min(e.offsetHeight, e.scrollHeight) - (t(e, "padding-top", !0) || 0) - (t(e, "padding-bottom", !0) || 0));
                var l = n.getComputedStyle(e, void 0);
                return l && (r = l.getPropertyValue(i), x(o, "opacity" !== i) && (r = h(r))), r
            },
            inArray: function (t, e, i) {
                return a(32, !1, void 0, {"Highcharts.inArray": "use Array.indexOf"}), e.indexOf(t, i)
            },
            insertItem: function (t, e) {
                var i, o = t.options.index, r = e.length;
                for (i = t.options.isInternal ? r : 0; i < r + 1; i++) if (!e[i] || f(o) && o < x(e[i].options.index, e[i]._i) || e[i].options.isInternal) {
                    e.splice(i, 0, t);
                    break
                }
                return i
            },
            isArray: c,
            isClass: u,
            isDOMElement: d,
            isFunction: function (t) {
                return "function" == typeof t
            },
            isNumber: f,
            isObject: p,
            isString: l,
            keys: function (t) {
                return a(32, !1, void 0, {"Highcharts.keys": "use Object.keys"}), Object.keys(t)
            },
            merge: function () {
                var t, e = arguments, i = {}, o = function (t, e) {
                    return "object" != typeof t && (t = {}), w(e, function (i, r) {
                        "__proto__" !== r && "constructor" !== r && (!p(i, !0) || u(i) || d(i) ? t[r] = e[r] : t[r] = o(t[r] || {}, i))
                    }), t
                };
                !0 === e[0] && (i = e[1], e = Array.prototype.slice.call(e, 2));
                var r = e.length;
                for (t = 0; t < r; t++) i = o(i, e[t]);
                return i
            },
            normalizeTickInterval: function (t, e, i, o, r) {
                var s, n = t;
                i = x(i, M(t));
                var a = t / i;
                for (!e && (e = r ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === o && (1 === i ? e = e.filter(function (t) {
                    return t % 1 == 0
                }) : i <= .1 && (e = [1 / i]))), s = 0; s < e.length && (n = e[s], (!r || !(n * i >= t)) && (r || !(a <= (e[s] + (e[s + 1] || e[s])) / 2))); s++) ;
                return C(n * i, -Math.round(Math.log(.001) / Math.LN10))
            },
            objectEach: w,
            offset: function (t) {
                var e = s.documentElement, i = t.parentElement || t.parentNode ? t.getBoundingClientRect() : {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                };
                return {
                    top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0),
                    width: i.width,
                    height: i.height
                }
            },
            pad: function (t, e, i) {
                return Array((e || 2) + 1 - String(t).replace("-", "").length).join(i || "0") + t
            },
            pick: x,
            pInt: h,
            pushUnique: function (t, e) {
                return 0 > t.indexOf(e) && !!t.push(e)
            },
            relativeLength: function (t, e, i) {
                return /%$/.test(t) ? e * parseFloat(t) / 100 + (i || 0) : parseFloat(t)
            },
            removeEvent: k,
            splat: y,
            stableSort: function (t, e) {
                var i, o, r = t.length;
                for (o = 0; o < r; o++) t[o].safeI = o;
                for (t.sort(function (t, o) {
                    return 0 === (i = e(t, o)) ? t.safeI - o.safeI : i
                }), o = 0; o < r; o++) delete t[o].safeI
            },
            syncTimeout: function (t, e, i) {
                return e > 0 ? setTimeout(t, e, i) : (t.call(0, i), -1)
            },
            timeUnits: {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                week: 6048e5,
                month: 24192e5,
                year: 314496e5
            },
            uniqueKey: T,
            useSerialIds: function (t) {
                return o = x(t, o)
            },
            wrap: function (t, e, i) {
                var o = t[e];
                t[e] = function () {
                    var t = arguments, e = this;
                    return i.apply(this, [function () {
                        return o.apply(e, arguments.length ? arguments : t)
                    }].concat([].slice.call(arguments)))
                }
            }
        }
    }), i(e, "Core/Chart/ChartDefaults.js", [], function () {
        return {
            alignThresholds: !1,
            panning: {enabled: !1, type: "x"},
            styledMode: !1,
            borderRadius: 0,
            colorCount: 10,
            allowMutatingData: !0,
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            resetZoomButton: {theme: {}, position: {}},
            reflow: !0,
            type: "line",
            zooming: {singleTouch: !1, resetButton: {theme: {zIndex: 6}, position: {align: "right", x: -10, y: 10}}},
            width: null,
            height: null,
            borderColor: "#334eff",
            backgroundColor: "#ffffff",
            plotBorderColor: "#cccccc"
        }
    }), i(e, "Core/Color/Palettes.js", [], function () {
        return {colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"]}
    }), i(e, "Core/Time.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i = t.win, o = e.defined, r = e.error, s = e.extend, n = e.isNumber, a = e.isObject, h = e.merge,
            l = e.objectEach, c = e.pad, p = e.pick, d = e.splat, u = e.timeUnits,
            f = t.isSafari && i.Intl && i.Intl.DateTimeFormat.prototype.formatRange,
            g = t.isSafari && i.Intl && !i.Intl.DateTimeFormat.prototype.formatRange;
        return function () {
            function e(t) {
                this.options = {}, this.useUTC = !1, this.variableTimezone = !1, this.Date = i.Date, this.getTimezoneOffset = this.timezoneOffsetFunction(), this.update(t)
            }

            return e.prototype.get = function (t, e) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var i = e.getTime(), o = i - this.getTimezoneOffset(e);
                    e.setTime(o);
                    var r = e["getUTC" + t]();
                    return e.setTime(i), r
                }
                return this.useUTC ? e["getUTC" + t]() : e["get" + t]()
            }, e.prototype.set = function (t, e, i) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === t || "Seconds" === t || "Minutes" === t && this.getTimezoneOffset(e) % 36e5 == 0) return e["setUTC" + t](i);
                    var o = this.getTimezoneOffset(e), r = e.getTime() - o;
                    e.setTime(r), e["setUTC" + t](i);
                    var s = this.getTimezoneOffset(e);
                    return r = e.getTime() + s, e.setTime(r)
                }
                return this.useUTC || f && "FullYear" === t ? e["setUTC" + t](i) : e["set" + t](i)
            }, e.prototype.update = function (t) {
                void 0 === t && (t = {});
                var e = p(t.useUTC, !0);
                this.options = t = h(!0, this.options, t), this.Date = t.Date || i.Date || Date, this.useUTC = e, this.timezoneOffset = e && t.timezoneOffset || void 0, this.getTimezoneOffset = this.timezoneOffsetFunction(), this.variableTimezone = e && !!(t.getTimezoneOffset || t.timezone)
            }, e.prototype.makeTime = function (t, e, i, o, r, s) {
                var n, a, h;
                return this.useUTC ? (n = this.Date.UTC.apply(0, arguments), a = this.getTimezoneOffset(n), n += a, a !== (h = this.getTimezoneOffset(n)) ? n += h - a : a - 36e5 !== this.getTimezoneOffset(n - 36e5) || g || (n -= 36e5)) : n = new this.Date(t, e, p(i, 1), p(o, 0), p(r, 0), p(s, 0)).getTime(), n
            }, e.prototype.timezoneOffsetFunction = function () {
                var t = this, e = this.options, i = e.getTimezoneOffset;
                return this.useUTC ? e.timezone ? function (t) {
                    try {
                        var i = Intl.DateTimeFormat("en", {
                                timeZone: e.timezone,
                                timeZoneName: "shortOffset"
                            }).format(t).split(/(GMT|:)/).map(Number), o = (i[0], i[1], i[2]), s = (i[3], i[4]),
                            a = -(36e5 * (o + (void 0 === s ? 0 : s) / 60));
                        if (n(a)) return a
                    } catch (t) {
                        r(34)
                    }
                    return 0
                } : this.useUTC && i ? function (t) {
                    return 6e4 * i(t.valueOf())
                } : function () {
                    return 6e4 * (t.timezoneOffset || 0)
                } : function (t) {
                    return 6e4 * new Date(t.toString()).getTimezoneOffset()
                }
            }, e.prototype.dateFormat = function (e, i, r) {
                if (!o(i) || isNaN(i)) return t.defaultOptions.lang && t.defaultOptions.lang.invalidDate || "";
                e = p(e, "%Y-%m-%d %H:%M:%S");
                var n = this, a = new this.Date(i), h = this.get("Hours", a), d = this.get("Day", a),
                    u = this.get("Date", a), f = this.get("Month", a), g = this.get("FullYear", a),
                    m = t.defaultOptions.lang, y = m && m.weekdays, v = m && m.shortWeekdays;
                return l(s({
                    a: v ? v[d] : y[d].substr(0, 3),
                    A: y[d],
                    d: c(u),
                    e: c(u, 2, " "),
                    w: d,
                    b: m.shortMonths[f],
                    B: m.months[f],
                    m: c(f + 1),
                    o: f + 1,
                    y: g.toString().substr(2, 2),
                    Y: g,
                    H: c(h),
                    k: h,
                    I: c(h % 12 || 12),
                    l: h % 12 || 12,
                    M: c(this.get("Minutes", a)),
                    p: h < 12 ? "AM" : "PM",
                    P: h < 12 ? "am" : "pm",
                    S: c(this.get("Seconds", a)),
                    L: c(Math.floor(i % 1e3), 3)
                }, t.dateFormats), function (t, o) {
                    for (; -1 !== e.indexOf("%" + o);) e = e.replace("%" + o, "function" == typeof t ? t.call(n, i) : t)
                }), r ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
            }, e.prototype.resolveDTLFormat = function (t) {
                return a(t, !0) ? t : {main: (t = d(t))[0], from: t[1], to: t[2]}
            }, e.prototype.getTimeTicks = function (t, e, i, r) {
                var n, a, h, l, c = this, d = c.Date, f = [], g = {}, m = new d(e), y = t.unitRange, v = t.count || 1;
                if (r = p(r, 1), o(e)) {
                    c.set("Milliseconds", m, y >= u.second ? 0 : v * Math.floor(c.get("Milliseconds", m) / v)), y >= u.second && c.set("Seconds", m, y >= u.minute ? 0 : v * Math.floor(c.get("Seconds", m) / v)), y >= u.minute && c.set("Minutes", m, y >= u.hour ? 0 : v * Math.floor(c.get("Minutes", m) / v)), y >= u.hour && c.set("Hours", m, y >= u.day ? 0 : v * Math.floor(c.get("Hours", m) / v)), y >= u.day && c.set("Date", m, y >= u.month ? 1 : Math.max(1, v * Math.floor(c.get("Date", m) / v))), y >= u.month && (c.set("Month", m, y >= u.year ? 0 : v * Math.floor(c.get("Month", m) / v)), a = c.get("FullYear", m)), y >= u.year && (a -= a % v, c.set("FullYear", m, a)), y === u.week && (l = c.get("Day", m), c.set("Date", m, c.get("Date", m) - l + r + (l < r ? -7 : 0))), a = c.get("FullYear", m);
                    var x = c.get("Month", m), b = c.get("Date", m), M = c.get("Hours", m);
                    e = m.getTime(), (c.variableTimezone || !c.useUTC) && o(i) && (h = i - e > 4 * u.month || c.getTimezoneOffset(e) !== c.getTimezoneOffset(i));
                    var C = m.getTime();
                    for (n = 1; C < i;) f.push(C), y === u.year ? C = c.makeTime(a + n * v, 0) : y === u.month ? C = c.makeTime(a, x + n * v) : h && (y === u.day || y === u.week) ? C = c.makeTime(a, x, b + n * v * (y === u.day ? 1 : 7)) : h && y === u.hour && v > 1 ? C = c.makeTime(a, x, b, M + n * v) : C += y * v, n++;
                    f.push(C), y <= u.hour && f.length < 1e4 && f.forEach(function (t) {
                        t % 18e5 == 0 && "000000000" === c.dateFormat("%H%M%S%L", t) && (g[t] = "day")
                    })
                }
                return f.info = s(t, {higherRanks: g, totalRange: y * v}), f
            }, e.prototype.getDateFormat = function (t, e, i, o) {
                var r = this.dateFormat("%m-%d %H:%M:%S.%L", e), s = "01-01 00:00:00.000",
                    n = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, a = "millisecond", h = a;
                for (a in u) {
                    if (t === u.week && +this.dateFormat("%w", e) === i && r.substr(6) === s.substr(6)) {
                        a = "week";
                        break
                    }
                    if (u[a] > t) {
                        a = h;
                        break
                    }
                    if (n[a] && r.substr(n[a]) !== s.substr(n[a])) break;
                    "week" !== a && (h = a)
                }
                return this.resolveDTLFormat(o[a]).main
            }, e
        }()
    }), i(e, "Core/Defaults.js", [e["Core/Chart/ChartDefaults.js"], e["Core/Globals.js"], e["Core/Color/Palettes.js"], e["Core/Time.js"], e["Core/Utilities.js"]], function (t, e, i, o, r) {
        var s = e.isTouchDevice, n = e.svg, a = r.merge, h = {
            colors: i.colors,
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                decimalPoint: ".",
                numericSymbols: ["k", "M", "G", "T", "P", "E"],
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: {Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: !0},
            chart: t,
            title: {
                style: {color: "#333333", fontWeight: "bold"},
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {style: {color: "#666666", fontSize: "0.8em"}, text: "", align: "center", widthAdjust: -44},
            caption: {
                margin: 15,
                style: {color: "#666666", fontSize: "0.8em"},
                text: "",
                align: "left",
                verticalAlign: "bottom"
            },
            plotOptions: {},
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                className: "highcharts-no-tooltip",
                layout: "horizontal",
                itemMarginBottom: 2,
                itemMarginTop: 2,
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {style: {fontSize: "0.8em"}, activeColor: "#0022ff", inactiveColor: "#cccccc"},
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "0.8em",
                    textDecoration: "none",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {color: "#000000"},
                itemHiddenStyle: {color: "#666666", textDecoration: "line-through"},
                shadow: !1,
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {style: {fontSize: "0.8em", fontWeight: "bold"}}
            },
            loading: {
                labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
                style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
            },
            tooltip: {
                enabled: !0,
                animation: n,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %e %b, %H:%M:%S.%L",
                    second: "%A, %e %b, %H:%M:%S",
                    minute: "%A, %e %b, %H:%M",
                    hour: "%A, %e %b, %H:%M",
                    day: "%A, %e %b %Y",
                    week: "Week from %A, %e %b %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                headerShape: "callout",
                hideDelay: 500,
                padding: 8,
                shape: "callout",
                shared: !1,
                snap: s ? 25 : 10,
                headerFormat: '<span style="font-size: 0.8em">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: "#ffffff",
                borderWidth: void 0,
                shadow: !0,
                stickOnContact: !1,
                style: {color: "#333333", cursor: "default", fontSize: "0.8em"},
                useHTML: !1
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                style: {cursor: "pointer", color: "#999999", fontSize: "0.6em"},
                text: "Highcharts.com"
            }
        };
        h.chart.styledMode = !1;
        var l = new o(h.time);
        return {
            defaultOptions: h, defaultTime: l, getOptions: function () {
                return h
            }, setOptions: function (t) {
                return a(!0, h, t), (t.time || t.global) && (e.time ? e.time.update(a(h.global, h.time, t.global, t.time)) : e.time = l), h
            }
        }
    }), i(e, "Core/Color/Color.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i = e.isNumber, o = e.merge, r = e.pInt;
        return function () {
            function e(i) {
                this.rgba = [NaN, NaN, NaN, NaN], this.input = i;
                var o, r, s, n, a = t.Color;
                if (a && a !== e) return new a(i);
                if ("object" == typeof i && void 0 !== i.stops) this.stops = i.stops.map(function (t) {
                    return new e(t[1])
                }); else if ("string" == typeof i) {
                    if (this.input = i = e.names[i.toLowerCase()] || i, "#" === i.charAt(0)) {
                        var h = i.length, l = parseInt(i.substr(1), 16);
                        7 === h ? r = [(16711680 & l) >> 16, (65280 & l) >> 8, 255 & l, 1] : 4 === h && (r = [(3840 & l) >> 4 | (3840 & l) >> 8, (240 & l) >> 4 | 240 & l, (15 & l) << 4 | 15 & l, 1])
                    }
                    if (!r) for (s = e.parsers.length; s-- && !r;) (o = (n = e.parsers[s]).regex.exec(i)) && (r = n.parse(o))
                }
                r && (this.rgba = r)
            }

            return e.parse = function (t) {
                return t ? new e(t) : e.None
            }, e.prototype.get = function (t) {
                var e = this.input, r = this.rgba;
                if ("object" == typeof e && void 0 !== this.stops) {
                    var s = o(e);
                    return s.stops = [].slice.call(s.stops), this.stops.forEach(function (e, i) {
                        s.stops[i] = [s.stops[i][0], e.get(t)]
                    }), s
                }
                return r && i(r[0]) ? "rgb" !== t && (t || 1 !== r[3]) ? "a" === t ? "".concat(r[3]) : "rgba(" + r.join(",") + ")" : "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : e
            }, e.prototype.brighten = function (t) {
                var e = this.rgba;
                if (this.stops) this.stops.forEach(function (e) {
                    e.brighten(t)
                }); else if (i(t) && 0 !== t) for (var o = 0; o < 3; o++) e[o] += r(255 * t), e[o] < 0 && (e[o] = 0), e[o] > 255 && (e[o] = 255);
                return this
            }, e.prototype.setOpacity = function (t) {
                return this.rgba[3] = t, this
            }, e.prototype.tweenTo = function (t, e) {
                var o = this.rgba, r = t.rgba;
                if (!i(o[0]) || !i(r[0])) return t.input || "none";
                var s = 1 !== r[3] || 1 !== o[3];
                return (s ? "rgba(" : "rgb(") + Math.round(r[0] + (o[0] - r[0]) * (1 - e)) + "," + Math.round(r[1] + (o[1] - r[1]) * (1 - e)) + "," + Math.round(r[2] + (o[2] - r[2]) * (1 - e)) + (s ? "," + (r[3] + (o[3] - r[3]) * (1 - e)) : "") + ")"
            }, e.names = {
                white: "#ffffff",
                black: "#000000"
            }, e.parsers = [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (t) {
                    return [r(t[1]), r(t[2]), r(t[3]), parseFloat(t[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (t) {
                    return [r(t[1]), r(t[2]), r(t[3]), 1]
                }
            }], e.None = new e(""), e
        }()
    }), i(e, "Core/Animation/Fx.js", [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o = t.parse, r = e.win, s = i.isNumber, n = i.objectEach;
        return function () {
            function t(t, e, i) {
                this.pos = NaN, this.options = e, this.elem = t, this.prop = i
            }

            return t.prototype.dSetter = function () {
                var t = this.paths, e = t && t[0], i = t && t[1], o = this.now || 0, r = [];
                if (1 !== o && e && i) {
                    if (e.length === i.length && o < 1) for (var n = 0; n < i.length; n++) {
                        for (var a = e[n], h = i[n], l = [], c = 0; c < h.length; c++) {
                            var p = a[c], d = h[c];
                            s(p) && s(d) && !("A" === h[0] && (4 === c || 5 === c)) ? l[c] = p + o * (d - p) : l[c] = d
                        }
                        r.push(l)
                    } else r = i
                } else r = this.toD || [];
                this.elem.attr("d", r, void 0, !0)
            }, t.prototype.update = function () {
                var t = this.elem, e = this.prop, i = this.now, o = this.options.step;
                this[e + "Setter"] ? this[e + "Setter"]() : t.attr ? t.element && t.attr(e, i, null, !0) : t.style[e] = i + this.unit, o && o.call(t, i, this)
            }, t.prototype.run = function (e, i, o) {
                var s = this, n = s.options, a = function (t) {
                    return !a.stopped && s.step(t)
                }, h = r.requestAnimationFrame || function (t) {
                    setTimeout(t, 13)
                }, l = function () {
                    for (var e = 0; e < t.timers.length; e++) t.timers[e]() || t.timers.splice(e--, 1);
                    t.timers.length && h(l)
                };
                e !== i || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = e, this.end = i, this.unit = o, this.now = this.start, this.pos = 0, a.elem = this.elem, a.prop = this.prop, a() && 1 === t.timers.push(a) && h(l)) : (delete n.curAnim[this.prop], n.complete && 0 === Object.keys(n.curAnim).length && n.complete.call(this.elem))
            }, t.prototype.step = function (t) {
                var e, i, o = +new Date, r = this.options, s = this.elem, a = r.complete, h = r.duration, l = r.curAnim;
                return s.attr && !s.element ? e = !1 : t || o >= h + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), l[this.prop] = !0, i = !0, n(l, function (t) {
                    !0 !== t && (i = !1)
                }), i && a && a.call(s), e = !1) : (this.pos = r.easing((o - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos, this.update(), e = !0), e
            }, t.prototype.initPath = function (t, e, i) {
                var o, r, n, a, h = t.startX, l = t.endX, c = i.slice(), p = t.isArea, d = p ? 2 : 1,
                    u = e && e.slice();
                if (!u) return [c, c];

                function f(t, e) {
                    for (; t.length < r;) {
                        var i = t[0], o = e[r - t.length];
                        if (o && "M" === i[0] && ("C" === o[0] ? t[0] = ["C", i[1], i[2], i[1], i[2], i[1], i[2]] : t[0] = ["L", i[1], i[2]]), t.unshift(i), p) {
                            var s = t.pop();
                            t.push(t[t.length - 1], s)
                        }
                    }
                }

                function g(t, e) {
                    for (; t.length < r;) {
                        var i = t[Math.floor(t.length / d) - 1].slice();
                        if ("C" === i[0] && (i[1] = i[5], i[2] = i[6]), p) {
                            var o = t[Math.floor(t.length / d)].slice();
                            t.splice(t.length / 2, 0, i, o)
                        } else t.push(i)
                    }
                }

                if (h && l && l.length) {
                    for (n = 0; n < h.length; n++) {
                        if (h[n] === l[0]) {
                            o = n;
                            break
                        }
                        if (h[0] === l[l.length - h.length + n]) {
                            o = n, a = !0;
                            break
                        }
                        if (h[h.length - 1] === l[l.length - h.length + n]) {
                            o = h.length - n;
                            break
                        }
                    }
                    void 0 === o && (u = [])
                }
                return u.length && s(o) && (r = c.length + o * d, a ? (f(u, c), g(c, u)) : (f(c, u), g(u, c))), [u, c]
            }, t.prototype.fillSetter = function () {
                t.prototype.strokeSetter.apply(this, arguments)
            }, t.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, o(this.start).tweenTo(o(this.end), this.pos), void 0, !0)
            }, t.timers = [], t
        }()
    }), i(e, "Core/Animation/AnimationUtilities.js", [e["Core/Animation/Fx.js"], e["Core/Utilities.js"]], function (t, e) {
        var i = e.defined, o = e.getStyle, r = e.isArray, s = e.isNumber, n = e.isObject, a = e.merge, h = e.objectEach,
            l = e.pick;

        function c(t) {
            return n(t) ? a({duration: 500, defer: 0}, t) : {duration: t ? 500 : 0, defer: 0}
        }

        function p(e, i) {
            for (var o = t.timers.length; o--;) t.timers[o].elem !== e || i && i !== t.timers[o].prop || (t.timers[o].stopped = !0)
        }

        return {
            animate: function (e, i, l) {
                var c, d, u, f, g = "";
                n(l) || (f = arguments, l = {
                    duration: f[2],
                    easing: f[3],
                    complete: f[4]
                }), s(l.duration) || (l.duration = 400), l.easing = "function" == typeof l.easing ? l.easing : Math[l.easing] || Math.easeInOutSine, l.curAnim = a(i), h(i, function (s, n) {
                    p(e, n), u = new t(e, l, n), d = void 0, "d" === n && r(i.d) ? (u.paths = u.initPath(e, e.pathArray, i.d), u.toD = i.d, c = 0, d = 1) : e.attr ? c = e.attr(n) : (c = parseFloat(o(e, n)) || 0, "opacity" !== n && (g = "px")), d || (d = s), "string" == typeof d && d.match("px") && (d = d.replace(/px/g, "")), u.run(c, d, g)
                })
            }, animObject: c, getDeferredAnimation: function (t, e, o) {
                var r = c(e), s = o ? [o] : t.series, a = 0, h = 0;
                return s.forEach(function (t) {
                    var o = c(t.options.animation);
                    a = n(e) && i(e.defer) ? r.defer : Math.max(a, o.duration + o.defer), h = Math.min(r.duration, o.duration)
                }), t.renderer.forExport && (a = 0), {defer: Math.max(0, a - h), duration: Math.min(a, h)}
            }, setAnimation: function (t, e) {
                e.renderer.globalAnimation = l(t, e.options.chart.animation, !0)
            }, stop: p
        }
    }), i(e, "Core/Renderer/HTML/AST.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i = t.SVG_NS, o = t.win, r = e.attr, s = e.createElement, n = e.css, a = e.error, h = e.isFunction,
            l = e.isString, c = e.objectEach, p = e.splat, d = o.trustedTypes,
            u = d && h(d.createPolicy) && d.createPolicy("highcharts", {
                createHTML: function (t) {
                    return t
                }
            }), f = u ? u.createHTML("") : "", g = function () {
                try {
                    return !!new DOMParser().parseFromString(f, "text/html")
                } catch (t) {
                    return !1
                }
            }();
        return function () {
            function e(t) {
                this.nodes = "string" == typeof t ? this.parseMarkup(t) : t
            }

            return e.filterUserAttributes = function (t) {
                return c(t, function (i, o) {
                    var r = !0;
                    -1 === e.allowedAttributes.indexOf(o) && (r = !1), -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(o) && (r = l(i) && e.allowedReferences.some(function (t) {
                        return 0 === i.indexOf(t)
                    })), r || (a(33, !1, void 0, {"Invalid attribute in config": "".concat(o)}), delete t[o]), l(i) && t[o] && (t[o] = i.replace(/</g, "&lt;"))
                }), t
            }, e.parseStyle = function (t) {
                return t.split(";").reduce(function (t, e) {
                    var i = e.split(":").map(function (t) {
                        return t.trim()
                    }), o = i.shift();
                    return o && i.length && (t[o.replace(/-([a-z])/g, function (t) {
                        return t[1].toUpperCase()
                    })] = i.join(":")), t
                }, {})
            }, e.setElementHTML = function (t, i) {
                t.innerHTML = e.emptyHTML, i && new e(i).addToDOM(t)
            }, e.prototype.addToDOM = function (o) {
                return function o(s, h) {
                    var l;
                    return p(s).forEach(function (s) {
                        var p, d = s.tagName, u = s.textContent ? t.doc.createTextNode(s.textContent) : void 0,
                            f = e.bypassHTMLFiltering;
                        if (d) {
                            if ("#text" === d) p = u; else if (-1 !== e.allowedTags.indexOf(d) || f) {
                                var g = "svg" === d ? i : h.namespaceURI || i, m = t.doc.createElementNS(g, d),
                                    y = s.attributes || {};
                                c(s, function (t, e) {
                                    "tagName" !== e && "attributes" !== e && "children" !== e && "style" !== e && "textContent" !== e && (y[e] = t)
                                }), r(m, f ? y : e.filterUserAttributes(y)), s.style && n(m, s.style), u && m.appendChild(u), o(s.children || [], m), p = m
                            } else a(33, !1, void 0, {"Invalid tagName in config": d})
                        }
                        p && h.appendChild(p), l = p
                    }), l
                }(this.nodes, o)
            }, e.prototype.parseMarkup = function (t) {
                var i, o = [];
                if (t = t.trim().replace(/ style=(["'])/g, " data-style=$1"), g) i = new DOMParser().parseFromString(u ? u.createHTML(t) : t, "text/html"); else {
                    var r = s("div");
                    r.innerHTML = t, i = {body: r}
                }
                var n = function (t, i) {
                    var o = t.nodeName.toLowerCase(), r = {tagName: o};
                    "#text" === o && (r.textContent = t.textContent || "");
                    var s = t.attributes;
                    if (s) {
                        var a = {};
                        [].forEach.call(s, function (t) {
                            "data-style" === t.name ? r.style = e.parseStyle(t.value) : a[t.name] = t.value
                        }), r.attributes = a
                    }
                    if (t.childNodes.length) {
                        var h = [];
                        [].forEach.call(t.childNodes, function (t) {
                            n(t, h)
                        }), h.length && (r.children = h)
                    }
                    i.push(r)
                };
                return [].forEach.call(i.body.childNodes, function (t) {
                    return n(t, o)
                }), o
            }, e.allowedAttributes = ["alt", "aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup", "aria-hidden", "aria-label", "aria-labelledby", "aria-live", "aria-pressed", "aria-readonly", "aria-roledescription", "aria-selected", "class", "clip-path", "color", "colspan", "cx", "cy", "d", "dx", "dy", "disabled", "fill", "filterUnits", "flood-color", "flood-opacity", "height", "href", "id", "in", "markerHeight", "markerWidth", "offset", "opacity", "orient", "padding", "paddingLeft", "paddingRight", "patternUnits", "r", "refX", "refY", "role", "scope", "slope", "src", "startOffset", "stdDeviation", "stroke", "stroke-linecap", "stroke-width", "style", "tableValues", "result", "rowspan", "summary", "target", "tabindex", "text-align", "text-anchor", "textAnchor", "textLength", "title", "type", "valign", "width", "x", "x1", "x2", "xlink:href", "y", "y1", "y2", "zIndex"], e.allowedReferences = ["https://", "http://", "mailto:", "/", "../", "./", "#"], e.allowedTags = ["a", "abbr", "b", "br", "button", "caption", "circle", "clipPath", "code", "dd", "defs", "div", "dl", "dt", "em", "feComponentTransfer", "feDropShadow", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feOffset", "feMerge", "feMergeNode", "filter", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "linearGradient", "marker", "ol", "p", "path", "pattern", "pre", "rect", "small", "span", "stop", "strong", "style", "sub", "sup", "svg", "table", "text", "textPath", "thead", "title", "tbody", "tspan", "td", "th", "tr", "u", "ul", "#text"], e.emptyHTML = f, e.bypassHTMLFiltering = !1, e
        }()
    }), i(e, "Core/Templating.js", [e["Core/Defaults.js"], e["Core/Utilities.js"]], function (t, e) {
        var i = t.defaultOptions, o = t.defaultTime, r = e.extend, s = e.getNestedProperty, n = e.isArray,
            a = e.isNumber, h = e.isObject, l = (e.isString, e.pick), c = e.pInt, p = {
                add: function (t, e) {
                    return t + e
                }, divide: function (t, e) {
                    return 0 !== e ? t / e : ""
                }, eq: function (t, e) {
                    return t == e
                }, each: function (t) {
                    var e = arguments[arguments.length - 1];
                    return !!n(t) && t.map(function (i, o) {
                        return d(e.body, r(h(i) ? i : {"@this": i}, {
                            "@index": o,
                            "@first": 0 === o,
                            "@last": o === t.length - 1
                        }))
                    }).join("")
                }, ge: function (t, e) {
                    return t >= e
                }, gt: function (t, e) {
                    return t > e
                }, if: function (t) {
                    return !!t
                }, le: function (t, e) {
                    return t <= e
                }, lt: function (t, e) {
                    return t < e
                }, multiply: function (t, e) {
                    return t * e
                }, ne: function (t, e) {
                    return t != e
                }, subtract: function (t, e) {
                    return t - e
                }, unless: function (t) {
                    return !t
                }
            };

        function d(t, e, r) {
            void 0 === t && (t = "");
            for (var n, a, h, c = /\{([a-zA-Z0-9\:\.\,;\-\/<>%_@"'= #\(\)]+)\}/g, f = /\(([a-zA-Z0-9\:\.\,;\-\/<>%_@"'= ]+)\)/g, g = [], m = /f$/, y = /\.([0-9])/, v = i.lang, x = r && r.time || o, b = r && r.numberFormatter || u, M = function (t) {
                var i;
                return void 0 === t && (t = ""), "true" === t || "false" !== t && ((i = Number(t)).toString() === t ? i : s(t, e))
            }, C = 0; null !== (n = c.exec(t));) {
                var S = f.exec(n[1]);
                S && (n = S, h = !0), a && a.isBlock || (a = {
                    ctx: e,
                    expression: n[1],
                    find: n[0],
                    isBlock: "#" === n[1].charAt(0),
                    start: n.index,
                    startInner: n.index + n[0].length,
                    length: n[0].length
                });
                var w = n[1].split(" ")[0].replace("#", "");
                p[w] && (a.isBlock && w === a.fn && C++, a.fn || (a.fn = w));
                var k = "else" === n[1];
                if (a.isBlock && a.fn && (n[1] === "/".concat(a.fn) || k)) {
                    if (C) !k && C--; else {
                        var A = a.startInner, T = t.substr(A, n.index - A);
                        void 0 === a.body ? (a.body = T, a.startInner = n.index + n[0].length) : a.elseBody = T, a.find += T + n[0], k || (g.push(a), a = void 0)
                    }
                } else a.isBlock || g.push(a);
                if (S && !(null == a ? void 0 : a.isBlock)) break
            }
            return g.forEach(function (i) {
                var o, r, s = i.body, n = i.elseBody, a = i.expression, h = i.fn;
                if (h) {
                    var c = [i], u = a.split(" ");
                    for (r = p[h].length; r--;) c.unshift(M(u[r + 1]));
                    o = p[h].apply(e, c), i.isBlock && "boolean" == typeof o && (o = d(o ? s : n, e))
                } else {
                    var f = a.split(":");
                    if (o = M(f.shift() || ""), f.length && "number" == typeof o) {
                        var g = f.join(":");
                        if (m.test(g)) {
                            var C = parseInt((g.match(y) || ["", "-1"])[1], 10);
                            null !== o && (o = b(o, C, v.decimalPoint, g.indexOf(",") > -1 ? v.thousandsSep : ""))
                        } else o = x.dateFormat(g, o)
                    }
                }
                t = t.replace(i.find, l(o, ""))
            }), h ? d(t, e, r) : t
        }

        function u(t, e, o, r) {
            t = +t || 0, e = +e;
            var s, n, h = i.lang, p = (t.toString().split(".")[1] || "").split("e")[0].length,
                d = t.toString().split("e"), u = e;
            -1 === e ? e = Math.min(p, 20) : a(e) ? e && d[1] && d[1] < 0 && ((n = e + +d[1]) >= 0 ? (d[0] = (+d[0]).toExponential(n).split("e")[0], e = n) : (d[0] = d[0].split(".")[0] || 0, t = e < 20 ? (d[0] * Math.pow(10, d[1])).toFixed(e) : 0, d[1] = 0)) : e = 2;
            var f = (Math.abs(d[1] ? d[0] : t) + Math.pow(10, -Math.max(e, p) - 1)).toFixed(e), g = String(c(f)),
                m = g.length > 3 ? g.length % 3 : 0;
            return o = l(o, h.decimalPoint), r = l(r, h.thousandsSep), s = (t < 0 ? "-" : "") + (m ? g.substr(0, m) + r : ""), 0 > +d[1] && !u ? s = "0" : s += g.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + r), e && (s += o + f.slice(-e)), d[1] && 0 != +s && (s += "e" + d[1]), s
        }

        return {
            dateFormat: function (t, e, i) {
                return o.dateFormat(t, e, i)
            }, format: d, helpers: p, numberFormat: u
        }
    }), i(e, "Core/Renderer/RendererUtilities.js", [e["Core/Utilities.js"]], function (t) {
        var e, i = t.clamp, o = t.pick, r = t.pushUnique, s = t.stableSort;
        return (e || (e = {})).distribute = function t(e, n, a) {
            var h, l, c, p, d, u, f = e, g = f.reducedLen || n, m = function (t, e) {
                return t.target - e.target
            }, y = [], v = e.length, x = [], b = y.push, M = !0, C = 0;
            for (h = v; h--;) C += e[h].size;
            if (C > g) {
                for (s(e, function (t, e) {
                    return (e.rank || 0) - (t.rank || 0)
                }), c = (u = e[0].rank === e[e.length - 1].rank) ? v / 2 : -1, l = u ? c : v - 1; c && C > g;) p = e[h = Math.floor(l)], r(x, h) && (C -= p.size), l += c, u && l >= e.length && (c /= 2, l = c);
                x.sort(function (t, e) {
                    return e - t
                }).forEach(function (t) {
                    return b.apply(y, e.splice(t, 1))
                })
            }
            for (s(e, m), e = e.map(function (t) {
                return {size: t.size, targets: [t.target], align: o(t.align, .5)}
            }); M;) {
                for (h = e.length; h--;) p = e[h], d = (Math.min.apply(0, p.targets) + Math.max.apply(0, p.targets)) / 2, p.pos = i(d - p.size * p.align, 0, n - p.size);
                for (h = e.length, M = !1; h--;) h > 0 && e[h - 1].pos + e[h - 1].size > e[h].pos && (e[h - 1].size += e[h].size, e[h - 1].targets = e[h - 1].targets.concat(e[h].targets), e[h - 1].align = .5, e[h - 1].pos + e[h - 1].size > n && (e[h - 1].pos = n - e[h - 1].size), e.splice(h, 1), M = !0)
            }
            return b.apply(f, y), h = 0, e.some(function (e) {
                var i = 0;
                return (e.targets || []).some(function () {
                    return (f[h].pos = e.pos + i, void 0 !== a && Math.abs(f[h].pos - f[h].target) > a) ? (f.slice(0, h + 1).forEach(function (t) {
                        return delete t.pos
                    }), f.reducedLen = (f.reducedLen || n) - .1 * n, f.reducedLen > .1 * n && t(f, n, a), !0) : (i += f[h].size, h++, !1)
                })
            }), s(f, m), f
        }, e
    }), i(e, "Core/Renderer/SVG/SVGElement.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r = t.animate, s = t.animObject, n = t.stop, a = i.deg2rad, h = i.doc, l = (i.noop, i.svg), c = i.SVG_NS,
            p = i.win, d = o.addEvent, u = o.attr, f = o.createElement, g = o.css, m = o.defined, y = o.erase,
            v = o.extend, x = o.fireEvent, b = o.isArray, M = o.isFunction, C = o.isObject, S = o.isString, w = o.merge,
            k = o.objectEach, A = o.pick, T = o.pInt, P = o.syncTimeout, L = o.uniqueKey, j = function () {
                function t(t, e) {
                    this.onEvents = {}, this.opacity = 1, this.SVG_NS = c, this.element = "span" === e ? f(e) : h.createElementNS(this.SVG_NS, e), this.renderer = t, x(this, "afterInit")
                }

                return t.prototype._defaultGetter = function (t) {
                    var e = A(this[t + "Value"], this[t], this.element ? this.element.getAttribute(t) : null, 0);
                    return /^[\-0-9\.]+$/.test(e) && (e = parseFloat(e)), e
                }, t.prototype._defaultSetter = function (t, e, i) {
                    i.setAttribute(e, t)
                }, t.prototype.add = function (t) {
                    var e, i = this.renderer, o = this.element;
                    return t && (this.parentGroup = t), void 0 !== this.textStr && "text" === this.element.nodeName && i.buildText(this), this.added = !0, (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()), e || (t ? t.element : i.box).appendChild(o), this.onAdd && this.onAdd(), this
                }, t.prototype.addClass = function (t, e) {
                    var i = e ? "" : this.attr("class") || "";
                    return (t = (t || "").split(/ /g).reduce(function (t, e) {
                        return -1 === i.indexOf(e) && t.push(e), t
                    }, i ? [i] : []).join(" ")) !== i && this.attr("class", t), this
                }, t.prototype.afterSetters = function () {
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }, t.prototype.align = function (t, e, i) {
                    var o, r, s, n, a, h = {}, l = this.renderer, c = l.alignedObjects;
                    t ? (this.alignOptions = t, this.alignByTranslate = e, (!i || S(i)) && (this.alignTo = s = i || "renderer", y(c, this), c.push(this), i = void 0)) : (t = this.alignOptions, e = this.alignByTranslate, s = this.alignTo), i = A(i, l[s], "scrollablePlotBox" === s ? l.plotBox : void 0, l);
                    var p = t.align, d = t.verticalAlign;
                    return o = (i.x || 0) + (t.x || 0), r = (i.y || 0) + (t.y || 0), "right" === p ? n = 1 : "center" === p && (n = 2), n && (o += (i.width - (t.width || 0)) / n), h[e ? "translateX" : "x"] = Math.round(o), "bottom" === d ? a = 1 : "middle" === d && (a = 2), a && (r += (i.height - (t.height || 0)) / a), h[e ? "translateY" : "y"] = Math.round(r), this[this.placed ? "animate" : "attr"](h), this.placed = !0, this.alignAttr = h, this
                }, t.prototype.alignSetter = function (t) {
                    var e = {left: "start", center: "middle", right: "end"};
                    e[t] && (this.alignValue = t, this.element.setAttribute("text-anchor", e[t]))
                }, t.prototype.animate = function (t, e, i) {
                    var o = this, n = s(A(e, this.renderer.globalAnimation, !0)), a = n.defer;
                    return h.hidden && (n.duration = 0), 0 !== n.duration ? (i && (n.complete = i), P(function () {
                        o.element && r(o, t, n)
                    }, a)) : (this.attr(t, void 0, i || n.complete), k(t, function (t, e) {
                        n.step && n.step.call(this, t, {prop: e, pos: 1, elem: this})
                    }, this)), this
                }, t.prototype.applyTextOutline = function (t) {
                    var e = this.element;
                    -1 !== t.indexOf("contrast") && (t = t.replace(/contrast/g, this.renderer.getContrast(e.style.fill)));
                    var o = t.split(" "), r = o[o.length - 1], s = o[0];
                    if (s && "none" !== s && i.svg) {
                        this.fakeTS = !0, s = s.replace(/(^[\d\.]+)(.*?)$/g, function (t, e, i) {
                            return 2 * Number(e) + i
                        }), this.removeTextOutline();
                        var n = h.createElementNS(c, "tspan");
                        u(n, {
                            class: "highcharts-text-outline",
                            fill: r,
                            stroke: r,
                            "stroke-width": s,
                            "stroke-linejoin": "round"
                        });
                        var a = e.querySelector("textPath") || e;
                        [].forEach.call(a.childNodes, function (t) {
                            var e = t.cloneNode(!0);
                            e.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(function (t) {
                                return e.removeAttribute(t)
                            }), n.appendChild(e)
                        });
                        var l = 0;
                        [].forEach.call(a.querySelectorAll("text tspan"), function (t) {
                            l += Number(t.getAttribute("dy"))
                        });
                        var p = h.createElementNS(c, "tspan");
                        p.textContent = "​", u(p, {
                            x: Number(e.getAttribute("x")),
                            dy: -l
                        }), n.appendChild(p), a.insertBefore(n, a.firstChild)
                    }
                }, t.prototype.attr = function (e, i, o, r) {
                    var s, a, h, l = this.element, c = t.symbolCustomAttribs, p = this;
                    return "string" == typeof e && void 0 !== i && (s = e, (e = {})[s] = i), "string" == typeof e ? p = (this[e + "Getter"] || this._defaultGetter).call(this, e, l) : (k(e, function (t, i) {
                        h = !1, r || n(this, i), this.symbolName && -1 !== c.indexOf(i) && (a || (this.symbolAttr(e), a = !0), h = !0), this.rotation && ("x" === i || "y" === i) && (this.doTransform = !0), h || (this[i + "Setter"] || this._defaultSetter).call(this, t, i, l)
                    }, this), this.afterSetters()), o && o.call(this), p
                }, t.prototype.clip = function (t) {
                    if (t && !t.clipPath) {
                        var e = L() + "-",
                            i = this.renderer.createElement("clipPath").attr({id: e}).add(this.renderer.defs);
                        v(t, {clipPath: i, id: e, count: 0}), t.add(i)
                    }
                    return this.attr("clip-path", t ? "url(".concat(this.renderer.url, "#").concat(t.id, ")") : "none")
                }, t.prototype.crisp = function (t, e) {
                    var i = Math.round(e = e || t.strokeWidth || 0) % 2 / 2;
                    return t.x = Math.floor(t.x || this.x || 0) + i, t.y = Math.floor(t.y || this.y || 0) + i, t.width = Math.floor((t.width || this.width || 0) - 2 * i), t.height = Math.floor((t.height || this.height || 0) - 2 * i), m(t.strokeWidth) && (t.strokeWidth = e), t
                }, t.prototype.complexColor = function (t, i, o) {
                    var r, s, n, a, h, l, c, p, d, u, f, g = this.renderer, y = [];
                    x(this.renderer, "complexColor", {args: arguments}, function () {
                        if (t.radialGradient ? s = "radialGradient" : t.linearGradient && (s = "linearGradient"), s) {
                            if (n = t[s], h = g.gradients, l = t.stops, d = o.radialReference, b(n) && (t[s] = n = {
                                x1: n[0],
                                y1: n[1],
                                x2: n[2],
                                y2: n[3],
                                gradientUnits: "userSpaceOnUse"
                            }), "radialGradient" === s && d && !m(n.gradientUnits) && (a = n, n = w(n, g.getRadialAttr(d, a), {gradientUnits: "userSpaceOnUse"})), k(n, function (t, e) {
                                "id" !== e && y.push(e, t)
                            }), k(l, function (t) {
                                y.push(t)
                            }), h[y = y.join(",")]) u = h[y].attr("id"); else {
                                n.id = u = L();
                                var v = h[y] = g.createElement(s).attr(n).add(g.defs);
                                v.radAttr = a, v.stops = [], l.forEach(function (t) {
                                    0 === t[1].indexOf("rgba") ? (c = (r = e.parse(t[1])).get("rgb"), p = r.get("a")) : (c = t[1], p = 1);
                                    var i = g.createElement("stop").attr({
                                        offset: t[0],
                                        "stop-color": c,
                                        "stop-opacity": p
                                    }).add(v);
                                    v.stops.push(i)
                                })
                            }
                            f = "url(" + g.url + "#" + u + ")", o.setAttribute(i, f), o.gradient = y, t.toString = function () {
                                return f
                            }
                        }
                    })
                }, t.prototype.css = function (t) {
                    var e, i = this.styles, o = {}, r = this.element, s = !i;
                    if (i && k(t, function (t, e) {
                        i && i[e] !== t && (o[e] = t, s = !0)
                    }), s) {
                        i && (t = v(i, o)), null === t.width || "auto" === t.width ? delete this.textWidth : "text" === r.nodeName.toLowerCase() && t.width && (e = this.textWidth = T(t.width)), this.styles = t, e && !l && this.renderer.forExport && delete t.width;
                        var n = w(t);
                        r.namespaceURI === this.SVG_NS && (["textOutline", "textOverflow", "width"].forEach(function (t) {
                            return n && delete n[t]
                        }), n.color && (n.fill = n.color)), g(r, n)
                    }
                    return this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), t.textOutline && this.applyTextOutline(t.textOutline)), this
                }, t.prototype.dashstyleSetter = function (t) {
                    var e, i = this["stroke-width"];
                    if ("inherit" === i && (i = 1), t = t && t.toLowerCase()) {
                        var o = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                        for (e = o.length; e--;) o[e] = "" + T(o[e]) * A(i, NaN);
                        t = o.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", t)
                    }
                }, t.prototype.destroy = function () {
                    var t, e, i, o = this, r = o.element || {}, s = o.renderer, a = r.ownerSVGElement,
                        h = "SPAN" === r.nodeName && o.parentGroup || void 0;
                    if (r.onclick = r.onmouseout = r.onmouseover = r.onmousemove = r.point = null, n(o), o.clipPath && a) {
                        var l = o.clipPath;
                        [].forEach.call(a.querySelectorAll("[clip-path],[CLIP-PATH]"), function (t) {
                            t.getAttribute("clip-path").indexOf(l.element.id) > -1 && t.removeAttribute("clip-path")
                        }), o.clipPath = l.destroy()
                    }
                    if (o.connector = null === (t = o.connector) || void 0 === t ? void 0 : t.destroy(), o.stops) {
                        for (i = 0; i < o.stops.length; i++) o.stops[i].destroy();
                        o.stops.length = 0, o.stops = void 0
                    }
                    for (o.safeRemoveChild(r); h && h.div && 0 === h.div.childNodes.length;) e = h.parentGroup, o.safeRemoveChild(h.div), delete h.div, h = e;
                    o.alignTo && y(s.alignedObjects, o), k(o, function (t, e) {
                        o[e] && o[e].parentGroup === o && o[e].destroy && o[e].destroy(), delete o[e]
                    })
                }, t.prototype.dSetter = function (t, e, i) {
                    b(t) && ("string" == typeof t[0] && (t = this.renderer.pathToSegments(t)), this.pathArray = t, t = t.reduce(function (t, e, i) {
                        return e && e.join ? (i ? t + " " : "") + e.join(" ") : (e || "").toString()
                    }, "")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), this[e] !== t && (i.setAttribute(e, t), this[e] = t)
                }, t.prototype.fillSetter = function (t, e, i) {
                    "string" == typeof t ? i.setAttribute(e, t) : t && this.complexColor(t, e, i)
                }, t.prototype.hrefSetter = function (t, e, i) {
                    i.setAttributeNS("http://www.w3.org/1999/xlink", e, t)
                }, t.prototype.getBBox = function (e, i) {
                    var o, r, s, n, h, l = this.alignValue, c = this.element, p = this.renderer, d = this.styles,
                        u = this.textStr, f = p.cache, y = p.cacheKeys, x = c.namespaceURI === this.SVG_NS,
                        b = A(i, this.rotation, 0),
                        C = p.styledMode ? c && t.prototype.getStyle.call(c, "font-size") : d && d.fontSize;
                    if (m(u) && (-1 === (h = u.toString()).indexOf("<") && (h = h.replace(/[0-9]/g, "0")), h += ["", p.rootFontSize, C, b, this.textWidth, l, d && d.textOverflow, d && d.fontWeight].join(",")), h && !e && (o = f[h]), !o) {
                        if (x || p.forExport) {
                            try {
                                n = this.fakeTS && function (t) {
                                    var e = c.querySelector(".highcharts-text-outline");
                                    e && g(e, {display: t})
                                }, M(n) && n("none"), o = c.getBBox ? v({}, c.getBBox()) : {
                                    width: c.offsetWidth,
                                    height: c.offsetHeight,
                                    x: 0,
                                    y: 0
                                }, M(n) && n("")
                            } catch (t) {
                            }
                            (!o || o.width < 0) && (o = {x: 0, y: 0, width: 0, height: 0})
                        } else o = this.htmlGetBBox();
                        if (r = o.width, s = o.height, x && (o.height = s = ({
                            "11px,17": 14,
                            "13px,20": 16
                        })["".concat(C || "", ",").concat(Math.round(s))] || s), b) {
                            var S = Number(c.getAttribute("y") || 0) - o.y, w = {right: 1, center: .5}[l || 0] || 0,
                                k = b * a, T = (b - 90) * a, P = r * Math.cos(k), L = r * Math.sin(k), j = Math.cos(T),
                                O = Math.sin(T), E = o.x + w * (r - P), D = o.y + S - w * L, B = E + S * j, I = B + P,
                                z = I - s * j, R = z - P, N = D + S * O, _ = N + L, G = _ - s * O, W = G - L;
                            o.x = Math.min(B, I, z, R), o.y = Math.min(N, _, G, W), o.width = Math.max(B, I, z, R) - o.x, o.height = Math.max(N, _, G, W) - o.y
                        }
                    }
                    if (h && ("" === u || o.height > 0)) {
                        for (; y.length > 250;) delete f[y.shift()];
                        f[h] || y.push(h), f[h] = o
                    }
                    return o
                }, t.prototype.getStyle = function (t) {
                    return p.getComputedStyle(this.element || this, "").getPropertyValue(t)
                }, t.prototype.hasClass = function (t) {
                    return -1 !== ("" + this.attr("class")).split(" ").indexOf(t)
                }, t.prototype.hide = function () {
                    return this.attr({visibility: "hidden"})
                }, t.prototype.htmlGetBBox = function () {
                    return {height: 0, width: 0, x: 0, y: 0}
                }, t.prototype.on = function (t, e) {
                    var i = this.onEvents;
                    return i[t] && i[t](), i[t] = d(this.element, t, e), this
                }, t.prototype.opacitySetter = function (t, e, i) {
                    var o = Number(Number(t).toFixed(3));
                    this.opacity = o, i.setAttribute(e, o)
                }, t.prototype.removeClass = function (t) {
                    return this.attr("class", ("" + this.attr("class")).replace(S(t) ? new RegExp("(^| )".concat(t, "( |$)")) : t, " ").replace(/ +/g, " ").trim())
                }, t.prototype.removeTextOutline = function () {
                    var t = this.element.querySelector("tspan.highcharts-text-outline");
                    t && this.safeRemoveChild(t)
                }, t.prototype.safeRemoveChild = function (t) {
                    var e = t.parentNode;
                    e && e.removeChild(t)
                }, t.prototype.setRadialReference = function (t) {
                    var e = this.element.gradient && this.renderer.gradients[this.element.gradient];
                    return this.element.radialReference = t, e && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)), this
                }, t.prototype.setTextPath = function (t, e) {
                    var i = this;
                    e = w(!0, {enabled: !0, attributes: {dy: -5, startOffset: "50%", textAnchor: "middle"}}, e);
                    var o = this.renderer.url, r = this.text || this, s = r.textPath, n = e.attributes, a = e.enabled;
                    if (t = t || s && s.path, s && s.undo(), t && a) {
                        var h = d(r, "afterModifyTree", function (e) {
                            if (t && a) {
                                var s = t.attr("id");
                                s || t.attr("id", s = L());
                                var h = {x: 0, y: 0};
                                m(n.dx) && (h.dx = n.dx, delete n.dx), m(n.dy) && (h.dy = n.dy, delete n.dy), r.attr(h), i.attr({transform: ""}), i.box && (i.box = i.box.destroy());
                                var l = e.nodes.slice(0);
                                e.nodes.length = 0, e.nodes[0] = {
                                    tagName: "textPath",
                                    attributes: v(n, {"text-anchor": n.textAnchor, href: "".concat(o, "#").concat(s)}),
                                    children: l
                                }
                            }
                        });
                        r.textPath = {path: t, undo: h}
                    } else r.attr({dx: 0, dy: 0}), delete r.textPath;
                    return this.added && (r.textCache = "", this.renderer.buildText(r)), this
                }, t.prototype.shadow = function (t) {
                    var e, i = this.renderer,
                        o = w((null === (e = this.parentGroup) || void 0 === e ? void 0 : e.rotation) === 90 ? {
                            offsetX: -1,
                            offsetY: -1
                        } : {}, C(t) ? t : {}), r = i.shadowDefinition(o);
                    return this.attr({filter: t ? "url(".concat(i.url, "#").concat(r, ")") : "none"})
                }, t.prototype.show = function (t) {
                    return void 0 === t && (t = !0), this.attr({visibility: t ? "inherit" : "visible"})
                }, t.prototype["stroke-widthSetter"] = function (t, e, i) {
                    this[e] = t, i.setAttribute(e, t)
                }, t.prototype.strokeWidth = function () {
                    if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                    var t, e = this.getStyle("stroke-width"), i = 0;
                    return e.indexOf("px") === e.length - 2 ? i = T(e) : "" !== e && (u(t = h.createElementNS(c, "rect"), {
                        width: e,
                        "stroke-width": 0
                    }), this.element.parentNode.appendChild(t), i = t.getBBox().width, t.parentNode.removeChild(t)), i
                }, t.prototype.symbolAttr = function (e) {
                    var i = this;
                    t.symbolCustomAttribs.forEach(function (t) {
                        i[t] = A(e[t], i[t])
                    }), i.attr({d: i.renderer.symbols[i.symbolName](i.x, i.y, i.width, i.height, i)})
                }, t.prototype.textSetter = function (t) {
                    t !== this.textStr && (delete this.textPxLength, this.textStr = t, this.added && this.renderer.buildText(this))
                }, t.prototype.titleSetter = function (t) {
                    var e = this.element, i = e.getElementsByTagName("title")[0] || h.createElementNS(this.SVG_NS, "title");
                    e.insertBefore ? e.insertBefore(i, e.firstChild) : e.appendChild(i), i.textContent = String(A(t, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                }, t.prototype.toFront = function () {
                    var t = this.element;
                    return t.parentNode.appendChild(t), this
                }, t.prototype.translate = function (t, e) {
                    return this.attr({translateX: t, translateY: e})
                }, t.prototype.updateTransform = function (t) {
                    void 0 === t && (t = "transform");
                    var e = this.element, i = this.matrix, o = this.rotation, r = void 0 === o ? 0 : o, s = this.scaleX,
                        n = this.scaleY, a = this.translateX, h = this.translateY,
                        l = ["translate(" + (void 0 === a ? 0 : a) + "," + (void 0 === h ? 0 : h) + ")"];
                    m(i) && l.push("matrix(" + i.join(",") + ")"), r && l.push("rotate(" + r + " " + A(this.rotationOriginX, e.getAttribute("x"), 0) + " " + A(this.rotationOriginY, e.getAttribute("y") || 0) + ")"), (m(s) || m(n)) && l.push("scale(" + A(s, 1) + " " + A(n, 1) + ")"), l.length && !(this.text || this).textPath && e.setAttribute(t, l.join(" "))
                }, t.prototype.visibilitySetter = function (t, e, i) {
                    "inherit" === t ? i.removeAttribute(e) : this[e] !== t && i.setAttribute(e, t), this[e] = t
                }, t.prototype.xGetter = function (t) {
                    return "circle" === this.element.nodeName && ("x" === t ? t = "cx" : "y" === t && (t = "cy")), this._defaultGetter(t)
                }, t.prototype.zIndexSetter = function (t, e) {
                    var i, o, r, s, n, a = this.renderer, h = this.parentGroup, l = (h || a).element || a.box,
                        c = this.element, p = l === a.box, d = !1, u = this.added;
                    if (m(t) ? (c.setAttribute("data-z-index", t), t = +t, this[e] === t && (u = !1)) : m(this[e]) && c.removeAttribute("data-z-index"), this[e] = t, u) {
                        for ((t = this.zIndex) && h && (h.handleZ = !0), n = (i = l.childNodes).length - 1; n >= 0 && !d; n--) s = !m(r = (o = i[n]).getAttribute("data-z-index")), o !== c && (t < 0 && s && !p && !n ? (l.insertBefore(c, i[n]), d = !0) : (T(r) <= t || s && (!m(t) || t >= 0)) && (l.insertBefore(c, i[n + 1]), d = !0));
                        d || (l.insertBefore(c, i[p ? 3 : 0]), d = !0)
                    }
                    return d
                }, t.symbolCustomAttribs = ["anchorX", "anchorY", "clockwise", "end", "height", "innerR", "r", "start", "width", "x", "y"], t
            }();
        return j.prototype.strokeSetter = j.prototype.fillSetter, j.prototype.yGetter = j.prototype.xGetter, j.prototype.matrixSetter = j.prototype.rotationOriginXSetter = j.prototype.rotationOriginYSetter = j.prototype.rotationSetter = j.prototype.scaleXSetter = j.prototype.scaleYSetter = j.prototype.translateXSetter = j.prototype.translateYSetter = j.prototype.verticalAlignSetter = function (t, e) {
            this[e] = t, this.doTransform = !0
        }, j
    }), i(e, "Core/Renderer/RendererRegistry.js", [e["Core/Globals.js"]], function (t) {
        var e, i, o;
        return (i = e || (e = {})).rendererTypes = {}, i.getRendererType = function (t) {
            return void 0 === t && (t = o), i.rendererTypes[t] || i.rendererTypes[o]
        }, i.registerRendererType = function (e, r, s) {
            i.rendererTypes[e] = r, (!o || s) && (o = e, t.Renderer = r)
        }, e
    }), i(e, "Core/Renderer/SVG/SVGLabel.js", [e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = this && this.__extends || (i = function (t, e) {
            return (i = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function o() {
                this.constructor = t
            }

            i(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
        }), r = e.defined, s = e.extend, n = e.isNumber, a = e.merge, h = e.pick, l = e.removeEvent;
        return function (e) {
            function i(t, o, r, s, n, a, h, l, c, p) {
                var d, u = e.call(this, t, "g") || this;
                return u.paddingLeftSetter = u.paddingSetter, u.paddingRightSetter = u.paddingSetter, u.textStr = o, u.x = r, u.y = s, u.anchorX = a, u.anchorY = h, u.baseline = c, u.className = p, u.addClass("button" === p ? "highcharts-no-tooltip" : "highcharts-label"), p && u.addClass("highcharts-" + p), u.text = t.text(void 0, 0, 0, l).attr({zIndex: 1}), "string" == typeof n && ((d = /^url\((.*?)\)$/.test(n)) || u.renderer.symbols[n]) && (u.symbolKey = n), u.bBox = i.emptyBBox, u.padding = 3, u.baselineOffset = 0, u.needsBox = t.styledMode || d, u.deferredAttr = {}, u.alignFactor = 0, u
            }

            return o(i, e), i.prototype.alignSetter = function (t) {
                var e = {left: 0, center: .5, right: 1}[t];
                e !== this.alignFactor && (this.alignFactor = e, this.bBox && n(this.xSetting) && this.attr({x: this.xSetting}))
            }, i.prototype.anchorXSetter = function (t, e) {
                this.anchorX = t, this.boxAttr(e, Math.round(t) - this.getCrispAdjust() - this.xSetting)
            }, i.prototype.anchorYSetter = function (t, e) {
                this.anchorY = t, this.boxAttr(e, t - this.ySetting)
            }, i.prototype.boxAttr = function (t, e) {
                this.box ? this.box.attr(t, e) : this.deferredAttr[t] = e
            }, i.prototype.css = function (e) {
                if (e) {
                    var o = {};
                    e = a(e), i.textProps.forEach(function (t) {
                        void 0 !== e[t] && (o[t] = e[t], delete e[t])
                    }), this.text.css(o), "fontSize" in o || "fontWeight" in o ? this.updateTextPadding() : ("width" in o || "textOverflow" in o) && this.updateBoxSize()
                }
                return t.prototype.css.call(this, e)
            }, i.prototype.destroy = function () {
                l(this.element, "mouseenter"), l(this.element, "mouseleave"), this.text && this.text.destroy(), this.box && (this.box = this.box.destroy()), t.prototype.destroy.call(this)
            }, i.prototype.fillSetter = function (t, e) {
                t && (this.needsBox = !0), this.fill = t, this.boxAttr(e, t)
            }, i.prototype.getBBox = function () {
                this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                var t = this.padding, e = h(this.paddingLeft, t);
                return {width: this.width || 0, height: this.height || 0, x: this.bBox.x - e, y: this.bBox.y - t}
            }, i.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
            }, i.prototype.heightSetter = function (t) {
                this.heightSetting = t
            }, i.prototype.onAdd = function () {
                this.text.add(this), this.attr({
                    text: h(this.textStr, ""),
                    x: this.x || 0,
                    y: this.y || 0
                }), this.box && r(this.anchorX) && this.attr({anchorX: this.anchorX, anchorY: this.anchorY})
            }, i.prototype.paddingSetter = function (t, e) {
                n(t) ? t !== this[e] && (this[e] = t, this.updateTextPadding()) : this[e] = void 0
            }, i.prototype.rSetter = function (t, e) {
                this.boxAttr(e, t)
            }, i.prototype.strokeSetter = function (t, e) {
                this.stroke = t, this.boxAttr(e, t)
            }, i.prototype["stroke-widthSetter"] = function (t, e) {
                t && (this.needsBox = !0), this["stroke-width"] = t, this.boxAttr(e, t)
            }, i.prototype["text-alignSetter"] = function (t) {
                this.textAlign = t
            }, i.prototype.textSetter = function (t) {
                void 0 !== t && this.text.attr({text: t}), this.updateTextPadding()
            }, i.prototype.updateBoxSize = function () {
                var t, e = this.text, o = {}, a = this.padding,
                    h = this.bBox = (!n(this.widthSetting) || !n(this.heightSetting) || this.textAlign) && r(e.textStr) ? e.getBBox() : i.emptyBBox;
                this.width = this.getPaddedWidth(), this.height = (this.heightSetting || h.height || 0) + 2 * a;
                var l = this.renderer.fontMetrics(e);
                if (this.baselineOffset = a + Math.min((this.text.firstLineMetrics || l).b, h.height || 1 / 0), this.heightSetting && (this.baselineOffset += (this.heightSetting - l.h) / 2), this.needsBox && !e.textPath) {
                    if (!this.box) {
                        var c = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect();
                        c.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), c.add(this)
                    }
                    t = this.getCrispAdjust(), o.x = t, o.y = (this.baseline ? -this.baselineOffset : 0) + t, o.width = Math.round(this.width), o.height = Math.round(this.height), this.box.attr(s(o, this.deferredAttr)), this.deferredAttr = {}
                }
            }, i.prototype.updateTextPadding = function () {
                var t = this.text;
                if (!t.textPath) {
                    this.updateBoxSize();
                    var e = this.baseline ? 0 : this.baselineOffset, i = h(this.paddingLeft, this.padding);
                    r(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (i += ({
                        center: .5,
                        right: 1
                    })[this.textAlign] * (this.widthSetting - this.bBox.width)), (i !== t.x || e !== t.y) && (t.attr("x", i), t.hasBoxWidthChanged && (this.bBox = t.getBBox(!0)), void 0 !== e && t.attr("y", e)), t.x = i, t.y = e
                }
            }, i.prototype.widthSetter = function (t) {
                this.widthSetting = n(t) ? t : void 0
            }, i.prototype.getPaddedWidth = function () {
                var t = this.padding, e = h(this.paddingLeft, t), i = h(this.paddingRight, t);
                return (this.widthSetting || this.bBox.width || 0) + e + i
            }, i.prototype.xSetter = function (t) {
                this.x = t, this.alignFactor && (t -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0), this.xSetting = Math.round(t), this.attr("translateX", this.xSetting)
            }, i.prototype.ySetter = function (t) {
                this.ySetting = this.y = Math.round(t), this.attr("translateY", this.ySetting)
            }, i.emptyBBox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            }, i.textProps = ["color", "direction", "fontFamily", "fontSize", "fontStyle", "fontWeight", "lineHeight", "textAlign", "textDecoration", "textOutline", "textOverflow", "whiteSpace", "width"], i
        }(t)
    }), i(e, "Core/Renderer/SVG/Symbols.js", [e["Core/Utilities.js"]], function (t) {
        var e = t.defined, i = t.isNumber, o = t.pick;

        function r(t, i, r, s, n) {
            var a = [];
            if (n) {
                var h = n.start || 0, l = o(n.r, r), c = o(n.r, s || r),
                    p = .001 > Math.abs((n.end || 0) - h - 2 * Math.PI), d = (n.end || 0) - .001, u = n.innerR,
                    f = o(n.open, p), g = Math.cos(h), m = Math.sin(h), y = Math.cos(d), v = Math.sin(d),
                    x = o(n.longArc, d - h - Math.PI < .001 ? 0 : 1),
                    b = ["A", l, c, 0, x, o(n.clockwise, 1), t + l * y, i + c * v];
                b.params = {
                    start: h,
                    end: d,
                    cx: t,
                    cy: i
                }, a.push(["M", t + l * g, i + c * m], b), e(u) && ((b = ["A", u, u, 0, x, e(n.clockwise) ? 1 - n.clockwise : 0, t + u * g, i + u * m]).params = {
                    start: d,
                    end: h,
                    cx: t,
                    cy: i
                }, a.push(f ? ["M", t + u * y, i + u * v] : ["L", t + u * y, i + u * v], b)), f || a.push(["Z"])
            }
            return a
        }

        function s(t, e, i, o, r) {
            return r && r.r ? n(t, e, i, o, r) : [["M", t, e], ["L", t + i, e], ["L", t + i, e + o], ["L", t, e + o], ["Z"]]
        }

        function n(t, e, i, o, r) {
            var s = (null == r ? void 0 : r.r) || 0;
            return [["M", t + s, e], ["L", t + i - s, e], ["A", s, s, 0, 0, 1, t + i, e + s], ["L", t + i, e + o - s], ["A", s, s, 0, 0, 1, t + i - s, e + o], ["L", t + s, e + o], ["A", s, s, 0, 0, 1, t, e + o - s], ["L", t, e + s], ["A", s, s, 0, 0, 1, t + s, e], ["Z"]]
        }

        return {
            arc: r, callout: function (t, e, o, r, s) {
                var a = Math.min(s && s.r || 0, o, r), h = a + 6, l = s && s.anchorX, c = s && s.anchorY || 0,
                    p = n(t, e, o, r, {r: a});
                if (!i(l) || l < o && l > 0 && c < r && c > 0) return p;
                if (t + l > o - h) {
                    if (c > e + h && c < e + r - h) p.splice(3, 1, ["L", t + o, c - 6], ["L", t + o + 6, c], ["L", t + o, c + 6], ["L", t + o, e + r - a]); else if (l < o) {
                        var d = c < e + h, u = d ? e : e + r, f = d ? 2 : 5;
                        p.splice(f, 0, ["L", l, c], ["L", t + o - a, u])
                    } else p.splice(3, 1, ["L", t + o, r / 2], ["L", l, c], ["L", t + o, r / 2], ["L", t + o, e + r - a])
                } else if (t + l < h) {
                    if (c > e + h && c < e + r - h) p.splice(7, 1, ["L", t, c + 6], ["L", t - 6, c], ["L", t, c - 6], ["L", t, e + a]); else if (l > 0) {
                        var d = c < e + h, u = d ? e : e + r, f = d ? 1 : 6;
                        p.splice(f, 0, ["L", l, c], ["L", t + a, u])
                    } else p.splice(7, 1, ["L", t, r / 2], ["L", l, c], ["L", t, r / 2], ["L", t, e + a])
                } else c > r && l < o - h ? p.splice(5, 1, ["L", l + 6, e + r], ["L", l, e + r + 6], ["L", l - 6, e + r], ["L", t + a, e + r]) : c < 0 && l > h && p.splice(1, 1, ["L", l - 6, e], ["L", l, e - 6], ["L", l + 6, e], ["L", o - a, e]);
                return p
            }, circle: function (t, e, i, o) {
                return r(t + i / 2, e + o / 2, i / 2, o / 2, {start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1})
            }, diamond: function (t, e, i, o) {
                return [["M", t + i / 2, e], ["L", t + i, e + o / 2], ["L", t + i / 2, e + o], ["L", t, e + o / 2], ["Z"]]
            }, rect: s, roundedRect: n, square: s, triangle: function (t, e, i, o) {
                return [["M", t + i / 2, e], ["L", t + i, e + o], ["L", t, e + o], ["Z"]]
            }, "triangle-down": function (t, e, i, o) {
                return [["M", t, e], ["L", t + i, e], ["L", t + i / 2, e + o], ["Z"]]
            }
        }
    }), i(e, "Core/Renderer/SVG/TextBuilder.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o = e.doc, r = e.SVG_NS, s = e.win, n = i.attr, a = i.extend, h = i.fireEvent, l = i.isString,
            c = i.objectEach, p = i.pick;
        return function () {
            function e(t) {
                var e = t.styles;
                this.renderer = t.renderer, this.svgElement = t, this.width = t.textWidth, this.textLineHeight = e && e.lineHeight, this.textOutline = e && e.textOutline, this.ellipsis = !!(e && "ellipsis" === e.textOverflow), this.noWrap = !!(e && "nowrap" === e.whiteSpace)
            }

            return e.prototype.buildSVG = function () {
                var e = this.svgElement, i = e.element, r = e.renderer, s = p(e.textStr, "").toString(),
                    n = -1 !== s.indexOf("<"), a = i.childNodes, h = !e.added && r.box,
                    c = [s, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, e.getStyle("font-size"), this.width].join(",");
                if (c !== e.textCache) {
                    e.textCache = c, delete e.actualWidth;
                    for (var d = a.length; d--;) i.removeChild(a[d]);
                    if (n || this.ellipsis || this.width || e.textPath || -1 !== s.indexOf(" ") && (!this.noWrap || /<br.*?>/g.test(s))) {
                        if ("" !== s) {
                            h && h.appendChild(i);
                            var u = new t(s);
                            this.modifyTree(u.nodes), u.addToDOM(i), this.modifyDOM(), this.ellipsis && -1 !== (i.textContent || "").indexOf("…") && e.attr("title", this.unescapeEntities(e.textStr || "", ["&lt;", "&gt;"])), h && h.removeChild(i)
                        }
                    } else i.appendChild(o.createTextNode(this.unescapeEntities(s)));
                    l(this.textOutline) && e.applyTextOutline && e.applyTextOutline(this.textOutline)
                }
            }, e.prototype.modifyDOM = function () {
                var t, e = this, i = this.svgElement, a = n(i.element, "x");
                for (i.firstLineMetrics = void 0; t = i.element.firstChild;) if (/^[\s\u200B]*$/.test(t.textContent || " ")) i.element.removeChild(t); else break;
                [].forEach.call(i.element.querySelectorAll("tspan.highcharts-br"), function (t, o) {
                    t.nextSibling && t.previousSibling && (0 === o && 1 === t.previousSibling.nodeType && (i.firstLineMetrics = i.renderer.fontMetrics(t.previousSibling)), n(t, {
                        dy: e.getLineHeight(t.nextSibling),
                        x: a
                    }))
                });
                var h = this.width || 0;
                if (h) {
                    var l = function (t, s) {
                        var l = t.textContent || "", c = l.replace(/([^\^])-/g, "$1- ").split(" "),
                            p = !e.noWrap && (c.length > 1 || i.element.childNodes.length > 1), d = e.getLineHeight(s),
                            u = 0, f = i.actualWidth;
                        if (e.ellipsis) l && e.truncate(t, l, void 0, 0, Math.max(0, h - .8 * d), function (t, e) {
                            return t.substring(0, e) + "…"
                        }); else if (p) {
                            for (var g = [], m = []; s.firstChild && s.firstChild !== t;) m.push(s.firstChild), s.removeChild(s.firstChild);
                            for (; c.length;) c.length && !e.noWrap && u > 0 && (g.push(t.textContent || ""), t.textContent = c.join(" ").replace(/- /g, "-")), e.truncate(t, void 0, c, 0 === u && f || 0, h, function (t, e) {
                                return c.slice(0, e).join(" ").replace(/- /g, "-")
                            }), f = i.actualWidth, u++;
                            m.forEach(function (e) {
                                s.insertBefore(e, t)
                            }), g.forEach(function (e) {
                                s.insertBefore(o.createTextNode(e), t);
                                var i = o.createElementNS(r, "tspan");
                                i.textContent = "​", n(i, {dy: d, x: a}), s.insertBefore(i, t)
                            })
                        }
                    }, c = function (t) {
                        [].slice.call(t.childNodes).forEach(function (e) {
                            e.nodeType === s.Node.TEXT_NODE ? l(e, t) : (-1 !== e.className.baseVal.indexOf("highcharts-br") && (i.actualWidth = 0), c(e))
                        })
                    };
                    c(i.element)
                }
            }, e.prototype.getLineHeight = function (t) {
                var e = t.nodeType === s.Node.TEXT_NODE ? t.parentElement : t;
                return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(e || this.svgElement.element).h
            }, e.prototype.modifyTree = function (t) {
                var e = this, i = function (o, r) {
                    var s = o.attributes, n = void 0 === s ? {} : s, h = o.children, l = o.style,
                        c = void 0 === l ? {} : l, p = o.tagName, d = e.renderer.styledMode;
                    if ("b" === p || "strong" === p ? d ? n.class = "highcharts-strong" : c.fontWeight = "bold" : ("i" === p || "em" === p) && (d ? n.class = "highcharts-emphasized" : c.fontStyle = "italic"), c && c.color && (c.fill = c.color), "br" === p) {
                        n.class = "highcharts-br", o.textContent = "​";
                        var u = t[r + 1];
                        u && u.textContent && (u.textContent = u.textContent.replace(/^ +/gm, ""))
                    } else "a" === p && h && h.some(function (t) {
                        return "#text" === t.tagName
                    }) && (o.children = [{children: h, tagName: "tspan"}]);
                    "#text" !== p && "a" !== p && (o.tagName = "tspan"), a(o, {
                        attributes: n,
                        style: c
                    }), h && h.filter(function (t) {
                        return "#text" !== t.tagName
                    }).forEach(i)
                };
                t.forEach(i), h(this.svgElement, "afterModifyTree", {nodes: t})
            }, e.prototype.truncate = function (t, e, i, o, r, s) {
                var n, a, h = this.svgElement;
                h.renderer;
                var l = h.rotation, c = [], p = i ? 1 : 0, d = (e || i || "").length, u = d, f = function (e, r) {
                    var s = r || e, n = t.parentNode;
                    if (n && void 0 === c[s] && n.getSubStringLength) try {
                        c[s] = o + n.getSubStringLength(0, i ? s + 1 : s)
                    } catch (t) {
                    }
                    return c[s]
                };
                if (h.rotation = 0, o + (a = f(t.textContent.length)) > r) {
                    for (; p <= d;) u = Math.ceil((p + d) / 2), i && (n = s(i, u)), a = f(u, n && n.length - 1), p === d ? p = d + 1 : a > r ? d = u - 1 : p = u;
                    0 === d ? t.textContent = "" : e && d === e.length - 1 || (t.textContent = n || s(e || i, u))
                }
                i && i.splice(0, u), h.actualWidth = a, h.rotation = l
            }, e.prototype.unescapeEntities = function (t, e) {
                return c(this.renderer.escapes, function (i, o) {
                    e && -1 !== e.indexOf(i) || (t = t.toString().replace(RegExp(i, "g"), o))
                }), t
            }, e
        }()
    }), i(e, "Core/Renderer/SVG/SVGRenderer.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Renderer/SVG/SVGLabel.js"], e["Core/Renderer/SVG/Symbols.js"], e["Core/Renderer/SVG/TextBuilder.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s, n, a, h) {
        var l, c = this && this.__spreadArray || function (t, e, i) {
                if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
                return t.concat(o || Array.prototype.slice.call(e))
            }, p = i.charts, d = i.deg2rad, u = i.doc, f = i.isFirefox, g = i.isMS, m = i.isWebKit, y = i.noop,
            v = i.SVG_NS, x = i.symbolSizes, b = i.win, M = h.addEvent, C = h.attr, S = h.createElement, w = h.css,
            k = h.defined, A = h.destroyObjectProperties, T = h.extend, P = h.isArray, L = h.isNumber, j = h.isObject,
            O = h.isString, E = h.merge, D = h.pick, B = h.pInt, I = h.uniqueKey, z = function () {
                function i(t, e, i, o, r, s, n) {
                    var a, h, l = this.createElement("svg").attr({version: "1.1", class: "highcharts-root"}), c = l.element;
                    n || l.css(this.getStyle(o || {})), t.appendChild(c), C(t, "dir", "ltr"), -1 === t.innerHTML.indexOf("xmlns") && C(c, "xmlns", this.SVG_NS), this.box = c, this.boxWrapper = l, this.alignedObjects = [], this.url = this.getReferenceURL(), this.createElement("desc").add().element.appendChild(u.createTextNode("Created with Highcharts 11.3.0")), this.defs = this.createElement("defs").add(), this.allowHTML = s, this.forExport = r, this.styledMode = n, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.rootFontSize = l.getStyle("font-size"), this.setSize(e, i, !1), f && t.getBoundingClientRect && ((a = function () {
                        w(t, {
                            left: 0,
                            top: 0
                        }), h = t.getBoundingClientRect(), w(t, {
                            left: Math.ceil(h.left) - h.left + "px",
                            top: Math.ceil(h.top) - h.top + "px"
                        })
                    })(), this.unSubPixelFix = M(b, "resize", a))
                }

                return i.prototype.definition = function (e) {
                    return new t([e]).addToDOM(this.defs.element)
                }, i.prototype.getReferenceURL = function () {
                    if ((f || m) && u.getElementsByTagName("base").length) {
                        if (!k(l)) {
                            var e = I(), i = new t([{
                                tagName: "svg",
                                attributes: {width: 8, height: 8},
                                children: [{
                                    tagName: "defs",
                                    children: [{
                                        tagName: "clipPath",
                                        attributes: {id: e},
                                        children: [{tagName: "rect", attributes: {width: 4, height: 4}}]
                                    }]
                                }, {
                                    tagName: "rect",
                                    attributes: {
                                        id: "hitme",
                                        width: 8,
                                        height: 8,
                                        "clip-path": "url(#".concat(e, ")"),
                                        fill: "rgba(0,0,0,0.001)"
                                    }
                                }]
                            }]).addToDOM(u.body);
                            w(i, {position: "fixed", top: 0, left: 0, zIndex: 9e5});
                            var o = u.elementFromPoint(6, 6);
                            l = "hitme" === (o && o.id), u.body.removeChild(i)
                        }
                        if (l) return b.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
                    }
                    return ""
                }, i.prototype.getStyle = function (t) {
                    return this.style = T({fontFamily: "Helvetica, Arial, sans-serif", fontSize: "1rem"}, t), this.style
                }, i.prototype.setStyle = function (t) {
                    this.boxWrapper.css(this.getStyle(t))
                }, i.prototype.isHidden = function () {
                    return !this.boxWrapper.getBBox().width
                }, i.prototype.destroy = function () {
                    var t = this.defs;
                    return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), A(this.gradients || {}), this.gradients = null, this.defs = t.destroy(), this.unSubPixelFix && this.unSubPixelFix(), this.alignedObjects = null, null
                }, i.prototype.createElement = function (t) {
                    return new this.Element(this, t)
                }, i.prototype.getRadialAttr = function (t, e) {
                    return {
                        cx: t[0] - t[2] / 2 + (e.cx || 0) * t[2],
                        cy: t[1] - t[2] / 2 + (e.cy || 0) * t[2],
                        r: (e.r || 0) * t[2]
                    }
                }, i.prototype.shadowDefinition = function (t) {
                    var e = c(["highcharts-drop-shadow-".concat(this.chartIndex)], Object.keys(t).map(function (e) {
                            return "".concat(e, "-").concat(t[e])
                        }), !0).join("-").toLowerCase().replace(/[^a-z0-9\-]/g, ""),
                        i = E({color: "#000000", offsetX: 1, offsetY: 1, opacity: .15, width: 5}, t);
                    return this.defs.element.querySelector("#".concat(e)) || this.definition({
                        tagName: "filter",
                        attributes: {id: e, filterUnits: i.filterUnits},
                        children: [{
                            tagName: "feDropShadow",
                            attributes: {
                                dx: i.offsetX,
                                dy: i.offsetY,
                                "flood-color": i.color,
                                "flood-opacity": Math.min(5 * i.opacity, 1),
                                stdDeviation: i.width / 2
                            }
                        }]
                    }), e
                }, i.prototype.buildText = function (t) {
                    new a(t).buildSVG()
                }, i.prototype.getContrast = function (t) {
                    var i = e.parse(t).rgba.map(function (t) {
                        var e = t / 255;
                        return e <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                    }), o = .2126 * i[0] + .7152 * i[1] + .0722 * i[2];
                    return 1.05 / (o + .05) > (o + .05) / .05 ? "#FFFFFF" : "#000000"
                }, i.prototype.button = function (e, i, o, r, s, n, a, h, l, c) {
                    void 0 === s && (s = {});
                    var p, d, u, f = this.label(e, i, o, l, void 0, void 0, c, void 0, "button"), m = this.styledMode,
                        y = s.states || {}, v = 0;
                    s = E(s), delete s.states;
                    var x = E({color: "#333333", cursor: "pointer", fontSize: "0.8em", fontWeight: "normal"}, s.style);
                    delete s.style;
                    var b = t.filterUserAttributes(s);
                    return f.attr(E({padding: 8, r: 2}, b)), m || (b = E({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1
                    }, b), p = (n = E(b, {fill: "#e6e6e6"}, t.filterUserAttributes(n || y.hover || {}))).style, delete n.style, d = (a = E(b, {
                        fill: "#e6e9ff",
                        style: {color: "#000000", fontWeight: "bold"}
                    }, t.filterUserAttributes(a || y.select || {}))).style, delete a.style, u = (h = E(b, {style: {color: "#cccccc"}}, t.filterUserAttributes(h || y.disabled || {}))).style, delete h.style), M(f.element, g ? "mouseover" : "mouseenter", function () {
                        3 !== v && f.setState(1)
                    }), M(f.element, g ? "mouseout" : "mouseleave", function () {
                        3 !== v && f.setState(v)
                    }), f.setState = function (t) {
                        if (1 !== t && (f.state = v = t), f.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][t || 0]), !m) {
                            f.attr([b, n, a, h][t || 0]);
                            var e = [x, p, d, u][t || 0];
                            j(e) && f.css(e)
                        }
                    }, !m && (f.attr(b).css(T({cursor: "default"}, x)), c && f.text.css({pointerEvents: "none"})), f.on("touchstart", function (t) {
                        return t.stopPropagation()
                    }).on("click", function (t) {
                        3 !== v && r.call(f, t)
                    })
                }, i.prototype.crispLine = function (t, e, i) {
                    void 0 === i && (i = "round");
                    var o = t[0], r = t[1];
                    return k(o[1]) && o[1] === r[1] && (o[1] = r[1] = Math[i](o[1]) - e % 2 / 2), k(o[2]) && o[2] === r[2] && (o[2] = r[2] = Math[i](o[2]) + e % 2 / 2), t
                }, i.prototype.path = function (t) {
                    var e = this.styledMode ? {} : {fill: "none"};
                    return P(t) ? e.d = t : j(t) && T(e, t), this.createElement("path").attr(e)
                }, i.prototype.circle = function (t, e, i) {
                    var o = j(t) ? t : void 0 === t ? {} : {x: t, y: e, r: i}, r = this.createElement("circle");
                    return r.xSetter = r.ySetter = function (t, e, i) {
                        i.setAttribute("c" + e, t)
                    }, r.attr(o)
                }, i.prototype.arc = function (t, e, i, o, r, s) {
                    j(t) ? (e = (n = t).y, i = n.r, o = n.innerR, r = n.start, s = n.end, t = n.x) : n = {
                        innerR: o,
                        start: r,
                        end: s
                    };
                    var n, a = this.symbol("arc", t, e, i, i, n);
                    return a.r = i, a
                }, i.prototype.rect = function (t, e, i, o, r, s) {
                    var n = j(t) ? t : void 0 === t ? {} : {
                        x: t,
                        y: e,
                        r: r,
                        width: Math.max(i || 0, 0),
                        height: Math.max(o || 0, 0)
                    }, a = this.createElement("rect");
                    return this.styledMode || (void 0 !== s && (n["stroke-width"] = s, T(n, a.crisp(n))), n.fill = "none"), a.rSetter = function (t, e, i) {
                        a.r = t, C(i, {rx: t, ry: t})
                    }, a.rGetter = function () {
                        return a.r || 0
                    }, a.attr(n)
                }, i.prototype.roundedRect = function (t) {
                    return this.symbol("roundedRect").attr(t)
                }, i.prototype.setSize = function (t, e, i) {
                    this.width = t, this.height = e, this.boxWrapper.animate({width: t, height: e}, {
                        step: function () {
                            this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                        }, duration: D(i, !0) ? void 0 : 0
                    }), this.alignElements()
                }, i.prototype.g = function (t) {
                    var e = this.createElement("g");
                    return t ? e.attr({class: "highcharts-" + t}) : e
                }, i.prototype.image = function (t, e, i, o, r, s) {
                    var n = {preserveAspectRatio: "none"};
                    L(e) && (n.x = e), L(i) && (n.y = i), L(o) && (n.width = o), L(r) && (n.height = r);
                    var a = this.createElement("image").attr(n), h = function (e) {
                        a.attr({href: t}), s.call(a, e)
                    };
                    if (s) {
                        a.attr({href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="});
                        var l = new b.Image;
                        M(l, "load", h), l.src = t, l.complete && h({})
                    } else a.attr({href: t});
                    return a
                }, i.prototype.symbol = function (t, e, i, o, r, s) {
                    var n, a, h, l, c = this, d = /^url\((.*?)\)$/, f = d.test(t),
                        g = !f && (this.symbols[t] ? t : "circle"), m = g && this.symbols[g];
                    if (m) "number" == typeof e && (a = m.call(this.symbols, Math.round(e || 0), Math.round(i || 0), o || 0, r || 0, s)), n = this.path(a), c.styledMode || n.attr("fill", "none"), T(n, {
                        symbolName: g || void 0,
                        x: e,
                        y: i,
                        width: o,
                        height: r
                    }), s && T(n, s); else if (f) {
                        h = t.match(d)[1];
                        var y = n = this.image(h);
                        y.imgwidth = D(s && s.width, x[h] && x[h].width), y.imgheight = D(s && s.height, x[h] && x[h].height), l = function (t) {
                            return t.attr({width: t.width, height: t.height})
                        }, ["width", "height"].forEach(function (t) {
                            y["".concat(t, "Setter")] = function (t, e) {
                                this[e] = t;
                                var i = this.alignByTranslate, o = this.element, r = this.width, n = this.height,
                                    a = this.imgwidth, h = this.imgheight, l = "width" === e ? a : h, c = 1;
                                s && "within" === s.backgroundSize && r && n && a && h ? (c = Math.min(r / a, n / h), C(o, {
                                    width: Math.round(a * c),
                                    height: Math.round(h * c)
                                })) : o && l && o.setAttribute(e, l), !i && a && h && this.translate(((r || 0) - a * c) / 2, ((n || 0) - h * c) / 2)
                            }
                        }), k(e) && y.attr({
                            x: e,
                            y: i
                        }), y.isImg = !0, k(y.imgwidth) && k(y.imgheight) ? l(y) : (y.attr({
                            width: 0,
                            height: 0
                        }), S("img", {
                            onload: function () {
                                var t = p[c.chartIndex];
                                0 === this.width && (w(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), u.body.appendChild(this)), x[h] = {
                                    width: this.width,
                                    height: this.height
                                }, y.imgwidth = this.width, y.imgheight = this.height, y.element && l(y), this.parentNode && this.parentNode.removeChild(this), c.imgCount--, c.imgCount || !t || t.hasLoaded || t.onload()
                            }, src: h
                        }), this.imgCount++)
                    }
                    return n
                }, i.prototype.clipRect = function (t, e, i, o) {
                    return this.rect(t, e, i, o, 0)
                }, i.prototype.text = function (t, e, i, o) {
                    var r = {};
                    if (o && (this.allowHTML || !this.forExport)) return this.html(t, e, i);
                    r.x = Math.round(e || 0), i && (r.y = Math.round(i)), k(t) && (r.text = t);
                    var s = this.createElement("text").attr(r);
                    return o && (!this.forExport || this.allowHTML) || (s.xSetter = function (t, e, i) {
                        for (var o = i.getElementsByTagName("tspan"), r = i.getAttribute(e), s = 0, n = void 0; s < o.length; s++) (n = o[s]).getAttribute(e) === r && n.setAttribute(e, t);
                        i.setAttribute(e, t)
                    }), s
                }, i.prototype.fontMetrics = function (t) {
                    var e = B(r.prototype.getStyle.call(t, "font-size") || 0), i = e < 24 ? e + 3 : Math.round(1.2 * e),
                        o = Math.round(.8 * i);
                    return {h: i, b: o, f: e}
                }, i.prototype.rotCorr = function (t, e, i) {
                    var o = t;
                    return e && i && (o = Math.max(o * Math.cos(e * d), 4)), {x: -t / 3 * Math.sin(e * d), y: o}
                }, i.prototype.pathToSegments = function (t) {
                    for (var e = [], i = [], o = {
                        A: 8,
                        C: 7,
                        H: 2,
                        L: 3,
                        M: 3,
                        Q: 5,
                        S: 5,
                        T: 3,
                        V: 2
                    }, r = 0; r < t.length; r++) O(i[0]) && L(t[r]) && i.length === o[i[0].toUpperCase()] && t.splice(r, 0, i[0].replace("M", "L").replace("m", "l")), "string" == typeof t[r] && (i.length && e.push(i.slice(0)), i.length = 0), i.push(t[r]);
                    return e.push(i.slice(0)), e
                }, i.prototype.label = function (t, e, i, o, r, n, a, h, l) {
                    return new s(this, t, e, i, o, r, n, a, h, l)
                }, i.prototype.alignElements = function () {
                    this.alignedObjects.forEach(function (t) {
                        return t.align()
                    })
                }, i
            }();
        return T(z.prototype, {
            Element: r,
            SVG_NS: v,
            escapes: {"&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"},
            symbols: n,
            draw: y
        }), o.registerRendererType("svg", z, !0), z
    }), i(e, "Core/Renderer/HTML/HTMLElement.js", [e["Core/Globals.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
            return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), s = t.composed, n = i.css, a = i.defined, h = i.extend, l = i.pushUnique, c = i.pInt;
        return function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return r(e, t), e.compose = function (t) {
                if (l(s, this.compose)) {
                    var i = e.prototype, o = t.prototype;
                    o.getSpanCorrection = i.getSpanCorrection, o.htmlCss = i.htmlCss, o.htmlGetBBox = i.htmlGetBBox, o.htmlUpdateTransform = i.htmlUpdateTransform, o.setSpanRotation = i.setSpanRotation
                }
                return t
            }, e.prototype.getSpanCorrection = function (t, e, i) {
                this.xCorr = -t * i, this.yCorr = -e
            }, e.prototype.htmlCss = function (t) {
                var e, i = this.element, o = "SPAN" === i.tagName && t && "width" in t, r = o && t.width;
                return o && (delete t.width, this.textWidth = c(r) || void 0, e = !0), (null == t ? void 0 : t.textOverflow) === "ellipsis" && (t.whiteSpace = "nowrap", t.overflow = "hidden"), h(this.styles, t), n(i, t), e && this.htmlUpdateTransform(), this
            }, e.prototype.htmlGetBBox = function () {
                var t = this.element;
                return {x: t.offsetLeft, y: t.offsetTop, width: t.offsetWidth, height: t.offsetHeight}
            }, e.prototype.htmlUpdateTransform = function () {
                if (!this.added) {
                    this.alignOnAdd = !0;
                    return
                }
                var t = this.element, e = this.renderer, i = this.rotation, o = this.styles, r = this.textAlign,
                    s = void 0 === r ? "left" : r, h = this.textWidth, l = this.translateX, c = this.translateY,
                    p = this.x, d = this.y, u = {left: 0, center: .5, right: 1}[s],
                    f = null == o ? void 0 : o.whiteSpace;
                if (n(t, {
                    marginLeft: "".concat(void 0 === l ? 0 : l, "px"),
                    marginTop: "".concat(void 0 === c ? 0 : c, "px")
                }), "SPAN" === t.tagName) {
                    var g = [i, s, t.innerHTML, h, this.textAlign].join(","), m = void 0, y = !1;
                    if (h !== this.oldTextWidth) {
                        var v = this.textPxLength ? this.textPxLength : (n(t, {
                            width: "",
                            whiteSpace: f || "nowrap"
                        }), t.offsetWidth), x = h || 0;
                        (x > this.oldTextWidth || v > x) && (/[ \-]/.test(t.textContent || t.innerText) || "ellipsis" === t.style.textOverflow) && (n(t, {
                            width: v > x || i ? h + "px" : "auto",
                            display: "block",
                            whiteSpace: f || "normal"
                        }), this.oldTextWidth = h, y = !0)
                    }
                    this.hasBoxWidthChanged = y, g !== this.cTT && (m = e.fontMetrics(t).b, a(i) && (i !== (this.oldRotation || 0) || s !== this.oldAlign) && this.setSpanRotation(i, u, m), this.getSpanCorrection(!a(i) && this.textPxLength || t.offsetWidth, m, u)), n(t, {
                        left: (void 0 === p ? 0 : p) + (this.xCorr || 0) + "px",
                        top: (void 0 === d ? 0 : d) + (this.yCorr || 0) + "px"
                    }), this.cTT = g, this.oldRotation = i, this.oldAlign = s
                }
            }, e.prototype.setSpanRotation = function (t, e, i) {
                n(this.element, {
                    transform: "rotate(".concat(t, "deg)"),
                    transformOrigin: "".concat(100 * e, "% ").concat(i, "px")
                })
            }, e
        }(e)
    }), i(e, "Core/Renderer/HTML/HTMLRenderer.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Globals.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Utilities.js"]], function (t, e, i, o, r) {
        var s, n = this && this.__extends || (s = function (t, e) {
            return (s = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            s(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), a = e.composed, h = r.attr, l = r.createElement, c = r.extend, p = r.pick, d = r.pushUnique;
        return function (e) {
            function o() {
                return null !== e && e.apply(this, arguments) || this
            }

            return n(o, e), o.compose = function (t) {
                if (d(a, this.compose)) {
                    var e = o.prototype;
                    t.prototype.html = e.html
                }
                return t
            }, o.prototype.html = function (e, o, r) {
                var s = this.createElement("span"), n = s.element, a = s.renderer, d = function (t, e) {
                    ["opacity", "visibility"].forEach(function (o) {
                        t[o + "Setter"] = function (r, s, n) {
                            var a = t.div ? t.div.style : e;
                            i.prototype[o + "Setter"].call(this, r, s, n), a && (a[s] = r)
                        }
                    }), t.addedSetters = !0
                };
                return s.textSetter = function (e) {
                    e !== this.textStr && (delete this.bBox, delete this.oldTextWidth, t.setElementHTML(this.element, p(e, "")), this.textStr = e, s.doTransform = !0)
                }, d(s, s.element.style), s.xSetter = s.ySetter = s.alignSetter = s.rotationSetter = function (t, e) {
                    "align" === e ? s.alignValue = s.textAlign = t : s[e] = t, s.doTransform = !0
                }, s.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                }, s.attr({
                    text: e,
                    x: Math.round(o),
                    y: Math.round(r)
                }).css({position: "absolute"}), a.styledMode || s.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                }), n.style.whiteSpace = "nowrap", s.css = s.htmlCss, s.add = function (t) {
                    var e, i, o = a.box.parentNode, r = [];
                    if (this.parentGroup = t, t) {
                        if (!(e = t.div)) {
                            for (i = t; i;) r.push(i), i = i.parentGroup;
                            r.reverse().forEach(function (t) {
                                var i, n = h(t.element, "class"), a = t.css;

                                function p(e, i) {
                                    t[i] = e, "translateX" === i ? f.left = e + "px" : f.top = e + "px", t.doTransform = !0
                                }

                                var u = t.styles || {},
                                    f = (e = t.div = t.div || l("div", n ? {className: n} : void 0, {
                                        position: "absolute",
                                        left: (t.translateX || 0) + "px",
                                        top: (t.translateY || 0) + "px",
                                        display: t.display,
                                        opacity: t.opacity,
                                        visibility: t.visibility
                                    }, e || o)).style;
                                c(t, {
                                    classSetter: (i = e, function (t) {
                                        this.element.setAttribute("class", t), i.className = t
                                    }), css: function (e) {
                                        return a.call(t, e), ["cursor", "pointerEvents"].forEach(function (t) {
                                            e[t] && (f[t] = e[t])
                                        }), t
                                    }, on: function () {
                                        return r[0].div && s.on.apply({
                                            element: r[0].div,
                                            onEvents: t.onEvents
                                        }, arguments), t
                                    }, translateXSetter: p, translateYSetter: p
                                }), t.addedSetters || d(t), t.css(u)
                            })
                        }
                    } else e = o;
                    return e.appendChild(n), s.added = !0, s.alignOnAdd && s.htmlUpdateTransform(), s
                }, s
            }, o
        }(o)
    }), i(e, "Core/Axis/AxisDefaults.js", [], function () {
        var t, e;
        return (e = t || (t = {})).xAxis = {
            alignTicks: !0,
            allowDecimals: void 0,
            panningEnabled: !0,
            zIndex: 2,
            zoomEnabled: !0,
            dateTimeLabelFormats: {
                millisecond: {main: "%H:%M:%S.%L", range: !1},
                second: {main: "%H:%M:%S", range: !1},
                minute: {main: "%H:%M", range: !1},
                hour: {main: "%H:%M", range: !1},
                day: {main: "%e %b"},
                week: {main: "%e %b"},
                month: {main: "%b '%y"},
                year: {main: "%Y"}
            },
            endOnTick: !1,
            gridLineDashStyle: "Solid",
            gridZIndex: 1,
            labels: {
                autoRotationLimit: 80,
                distance: 15,
                enabled: !0,
                indentation: 10,
                overflow: "justify",
                padding: 5,
                reserveSpace: void 0,
                rotation: void 0,
                staggerLines: 0,
                step: 0,
                useHTML: !1,
                zIndex: 7,
                style: {color: "#333333", cursor: "default", fontSize: "0.8em"}
            },
            maxPadding: .01,
            minorGridLineDashStyle: "Solid",
            minorTickLength: 2,
            minorTickPosition: "outside",
            minorTicksPerMajor: 5,
            minPadding: .01,
            offset: void 0,
            reversed: void 0,
            reversedStacks: !1,
            showEmpty: !0,
            showFirstLabel: !0,
            showLastLabel: !0,
            startOfWeek: 1,
            startOnTick: !1,
            tickLength: 10,
            tickPixelInterval: 100,
            tickmarkPlacement: "between",
            tickPosition: "outside",
            title: {align: "middle", useHTML: !1, x: 0, y: 0, style: {color: "#666666", fontSize: "0.8em"}},
            type: "linear",
            uniqueNames: !0,
            visible: !0,
            minorGridLineColor: "#f2f2f2",
            minorGridLineWidth: 1,
            minorTickColor: "#999999",
            lineColor: "#333333",
            lineWidth: 1,
            gridLineColor: "#e6e6e6",
            gridLineWidth: void 0,
            tickColor: "#333333"
        }, e.yAxis = {
            reversedStacks: !0,
            endOnTick: !0,
            maxPadding: .05,
            minPadding: .05,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {x: void 0},
            startOnTick: !0,
            title: {text: "Values"},
            stackLabels: {
                animation: {},
                allowOverlap: !1,
                enabled: !1,
                crop: !0,
                overflow: "justify",
                formatter: function () {
                    return (0, this.axis.chart.numberFormatter)(this.total || 0, -1)
                },
                style: {color: "#000000", fontSize: "0.7em", fontWeight: "bold", textOutline: "1px contrast"}
            },
            gridLineWidth: 1,
            lineWidth: 0
        }, t
    }), i(e, "Core/Foundation.js", [e["Core/Utilities.js"]], function (t) {
        var e, i = t.addEvent, o = t.isFunction, r = t.objectEach, s = t.removeEvent;
        return (e || (e = {})).registerEventOptions = function (t, e) {
            t.eventOptions = t.eventOptions || {}, r(e.events, function (e, r) {
                t.eventOptions[r] !== e && (t.eventOptions[r] && (s(t, r, t.eventOptions[r]), delete t.eventOptions[r]), o(e) && (t.eventOptions[r] = e, i(t, r, e, {order: 0})))
            })
        }, e
    }), i(e, "Core/Axis/Tick.js", [e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o = e.deg2rad, r = i.clamp, s = i.correctFloat, n = i.defined, a = i.destroyObjectProperties, h = i.extend,
            l = i.fireEvent, c = i.isNumber, p = i.merge, d = i.objectEach, u = i.pick;
        return function () {
            function e(t, e, i, o, r) {
                this.isNew = !0, this.isNewLabel = !0, this.axis = t, this.pos = e, this.type = i || "", this.parameters = r || {}, this.tickmarkOffset = this.parameters.tickmarkOffset, this.options = this.parameters.options, l(this, "init"), i || o || this.addLabel()
            }

            return e.prototype.addLabel = function () {
                var e, i, o, r = this, a = r.axis, p = a.options, d = a.chart, f = a.categories, g = a.logarithmic,
                    m = a.names, y = r.pos, v = u(r.options && r.options.labels, p.labels), x = a.tickPositions,
                    b = y === x[0], M = y === x[x.length - 1], C = (!v.step || 1 === v.step) && 1 === a.tickInterval,
                    S = x.info, w = r.label, k = this.parameters.category || (f ? u(f[y], m[y], y) : y);
                g && c(k) && (k = s(g.lin2log(k))), a.dateTime && (S ? e = (i = d.time.resolveDTLFormat(p.dateTimeLabelFormats[!p.grid && S.higherRanks[y] || S.unitName])).main : c(k) && (e = a.dateTime.getXDateFormat(k, p.dateTimeLabelFormats || {}))), r.isFirst = b, r.isLast = M;
                var A = {
                    axis: a,
                    chart: d,
                    dateTimeLabelFormat: e,
                    isFirst: b,
                    isLast: M,
                    pos: y,
                    tick: r,
                    tickPositionInfo: S,
                    value: k
                };
                l(this, "labelFormat", A);
                var T = function (e) {
                    return v.formatter ? v.formatter.call(e, e) : v.format ? (e.text = a.defaultLabelFormatter.call(e, e), t.format(v.format, e, d)) : a.defaultLabelFormatter.call(e, e)
                }, P = T.call(A, A), L = i && i.list;
                L ? r.shortenLabel = function () {
                    for (o = 0; o < L.length; o++) if (h(A, {dateTimeLabelFormat: L[o]}), w.attr({text: T.call(A, A)}), w.getBBox().width < a.getSlotWidth(r) - 2 * v.padding) return;
                    w.attr({text: ""})
                } : r.shortenLabel = void 0, C && a._addedPlotLB && r.moveLabel(P, v), n(w) || r.movedLabel ? w && w.textStr !== P && !C && (!w.textWidth || v.style.width || w.styles.width || w.css({width: null}), w.attr({text: P}), w.textPxLength = w.getBBox().width) : (r.label = w = r.createLabel(P, v), r.rotation = 0)
            }, e.prototype.createLabel = function (t, e, i) {
                var o = this.axis, r = o.chart,
                    s = n(t) && e.enabled ? r.renderer.text(t, null == i ? void 0 : i.x, null == i ? void 0 : i.y, e.useHTML).add(o.labelGroup) : void 0;
                return s && (r.styledMode || s.css(p(e.style)), s.textPxLength = s.getBBox().width), s
            }, e.prototype.destroy = function () {
                a(this, this.axis)
            }, e.prototype.getPosition = function (t, e, i, o) {
                var n = this.axis, a = n.chart, h = o && a.oldChartHeight || a.chartHeight, c = {
                    x: t ? s(n.translate(e + i, void 0, void 0, o) + n.transB) : n.left + n.offset + (n.opposite ? (o && a.oldChartWidth || a.chartWidth) - n.right - n.left : 0),
                    y: t ? h - n.bottom + n.offset - (n.opposite ? n.height : 0) : s(h - n.translate(e + i, void 0, void 0, o) - n.transB)
                };
                return c.y = r(c.y, -1e5, 1e5), l(this, "afterGetPosition", {pos: c}), c
            }, e.prototype.getLabelPosition = function (t, e, i, r, s, a, h, c) {
                var p, d, f = this.axis, g = f.transA,
                    m = f.isLinked && f.linkedParent ? f.linkedParent.reversed : f.reversed, y = f.staggerLines,
                    v = f.tickRotCorr || {x: 0, y: 0},
                    x = r || f.reserveSpaceDefault ? 0 : -f.labelOffset * ("center" === f.labelAlign ? .5 : 1),
                    b = s.distance, M = {};
                return p = 0 === f.side ? i.rotation ? -b : -i.getBBox().height : 2 === f.side ? v.y + b : Math.cos(i.rotation * o) * (v.y - i.getBBox(!1, 0).height / 2), n(s.y) && (p = 0 === f.side && f.horiz ? s.y + p : s.y), t = t + u(s.x, [0, 1, 0, -1][f.side] * b) + x + v.x - (a && r ? a * g * (m ? -1 : 1) : 0), e = e + p - (a && !r ? a * g * (m ? 1 : -1) : 0), y && (d = h / (c || 1) % y, f.opposite && (d = y - d - 1), e += d * (f.labelOffset / y)), M.x = t, M.y = Math.round(e), l(this, "afterGetLabelPosition", {
                    pos: M,
                    tickmarkOffset: a,
                    index: h
                }), M
            }, e.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, e.prototype.getMarkPath = function (t, e, i, o, r, s) {
                return s.crispLine([["M", t, e], ["L", t + (r ? 0 : -i), e + (r ? i : 0)]], o)
            }, e.prototype.handleOverflow = function (t) {
                var e, i = this.axis, r = i.options.labels, s = t.x, n = i.chart.chartWidth, a = i.chart.spacing,
                    h = u(i.labelLeft, Math.min(i.pos, a[3])),
                    l = u(i.labelRight, Math.max(i.isRadial ? 0 : i.pos + i.len, n - a[1])), c = this.label,
                    p = this.rotation, d = {left: 0, center: .5, right: 1}[i.labelAlign || c.attr("align")],
                    f = c.getBBox().width, g = i.getSlotWidth(this), m = {}, y = g, v = 1;
                p || "justify" !== r.overflow ? p < 0 && s - d * f < h ? e = Math.round(s / Math.cos(p * o) - h) : p > 0 && s + d * f > l && (e = Math.round((n - s) / Math.cos(p * o))) : (s - d * f < h ? y = t.x + y * (1 - d) - h : s + (1 - d) * f > l && (y = l - t.x + y * d, v = -1), (y = Math.min(g, y)) < g && "center" === i.labelAlign && (t.x += v * (g - y - d * (g - Math.min(f, y)))), (f > y || i.autoRotation && (c.styles || {}).width) && (e = y)), e && (this.shortenLabel ? this.shortenLabel() : (m.width = Math.floor(e) + "px", (r.style || {}).textOverflow || (m.textOverflow = "ellipsis"), c.css(m)))
            }, e.prototype.moveLabel = function (t, e) {
                var i, o = this, r = o.label, s = o.axis, n = !1;
                r && r.textStr === t ? (o.movedLabel = r, n = !0, delete o.label) : d(s.ticks, function (e) {
                    n || e.isNew || e === o || !e.label || e.label.textStr !== t || (o.movedLabel = e.label, n = !0, e.labelPos = o.movedLabel.xy, delete e.label)
                }), !n && (o.labelPos || r) && (i = o.labelPos || r.xy, o.movedLabel = o.createLabel(t, e, i), o.movedLabel && o.movedLabel.attr({opacity: 0}))
            }, e.prototype.render = function (t, e, i) {
                var o = this.axis, r = o.horiz, s = this.pos, n = u(this.tickmarkOffset, o.tickmarkOffset),
                    a = this.getPosition(r, s, n, e), h = a.x, c = a.y,
                    p = r && h === o.pos + o.len || !r && c === o.pos ? -1 : 1,
                    d = u(i, this.label && this.label.newOpacity, 1);
                i = u(i, 1), this.isActive = !0, this.renderGridLine(e, i, p), this.renderMark(a, i, p), this.renderLabel(a, e, d, t), this.isNew = !1, l(this, "afterRender")
            }, e.prototype.renderGridLine = function (t, e, i) {
                var o, r = this.axis, s = r.options, n = {}, a = this.pos, h = this.type,
                    l = u(this.tickmarkOffset, r.tickmarkOffset), c = r.chart.renderer, p = this.gridLine,
                    d = s.gridLineWidth, f = s.gridLineColor, g = s.gridLineDashStyle;
                "minor" === this.type && (d = s.minorGridLineWidth, f = s.minorGridLineColor, g = s.minorGridLineDashStyle), p || (r.chart.styledMode || (n.stroke = f, n["stroke-width"] = d || 0, n.dashstyle = g), h || (n.zIndex = 1), t && (e = 0), this.gridLine = p = c.path().attr(n).addClass("highcharts-" + (h ? h + "-" : "") + "grid-line").add(r.gridGroup)), p && (o = r.getPlotLinePath({
                    value: a + l,
                    lineWidth: p.strokeWidth() * i,
                    force: "pass",
                    old: t,
                    acrossPanes: !1
                })) && p[t || this.isNew ? "attr" : "animate"]({d: o, opacity: e})
            }, e.prototype.renderMark = function (t, e, i) {
                var o = this.axis, r = o.options, s = o.chart.renderer, n = this.type,
                    a = o.tickSize(n ? n + "Tick" : "tick"), h = t.x, l = t.y,
                    c = u(r["minor" !== n ? "tickWidth" : "minorTickWidth"], !n && o.isXAxis ? 1 : 0),
                    p = r["minor" !== n ? "tickColor" : "minorTickColor"], d = this.mark, f = !d;
                a && (o.opposite && (a[0] = -a[0]), d || (this.mark = d = s.path().addClass("highcharts-" + (n ? n + "-" : "") + "tick").add(o.axisGroup), o.chart.styledMode || d.attr({
                    stroke: p,
                    "stroke-width": c
                })), d[f ? "attr" : "animate"]({
                    d: this.getMarkPath(h, l, a[0], d.strokeWidth() * i, o.horiz, s),
                    opacity: e
                }))
            }, e.prototype.renderLabel = function (t, e, i, o) {
                var r = this.axis, s = r.horiz, n = r.options, a = this.label, h = n.labels, l = h.step,
                    p = u(this.tickmarkOffset, r.tickmarkOffset), d = t.x, f = t.y, g = !0;
                a && c(d) && (a.xy = t = this.getLabelPosition(d, f, a, s, h, p, o, l), (!this.isFirst || this.isLast || n.showFirstLabel) && (!this.isLast || this.isFirst || n.showLastLabel) ? !s || h.step || h.rotation || e || 0 === i || this.handleOverflow(t) : g = !1, l && o % l && (g = !1), g && c(t.y) ? (t.opacity = i, a[this.isNewLabel ? "attr" : "animate"](t).show(!0), this.isNewLabel = !1) : (a.hide(), this.isNewLabel = !0))
            }, e.prototype.replaceMovedLabel = function () {
                var t = this.label, e = this.axis;
                t && !this.isNew && (t.animate({opacity: 0}, void 0, t.destroy), delete this.label), e.isDirty = !0, this.label = this.movedLabel, delete this.movedLabel
            }, e
        }()
    }), i(e, "Core/Axis/Axis.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Axis/AxisDefaults.js"], e["Core/Color/Color.js"], e["Core/Defaults.js"], e["Core/Foundation.js"], e["Core/Globals.js"], e["Core/Axis/Tick.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s, n, a) {
        var h = t.animObject, l = e.xAxis, c = e.yAxis, p = o.defaultOptions, d = r.registerEventOptions, u = s.deg2rad,
            f = a.arrayMax, g = a.arrayMin, m = a.clamp, y = a.correctFloat, v = a.defined,
            x = a.destroyObjectProperties, b = a.erase, M = a.error, C = a.extend, S = a.fireEvent,
            w = a.getClosestDistance, k = a.insertItem, A = a.isArray, T = a.isNumber, P = a.isString, L = a.merge,
            j = a.normalizeTickInterval, O = a.objectEach, E = a.pick, D = a.relativeLength, B = a.removeEvent,
            I = a.splat, z = a.syncTimeout, R = function (t, e) {
                return j(e, void 0, void 0, E(t.options.allowDecimals, e < .5 || void 0 !== t.tickAmount), !!t.tickAmount)
            };
        return C(p, {xAxis: l, yAxis: L(l, c)}), function () {
            function t(t, e, i) {
                this.init(t, e, i)
            }

            return t.prototype.init = function (t, e, i) {
                void 0 === i && (i = this.coll);
                var o = "xAxis" === i, r = this.isZAxis || (t.inverted ? !o : o);
                this.chart = t, this.horiz = r, this.isXAxis = o, this.coll = i, S(this, "init", {userOptions: e}), this.opposite = E(e.opposite, this.opposite), this.side = E(e.side, this.side, r ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(e);
                var s = this.options, n = s.labels, a = s.type;
                this.userOptions = e, this.minPixelPadding = 0, this.reversed = E(s.reversed, this.reversed), this.visible = s.visible, this.zoomEnabled = s.zoomEnabled, this.hasNames = "category" === a || !0 === s.categories, this.categories = A(s.categories) && s.categories || (this.hasNames ? [] : void 0), this.names || (this.names = [], this.names.keys = {}), this.plotLinesAndBandsGroups = {}, this.positiveValuesOnly = !!this.logarithmic, this.isLinked = v(s.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = s.minRange || s.maxZoom, this.range = s.range, this.offset = s.offset || 0, this.max = void 0, this.min = void 0;
                var h = E(s.crosshair, I(t.options.tooltip.crosshairs)[o ? 0 : 1]);
                this.crosshair = !0 === h ? {} : h, -1 === t.axes.indexOf(this) && (o ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this), k(this, t[this.coll])), t.orderItems(this.coll), this.series = this.series || [], t.inverted && !this.isZAxis && o && !v(this.reversed) && (this.reversed = !0), this.labelRotation = T(n.rotation) ? n.rotation : void 0, d(this, s), S(this, "afterInit")
            }, t.prototype.setOptions = function (t) {
                var e = this.horiz ? {labels: {autoRotation: [-45]}, margin: 15} : {title: {rotation: 90 * this.side}};
                this.options = L(e, p[this.coll], t), S(this, "afterSetOptions", {userOptions: t})
            }, t.prototype.defaultLabelFormatter = function (t) {
                var e, i, o = this.axis, r = this.chart.numberFormatter, s = T(this.value) ? this.value : NaN,
                    n = o.chart.time, a = o.categories, h = this.dateTimeLabelFormat, l = p.lang, c = l.numericSymbols,
                    d = l.numericSymbolMagnitude || 1e3, u = o.logarithmic ? Math.abs(s) : o.tickInterval,
                    f = c && c.length;
                if (a) i = "".concat(this.value); else if (h) i = n.dateFormat(h, s); else if (f && c && u >= 1e3) for (; f-- && void 0 === i;) u >= (e = Math.pow(d, f + 1)) && 10 * s % e == 0 && null !== c[f] && 0 !== s && (i = r(s / e, -1) + c[f]);
                return void 0 === i && (i = Math.abs(s) >= 1e4 ? r(s, -1) : r(s, -1, void 0, "")), i
            }, t.prototype.getSeriesExtremes = function () {
                var t, e = this;
                S(this, "getSeriesExtremes", null, function () {
                    e.hasVisibleSeries = !1, e.dataMin = e.dataMax = e.threshold = void 0, e.softThreshold = !e.isXAxis, e.series.forEach(function (i) {
                        if (i.reserveSpace()) {
                            var o = i.options, r = void 0, s = o.threshold, n = void 0, a = void 0;
                            if (e.hasVisibleSeries = !0, e.positiveValuesOnly && 0 >= (s || 0) && (s = void 0), e.isXAxis) (r = i.xData) && r.length && (r = e.logarithmic ? r.filter(function (t) {
                                return t > 0
                            }) : r, n = (t = i.getXExtremes(r)).min, a = t.max, T(n) || n instanceof Date || (r = r.filter(T), n = (t = i.getXExtremes(r)).min, a = t.max), r.length && (e.dataMin = Math.min(E(e.dataMin, n), n), e.dataMax = Math.max(E(e.dataMax, a), a))); else {
                                var h = i.applyExtremes();
                                T(h.dataMin) && (n = h.dataMin, e.dataMin = Math.min(E(e.dataMin, n), n)), T(h.dataMax) && (a = h.dataMax, e.dataMax = Math.max(E(e.dataMax, a), a)), v(s) && (e.threshold = s), (!o.softThreshold || e.positiveValuesOnly) && (e.softThreshold = !1)
                            }
                        }
                    })
                }), S(this, "afterGetSeriesExtremes")
            }, t.prototype.translate = function (t, e, i, o, r, s) {
                var n, a = this.linkedParent || this, h = o && a.old ? a.old.min : a.min;
                if (!T(h)) return NaN;
                var l = a.minPixelPadding,
                    c = (a.isOrdinal || (null === (n = a.brokenAxis) || void 0 === n ? void 0 : n.hasBreaks) || a.logarithmic && r) && a.lin2val,
                    p = 1, d = 0, u = o && a.old ? a.old.transA : a.transA, f = 0;
                if (u || (u = a.transA), i && (p *= -1, d = a.len), a.reversed && (p *= -1, d -= p * (a.sector || a.len)), e) f = (t = t * p + d - l) / u + h, c && (f = a.lin2val(f)); else {
                    c && (t = a.val2lin(t));
                    var g = p * (t - h) * u;
                    f = (a.isRadial ? g : y(g)) + d + p * l + (T(s) ? u * s : 0)
                }
                return f
            }, t.prototype.toPixels = function (t, e) {
                return this.translate(t, !1, !this.horiz, void 0, !0) + (e ? 0 : this.pos)
            }, t.prototype.toValue = function (t, e) {
                return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, void 0, !0)
            }, t.prototype.getPlotLinePath = function (t) {
                var e, i, o, r, s, n = this, a = n.chart, h = n.left, l = n.top, c = t.old, p = t.value,
                    d = t.lineWidth, u = c && a.oldChartHeight || a.chartHeight,
                    f = c && a.oldChartWidth || a.chartWidth, g = n.transB, y = t.translatedValue, v = t.force;

                function x(t, e, i) {
                    return "pass" !== v && (t < e || t > i) && (v ? t = m(t, e, i) : s = !0), t
                }

                var b = {value: p, lineWidth: d, old: c, force: v, acrossPanes: t.acrossPanes, translatedValue: y};
                return S(this, "getPlotLinePath", b, function (t) {
                    e = o = Math.round((y = m(y = E(y, n.translate(p, void 0, void 0, c)), -1e5, 1e5)) + g), i = r = Math.round(u - y - g), T(y) ? n.horiz ? (i = l, r = u - n.bottom, e = o = x(e, h, h + n.width)) : (e = h, o = f - n.right, i = r = x(i, l, l + n.height)) : (s = !0, v = !1), t.path = s && !v ? void 0 : a.renderer.crispLine([["M", e, i], ["L", o, r]], d || 1)
                }), b.path
            }, t.prototype.getLinearTickPositions = function (t, e, i) {
                var o, r, s, n = y(Math.floor(e / t) * t), a = y(Math.ceil(i / t) * t), h = [];
                if (y(n + t) === n && (s = 20), this.single) return [e];
                for (o = n; o <= a && (h.push(o), (o = y(o + t, s)) !== r);) r = o;
                return h
            }, t.prototype.getMinorTickInterval = function () {
                var t = this.options, e = t.minorTicks, i = t.minorTickInterval;
                return !0 === e ? E(i, "auto") : !1 !== e ? i : void 0
            }, t.prototype.getMinorTickPositions = function () {
                var t, e = this.options, i = this.tickPositions, o = this.minorTickInterval,
                    r = this.pointRangePadding || 0, s = (this.min || 0) - r, n = (this.max || 0) + r, a = n - s,
                    h = [];
                if (a && a / o < this.len / 3) {
                    var l = this.logarithmic;
                    if (l) this.paddedTicks.forEach(function (t, e, i) {
                        e && h.push.apply(h, l.getLogTickPositions(o, i[e - 1], i[e], !0))
                    }); else if (this.dateTime && "auto" === this.getMinorTickInterval()) h = h.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(o), s, n, e.startOfWeek)); else for (t = s + (i[0] - s) % o; t <= n && t !== h[0]; t += o) h.push(t)
                }
                return 0 !== h.length && this.trimTicks(h), h
            }, t.prototype.adjustForMinRange = function () {
                var t, e, i, o, r = this.options, s = this.logarithmic, n = this.max, a = this.min, h = this.minRange;
                this.isXAxis && void 0 === h && !s && (h = v(r.min) || v(r.max) || v(r.floor) || v(r.ceiling) ? null : Math.min(5 * (w(this.series.map(function (t) {
                    var e;
                    return (t.xIncrement ? null === (e = t.xData) || void 0 === e ? void 0 : e.slice(0, 2) : t.xData) || []
                })) || 0), this.dataMax - this.dataMin)), T(n) && T(a) && T(h) && n - a < h && (e = this.dataMax - this.dataMin >= h, t = (h - n + a) / 2, i = [a - t, E(r.min, a - t)], e && (i[2] = s ? s.log2lin(this.dataMin) : this.dataMin), o = [(a = f(i)) + h, E(r.max, a + h)], e && (o[2] = s ? s.log2lin(this.dataMax) : this.dataMax), (n = g(o)) - a < h && (i[0] = n - h, i[1] = E(r.min, n - h), a = f(i))), this.minRange = h, this.min = a, this.max = n
            }, t.prototype.getClosest = function () {
                var t, e;
                if (this.categories) e = 1; else {
                    var i = [];
                    this.series.forEach(function (t) {
                        var o, r = t.closestPointRange;
                        (null === (o = t.xData) || void 0 === o ? void 0 : o.length) === 1 ? i.push(t.xData[0]) : !t.noSharedTooltip && v(r) && t.reserveSpace() && (e = v(e) ? Math.min(e, r) : r)
                    }), i.length && (i.sort(function (t, e) {
                        return t - e
                    }), t = w([i]))
                }
                return t && e ? Math.min(t, e) : t || e
            }, t.prototype.nameToX = function (t) {
                var e, i = A(this.options.categories), o = i ? this.categories : this.names, r = t.options.x;
                return t.series.requireSorting = !1, v(r) || (r = this.options.uniqueNames && o ? i ? o.indexOf(t.name) : E(o.keys[t.name], -1) : t.series.autoIncrement()), -1 === r ? !i && o && (e = o.length) : e = r, void 0 !== e ? (this.names[e] = t.name, this.names.keys[t.name] = e) : t.x && (e = t.x), e
            }, t.prototype.updateNames = function () {
                var t = this, e = this.names;
                e.length > 0 && (Object.keys(e.keys).forEach(function (t) {
                    delete e.keys[t]
                }), e.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (e) {
                    e.xIncrement = null, (!e.points || e.isDirtyData) && (t.max = Math.max(t.max, e.xData.length - 1), e.processData(), e.generatePoints()), e.data.forEach(function (i, o) {
                        var r;
                        (null == i ? void 0 : i.options) && void 0 !== i.name && void 0 !== (r = t.nameToX(i)) && r !== i.x && (i.x = r, e.xData[o] = r)
                    })
                }))
            }, t.prototype.setAxisTranslation = function () {
                var t, e, i = this, o = i.max - i.min, r = i.linkedParent, s = !!i.categories, n = i.isXAxis,
                    a = i.axisPointRange || 0, h = 0, l = 0, c = i.transA;
                (n || s || a) && (t = i.getClosest(), r ? (h = r.minPointOffset, l = r.pointRangePadding) : i.series.forEach(function (e) {
                    var o = s ? 1 : n ? E(e.options.pointRange, t, 0) : i.axisPointRange || 0,
                        r = e.options.pointPlacement;
                    if (a = Math.max(a, o), !i.single || s) {
                        var c = e.is("xrange") ? !n : n;
                        h = Math.max(h, c && P(r) ? 0 : o / 2), l = Math.max(l, c && "on" === r ? 0 : o)
                    }
                }), e = i.ordinal && i.ordinal.slope && t ? i.ordinal.slope / t : 1, i.minPointOffset = h *= e, i.pointRangePadding = l *= e, i.pointRange = Math.min(a, i.single && s ? 1 : o), n && t && (i.closestPointRange = t)), i.translationSlope = i.transA = c = i.staticScale || i.len / (o + l || 1), i.transB = i.horiz ? i.left : i.bottom, i.minPixelPadding = c * h, S(this, "afterSetAxisTranslation")
            }, t.prototype.minFromRange = function () {
                var t = this.max, e = this.min;
                return T(t) && T(e) && t - e || void 0
            }, t.prototype.setTickInterval = function (t) {
                var e, i, o, r, s, n, a, h, l, c = this.categories, p = this.chart, d = this.dataMax, u = this.dataMin,
                    f = this.dateTime, g = this.isXAxis, m = this.logarithmic, x = this.options, b = this.softThreshold,
                    C = T(this.threshold) ? this.threshold : void 0, w = this.minRange || 0, k = x.ceiling, A = x.floor,
                    P = x.linkedTo, L = x.softMax, j = x.softMin,
                    O = T(P) && (null === (e = p[this.coll]) || void 0 === e ? void 0 : e[P]), D = x.tickPixelInterval,
                    B = x.maxPadding, I = x.minPadding, z = 0,
                    N = T(x.tickInterval) && x.tickInterval >= 0 ? x.tickInterval : void 0;
                if (f || c || O || this.getTickAmount(), h = E(this.userMin, x.min), l = E(this.userMax, x.max), O ? (this.linkedParent = O, s = O.getExtremes(), this.min = E(s.min, s.dataMin), this.max = E(s.max, s.dataMax), x.type !== O.options.type && M(11, !0, p)) : (b && v(C) && T(d) && T(u) && (u >= C ? (n = C, I = 0) : d <= C && (a = C, B = 0)), this.min = E(h, n, u), this.max = E(l, a, d)), T(this.max) && T(this.min) && (m && (this.positiveValuesOnly && !t && 0 >= Math.min(this.min, E(u, this.min)) && M(10, !0, p), this.min = y(m.log2lin(this.min), 16), this.max = y(m.log2lin(this.max), 16)), this.range && T(u) && (this.userMin = this.min = h = Math.max(u, this.minFromRange() || 0), this.userMax = l = this.max, this.range = void 0)), S(this, "foundExtremes"), this.adjustForMinRange(), T(this.min) && T(this.max)) {
                    if (!T(this.userMin) && T(j) && j < this.min && (this.min = h = j), !T(this.userMax) && T(L) && L > this.max && (this.max = l = L), c || this.axisPointRange || (null === (i = this.stacking) || void 0 === i ? void 0 : i.usePercentage) || O || !(z = this.max - this.min) || (!v(h) && I && (this.min -= z * I), v(l) || !B || (this.max += z * B)), !T(this.userMin) && T(A) && (this.min = Math.max(this.min, A)), !T(this.userMax) && T(k) && (this.max = Math.min(this.max, k)), b && T(u) && T(d)) {
                        var _ = C || 0;
                        !v(h) && this.min < _ && u >= _ ? this.min = x.minRange ? Math.min(_, this.max - w) : _ : !v(l) && this.max > _ && d <= _ && (this.max = x.minRange ? Math.max(_, this.min + w) : _)
                    }
                    !p.polar && this.min > this.max && (v(x.min) ? this.max = this.min : v(x.max) && (this.min = this.max)), z = this.max - this.min
                }
                if (this.min !== this.max && T(this.min) && T(this.max) ? O && !N && D === O.options.tickPixelInterval ? this.tickInterval = N = O.tickInterval : this.tickInterval = E(N, this.tickAmount ? z / Math.max(this.tickAmount - 1, 1) : void 0, c ? 1 : z * D / Math.max(this.len, D)) : this.tickInterval = 1, g && !t) {
                    var G = this.min !== (null === (o = this.old) || void 0 === o ? void 0 : o.min) || this.max !== (null === (r = this.old) || void 0 === r ? void 0 : r.max);
                    this.series.forEach(function (t) {
                        var e;
                        t.forceCrop = null === (e = t.forceCropping) || void 0 === e ? void 0 : e.call(t), t.processData(G)
                    }), S(this, "postProcessData", {hasExtremesChanged: G})
                }
                this.setAxisTranslation(), S(this, "initialAxisTranslation"), this.pointRange && !N && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
                var W = E(x.minTickInterval, f && !this.series.some(function (t) {
                    return t.noSharedTooltip
                }) ? this.closestPointRange : 0);
                !N && this.tickInterval < W && (this.tickInterval = W), f || m || N || (this.tickInterval = R(this, this.tickInterval)), this.tickAmount || (this.tickInterval = this.unsquish()), this.setTickPositions()
            }, t.prototype.setTickPositions = function () {
                var t, e, i, o = this.options, r = o.tickPositions, s = o.tickPositioner,
                    n = this.getMinorTickInterval(), a = this.hasVerticalPanning(), h = "colorAxis" === this.coll,
                    l = (h || !a) && o.startOnTick, c = (h || !a) && o.endOnTick, p = [];
                if (this.tickmarkOffset = this.categories && "between" === o.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0, this.minorTickInterval = "auto" === n && this.tickInterval ? this.tickInterval / o.minorTicksPerMajor : n, this.single = this.min === this.max && v(this.min) && !this.tickAmount && (this.min % 1 == 0 || !1 !== o.allowDecimals), r) p = r.slice(); else if (T(this.min) && T(this.max)) {
                    if (!(null === (t = this.ordinal) || void 0 === t ? void 0 : t.positions) && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) p = [this.min, this.max], M(19, !1, this.chart); else if (this.dateTime) p = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, o.units), this.min, this.max, o.startOfWeek, null === (e = this.ordinal) || void 0 === e ? void 0 : e.positions, this.closestPointRange, !0); else if (this.logarithmic) p = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max); else for (var d = this.tickInterval, u = d; u <= 2 * d;) if (p = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && p.length > this.tickAmount) this.tickInterval = R(this, u *= 1.1); else break;
                    p.length > this.len && (p = [p[0], p[p.length - 1]])[0] === p[1] && (p.length = 1), s && (this.tickPositions = p, (i = s.apply(this, [this.min, this.max])) && (p = i))
                }
                this.tickPositions = p, this.paddedTicks = p.slice(0), this.trimTicks(p, l, c), !this.isLinked && T(this.min) && T(this.max) && (this.single && p.length < 2 && !this.categories && !this.series.some(function (t) {
                    return t.is("heatmap") && "between" === t.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), r || i || this.adjustTickAmount()), S(this, "afterSetTickPositions")
            }, t.prototype.trimTicks = function (t, e, i) {
                var o = t[0], r = t[t.length - 1], s = !this.isOrdinal && this.minPointOffset || 0;
                if (S(this, "trimTicks"), !this.isLinked) {
                    if (e && o !== -1 / 0) this.min = o; else for (; this.min - s > t[0];) t.shift();
                    if (i) this.max = r; else for (; this.max + s < t[t.length - 1];) t.pop();
                    0 === t.length && v(o) && !this.options.tickPositions && t.push((r + o) / 2)
                }
            }, t.prototype.alignToOthers = function () {
                var t, e = this, i = [this], o = e.options, r = this.chart.options.chart,
                    s = "yAxis" === this.coll && r.alignThresholds, n = [];
                if (e.thresholdAlignment = void 0, (!1 !== r.alignTicks && o.alignTicks || s) && !1 !== o.startOnTick && !1 !== o.endOnTick && !e.logarithmic) {
                    var a = function (t) {
                        var e = t.horiz, i = t.options;
                        return [e ? i.left : i.top, i.width, i.height, i.pane].join(",")
                    }, h = a(this);
                    this.chart[this.coll].forEach(function (o) {
                        var r = o.series;
                        r.length && r.some(function (t) {
                            return t.visible
                        }) && o !== e && a(o) === h && (t = !0, i.push(o))
                    })
                }
                if (t && s) {
                    i.forEach(function (t) {
                        var i = t.getThresholdAlignment(e);
                        T(i) && n.push(i)
                    });
                    var l = n.length > 1 ? n.reduce(function (t, e) {
                        return t + e
                    }, 0) / n.length : void 0;
                    i.forEach(function (t) {
                        t.thresholdAlignment = l
                    })
                }
                return t
            }, t.prototype.getThresholdAlignment = function (t) {
                if ((!T(this.dataMin) || this !== t && this.series.some(function (t) {
                    return t.isDirty || t.isDirtyData
                })) && this.getSeriesExtremes(), T(this.threshold)) {
                    var e = m((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1);
                    return this.options.reversed && (e = 1 - e), e
                }
            }, t.prototype.getTickAmount = function () {
                var t = this.options, e = t.tickPixelInterval, i = t.tickAmount;
                v(t.tickInterval) || i || !(this.len < e) || this.isRadial || this.logarithmic || !t.startOnTick || !t.endOnTick || (i = 2), !i && this.alignToOthers() && (i = Math.ceil(this.len / e) + 1), i < 4 && (this.finalTickAmt = i, i = 5), this.tickAmount = i
            }, t.prototype.adjustTickAmount = function () {
                var t, e, i, o = this, r = o.finalTickAmt, s = o.max, n = o.min, a = o.options, h = o.tickPositions,
                    l = o.tickAmount, c = o.thresholdAlignment, p = null == h ? void 0 : h.length,
                    d = E(o.threshold, o.softThreshold ? 0 : null), u = o.tickInterval, f = function () {
                        return h.push(y(h[h.length - 1] + u))
                    }, g = function () {
                        return h.unshift(y(h[0] - u))
                    };
                if (T(c) && (i = c < .5 ? Math.ceil(c * (l - 1)) : Math.floor(c * (l - 1)), a.reversed && (i = l - 1 - i)), o.hasData() && T(n) && T(s)) {
                    var m = function () {
                        o.transA *= (p - 1) / (l - 1), o.min = a.startOnTick ? h[0] : Math.min(n, h[0]), o.max = a.endOnTick ? h[h.length - 1] : Math.max(s, h[h.length - 1])
                    };
                    if (T(i) && T(o.threshold)) {
                        for (; h[i] !== d || h.length !== l || h[0] > n || h[h.length - 1] < s;) {
                            for (h.length = 0, h.push(o.threshold); h.length < l;) void 0 === h[i] || h[i] > o.threshold ? g() : f();
                            if (u > 8 * o.tickInterval) break;
                            u *= 2
                        }
                        m()
                    } else if (p < l) {
                        for (; h.length < l;) h.length % 2 || n === d ? f() : g();
                        m()
                    }
                    if (v(r)) {
                        for (e = t = h.length; e--;) (3 === r && e % 2 == 1 || r <= 2 && e > 0 && e < t - 1) && h.splice(e, 1);
                        o.finalTickAmt = void 0
                    }
                }
            }, t.prototype.setScale = function () {
                var t, e, i = this.coll, o = this.stacking, r = !1, s = !1;
                this.series.forEach(function (t) {
                    r = r || t.isDirtyData || t.isDirty, s = s || t.xAxis && t.xAxis.isDirty || !1
                }), this.setAxisSize();
                var n = this.len !== (this.old && this.old.len);
                n || r || s || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (o && "yAxis" === i && o.buildStacks(), this.forceRedraw = !1, this.userMinRange || (this.minRange = void 0), this.getSeriesExtremes(), this.setTickInterval(), o && "xAxis" === i && o.buildStacks(), this.isDirty || (this.isDirty = n || this.min !== (null === (t = this.old) || void 0 === t ? void 0 : t.min) || this.max !== (null === (e = this.old) || void 0 === e ? void 0 : e.max))) : o && o.cleanStacks(), r && this.panningState && (this.panningState.isDirty = !0), S(this, "afterSetScale")
            }, t.prototype.setExtremes = function (t, e, i, o, r) {
                void 0 === i && (i = !0);
                var s = this, n = s.chart;
                s.series.forEach(function (t) {
                    delete t.kdTree
                }), S(s, "setExtremes", r = C(r, {min: t, max: e}), function () {
                    s.userMin = t, s.userMax = e, s.eventArgs = r, i && n.redraw(o)
                })
            }, t.prototype.zoom = function (t, e) {
                var i = this, o = this.dataMin, r = this.dataMax, s = this.options, n = Math.min(o, E(s.min, o)),
                    a = Math.max(r, E(s.max, r)), h = {newMin: t, newMax: e};
                return S(this, "zoom", h, function (t) {
                    var e = t.newMin, s = t.newMax;
                    (e !== i.min || s !== i.max) && (!i.allowZoomOutside && (v(o) && (e < n && (e = n), e > a && (e = a)), v(r) && (s < n && (s = n), s > a && (s = a))), i.displayBtn = void 0 !== e || void 0 !== s, i.setExtremes(e, s, !1, void 0, {trigger: "zoom"})), t.zoomed = !0
                }), h.zoomed
            }, t.prototype.setAxisSize = function () {
                var t = this.chart, e = this.options, i = e.offsets || [0, 0, 0, 0], o = this.horiz,
                    r = this.width = Math.round(D(E(e.width, t.plotWidth - i[3] + i[1]), t.plotWidth)),
                    s = this.height = Math.round(D(E(e.height, t.plotHeight - i[0] + i[2]), t.plotHeight)),
                    n = this.top = Math.round(D(E(e.top, t.plotTop + i[0]), t.plotHeight, t.plotTop)),
                    a = this.left = Math.round(D(E(e.left, t.plotLeft + i[3]), t.plotWidth, t.plotLeft));
                this.bottom = t.chartHeight - s - n, this.right = t.chartWidth - r - a, this.len = Math.max(o ? r : s, 0), this.pos = o ? a : n
            }, t.prototype.getExtremes = function () {
                var t = this.logarithmic;
                return {
                    min: t ? y(t.lin2log(this.min)) : this.min,
                    max: t ? y(t.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            }, t.prototype.getThreshold = function (t) {
                var e = this.logarithmic, i = e ? e.lin2log(this.min) : this.min,
                    o = e ? e.lin2log(this.max) : this.max;
                return null === t || t === -1 / 0 ? t = i : t === 1 / 0 ? t = o : i > t ? t = i : o < t && (t = o), this.translate(t, 0, 1, 0, 1)
            }, t.prototype.autoLabelAlign = function (t) {
                var e = (E(t, 0) - 90 * this.side + 720) % 360, i = {align: "center"};
                return S(this, "autoLabelAlign", i, function (t) {
                    e > 15 && e < 165 ? t.align = "right" : e > 195 && e < 345 && (t.align = "left")
                }), i.align
            }, t.prototype.tickSize = function (t) {
                var e, i = this.options,
                    o = E(i["tick" === t ? "tickWidth" : "minorTickWidth"], "tick" === t && this.isXAxis && !this.categories ? 1 : 0),
                    r = i["tick" === t ? "tickLength" : "minorTickLength"];
                o && r && ("inside" === i[t + "Position"] && (r = -r), e = [r, o]);
                var s = {tickSize: e};
                return S(this, "afterTickSize", s), s.tickSize
            }, t.prototype.labelMetrics = function () {
                var t = this.chart.renderer, e = this.ticks, i = e[Object.keys(e)[0]] || {};
                return this.chart.renderer.fontMetrics(i.label || i.movedLabel || t.box)
            }, t.prototype.unsquish = function () {
                var t, e, i = this.options.labels, o = this.horiz, r = this.tickInterval,
                    s = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / r), n = i.rotation,
                    a = this.labelMetrics().h, h = Math.max(this.max - this.min, 0), l = function (t) {
                        var e = t / (s || 1);
                        return (e = e > 1 ? Math.ceil(e) : 1) * r > h && t !== 1 / 0 && s !== 1 / 0 && h && (e = Math.ceil(h / r)), y(e * r)
                    }, c = r, p = Number.MAX_VALUE;
                if (o) {
                    if (!i.staggerLines && (T(n) ? e = [n] : s < i.autoRotationLimit && (e = i.autoRotation)), e) for (var d = void 0, f = void 0, g = 0, m = e; g < m.length; g++) {
                        var v = m[g];
                        (v === n || v && v >= -90 && v <= 90) && (f = (d = l(Math.abs(a / Math.sin(u * v)))) + Math.abs(v / 360)) < p && (p = f, t = v, c = d)
                    }
                } else c = l(.75 * a);
                return this.autoRotation = e, this.labelRotation = E(t, T(n) ? n : 0), i.step ? r : c
            }, t.prototype.getSlotWidth = function (t) {
                var e = this.chart, i = this.horiz, o = this.options.labels,
                    r = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), s = e.margin[3];
                if (t && T(t.slotWidth)) return t.slotWidth;
                if (i && o.step < 2) return o.rotation ? 0 : (this.staggerLines || 1) * this.len / r;
                if (!i) {
                    var n = o.style.width;
                    if (void 0 !== n) return parseInt(String(n), 10);
                    if (s) return s - e.spacing[3]
                }
                return .33 * e.chartWidth
            }, t.prototype.renderUnsquish = function () {
                var t, e, i, o, r = this.chart, s = r.renderer, n = this.tickPositions, a = this.ticks,
                    h = this.options.labels, l = h.style, c = this.horiz, p = this.getSlotWidth(),
                    d = Math.max(1, Math.round(p - 2 * h.padding)), u = {}, f = this.labelMetrics(), g = l.textOverflow,
                    m = 0;
                if (P(h.rotation) || (u.rotation = h.rotation || 0), n.forEach(function (t) {
                    var e = a[t];
                    e.movedLabel && e.replaceMovedLabel(), e && e.label && e.label.textPxLength > m && (m = e.label.textPxLength)
                }), this.maxLabelLength = m, this.autoRotation) m > d && m > f.h ? u.rotation = this.labelRotation : this.labelRotation = 0; else if (p && (t = d, !g)) for (e = "clip", o = n.length; !c && o--;) (i = a[n[o]].label) && (i.styles && "ellipsis" === i.styles.textOverflow ? i.css({textOverflow: "clip"}) : i.textPxLength > p && i.css({width: p + "px"}), i.getBBox().height > this.len / n.length - (f.h - f.f) && (i.specificTextOverflow = "ellipsis"));
                u.rotation && (t = m > .5 * r.chartHeight ? .33 * r.chartHeight : m, g || (e = "ellipsis")), this.labelAlign = h.align || this.autoLabelAlign(this.labelRotation), this.labelAlign && (u.align = this.labelAlign), n.forEach(function (i) {
                    var o = a[i], r = o && o.label, s = l.width, n = {};
                    r && (r.attr(u), o.shortenLabel ? o.shortenLabel() : t && !s && "nowrap" !== l.whiteSpace && (t < r.textPxLength || "SPAN" === r.element.tagName) ? (n.width = t + "px", g || (n.textOverflow = r.specificTextOverflow || e), r.css(n)) : r.styles && r.styles.width && !n.width && !s && r.css({width: null}), delete r.specificTextOverflow, o.rotation = u.rotation)
                }, this), this.tickRotCorr = s.rotCorr(f.b, this.labelRotation || 0, 0 !== this.side)
            }, t.prototype.hasData = function () {
                return this.series.some(function (t) {
                    return t.hasData()
                }) || this.options.showEmpty && v(this.min) && v(this.max)
            }, t.prototype.addTitle = function (t) {
                var e, i = this.chart.renderer, o = this.horiz, r = this.opposite, s = this.options.title,
                    n = this.chart.styledMode;
                this.axisTitle || ((e = s.textAlign) || (e = (o ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: r ? "right" : "left",
                    middle: "center",
                    high: r ? "left" : "right"
                })[s.align]), this.axisTitle = i.text(s.text || "", 0, 0, s.useHTML).attr({
                    zIndex: 7,
                    rotation: s.rotation || 0,
                    align: e
                }).addClass("highcharts-axis-title"), n || this.axisTitle.css(L(s.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0), n || s.style.width || this.isRadial || this.axisTitle.css({width: this.len + "px"}), this.axisTitle[t ? "show" : "hide"](t)
            }, t.prototype.generateTick = function (t) {
                var e = this.ticks;
                e[t] ? e[t].addLabel() : e[t] = new n(this, t)
            }, t.prototype.createGroups = function () {
                var t = this, e = this.axisParent, i = this.chart, o = this.coll, r = this.options, s = i.renderer,
                    n = function (i, n, a) {
                        return s.g(i).attr({zIndex: a}).addClass("highcharts-".concat(o.toLowerCase()).concat(n, " ") + (t.isRadial ? "highcharts-radial-axis".concat(n, " ") : "") + (r.className || "")).add(e)
                    };
                this.axisGroup || (this.gridGroup = n("grid", "-grid", r.gridZIndex), this.axisGroup = n("axis", "", r.zIndex), this.labelGroup = n("axis-labels", "-labels", r.labels.zIndex))
            }, t.prototype.getOffset = function () {
                var t, e, i, o, r = this, s = r.chart, n = r.horiz, a = r.options, h = r.side, l = r.ticks,
                    c = r.tickPositions, p = r.coll, d = s.inverted && !r.isZAxis ? [1, 0, 3, 2][h] : h,
                    u = r.hasData(), f = a.title, g = a.labels, m = T(a.crossing), y = s.axisOffset, x = s.clipOffset,
                    b = [-1, 1, 1, -1][h], M = 0, C = 0, w = 0;
                if (r.showAxis = t = u || a.showEmpty, r.staggerLines = r.horiz && g.staggerLines || void 0, r.createGroups(), u || r.isLinked ? (c.forEach(function (t) {
                    r.generateTick(t)
                }), r.renderUnsquish(), r.reserveSpaceDefault = 0 === h || 2 === h || ({
                    1: "left",
                    3: "right"
                })[h] === r.labelAlign, E(g.reserveSpace, !m && null, "center" === r.labelAlign || null, r.reserveSpaceDefault) && c.forEach(function (t) {
                    w = Math.max(l[t].getLabelSize(), w)
                }), r.staggerLines && (w *= r.staggerLines), r.labelOffset = w * (r.opposite ? -1 : 1)) : O(l, function (t, e) {
                    t.destroy(), delete l[e]
                }), (null == f ? void 0 : f.text) && !1 !== f.enabled && (r.addTitle(t), t && !m && !1 !== f.reserveSpace && (r.titleOffset = M = r.axisTitle.getBBox()[n ? "height" : "width"], C = v(e = f.offset) ? 0 : E(f.margin, n ? 5 : 10))), r.renderLine(), r.offset = b * E(a.offset, y[h] ? y[h] + (a.margin || 0) : 0), r.tickRotCorr = r.tickRotCorr || {
                    x: 0,
                    y: 0
                }, o = 0 === h ? -r.labelMetrics().h : 2 === h ? r.tickRotCorr.y : 0, i = Math.abs(w) + C, w && (i -= o, i += b * (n ? E(g.y, r.tickRotCorr.y + b * g.distance) : E(g.x, b * g.distance))), r.axisTitleMargin = E(e, i), r.getMaxLabelDimensions && (r.maxLabelDimensions = r.getMaxLabelDimensions(l, c)), "colorAxis" !== p) {
                    var k = this.tickSize("tick");
                    y[h] = Math.max(y[h], (r.axisTitleMargin || 0) + M + b * r.offset, i, c && c.length && k ? k[0] + b * r.offset : 0);
                    var A = !r.axisLine || a.offset ? 0 : 2 * Math.floor(r.axisLine.strokeWidth() / 2);
                    x[d] = Math.max(x[d], A)
                }
                S(this, "afterGetOffset")
            }, t.prototype.getLinePath = function (t) {
                var e = this.chart, i = this.opposite, o = this.offset, r = this.horiz,
                    s = this.left + (i ? this.width : 0) + o,
                    n = e.chartHeight - this.bottom - (i ? this.height : 0) + o;
                return i && (t *= -1), e.renderer.crispLine([["M", r ? this.left : s, r ? n : this.top], ["L", r ? e.chartWidth - this.right : s, r ? n : e.chartHeight - this.bottom]], t)
            }, t.prototype.renderLine = function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            }, t.prototype.getTitlePosition = function (t) {
                var e = this.horiz, i = this.left, o = this.top, r = this.len, s = this.options.title, n = e ? i : o,
                    a = this.opposite, h = this.offset, l = s.x, c = s.y, p = this.chart.renderer.fontMetrics(t),
                    d = t ? Math.max(t.getBBox(!1, 0).height - p.h - 1, 0) : 0,
                    u = {low: n + (e ? 0 : r), middle: n + r / 2, high: n + (e ? r : 0)}[s.align],
                    f = (e ? o + this.height : i) + (e ? 1 : -1) * (a ? -1 : 1) * (this.axisTitleMargin || 0) + [-d, d, p.f, -d][this.side],
                    g = {
                        x: e ? u + l : f + (a ? this.width : 0) + h + l,
                        y: e ? f + c - (a ? this.height : 0) + h : u + c
                    };
                return S(this, "afterGetTitlePosition", {titlePosition: g}), g
            }, t.prototype.renderMinorTick = function (t, e) {
                var i = this.minorTicks;
                i[t] || (i[t] = new n(this, t, "minor")), e && i[t].isNew && i[t].render(null, !0), i[t].render(null, !1, 1)
            }, t.prototype.renderTick = function (t, e, i) {
                var o = this.isLinked, r = this.ticks;
                (!o || t >= this.min && t <= this.max || this.grid && this.grid.isColumn) && (r[t] || (r[t] = new n(this, t)), i && r[t].isNew && r[t].render(e, !0, -1), r[t].render(e))
            }, t.prototype.render = function () {
                var t, e, i = this, o = i.chart, r = i.logarithmic, a = o.renderer, l = i.options, c = i.isLinked,
                    p = i.tickPositions, d = i.axisTitle, u = i.ticks, f = i.minorTicks, g = i.alternateBands,
                    m = l.stackLabels, y = l.alternateGridColor, v = l.crossing, x = i.tickmarkOffset, b = i.axisLine,
                    M = i.showAxis, C = h(a.globalAnimation);
                if (i.labelEdge.length = 0, i.overlap = !1, [u, f, g].forEach(function (t) {
                    O(t, function (t) {
                        t.isActive = !1
                    })
                }), T(v)) {
                    var w = this.isXAxis ? o.yAxis[0] : o.xAxis[0], k = [1, -1, -1, 1][this.side];
                    if (w) {
                        var A = w.toPixels(v, !0);
                        i.horiz && (A = w.len - A), i.offset = k * A
                    }
                }
                if (i.hasData() || c) {
                    var P = i.chart.hasRendered && i.old && T(i.old.min);
                    i.minorTickInterval && !i.categories && i.getMinorTickPositions().forEach(function (t) {
                        i.renderMinorTick(t, P)
                    }), p.length && (p.forEach(function (t, e) {
                        i.renderTick(t, e, P)
                    }), x && (0 === i.min || i.single) && (u[-1] || (u[-1] = new n(i, -1, null, !0)), u[-1].render(-1))), y && p.forEach(function (n, a) {
                        e = void 0 !== p[a + 1] ? p[a + 1] + x : i.max - x, a % 2 == 0 && n < i.max && e <= i.max + (o.polar ? -x : x) && (g[n] || (g[n] = new s.PlotLineOrBand(i, {})), t = n + x, g[n].options = {
                            from: r ? r.lin2log(t) : t,
                            to: r ? r.lin2log(e) : e,
                            color: y,
                            className: "highcharts-alternate-grid"
                        }, g[n].render(), g[n].isActive = !0)
                    }), i._addedPlotLB || (i._addedPlotLB = !0, (l.plotLines || []).concat(l.plotBands || []).forEach(function (t) {
                        i.addPlotBandOrLine(t)
                    }))
                }
                [u, f, g].forEach(function (t) {
                    var e = [], i = C.duration;
                    O(t, function (t, i) {
                        t.isActive || (t.render(i, !1, 0), t.isActive = !1, e.push(i))
                    }), z(function () {
                        for (var i = e.length; i--;) t[e[i]] && !t[e[i]].isActive && (t[e[i]].destroy(), delete t[e[i]])
                    }, t !== g && o.hasRendered && i ? i : 0)
                }), b && (b[b.isPlaced ? "animate" : "attr"]({d: this.getLinePath(b.strokeWidth())}), b.isPlaced = !0, b[M ? "show" : "hide"](M)), d && M && (d[d.isNew ? "attr" : "animate"](i.getTitlePosition(d)), d.isNew = !1), m && m.enabled && i.stacking && i.stacking.renderStackTotals(), i.old = {
                    len: i.len,
                    max: i.max,
                    min: i.min,
                    transA: i.transA,
                    userMax: i.userMax,
                    userMin: i.userMin
                }, i.isDirty = !1, S(this, "afterRender")
            }, t.prototype.redraw = function () {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function (t) {
                    t.render()
                })), this.series.forEach(function (t) {
                    t.isDirty = !0
                })
            }, t.prototype.getKeepProps = function () {
                return this.keepProps || t.keepProps
            }, t.prototype.destroy = function (t) {
                var e = this, i = e.plotLinesAndBands, o = this.eventOptions;
                if (S(this, "destroy", {keepEvents: t}), t || B(e), [e.ticks, e.minorTicks, e.alternateBands].forEach(function (t) {
                    x(t)
                }), i) for (var r = i.length; r--;) i[r].destroy();
                for (var s in ["axisLine", "axisTitle", "axisGroup", "gridGroup", "labelGroup", "cross", "scrollbar"].forEach(function (t) {
                    e[t] && (e[t] = e[t].destroy())
                }), e.plotLinesAndBandsGroups) e.plotLinesAndBandsGroups[s] = e.plotLinesAndBandsGroups[s].destroy();
                O(e, function (t, i) {
                    -1 === e.getKeepProps().indexOf(i) && delete e[i]
                }), this.eventOptions = o
            }, t.prototype.drawCrosshair = function (t, e) {
                var o, r, s, n, a = this.crosshair, h = E(a && a.snap, !0), l = this.chart, c = this.cross;
                if (S(this, "drawCrosshair", {
                    e: t,
                    point: e
                }), t || (t = this.cross && this.cross.e), a && !1 !== (v(e) || !h)) {
                    if (h ? v(e) && (r = E("colorAxis" !== this.coll ? e.crosshairPos : null, this.isXAxis ? e.plotX : this.len - e.plotY)) : r = t && (this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos), v(r) && (n = {
                        value: e && (this.isXAxis ? e.x : E(e.stackY, e.y)),
                        translatedValue: r
                    }, l.polar && C(n, {
                        isCrosshair: !0,
                        chartX: t && t.chartX,
                        chartY: t && t.chartY,
                        point: e
                    }), o = this.getPlotLinePath(n) || null), !v(o)) {
                        this.hideCrosshair();
                        return
                    }
                    s = this.categories && !this.isRadial, c || (this.cross = c = l.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (s ? "category " : "thin ") + (a.className || "")).attr({zIndex: E(a.zIndex, 2)}).add(), !l.styledMode && (c.attr({
                        stroke: a.color || (s ? i.parse("#ccd3ff").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": E(a.width, 1)
                    }).css({"pointer-events": "none"}), a.dashStyle && c.attr({dashstyle: a.dashStyle}))), c.show().attr({d: o}), s && !a.width && c.attr({"stroke-width": this.transA}), this.cross.e = t
                } else this.hideCrosshair();
                S(this, "afterDrawCrosshair", {e: t, point: e})
            }, t.prototype.hideCrosshair = function () {
                this.cross && this.cross.hide(), S(this, "afterHideCrosshair")
            }, t.prototype.hasVerticalPanning = function () {
                var t = this.chart.options.chart.panning;
                return !!(t && t.enabled && /y/.test(t.type))
            }, t.prototype.update = function (t, e) {
                var i = this.chart;
                t = L(this.userOptions, t), this.destroy(!0), this.init(i, t), i.isDirtyBox = !0, E(e, !0) && i.redraw()
            }, t.prototype.remove = function (t) {
                for (var e = this.chart, i = this.coll, o = this.series, r = o.length; r--;) o[r] && o[r].remove(!1);
                b(e.axes, this), b(e[i] || [], this), e.orderItems(i), this.destroy(), e.isDirtyBox = !0, E(t, !0) && e.redraw()
            }, t.prototype.setTitle = function (t, e) {
                this.update({title: t}, e)
            }, t.prototype.setCategories = function (t, e) {
                this.update({categories: t}, e)
            }, t.keepProps = ["coll", "extKey", "hcEvents", "names", "series", "userMax", "userMin"], t
        }()
    }), i(e, "Core/Axis/DateTimeAxis.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = t.composed, r = e.addEvent, s = e.getMagnitude, n = e.normalizeTickInterval, a = e.pushUnique,
            h = e.timeUnits;
        return function (t) {
            function e() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            }

            function i() {
                if ("datetime" !== this.options.type) {
                    this.dateTime = void 0;
                    return
                }
                this.dateTime || (this.dateTime = new l(this))
            }

            t.compose = function t(s) {
                return a(o, t) && (s.keepProps.push("dateTime"), s.prototype.getTimeTicks = e, r(s, "afterSetOptions", i)), s
            };
            var l = function () {
                function t(t) {
                    this.axis = t
                }

                return t.prototype.normalizeTimeTickInterval = function (t, e) {
                    var i,
                        o = e || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]],
                        r = o[o.length - 1], a = h[r[0]], l = r[1];
                    for (i = 0; i < o.length && (a = h[(r = o[i])[0]], l = r[1], !o[i + 1] || !(t <= (a * l[l.length - 1] + h[o[i + 1][0]]) / 2)); i++) ;
                    a === h.year && t < 5 * a && (l = [1, 2, 5]);
                    var c = n(t / a, l, "year" === r[0] ? Math.max(s(t / a), 1) : 1);
                    return {unitRange: a, count: c, unitName: r[0]}
                }, t.prototype.getXDateFormat = function (t, e) {
                    var i = this.axis, o = i.chart.time;
                    return i.closestPointRange ? o.getDateFormat(i.closestPointRange, t, i.options.startOfWeek, e) || o.resolveDTLFormat(e.year).main : o.resolveDTLFormat(e.day).main
                }, t
            }();
            t.Additions = l
        }(i || (i = {})), i
    }), i(e, "Core/Axis/LogarithmicAxis.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = t.composed, r = e.addEvent, s = e.normalizeTickInterval, n = e.pick, a = e.pushUnique;
        return function (t) {
            function e(t) {
                var e = t.userOptions, i = this.logarithmic;
                "logarithmic" !== e.type ? this.logarithmic = void 0 : i || (i = this.logarithmic = new h(this))
            }

            function i() {
                var t = this.logarithmic;
                t && (this.lin2val = function (e) {
                    return t.lin2log(e)
                }, this.val2lin = function (e) {
                    return t.log2lin(e)
                })
            }

            t.compose = function t(s) {
                return a(o, t) && (s.keepProps.push("logarithmic"), r(s, "init", e), r(s, "afterInit", i)), s
            };
            var h = function () {
                function t(t) {
                    this.axis = t
                }

                return t.prototype.getLogTickPositions = function (t, e, i, o) {
                    var r = this.axis, a = r.len, h = r.options, l = [];
                    if (o || (this.minorAutoInterval = void 0), t >= .5) t = Math.round(t), l = r.getLinearTickPositions(t, e, i); else if (t >= .08) {
                        var c = Math.floor(e), p = void 0, d = void 0, u = void 0, f = void 0, g = void 0, m = void 0,
                            y = void 0;
                        for (p = t > .3 ? [1, 2, 4] : t > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9], d = c; d < i + 1 && !y; d++) for (u = 0, f = p.length; u < f && !y; u++) (g = this.log2lin(this.lin2log(d) * p[u])) > e && (!o || m <= i) && void 0 !== m && l.push(m), m > i && (y = !0), m = g
                    } else {
                        var v = this.lin2log(e), x = this.lin2log(i), b = o ? r.getMinorTickInterval() : h.tickInterval,
                            M = "auto" === b ? null : b, C = h.tickPixelInterval / (o ? 5 : 1),
                            S = o ? a / r.tickPositions.length : a;
                        t = s(t = n(M, this.minorAutoInterval, (x - v) * C / (S || 1))), l = r.getLinearTickPositions(t, v, x).map(this.log2lin), o || (this.minorAutoInterval = t / 5)
                    }
                    return o || (r.tickInterval = t), l
                }, t.prototype.lin2log = function (t) {
                    return Math.pow(10, t)
                }, t.prototype.log2lin = function (t) {
                    return Math.log(t) / Math.LN10
                }, t
            }();
            t.Additions = h
        }(i || (i = {})), i
    }), i(e, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = t.composed, r = e.erase, s = e.extend, n = e.isNumber, a = e.pushUnique;
        return function (t) {
            var e;

            function i(t) {
                return this.addPlotBandOrLine(t, "plotBands")
            }

            function h(t, i) {
                var o = this, r = this.userOptions, s = new e(this, t);
                if (this.visible && (s = s.render()), s) {
                    if (this._addedPlotLB || (this._addedPlotLB = !0, (r.plotLines || []).concat(r.plotBands || []).forEach(function (t) {
                        o.addPlotBandOrLine(t)
                    })), i) {
                        var n = r[i] || [];
                        n.push(t), r[i] = n
                    }
                    this.plotLinesAndBands.push(s)
                }
                return s
            }

            function l(t) {
                return this.addPlotBandOrLine(t, "plotLines")
            }

            function c(t, e, i) {
                i = i || this.options;
                var o, r, s = this.getPlotLinePath({value: e, force: !0, acrossPanes: i.acrossPanes}), a = [],
                    h = this.horiz,
                    l = !n(this.min) || !n(this.max) || t < this.min && e < this.min || t > this.max && e > this.max,
                    c = this.getPlotLinePath({value: t, force: !0, acrossPanes: i.acrossPanes}), p = 1;
                if (c && s) for (l && (r = c.toString() === s.toString(), p = 0), o = 0; o < c.length; o += 2) {
                    var d = c[o], u = c[o + 1], f = s[o], g = s[o + 1];
                    ("M" === d[0] || "L" === d[0]) && ("M" === u[0] || "L" === u[0]) && ("M" === f[0] || "L" === f[0]) && ("M" === g[0] || "L" === g[0]) && (h && f[1] === d[1] ? (f[1] += p, g[1] += p) : h || f[2] !== d[2] || (f[2] += p, g[2] += p), a.push(["M", d[1], d[2]], ["L", u[1], u[2]], ["L", g[1], g[2]], ["L", f[1], f[2]], ["Z"])), a.isFlat = r
                }
                return a
            }

            function p(t) {
                this.removePlotBandOrLine(t)
            }

            function d(t) {
                var e = this.plotLinesAndBands, i = this.options, o = this.userOptions;
                if (e) {
                    for (var s = e.length; s--;) e[s].id === t && e[s].destroy();
                    [i.plotLines || [], o.plotLines || [], i.plotBands || [], o.plotBands || []].forEach(function (e) {
                        for (s = e.length; s--;) (e[s] || {}).id === t && r(e, e[s])
                    })
                }
            }

            function u(t) {
                this.removePlotBandOrLine(t)
            }

            t.compose = function t(r, n) {
                return a(o, t) && (e = r, s(n.prototype, {
                    addPlotBand: i,
                    addPlotLine: l,
                    addPlotBandOrLine: h,
                    getPlotBandPath: c,
                    removePlotBand: p,
                    removePlotLine: u,
                    removePlotBandOrLine: d
                })), n
            }
        }(i || (i = {})), i
    }), i(e, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [e["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], e["Core/Utilities.js"]], function (t, e) {
        var i = e.arrayMax, o = e.arrayMin, r = e.defined, s = e.destroyObjectProperties, n = e.erase, a = e.fireEvent,
            h = e.merge, l = e.objectEach, c = e.pick;
        return function () {
            function e(t, e) {
                this.axis = t, this.options = e, this.id = e.id
            }

            return e.compose = function (i) {
                return t.compose(e, i)
            }, e.prototype.render = function () {
                a(this, "render");
                var t, e, i, o, s = this.axis, n = this.options, p = s.horiz, d = s.logarithmic, u = n.color,
                    f = n.events, g = n.zIndex, m = void 0 === g ? 0 : g, y = {}, v = s.chart.renderer, x = n.to,
                    b = n.from, M = n.value, C = n.borderWidth, S = n.label, w = this.label, k = this.svgElem, A = [],
                    T = r(b) && r(x), P = r(M), L = !k,
                    j = {class: "highcharts-plot-" + (T ? "band " : "line ") + (n.className || "")},
                    O = T ? "bands" : "lines";
                if (!s.chart.styledMode && (P ? (j.stroke = u || "#999999", j["stroke-width"] = c(n.width, 1), n.dashStyle && (j.dashstyle = n.dashStyle)) : T && (j.fill = u || "#e6e9ff", C && (j.stroke = n.borderColor, j["stroke-width"] = C))), y.zIndex = m, O += "-" + m, (o = s.plotLinesAndBandsGroups[O]) || (s.plotLinesAndBandsGroups[O] = o = v.g("plot-" + O).attr(y).add()), k || (this.svgElem = k = v.path().attr(j).add(o)), r(M)) A = s.getPlotLinePath({
                    value: null !== (t = null == d ? void 0 : d.log2lin(M)) && void 0 !== t ? t : M,
                    lineWidth: k.strokeWidth(),
                    acrossPanes: n.acrossPanes
                }); else {
                    if (!(r(b) && r(x))) return;
                    A = s.getPlotBandPath(null !== (e = null == d ? void 0 : d.log2lin(b)) && void 0 !== e ? e : b, null !== (i = null == d ? void 0 : d.log2lin(x)) && void 0 !== i ? i : x, n)
                }
                return !this.eventsAdded && f && (l(f, function (t, e) {
                    null == k || k.on(e, function (t) {
                        f[e].apply(this, [t])
                    })
                }), this.eventsAdded = !0), (L || !k.d) && (null == A ? void 0 : A.length) ? k.attr({d: A}) : k && (A ? (k.show(), k.animate({d: A})) : k.d && (k.hide(), w && (this.label = w = w.destroy()))), S && (r(S.text) || r(S.formatter)) && (null == A ? void 0 : A.length) && s.width > 0 && s.height > 0 && !A.isFlat ? (S = h({
                    align: p && T && "center",
                    x: p ? !T && 4 : 10,
                    verticalAlign: !p && T && "middle",
                    y: p ? T ? 16 : 10 : T ? 6 : -4,
                    rotation: p && !T && 90
                }, S), this.renderLabel(S, A, T, m)) : w && w.hide(), this
            }, e.prototype.renderLabel = function (t, e, r, s) {
                var n = this.axis, a = n.chart.renderer, l = this.label;
                l || (this.label = l = a.text(this.getLabelText(t), 0, 0, t.useHTML).attr({
                    align: t.textAlign || t.align,
                    rotation: t.rotation,
                    class: "highcharts-plot-" + (r ? "band" : "line") + "-label" + (t.className || ""),
                    zIndex: s
                }), n.chart.styledMode || l.css(h({fontSize: "0.8em", textOverflow: "ellipsis"}, t.style)), l.add());
                var c = e.xBounds || [e[0][1], e[1][1], r ? e[2][1] : e[0][1]],
                    p = e.yBounds || [e[0][2], e[1][2], r ? e[2][2] : e[0][2]], d = o(c), u = o(p);
                if (l.align(t, !1, {
                    x: d,
                    y: u,
                    width: i(c) - d,
                    height: i(p) - u
                }), !l.alignValue || "left" === l.alignValue) {
                    var f = t.clip ? n.width : n.chart.chartWidth;
                    l.css({width: (90 === l.rotation ? n.height - (l.alignAttr.y - n.top) : f - (l.alignAttr.x - n.left)) + "px"})
                }
                l.show(!0)
            }, e.prototype.getLabelText = function (t) {
                return r(t.formatter) ? t.formatter.call(this) : t.text
            }, e.prototype.destroy = function () {
                n(this.axis.plotLinesAndBands, this), delete this.axis, s(this)
            }, e
        }()
    }), i(e, "Core/Tooltip.js", [e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Renderer/RendererUtilities.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o, r) {
        var s, n = t.format, a = e.composed, h = e.doc, l = e.isSafari, c = i.distribute, p = r.addEvent, d = r.clamp,
            u = r.css, f = r.discardElement, g = r.extend, m = r.fireEvent, y = r.isArray, v = r.isNumber,
            x = r.isString, b = r.merge, M = r.pick, C = r.pushUnique, S = r.splat, w = r.syncTimeout, k = function () {
                function t(t, e) {
                    this.allowShared = !0, this.crosshairs = [], this.distance = 0, this.isHidden = !0, this.isSticky = !1, this.now = {}, this.options = {}, this.outside = !1, this.chart = t, this.init(t, e)
                }

                return t.prototype.bodyFormatter = function (t) {
                    return t.map(function (t) {
                        var e = t.series.tooltipOptions;
                        return (e[(t.point.formatPrefix || "point") + "Formatter"] || t.point.tooltipFormatter).call(t.point, e[(t.point.formatPrefix || "point") + "Format"] || "")
                    })
                }, t.prototype.cleanSplit = function (t) {
                    this.chart.series.forEach(function (e) {
                        var i = e && e.tt;
                        i && (!i.isActive || t ? e.tt = i.destroy() : i.isActive = !1)
                    })
                }, t.prototype.defaultFormatter = function (t) {
                    var e, i = this.points || S(this);
                    return (e = (e = [t.tooltipFooterHeaderFormatter(i[0])]).concat(t.bodyFormatter(i))).push(t.tooltipFooterHeaderFormatter(i[0], !0)), e
                }, t.prototype.destroy = function () {
                    this.label && (this.label = this.label.destroy()), this.split && (this.cleanSplit(!0), this.tt && (this.tt = this.tt.destroy())), this.renderer && (this.renderer = this.renderer.destroy(), f(this.container)), r.clearTimeout(this.hideTimer), r.clearTimeout(this.tooltipTimeout)
                }, t.prototype.getAnchor = function (t, e) {
                    var i, o = this.chart, r = o.pointer, s = o.inverted, n = o.plotTop, a = o.plotLeft;
                    if ((t = S(t))[0].series && t[0].series.yAxis && !t[0].series.yAxis.options.reversedStacks && (t = t.slice().reverse()), this.followPointer && e) void 0 === e.chartX && (e = r.normalize(e)), i = [e.chartX - a, e.chartY - n]; else if (t[0].tooltipPos) i = t[0].tooltipPos; else {
                        var h = 0, l = 0;
                        t.forEach(function (t) {
                            var e = t.pos(!0);
                            e && (h += e[0], l += e[1])
                        }), h /= t.length, l /= t.length, this.shared && t.length > 1 && e && (s ? h = e.chartX : l = e.chartY), i = [h - a, l - n]
                    }
                    return i.map(Math.round)
                }, t.prototype.getClassName = function (t, e, i) {
                    var o = this.options, r = t.series, s = r.options;
                    return [o.className, "highcharts-label", i && "highcharts-tooltip-header", e ? "highcharts-tooltip-box" : "highcharts-tooltip", !i && "highcharts-color-" + M(t.colorIndex, r.colorIndex), s && s.className].filter(x).join(" ")
                }, t.prototype.getLabel = function () {
                    var t = this, i = this.chart.styledMode, r = this.options, s = this.split && this.allowShared,
                        n = this.container, a = this.chart.renderer;
                    if (this.label) {
                        var h = !this.label.hasClass("highcharts-label");
                        (!s && h || s && !h) && this.destroy()
                    }
                    if (!this.label) {
                        if (this.outside) {
                            var l = this.chart.options.chart.style, c = o.getRendererType();
                            this.container = n = e.doc.createElement("div"), n.className = "highcharts-tooltip-container", u(n, {
                                position: "absolute",
                                top: "1px",
                                pointerEvents: "none",
                                zIndex: Math.max(this.options.style.zIndex || 0, (l && l.zIndex || 0) + 3)
                            }), this.renderer = a = new c(n, 0, 0, l, void 0, void 0, a.styledMode)
                        }
                        if (s ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, r.shape, void 0, void 0, r.useHTML, void 0, "tooltip").attr({
                            padding: r.padding,
                            r: r.borderRadius
                        }), i || this.label.attr({
                            fill: r.backgroundColor,
                            "stroke-width": r.borderWidth || 0
                        }).css(r.style).css({pointerEvents: r.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none")})), t.outside) {
                            var p = this.label, d = p.xSetter, f = p.ySetter;
                            p.xSetter = function (e) {
                                d.call(p, t.distance), n && (n.style.left = e + "px")
                            }, p.ySetter = function (e) {
                                f.call(p, t.distance), n && (n.style.top = e + "px")
                            }
                        }
                        this.label.attr({zIndex: 8}).shadow(r.shadow).add()
                    }
                    return n && !n.parentElement && e.doc.body.appendChild(n), this.label
                }, t.prototype.getPlayingField = function () {
                    var t = h.body, e = h.documentElement, i = this.chart, o = this.distance, r = this.outside;
                    return {
                        width: r ? Math.max(t.scrollWidth, e.scrollWidth, t.offsetWidth, e.offsetWidth, e.clientWidth) - 2 * o : i.chartWidth,
                        height: r ? Math.max(t.scrollHeight, e.scrollHeight, t.offsetHeight, e.offsetHeight, e.clientHeight) : i.chartHeight
                    }
                }, t.prototype.getPosition = function (t, e, i) {
                    var o, r, s, n = this.distance, a = this.chart, h = this.outside, l = a.inverted, c = a.plotLeft,
                        p = a.plotTop, d = a.polar, u = i.plotX, f = void 0 === u ? 0 : u, g = i.plotY,
                        m = void 0 === g ? 0 : g, y = {}, v = l && i.h || 0, x = this.getPlayingField(), b = x.height,
                        C = x.width, S = a.pointer.getChartPosition(), w = function (t) {
                            return t * S.scaleX
                        }, k = function (t) {
                            return t * S.scaleY
                        }, A = function (i) {
                            var o = "x" === i;
                            return [i, o ? C : b, o ? t : e].concat(h ? [o ? w(t) : k(e), o ? S.left - n + w(f + c) : S.top - n + k(m + p), 0, o ? C : b] : [o ? t : e, o ? f + c : m + p, o ? c : p, o ? c + a.plotWidth : p + a.plotHeight])
                        }, T = A("y"), P = A("x"), L = !!i.negative;
                    !d && (null === (r = null === (o = a.hoverSeries) || void 0 === o ? void 0 : o.yAxis) || void 0 === r ? void 0 : r.reversed) && (L = !L);
                    var j = !this.followPointer && M(i.ttBelow, !d && !l === L), O = function (t, e, i, o, r, s, a) {
                        var l = h ? "y" === t ? k(n) : w(n) : n, c = (i - o) / 2, p = o < r - n, d = r + n + o < e,
                            u = r - l - i + c, f = r + l - c;
                        if (j && d) y[t] = f; else if (!j && p) y[t] = u; else if (p) y[t] = Math.min(a - o, u - v < 0 ? u : u - v); else {
                            if (!d) return !1;
                            y[t] = Math.max(s, f + v + i > e ? f : f + v)
                        }
                    }, E = function (t, e, i, o, r) {
                        if (r < n || r > e - n) return !1;
                        r < i / 2 ? y[t] = 1 : r > e - o / 2 ? y[t] = e - o - 2 : y[t] = r - i / 2
                    }, D = function (t) {
                        var e;
                        T = (e = [P, T])[0], P = e[1], s = t
                    }, B = function () {
                        !1 !== O.apply(0, T) ? !1 !== E.apply(0, P) || s || (D(!0), B()) : s ? y.x = y.y = 0 : (D(!0), B())
                    };
                    return (l && !d || this.len > 1) && D(), B(), y
                }, t.prototype.hide = function (t) {
                    var e = this;
                    r.clearTimeout(this.hideTimer), t = M(t, this.options.hideDelay), this.isHidden || (this.hideTimer = w(function () {
                        var i = e.getLabel();
                        e.getLabel().animate({opacity: 0}, {
                            duration: t ? 150 : t, complete: function () {
                                i.hide(), e.container && e.container.remove()
                            }
                        }), e.isHidden = !0
                    }, t))
                }, t.prototype.init = function (t, e) {
                    this.chart = t, this.options = e, this.crosshairs = [], this.now = {
                        x: 0,
                        y: 0
                    }, this.isHidden = !0, this.split = e.split && !t.inverted && !t.polar, this.shared = e.shared || this.split, this.outside = M(e.outside, !!(t.scrollablePixelsX || t.scrollablePixelsY))
                }, t.prototype.shouldStickOnContact = function (t) {
                    return !!(!this.followPointer && this.options.stickOnContact && (!t || this.chart.pointer.inClass(t.target, "highcharts-tooltip")))
                }, t.prototype.move = function (t, e, i, o) {
                    var s = this, n = s.now,
                        a = !1 !== s.options.animation && !s.isHidden && (Math.abs(t - n.x) > 1 || Math.abs(e - n.y) > 1),
                        h = s.followPointer || s.len > 1;
                    g(n, {
                        x: a ? (2 * n.x + t) / 3 : t,
                        y: a ? (n.y + e) / 2 : e,
                        anchorX: h ? void 0 : a ? (2 * n.anchorX + i) / 3 : i,
                        anchorY: h ? void 0 : a ? (n.anchorY + o) / 2 : o
                    }), s.getLabel().attr(n), s.drawTracker(), a && (r.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                        s && s.move(t, e, i, o)
                    }, 32))
                }, t.prototype.refresh = function (t, e) {
                    var i = this.chart, o = this.options, s = i.pointer, a = S(t), h = a[0], l = [], c = o.format,
                        p = o.formatter || this.defaultFormatter, d = this.shared, u = i.styledMode, f = {};
                    if (o.enabled && h.series) {
                        r.clearTimeout(this.hideTimer), this.allowShared = !(!y(t) && t.series && t.series.noSharedTooltip), this.followPointer = !this.split && h.series.tooltipOptions.followPointer;
                        var g = this.getAnchor(t, e), v = g[0], b = g[1];
                        d && this.allowShared ? (s.applyInactiveState(a), a.forEach(function (t) {
                            t.setState("hover"), l.push(t.getLabelConfig())
                        }), (f = h.getLabelConfig()).points = l) : f = h.getLabelConfig(), this.len = l.length;
                        var C = x(c) ? n(c, f, i) : p.call(f, this), w = h.series;
                        if (this.distance = M(w.tooltipOptions.distance, 16), !1 === C) this.hide(); else {
                            if (this.split && this.allowShared) this.renderSplit(C, a); else {
                                var k = v, A = b;
                                if (e && s.isDirectTouch && (k = e.chartX - i.plotLeft, A = e.chartY - i.plotTop), i.polar || !1 === w.options.clip || a.some(function (t) {
                                    return s.isDirectTouch || t.series.shouldShowTooltip(k, A)
                                })) {
                                    var T = this.getLabel();
                                    (!o.style.width || u) && T.css({width: (this.outside ? this.getPlayingField() : i.spacingBox).width + "px"}), T.attr({text: C && C.join ? C.join("") : C}), T.addClass(this.getClassName(h), !0), u || T.attr({stroke: o.borderColor || h.color || w.color || "#666666"}), this.updatePosition({
                                        plotX: v,
                                        plotY: b,
                                        negative: h.negative,
                                        ttBelow: h.ttBelow,
                                        h: g[2] || 0
                                    })
                                } else {
                                    this.hide();
                                    return
                                }
                            }
                            this.isHidden && this.label && this.label.attr({opacity: 1}).show(), this.isHidden = !1
                        }
                        m(this, "refresh")
                    }
                }, t.prototype.renderSplit = function (t, e) {
                    var i = this, o = i.chart, r = i.chart, s = r.chartWidth, n = r.chartHeight, a = r.plotHeight,
                        p = r.plotLeft, u = r.plotTop, f = r.pointer, m = r.scrollablePixelsY, y = r.scrollablePixelsX,
                        v = r.scrollingContainer, b = void 0 === v ? {scrollLeft: 0, scrollTop: 0} : v, C = b.scrollLeft,
                        S = b.scrollTop, w = r.styledMode, k = i.distance, A = i.options, T = i.options.positioner,
                        P = i.outside && "number" != typeof y ? h.documentElement.getBoundingClientRect() : {
                            left: C,
                            right: C + s,
                            top: S,
                            bottom: S + n
                        }, L = i.getLabel(), j = this.renderer || o.renderer, O = !!(o.xAxis[0] && o.xAxis[0].opposite),
                        E = f.getChartPosition(), D = E.left, B = E.top, I = u + S, z = 0, R = a - (void 0 === m ? 0 : m);

                    function N(t, e, o, r, s) {
                        var n, a;
                        return void 0 === s && (s = !0), o ? (n = O ? 0 : R, a = d(t - r / 2, P.left, P.right - r - (i.outside ? D : 0))) : (n = e - I, a = d(a = s ? t - r - k : t + k, s ? a : P.left, P.right)), {
                            x: a,
                            y: n
                        }
                    }

                    x(t) && (t = [!1, t]);
                    var _ = t.slice(0, e.length + 1).reduce(function (t, o, r) {
                        if (!1 !== o && "" !== o) {
                            var s = e[r - 1] || {isHeader: !0, plotX: e[0].plotX, plotY: a, series: {}}, n = s.isHeader,
                                h = n ? i : s.series, l = h.tt = function (t, e, o) {
                                    var r, s = t, n = e.isHeader, a = e.series;
                                    if (!s) {
                                        var h = {padding: A.padding, r: A.borderRadius};
                                        w || (h.fill = A.backgroundColor, h["stroke-width"] = null !== (r = A.borderWidth) && void 0 !== r ? r : 1), s = j.label("", 0, 0, A[n ? "headerShape" : "shape"], void 0, void 0, A.useHTML).addClass(i.getClassName(e, !0, n)).attr(h).add(L)
                                    }
                                    return s.isActive = !0, s.attr({text: o}), w || s.css(A.style).attr({stroke: A.borderColor || e.color || a.color || "#333333"}), s
                                }(h.tt, s, o.toString()), c = l.getBBox(), f = c.width + l.strokeWidth();
                            n && (z = c.height, R += z, O && (I -= z));
                            var g = function (t) {
                                var e, i, o = t.isHeader, r = t.plotX, s = void 0 === r ? 0 : r, n = t.plotY,
                                    h = void 0 === n ? 0 : n, l = t.series;
                                if (o) e = Math.max(p + s, p), i = u + a / 2; else {
                                    var c = l.xAxis, f = l.yAxis;
                                    e = c.pos + d(s, -k, c.len + k), l.shouldShowTooltip(0, f.pos - u + h, {ignoreX: !0}) && (i = f.pos + h)
                                }
                                return {anchorX: e = d(e, P.left - k, P.right + k), anchorY: i}
                            }(s), m = g.anchorX, y = g.anchorY;
                            if ("number" == typeof y) {
                                var v = c.height + 1, x = T ? T.call(i, f, v, s) : N(m, y, n, f);
                                t.push({
                                    align: T ? 0 : void 0,
                                    anchorX: m,
                                    anchorY: y,
                                    boxWidth: f,
                                    point: s,
                                    rank: M(x.rank, n ? 1 : 0),
                                    size: v,
                                    target: x.y,
                                    tt: l,
                                    x: x.x
                                })
                            } else l.isActive = !1
                        }
                        return t
                    }, []);
                    !T && _.some(function (t) {
                        var e = (i.outside ? D : 0) + t.anchorX;
                        return e < P.left && e + t.boxWidth < P.right || e < D - P.left + t.boxWidth && P.right - e > e
                    }) && (_ = _.map(function (t) {
                        var e = N(t.anchorX, t.anchorY, t.point.isHeader, t.boxWidth, !1), i = e.x;
                        return g(t, {target: e.y, x: i})
                    })), i.cleanSplit(), c(_, R);
                    var G = {left: D, right: D};
                    _.forEach(function (t) {
                        var e = t.x, o = t.boxWidth, r = t.isHeader;
                        !r && (i.outside && D + e < G.left && (G.left = D + e), !r && i.outside && G.left + o > G.right && (G.right = D + e))
                    }), _.forEach(function (t) {
                        var e = t.x, o = t.anchorX, r = t.anchorY, s = t.pos, n = t.point.isHeader, a = {
                            visibility: void 0 === s ? "hidden" : "inherit",
                            x: e,
                            y: (s || 0) + I,
                            anchorX: o,
                            anchorY: r
                        };
                        if (i.outside && e < o) {
                            var h = D - G.left;
                            h > 0 && (n || (a.x = e + h, a.anchorX = o + h), n && (a.x = (G.right - G.left) / 2, a.anchorX = o + h))
                        }
                        t.tt.attr(a)
                    });
                    var W = i.container, X = i.outside, H = i.renderer;
                    if (X && W && H) {
                        var U = L.getBBox(), F = U.width, Y = U.height, V = U.x, Z = U.y;
                        H.setSize(F + V, Y + Z, !1), W.style.left = G.left + "px", W.style.top = B + "px"
                    }
                    l && L.attr({opacity: 1 === L.opacity ? .999 : 1})
                }, t.prototype.drawTracker = function () {
                    if (!this.shouldStickOnContact()) {
                        this.tracker && (this.tracker = this.tracker.destroy());
                        return
                    }
                    var t = this.chart, e = this.label, i = this.shared ? t.hoverPoints : t.hoverPoint;
                    if (e && i) {
                        var o = {x: 0, y: 0, width: 0, height: 0}, r = this.getAnchor(i), s = e.getBBox();
                        r[0] += t.plotLeft - (e.translateX || 0), r[1] += t.plotTop - (e.translateY || 0), o.x = Math.min(0, r[0]), o.y = Math.min(0, r[1]), o.width = r[0] < 0 ? Math.max(Math.abs(r[0]), s.width - r[0]) : Math.max(Math.abs(r[0]), s.width), o.height = r[1] < 0 ? Math.max(Math.abs(r[1]), s.height - Math.abs(r[1])) : Math.max(Math.abs(r[1]), s.height), this.tracker ? this.tracker.attr(o) : (this.tracker = e.renderer.rect(o).addClass("highcharts-tracker").add(e), t.styledMode || this.tracker.attr({fill: "rgba(0,0,0,0)"}))
                    }
                }, t.prototype.styledModeFormat = function (t) {
                    return t.replace('style="font-size: 0.8em"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"')
                }, t.prototype.tooltipFooterHeaderFormatter = function (t, e) {
                    var i = t.series, o = i.tooltipOptions, r = i.xAxis, s = r && r.dateTime,
                        a = {isFooter: e, labelConfig: t}, h = o.xDateFormat, l = o[e ? "footerFormat" : "headerFormat"];
                    return m(this, "headerFormatter", a, function (e) {
                        s && !h && v(t.key) && (h = s.getXDateFormat(t.key, o.dateTimeLabelFormats)), s && h && (t.point && t.point.tooltipDateKeys || ["key"]).forEach(function (t) {
                            l = l.replace("{point." + t + "}", "{point." + t + ":" + h + "}")
                        }), i.chart.styledMode && (l = this.styledModeFormat(l)), e.text = n(l, {
                            point: t,
                            series: i
                        }, this.chart)
                    }), a.text
                }, t.prototype.update = function (t) {
                    this.destroy(), this.init(this.chart, b(!0, this.options, t))
                }, t.prototype.updatePosition = function (t) {
                    var e, i = this.chart, o = this.container, r = this.distance, s = this.options, n = this.renderer,
                        a = this.getLabel(), h = a.height, l = void 0 === h ? 0 : h, c = a.width, p = void 0 === c ? 0 : c,
                        d = i.pointer.getChartPosition(), f = d.left, g = d.top, m = d.scaleX, y = d.scaleY,
                        v = (s.positioner || this.getPosition).call(this, p, l, t), x = (t.plotX || 0) + i.plotLeft,
                        b = (t.plotY || 0) + i.plotTop;
                    n && o && (s.positioner && (v.x += f - r, v.y += g - r), e = (s.borderWidth || 0) + 2 * r + 2, n.setSize(p + e, l + e, !1), (1 !== m || 1 !== y) && (u(o, {transform: "scale(".concat(m, ", ").concat(y, ")")}), x *= m, b *= y), x += f - v.x, b += g - v.y), this.move(Math.round(v.x), Math.round(v.y || 0), x, b)
                }, t
            }();
        return (s = k || (k = {})).compose = function t(e) {
            C(a, t) && p(e, "afterInit", function () {
                var t = this.chart;
                t.options.tooltip && (t.tooltip = new s(t, t.options.tooltip))
            })
        }, k
    }), i(e, "Core/Series/Point.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Animation/AnimationUtilities.js"], e["Core/Defaults.js"], e["Core/Templating.js"], e["Core/Utilities.js"]], function (t, e, i, o, r) {
        var s = e.animObject, n = i.defaultOptions, a = o.format, h = r.addEvent, l = (r.defined, r.erase),
            c = r.extend, p = r.fireEvent, d = r.getNestedProperty, u = r.isArray, f = r.isFunction, g = r.isNumber,
            m = r.isObject, y = r.merge, v = r.objectEach, x = r.pick, b = r.syncTimeout, M = r.removeEvent,
            C = r.uniqueKey;
        return function () {
            function e(t, e, i) {
                var o;
                this.formatPrefix = "point", this.visible = !0, this.series = t, this.applyOptions(e, i), null !== (o = this.id) && void 0 !== o || (this.id = C()), this.resolveColor(), t.chart.pointCount++, p(this, "afterInit")
            }

            return e.prototype.animateBeforeDestroy = function () {
                var t = this, e = {x: t.startXPos, opacity: 0}, i = t.getGraphicalProps();
                i.singular.forEach(function (i) {
                    t[i] = t[i].animate("dataLabel" === i ? {x: t[i].startXPos, y: t[i].startYPos, opacity: 0} : e)
                }), i.plural.forEach(function (e) {
                    t[e].forEach(function (e) {
                        e.element && e.animate(c({x: t.startXPos}, e.startYPos ? {x: e.startXPos, y: e.startYPos} : {}))
                    })
                })
            }, e.prototype.applyOptions = function (t, i) {
                var o = this.series, r = o.options.pointValKey || o.pointValKey;
                return c(this, t = e.prototype.optionsToObject.call(this, t)), this.options = this.options ? c(this.options, t) : t, t.group && delete this.group, t.dataLabels && delete this.dataLabels, r && (this.y = e.prototype.getNestedProperty.call(this, r)), this.selected && (this.state = "select"), "name" in this && void 0 === i && o.xAxis && o.xAxis.hasNames && (this.x = o.xAxis.nameToX(this)), void 0 === this.x && o ? void 0 === i ? this.x = o.autoIncrement() : this.x = i : g(t.x) && o.options.relativeXValue && (this.x = o.autoIncrement(t.x)), this.isNull = this.isValid && !this.isValid(), this.formatPrefix = this.isNull ? "null" : "point", this
            }, e.prototype.destroy = function () {
                if (!this.destroyed) {
                    var t = this, e = t.series, i = e.chart, o = e.options.dataSorting, r = i.hoverPoints,
                        n = s(t.series.chart.renderer.globalAnimation), a = function () {
                            for (var e in (t.graphic || t.graphics || t.dataLabel || t.dataLabels) && (M(t), t.destroyElements()), t) delete t[e]
                        };
                    t.legendItem && i.legend.destroyItem(t), r && (t.setState(), l(r, t), r.length || (i.hoverPoints = null)), t === i.hoverPoint && t.onMouseOut(), o && o.enabled ? (this.animateBeforeDestroy(), b(a, n.duration)) : a(), i.pointCount--
                }
                this.destroyed = !0
            }, e.prototype.destroyElements = function (t) {
                var e = this, i = e.getGraphicalProps(t);
                i.singular.forEach(function (t) {
                    e[t] = e[t].destroy()
                }), i.plural.forEach(function (t) {
                    e[t].forEach(function (t) {
                        t && t.element && t.destroy()
                    }), delete e[t]
                })
            }, e.prototype.firePointEvent = function (t, e, i) {
                var o = this, r = this.series.options;
                (r.point.events[t] || o.options && o.options.events && o.options.events[t]) && o.importEvents(), "click" === t && r.allowPointSelect && (i = function (t) {
                    !o.destroyed && o.select && o.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
                }), p(o, t, e, i)
            }, e.prototype.getClassName = function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            }, e.prototype.getGraphicalProps = function (t) {
                var e, i, o = this, r = [], s = {singular: [], plural: []};
                for ((t = t || {
                    graphic: 1,
                    dataLabel: 1
                }).graphic && r.push("graphic", "connector"), t.dataLabel && r.push("dataLabel", "dataLabelPath", "dataLabelUpper"), i = r.length; i--;) o[e = r[i]] && s.singular.push(e);
                return ["graphic", "dataLabel"].forEach(function (e) {
                    var i = e + "s";
                    t[e] && o[i] && s.plural.push(i)
                }), s
            }, e.prototype.getLabelConfig = function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, e.prototype.getNestedProperty = function (t) {
                return t ? 0 === t.indexOf("custom.") ? d(t, this.options) : this[t] : void 0
            }, e.prototype.getZone = function () {
                var t, e = this.series, i = e.zones, o = e.zoneAxis || "y", r = 0;
                for (t = i[0]; this[o] >= t.value;) t = i[++r];
                return this.nonZonedColor || (this.nonZonedColor = this.color), t && t.color && !this.options.color ? this.color = t.color : this.color = this.nonZonedColor, t
            }, e.prototype.hasNewShapeType = function () {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            }, e.prototype.isValid = function () {
                return (g(this.x) || this.x instanceof Date) && g(this.y)
            }, e.prototype.optionsToObject = function (t) {
                var i, o = this.series, r = o.options.keys, s = r || o.pointArrayMap || ["y"], n = s.length, a = {},
                    h = 0, l = 0;
                if (g(t) || null === t) a[s[0]] = t; else if (u(t)) for (!r && t.length > n && ("string" == (i = typeof t[0]) ? a.name = t[0] : "number" === i && (a.x = t[0]), h++); l < n;) r && void 0 === t[h] || (s[l].indexOf(".") > 0 ? e.prototype.setNestedProperty(a, t[h], s[l]) : a[s[l]] = t[h]), h++, l++; else "object" == typeof t && (a = t, t.dataLabels && (o.hasDataLabels = function () {
                    return !0
                }), t.marker && (o._hasPointMarkers = !0));
                return a
            }, e.prototype.pos = function (t, e) {
                if (void 0 === e && (e = this.plotY), !this.destroyed) {
                    var i = this.plotX, o = this.series, r = o.chart, s = o.xAxis, n = o.yAxis, a = 0, h = 0;
                    if (g(i) && g(e)) return t && (a = s ? s.pos : r.plotLeft, h = n ? n.pos : r.plotTop), r.inverted && s && n ? [n.len - e + h, s.len - i + a] : [i + a, e + h]
                }
            }, e.prototype.resolveColor = function () {
                var t, e, i, o = this.series, r = o.chart.options.chart, s = o.chart.styledMode, n = r.colorCount;
                delete this.nonZonedColor, o.options.colorByPoint ? (s || (t = (e = o.options.colors || o.chart.options.colors)[o.colorCounter], n = e.length), i = o.colorCounter, o.colorCounter++, o.colorCounter === n && (o.colorCounter = 0)) : (s || (t = o.color), i = o.colorIndex), this.colorIndex = x(this.options.colorIndex, i), this.color = x(this.options.color, t)
            }, e.prototype.setNestedProperty = function (t, e, i) {
                return i.split(".").reduce(function (t, i, o, r) {
                    var s = r.length - 1 === o;
                    return t[i] = s ? e : m(t[i], !0) ? t[i] : {}, t[i]
                }, t), t
            }, e.prototype.shouldDraw = function () {
                return !this.isNull
            }, e.prototype.tooltipFormatter = function (t) {
                var e = this.series, i = e.tooltipOptions, o = x(i.valueDecimals, ""), r = i.valuePrefix || "",
                    s = i.valueSuffix || "";
                return e.chart.styledMode && (t = e.chart.tooltip.styledModeFormat(t)), (e.pointArrayMap || ["y"]).forEach(function (e) {
                    e = "{point." + e, (r || s) && (t = t.replace(RegExp(e + "}", "g"), r + e + "}" + s)), t = t.replace(RegExp(e + "}", "g"), e + ":,." + o + "f}")
                }), a(t, {point: this, series: this.series}, e.chart)
            }, e.prototype.update = function (t, e, i, o) {
                var r, s = this, n = s.series, a = s.graphic, h = n.chart, l = n.options;

                function c() {
                    s.applyOptions(t);
                    var o = a && s.hasMockGraphic, c = null === s.y ? !o : o;
                    a && c && (s.graphic = a.destroy(), delete s.hasMockGraphic), m(t, !0) && (a && a.element && t && t.marker && void 0 !== t.marker.symbol && (s.graphic = a.destroy()), (null == t ? void 0 : t.dataLabels) && s.dataLabel && (s.dataLabel = s.dataLabel.destroy())), r = s.index, n.updateParallelArrays(s, r), l.data[r] = m(l.data[r], !0) || m(t, !0) ? s.options : x(t, l.data[r]), n.isDirty = n.isDirtyData = !0, !n.fixedBox && n.hasCartesianSeries && (h.isDirtyBox = !0), "point" === l.legendType && (h.isDirtyLegend = !0), e && h.redraw(i)
                }

                e = x(e, !0), !1 === o ? c() : s.firePointEvent("update", {options: t}, c)
            }, e.prototype.remove = function (t, e) {
                this.series.removePoint(this.series.data.indexOf(this), t, e)
            }, e.prototype.select = function (t, e) {
                var i = this, o = i.series, r = o.chart;
                t = x(t, !i.selected), this.selectedStaging = t, i.firePointEvent(t ? "select" : "unselect", {accumulate: e}, function () {
                    i.selected = i.options.selected = t, o.options.data[o.data.indexOf(i)] = i.options, i.setState(t && "select"), e || r.getSelectedPoints().forEach(function (t) {
                        var e = t.series;
                        t.selected && t !== i && (t.selected = t.options.selected = !1, e.options.data[e.data.indexOf(t)] = t.options, t.setState(r.hoverPoints && e.options.inactiveOtherPoints ? "inactive" : ""), t.firePointEvent("unselect"))
                    })
                }), delete this.selectedStaging
            }, e.prototype.onMouseOver = function (t) {
                var e = this.series.chart, i = e.pointer;
                t = t ? i.normalize(t) : i.getChartCoordinatesFromPoint(this, e.inverted), i.runPointActions(t, this)
            }, e.prototype.onMouseOut = function () {
                var t = this.series.chart;
                this.firePointEvent("mouseOut"), this.series.options.inactiveOtherPoints || (t.hoverPoints || []).forEach(function (t) {
                    t.setState()
                }), t.hoverPoints = t.hoverPoint = null
            }, e.prototype.importEvents = function () {
                if (!this.hasImportedEvents) {
                    var t = this, e = y(t.series.options.point, t.options).events;
                    t.events = e, v(e, function (e, i) {
                        f(e) && h(t, i, e)
                    }), this.hasImportedEvents = !0
                }
            }, e.prototype.setState = function (e, i) {
                var o, r, s, a, h = this.series, l = this.state, d = h.options.states[e || "normal"] || {},
                    u = n.plotOptions[h.type].marker && h.options.marker, f = u && !1 === u.enabled,
                    m = u && u.states && u.states[e || "normal"] || {}, y = !1 === m.enabled, v = this.marker || {},
                    b = h.chart, M = u && h.markerAttribs, C = h.halo, S = h.stateMarkerGraphic;
                if (((e = e || "") !== this.state || i) && (!this.selected || "select" === e) && !1 !== d.enabled && (!e || !y && (!f || !1 !== m.enabled)) && (!e || !v.states || !v.states[e] || !1 !== v.states[e].enabled)) {
                    if (this.state = e, M && (o = h.markerAttribs(this, e)), this.graphic && !this.hasMockGraphic) {
                        if (l && this.graphic.removeClass("highcharts-point-" + l), e && this.graphic.addClass("highcharts-point-" + e), !b.styledMode) {
                            r = h.pointAttribs(this, e), s = x(b.options.chart.animation, d.animation);
                            var w = r.opacity;
                            h.options.inactiveOtherPoints && g(w) && (this.dataLabels || []).forEach(function (t) {
                                t && !t.hasClass("highcharts-data-label-hidden") && (t.animate({opacity: w}, s), t.connector && t.connector.animate({opacity: w}, s))
                            }), this.graphic.animate(r, s)
                        }
                        o && this.graphic.animate(o, x(b.options.chart.animation, m.animation, u.animation)), S && S.hide()
                    } else e && m && (a = v.symbol || h.symbol, S && S.currentSymbol !== a && (S = S.destroy()), o && (S ? S[i ? "animate" : "attr"]({
                        x: o.x,
                        y: o.y
                    }) : a && (h.stateMarkerGraphic = S = b.renderer.symbol(a, o.x, o.y, o.width, o.height).add(h.markerGroup), S.currentSymbol = a)), !b.styledMode && S && "inactive" !== this.state && S.attr(h.pointAttribs(this, e))), S && (S[e && this.isInside ? "show" : "hide"](), S.element.point = this, S.addClass(this.getClassName(), !0));
                    var k = d.halo, A = this.graphic || S, T = A && A.visibility || "inherit";
                    k && k.size && A && "hidden" !== T && !this.isCluster ? (C || (h.halo = C = b.renderer.path().add(A.parentGroup)), C.show()[i ? "animate" : "attr"]({d: this.haloPath(k.size)}), C.attr({
                        class: "highcharts-halo highcharts-color-" + x(this.colorIndex, h.colorIndex) + (this.className ? " " + this.className : ""),
                        visibility: T,
                        zIndex: -1
                    }), C.point = this, b.styledMode || C.attr(c({
                        fill: this.color || h.color,
                        "fill-opacity": k.opacity
                    }, t.filterUserAttributes(k.attributes || {})))) : C && C.point && C.point.haloPath && C.animate({d: C.point.haloPath(0)}, null, C.hide), p(this, "afterSetState", {state: e})
                }
            }, e.prototype.haloPath = function (t) {
                var e = this.pos();
                return e ? this.series.chart.renderer.symbols.circle(Math.floor(e[0]) - t, e[1] - t, 2 * t, 2 * t) : []
            }, e
        }()
    }), i(e, "Core/Pointer.js", [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = t.parse, s = e.charts, n = e.composed, a = e.noop, h = i.addEvent, l = i.attr, c = i.css,
            p = i.defined, d = i.extend, u = i.find, f = i.fireEvent, g = i.isNumber, m = i.isObject, y = i.objectEach,
            v = i.offset, x = i.pick, b = i.pushUnique, M = i.splat, C = function () {
                function t(t, e) {
                    var i;
                    this.hasDragged = !1, this.lastValidTouch = {}, this.pinchDown = [], this.eventsToUnbind = [], this.options = e, this.chart = t, this.runChartClick = !!(null === (i = e.chart.events) || void 0 === i ? void 0 : i.click), this.pinchDown = [], this.lastValidTouch = {}, this.setDOMEvents(), f(this, "afterInit")
                }

                return t.prototype.applyInactiveState = function (t) {
                    var e, i = [];
                    (t || []).forEach(function (t) {
                        e = t.series, i.push(e), e.linkedParent && i.push(e.linkedParent), e.linkedSeries && (i = i.concat(e.linkedSeries)), e.navigatorSeries && i.push(e.navigatorSeries)
                    }), this.chart.series.forEach(function (t) {
                        -1 === i.indexOf(t) ? t.setState("inactive", !0) : t.options.inactiveOtherPoints && t.setAllPointsToState("inactive")
                    })
                }, t.prototype.destroy = function () {
                    var i = this;
                    this.eventsToUnbind.forEach(function (t) {
                        return t()
                    }), this.eventsToUnbind = [], !e.chartCount && (t.unbindDocumentMouseUp && (t.unbindDocumentMouseUp = t.unbindDocumentMouseUp()), t.unbindDocumentTouchEnd && (t.unbindDocumentTouchEnd = t.unbindDocumentTouchEnd())), clearInterval(i.tooltipTimeout), y(i, function (t, e) {
                        i[e] = void 0
                    })
                }, t.prototype.getSelectionMarkerAttrs = function (t, e) {
                    var i = this, o = {args: {chartX: t, chartY: e}, attrs: {}, shapeType: "rect"};
                    return f(this, "getSelectionMarkerAttrs", o, function (o) {
                        var r, s = i.chart, n = i.mouseDownX, a = void 0 === n ? 0 : n, h = i.mouseDownY,
                            l = void 0 === h ? 0 : h, c = i.zoomHor, p = i.zoomVert, d = o.attrs;
                        d.x = s.plotLeft, d.y = s.plotTop, d.width = c ? 1 : s.plotWidth, d.height = p ? 1 : s.plotHeight, c && (r = t - a, d.width = Math.abs(r), d.x = (r > 0 ? 0 : r) + a), p && (r = e - l, d.height = Math.abs(r), d.y = (r > 0 ? 0 : r) + l)
                    }), o
                }, t.prototype.drag = function (t) {
                    var e, i = this.chart, o = i.options.chart, s = i.plotLeft, n = i.plotTop, a = i.plotWidth,
                        h = i.plotHeight, l = this.mouseDownX || 0, c = this.mouseDownY || 0,
                        p = m(o.panning) ? o.panning && o.panning.enabled : o.panning, d = o.panKey && t[o.panKey + "Key"],
                        u = t.chartX, f = t.chartY, g = this.selectionMarker;
                    if ((!g || !g.touch) && (u < s ? u = s : u > s + a && (u = s + a), f < n ? f = n : f > n + h && (f = n + h), this.hasDragged = Math.sqrt(Math.pow(l - u, 2) + Math.pow(c - f, 2)), this.hasDragged > 10)) {
                        e = i.isInsidePlot(l - s, c - n, {visiblePlotOnly: !0});
                        var y = this.getSelectionMarkerAttrs(u, f), v = y.shapeType, x = y.attrs;
                        (i.hasCartesianSeries || i.mapView) && (this.zoomX || this.zoomY) && e && !d && !g && (this.selectionMarker = g = i.renderer[v](), g.attr({
                            class: "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), i.styledMode || g.attr({fill: o.selectionMarkerFill || r("#334eff").setOpacity(.25).get()})), g && g.attr(x), e && !g && p && i.pan(t, o.panning)
                    }
                }, t.prototype.dragStart = function (t) {
                    var e = this.chart;
                    e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = this.mouseDownX = t.chartX, e.mouseDownY = this.mouseDownY = t.chartY
                }, t.prototype.getSelectionBox = function (t) {
                    var e = {args: {marker: t}, result: {}};
                    return f(this, "getSelectionBox", e, function (e) {
                        e.result = {
                            x: t.attr ? +t.attr("x") : t.x,
                            y: t.attr ? +t.attr("y") : t.y,
                            width: t.attr ? t.attr("width") : t.width,
                            height: t.attr ? t.attr("height") : t.height
                        }
                    }), e.result
                }, t.prototype.drop = function (t) {
                    var e = this, i = this.chart, o = this.hasPinched;
                    if (this.selectionMarker) {
                        var r = this.getSelectionBox(this.selectionMarker), s = r.x, n = r.y, a = r.width, h = r.height,
                            l = {originalEvent: t, xAxis: [], yAxis: [], x: s, y: n, width: a, height: h}, u = !!i.mapView;
                        (this.hasDragged || o) && (i.axes.forEach(function (i) {
                            if (i.zoomEnabled && p(i.min) && (o || e[({
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            })[i.coll]]) && g(s) && g(n) && g(a) && g(h)) {
                                var r = i.horiz, c = "touchend" === t.type ? i.minPixelPadding : 0,
                                    d = i.toValue((r ? s : n) + c), f = i.toValue((r ? s + a : n + h) - c);
                                l[i.coll].push({axis: i, min: Math.min(d, f), max: Math.max(d, f)}), u = !0
                            }
                        }), u && f(i, "selection", l, function (t) {
                            i.zoom(d(t, o ? {animation: !1} : null))
                        })), g(i.index) && (this.selectionMarker = this.selectionMarker.destroy()), o && this.scaleGroups()
                    }
                    i && g(i.index) && (c(i.container, {cursor: i._cursor}), i.cancelClick = +this.hasDragged > 10, i.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                }, t.prototype.findNearestKDPoint = function (t, e, i) {
                    var o;
                    return t.forEach(function (t) {
                        var r, s, n, a, h = !(t.noSharedTooltip && e) && 0 > t.options.findNearestPointBy.indexOf("y"),
                            l = t.searchPoint(i, h);
                        m(l, !0) && l.series && (!m(o, !0) || (s = (r = o).distX - l.distX, n = r.dist - l.dist, a = (l.series.group && l.series.group.zIndex) - (r.series.group && r.series.group.zIndex), (0 !== s && e ? s : 0 !== n ? n : 0 !== a ? a : r.series.index > l.series.index ? -1 : 1) > 0)) && (o = l)
                    }), o
                }, t.prototype.getChartCoordinatesFromPoint = function (t, e) {
                    var i = t.series, o = i.xAxis, r = i.yAxis, s = t.shapeArgs;
                    if (o && r) {
                        var n = x(t.clientX, t.plotX), a = t.plotY || 0;
                        return t.isNode && s && g(s.x) && g(s.y) && (n = s.x, a = s.y), e ? {
                            chartX: r.len + r.pos - a,
                            chartY: o.len + o.pos - n
                        } : {chartX: n + o.pos, chartY: a + r.pos}
                    }
                    if (s && s.x && s.y) return {chartX: s.x, chartY: s.y}
                }, t.prototype.getChartPosition = function () {
                    if (this.chartPosition) return this.chartPosition;
                    var t = this.chart.container, e = v(t);
                    this.chartPosition = {left: e.left, top: e.top, scaleX: 1, scaleY: 1};
                    var i = t.offsetWidth, o = t.offsetHeight;
                    return i > 2 && o > 2 && (this.chartPosition.scaleX = e.width / i, this.chartPosition.scaleY = e.height / o), this.chartPosition
                }, t.prototype.getCoordinates = function (t) {
                    var e = {xAxis: [], yAxis: []};
                    return this.chart.axes.forEach(function (i) {
                        e[i.isXAxis ? "xAxis" : "yAxis"].push({axis: i, value: i.toValue(t[i.horiz ? "chartX" : "chartY"])})
                    }), e
                }, t.prototype.getHoverData = function (t, e, i, o, r, s) {
                    var n, a = [], h = function (t) {
                        return t.visible && !(!r && t.directTouch) && x(t.options.enableMouseTracking, !0)
                    }, l = e, c = {chartX: s ? s.chartX : void 0, chartY: s ? s.chartY : void 0, shared: r};
                    f(this, "beforeGetHoverData", c), n = l && !l.stickyTracking ? [l] : i.filter(function (t) {
                        return t.stickyTracking && (c.filter || h)(t)
                    });
                    var p = o && t || !s ? t : this.findNearestKDPoint(n, r, s);
                    return l = p && p.series, p && (r && !l.noSharedTooltip ? (n = i.filter(function (t) {
                        return c.filter ? c.filter(t) : h(t) && !t.noSharedTooltip
                    })).forEach(function (t) {
                        var e = u(t.points, function (t) {
                            return t.x === p.x && !t.isNull
                        });
                        m(e) && (t.boosted && t.boost && (e = t.boost.getPoint(e)), a.push(e))
                    }) : a.push(p)), f(this, "afterGetHoverData", c = {hoverPoint: p}), {
                        hoverPoint: c.hoverPoint,
                        hoverSeries: l,
                        hoverPoints: a
                    }
                }, t.prototype.getPointFromEvent = function (t) {
                    for (var e, i = t.target; i && !e;) e = i.point, i = i.parentNode;
                    return e
                }, t.prototype.onTrackerMouseOut = function (t) {
                    var e = this.chart, i = t.relatedTarget, o = e.hoverSeries;
                    this.isDirectTouch = !1, !o || !i || o.stickyTracking || this.inClass(i, "highcharts-tooltip") || this.inClass(i, "highcharts-series-" + o.index) && this.inClass(i, "highcharts-tracker") || o.onMouseOut()
                }, t.prototype.inClass = function (t, e) {
                    for (var i, o = t; o;) {
                        if (i = l(o, "class")) {
                            if (-1 !== i.indexOf(e)) return !0;
                            if (-1 !== i.indexOf("highcharts-container")) return !1
                        }
                        o = o.parentElement
                    }
                }, t.prototype.normalize = function (t, e) {
                    var i = t.touches, o = i ? i.length ? i.item(0) : x(i.changedTouches, t.changedTouches)[0] : t;
                    e || (e = this.getChartPosition());
                    var r = o.pageX - e.left, s = o.pageY - e.top;
                    return d(t, {chartX: Math.round(r /= e.scaleX), chartY: Math.round(s /= e.scaleY)})
                }, t.prototype.onContainerClick = function (t) {
                    var e = this.chart, i = e.hoverPoint, o = this.normalize(t), r = e.plotLeft, s = e.plotTop;
                    !e.cancelClick && (i && this.inClass(o.target, "highcharts-tracker") ? (f(i.series, "click", d(o, {point: i})), e.hoverPoint && i.firePointEvent("click", o)) : (d(o, this.getCoordinates(o)), e.isInsidePlot(o.chartX - r, o.chartY - s, {visiblePlotOnly: !0}) && f(e, "click", o)))
                }, t.prototype.onContainerMouseDown = function (t) {
                    var i = (1 & (t.buttons || t.button)) == 1;
                    t = this.normalize(t), e.isFirefox && 0 !== t.button && this.onContainerMouseMove(t), (void 0 === t.button || i) && (this.zoomOption(t), i && t.preventDefault && t.preventDefault(), this.dragStart(t))
                }, t.prototype.onContainerMouseLeave = function (e) {
                    var i = s[x(t.hoverChartIndex, -1)];
                    e = this.normalize(e), this.onContainerMouseMove(e), i && e.relatedTarget && !this.inClass(e.relatedTarget, "highcharts-tooltip") && (i.pointer.reset(), i.pointer.chartPosition = void 0)
                }, t.prototype.onContainerMouseEnter = function (t) {
                    delete this.chartPosition
                }, t.prototype.onContainerMouseMove = function (t) {
                    var e = this.chart, i = e.tooltip, o = this.normalize(t);
                    this.setHoverChartIndex(t), ("mousedown" === e.mouseIsDown || this.touchSelect(o)) && this.drag(o), !e.openMenu && (this.inClass(o.target, "highcharts-tracker") || e.isInsidePlot(o.chartX - e.plotLeft, o.chartY - e.plotTop, {visiblePlotOnly: !0})) && !(i && i.shouldStickOnContact(o)) && (this.inClass(o.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(o))
                }, t.prototype.onDocumentTouchEnd = function (e) {
                    var i = s[x(t.hoverChartIndex, -1)];
                    i && i.pointer.drop(e)
                }, t.prototype.onContainerTouchMove = function (t) {
                    this.touchSelect(t) ? this.onContainerMouseMove(t) : this.touch(t)
                }, t.prototype.onContainerTouchStart = function (t) {
                    this.touchSelect(t) ? this.onContainerMouseDown(t) : (this.zoomOption(t), this.touch(t, !0))
                }, t.prototype.onDocumentMouseMove = function (t) {
                    var e = this.chart, i = e.tooltip, o = this.chartPosition, r = this.normalize(t, o);
                    !o || e.isInsidePlot(r.chartX - e.plotLeft, r.chartY - e.plotTop, {visiblePlotOnly: !0}) || i && i.shouldStickOnContact(r) || this.inClass(r.target, "highcharts-tracker") || this.reset()
                }, t.prototype.onDocumentMouseUp = function (e) {
                    var i = s[x(t.hoverChartIndex, -1)];
                    i && i.pointer.drop(e)
                }, t.prototype.pinch = function (t) {
                    var e = this, i = e.chart, o = e.pinchDown, r = t.touches || [], s = r.length, n = e.lastValidTouch,
                        h = e.hasZoom, l = {},
                        c = 1 === s && (e.inClass(t.target, "highcharts-tracker") && i.runTrackerClick || e.runChartClick),
                        p = {}, u = e.chart.tooltip, g = 1 === s && x(u && u.options.followTouchMove, !0),
                        m = e.selectionMarker;
                    s > 1 ? e.initiated = !0 : g && (e.initiated = !1), h && e.initiated && !c && !1 !== t.cancelable && t.preventDefault(), [].map.call(r, function (t) {
                        return e.normalize(t)
                    }), "touchstart" === t.type ? ([].forEach.call(r, function (t, e) {
                        o[e] = {chartX: t.chartX, chartY: t.chartY}
                    }), n.x = [o[0].chartX, o[1] && o[1].chartX], n.y = [o[0].chartY, o[1] && o[1].chartY], i.axes.forEach(function (t) {
                        if (t.zoomEnabled) {
                            var e = i.bounds[t.horiz ? "h" : "v"], o = t.minPixelPadding,
                                r = t.toPixels(Math.min(x(t.options.min, t.dataMin), t.dataMin)),
                                s = t.toPixels(Math.max(x(t.options.max, t.dataMax), t.dataMax)), n = Math.min(r, s),
                                a = Math.max(r, s);
                            e.min = Math.min(t.pos, n - o), e.max = Math.max(t.pos + t.len, a + o)
                        }
                    }), e.res = !0) : g ? this.runPointActions(e.normalize(t)) : o.length && (f(i, "touchpan", {originalEvent: t}, function () {
                        m || (e.selectionMarker = m = d({
                            destroy: a,
                            touch: !0
                        }, i.plotBox)), e.pinchTranslate(o, r, l, m, p, n), e.hasPinched = h, e.scaleGroups(l, p)
                    }), e.res && (e.res = !1, this.reset(!1, 0)))
                }, t.prototype.pinchTranslate = function (t, e, i, o, r, s) {
                    this.zoomHor && this.pinchTranslateDirection(!0, t, e, i, o, r, s), this.zoomVert && this.pinchTranslateDirection(!1, t, e, i, o, r, s)
                }, t.prototype.pinchTranslateDirection = function (t, e, i, o, r, s, n, a) {
                    var h, l, c, p, d = this.chart, u = t ? "x" : "y", f = t ? "X" : "Y", g = "chart" + f,
                        m = t ? "width" : "height", y = d["plot" + (t ? "Left" : "Top")], v = d.inverted,
                        x = d.bounds[t ? "h" : "v"], b = 1 === e.length, M = e[0][g], C = !b && e[1][g], S = function () {
                            "number" == typeof A && Math.abs(M - C) > 20 && (w = a || Math.abs(k - A) / Math.abs(M - C)), c = (y - k) / w + M, h = d["plot" + (t ? "Width" : "Height")] / w
                        }, w = a || 1, k = i[0][g], A = !b && i[1][g];
                    S(), (l = c) < x.min ? (l = x.min, p = !0) : l + h > x.max && (l = x.max - h, p = !0), p ? (k -= .8 * (k - n[u][0]), "number" == typeof A && (A -= .8 * (A - n[u][1])), S()) : n[u] = [k, A], v || (s[u] = c - y, s[m] = h);
                    var T = v ? t ? "scaleY" : "scaleX" : "scale" + f, P = v ? 1 / w : w;
                    r[m] = h, r[u] = l, o[T] = w * (v && !t ? -1 : 1), o["translate" + f] = P * y + (k - P * M)
                }, t.prototype.reset = function (t, e) {
                    var i = this.chart, o = i.hoverSeries, r = i.hoverPoint, s = i.hoverPoints, n = i.tooltip,
                        a = n && n.shared ? s : r;
                    t && a && M(a).forEach(function (e) {
                        e.series.isCartesian && void 0 === e.plotX && (t = !1)
                    }), t ? n && a && M(a).length && (n.refresh(a), n.shared && s ? s.forEach(function (t) {
                        t.setState(t.state, !0), t.series.isCartesian && (t.series.xAxis.crosshair && t.series.xAxis.drawCrosshair(null, t), t.series.yAxis.crosshair && t.series.yAxis.drawCrosshair(null, t))
                    }) : r && (r.setState(r.state, !0), i.axes.forEach(function (t) {
                        t.crosshair && r.series[t.coll] === t && t.drawCrosshair(null, r)
                    }))) : (r && r.onMouseOut(), s && s.forEach(function (t) {
                        t.setState()
                    }), o && o.onMouseOut(), n && n.hide(e), this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()), i.axes.forEach(function (t) {
                        t.hideCrosshair()
                    }), this.hoverX = i.hoverPoints = i.hoverPoint = null)
                }, t.prototype.runPointActions = function (e, i, o) {
                    var r = this.chart, n = r.series, a = r.tooltip && r.tooltip.options.enabled ? r.tooltip : void 0,
                        l = !!a && a.shared, c = i || r.hoverPoint, p = c && c.series || r.hoverSeries,
                        d = (!e || "touchmove" !== e.type) && (!!i || p && p.directTouch && this.isDirectTouch),
                        f = this.getHoverData(c, p, n, d, l, e);
                    c = f.hoverPoint, p = f.hoverSeries;
                    var g = f.hoverPoints, m = p && p.tooltipOptions.followPointer && !p.tooltipOptions.split,
                        y = l && p && !p.noSharedTooltip;
                    if (c && (o || c !== r.hoverPoint || a && a.isHidden)) {
                        if ((r.hoverPoints || []).forEach(function (t) {
                            -1 === g.indexOf(t) && t.setState()
                        }), r.hoverSeries !== p && p.onMouseOver(), this.applyInactiveState(g), (g || []).forEach(function (t) {
                            t.setState("hover")
                        }), r.hoverPoint && r.hoverPoint.firePointEvent("mouseOut"), !c.series) return;
                        r.hoverPoints = g, r.hoverPoint = c, c.firePointEvent("mouseOver", void 0, function () {
                            a && c && a.refresh(y ? g : c, e)
                        })
                    } else if (m && a && !a.isHidden) {
                        var v = a.getAnchor([{}], e);
                        r.isInsidePlot(v[0], v[1], {visiblePlotOnly: !0}) && a.updatePosition({plotX: v[0], plotY: v[1]})
                    }
                    this.unDocMouseMove || (this.unDocMouseMove = h(r.container.ownerDocument, "mousemove", function (e) {
                        var i = s[t.hoverChartIndex];
                        i && i.pointer.onDocumentMouseMove(e)
                    }), this.eventsToUnbind.push(this.unDocMouseMove)), r.axes.forEach(function (t) {
                        var i, o = x((t.crosshair || {}).snap, !0);
                        !o || (i = r.hoverPoint) && i.series[t.coll] === t || (i = u(g, function (e) {
                            return e.series && e.series[t.coll] === t
                        })), i || !o ? t.drawCrosshair(e, i) : t.hideCrosshair()
                    })
                }, t.prototype.scaleGroups = function (t, e) {
                    var i = this.chart;
                    i.series.forEach(function (o) {
                        var r = t || o.getPlotBox("series");
                        o.group && (o.xAxis && o.xAxis.zoomEnabled || i.mapView) && (o.group.attr(r), o.markerGroup && (o.markerGroup.attr(t || o.getPlotBox("marker")), o.markerGroup.clip(e ? i.clipRect : null)), o.dataLabelsGroup && o.dataLabelsGroup.attr(r))
                    }), i.clipRect.attr(e || i.clipBox)
                }, t.prototype.setDOMEvents = function () {
                    var i = this, o = this.chart.container, r = o.ownerDocument;
                    o.onmousedown = this.onContainerMouseDown.bind(this), o.onmousemove = this.onContainerMouseMove.bind(this), o.onclick = this.onContainerClick.bind(this), this.eventsToUnbind.push(h(o, "mouseenter", this.onContainerMouseEnter.bind(this))), this.eventsToUnbind.push(h(o, "mouseleave", this.onContainerMouseLeave.bind(this))), t.unbindDocumentMouseUp || (t.unbindDocumentMouseUp = h(r, "mouseup", this.onDocumentMouseUp.bind(this)));
                    for (var s = this.chart.renderTo.parentElement; s && "BODY" !== s.tagName;) this.eventsToUnbind.push(h(s, "scroll", function () {
                        delete i.chartPosition
                    })), s = s.parentElement;
                    e.hasTouch && (this.eventsToUnbind.push(h(o, "touchstart", this.onContainerTouchStart.bind(this), {passive: !1})), this.eventsToUnbind.push(h(o, "touchmove", this.onContainerTouchMove.bind(this), {passive: !1})), t.unbindDocumentTouchEnd || (t.unbindDocumentTouchEnd = h(r, "touchend", this.onDocumentTouchEnd.bind(this), {passive: !1})))
                }, t.prototype.setHoverChartIndex = function (i) {
                    var o = this.chart, r = e.charts[x(t.hoverChartIndex, -1)];
                    r && r !== o && r.pointer.onContainerMouseLeave(i || {relatedTarget: o.container}), r && r.mouseIsDown || (t.hoverChartIndex = o.index)
                }, t.prototype.touch = function (t, e) {
                    var i, o, r = this.chart;
                    this.setHoverChartIndex(), 1 === t.touches.length ? (t = this.normalize(t), r.isInsidePlot(t.chartX - r.plotLeft, t.chartY - r.plotTop, {visiblePlotOnly: !0}) && !r.openMenu ? (e && this.runPointActions(t), "touchmove" === t.type && (i = !!(o = this.pinchDown)[0] && Math.sqrt(Math.pow(o[0].chartX - t.chartX, 2) + Math.pow(o[0].chartY - t.chartY, 2)) >= 4), x(i, !0) && this.pinch(t)) : e && this.reset()) : 2 === t.touches.length && this.pinch(t)
                }, t.prototype.touchSelect = function (t) {
                    return !!(this.chart.zooming.singleTouch && t.touches && 1 === t.touches.length)
                }, t.prototype.zoomOption = function (t) {
                    var e, i, o = this.chart, r = (o.options.chart, o.inverted), s = o.zooming.type || "";
                    /touch/.test(t.type) && (s = x(o.zooming.pinchType, s)), this.zoomX = e = /x/.test(s), this.zoomY = i = /y/.test(s), this.zoomHor = e && !r || i && r, this.zoomVert = i && !r || e && r, this.hasZoom = e || i
                }, t
            }();
        return (o = C || (C = {})).compose = function t(e) {
            b(n, t) && h(e, "beforeRender", function () {
                this.pointer = new o(this, this.options)
            })
        }, C
    }), i(e, "Core/Legend/Legend.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Series/Point.js"], e["Core/Renderer/RendererUtilities.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s) {
        var n, a = t.animObject, h = t.setAnimation, l = e.format, c = i.composed, p = i.marginNames, d = r.distribute,
            u = s.addEvent, f = s.createElement, g = s.css, m = s.defined, y = s.discardElement, v = s.find,
            x = s.fireEvent, b = s.isNumber, M = s.merge, C = s.pick, S = s.pushUnique, w = s.relativeLength,
            k = s.stableSort, A = s.syncTimeout, T = function () {
                function t(t, e) {
                    var i = this;
                    this.allItems = [], this.initialItemY = 0, this.itemHeight = 0, this.itemMarginBottom = 0, this.itemMarginTop = 0, this.itemX = 0, this.itemY = 0, this.lastItemY = 0, this.lastLineHeight = 0, this.legendHeight = 0, this.legendWidth = 0, this.maxItemWidth = 0, this.maxLegendWidth = 0, this.offsetWidth = 0, this.padding = 0, this.pages = [], this.symbolHeight = 0, this.symbolWidth = 0, this.titleHeight = 0, this.totalItemWidth = 0, this.widthOption = 0, this.chart = t, this.setOptions(e), e.enabled && (this.render(), u(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes()
                    })), u(this.chart, "render", function () {
                        i.options.enabled && i.proximate && (i.proximatePositions(), i.positionItems())
                    })
                }

                return t.prototype.setOptions = function (t) {
                    var e = C(t.padding, 8);
                    this.options = t, this.chart.styledMode || (this.itemStyle = t.itemStyle, this.itemHiddenStyle = M(this.itemStyle, t.itemHiddenStyle)), this.itemMarginTop = t.itemMarginTop, this.itemMarginBottom = t.itemMarginBottom, this.padding = e, this.initialItemY = e - 5, this.symbolWidth = C(t.symbolWidth, 16), this.pages = [], this.proximate = "proximate" === t.layout && !this.chart.inverted, this.baseline = void 0
                }, t.prototype.update = function (t, e) {
                    var i = this.chart;
                    this.setOptions(M(!0, this.options, t)), this.destroy(), i.isDirtyLegend = i.isDirtyBox = !0, C(e, !0) && i.redraw(), x(this, "afterUpdate", {redraw: e})
                }, t.prototype.colorizeItem = function (t, e) {
                    var i = t.legendItem || {}, o = i.area, r = i.group, s = i.label, n = i.line, a = i.symbol;
                    if (null == r || r[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"), !this.chart.styledMode) {
                        var h = this.itemHiddenStyle, l = void 0 === h ? {} : h, c = l.color, p = t.options,
                            d = p.fillColor, u = p.fillOpacity, f = p.lineColor, g = p.marker, m = function (t) {
                                return !e && (t.fill && (t.fill = c), t.stroke && (t.stroke = c)), t
                            };
                        null == s || s.css(M(e ? this.itemStyle : l)), null == n || n.attr(m({stroke: f || t.color})), a && a.attr(m(g && a.isMarker ? t.pointAttribs() : {fill: t.color})), null == o || o.attr(m({
                            fill: d || t.color,
                            "fill-opacity": d ? 1 : null != u ? u : .75
                        }))
                    }
                    x(this, "afterColorizeItem", {item: t, visible: e})
                }, t.prototype.positionItems = function () {
                    this.allItems.forEach(this.positionItem, this), this.chart.isResizing || this.positionCheckboxes()
                }, t.prototype.positionItem = function (t) {
                    var e = this, i = t.legendItem || {}, o = i.group, r = i.x, s = void 0 === r ? 0 : r, n = i.y,
                        a = void 0 === n ? 0 : n, h = this.options, l = h.symbolPadding, c = !h.rtl, p = t.checkbox;
                    if (o && o.element) {
                        var d = {translateX: c ? s : this.legendWidth - s - 2 * l - 4, translateY: a};
                        o[m(o.translateY) ? "animate" : "attr"](d, void 0, function () {
                            x(e, "afterPositionItem", {item: t})
                        })
                    }
                    p && (p.x = s, p.y = a)
                }, t.prototype.destroyItem = function (t) {
                    for (var e = t.checkbox, i = t.legendItem || {}, o = 0, r = ["group", "label", "line", "symbol"]; o < r.length; o++) {
                        var s = r[o];
                        i[s] && (i[s] = i[s].destroy())
                    }
                    e && y(e), t.legendItem = void 0
                }, t.prototype.destroy = function () {
                    for (var t = 0, e = this.getAllItems(); t < e.length; t++) {
                        var i = e[t];
                        this.destroyItem(i)
                    }
                    for (var o = 0, r = ["clipRect", "up", "down", "pager", "nav", "box", "title", "group"]; o < r.length; o++) {
                        var s = r[o];
                        this[s] && (this[s] = this[s].destroy())
                    }
                    this.display = null
                }, t.prototype.positionCheckboxes = function () {
                    var t, e = this.group && this.group.alignAttr, i = this.clipHeight || this.legendHeight,
                        o = this.titleHeight;
                    e && (t = e.translateY, this.allItems.forEach(function (r) {
                        var s, n = r.checkbox;
                        n && (s = t + o + n.y + (this.scrollOffset || 0) + 3, g(n, {
                            left: e.translateX + r.checkboxOffset + n.x - 20 + "px",
                            top: s + "px",
                            display: this.proximate || s > t - 6 && s < t + i - 6 ? "" : "none"
                        }))
                    }, this))
                }, t.prototype.renderTitle = function () {
                    var t, e = this.options, i = this.padding, o = e.title, r = 0;
                    o.text && (this.title || (this.title = this.chart.renderer.label(o.text, i - 3, i - 4, void 0, void 0, void 0, e.useHTML, void 0, "legend-title").attr({zIndex: 1}), this.chart.styledMode || this.title.css(o.style), this.title.add(this.group)), o.width || this.title.css({width: this.maxLegendWidth + "px"}), r = (t = this.title.getBBox()).height, this.offsetWidth = t.width, this.contentGroup.attr({translateY: r})), this.titleHeight = r
                }, t.prototype.setText = function (t) {
                    var e = this.options;
                    t.legendItem.label.attr({text: e.labelFormat ? l(e.labelFormat, t, this.chart) : e.labelFormatter.call(t)})
                }, t.prototype.renderItem = function (t) {
                    var e = t.legendItem = t.legendItem || {}, i = this.chart, o = i.renderer, r = this.options,
                        s = "horizontal" === r.layout, n = this.symbolWidth, a = r.symbolPadding || 0, h = this.itemStyle,
                        l = this.itemHiddenStyle, c = s ? C(r.itemDistance, 20) : 0, p = !r.rtl, d = !t.series,
                        u = !d && t.series.drawLegendSymbol ? t.series : t, f = u.options,
                        g = !!this.createCheckboxForItem && f && f.showCheckbox, m = r.useHTML, y = t.options.className,
                        v = e.label, x = n + a + c + (g ? 20 : 0);
                    !v && (e.group = o.g("legend-item").addClass("highcharts-" + u.type + "-series highcharts-color-" + t.colorIndex + (y ? " " + y : "") + (d ? " highcharts-series-" + t.index : "")).attr({zIndex: 1}).add(this.scrollGroup), e.label = v = o.text("", p ? n + a : -a, this.baseline || 0, m), i.styledMode || v.css(M(t.visible ? h : l)), v.attr({
                        align: p ? "left" : "right",
                        zIndex: 2
                    }).add(e.group), !this.baseline && (this.fontMetrics = o.fontMetrics(v), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, v.attr("y", this.baseline), this.symbolHeight = C(r.symbolHeight, this.fontMetrics.f), r.squareSymbol && (this.symbolWidth = C(r.symbolWidth, Math.max(this.symbolHeight, 16)), x = this.symbolWidth + a + c + (g ? 20 : 0), p && v.attr("x", this.symbolWidth + a))), u.drawLegendSymbol(this, t), this.setItemEvents && this.setItemEvents(t, v, m)), g && !t.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(t), this.colorizeItem(t, t.visible), (i.styledMode || !h.width) && v.css({width: (r.itemWidth || this.widthOption || i.spacingBox.width) - x + "px"}), this.setText(t);
                    var b = v.getBBox(), S = this.fontMetrics && this.fontMetrics.h || 0;
                    t.itemWidth = t.checkboxOffset = r.itemWidth || e.labelWidth || b.width + x, this.maxItemWidth = Math.max(this.maxItemWidth, t.itemWidth), this.totalItemWidth += t.itemWidth, this.itemHeight = t.itemHeight = Math.round(e.labelHeight || (b.height > 1.5 * S ? b.height : S))
                }, t.prototype.layoutItem = function (t) {
                    var e = this.options, i = this.padding, o = "horizontal" === e.layout, r = t.itemHeight,
                        s = this.itemMarginBottom, n = this.itemMarginTop, a = o ? C(e.itemDistance, 20) : 0,
                        h = this.maxLegendWidth,
                        l = e.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : t.itemWidth,
                        c = t.legendItem || {};
                    o && this.itemX - i + l > h && (this.itemX = i, this.lastLineHeight && (this.itemY += n + this.lastLineHeight + s), this.lastLineHeight = 0), this.lastItemY = n + this.itemY + s, this.lastLineHeight = Math.max(r, this.lastLineHeight), c.x = this.itemX, c.y = this.itemY, o ? this.itemX += l : (this.itemY += n + r + s, this.lastLineHeight = r), this.offsetWidth = this.widthOption || Math.max((o ? this.itemX - i - (t.checkbox ? 0 : a) : l) + i, this.offsetWidth)
                }, t.prototype.getAllItems = function () {
                    var t = [];
                    return this.chart.series.forEach(function (e) {
                        var i = e && e.options;
                        e && C(i.showInLegend, !m(i.linkedTo) && void 0, !0) && (t = t.concat((e.legendItem || {}).labels || ("point" === i.legendType ? e.data : e)))
                    }), x(this, "afterGetAllItems", {allItems: t}), t
                }, t.prototype.getAlignment = function () {
                    var t = this.options;
                    return this.proximate ? t.align.charAt(0) + "tv" : t.floating ? "" : t.align.charAt(0) + t.verticalAlign.charAt(0) + t.layout.charAt(0)
                }, t.prototype.adjustMargins = function (t, e) {
                    var i = this.chart, o = this.options, r = this.getAlignment();
                    r && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (s, n) {
                        s.test(r) && !m(t[n]) && (i[p[n]] = Math.max(i[p[n]], i.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * o[n % 2 ? "x" : "y"] + C(o.margin, 12) + e[n] + (i.titleOffset[n] || 0)))
                    })
                }, t.prototype.proximatePositions = function () {
                    var t, e = this.chart, i = [], o = "left" === this.options.align;
                    this.allItems.forEach(function (t) {
                        var r, s, n, a, h = o;
                        t.yAxis && (t.xAxis.options.reversed && (h = !h), t.points && (r = v(h ? t.points : t.points.slice(0).reverse(), function (t) {
                            return b(t.plotY)
                        })), s = this.itemMarginTop + t.legendItem.label.getBBox().height + this.itemMarginBottom, a = t.yAxis.top - e.plotTop, n = t.visible ? (r ? r.plotY : t.yAxis.height) + (a - .3 * s) : a + t.yAxis.height, i.push({
                            target: n,
                            size: s,
                            item: t
                        }))
                    }, this);
                    for (var r = 0, s = d(i, e.plotHeight); r < s.length; r++) {
                        var n = s[r];
                        t = n.item.legendItem || {}, b(n.pos) && (t.y = e.plotTop - e.spacing[0] + n.pos)
                    }
                }, t.prototype.render = function () {
                    var t, e, i, o, r = this.chart, s = r.renderer, n = this.options, a = this.padding,
                        h = this.getAllItems(), l = this.group, c = this.box;
                    this.itemX = a, this.itemY = this.initialItemY, this.offsetWidth = 0, this.lastItemY = 0, this.widthOption = w(n.width, r.spacingBox.width - a), o = r.spacingBox.width - 2 * a - n.x, ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) > -1 && (o /= 2), this.maxLegendWidth = this.widthOption || o, l || (this.group = l = s.g("legend").addClass(n.className || "").attr({zIndex: 7}).add(), this.contentGroup = s.g().attr({zIndex: 1}).add(l), this.scrollGroup = s.g().add(this.contentGroup)), this.renderTitle(), k(h, function (t, e) {
                        return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
                    }), n.reversed && h.reverse(), this.allItems = h, this.display = t = !!h.length, this.lastLineHeight = 0, this.maxItemWidth = 0, this.totalItemWidth = 0, this.itemHeight = 0, h.forEach(this.renderItem, this), h.forEach(this.layoutItem, this), e = (this.widthOption || this.offsetWidth) + a, i = this.lastItemY + this.lastLineHeight + this.titleHeight, i = this.handleOverflow(i) + a, c || (this.box = c = s.rect().addClass("highcharts-legend-box").attr({r: n.borderRadius}).add(l)), r.styledMode || c.attr({
                        stroke: n.borderColor,
                        "stroke-width": n.borderWidth || 0,
                        fill: n.backgroundColor || "none"
                    }).shadow(n.shadow), e > 0 && i > 0 && c[c.placed ? "animate" : "attr"](c.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: e,
                        height: i
                    }, c.strokeWidth())), l[t ? "show" : "hide"](), r.styledMode && "none" === l.getStyle("display") && (e = i = 0), this.legendWidth = e, this.legendHeight = i, t && this.align(), this.proximate || this.positionItems(), x(this, "afterRender")
                }, t.prototype.align = function (t) {
                    void 0 === t && (t = this.chart.spacingBox);
                    var e = this.chart, i = this.options, o = t.y;
                    /(lth|ct|rth)/.test(this.getAlignment()) && e.titleOffset[0] > 0 ? o += e.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && e.titleOffset[2] > 0 && (o -= e.titleOffset[2]), o !== t.y && (t = M(t, {y: o})), e.hasRendered || (this.group.placed = !1), this.group.align(M(i, {
                        width: this.legendWidth,
                        height: this.legendHeight,
                        verticalAlign: this.proximate ? "top" : i.verticalAlign
                    }), !0, t)
                }, t.prototype.handleOverflow = function (t) {
                    var e, i, o, r = this, s = this.chart, n = s.renderer, a = this.options, h = a.y,
                        l = "top" === a.verticalAlign, c = this.padding, p = a.maxHeight, d = a.navigation,
                        u = C(d.animation, !0), f = d.arrowSize || 12, g = this.pages, m = this.allItems, y = function (t) {
                            "number" == typeof t ? M.attr({height: t}) : M && (r.clipRect = M.destroy(), r.contentGroup.clip()), r.contentGroup.div && (r.contentGroup.div.style.clip = t ? "rect(" + c + "px,9999px," + (c + t) + "px,0)" : "auto")
                        }, v = function (t) {
                            return r[t] = n.circle(0, 0, 1.3 * f).translate(f / 2, f / 2).add(b), s.styledMode || r[t].attr("fill", "rgba(0,0,0,0.0001)"), r[t]
                        }, x = s.spacingBox.height + (l ? -h : h) - c, b = this.nav, M = this.clipRect;
                    return "horizontal" !== a.layout || "middle" === a.verticalAlign || a.floating || (x /= 2), p && (x = Math.min(x, p)), g.length = 0, t && x > 0 && t > x && !1 !== d.enabled ? (this.clipHeight = e = Math.max(x - 20 - this.titleHeight - c, 0), this.currentPage = C(this.currentPage, 1), this.fullHeight = t, m.forEach(function (t, r) {
                        var s = (o = t.legendItem || {}).y || 0, n = Math.round(o.label.getBBox().height), a = g.length;
                        (!a || s - g[a - 1] > e && (i || s) !== g[a - 1]) && (g.push(i || s), a++), o.pageIx = a - 1, i && ((m[r - 1].legendItem || {}).pageIx = a - 1), r === m.length - 1 && s + n - g[a - 1] > e && s > g[a - 1] && (g.push(s), o.pageIx = a), s !== i && (i = s)
                    }), M || (M = r.clipRect = n.clipRect(0, c - 2, 9999, 0), r.contentGroup.clip(M)), y(e), b || (this.nav = b = n.g().attr({zIndex: 1}).add(this.group), this.up = n.symbol("triangle", 0, 0, f, f).add(b), v("upTracker").on("click", function () {
                        r.scroll(-1, u)
                    }), this.pager = n.text("", 15, 10).addClass("highcharts-legend-navigation"), !s.styledMode && d.style && this.pager.css(d.style), this.pager.add(b), this.down = n.symbol("triangle-down", 0, 0, f, f).add(b), v("downTracker").on("click", function () {
                        r.scroll(1, u)
                    })), r.scroll(0), t = x) : b && (y(), this.nav = b.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0), t
                }, t.prototype.scroll = function (t, e) {
                    var i = this, o = this.chart, r = this.pages, s = r.length, n = this.clipHeight,
                        l = this.options.navigation, c = this.pager, p = this.padding, d = this.currentPage + t;
                    d > s && (d = s), d > 0 && (void 0 !== e && h(e, o), this.nav.attr({
                        translateX: p,
                        translateY: n + this.padding + 7 + this.titleHeight,
                        visibility: "inherit"
                    }), [this.up, this.upTracker].forEach(function (t) {
                        t.attr({class: 1 === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"})
                    }), c.attr({text: d + "/" + s}), [this.down, this.downTracker].forEach(function (t) {
                        t.attr({
                            x: 18 + this.pager.getBBox().width,
                            class: d === s ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                        })
                    }, this), o.styledMode || (this.up.attr({fill: 1 === d ? l.inactiveColor : l.activeColor}), this.upTracker.css({cursor: 1 === d ? "default" : "pointer"}), this.down.attr({fill: d === s ? l.inactiveColor : l.activeColor}), this.downTracker.css({cursor: d === s ? "default" : "pointer"})), this.scrollOffset = -r[d - 1] + this.initialItemY, this.scrollGroup.animate({translateY: this.scrollOffset}), this.currentPage = d, this.positionCheckboxes(), A(function () {
                        x(i, "afterScroll", {currentPage: d})
                    }, a(C(e, o.renderer.globalAnimation, !0)).duration))
                }, t.prototype.setItemEvents = function (t, e, i) {
                    for (var r = this, s = t.legendItem || {}, n = r.chart.renderer.boxWrapper, a = t instanceof o, h = "highcharts-legend-" + (a ? "point" : "series") + "-active", l = r.chart.styledMode, c = i ? [e, s.symbol] : [s.group], p = function (e) {
                        r.allItems.forEach(function (i) {
                            t !== i && [i].concat(i.linkedSeries || []).forEach(function (t) {
                                t.setState(e, !a)
                            })
                        })
                    }, d = 0; d < c.length; d++) {
                        var u = c[d];
                        u && u.on("mouseover", function () {
                            t.visible && p("inactive"), t.setState("hover"), t.visible && n.addClass(h), l || e.css(r.options.itemHoverStyle)
                        }).on("mouseout", function () {
                            r.chart.styledMode || e.css(M(t.visible ? r.itemStyle : r.itemHiddenStyle)), p(""), n.removeClass(h), t.setState()
                        }).on("click", function (e) {
                            var i = "legendItemClick", o = function () {
                                t.setVisible && t.setVisible(), p(t.visible ? "inactive" : "")
                            };
                            n.removeClass(h), e = {browserEvent: e}, t.firePointEvent ? t.firePointEvent(i, e, o) : x(t, i, e, o)
                        })
                    }
                }, t.prototype.createCheckboxForItem = function (t) {
                    t.checkbox = f("input", {
                        type: "checkbox",
                        className: "highcharts-legend-checkbox",
                        checked: t.selected,
                        defaultChecked: t.selected
                    }, this.options.itemCheckboxStyle, this.chart.container), u(t.checkbox, "click", function (e) {
                        var i = e.target;
                        x(t.series || t, "checkboxClick", {checked: i.checked, item: t}, function () {
                            t.select()
                        })
                    })
                }, t
            }();
        return (n = T || (T = {})).compose = function t(e) {
            S(c, t) && u(e, "beforeMargins", function () {
                this.legend = new n(this, this.options.legend)
            })
        }, T
    }), i(e, "Core/Legend/LegendSymbol.js", [e["Core/Utilities.js"]], function (t) {
        var e, i = this && this.__spreadArray || function (t, e, i) {
            if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
            return t.concat(o || Array.prototype.slice.call(e))
        }, o = t.extend, r = t.merge, s = t.pick;
        return function (t) {
            function e(t, e, n) {
                var a, h, l = this.legendItem = this.legendItem || {}, c = this.chart, p = this.options, d = t.baseline,
                    u = void 0 === d ? 0 : d, f = t.symbolWidth, g = t.symbolHeight, m = this.symbol || "circle",
                    y = g / 2, v = c.renderer, x = l.group, b = u - Math.round(g * (n ? .4 : .3)), M = {}, C = p.marker,
                    S = 0;
                if (c.styledMode || (M["stroke-width"] = Math.min(p.lineWidth || 0, 24), p.dashStyle ? M.dashstyle = p.dashStyle : "square" === p.linecap || (M["stroke-linecap"] = "round")), l.line = v.path().addClass("highcharts-graph").attr(M).add(x), n && (l.area = v.path().addClass("highcharts-area").add(x)), M["stroke-linecap"] && (S = Math.min(l.line.strokeWidth(), f) / 2), f) {
                    var w = [["M", S, b], ["L", f - S, b]];
                    l.line.attr({d: w}), null === (a = l.area) || void 0 === a || a.attr({d: i(i([], w, !0), [["L", f - S, u], ["L", S, u]], !1)})
                }
                if (C && !1 !== C.enabled && f) {
                    var k = Math.min(s(C.radius, y), y);
                    0 === m.indexOf("url") && (C = r(C, {
                        width: g,
                        height: g
                    }), k = 0), l.symbol = h = v.symbol(m, f / 2 - k, b - k, 2 * k, 2 * k, o({context: "legend"}, C)).addClass("highcharts-point").add(x), h.isMarker = !0
                }
            }

            t.areaMarker = function (t, i) {
                e.call(this, t, i, !0)
            }, t.lineMarker = e, t.rectangle = function (t, e) {
                var i = e.legendItem || {}, o = t.options, r = t.symbolHeight, n = o.squareSymbol,
                    a = n ? r : t.symbolWidth;
                i.symbol = this.chart.renderer.rect(n ? (t.symbolWidth - r) / 2 : 0, t.baseline - r + 1, a, r, s(t.options.symbolRadius, r / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(i.group)
            }
        }(e || (e = {})), e
    }), i(e, "Core/Series/SeriesDefaults.js", [], function () {
        return {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: {duration: 1e3},
            enableMouseTracking: !0,
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: "#ffffff",
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: {animation: !0},
                    hover: {animation: {duration: 150}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1},
                    select: {fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2}
                }
            },
            point: {events: {}},
            dataLabels: {
                animation: {},
                align: "center",
                borderWidth: 0,
                defer: !0,
                formatter: function () {
                    var t = this.series.chart.numberFormatter;
                    return "number" != typeof this.y ? "" : t(this.y, -1)
                },
                padding: 5,
                style: {fontSize: "0.7em", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"},
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {animation: !0},
                hover: {animation: {duration: 150}, lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}},
                select: {animation: {duration: 0}},
                inactive: {animation: {duration: 150}, opacity: .2}
            },
            stickyTracking: !0,
            turboThreshold: 1e3,
            findNearestPointBy: "x"
        }
    }), i(e, "Core/Series/SeriesRegistry.js", [e["Core/Globals.js"], e["Core/Defaults.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r, s = e.defaultOptions, n = o.extendClass, a = o.merge;
        return function (e) {
            function o(t, o) {
                var r = s.plotOptions || {}, n = o.defaultOptions, a = o.prototype;
                a.type = t, a.pointClass || (a.pointClass = i), n && (r[t] = n), e.seriesTypes[t] = o
            }

            e.seriesTypes = t.seriesTypes, e.registerSeriesType = o, e.seriesType = function (t, r, h, l, c) {
                var p = s.plotOptions || {};
                return r = r || "", p[t] = a(p[r], h), o(t, n(e.seriesTypes[r] || function () {
                }, l)), e.seriesTypes[t].prototype.type = t, c && (e.seriesTypes[t].prototype.pointClass = n(i, c)), e.seriesTypes[t]
            }
        }(r || (r = {})), r
    }), i(e, "Core/Series/Series.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Defaults.js"], e["Core/Foundation.js"], e["Core/Globals.js"], e["Core/Legend/LegendSymbol.js"], e["Core/Series/Point.js"], e["Core/Series/SeriesDefaults.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s, n, a, h, l) {
        var c = this && this.__spreadArray || function (t, e, i) {
                if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
                return t.concat(o || Array.prototype.slice.call(e))
            }, p = t.animObject, d = t.setAnimation, u = e.defaultOptions, f = i.registerEventOptions, g = o.hasTouch,
            m = o.svg, y = o.win, v = a.seriesTypes, x = l.arrayMax, b = l.arrayMin, M = l.clamp, C = l.correctFloat,
            S = l.defined, w = l.destroyObjectProperties, k = l.diffObjects, A = l.erase, T = l.error, P = l.extend,
            L = l.find, j = l.fireEvent, O = l.getClosestDistance, E = l.getNestedProperty, D = l.insertItem,
            B = l.isArray, I = l.isNumber, z = l.isString, R = l.merge, N = l.objectEach, _ = l.pick, G = l.removeEvent,
            W = l.splat, X = l.syncTimeout, H = function () {
                function t() {
                    this.zoneAxis = "y"
                }

                return t.prototype.init = function (t, e) {
                    j(this, "init", {options: e});
                    var i, o = this, r = t.series;
                    this.eventsToUnbind = [], o.chart = t, o.options = o.setOptions(e);
                    var s = o.options, n = !1 !== s.visible;
                    o.linkedSeries = [], o.bindAxes(), P(o, {
                        name: s.name,
                        state: "",
                        visible: n,
                        selected: !0 === s.selected
                    }), f(this, s);
                    var a = s.events;
                    (a && a.click || s.point && s.point.events && s.point.events.click || s.allowPointSelect) && (t.runTrackerClick = !0), o.getColor(), o.getSymbol(), o.parallelArrays.forEach(function (t) {
                        o[t + "Data"] || (o[t + "Data"] = [])
                    }), o.isCartesian && (t.hasCartesianSeries = !0), r.length && (i = r[r.length - 1]), o._i = _(i && i._i, -1) + 1, o.opacity = o.options.opacity, t.orderItems("series", D(this, r)), s.dataSorting && s.dataSorting.enabled ? o.setDataSortingOptions() : o.points || o.data || o.setData(s.data, !1), j(this, "afterInit")
                }, t.prototype.is = function (t) {
                    return v[t] && this instanceof v[t]
                }, t.prototype.bindAxes = function () {
                    var t, e = this, i = e.options, o = e.chart;
                    j(this, "bindAxes", null, function () {
                        (e.axisTypes || []).forEach(function (r) {
                            o[r].forEach(function (o) {
                                t = o.options, (_(i[r], 0) === o.index || void 0 !== i[r] && i[r] === t.id) && (D(e, o.series), e[r] = o, o.isDirty = !0)
                            }), e[r] || e.optionalAxis === r || T(18, !0, o)
                        })
                    }), j(this, "afterBindAxes")
                }, t.prototype.updateParallelArrays = function (t, e, i) {
                    var o = t.series, r = I(e) ? function (i) {
                        var r = "y" === i && o.toYData ? o.toYData(t) : t[i];
                        o[i + "Data"][e] = r
                    } : function (t) {
                        Array.prototype[e].apply(o[t + "Data"], i)
                    };
                    o.parallelArrays.forEach(r)
                }, t.prototype.hasData = function () {
                    return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.yData && this.yData.length > 0
                }, t.prototype.hasMarkerChanged = function (t, e) {
                    var i = t.marker, o = e.marker || {};
                    return i && (o.enabled && !i.enabled || o.symbol !== i.symbol || o.height !== i.height || o.width !== i.width)
                }, t.prototype.autoIncrement = function (t) {
                    var e, i, o = this.options, r = o.pointIntervalUnit, s = o.relativeXValue, n = this.chart.time,
                        a = this.xIncrement;
                    return (a = _(a, o.pointStart, 0), this.pointInterval = i = _(this.pointInterval, o.pointInterval, 1), s && I(t) && (i *= t), r && (e = new n.Date(a), "day" === r ? n.set("Date", e, n.get("Date", e) + i) : "month" === r ? n.set("Month", e, n.get("Month", e) + i) : "year" === r && n.set("FullYear", e, n.get("FullYear", e) + i), i = e.getTime() - a), s && I(t)) ? a + i : (this.xIncrement = a + i, a)
                }, t.prototype.setDataSortingOptions = function () {
                    var t = this.options;
                    P(this, {
                        requireSorting: !1,
                        sorted: !1,
                        enabledDataSorting: !0,
                        allowDG: !1
                    }), S(t.pointRange) || (t.pointRange = 1)
                }, t.prototype.setOptions = function (t) {
                    var e, i, o, r = this.chart, s = r.options.plotOptions, n = r.userOptions || {}, a = R(t),
                        h = r.styledMode, l = {plotOptions: s, userOptions: a};
                    j(this, "setOptions", l);
                    var c = l.plotOptions[this.type], p = n.plotOptions || {}, d = p.series || {},
                        f = u.plotOptions[this.type] || {}, g = p[this.type] || {};
                    this.userOptions = l.userOptions;
                    var m = R(c, s.series, g, a);
                    this.tooltipOptions = R(u.tooltip, null === (e = u.plotOptions.series) || void 0 === e ? void 0 : e.tooltip, null == f ? void 0 : f.tooltip, r.userOptions.tooltip, null === (i = p.series) || void 0 === i ? void 0 : i.tooltip, g.tooltip, a.tooltip), this.stickyTracking = _(a.stickyTracking, g.stickyTracking, d.stickyTracking, !!this.tooltipOptions.shared && !this.noSharedTooltip || m.stickyTracking), null === c.marker && delete m.marker, this.zoneAxis = m.zoneAxis || "y";
                    var y = this.zones = (m.zones || []).slice();
                    return (m.negativeColor || m.negativeFillColor) && !m.zones && (o = {
                        value: m[this.zoneAxis + "Threshold"] || m.threshold || 0,
                        className: "highcharts-negative"
                    }, h || (o.color = m.negativeColor, o.fillColor = m.negativeFillColor), y.push(o)), y.length && S(y[y.length - 1].value) && y.push(h ? {} : {
                        color: this.color,
                        fillColor: this.fillColor
                    }), j(this, "afterSetOptions", {options: m}), m
                }, t.prototype.getName = function () {
                    return _(this.options.name, "Series " + (this.index + 1))
                }, t.prototype.getCyclic = function (t, e, i) {
                    var o, r, s = this.chart, n = "".concat(t, "Index"), a = "".concat(t, "Counter"),
                        h = (null == i ? void 0 : i.length) || s.options.chart.colorCount;
                    !e && (S(r = _("color" === t ? this.options.colorIndex : void 0, this[n])) ? o = r : (s.series.length || (s[a] = 0), o = s[a] % h, s[a] += 1), i && (e = i[o])), void 0 !== o && (this[n] = o), this[t] = e
                }, t.prototype.getColor = function () {
                    this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || u.plotOptions[this.type].color, this.chart.options.colors)
                }, t.prototype.getPointsCollection = function () {
                    return (this.hasGroupedData ? this.points : this.data) || []
                }, t.prototype.getSymbol = function () {
                    var t = this.options.marker;
                    this.getCyclic("symbol", t.symbol, this.chart.options.symbols)
                }, t.prototype.findPointIndex = function (t, e) {
                    var i, o, r, n = t.id, a = t.x, h = this.points, l = this.options.dataSorting;
                    if (n) {
                        var c = this.chart.get(n);
                        c instanceof s && (i = c)
                    } else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) {
                        var p = function (e) {
                            return !e.touched && e.index === t.index
                        };
                        if (l && l.matchByName ? p = function (e) {
                            return !e.touched && e.name === t.name
                        } : this.options.relativeXValue && (p = function (e) {
                            return !e.touched && e.options.x === t.x
                        }), !(i = L(h, p))) return
                    }
                    return i && void 0 !== (r = i && i.index) && (o = !0), void 0 === r && I(a) && (r = this.xData.indexOf(a, e)), -1 !== r && void 0 !== r && this.cropped && (r = r >= this.cropStart ? r - this.cropStart : r), !o && I(r) && h[r] && h[r].touched && (r = void 0), r
                }, t.prototype.updateData = function (t, e) {
                    var i, o, r, s, n = this.options, a = n.dataSorting, h = this.points, l = [], c = this.requireSorting,
                        p = t.length === h.length, d = !0;
                    if (this.xIncrement = null, t.forEach(function (t, e) {
                        var o, r = S(t) && this.pointClass.prototype.optionsToObject.call({series: this}, t) || {}, d = r.x;
                        r.id || I(d) ? (-1 === (o = this.findPointIndex(r, s)) || void 0 === o ? l.push(t) : h[o] && t !== n.data[o] ? (h[o].update(t, !1, null, !1), h[o].touched = !0, c && (s = o + 1)) : h[o] && (h[o].touched = !0), (!p || e !== o || a && a.enabled || this.hasDerivedData) && (i = !0)) : l.push(t)
                    }, this), i) for (o = h.length; o--;) (r = h[o]) && !r.touched && r.remove && r.remove(!1, e); else !p || a && a.enabled ? d = !1 : (t.forEach(function (t, e) {
                        t === h[e].y || h[e].destroyed || h[e].update(t, !1, null, !1)
                    }), l.length = 0);
                    return h.forEach(function (t) {
                        t && (t.touched = !1)
                    }), !!d && (l.forEach(function (t) {
                        this.addPoint(t, !1, null, null, !1)
                    }, this), null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = x(this.xData), this.autoIncrement()), !0)
                }, t.prototype.setData = function (t, e, i, o) {
                    void 0 === e && (e = !0);
                    var r, s, n, a, h, l = this, c = l.points, p = c && c.length || 0, d = l.options, u = l.chart,
                        f = d.dataSorting, g = l.xAxis, m = d.turboThreshold, y = this.xData, v = this.yData,
                        x = l.pointArrayMap, b = x && x.length, M = d.keys, C = 0, S = 1, w = null;
                    u.options.chart.allowMutatingData || (d.data && delete l.options.data, l.userOptions.data && delete l.userOptions.data, h = R(!0, t));
                    var k = (t = h || t || []).length;
                    if (f && f.enabled && (t = this.sortData(t)), u.options.chart.allowMutatingData && !1 !== o && k && p && !l.cropped && !l.hasGroupedData && l.visible && !l.boosted && (a = this.updateData(t, i)), !a) {
                        if (l.xIncrement = null, l.colorCounter = 0, this.parallelArrays.forEach(function (t) {
                            l[t + "Data"].length = 0
                        }), m && k > m) {
                            if (I(w = l.getFirstValidPoint(t))) for (s = 0; s < k; s++) y[s] = this.autoIncrement(), v[s] = t[s]; else if (B(w)) {
                                if (b) {
                                    if (w.length === b) for (s = 0; s < k; s++) y[s] = this.autoIncrement(), v[s] = t[s]; else for (s = 0; s < k; s++) n = t[s], y[s] = n[0], v[s] = n.slice(1, b + 1)
                                } else if (M && (C = M.indexOf("x"), S = M.indexOf("y"), C = C >= 0 ? C : 0, S = S >= 0 ? S : 1), 1 === w.length && (S = 0), C === S) for (s = 0; s < k; s++) y[s] = this.autoIncrement(), v[s] = t[s][S]; else for (s = 0; s < k; s++) n = t[s], y[s] = n[C], v[s] = n[S]
                            } else T(12, !1, u)
                        } else for (s = 0; s < k; s++) n = {series: l}, l.pointClass.prototype.applyOptions.apply(n, [t[s]]), l.updateParallelArrays(n, s);
                        for (v && z(v[0]) && T(14, !0, u), l.data = [], l.options.data = l.userOptions.data = t, s = p; s--;) null === (r = c[s]) || void 0 === r || r.destroy();
                        g && (g.minRange = g.userMinRange), l.isDirty = u.isDirtyBox = !0, l.isDirtyData = !!c, i = !1
                    }
                    "point" === d.legendType && (this.processData(), this.generatePoints()), e && u.redraw(i)
                }, t.prototype.sortData = function (t) {
                    var e = this, i = e.options.dataSorting.sortKey || "y", o = function (t, e) {
                        return S(e) && t.pointClass.prototype.optionsToObject.call({series: t}, e) || {}
                    };
                    return t.forEach(function (i, r) {
                        t[r] = o(e, i), t[r].index = r
                    }, this), t.concat().sort(function (t, e) {
                        var o = E(i, t), r = E(i, e);
                        return r < o ? -1 : r > o ? 1 : 0
                    }).forEach(function (t, e) {
                        t.x = e
                    }, this), e.linkedSeries && e.linkedSeries.forEach(function (e) {
                        var i = e.options, r = i.data;
                        i.dataSorting && i.dataSorting.enabled || !r || (r.forEach(function (i, s) {
                            r[s] = o(e, i), t[s] && (r[s].x = t[s].x, r[s].index = s)
                        }), e.setData(r, !1))
                    }), t
                }, t.prototype.getProcessedData = function (t) {
                    var e, i, o, r, s, n = this, a = n.xAxis, h = n.options, l = h.cropThreshold,
                        c = t || n.getExtremesFromAll || h.getExtremesFromAll, p = null == a ? void 0 : a.logarithmic,
                        d = n.isCartesian, u = 0, f = n.xData, g = n.yData, m = !1, y = f.length;
                    a && (r = (o = a.getExtremes()).min, s = o.max, m = !!(a.categories && !a.names.length)), d && n.sorted && !c && (!l || y > l || n.forceCrop) && (f[y - 1] < r || f[0] > s ? (f = [], g = []) : n.yData && (f[0] < r || f[y - 1] > s) && (f = (e = this.cropData(n.xData, n.yData, r, s)).xData, g = e.yData, u = e.start, i = !0));
                    var v = O([p ? f.map(p.log2lin) : f], function () {
                        return n.requireSorting && !m && T(15, !1, n.chart)
                    });
                    return {xData: f, yData: g, cropped: i, cropStart: u, closestPointRange: v}
                }, t.prototype.processData = function (t) {
                    var e = this.xAxis;
                    if (this.isCartesian && !this.isDirty && !e.isDirty && !this.yAxis.isDirty && !t) return !1;
                    var i = this.getProcessedData();
                    this.cropped = i.cropped, this.cropStart = i.cropStart, this.processedXData = i.xData, this.processedYData = i.yData, this.closestPointRange = this.basePointRange = i.closestPointRange, j(this, "afterProcessData")
                }, t.prototype.cropData = function (t, e, i, o) {
                    var r, s, n = t.length, a = 0, h = n;
                    for (r = 0; r < n; r++) if (t[r] >= i) {
                        a = Math.max(0, r - 1);
                        break
                    }
                    for (s = r; s < n; s++) if (t[s] > o) {
                        h = s + 1;
                        break
                    }
                    return {xData: t.slice(a, h), yData: e.slice(a, h), start: a, end: h}
                }, t.prototype.generatePoints = function () {
                    var t, e, i, o, r = this.options, s = this.processedData || r.data, n = this.processedXData,
                        a = this.processedYData, h = this.pointClass, l = n.length, c = this.cropStart || 0,
                        p = this.hasGroupedData, d = r.keys, u = [], f = r.dataGrouping && r.dataGrouping.groupAll ? c : 0,
                        g = this.data;
                    if (!g && !p) {
                        var m = [];
                        m.length = s.length, g = this.data = m
                    }
                    for (d && p && (this.options.keys = !1), o = 0; o < l; o++) e = c + o, p ? ((i = new h(this, [n[o]].concat(W(a[o])))).dataGroup = this.groupMap[f + o], i.dataGroup.options && (i.options = i.dataGroup.options, P(i, i.dataGroup.options), delete i.dataLabels)) : (i = g[e]) || void 0 === s[e] || (g[e] = i = new h(this, s[e], n[o])), i && (i.index = p ? f + o : e, u[o] = i);
                    if (this.options.keys = d, g && (l !== (t = g.length) || p)) for (o = 0; o < t; o++) o !== c || p || (o += l), g[o] && (g[o].destroyElements(), g[o].plotX = void 0);
                    this.data = g, this.points = u, j(this, "afterGeneratePoints")
                }, t.prototype.getXExtremes = function (t) {
                    return {min: b(t), max: x(t)}
                }, t.prototype.getExtremes = function (t, e) {
                    var i, o, r, s, n, a, h, l = this.xAxis, c = this.yAxis, p = this.processedXData || this.xData, d = [],
                        u = this.requireSorting && !this.is("column") ? 1 : 0, f = !!c && c.positiveValuesOnly, g = 0,
                        m = 0, y = 0, v = (t = t || this.stackedYData || this.processedYData || []).length;
                    for (l && (g = (i = l.getExtremes()).min, m = i.max), a = 0; a < v; a++) if (s = p[a], o = (I(n = t[a]) || B(n)) && ((I(n) ? n > 0 : n.length) || !f), r = e || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !l || (p[a + u] || s) >= g && (p[a - u] || s) <= m, o && r) {
                        if (h = n.length) for (; h--;) I(n[h]) && (d[y++] = n[h]); else d[y++] = n
                    }
                    var M = {activeYData: d, dataMin: b(d), dataMax: x(d)};
                    return j(this, "afterGetExtremes", {dataExtremes: M}), M
                }, t.prototype.applyExtremes = function () {
                    var t = this.getExtremes();
                    return this.dataMin = t.dataMin, this.dataMax = t.dataMax, t
                }, t.prototype.getFirstValidPoint = function (t) {
                    for (var e = t.length, i = 0, o = null; null === o && i < e;) o = t[i], i++;
                    return o
                }, t.prototype.translate = function () {
                    this.processedXData || this.processData(), this.generatePoints();
                    var t, e, i, o, r, s = this.options, n = s.stacking, a = this.xAxis, h = a.categories,
                        l = this.enabledDataSorting, c = this.yAxis, p = this.points, d = p.length,
                        u = this.pointPlacementToXValue(), f = !!u, g = s.threshold, m = s.startFromThreshold ? g : 0,
                        y = Number.MAX_VALUE;

                    function v(t) {
                        return M(t, -1e5, 1e5)
                    }

                    for (e = 0; e < d; e++) {
                        var x = p[e], b = x.x, w = void 0, k = void 0, A = x.y, T = x.low,
                            P = n && (null === (t = c.stacking) || void 0 === t ? void 0 : t.stacks[(this.negStacks && A < (m ? 0 : g) ? "-" : "") + this.stackKey]);
                        i = a.translate(b, !1, !1, !1, !0, u), x.plotX = I(i) ? C(v(i)) : void 0, n && this.visible && P && P[b] && (r = this.getStackIndicator(r, b, this.index), !x.isNull && r.key && (k = (w = P[b]).points[r.key]), w && B(k) && (T = k[0], A = k[1], T === m && r.key === P[b].base && (T = _(I(g) ? g : c.min)), c.positiveValuesOnly && S(T) && T <= 0 && (T = void 0), x.total = x.stackTotal = _(w.total), x.percentage = S(x.y) && w.total ? x.y / w.total * 100 : void 0, x.stackY = A, this.irregularWidths || w.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis))), x.yBottom = S(T) ? v(c.translate(T, !1, !0, !1, !0)) : void 0, this.dataModify && (A = this.dataModify.modifyValue(A, e));
                        var L = void 0;
                        I(A) && void 0 !== x.plotX && (L = I(L = c.translate(A, !1, !0, !1, !0)) ? v(L) : void 0), x.plotY = L, x.isInside = this.isPointInside(x), x.clientX = f ? C(a.translate(b, !1, !1, !1, !0, u)) : i, x.negative = (x.y || 0) < (g || 0), x.category = _(h && h[x.x], x.x), x.isNull || !1 === x.visible || (void 0 !== o && (y = Math.min(y, Math.abs(i - o))), o = i), x.zone = this.zones.length ? x.getZone() : void 0, !x.graphic && this.group && l && (x.isNew = !0)
                    }
                    this.closestPointRangePx = y, j(this, "afterTranslate")
                }, t.prototype.getValidPoints = function (t, e, i) {
                    var o = this.chart;
                    return (t || this.points || []).filter(function (t) {
                        var r = t.plotX, s = t.plotY;
                        return !!((i || !t.isNull && I(s)) && (!e || o.isInsidePlot(r, s, {inverted: o.inverted}))) && !1 !== t.visible
                    })
                }, t.prototype.getClipBox = function () {
                    var t = this.chart, e = this.xAxis, i = this.yAxis, o = R(t.clipBox);
                    return e && e.len !== t.plotSizeX && (o.width = e.len), i && i.len !== t.plotSizeY && (o.height = i.len), o
                }, t.prototype.getSharedClipKey = function () {
                    return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0), this.sharedClipKey
                }, t.prototype.setClip = function () {
                    var t = this.chart, e = this.group, i = this.markerGroup, o = t.sharedClips, r = t.renderer,
                        s = this.getClipBox(), n = this.getSharedClipKey(), a = o[n];
                    a ? a.animate(s) : o[n] = a = r.clipRect(s), e && e.clip(!1 === this.options.clip ? void 0 : a), i && i.clip()
                }, t.prototype.animate = function (t) {
                    var e = this.chart, i = this.group, o = this.markerGroup, r = e.inverted, s = p(this.options.animation),
                        n = [this.getSharedClipKey(), s.duration, s.easing, s.defer].join(","), a = e.sharedClips[n],
                        h = e.sharedClips[n + "m"];
                    if (t && i) {
                        var l = this.getClipBox();
                        if (a) a.attr("height", l.height); else {
                            l.width = 0, r && (l.x = e.plotHeight), a = e.renderer.clipRect(l), e.sharedClips[n] = a;
                            var c = {
                                x: -99,
                                y: -99,
                                width: r ? e.plotWidth + 199 : 99,
                                height: r ? 99 : e.plotHeight + 199
                            };
                            h = e.renderer.clipRect(c), e.sharedClips[n + "m"] = h
                        }
                        i.clip(a), o && o.clip(h)
                    } else if (a && !a.hasClass("highcharts-animating")) {
                        var d = this.getClipBox(), u = s.step;
                        o && o.element.childNodes.length && (s.step = function (t, e) {
                            u && u.apply(e, arguments), "width" === e.prop && h && h.element && h.attr(r ? "height" : "width", t + 99)
                        }), a.addClass("highcharts-animating").animate(d, s)
                    }
                }, t.prototype.afterAnimate = function () {
                    var t = this;
                    this.setClip(), N(this.chart.sharedClips, function (e, i, o) {
                        e && !t.chart.container.querySelector('[clip-path="url(#'.concat(e.id, ')"]')) && (e.destroy(), delete o[i])
                    }), this.finishedAnimating = !0, j(this, "afterAnimate")
                }, t.prototype.drawPoints = function (t) {
                    void 0 === t && (t = this.points);
                    var e, i, o, r, s, n, a, h = this.chart, l = h.styledMode, c = this.colorAxis, p = this.options.marker,
                        d = this[this.specialGroup || "markerGroup"], u = this.xAxis,
                        f = _(p.enabled, !u || !!u.isRadial || null, this.closestPointRangePx >= p.enabledThreshold * p.radius);
                    if (!1 !== p.enabled || this._hasPointMarkers) for (e = 0; e < t.length; e++) if (r = (o = (i = t[e]).graphic) ? "animate" : "attr", s = i.marker || {}, n = !!i.marker, (f && void 0 === s.enabled || s.enabled) && !i.isNull && !1 !== i.visible) {
                        var g = _(s.symbol, this.symbol, "rect");
                        a = this.markerAttribs(i, i.selected && "select"), this.enabledDataSorting && (i.startXPos = u.reversed ? -(a.width || 0) : u.width);
                        var m = !1 !== i.isInside;
                        if (!o && m && ((a.width || 0) > 0 || i.hasImage) && (i.graphic = o = h.renderer.symbol(g, a.x, a.y, a.width, a.height, n ? s : p).add(d), this.enabledDataSorting && h.hasRendered && (o.attr({x: i.startXPos}), r = "animate")), o && "animate" === r && o[m ? "show" : "hide"](m).animate(a), o) {
                            var y = this.pointAttribs(i, l || !i.selected ? void 0 : "select");
                            l ? c && o.css({fill: y.fill}) : o[r](y)
                        }
                        o && o.addClass(i.getClassName(), !0)
                    } else o && (i.graphic = o.destroy())
                }, t.prototype.markerAttribs = function (t, e) {
                    var i, o, r = this.options, s = r.marker, n = t.marker || {}, a = n.symbol || s.symbol, h = {},
                        l = _(n.radius, s && s.radius);
                    e && (i = s.states[e], l = _((o = n.states && n.states[e]) && o.radius, i && i.radius, l && l + (i && i.radiusPlus || 0))), t.hasImage = a && 0 === a.indexOf("url"), t.hasImage && (l = 0);
                    var c = t.pos();
                    return I(l) && c && (h.x = c[0] - l, h.y = c[1] - l, r.crisp && (h.x = Math.floor(h.x))), l && (h.width = h.height = 2 * l), h
                }, t.prototype.pointAttribs = function (t, e) {
                    var i, o, r, s, n = this.options.marker, a = t && t.options, h = a && a.marker || {}, l = a && a.color,
                        c = t && t.color, p = t && t.zone && t.zone.color, d = this.color, u = _(h.lineWidth, n.lineWidth),
                        f = 1;
                    return d = l || p || c || d, r = h.fillColor || n.fillColor || d, s = h.lineColor || n.lineColor || d, e = e || "normal", i = n.states[e] || {}, u = _((o = h.states && h.states[e] || {}).lineWidth, i.lineWidth, u + _(o.lineWidthPlus, i.lineWidthPlus, 0)), r = o.fillColor || i.fillColor || r, {
                        stroke: s = o.lineColor || i.lineColor || s,
                        "stroke-width": u,
                        fill: r,
                        opacity: f = _(o.opacity, i.opacity, f)
                    }
                }, t.prototype.destroy = function (t) {
                    var e, i, o, r = this, s = r.chart, n = /AppleWebKit\/533/.test(y.navigator.userAgent),
                        a = r.data || [];
                    for (j(r, "destroy", {keepEventsForUpdate: t}), this.removeEvents(t), (r.axisTypes || []).forEach(function (t) {
                        (o = r[t]) && o.series && (A(o.series, r), o.isDirty = o.forceRedraw = !0)
                    }), r.legendItem && r.chart.legend.destroyItem(r), e = a.length; e--;) (i = a[e]) && i.destroy && i.destroy();
                    r.zones.forEach(w), l.clearTimeout(r.animationTimeout), N(r, function (t, e) {
                        t instanceof h && !t.survive && t[n && "group" === e ? "hide" : "destroy"]()
                    }), s.hoverSeries === r && (s.hoverSeries = void 0), A(s.series, r), s.orderItems("series"), N(r, function (e, i) {
                        t && "hcEvents" === i || delete r[i]
                    })
                }, t.prototype.applyZones = function () {
                    var t = this.area, e = this.chart, i = this.graph, o = this.zones, r = this.points, s = this.xAxis,
                        n = this.yAxis, a = this.zoneAxis, h = e.inverted, l = e.renderer, p = this["".concat(a, "Axis")],
                        d = p || {}, u = d.isXAxis, f = d.len, g = void 0 === f ? 0 : f,
                        m = ((null == i ? void 0 : i.strokeWidth()) || 0) / 2 + 1, y = function (t, e, i) {
                            void 0 === e && (e = 0), void 0 === i && (i = 0), h && (i = g - i);
                            var o = t.translated, r = void 0 === o ? 0 : o, s = t.lineClip, n = i - r;
                            null == s || s.push(["L", e, Math.abs(n) < m ? i - m * (n <= 0 ? -1 : 1) : r])
                        };
                    if (o.length && (i || t) && p && I(p.min)) {
                        var v = p.getExtremes().max, x = function (t) {
                            t.forEach(function (e, i) {
                                ("M" === e[0] || "L" === e[0]) && (t[i] = [e[0], u ? g - e[1] : e[1], u ? e[2] : g - e[2]])
                            })
                        };
                        if (o.forEach(function (t, e) {
                            t.lineClip = [], t.translated = M(p.toPixels(_(t.value, v), !0) || 0, 0, g)
                        }), i && !this.showLine && i.hide(), t && t.hide(), "y" === a && r.length < s.len) for (var b = 0; b < r.length; b++) {
                            var C = r[b], S = C.plotX, w = C.plotY, k = C.zone, A = k && o[o.indexOf(k) - 1];
                            k && y(k, S, w), A && y(A, S, w)
                        }
                        var T = [], P = p.toPixels(p.getExtremes().min, !0);
                        o.forEach(function (e) {
                            var o, r, a = e.lineClip || [], p = Math.round(e.translated || 0);
                            s.reversed && a.reverse();
                            var d = e.clip, f = e.simpleClip, g = 0, m = 0, y = s.len, v = n.len;
                            u ? (g = p, y = P) : (m = p, v = P);
                            var b = [["M", g, m], ["L", y, m], ["L", y, v], ["L", g, v], ["Z"]],
                                M = c(c(c(c([b[0]], a, !0), [b[1], b[2]], !1), T, !0), [b[3], b[4]], !1);
                            T = a.reverse(), P = p, h && (x(M), t && x(b)), d ? (d.animate({d: M}), null == f || f.animate({d: b})) : (d = e.clip = l.path(M), t && (f = e.simpleClip = l.path(b))), i && (null === (o = e.graph) || void 0 === o || o.clip(d)), t && (null === (r = e.area) || void 0 === r || r.clip(f))
                        })
                    } else this.visible && (i && i.show(), t && t.show())
                }, t.prototype.plotGroup = function (t, e, i, o, r) {
                    var s = this[t], n = !s, a = {visibility: i, zIndex: o || .1};
                    return S(this.opacity) && !this.chart.styledMode && "inactive" !== this.state && (a.opacity = this.opacity), s || (this[t] = s = this.chart.renderer.g().add(r)), s.addClass("highcharts-" + e + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (S(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (s.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0), s.attr(a)[n ? "attr" : "animate"](this.getPlotBox(e)), s
                }, t.prototype.getPlotBox = function (t) {
                    var e = this.xAxis, i = this.yAxis, o = this.chart,
                        r = o.inverted && !o.polar && e && !1 !== this.invertible && "series" === t;
                    return o.inverted && (e = i, i = this.xAxis), {
                        translateX: e ? e.left : o.plotLeft,
                        translateY: i ? i.top : o.plotTop,
                        rotation: r ? 90 : 0,
                        rotationOriginX: r ? (e.len - i.len) / 2 : 0,
                        rotationOriginY: r ? (e.len + i.len) / 2 : 0,
                        scaleX: r ? -1 : 1,
                        scaleY: 1
                    }
                }, t.prototype.removeEvents = function (t) {
                    var e = this.eventsToUnbind;
                    t || G(this), e.length && (e.forEach(function (t) {
                        t()
                    }), e.length = 0)
                }, t.prototype.render = function () {
                    var t, e, i, o, r, s = this, n = s.chart, a = s.options, h = s.hasRendered, l = p(a.animation),
                        c = s.visible ? "inherit" : "hidden", d = a.zIndex, u = n.seriesGroup,
                        f = s.finishedAnimating ? 0 : l.duration;
                    j(this, "render"), s.plotGroup("group", "series", c, d, u), s.markerGroup = s.plotGroup("markerGroup", "markers", c, d, u), !1 !== a.clip && s.setClip(), f && (null === (t = s.animate) || void 0 === t || t.call(s, !0)), s.drawGraph && (s.drawGraph(), s.applyZones()), s.visible && s.drawPoints(), null === (e = s.drawDataLabels) || void 0 === e || e.call(s), null === (i = s.redrawPoints) || void 0 === i || i.call(s), a.enableMouseTracking && (null === (o = s.drawTracker) || void 0 === o || o.call(s)), f && (null === (r = s.animate) || void 0 === r || r.call(s)), h || (f && l.defer && (f += l.defer), s.animationTimeout = X(function () {
                        s.afterAnimate()
                    }, f || 0)), s.isDirty = !1, s.hasRendered = !0, j(s, "afterRender")
                }, t.prototype.redraw = function () {
                    var t = this.isDirty || this.isDirtyData;
                    this.translate(), this.render(), t && delete this.kdTree
                }, t.prototype.reserveSpace = function () {
                    return this.visible || !this.chart.options.chart.ignoreHiddenSeries
                }, t.prototype.searchPoint = function (t, e) {
                    var i = this.xAxis, o = this.yAxis, r = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: r ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                        plotY: r ? o.len - t.chartX + o.pos : t.chartY - o.pos
                    }, e, t)
                }, t.prototype.buildKDTree = function (t) {
                    this.buildingKdTree = !0;
                    var e = this, i = e.options.findNearestPointBy.indexOf("y") > -1 ? 2 : 1;
                    delete e.kdTree, X(function () {
                        e.kdTree = function t(i, o, r) {
                            var s, n, a = null == i ? void 0 : i.length;
                            if (a) return s = e.kdAxisArray[o % r], i.sort(function (t, e) {
                                return (t[s] || 0) - (e[s] || 0)
                            }), {
                                point: i[n = Math.floor(a / 2)],
                                left: t(i.slice(0, n), o + 1, r),
                                right: t(i.slice(n + 1), o + 1, r)
                            }
                        }(e.getValidPoints(void 0, !e.directTouch), i, i), e.buildingKdTree = !1
                    }, e.options.kdNow || (null == t ? void 0 : t.type) === "touchstart" ? 0 : 1)
                }, t.prototype.searchKDTree = function (t, e, i) {
                    var o = this, r = this.kdAxisArray, s = r[0], n = r[1], a = e ? "distX" : "dist",
                        h = (o.options.findNearestPointBy || "").indexOf("y") > -1 ? 2 : 1, l = !!o.isBubble;
                    if (this.kdTree || this.buildingKdTree || this.buildKDTree(i), this.kdTree) return function t(e, i, r, h) {
                        var c, p, d, u, f, g, m, y, v, x, b, M = i.point, C = o.kdAxisArray[r % h], w = M;
                        p = e[s], d = M[s], u = S(p) && S(d) ? p - d : null, f = e[n], g = M[n], m = S(f) && S(g) ? f - g : 0, y = l && (null === (c = M.marker) || void 0 === c ? void 0 : c.radius) || 0, M.dist = Math.sqrt((u && u * u || 0) + m * m) - y, M.distX = S(u) ? Math.abs(u) - y : Number.MAX_VALUE;
                        var k = (e[C] || 0) - (M[C] || 0) + (l && (null === (v = M.marker) || void 0 === v ? void 0 : v.radius) || 0),
                            A = k < 0 ? "left" : "right", T = k < 0 ? "right" : "left";
                        return i[A] && (w = (x = t(e, i[A], r + 1, h))[a] < w[a] ? x : M), i[T] && Math.sqrt(k * k) < w[a] && (w = (b = t(e, i[T], r + 1, h))[a] < w[a] ? b : w), w
                    }(t, this.kdTree, h, h)
                }, t.prototype.pointPlacementToXValue = function () {
                    var t = this.options, e = this.xAxis, i = t.pointPlacement;
                    return "between" === i && (i = e.reversed ? -.5 : .5), I(i) ? i * (t.pointRange || e.pointRange) : 0
                }, t.prototype.isPointInside = function (t) {
                    var e = this.chart, i = this.xAxis, o = this.yAxis, r = t.plotX, s = void 0 === r ? -1 : r, n = t.plotY,
                        a = void 0 === n ? -1 : n;
                    return a >= 0 && a <= (o ? o.len : e.plotHeight) && s >= 0 && s <= (i ? i.len : e.plotWidth)
                }, t.prototype.drawTracker = function () {
                    var t, e = this, i = e.options, o = i.trackByArea, r = [].concat((o ? e.areaPath : e.graphPath) || []),
                        s = e.chart, n = s.pointer, a = s.renderer,
                        h = (null === (t = s.options.tooltip) || void 0 === t ? void 0 : t.snap) || 0, l = function () {
                            i.enableMouseTracking && s.hoverSeries !== e && e.onMouseOver()
                        }, c = "rgba(192,192,192," + (m ? 1e-4 : .002) + ")", p = e.tracker;
                    p ? p.attr({d: r}) : e.graph && (e.tracker = p = a.path(r).attr({
                        visibility: e.visible ? "inherit" : "hidden",
                        zIndex: 2
                    }).addClass(o ? "highcharts-tracker-area" : "highcharts-tracker-line").add(e.group), s.styledMode || p.attr({
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        stroke: c,
                        fill: o ? c : "none",
                        "stroke-width": e.graph.strokeWidth() + (o ? 0 : 2 * h)
                    }), [e.tracker, e.markerGroup, e.dataLabelsGroup].forEach(function (t) {
                        t && (t.addClass("highcharts-tracker").on("mouseover", l).on("mouseout", function (t) {
                            n.onTrackerMouseOut(t)
                        }), i.cursor && !s.styledMode && t.css({cursor: i.cursor}), g && t.on("touchstart", l))
                    })), j(this, "afterDrawTracker")
                }, t.prototype.addPoint = function (t, e, i, o, r) {
                    var s, n, a = this.options, h = this.data, l = this.chart, c = this.xAxis,
                        p = c && c.hasNames && c.names, d = a.data, u = this.xData;
                    e = _(e, !0);
                    var f = {series: this};
                    this.pointClass.prototype.applyOptions.apply(f, [t]);
                    var g = f.x;
                    if (n = u.length, this.requireSorting && g < u[n - 1]) for (s = !0; n && u[n - 1] > g;) n--;
                    this.updateParallelArrays(f, "splice", [n, 0, 0]), this.updateParallelArrays(f, n), p && f.name && (p[g] = f.name), d.splice(n, 0, t), (s || this.processedData) && (this.data.splice(n, 0, null), this.processData()), "point" === a.legendType && this.generatePoints(), i && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(f, "shift"), d.shift())), !1 !== r && j(this, "addPoint", {point: f}), this.isDirty = !0, this.isDirtyData = !0, e && l.redraw(o)
                }, t.prototype.removePoint = function (t, e, i) {
                    var o = this, r = o.data, s = r[t], n = o.points, a = o.chart, h = function () {
                        n && n.length === r.length && n.splice(t, 1), r.splice(t, 1), o.options.data.splice(t, 1), o.updateParallelArrays(s || {series: o}, "splice", [t, 1]), s && s.destroy(), o.isDirty = !0, o.isDirtyData = !0, e && a.redraw()
                    };
                    d(i, a), e = _(e, !0), s ? s.firePointEvent("remove", null, h) : h()
                }, t.prototype.remove = function (t, e, i, o) {
                    var r = this, s = r.chart;

                    function n() {
                        r.destroy(o), s.isDirtyLegend = s.isDirtyBox = !0, s.linkSeries(o), _(t, !0) && s.redraw(e)
                    }

                    !1 !== i ? j(r, "remove", null, n) : n()
                }, t.prototype.update = function (t, e) {
                    j(this, "update", {options: t = k(t, this.userOptions)});
                    var i, o, r, s, n, a, h, l = this, c = l.chart, p = l.userOptions, d = l.initialType || l.type,
                        u = c.options.plotOptions, f = v[d].prototype, g = l.finishedAnimating && {animation: !1}, m = {},
                        y = ["colorIndex", "eventOptions", "navigatorSeries", "symbolIndex", "baseSeries"],
                        x = t.type || p.type || c.options.chart.type,
                        b = !(this.hasDerivedData || x && x !== this.type || void 0 !== t.pointStart || void 0 !== t.pointInterval || void 0 !== t.relativeXValue || t.joinBy || t.mapData || ["dataGrouping", "pointStart", "pointInterval", "pointIntervalUnit", "keys"].some(function (t) {
                            return l.hasOptionChanged(t)
                        }));
                    x = x || d, b && (y.push("data", "isDirtyData", "isDirtyCanvas", "points", "processedData", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "hasDataLabels", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== t.visible && y.push("area", "graph"), l.parallelArrays.forEach(function (t) {
                        y.push(t + "Data")
                    }), t.data && (t.dataSorting && P(l.options.dataSorting, t.dataSorting), this.setData(t.data, !1))), t = R(p, {
                        index: void 0 === p.index ? l.index : p.index,
                        pointStart: null !== (r = null !== (o = null === (i = null == u ? void 0 : u.series) || void 0 === i ? void 0 : i.pointStart) && void 0 !== o ? o : p.pointStart) && void 0 !== r ? r : null === (s = l.xData) || void 0 === s ? void 0 : s[0]
                    }, !b && {data: l.options.data}, t, g), b && t.data && (t.data = l.options.data), (y = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(y)).forEach(function (t) {
                        y[t] = l[t], delete l[t]
                    });
                    var M = !1;
                    if (v[x]) {
                        if (M = x !== l.type, l.remove(!1, !1, !1, !0), M) {
                            if (Object.setPrototypeOf) Object.setPrototypeOf(l, v[x].prototype); else {
                                var C = Object.hasOwnProperty.call(l, "hcEvents") && l.hcEvents;
                                for (h in f) l[h] = void 0;
                                P(l, v[x].prototype), C ? l.hcEvents = C : delete l.hcEvents
                            }
                        }
                    } else T(17, !0, c, {missingModuleFor: x});
                    if (y.forEach(function (t) {
                        l[t] = y[t]
                    }), l.init(c, t), b && this.points) {
                        !1 === (a = l.options).visible ? (m.graphic = 1, m.dataLabel = 1) : (this.hasMarkerChanged(a, p) && (m.graphic = 1), (null === (n = l.hasDataLabels) || void 0 === n ? void 0 : n.call(l)) || (m.dataLabel = 1));
                        for (var S = 0, w = this.points; S < w.length; S++) {
                            var A = w[S];
                            A && A.series && (A.resolveColor(), Object.keys(m).length && A.destroyElements(m), !1 === a.showInLegend && A.legendItem && c.legend.destroyItem(A))
                        }
                    }
                    l.initialType = d, c.linkSeries(), c.setSortedData(), M && l.linkedSeries.length && (l.isDirtyData = !0), j(this, "afterUpdate"), _(e, !0) && c.redraw(!!b && void 0)
                }, t.prototype.setName = function (t) {
                    this.name = this.options.name = this.userOptions.name = t, this.chart.isDirtyLegend = !0
                }, t.prototype.hasOptionChanged = function (t) {
                    var e, i, o = this.chart, r = this.options[t], s = o.options.plotOptions, n = this.userOptions[t],
                        a = _(null === (e = null == s ? void 0 : s[this.type]) || void 0 === e ? void 0 : e[t], null === (i = null == s ? void 0 : s.series) || void 0 === i ? void 0 : i[t]);
                    return n && !S(a) ? r !== n : r !== _(a, r)
                }, t.prototype.onMouseOver = function () {
                    var t = this.chart, e = t.hoverSeries;
                    t.pointer.setHoverChartIndex(), e && e !== this && e.onMouseOut(), this.options.events.mouseOver && j(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this
                }, t.prototype.onMouseOut = function () {
                    var t = this.options, e = this.chart, i = e.tooltip, o = e.hoverPoint;
                    e.hoverSeries = null, o && o.onMouseOut(), this && t.events.mouseOut && j(this, "mouseOut"), i && !this.stickyTracking && (!i.shared || this.noSharedTooltip) && i.hide(), e.series.forEach(function (t) {
                        t.setState("", !0)
                    })
                }, t.prototype.setState = function (t, e) {
                    var i = this, o = i.options, r = i.graph, s = o.inactiveOtherPoints, n = o.states,
                        a = _(n[t || "normal"] && n[t || "normal"].animation, i.chart.options.chart.animation),
                        h = o.lineWidth, l = o.opacity;
                    if (t = t || "", i.state !== t && ([i.group, i.markerGroup, i.dataLabelsGroup].forEach(function (e) {
                        e && (i.state && e.removeClass("highcharts-series-" + i.state), t && e.addClass("highcharts-series-" + t))
                    }), i.state = t, !i.chart.styledMode)) {
                        if (n[t] && !1 === n[t].enabled) return;
                        if (t && (h = n[t].lineWidth || h + (n[t].lineWidthPlus || 0), l = _(n[t].opacity, l)), r && !r.dashstyle && I(h)) for (var p = 0, d = c([r], this.zones.map(function (t) {
                            return t.graph
                        }), !0); p < d.length; p++) {
                            var u = d[p];
                            null == u || u.animate({"stroke-width": h}, a)
                        }
                        s || [i.group, i.markerGroup, i.dataLabelsGroup, i.labelBySeries].forEach(function (t) {
                            t && t.animate({opacity: l}, a)
                        })
                    }
                    e && s && i.points && i.setAllPointsToState(t || void 0)
                }, t.prototype.setAllPointsToState = function (t) {
                    this.points.forEach(function (e) {
                        e.setState && e.setState(t)
                    })
                }, t.prototype.setVisible = function (t, e) {
                    var i, o = this, r = o.chart, s = r.options.chart.ignoreHiddenSeries, n = o.visible;
                    o.visible = t = o.options.visible = o.userOptions.visible = void 0 === t ? !n : t;
                    var a = t ? "show" : "hide";
                    ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (t) {
                        var e;
                        null === (e = o[t]) || void 0 === e || e[a]()
                    }), (r.hoverSeries === o || (null === (i = r.hoverPoint) || void 0 === i ? void 0 : i.series) === o) && o.onMouseOut(), o.legendItem && r.legend.colorizeItem(o, t), o.isDirty = !0, o.options.stacking && r.series.forEach(function (t) {
                        t.options.stacking && t.visible && (t.isDirty = !0)
                    }), o.linkedSeries.forEach(function (e) {
                        e.setVisible(t, !1)
                    }), s && (r.isDirtyBox = !0), j(o, a), !1 !== e && r.redraw()
                }, t.prototype.show = function () {
                    this.setVisible(!0)
                }, t.prototype.hide = function () {
                    this.setVisible(!1)
                }, t.prototype.select = function (t) {
                    this.selected = t = this.options.selected = void 0 === t ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), j(this, t ? "select" : "unselect")
                }, t.prototype.shouldShowTooltip = function (t, e, i) {
                    return void 0 === i && (i = {}), i.series = this, i.visiblePlotOnly = !0, this.chart.isInsidePlot(t, e, i)
                }, t.prototype.drawLegendSymbol = function (t, e) {
                    var i;
                    null === (i = r[this.options.legendSymbol || "rectangle"]) || void 0 === i || i.call(this, t, e)
                }, t.defaultOptions = n, t.types = a.seriesTypes, t.registerType = a.registerSeriesType, t
            }();
        return P(H.prototype, {
            axisTypes: ["xAxis", "yAxis"],
            coll: "series",
            colorCounter: 0,
            directTouch: !1,
            isCartesian: !0,
            kdAxisArray: ["clientX", "plotY"],
            parallelArrays: ["x", "y"],
            pointClass: s,
            requireSorting: !0,
            sorted: !0
        }), a.series = H, H
    }), i(e, "Core/Chart/Chart.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Axis/Axis.js"], e["Core/Defaults.js"], e["Core/Templating.js"], e["Core/Foundation.js"], e["Core/Globals.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Time.js"], e["Core/Utilities.js"], e["Core/Renderer/HTML/AST.js"], e["Core/Axis/Tick.js"]], function (t, e, i, o, r, s, n, a, h, l, c, p, d, u) {
        var f = this && this.__assign || function () {
                return (f = Object.assign || function (t) {
                    for (var e, i = 1, o = arguments.length; i < o; i++) for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                    return t
                }).apply(this, arguments)
            }, g = this && this.__spreadArray || function (t, e, i) {
                if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
                return t.concat(o || Array.prototype.slice.call(e))
            }, m = t.animate, y = t.animObject, v = t.setAnimation, x = i.defaultOptions, b = i.defaultTime,
            M = o.numberFormat, C = r.registerEventOptions, S = s.charts, w = s.doc, k = s.marginNames, A = s.svg,
            T = s.win, P = h.seriesTypes, L = p.addEvent, j = p.attr, O = p.createElement, E = (p.clamp, p.css),
            D = p.defined, B = p.diffObjects, I = p.discardElement, z = p.erase, R = p.error, N = p.extend, _ = p.find,
            G = p.fireEvent, W = p.getStyle, X = p.isArray, H = p.isNumber, U = p.isObject, F = p.isString, Y = p.merge,
            V = p.objectEach, Z = p.pick, q = p.pInt, K = p.relativeLength, $ = p.removeEvent, J = p.splat,
            Q = p.syncTimeout, tt = p.uniqueKey, te = function () {
                function t(t, e, i) {
                    this.sharedClips = {};
                    var o = g([], arguments, !0);
                    (F(t) || t.nodeName) && (this.renderTo = o.shift()), this.init(o[0], o[1])
                }

                return t.chart = function (e, i, o) {
                    return new t(e, i, o)
                }, t.prototype.setZoomOptions = function () {
                    var t = this.options.chart, e = t.zooming;
                    this.zooming = f(f({}, e), {
                        type: Z(t.zoomType, e.type),
                        key: Z(t.zoomKey, e.key),
                        pinchType: Z(t.pinchType, e.pinchType),
                        singleTouch: Z(t.zoomBySingleTouch, e.singleTouch, !1),
                        resetButton: Y(e.resetButton, t.resetZoomButton)
                    })
                }, t.prototype.init = function (t, e) {
                    G(this, "init", {args: arguments}, function () {
                        var i = Y(x, t), o = i.chart;
                        this.userOptions = N({}, t), this.margin = [], this.spacing = [], this.bounds = {
                            h: {},
                            v: {}
                        }, this.labelCollectors = [], this.callback = e, this.isResizing = 0, this.options = i, this.axes = [], this.series = [], this.time = t.time && Object.keys(t.time).length ? new c(t.time) : s.time, this.numberFormatter = o.numberFormatter || M, this.styledMode = o.styledMode, this.hasCartesianSeries = o.showAxes, this.index = S.length, S.push(this), s.chartCount++, C(this, o), this.xAxis = [], this.yAxis = [], this.pointCount = this.colorCounter = this.symbolCounter = 0, this.setZoomOptions(), G(this, "afterInit"), this.firstRender()
                    })
                }, t.prototype.initSeries = function (t) {
                    var e = this.options.chart, i = t.type || e.type, o = P[i];
                    o || R(17, !0, this, {missingModuleFor: i});
                    var r = new o;
                    return "function" == typeof r.init && r.init(this, t), r
                }, t.prototype.setSortedData = function () {
                    this.getSeriesOrderByLinks().forEach(function (t) {
                        t.points || t.data || !t.enabledDataSorting || t.setData(t.options.data, !1)
                    })
                }, t.prototype.getSeriesOrderByLinks = function () {
                    return this.series.concat().sort(function (t, e) {
                        return t.linkedSeries.length || e.linkedSeries.length ? e.linkedSeries.length - t.linkedSeries.length : 0
                    })
                }, t.prototype.orderItems = function (t, e) {
                    void 0 === e && (e = 0);
                    var i = this[t], o = this.options[t] = J(this.options[t]).slice(),
                        r = this.userOptions[t] = this.userOptions[t] ? J(this.userOptions[t]).slice() : [];
                    if (this.hasRendered && (o.splice(e), r.splice(e)), i) for (var s = e, n = i.length; s < n; ++s) {
                        var h = i[s];
                        h && (h.index = s, h instanceof a && (h.name = h.getName()), h.options.isInternal || (o[s] = h.options, r[s] = h.userOptions))
                    }
                }, t.prototype.isInsidePlot = function (t, e, i) {
                    void 0 === i && (i = {});
                    var o, r = this.inverted, s = this.plotBox, n = this.plotLeft, a = this.plotTop,
                        h = this.scrollablePlotBox, l = 0, c = 0;
                    i.visiblePlotOnly && this.scrollingContainer && (l = (o = this.scrollingContainer).scrollLeft, c = o.scrollTop);
                    var p = i.series, d = i.visiblePlotOnly && h || s, u = i.inverted ? e : t, f = i.inverted ? t : e,
                        g = {x: u, y: f, isInsidePlot: !0, options: i};
                    if (!i.ignoreX) {
                        var m = p && (r && !this.polar ? p.yAxis : p.xAxis) || {pos: n, len: 1 / 0},
                            y = i.paneCoordinates ? m.pos + u : n + u;
                        y >= Math.max(l + n, m.pos) && y <= Math.min(l + n + d.width, m.pos + m.len) || (g.isInsidePlot = !1)
                    }
                    if (!i.ignoreY && g.isInsidePlot) {
                        var v = !r && i.axis && !i.axis.isXAxis && i.axis || p && (r ? p.xAxis : p.yAxis) || {
                            pos: a,
                            len: 1 / 0
                        }, x = i.paneCoordinates ? v.pos + f : a + f;
                        x >= Math.max(c + a, v.pos) && x <= Math.min(c + a + d.height, v.pos + v.len) || (g.isInsidePlot = !1)
                    }
                    return G(this, "afterIsInsidePlot", g), g.isInsidePlot
                }, t.prototype.redraw = function (t) {
                    G(this, "beforeRedraw");
                    var e, i, o, r, s = this.hasCartesianSeries ? this.axes : this.colorAxis || [], n = this.series,
                        a = this.pointer, h = this.legend, l = this.userOptions.legend, c = this.renderer, p = c.isHidden(),
                        d = [], u = this.isDirtyBox, f = this.isDirtyLegend;
                    for (c.rootFontSize = c.boxWrapper.getStyle("font-size"), this.setResponsive && this.setResponsive(!1), v(!!this.hasRendered && t, this), p && this.temporaryDisplay(), this.layOutTitles(!1), o = n.length; o--;) if (((r = n[o]).options.stacking || r.options.centerInCategory) && (i = !0, r.isDirty)) {
                        e = !0;
                        break
                    }
                    if (e) for (o = n.length; o--;) (r = n[o]).options.stacking && (r.isDirty = !0);
                    n.forEach(function (t) {
                        t.isDirty && ("point" === t.options.legendType ? ("function" == typeof t.updateTotals && t.updateTotals(), f = !0) : l && (l.labelFormatter || l.labelFormat) && (f = !0)), t.isDirtyData && G(t, "updatedData")
                    }), f && h && h.options.enabled && (h.render(), this.isDirtyLegend = !1), i && this.getStacks(), s.forEach(function (t) {
                        t.updateNames(), t.setScale()
                    }), this.getMargins(), s.forEach(function (t) {
                        t.isDirty && (u = !0)
                    }), s.forEach(function (t) {
                        var e = t.min + "," + t.max;
                        t.extKey !== e && (t.extKey = e, d.push(function () {
                            G(t, "afterSetExtremes", N(t.eventArgs, t.getExtremes())), delete t.eventArgs
                        })), (u || i) && t.redraw()
                    }), u && this.drawChartBox(), G(this, "predraw"), n.forEach(function (t) {
                        (u || t.isDirty) && t.visible && t.redraw(), t.isDirtyData = !1
                    }), a && a.reset(!0), c.draw(), G(this, "redraw"), G(this, "render"), p && this.temporaryDisplay(!0), d.forEach(function (t) {
                        t.call()
                    })
                }, t.prototype.get = function (t) {
                    var e = this.series;

                    function i(e) {
                        return e.id === t || e.options && e.options.id === t
                    }

                    for (var o = _(this.axes, i) || _(this.series, i), r = 0; !o && r < e.length; r++) o = _(e[r].points || [], i);
                    return o
                }, t.prototype.getAxes = function () {
                    var t = this.userOptions;
                    G(this, "getAxes");
                    for (var i = 0, o = ["xAxis", "yAxis"]; i < o.length; i++) for (var r = o[i], s = t[r] = J(t[r] || {}), n = 0; n < s.length; n++) new e(this, s[n], r);
                    G(this, "afterGetAxes")
                }, t.prototype.getSelectedPoints = function () {
                    return this.series.reduce(function (t, e) {
                        return e.getPointsCollection().forEach(function (e) {
                            Z(e.selectedStaging, e.selected) && t.push(e)
                        }), t
                    }, [])
                }, t.prototype.getSelectedSeries = function () {
                    return this.series.filter(function (t) {
                        return t.selected
                    })
                }, t.prototype.setTitle = function (t, e, i) {
                    this.applyDescription("title", t), this.applyDescription("subtitle", e), this.applyDescription("caption", void 0), this.layOutTitles(i)
                }, t.prototype.applyDescription = function (t, e) {
                    var i = this, o = this.options[t] = Y(this.options[t], e), r = this[t];
                    r && e && (this[t] = r = r.destroy()), o && !r && ((r = this.renderer.text(o.text, 0, 0, o.useHTML).attr({
                        align: o.align,
                        class: "highcharts-" + t,
                        zIndex: o.zIndex || 4
                    }).add()).update = function (e, o) {
                        i.applyDescription(t, e), i.layOutTitles(o)
                    }, this.styledMode || r.css(N("title" === t ? {fontSize: this.options.isStock ? "1em" : "1.2em"} : {}, o.style)), this[t] = r)
                }, t.prototype.layOutTitles = function (t) {
                    void 0 === t && (t = !0);
                    var e = [0, 0, 0], i = this.renderer, o = this.spacingBox;
                    ["title", "subtitle", "caption"].forEach(function (t) {
                        var r = this[t], s = this.options[t], n = s.verticalAlign || "top",
                            a = "title" === t ? "top" === n ? -3 : 0 : "top" === n ? e[0] + 2 : 0;
                        if (r) {
                            r.css({width: (s.width || o.width + (s.widthAdjust || 0)) + "px"});
                            var h = i.fontMetrics(r).b, l = Math.round(r.getBBox(s.useHTML).height);
                            r.align(N({
                                y: "bottom" === n ? h : a + h,
                                height: l
                            }, s), !1, "spacingBox"), s.floating || ("top" === n ? e[0] = Math.ceil(e[0] + l) : "bottom" === n && (e[2] = Math.ceil(e[2] + l)))
                        }
                    }, this), e[0] && "top" === (this.options.title.verticalAlign || "top") && (e[0] += this.options.title.margin), e[2] && "bottom" === this.options.caption.verticalAlign && (e[2] += this.options.caption.margin);
                    var r = !this.titleOffset || this.titleOffset.join(",") !== e.join(",");
                    this.titleOffset = e, G(this, "afterLayOutTitles"), !this.isDirtyBox && r && (this.isDirtyBox = this.isDirtyLegend = r, this.hasRendered && t && this.isDirtyBox && this.redraw())
                }, t.prototype.getContainerBox = function () {
                    return {width: W(this.renderTo, "width", !0) || 0, height: W(this.renderTo, "height", !0) || 0}
                }, t.prototype.getChartSize = function () {
                    var t = this.options.chart, e = t.width, i = t.height, o = this.getContainerBox();
                    this.chartWidth = Math.max(0, e || o.width || 600), this.chartHeight = Math.max(0, K(i, this.chartWidth) || (o.height > 1 ? o.height : 400)), this.containerBox = o
                }, t.prototype.temporaryDisplay = function (t) {
                    var e, i = this.renderTo;
                    if (t) for (; i && i.style;) i.hcOrigStyle && (E(i, i.hcOrigStyle), delete i.hcOrigStyle), i.hcOrigDetached && (w.body.removeChild(i), i.hcOrigDetached = !1), i = i.parentNode; else for (; i && i.style && (w.body.contains(i) || i.parentNode || (i.hcOrigDetached = !0, w.body.appendChild(i)), ("none" === W(i, "display", !1) || i.hcOricDetached) && (i.hcOrigStyle = {
                        display: i.style.display,
                        height: i.style.height,
                        overflow: i.style.overflow
                    }, e = {
                        display: "block",
                        overflow: "hidden"
                    }, i !== this.renderTo && (e.height = 0), E(i, e), i.offsetWidth || i.style.setProperty("display", "block", "important")), (i = i.parentNode) !== w.body);) ;
                }, t.prototype.setClassName = function (t) {
                    this.container.className = "highcharts-container " + (t || "")
                }, t.prototype.getContainer = function () {
                    var t, e = this.options, i = e.chart, o = "data-highcharts-chart", r = tt(), s = this.renderTo;
                    s || (this.renderTo = s = i.renderTo), F(s) && (this.renderTo = s = w.getElementById(s)), s || R(13, !0, this);
                    var a = q(j(s, o));
                    H(a) && S[a] && S[a].hasRendered && S[a].destroy(), j(s, o, this.index), s.innerHTML = d.emptyHTML, i.skipClone || s.offsetWidth || this.temporaryDisplay(), this.getChartSize();
                    var h = this.chartWidth, c = this.chartHeight;
                    E(s, {overflow: "hidden"}), this.styledMode || (t = N({
                        position: "relative",
                        overflow: "hidden",
                        width: h + "px",
                        height: c + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                        userSelect: "none",
                        "touch-action": "manipulation",
                        outline: "none"
                    }, i.style || {}));
                    var p = O("div", {id: r}, t, s);
                    this.container = p, this._cursor = p.style.cursor;
                    var u = i.renderer || !A ? n.getRendererType(i.renderer) : l;
                    if (this.renderer = new u(p, h, c, void 0, i.forExport, e.exporting && e.exporting.allowHTML, this.styledMode), this.containerBox = this.getContainerBox(), v(void 0, this), this.setClassName(i.className), this.styledMode) for (var f in e.defs) this.renderer.definition(e.defs[f]); else this.renderer.setStyle(i.style);
                    this.renderer.chartIndex = this.index, G(this, "afterGetContainer")
                }, t.prototype.getMargins = function (t) {
                    var e = this.spacing, i = this.margin, o = this.titleOffset;
                    this.resetMargins(), o[0] && !D(i[0]) && (this.plotTop = Math.max(this.plotTop, o[0] + e[0])), o[2] && !D(i[2]) && (this.marginBottom = Math.max(this.marginBottom, o[2] + e[2])), this.legend && this.legend.display && this.legend.adjustMargins(i, e), G(this, "getMargins"), t || this.getAxisMargins()
                }, t.prototype.getAxisMargins = function () {
                    var t = this, e = t.axisOffset = [0, 0, 0, 0], i = t.colorAxis, o = t.margin, r = function (t) {
                        t.forEach(function (t) {
                            t.visible && t.getOffset()
                        })
                    };
                    t.hasCartesianSeries ? r(t.axes) : i && i.length && r(i), k.forEach(function (i, r) {
                        D(o[r]) || (t[i] += e[r])
                    }), t.setChartSize()
                }, t.prototype.getOptions = function () {
                    return B(this.userOptions, x)
                }, t.prototype.reflow = function (t) {
                    var e = this, i = e.containerBox, o = e.getContainerBox();
                    delete e.pointer.chartPosition, !e.isPrinting && !e.isResizing && i && o.width && ((o.width !== i.width || o.height !== i.height) && (p.clearTimeout(e.reflowTimeout), e.reflowTimeout = Q(function () {
                        e.container && e.setSize(void 0, void 0, !1)
                    }, t ? 100 : 0)), e.containerBox = o)
                }, t.prototype.setReflow = function () {
                    var t = this, e = function (e) {
                        var i;
                        (null === (i = t.options) || void 0 === i ? void 0 : i.chart.reflow) && t.hasLoaded && t.reflow(e)
                    };
                    if ("function" == typeof ResizeObserver) new ResizeObserver(e).observe(t.renderTo); else {
                        var i = L(T, "resize", e);
                        L(this, "destroy", i)
                    }
                }, t.prototype.setSize = function (t, e, i) {
                    var o = this, r = o.renderer;
                    o.isResizing += 1, v(i, o);
                    var s = r.globalAnimation;
                    o.oldChartHeight = o.chartHeight, o.oldChartWidth = o.chartWidth, void 0 !== t && (o.options.chart.width = t), void 0 !== e && (o.options.chart.height = e), o.getChartSize();
                    var n = o.chartWidth, a = o.chartHeight, h = o.scrollablePixelsX, l = o.scrollablePixelsY;
                    (o.isDirtyBox || n !== o.oldChartWidth || a !== o.oldChartHeight) && (o.styledMode || (s ? m : E)(o.container, {
                        width: "".concat(n + (void 0 === h ? 0 : h), "px"),
                        height: "".concat(a + (void 0 === l ? 0 : l), "px")
                    }, s), o.setChartSize(!0), r.setSize(n, a, s), o.axes.forEach(function (t) {
                        t.isDirty = !0, t.setScale()
                    }), o.isDirtyLegend = !0, o.isDirtyBox = !0, o.layOutTitles(), o.getMargins(), o.redraw(s), o.oldChartHeight = void 0, G(o, "resize"), setTimeout(function () {
                        o && G(o, "endResize", void 0, function () {
                            o.isResizing -= 1
                        })
                    }, y(s).duration))
                }, t.prototype.setChartSize = function (t) {
                    var e, i, o, r, s = this.inverted, n = this.renderer, a = this.chartWidth, h = this.chartHeight,
                        l = this.options.chart, c = this.spacing, p = this.clipOffset;
                    this.plotLeft = e = Math.round(this.plotLeft), this.plotTop = i = Math.round(this.plotTop), this.plotWidth = o = Math.max(0, Math.round(a - e - this.marginRight)), this.plotHeight = r = Math.max(0, Math.round(h - i - this.marginBottom)), this.plotSizeX = s ? r : o, this.plotSizeY = s ? o : r, this.plotBorderWidth = l.plotBorderWidth || 0, this.spacingBox = n.spacingBox = {
                        x: c[3],
                        y: c[0],
                        width: a - c[3] - c[1],
                        height: h - c[0] - c[2]
                    }, this.plotBox = n.plotBox = {x: e, y: i, width: o, height: r};
                    var d = 2 * Math.floor(this.plotBorderWidth / 2), u = Math.ceil(Math.max(d, p[3]) / 2),
                        f = Math.ceil(Math.max(d, p[0]) / 2);
                    this.clipBox = {
                        x: u,
                        y: f,
                        width: Math.floor(this.plotSizeX - Math.max(d, p[1]) / 2 - u),
                        height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, p[2]) / 2 - f))
                    }, t || (this.axes.forEach(function (t) {
                        t.setAxisSize(), t.setAxisTranslation()
                    }), n.alignElements()), G(this, "afterSetChartSize", {skipAxes: t})
                }, t.prototype.resetMargins = function () {
                    G(this, "resetMargins");
                    var t = this, e = t.options.chart;
                    ["margin", "spacing"].forEach(function (i) {
                        var o = e[i], r = U(o) ? o : [o, o, o, o];
                        ["Top", "Right", "Bottom", "Left"].forEach(function (o, s) {
                            t[i][s] = Z(e[i + o], r[s])
                        })
                    }), k.forEach(function (e, i) {
                        t[e] = Z(t.margin[i], t.spacing[i])
                    }), t.axisOffset = [0, 0, 0, 0], t.clipOffset = [0, 0, 0, 0]
                }, t.prototype.drawChartBox = function () {
                    var t, e, i, o = this.options.chart, r = this.renderer, s = this.chartWidth, n = this.chartHeight,
                        a = this.styledMode, h = this.plotBGImage, l = o.backgroundColor, c = o.plotBackgroundColor,
                        p = o.plotBackgroundImage, d = this.plotLeft, u = this.plotTop, f = this.plotWidth,
                        g = this.plotHeight, m = this.plotBox, y = this.clipRect, v = this.clipBox,
                        x = this.chartBackground, b = this.plotBackground, M = this.plotBorder, C = "animate";
                    x || (this.chartBackground = x = r.rect().addClass("highcharts-background").add(), C = "attr"), a ? t = e = x.strokeWidth() : (e = (t = o.borderWidth || 0) + (o.shadow ? 8 : 0), i = {fill: l || "none"}, (t || x["stroke-width"]) && (i.stroke = o.borderColor, i["stroke-width"] = t), x.attr(i).shadow(o.shadow)), x[C]({
                        x: e / 2,
                        y: e / 2,
                        width: s - e - t % 2,
                        height: n - e - t % 2,
                        r: o.borderRadius
                    }), C = "animate", b || (C = "attr", this.plotBackground = b = r.rect().addClass("highcharts-plot-background").add()), b[C](m), !a && (b.attr({fill: c || "none"}).shadow(o.plotShadow), p && (h ? (p !== h.attr("href") && h.attr("href", p), h.animate(m)) : this.plotBGImage = r.image(p, d, u, f, g).add())), y ? y.animate({
                        width: v.width,
                        height: v.height
                    }) : this.clipRect = r.clipRect(v), C = "animate", M || (C = "attr", this.plotBorder = M = r.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add()), a || M.attr({
                        stroke: o.plotBorderColor,
                        "stroke-width": o.plotBorderWidth || 0,
                        fill: "none"
                    }), M[C](M.crisp({
                        x: d,
                        y: u,
                        width: f,
                        height: g
                    }, -M.strokeWidth())), this.isDirtyBox = !1, G(this, "afterDrawChartBox")
                }, t.prototype.propFromSeries = function () {
                    var t, e, i, o = this, r = o.options.chart, s = o.options.series;
                    ["inverted", "angular", "polar"].forEach(function (n) {
                        for (e = P[r.type], i = r[n] || e && e.prototype[n], t = s && s.length; !i && t--;) (e = P[s[t].type]) && e.prototype[n] && (i = !0);
                        o[n] = i
                    })
                }, t.prototype.linkSeries = function (t) {
                    var e = this, i = e.series;
                    i.forEach(function (t) {
                        t.linkedSeries.length = 0
                    }), i.forEach(function (t) {
                        var i = t.options.linkedTo;
                        if (F(i)) {
                            var o = void 0;
                            (o = ":previous" === i ? e.series[t.index - 1] : e.get(i)) && o.linkedParent !== t && (o.linkedSeries.push(t), t.linkedParent = o, o.enabledDataSorting && t.setDataSortingOptions(), t.visible = Z(t.options.visible, o.options.visible, t.visible))
                        }
                    }), G(this, "afterLinkSeries", {isUpdating: t})
                }, t.prototype.renderSeries = function () {
                    this.series.forEach(function (t) {
                        t.translate(), t.render()
                    })
                }, t.prototype.render = function () {
                    var t, e, i = this.axes, o = this.colorAxis, r = this.renderer,
                        s = this.options.chart.axisLayoutRuns || 2, n = function (t) {
                            t.forEach(function (t) {
                                t.visible && t.render()
                            })
                        }, a = 0, h = !0, l = 0;
                    this.setTitle(), G(this, "beforeMargins"), null === (t = this.getStacks) || void 0 === t || t.call(this), this.getMargins(!0), this.setChartSize();
                    for (var c = 0; c < i.length; c++) {
                        var p = i[c], d = p.options, f = d.labels;
                        if (p.horiz && p.visible && f.enabled && p.series.length && "colorAxis" !== p.coll && !this.polar) {
                            a = d.tickLength, p.createGroups();
                            var g = new u(p, 0, "", !0), m = g.createLabel("x", f);
                            if (g.destroy(), m && Z(f.reserveSpace, !H(d.crossing)) && (a = m.getBBox().height + f.distance + Math.max(d.offset || 0, 0)), a) {
                                null == m || m.destroy();
                                break
                            }
                        }
                    }
                    for (this.plotHeight = Math.max(this.plotHeight - a, 0); (h || e || s > 1) && l < s;) {
                        for (var y = this.plotWidth, v = this.plotHeight, x = 0; x < i.length; x++) {
                            var p = i[x];
                            0 === l ? p.setScale() : (p.horiz && h || !p.horiz && e) && p.setTickInterval(!0)
                        }
                        0 === l ? this.getAxisMargins() : this.getMargins(), h = y / this.plotWidth > (l ? 1 : 1.1), e = v / this.plotHeight > (l ? 1 : 1.05), l++
                    }
                    this.drawChartBox(), this.hasCartesianSeries ? n(i) : o && o.length && n(o), this.seriesGroup || (this.seriesGroup = r.g("series-group").attr({zIndex: 3}).shadow(this.options.chart.seriesGroupShadow).add()), this.renderSeries(), this.addCredits(), this.setResponsive && this.setResponsive(), this.hasRendered = !0
                }, t.prototype.addCredits = function (t) {
                    var e = this, i = Y(!0, this.options.credits, t);
                    i.enabled && !this.credits && (this.credits = this.renderer.text(i.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        i.href && (T.location.href = i.href)
                    }).attr({
                        align: i.position.align,
                        zIndex: 8
                    }), e.styledMode || this.credits.css(i.style), this.credits.add().align(i.position), this.credits.update = function (t) {
                        e.credits = e.credits.destroy(), e.addCredits(t)
                    })
                }, t.prototype.destroy = function () {
                    var t, e = this, i = e.axes, o = e.series, r = e.container, n = r && r.parentNode;
                    for (G(e, "destroy"), e.renderer.forExport ? z(S, e) : S[e.index] = void 0, s.chartCount--, e.renderTo.removeAttribute("data-highcharts-chart"), $(e), t = i.length; t--;) i[t] = i[t].destroy();
                    for (this.scroller && this.scroller.destroy && this.scroller.destroy(), t = o.length; t--;) o[t] = o[t].destroy();
                    ["title", "subtitle", "chartBackground", "plotBackground", "plotBGImage", "plotBorder", "seriesGroup", "clipRect", "credits", "pointer", "rangeSelector", "legend", "resetZoomButton", "tooltip", "renderer"].forEach(function (t) {
                        var i = e[t];
                        i && i.destroy && (e[t] = i.destroy())
                    }), r && (r.innerHTML = d.emptyHTML, $(r), n && I(r)), V(e, function (t, i) {
                        delete e[i]
                    })
                }, t.prototype.firstRender = function () {
                    var t = this, e = t.options;
                    t.getContainer(), t.resetMargins(), t.setChartSize(), t.propFromSeries(), t.getAxes();
                    var i = X(e.series) ? e.series : [];
                    e.series = [], i.forEach(function (e) {
                        t.initSeries(e)
                    }), t.linkSeries(), t.setSortedData(), G(t, "beforeRender"), t.render(), t.pointer.getChartPosition(), t.renderer.imgCount || t.hasLoaded || t.onload(), t.temporaryDisplay(!0)
                }, t.prototype.onload = function () {
                    this.callbacks.concat([this.callback]).forEach(function (t) {
                        t && void 0 !== this.index && t.apply(this, [this])
                    }, this), G(this, "load"), G(this, "render"), D(this.index) && this.setReflow(), this.warnIfA11yModuleNotLoaded(), this.hasLoaded = !0
                }, t.prototype.warnIfA11yModuleNotLoaded = function () {
                    var t = this.options, e = this.title;
                    !t || this.accessibility || (this.renderer.boxWrapper.attr({
                        role: "img",
                        "aria-label": (e && e.element.textContent || "").replace(/</g, "&lt;")
                    }), t.accessibility && !1 === t.accessibility.enabled || R('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.', !1, this))
                }, t.prototype.addSeries = function (t, e, i) {
                    var o, r = this;
                    return t && (e = Z(e, !0), G(r, "addSeries", {options: t}, function () {
                        o = r.initSeries(t), r.isDirtyLegend = !0, r.linkSeries(), o.enabledDataSorting && o.setData(t.data, !1), G(r, "afterAddSeries", {series: o}), e && r.redraw(i)
                    })), o
                }, t.prototype.addAxis = function (t, e, i, o) {
                    return this.createAxis(e ? "xAxis" : "yAxis", {axis: t, redraw: i, animation: o})
                }, t.prototype.addColorAxis = function (t, e, i) {
                    return this.createAxis("colorAxis", {axis: t, redraw: e, animation: i})
                }, t.prototype.createAxis = function (t, i) {
                    var o = new e(this, i.axis, t);
                    return Z(i.redraw, !0) && this.redraw(i.animation), o
                }, t.prototype.showLoading = function (t) {
                    var e = this, i = e.options, o = i.loading, r = function () {
                        s && E(s, {
                            left: e.plotLeft + "px",
                            top: e.plotTop + "px",
                            width: e.plotWidth + "px",
                            height: e.plotHeight + "px"
                        })
                    }, s = e.loadingDiv, n = e.loadingSpan;
                    s || (e.loadingDiv = s = O("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, e.container)), n || (e.loadingSpan = n = O("span", {className: "highcharts-loading-inner"}, null, s), L(e, "redraw", r)), s.className = "highcharts-loading", d.setElementHTML(n, Z(t, i.lang.loading, "")), e.styledMode || (E(s, N(o.style, {zIndex: 10})), E(n, o.labelStyle), e.loadingShown || (E(s, {
                        opacity: 0,
                        display: ""
                    }), m(s, {opacity: o.style.opacity || .5}, {duration: o.showDuration || 0}))), e.loadingShown = !0, r()
                }, t.prototype.hideLoading = function () {
                    var t = this.options, e = this.loadingDiv;
                    e && (e.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || m(e, {opacity: 0}, {
                        duration: t.loading.hideDuration || 100,
                        complete: function () {
                            E(e, {display: "none"})
                        }
                    })), this.loadingShown = !1
                }, t.prototype.update = function (t, e, i, o) {
                    var r, s, n, a = this,
                        h = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption"},
                        l = t.isResponsiveOptions, p = [];
                    G(a, "update", {options: t}), l || a.setResponsive(!1, !0), t = B(t, a.options), a.userOptions = Y(a.userOptions, t);
                    var d = t.chart;
                    d && (Y(!0, a.options.chart, d), this.setZoomOptions(), "className" in d && a.setClassName(d.className), ("inverted" in d || "polar" in d || "type" in d) && (a.propFromSeries(), r = !0), "alignTicks" in d && (r = !0), "events" in d && C(this, d), V(d, function (t, e) {
                        -1 !== a.propsRequireUpdateSeries.indexOf("chart." + e) && (s = !0), -1 !== a.propsRequireDirtyBox.indexOf(e) && (a.isDirtyBox = !0), -1 === a.propsRequireReflow.indexOf(e) || (a.isDirtyBox = !0, l || (n = !0))
                    }), !a.styledMode && d.style && a.renderer.setStyle(a.options.chart.style || {})), !a.styledMode && t.colors && (this.options.colors = t.colors), t.time && (this.time === b && (this.time = new c(t.time)), Y(!0, a.options.time, t.time)), V(t, function (e, i) {
                        a[i] && "function" == typeof a[i].update ? a[i].update(e, !1) : "function" == typeof a[h[i]] ? a[h[i]](e) : "colors" !== i && -1 === a.collectionsWithUpdate.indexOf(i) && Y(!0, a.options[i], t[i]), "chart" !== i && -1 !== a.propsRequireUpdateSeries.indexOf(i) && (s = !0)
                    }), this.collectionsWithUpdate.forEach(function (e) {
                        t[e] && (J(t[e]).forEach(function (t, o) {
                            var r, s = D(t.id);
                            s && (r = a.get(t.id)), !r && a[e] && (r = a[e][Z(t.index, o)]) && (s && D(r.options.id) || r.options.isInternal) && (r = void 0), r && r.coll === e && (r.update(t, !1), i && (r.touched = !0)), !r && i && a.collectionsWithInit[e] && (a.collectionsWithInit[e][0].apply(a, [t].concat(a.collectionsWithInit[e][1] || []).concat([!1])).touched = !0)
                        }), i && a[e].forEach(function (t) {
                            t.touched || t.options.isInternal ? delete t.touched : p.push(t)
                        }))
                    }), p.forEach(function (t) {
                        t.chart && t.remove && t.remove(!1)
                    }), r && a.axes.forEach(function (t) {
                        t.update({}, !1)
                    }), s && a.getSeriesOrderByLinks().forEach(function (t) {
                        t.chart && t.update({}, !1)
                    }, this);
                    var u = d && d.width, f = d && (F(d.height) ? K(d.height, u || a.chartWidth) : d.height);
                    n || H(u) && u !== a.chartWidth || H(f) && f !== a.chartHeight ? a.setSize(u, f, o) : Z(e, !0) && a.redraw(o), G(a, "afterUpdate", {
                        options: t,
                        redraw: e,
                        animation: o
                    })
                }, t.prototype.setSubtitle = function (t, e) {
                    this.applyDescription("subtitle", t), this.layOutTitles(e)
                }, t.prototype.setCaption = function (t, e) {
                    this.applyDescription("caption", t), this.layOutTitles(e)
                }, t.prototype.showResetZoom = function () {
                    var t = this, e = x.lang, i = t.zooming.resetButton, o = i.theme,
                        r = "chart" === i.relativeTo || "spacingBox" === i.relativeTo ? null : "scrollablePlotBox";

                    function s() {
                        t.zoomOut()
                    }

                    G(this, "beforeShowResetZoom", null, function () {
                        t.resetZoomButton = t.renderer.button(e.resetZoom, null, null, s, o).attr({
                            align: i.position.align,
                            title: e.resetZoomTitle
                        }).addClass("highcharts-reset-zoom").add().align(i.position, !1, r)
                    }), G(this, "afterShowResetZoom")
                }, t.prototype.zoomOut = function () {
                    G(this, "selection", {resetSelection: !0}, this.zoom)
                }, t.prototype.zoom = function (t) {
                    var e, i = this, o = i.pointer, r = !1;
                    !t || t.resetSelection ? (i.axes.forEach(function (t) {
                        e = t.zoom()
                    }), o.initiated = !1) : t.xAxis.concat(t.yAxis).forEach(function (t) {
                        var s = t.axis, n = s.isXAxis, a = o.hasPinched, h = o.mouseDownX, l = o.mouseDownY;
                        (o[n ? "zoomX" : "zoomY"] && D(h) && D(l) && i.isInsidePlot(h - i.plotLeft, l - i.plotTop, {
                            axis: s,
                            ignoreX: a,
                            ignoreY: a
                        }) || !D(i.inverted ? h : l)) && (e = s.zoom(t.min, t.max), s.displayBtn && (r = !0))
                    });
                    var s = i.resetZoomButton;
                    r && !s ? i.showResetZoom() : !r && U(s) && (i.resetZoomButton = s.destroy()), e && i.redraw(Z(i.options.chart.animation, t && t.animation, i.pointCount < 100))
                }, t.prototype.pan = function (t, e) {
                    var i, o = this, r = o.hoverPoints, s = "object" == typeof e ? e : {enabled: e, type: "x"},
                        n = o.options.chart;
                    n && n.panning && (n.panning = s);
                    var a = s.type;
                    G(this, "pan", {originalEvent: t}, function () {
                        r && r.forEach(function (t) {
                            t.setState()
                        });
                        var e = o.xAxis;
                        "xy" === a ? e = e.concat(o.yAxis) : "y" === a && (e = o.yAxis);
                        var s = {};
                        e.forEach(function (e) {
                            if (e.options.panningEnabled && !e.options.isInternal) {
                                var r, n = e.horiz, h = t[n ? "chartX" : "chartY"], l = n ? "mouseDownX" : "mouseDownY",
                                    c = o[l], p = e.minPointOffset || 0,
                                    d = e.reversed && !o.inverted || !e.reversed && o.inverted ? -1 : 1,
                                    u = e.getExtremes(), f = e.toValue(c - h, !0) + p * d,
                                    g = e.toValue(c + e.len - h, !0) - (p * d || e.isXAxis && e.pointRangePadding || 0),
                                    m = g < f, y = e.hasVerticalPanning(), v = m ? g : f, x = m ? f : g, b = e.panningState;
                                y && !e.isXAxis && (!b || b.isDirty) && e.series.forEach(function (t) {
                                    var e = t.getProcessedData(!0), i = t.getExtremes(e.yData, !0);
                                    b || (b = {
                                        startMin: Number.MAX_VALUE,
                                        startMax: -Number.MAX_VALUE
                                    }), H(i.dataMin) && H(i.dataMax) && (b.startMin = Math.min(Z(t.options.threshold, 1 / 0), i.dataMin, b.startMin), b.startMax = Math.max(Z(t.options.threshold, -1 / 0), i.dataMax, b.startMax))
                                });
                                var M = Math.min(Z(b && b.startMin, u.dataMin), p ? u.min : e.toValue(e.toPixels(u.min) - e.minPixelPadding)),
                                    C = Math.max(Z(b && b.startMax, u.dataMax), p ? u.max : e.toValue(e.toPixels(u.max) + e.minPixelPadding));
                                e.panningState = b, e.isOrdinal || ((r = M - v) > 0 && (x += r, v = M), (r = x - C) > 0 && (x = C, v -= r), e.series.length && v !== u.min && x !== u.max && v >= M && x <= C && (e.setExtremes(v, x, !1, !1, {trigger: "pan"}), !o.resetZoomButton && v !== M && x !== C && a.match("y") && (o.showResetZoom(), e.displayBtn = !1), i = !0), s[l] = h)
                            }
                        }), V(s, function (t, e) {
                            o[e] = t
                        }), i && o.redraw(!1), E(o.container, {cursor: "move"})
                    })
                }, t
            }();
        return N(te.prototype, {
            callbacks: [],
            collectionsWithInit: {
                xAxis: [te.prototype.addAxis, [!0]],
                yAxis: [te.prototype.addAxis, [!1]],
                series: [te.prototype.addSeries]
            },
            collectionsWithUpdate: ["xAxis", "yAxis", "series"],
            propsRequireDirtyBox: ["backgroundColor", "borderColor", "borderWidth", "borderRadius", "plotBackgroundColor", "plotBackgroundImage", "plotBorderColor", "plotBorderWidth", "plotShadow", "shadow"],
            propsRequireReflow: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "spacing", "spacingTop", "spacingRight", "spacingBottom", "spacingLeft"],
            propsRequireUpdateSeries: ["chart.inverted", "chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions", "time", "tooltip"]
        }), te
    }), i(e, "Extensions/ScrollablePlotArea.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Globals.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r = t.stop, s = e.composed, n = o.addEvent, a = o.createElement, h = o.css, l = o.defined, c = o.extend,
            p = o.merge, d = o.pick, u = o.pushUnique;

        function f() {
            var t, e, o, s, l = this.axisOffset, c = this.chartWidth, p = this.chartHeight, u = this.container,
                f = this.plotHeight, g = this.plotLeft, m = this.plotTop, y = this.plotWidth,
                v = this.scrollablePixelsX, x = void 0 === v ? 0 : v, b = this.scrollablePixelsY,
                M = void 0 === b ? 0 : b, C = this.scrollingContainer, S = !this.fixedDiv, w = this.options.chart,
                k = w.scrollablePlotArea, A = k.scrollPositionX, T = k.scrollPositionY, P = i.getRendererType(),
                L = this.fixedRenderer;
            L ? L.setSize(c, p) : (this.fixedDiv = a("div", {className: "highcharts-fixed"}, {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((null === (t = w.style) || void 0 === t ? void 0 : t.zIndex) || 0) + 2,
                top: 0
            }, void 0, !0), null == C || C.parentNode.insertBefore(this.fixedDiv, C), h(this.renderTo, {overflow: "visible"}), this.fixedRenderer = L = new P(this.fixedDiv, c, p, w.style), this.scrollableMask = L.path().attr({
                fill: w.backgroundColor || "#fff",
                "fill-opacity": d(k.opacity, .85),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), n(this, "afterShowResetZoom", this.moveFixedElements), n(this, "afterApplyDrilldown", this.moveFixedElements), n(this, "afterLayOutTitles", this.moveFixedElements)), (this.scrollableDirty || S) && (this.scrollableDirty = !1, this.moveFixedElements());
            var j = c + x, O = p + M;
            r(this.container), h(u, {
                width: "".concat(j, "px"),
                height: "".concat(O, "px")
            }), this.renderer.boxWrapper.attr({
                width: j,
                height: O,
                viewBox: [0, 0, j, O].join(" ")
            }), null === (e = this.chartBackground) || void 0 === e || e.attr({
                width: j,
                height: O
            }), C && (h(C, {
                width: "".concat(this.chartWidth, "px"),
                height: "".concat(this.chartHeight, "px")
            }), S && (A && (C.scrollLeft = x * A), T && (C.scrollTop = M * T)));
            var E = m - l[0] - 1, D = g - l[3] - 1, B = m + f + l[2] + 1, I = g + y + l[1] + 1, z = g + y - x,
                R = m + f - M;
            s = x ? [["M", 0, E], ["L", g - 1, E], ["L", g - 1, B], ["L", 0, B], ["Z"], ["M", z, E], ["L", c, E], ["L", c, B], ["L", z, B], ["Z"]] : M ? [["M", D, 0], ["L", D, m - 1], ["L", I, m - 1], ["L", I, 0], ["Z"], ["M", D, R], ["L", D, p], ["L", I, p], ["L", I, R], ["Z"]] : [["M", 0, 0]], "adjustHeight" !== this.redrawTrigger && (null === (o = this.scrollableMask) || void 0 === o || o.attr({d: s}))
        }

        function g() {
            var t, e = this.container, i = this.fixedRenderer,
                o = [".highcharts-breadcrumbs-group", ".highcharts-contextbutton", ".highcharts-caption", ".highcharts-credits", ".highcharts-legend", ".highcharts-legend-checkbox", ".highcharts-navigator-series", ".highcharts-navigator-xaxis", ".highcharts-navigator-yaxis", ".highcharts-navigator", ".highcharts-reset-zoom", ".highcharts-drillup-button", ".highcharts-scrollbar", ".highcharts-subtitle", ".highcharts-title"];
            this.scrollablePixelsX && !this.inverted ? t = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? t = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? t = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (t = ".highcharts-yaxis"), t && o.push("".concat(t, ":not(.highcharts-radial-axis)"), "".concat(t, "-labels:not(.highcharts-radial-axis-labels)"));
            for (var r = 0; r < o.length; r++) {
                var s = o[r];
                [].forEach.call(e.querySelectorAll(s), function (t) {
                    (t.namespaceURI === i.SVG_NS ? i.box : i.box.parentNode).appendChild(t), t.style.pointerEvents = "auto"
                })
            }
        }

        function m() {
            var t, e = this, i = {WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden"};
            this.scrollablePixelsX && (i.overflowX = "auto"), this.scrollablePixelsY && (i.overflowY = "auto"), this.scrollingParent = a("div", {className: "highcharts-scrolling-parent"}, {position: "relative"}, this.renderTo), this.scrollingContainer = a("div", {className: "highcharts-scrolling"}, i, this.scrollingParent), n(this.scrollingContainer, "scroll", function () {
                e.pointer && (delete e.pointer.chartPosition, e.hoverPoint && (t = e.hoverPoint), e.pointer.runPointActions(void 0, t, !0))
            }), this.innerContainer = a("div", {className: "highcharts-inner-container"}, null, this.scrollingContainer), this.innerContainer.appendChild(this.container), this.setUpScrolling = null
        }

        function y() {
            this.chart.scrollableDirty = !0
        }

        function v(t) {
            var e, i, o, r = this.options.chart.scrollablePlotArea, s = r && r.minWidth, n = r && r.minHeight;
            if (!this.renderer.forExport && (s ? (this.scrollablePixelsX = e = Math.max(0, s - this.chartWidth), e && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = p(this.plotBox), this.plotBox.width = this.plotWidth += e, this.inverted ? this.clipBox.height += e : this.clipBox.width += e, o = {
                1: {
                    name: "right",
                    value: e
                }
            })) : n && (this.scrollablePixelsY = i = Math.max(0, n - this.chartHeight), l(i) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = p(this.plotBox), this.plotBox.height = this.plotHeight += i, this.inverted ? this.clipBox.width += i : this.clipBox.height += i, o = {
                2: {
                    name: "bottom",
                    value: i
                }
            })), o && !t.skipAxes)) for (var a = function (t) {
                if (o[t.side]) {
                    var e = t.getPlotLinePath;
                    t.getPlotLinePath = function () {
                        var i = o[t.side].name, r = o[t.side].value, s = this[i];
                        this[i] = s - r;
                        var n = e.apply(this, arguments);
                        return this[i] = s, n
                    }
                } else t.setAxisSize(), t.setAxisTranslation()
            }, h = 0, c = this.axes; h < c.length; h++) a(c[h])
        }

        function x() {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        }

        function b() {
            this.chart.scrollableDirty = !0
        }

        return {
            compose: function t(e, i, o) {
                u(s, t) && (n(e, "afterInit", y), c(i.prototype, {
                    applyFixed: f,
                    moveFixedElements: g,
                    setUpScrolling: m
                }), n(i, "afterSetChartSize", v), n(i, "render", x), n(o, "show", b))
            }
        }
    }), i(e, "Core/Axis/Stacking/StackItem.js", [e["Core/Templating.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o = t.format, r = e.series, s = i.destroyObjectProperties, n = i.fireEvent, a = i.isNumber, h = i.pick;
        return function () {
            function t(t, e, i, o, r) {
                var s = t.chart.inverted, n = t.reversed;
                this.axis = t;
                var a = this.isNegative = !!i != !!n;
                this.options = e = e || {}, this.x = o, this.total = null, this.cumulative = null, this.points = {}, this.hasValidPoints = !1, this.stack = r, this.leftCliff = 0, this.rightCliff = 0, this.alignOptions = {
                    align: e.align || (s ? a ? "left" : "right" : "center"),
                    verticalAlign: e.verticalAlign || (s ? "middle" : a ? "bottom" : "top"),
                    y: e.y,
                    x: e.x
                }, this.textAlign = e.textAlign || (s ? a ? "right" : "left" : "center")
            }

            return t.prototype.destroy = function () {
                s(this, this.axis)
            }, t.prototype.render = function (t) {
                var e = this.axis.chart, i = this.options, r = i.format, s = r ? o(r, this, e) : i.formatter.call(this);
                if (this.label) this.label.attr({text: s, visibility: "hidden"}); else {
                    this.label = e.renderer.label(s, null, void 0, i.shape, void 0, void 0, i.useHTML, !1, "stack-labels");
                    var a = {r: i.borderRadius || 0, text: s, padding: h(i.padding, 5), visibility: "hidden"};
                    e.styledMode || (a.fill = i.backgroundColor, a.stroke = i.borderColor, a["stroke-width"] = i.borderWidth, this.label.css(i.style || {})), this.label.attr(a), this.label.added || this.label.add(t)
                }
                this.label.labelrank = e.plotSizeY, n(this, "afterRender")
            }, t.prototype.setOffset = function (t, e, i, o, s, l) {
                var c = this.alignOptions, p = this.axis, d = this.label, u = this.options, f = this.textAlign,
                    g = p.chart,
                    m = this.getStackBox({xOffset: t, width: e, boxBottom: i, boxTop: o, defaultX: s, xAxis: l}),
                    y = c.verticalAlign;
                if (d && m) {
                    var v = d.getBBox(), x = d.padding, b = "justify" === h(u.overflow, "justify"), M = void 0;
                    c.x = u.x || 0, c.y = u.y || 0;
                    var C = this.adjustStackPosition({labelBox: v, verticalAlign: y, textAlign: f}), S = C.x, w = C.y;
                    m.x -= S, m.y -= w, d.align(c, !1, m), (M = g.isInsidePlot(d.alignAttr.x + c.x + S, d.alignAttr.y + c.y + w)) || (b = !1), b && r.prototype.justifyDataLabel.call(p, d, c, d.alignAttr, v, m), d.attr({
                        x: d.alignAttr.x,
                        y: d.alignAttr.y,
                        rotation: u.rotation,
                        rotationOriginX: v.width / 2,
                        rotationOriginY: v.height / 2
                    }), h(!b && u.crop, !0) && (M = a(d.x) && a(d.y) && g.isInsidePlot(d.x - x + (d.width || 0), d.y) && g.isInsidePlot(d.x + x, d.y)), d[M ? "show" : "hide"]()
                }
                n(this, "afterSetOffset", {xOffset: t, width: e})
            }, t.prototype.adjustStackPosition = function (t) {
                var e = t.labelBox, i = t.verticalAlign, o = t.textAlign,
                    r = {bottom: 0, middle: 1, top: 2, right: 1, center: 0, left: -1}, s = r[i], n = r[o];
                return {x: e.width / 2 + e.width / 2 * n, y: e.height / 2 * s}
            }, t.prototype.getStackBox = function (t) {
                var e = this.axis, i = e.chart, o = t.boxTop, r = t.defaultX, s = t.xOffset, n = t.width,
                    l = t.boxBottom, c = e.stacking.usePercentage ? 100 : h(o, this.total, 0), p = e.toPixels(c),
                    d = t.xAxis || i.xAxis[0], u = h(r, d.translate(this.x)) + s,
                    f = Math.abs(p - e.toPixels(l || a(e.min) && e.logarithmic && e.logarithmic.lin2log(e.min) || 0)),
                    g = i.inverted, m = this.isNegative;
                return g ? {
                    x: (m ? p : p - f) - i.plotLeft,
                    y: d.height - u - n,
                    width: f,
                    height: n
                } : {x: u + d.transB - i.plotLeft, y: (m ? p - f : p) - i.plotTop, width: n, height: f}
            }, t
        }()
    }), i(e, "Core/Axis/Stacking/StackingAxis.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Axis/Axis.js"], e["Core/Globals.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Axis/Stacking/StackItem.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s) {
        var n, a = t.getDeferredAnimation, h = i.composed, l = o.series.prototype, c = s.addEvent, p = s.correctFloat,
            d = s.defined, u = s.destroyObjectProperties, f = s.fireEvent, g = s.isArray, m = s.isNumber,
            y = s.objectEach, v = s.pick, x = s.pushUnique;

        function b() {
            var t = this.inverted;
            this.axes.forEach(function (t) {
                t.stacking && t.stacking.stacks && t.hasVisibleSeries && (t.stacking.oldStacks = t.stacking.stacks)
            }), this.series.forEach(function (e) {
                var i = e.xAxis && e.xAxis.options || {};
                e.options.stacking && e.reserveSpace() && (e.stackKey = [e.type, v(e.options.stack, ""), t ? i.top : i.left, t ? i.height : i.width].join(","))
            })
        }

        function M() {
            var t, e = this.stacking;
            if (e) {
                var i = e.stacks;
                y(i, function (t, e) {
                    u(t), delete i[e]
                }), null === (t = e.stackTotalGroup) || void 0 === t || t.destroy()
            }
        }

        function C() {
            this.stacking || (this.stacking = new P(this))
        }

        function S(t, e, i, o) {
            return !d(t) || t.x !== e || o && t.stackKey !== o ? t = {
                x: e,
                index: 0,
                key: o,
                stackKey: o
            } : t.index++, t.key = [i, e, t.index].join(","), t
        }

        function w() {
            var t, e = this, i = e.yAxis, o = e.stackKey || "", r = i.stacking.stacks, s = e.processedXData,
                n = e.options.stacking, a = e[n + "Stacker"];
            a && [o, "-" + o].forEach(function (i) {
                for (var o, n, h, l, c = s.length; c--;) n = s[c], t = e.getStackIndicator(t, n, e.index, i), (l = null == (h = null === (o = r[i]) || void 0 === o ? void 0 : o[n]) ? void 0 : h.points[t.key || ""]) && a.call(e, l, h, c)
            })
        }

        function k(t, e, i) {
            var o = e.total ? 100 / e.total : 0;
            t[0] = p(t[0] * o), t[1] = p(t[1] * o), this.stackedYData[i] = t[1]
        }

        function A(t) {
            (this.is("column") || this.is("columnrange")) && (this.options.centerInCategory && !this.options.stacking && this.chart.series.length > 1 ? l.setStackedPoints.call(this, t, "group") : t.stacking.resetStacks())
        }

        function T(t, e) {
            var i, o, s, n, a, h, l, c, u, f, m, y = e || this.options.stacking;
            if (y && this.reserveSpace() && (({group: "xAxis"})[y] || "yAxis") === t.coll) {
                var x = this.processedXData, b = this.processedYData, M = [], C = b.length, S = this.options,
                    w = S.threshold || 0, k = S.startFromThreshold ? w : 0, A = S.stack,
                    T = e ? "".concat(this.type, ",").concat(y) : this.stackKey || "", P = "-" + T, L = this.negStacks,
                    j = t.stacking, O = j.stacks, E = j.oldStacks;
                for (j.stacksTouched += 1, u = 0; u < C; u++) {
                    f = x[u], m = b[u], c = (s = this.getStackIndicator(s, f, this.index)).key || "", O[l = (n = L && m < (k ? 0 : w)) ? P : T] || (O[l] = {}), O[l][f] || ((null === (i = E[l]) || void 0 === i ? void 0 : i[f]) ? (O[l][f] = E[l][f], O[l][f].total = null) : O[l][f] = new r(t, t.options.stackLabels, !!n, f, A)), a = O[l][f], null !== m ? (a.points[c] = a.points[this.index] = [v(a.cumulative, k)], d(a.cumulative) || (a.base = c), a.touched = j.stacksTouched, s.index > 0 && !1 === this.singleStacks && (a.points[c][0] = a.points[this.index + "," + f + ",0"][0])) : (delete a.points[c], delete a.points[this.index]);
                    var D = a.total || 0;
                    "percent" === y ? (h = n ? T : P, D = L && (null === (o = O[h]) || void 0 === o ? void 0 : o[f]) ? (h = O[h][f]).total = Math.max(h.total || 0, D) + Math.abs(m) || 0 : p(D + (Math.abs(m) || 0))) : "group" === y ? (g(m) && (m = m[0]), null !== m && D++) : D = p(D + (m || 0)), "group" === y ? a.cumulative = (D || 1) - 1 : a.cumulative = p(v(a.cumulative, k) + (m || 0)), a.total = D, null !== m && (a.points[c].push(a.cumulative), M[u] = a.cumulative, a.hasValidPoints = !0)
                }
                "percent" === y && (j.usePercentage = !0), "group" !== y && (this.stackedYData = M), j.oldStacks = {}
            }
        }

        var P = function () {
            function t(t) {
                this.oldStacks = {}, this.stacks = {}, this.stacksTouched = 0, this.axis = t
            }

            return t.prototype.buildStacks = function () {
                var t, e, i = this.axis, o = i.series, r = "xAxis" === i.coll, s = i.options.reversedStacks,
                    n = o.length;
                for (this.resetStacks(), this.usePercentage = !1, e = n; e--;) t = o[s ? e : n - e - 1], r && t.setGroupedPoints(i), t.setStackedPoints(i);
                if (!r) for (e = 0; e < n; e++) o[e].modifyStacks();
                f(i, "afterBuildStacks")
            }, t.prototype.cleanStacks = function () {
                this.oldStacks && (this.stacks = this.oldStacks, y(this.stacks, function (t) {
                    y(t, function (t) {
                        t.cumulative = t.total
                    })
                }))
            }, t.prototype.resetStacks = function () {
                var t = this;
                y(this.stacks, function (e) {
                    y(e, function (i, o) {
                        m(i.touched) && i.touched < t.stacksTouched ? (i.destroy(), delete e[o]) : (i.total = null, i.cumulative = null)
                    })
                })
            }, t.prototype.renderStackTotals = function () {
                var t, e = this.axis, i = e.chart, o = i.renderer, r = this.stacks,
                    s = a(i, (null === (t = e.options.stackLabels) || void 0 === t ? void 0 : t.animation) || !1),
                    n = this.stackTotalGroup = this.stackTotalGroup || o.g("stack-labels").attr({
                        zIndex: 6,
                        opacity: 0
                    }).add();
                n.translate(i.plotLeft, i.plotTop), y(r, function (t) {
                    y(t, function (t) {
                        t.render(n)
                    })
                }), n.animate({opacity: 1}, s)
            }, t
        }();
        return (n || (n = {})).compose = function t(e, i, o) {
            if (x(h, t)) {
                var r = i.prototype, s = o.prototype;
                c(e, "init", C), c(e, "destroy", M), r.getStacks = b, s.getStackIndicator = S, s.modifyStacks = w, s.percentStacker = k, s.setGroupedPoints = A, s.setStackedPoints = T
            }
        }, n
    }), i(e, "Series/Line/LineSeries.js", [e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
            return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), s = this && this.__spreadArray || function (t, e, i) {
            if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
            return t.concat(o || Array.prototype.slice.call(e))
        }, n = i.defined, a = i.merge, h = i.isObject, l = function (e) {
            function i() {
                return null !== e && e.apply(this, arguments) || this
            }

            return r(i, e), i.prototype.drawGraph = function () {
                var t = this, e = this.options, i = (this.gappedPath || this.getGraphPath).call(this),
                    o = this.chart.styledMode;
                s([this], this.zones, !0).forEach(function (r, s) {
                    var n, l = r.graph, c = l ? "animate" : "attr", p = r.dashStyle || e.dashStyle;
                    l ? (l.endX = t.preventGraphAnimation ? null : i.xMap, l.animate({d: i})) : i.length && (r.graph = l = t.chart.renderer.path(i).addClass("highcharts-graph" + (s ? " highcharts-zone-graph-".concat(s - 1, " ") : " ") + (s && r.className || "")).attr({zIndex: 1}).add(t.group)), l && !o && (n = {
                        stroke: !s && e.lineColor || r.color || t.color || "#cccccc",
                        "stroke-width": e.lineWidth || 0,
                        fill: t.fillGraph && t.color || "none"
                    }, p ? n.dashstyle = p : "square" !== e.linecap && (n["stroke-linecap"] = n["stroke-linejoin"] = "round"), l[c](n).shadow(s < 2 && e.shadow && a({filterUnits: "userSpaceOnUse"}, h(e.shadow) ? e.shadow : {}))), l && (l.startX = i.xMap, l.isArea = i.isArea)
                })
            }, i.prototype.getGraphPath = function (t, e, i) {
                var o, r = this, s = r.options, a = [], h = [], l = s.step, c = (t = t || r.points).reversed;
                return c && t.reverse(), (l = ({
                    right: 1,
                    center: 2
                })[l] || l && 3) && c && (l = 4 - l), (t = this.getValidPoints(t, !1, !(s.connectNulls && !e && !i))).forEach(function (c, p) {
                    var d, u = c.plotX, f = c.plotY, g = t[p - 1], m = c.isNull || "number" != typeof f;
                    (c.leftCliff || g && g.rightCliff) && !i && (o = !0), m && !n(e) && p > 0 ? o = !s.connectNulls : m && !e ? o = !0 : (0 === p || o ? d = [["M", c.plotX, c.plotY]] : r.getPointSpline ? d = [r.getPointSpline(t, c, p)] : l ? (d = 1 === l ? [["L", g.plotX, f]] : 2 === l ? [["L", (g.plotX + u) / 2, g.plotY], ["L", (g.plotX + u) / 2, f]] : [["L", u, g.plotY]]).push(["L", u, f]) : d = [["L", u, f]], h.push(c.x), l && (h.push(c.x), 2 === l && h.push(c.x)), a.push.apply(a, d), o = !1)
                }), a.xMap = h, r.graphPath = a, a
            }, i.defaultOptions = a(t.defaultOptions, {legendSymbol: "lineMarker"}), i
        }(t);
        return e.registerSeriesType("line", l), l
    }), i(e, "Series/Area/AreaSeries.js", [e["Core/Color/Color.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
            return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), s = this && this.__spreadArray || function (t, e, i) {
            if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
            return t.concat(o || Array.prototype.slice.call(e))
        };
        t.parse;
        var n = e.seriesTypes.line, a = i.extend, h = i.merge, l = i.objectEach, c = i.pick, p = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return r(e, t), e.prototype.drawGraph = function () {
                var e = this;
                this.areaPath = [], t.prototype.drawGraph.apply(this);
                var i = this.areaPath, o = this.options;
                s([this], this.zones, !0).forEach(function (t, r) {
                    var s, n = {}, a = t.fillColor || o.fillColor, h = t.area, l = h ? "animate" : "attr";
                    h ? (h.endX = e.preventGraphAnimation ? null : i.xMap, h.animate({d: i})) : (n.zIndex = 0, (h = t.area = e.chart.renderer.path(i).addClass("highcharts-area" + (r ? " highcharts-zone-area-".concat(r - 1, " ") : " ") + (r && t.className || "")).add(e.group)).isArea = !0), e.chart.styledMode || (n.fill = a || t.color || e.color, n["fill-opacity"] = a ? 1 : null !== (s = o.fillOpacity) && void 0 !== s ? s : .75, h.css({pointerEvents: e.stickyTracking ? "none" : "auto"})), h[l](n), h.startX = i.xMap, h.shiftUnit = o.step ? 2 : 1
                })
            }, e.prototype.getGraphPath = function (t) {
                var e, i, o, r = n.prototype.getGraphPath, s = this.options, a = s.stacking, h = this.yAxis, l = [],
                    p = [], d = this.index, u = h.stacking.stacks[this.stackKey], f = s.threshold,
                    g = Math.round(h.getThreshold(s.threshold)), m = c(s.connectNulls, "percent" === a),
                    y = function (i, o, r) {
                        var s, n, c = t[i], m = a && u[c.x].points[d], y = c[r + "Null"] || 0, v = c[r + "Cliff"] || 0,
                            x = !0;
                        v || y ? (s = (y ? m[0] : m[1]) + v, n = m[0] + v, x = !!y) : !a && t[o] && t[o].isNull && (s = n = f), void 0 !== s && (p.push({
                            plotX: e,
                            plotY: null === s ? g : h.getThreshold(s),
                            isNull: x,
                            isCliff: !0
                        }), l.push({plotX: e, plotY: null === n ? g : h.getThreshold(n), doCurve: !1}))
                    };
                t = t || this.points, a && (t = this.getStackPoints(t));
                for (var v = 0, x = t.length; v < x; ++v) a || (t[v].leftCliff = t[v].rightCliff = t[v].leftNull = t[v].rightNull = void 0), i = t[v].isNull, e = c(t[v].rectPlotX, t[v].plotX), o = a ? c(t[v].yBottom, g) : g, i && !m || (m || y(v, v - 1, "left"), i && !a && m || (p.push(t[v]), l.push({
                    x: v,
                    plotX: e,
                    plotY: o
                })), m || y(v, v + 1, "right"));
                var b = r.call(this, p, !0, !0);
                l.reversed = !0;
                var M = r.call(this, l, !0, !0), C = M[0];
                C && "M" === C[0] && (M[0] = ["L", C[1], C[2]]);
                var S = b.concat(M);
                S.length && S.push(["Z"]);
                var w = r.call(this, p, !1, m);
                return S.xMap = b.xMap, this.areaPath = S, w
            }, e.prototype.getStackPoints = function (t) {
                var e = this, i = [], o = [], r = this.xAxis, s = this.yAxis, n = s.stacking.stacks[this.stackKey],
                    a = {}, h = s.series, p = h.length, d = s.options.reversedStacks ? 1 : -1, u = h.indexOf(e);
                if (t = t || this.points, this.options.stacking) {
                    for (var f = 0; f < t.length; f++) t[f].leftNull = t[f].rightNull = void 0, a[t[f].x] = t[f];
                    l(n, function (t, e) {
                        null !== t.total && o.push(e)
                    }), o.sort(function (t, e) {
                        return t - e
                    });
                    var g = h.map(function (t) {
                        return t.visible
                    });
                    o.forEach(function (t, l) {
                        var f, m, y = 0;
                        if (a[t] && !a[t].isNull) i.push(a[t]), [-1, 1].forEach(function (i) {
                            var r = 1 === i ? "rightNull" : "leftNull", s = n[o[l + i]], c = 0;
                            if (s) for (var y = u; y >= 0 && y < p;) {
                                var v = h[y].index;
                                !(f = s.points[v]) && (v === e.index ? a[t][r] = !0 : g[y] && (m = n[t].points[v]) && (c -= m[1] - m[0])), y += d
                            }
                            a[t][1 === i ? "rightCliff" : "leftCliff"] = c
                        }); else {
                            for (var v = u; v >= 0 && v < p;) {
                                var x = h[v].index;
                                if (f = n[t].points[x]) {
                                    y = f[1];
                                    break
                                }
                                v += d
                            }
                            y = c(y, 0), y = s.translate(y, 0, 1, 0, 1), i.push({
                                isNull: !0,
                                plotX: r.translate(t, 0, 0, 0, 1),
                                x: t,
                                plotY: y,
                                yBottom: y
                            })
                        }
                    })
                }
                return i
            }, e.defaultOptions = h(n.defaultOptions, {threshold: 0, legendSymbol: "areaMarker"}), e
        }(n);
        return a(p.prototype, {singleStacks: !1}), e.registerSeriesType("area", p), p
    }), i(e, "Series/Spline/SplineSeries.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = this && this.__extends || (i = function (t, e) {
            return (i = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function o() {
                this.constructor = t
            }

            i(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
        }), r = t.seriesTypes.line, s = e.merge, n = e.pick, a = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return o(e, t), e.prototype.getPointSpline = function (t, e, i) {
                var o, r, s, a, h = e.plotX || 0, l = e.plotY || 0, c = t[i - 1], p = t[i + 1];

                function d(t) {
                    return t && !t.isNull && !1 !== t.doCurve && !e.isCliff
                }

                if (d(c) && d(p)) {
                    var u = c.plotX || 0, f = c.plotY || 0, g = p.plotX || 0, m = p.plotY || 0, y = 0;
                    o = (1.5 * h + u) / 2.5, r = (1.5 * l + f) / 2.5, s = (1.5 * h + g) / 2.5, a = (1.5 * l + m) / 2.5, s !== o && (y = (a - r) * (s - h) / (s - o) + l - a), r += y, a += y, r > f && r > l ? (r = Math.max(f, l), a = 2 * l - r) : r < f && r < l && (r = Math.min(f, l), a = 2 * l - r), a > m && a > l ? (a = Math.max(m, l), r = 2 * l - a) : a < m && a < l && (a = Math.min(m, l), r = 2 * l - a), e.rightContX = s, e.rightContY = a, e.controlPoints = {
                        low: [o, r],
                        high: [s, a]
                    }
                }
                var v = ["C", n(c.rightContX, c.plotX, 0), n(c.rightContY, c.plotY, 0), n(o, h, 0), n(r, l, 0), h, l];
                return c.rightContX = c.rightContY = void 0, v
            }, e.defaultOptions = s(r.defaultOptions), e
        }(r);
        return t.registerSeriesType("spline", a), a
    }), i(e, "Series/AreaSpline/AreaSplineSeries.js", [e["Series/Spline/SplineSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
            return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), s = e.seriesTypes, n = s.area, a = s.area.prototype, h = i.extend, l = i.merge, c = function (e) {
            function i() {
                return null !== e && e.apply(this, arguments) || this
            }

            return r(i, e), i.defaultOptions = l(t.defaultOptions, n.defaultOptions), i
        }(t);
        return h(c.prototype, {
            getGraphPath: a.getGraphPath,
            getStackPoints: a.getStackPoints,
            drawGraph: a.drawGraph
        }), e.registerSeriesType("areaspline", c), c
    }), i(e, "Series/Column/ColumnSeriesDefaults.js", [], function () {
        return {
            borderRadius: 3,
            centerInCategory: !1,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {hover: {halo: !1, brightness: .1}, select: {color: "#cccccc", borderColor: "#000000"}},
            dataLabels: {align: void 0, verticalAlign: void 0, y: void 0},
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0,
            borderColor: "#ffffff"
        }
    }), i(e, "Series/Column/ColumnSeries.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Color/Color.js"], e["Series/Column/ColumnSeriesDefaults.js"], e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s, n) {
        var a, h = this && this.__extends || (a = function (t, e) {
                return (a = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                a(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), l = t.animObject, c = e.parse, p = o.hasTouch, d = o.noop, u = n.clamp, f = n.defined, g = n.extend,
            m = n.fireEvent, y = n.isArray, v = n.isNumber, x = n.merge, b = n.pick, M = n.objectEach;
        n.relativeLength;
        var C = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return h(e, t), e.prototype.animate = function (t) {
                var e, i, o = this, r = this.yAxis, s = r.pos, n = o.options, a = this.chart.inverted, h = {},
                    c = a ? "translateX" : "translateY";
                t ? (h.scaleY = .001, i = u(r.toPixels(n.threshold), s, s + r.len), a ? h.translateX = i - r.len : h.translateY = i, o.clipBox && o.setClip(), o.group.attr(h)) : (e = Number(o.group.attr(c)), o.group.animate({scaleY: 1}, g(l(o.options.animation), {
                    step: function (t, i) {
                        o.group && (h[c] = e + i.pos * (s - e), o.group.attr(h))
                    }
                })))
            }, e.prototype.init = function (e, i) {
                t.prototype.init.apply(this, arguments);
                var o = this;
                (e = o.chart).hasRendered && e.series.forEach(function (t) {
                    t.type === o.type && (t.isDirty = !0)
                })
            }, e.prototype.getColumnMetrics = function () {
                var t, e, i, o = this, r = o.options, s = o.xAxis, n = o.yAxis, a = s.options.reversedStacks,
                    h = s.reversed && !a || !s.reversed && a, l = {}, c = 0;
                !1 === r.grouping ? c = 1 : o.chart.series.forEach(function (t) {
                    var e, r = t.yAxis, s = t.options;
                    t.type === o.type && t.reserveSpace() && n.len === r.len && n.pos === r.pos && (s.stacking && "group" !== s.stacking ? (void 0 === l[i = t.stackKey] && (l[i] = c++), e = l[i]) : !1 !== s.grouping && (e = c++), t.columnIndex = e)
                });
                var p = Math.min(Math.abs(s.transA) * (!(null === (t = s.brokenAxis) || void 0 === t ? void 0 : t.hasBreaks) && (null === (e = s.ordinal) || void 0 === e ? void 0 : e.slope) || r.pointRange || s.closestPointRange || s.tickInterval || 1), s.len),
                    d = p * r.groupPadding, u = (p - 2 * d) / (c || 1),
                    f = Math.min(r.maxPointWidth || s.len, b(r.pointWidth, u * (1 - 2 * r.pointPadding))),
                    g = (u - f) / 2 + (d + ((o.columnIndex || 0) + (h ? 1 : 0)) * u - p / 2) * (h ? -1 : 1);
                return o.columnMetrics = {width: f, offset: g, paddedWidth: u, columnCount: c}, o.columnMetrics
            }, e.prototype.crispCol = function (t, e, i, o) {
                this.chart;
                var r = this.borderWidth, s = -(r % 2 ? .5 : 0), n = r % 2 ? .5 : 1;
                this.options.crisp && (i = Math.round(t + i) + s - (t = Math.round(t) + s));
                var a = Math.round(e + o) + n, h = .5 >= Math.abs(e) && a > .5;
                return o = a - (e = Math.round(e) + n), h && o && (e -= 1, o += 1), {x: t, y: e, width: i, height: o}
            }, e.prototype.adjustForMissingColumns = function (t, e, i, o) {
                var r, s = this;
                if (!i.isNull && o.columnCount > 1) {
                    var n = this.xAxis.series.filter(function (t) {
                        return t.visible
                    }).map(function (t) {
                        return t.index
                    }), a = 0, h = 0;
                    M(null === (r = this.xAxis.stacking) || void 0 === r ? void 0 : r.stacks, function (t) {
                        if ("number" == typeof i.x) {
                            var e = t[i.x.toString()];
                            if (e && y(e.points[s.index])) {
                                var o = Object.keys(e.points).filter(function (t) {
                                    return !t.match(",") && e.points[t] && e.points[t].length > 1
                                }).map(parseFloat).filter(function (t) {
                                    return -1 !== n.indexOf(t)
                                }).sort(function (t, e) {
                                    return e - t
                                });
                                a = o.indexOf(s.index), h = o.length
                            }
                        }
                    });
                    var l = (h - 1) * o.paddedWidth + e;
                    t = (i.plotX || 0) + l / 2 - e - a * o.paddedWidth
                }
                return t
            }, e.prototype.translate = function () {
                var t = this, e = t.chart, i = t.options, o = t.dense = t.closestPointRange * t.xAxis.transA < 2,
                    s = t.borderWidth = b(i.borderWidth, o ? 0 : 1), n = t.xAxis, a = t.yAxis, h = i.threshold,
                    l = b(i.minPointLength, 5), c = t.getColumnMetrics(), p = c.width, d = t.pointXOffset = c.offset,
                    g = t.dataMin, y = t.dataMax, x = t.barW = Math.max(p, 1 + 2 * s),
                    M = t.translatedThreshold = a.getThreshold(h);
                e.inverted && (M -= .5), i.pointPadding && (x = Math.ceil(x)), r.prototype.translate.apply(t), t.points.forEach(function (o) {
                    var r = b(o.yBottom, M), s = 999 + Math.abs(r), m = o.plotX || 0, C = u(o.plotY, -s, a.len + s);
                    o.stackBox;
                    var S, w = Math.min(C, r), k = Math.max(C, r) - w, A = p, T = m + d, P = x;
                    l && Math.abs(k) < l && (k = l, S = !a.reversed && !o.negative || a.reversed && o.negative, v(h) && v(y) && o.y === h && y <= h && (a.min || 0) < h && (g !== y || (a.max || 0) <= h) && (S = !S, o.negative = !o.negative), w = Math.abs(w - M) > l ? r - l : M - (S ? l : 0)), f(o.options.pointWidth) && (T -= Math.round(((A = P = Math.ceil(o.options.pointWidth)) - p) / 2)), i.centerInCategory && !i.stacking && (T = t.adjustForMissingColumns(T, A, o, c)), o.barX = T, o.pointWidth = A, o.tooltipPos = e.inverted ? [u(a.len + a.pos - e.plotLeft - C, a.pos - e.plotLeft, a.len + a.pos - e.plotLeft), n.len + n.pos - e.plotTop - T - P / 2, k] : [n.left - e.plotLeft + T + P / 2, u(C + a.pos - e.plotTop, a.pos - e.plotTop, a.len + a.pos - e.plotTop), k], o.shapeType = t.pointClass.prototype.shapeType || "roundedRect", o.shapeArgs = t.crispCol(T, o.isNull ? M : w, P, o.isNull ? 0 : k)
                }), m(this, "afterColumnTranslate")
            }, e.prototype.drawGraph = function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            }, e.prototype.pointAttribs = function (t, e) {
                var i, o, r, s = this.options, n = this.pointAttrToOptions || {}, a = n.stroke || "borderColor",
                    h = n["stroke-width"] || "borderWidth", l = t && t.color || this.color, p = t && t[a] || s[a] || l,
                    d = t && t.options.dashStyle || s.dashStyle, u = t && t[h] || s[h] || this[h] || 0,
                    f = b(t && t.opacity, s.opacity, 1);
                t && this.zones.length && (o = t.getZone(), l = t.options.color || o && (o.color || t.nonZonedColor) || this.color, o && (p = o.borderColor || p, d = o.dashStyle || d, u = o.borderWidth || u)), e && t && (r = (i = x(s.states[e], t.options.states && t.options.states[e] || {})).brightness, l = i.color || void 0 !== r && c(l).brighten(i.brightness).get() || l, p = i[a] || p, u = i[h] || u, d = i.dashStyle || d, f = b(i.opacity, f));
                var g = {fill: l, stroke: p, "stroke-width": u, opacity: f};
                return d && (g.dashstyle = d), g
            }, e.prototype.drawPoints = function (t) {
                void 0 === t && (t = this.points);
                var e, i = this, o = this.chart, r = i.options, s = o.renderer, n = r.animationLimit || 250;
                t.forEach(function (t) {
                    var a = t.plotY, h = t.graphic, l = !!h, c = h && o.pointCount < n ? "animate" : "attr";
                    v(a) && null !== t.y ? (e = t.shapeArgs, h && t.hasNewShapeType() && (h = h.destroy()), i.enabledDataSorting && (t.startXPos = i.xAxis.reversed ? -(e && e.width || 0) : i.xAxis.width), !h && (t.graphic = h = s[t.shapeType](e).add(t.group || i.group), h && i.enabledDataSorting && o.hasRendered && o.pointCount < n && (h.attr({x: t.startXPos}), l = !0, c = "animate")), h && l && h[c](x(e)), o.styledMode || h[c](i.pointAttribs(t, t.selected && "select")).shadow(!1 !== t.allowShadow && r.shadow), h && (h.addClass(t.getClassName(), !0), h.attr({visibility: t.visible ? "inherit" : "hidden"}))) : h && (t.graphic = h.destroy())
                })
            }, e.prototype.drawTracker = function (t) {
                void 0 === t && (t = this.points);
                var e, i = this, o = i.chart, r = o.pointer, s = function (t) {
                    var e = r.getPointFromEvent(t);
                    void 0 !== e && i.options.enableMouseTracking && (r.isDirectTouch = !0, e.onMouseOver(t))
                };
                t.forEach(function (t) {
                    e = y(t.dataLabels) ? t.dataLabels : t.dataLabel ? [t.dataLabel] : [], t.graphic && (t.graphic.element.point = t), e.forEach(function (e) {
                        e.div ? e.div.point = t : e.element.point = t
                    })
                }), i._hasTracking || (i.trackerGroups.forEach(function (t) {
                    i[t] && (i[t].addClass("highcharts-tracker").on("mouseover", s).on("mouseout", function (t) {
                        r.onTrackerMouseOut(t)
                    }), p && i[t].on("touchstart", s), !o.styledMode && i.options.cursor && i[t].css({cursor: i.options.cursor}))
                }), i._hasTracking = !0), m(this, "afterDrawTracker")
            }, e.prototype.remove = function () {
                var t = this, e = t.chart;
                e.hasRendered && e.series.forEach(function (e) {
                    e.type === t.type && (e.isDirty = !0)
                }), r.prototype.remove.apply(t, arguments)
            }, e.defaultOptions = x(r.defaultOptions, i), e
        }(r);
        return g(C.prototype, {
            directTouch: !0,
            getSymbol: d,
            negStacks: !0,
            trackerGroups: ["group", "dataLabelsGroup"]
        }), s.registerSeriesType("column", C), C
    }), i(e, "Core/Series/DataLabel.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r, s = t.getDeferredAnimation, n = e.format, a = i.composed, h = o.defined, l = o.extend, c = o.fireEvent,
            p = o.isArray, d = o.isString, u = o.merge, f = o.objectEach, g = o.pick, m = o.pInt, y = o.pushUnique,
            v = o.splat;
        return function (t) {
            function e() {
                return C(this).some(function (t) {
                    return null == t ? void 0 : t.enabled
                })
            }

            function i(t, e, i, o, r) {
                var s, n, a, c = this, p = this.chart, d = this.isCartesian && p.inverted, u = this.enabledDataSorting,
                    f = t.plotX, m = t.plotY, y = i.rotation, v = i.align,
                    x = h(f) && h(m) && p.isInsidePlot(f, Math.round(m), {inverted: d, paneCoordinates: !0, series: c}),
                    b = function (i) {
                        u && c.xAxis && !M && c.setDataLabelStartPos(t, e, r, x, i)
                    }, M = "justify" === g(i.overflow, u ? "none" : "justify"),
                    C = this.visible && !1 !== t.visible && h(f) && (t.series.forceDL || u && !M || x || g(i.inside, !!this.options.stacking) && o && p.isInsidePlot(f, d ? o.x + 1 : o.y + o.height - 1, {
                        inverted: d,
                        paneCoordinates: !0,
                        series: c
                    })), S = t.pos();
                if (C && S) {
                    y && e.attr({align: v});
                    var w = e.getBBox(!0), k = [0, 0];
                    if (s = p.renderer.fontMetrics(e).b, o = l({
                        x: S[0],
                        y: Math.round(S[1]),
                        width: 0,
                        height: 0
                    }, o), l(i, {
                        width: w.width,
                        height: w.height
                    }), y ? (M = !1, n = p.renderer.rotCorr(s, y), a = {
                        x: o.x + (i.x || 0) + o.width / 2 + n.x,
                        y: o.y + (i.y || 0) + ({top: 0, middle: .5, bottom: 1})[i.verticalAlign] * o.height
                    }, k = [w.x - Number(e.attr("x")), w.y - Number(e.attr("y"))], b(a), e[r ? "attr" : "animate"](a)) : (b(o), e.align(i, void 0, o), a = e.alignAttr), M && o.height >= 0) this.justifyDataLabel(e, i, a, w, o, r); else if (g(i.crop, !0)) {
                        var A = a.x, T = a.y;
                        A += k[0], T += k[1], C = p.isInsidePlot(A, T, {
                            paneCoordinates: !0,
                            series: c
                        }) && p.isInsidePlot(A + w.width, T + w.height, {paneCoordinates: !0, series: c})
                    }
                    i.shape && !y && e[r ? "attr" : "animate"]({anchorX: S[0], anchorY: S[1]})
                }
                r && u && (e.placed = !1), C || u && !M ? e.show() : (e.hide(), e.placed = !1)
            }

            function o() {
                return this.plotGroup("dataLabelsGroup", "data-labels", this.hasRendered ? "inherit" : "hidden", this.options.dataLabels.zIndex || 6)
            }

            function r(t) {
                var e = this.hasRendered || 0, i = this.initDataLabelsGroup().attr({opacity: +e});
                return !e && i && (this.visible && i.show(), this.options.animation ? i.animate({opacity: 1}, t) : i.attr({opacity: 1})), i
            }

            function x(t) {
                t = t || this.points;
                var e, i, o = this, r = o.chart, a = o.options, l = r.renderer, p = r.options.chart,
                    u = p.backgroundColor, y = p.plotBackgroundColor,
                    x = l.getContrast(d(y) && y || d(u) && u || "#000000"), b = C(o), S = b[0], w = S.animation,
                    k = S.defer ? s(r, w, o) : {defer: 0, duration: 0};
                c(this, "drawDataLabels"), (null === (e = o.hasDataLabels) || void 0 === e ? void 0 : e.call(o)) && (i = this.initDataLabels(k), t.forEach(function (t) {
                    var e, s, c = t.dataLabels || [];
                    v(M(b, t.dlOptions || (null === (e = t.options) || void 0 === e ? void 0 : e.dataLabels))).forEach(function (e, s) {
                        var p, u, y, v, b, M,
                            C = e.enabled && t.visible && (!t.isNull || t.dataLabelOnNull) && function (t, e) {
                                var i = e.filter;
                                if (i) {
                                    var o = i.operator, r = t[i.property], s = i.value;
                                    return ">" === o && r > s || "<" === o && r < s || ">=" === o && r >= s || "<=" === o && r <= s || "==" === o && r == s || "===" === o && r === s || "!=" === o && r != s || "!==" === o && r !== s
                                }
                                return !0
                            }(t, e), S = e.backgroundColor, w = e.borderColor, k = e.distance, A = e.style,
                            T = void 0 === A ? {} : A, P = {}, L = c[s], j = !L;
                        if (C && (y = g(e[t.formatPrefix + "Format"], e.format), u = t.getLabelConfig(), v = h(y) ? n(y, u, r) : (e[t.formatPrefix + "Formatter"] || e.formatter).call(u, e), b = e.rotation, !r.styledMode && (T.color = g(e.color, T.color, d(o.color) ? o.color : void 0, "#000000"), "contrast" === T.color ? ("none" !== S && (M = S), t.contrastColor = l.getContrast("auto" !== M && M || t.color || o.color), T.color = M || !h(k) && e.inside || 0 > m(k || 0) || a.stacking ? t.contrastColor : x) : delete t.contrastColor, a.cursor && (T.cursor = a.cursor)), P = {
                            r: e.borderRadius || 0,
                            rotation: b,
                            padding: e.padding,
                            zIndex: 1
                        }, r.styledMode || (P.fill = "auto" === S ? t.color : S, P.stroke = "auto" === w ? t.color : w, P["stroke-width"] = e.borderWidth), f(P, function (t, e) {
                            void 0 === t && delete P[e]
                        })), !L || C && h(v) && !!L.div == !!e.useHTML && (L.rotation && e.rotation || L.rotation === e.rotation) || (L = void 0, j = !0), C && h(v) && (L ? P.text = v : (L = b ? l.text(v, 0, 0, e.useHTML).addClass("highcharts-data-label") : l.label(v, 0, 0, e.shape, void 0, void 0, e.useHTML, void 0, "data-label")) && L.addClass(" highcharts-data-label-color-" + t.colorIndex + " " + (e.className || "") + (e.useHTML ? " highcharts-tracker" : "")), L)) {
                            L.options = e, L.attr(P), r.styledMode || L.css(T).shadow(e.shadow);
                            var O = e[t.formatPrefix + "TextPath"] || e.textPath;
                            O && !e.useHTML && (L.setTextPath((null === (p = t.getDataLabelPath) || void 0 === p ? void 0 : p.call(t, L)) || t.graphic, O), t.dataLabelPath && !O.enabled && (t.dataLabelPath = t.dataLabelPath.destroy())), L.added || L.add(i), o.alignDataLabel(t, L, e, void 0, j), L.isActive = !0, c[s] && c[s] !== L && c[s].destroy(), c[s] = L
                        }
                    });
                    for (var p = c.length; p--;) c[p] && c[p].isActive ? c[p].isActive = !1 : (null === (s = c[p]) || void 0 === s || s.destroy(), c.splice(p, 1));
                    t.dataLabel = c[0], t.dataLabels = c
                })), c(this, "afterDrawDataLabels")
            }

            function b(t, e, i, o, r, s) {
                var n, a, h = this.chart, l = e.align, c = e.verticalAlign, p = t.box ? 0 : t.padding || 0, d = e.x,
                    u = void 0 === d ? 0 : d, f = e.y, g = void 0 === f ? 0 : f;
                return (n = (i.x || 0) + p) < 0 && ("right" === l && u >= 0 ? (e.align = "left", e.inside = !0) : u -= n, a = !0), (n = (i.x || 0) + o.width - p) > h.plotWidth && ("left" === l && u <= 0 ? (e.align = "right", e.inside = !0) : u += h.plotWidth - n, a = !0), (n = i.y + p) < 0 && ("bottom" === c && g >= 0 ? (e.verticalAlign = "top", e.inside = !0) : g -= n, a = !0), (n = (i.y || 0) + o.height - p) > h.plotHeight && ("top" === c && g <= 0 ? (e.verticalAlign = "bottom", e.inside = !0) : g += h.plotHeight - n, a = !0), a && (e.x = u, e.y = g, t.placed = !s, t.align(e, void 0, r)), a
            }

            function M(t, e) {
                var i, o = [];
                if (p(t) && !p(e)) o = t.map(function (t) {
                    return u(t, e)
                }); else if (p(e) && !p(t)) o = e.map(function (e) {
                    return u(t, e)
                }); else if (p(t) || p(e)) {
                    if (p(t) && p(e)) for (i = Math.max(t.length, e.length); i--;) o[i] = u(t[i], e[i])
                } else o = u(t, e);
                return o
            }

            function C(t) {
                var e, i, o = t.chart.options.plotOptions;
                return v(M(M(null === (e = null == o ? void 0 : o.series) || void 0 === e ? void 0 : e.dataLabels, null === (i = null == o ? void 0 : o[t.type]) || void 0 === i ? void 0 : i.dataLabels), t.options.dataLabels))
            }

            function S(t, e, i, o, r) {
                var s = this.chart, n = s.inverted, a = this.xAxis, h = a.reversed,
                    l = ((n ? e.height : e.width) || 0) / 2, c = t.pointWidth, p = c ? c / 2 : 0;
                e.startXPos = n ? r.x : h ? -l - p : a.width - l + p, e.startYPos = n ? h ? this.yAxis.height - l + p : -l - p : r.y, o ? "hidden" === e.visibility && (e.show(), e.attr({opacity: 0}).animate({opacity: 1})) : e.attr({opacity: 1}).animate({opacity: 0}, void 0, e.hide), s.hasRendered && (i && e.attr({
                    x: e.startXPos,
                    y: e.startYPos
                }), e.placed = !0)
            }

            t.compose = function t(s) {
                if (y(a, t)) {
                    var n = s.prototype;
                    n.initDataLabelsGroup = o, n.initDataLabels = r, n.alignDataLabel = i, n.drawDataLabels = x, n.justifyDataLabel = b, n.setDataLabelStartPos = S, n.hasDataLabels = e
                }
            }
        }(r || (r = {})), r
    }), i(e, "Series/Column/ColumnDataLabel.js", [e["Core/Series/DataLabel.js"], e["Core/Globals.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r, s = e.composed, n = i.series, a = o.merge, h = o.pick, l = o.pushUnique;
        return function (e) {
            function i(t, e, i, o, r) {
                var s = this.chart.inverted, l = t.series, c = (l.xAxis ? l.xAxis.len : this.chart.plotSizeX) || 0,
                    p = (l.yAxis ? l.yAxis.len : this.chart.plotSizeY) || 0, d = t.dlBox || t.shapeArgs,
                    u = h(t.below, t.plotY > h(this.translatedThreshold, p)), f = h(i.inside, !!this.options.stacking);
                if (d) {
                    if (o = a(d), !("allow" === i.overflow && !1 === i.crop)) {
                        o.y < 0 && (o.height += o.y, o.y = 0);
                        var g = o.y + o.height - p;
                        g > 0 && g < o.height && (o.height -= g)
                    }
                    s && (o = {
                        x: p - o.y - o.height,
                        y: c - o.x - o.width,
                        width: o.height,
                        height: o.width
                    }), f || (s ? (o.x += u ? 0 : o.width, o.width = 0) : (o.y += u ? o.height : 0, o.height = 0))
                }
                i.align = h(i.align, !s || f ? "center" : u ? "right" : "left"), i.verticalAlign = h(i.verticalAlign, s || f ? "middle" : u ? "top" : "bottom"), n.prototype.alignDataLabel.call(this, t, e, i, o, r), i.inside && t.contrastColor && e.css({color: t.contrastColor})
            }

            e.compose = function e(o) {
                t.compose(n), l(s, e) && (o.prototype.alignDataLabel = i)
            }
        }(r || (r = {})), r
    }), i(e, "Series/Bar/BarSeries.js", [e["Series/Column/ColumnSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
            return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), s = i.extend, n = i.merge, a = function (e) {
            function i() {
                return null !== e && e.apply(this, arguments) || this
            }

            return r(i, e), i.defaultOptions = n(t.defaultOptions, {}), i
        }(t);
        return s(a.prototype, {inverted: !0}), e.registerSeriesType("bar", a), a
    }), i(e, "Series/Scatter/ScatterSeriesDefaults.js", [], function () {
        return {
            lineWidth: 0,
            findNearestPointBy: "xy",
            jitter: {x: 0, y: 0},
            marker: {enabled: !0},
            tooltip: {
                headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.8em"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }
    }), i(e, "Series/Scatter/ScatterSeries.js", [e["Series/Scatter/ScatterSeriesDefaults.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
            return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), s = e.seriesTypes, n = s.column, a = s.line, h = i.addEvent, l = i.extend, c = i.merge, p = function (e) {
            function i() {
                return null !== e && e.apply(this, arguments) || this
            }

            return r(i, e), i.prototype.applyJitter = function () {
                var t = this, e = this.options.jitter, i = this.points.length;
                e && this.points.forEach(function (o, r) {
                    ["x", "y"].forEach(function (s, n) {
                        var a, h, l, c, p, d = "plot" + s.toUpperCase();
                        e[s] && !o.isNull && (h = t[s + "Axis"], p = e[s] * h.transA, h && !h.isLog) && (l = Math.max(0, o[d] - p), c = Math.min(h.len, o[d] + p), o[d] = l + (c - l) * ((a = 1e4 * Math.sin(r + n * i)) - Math.floor(a)), "x" === s && (o.clientX = o.plotX))
                    })
                })
            }, i.prototype.drawGraph = function () {
                this.options.lineWidth ? e.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy())
            }, i.defaultOptions = c(a.defaultOptions, t), i
        }(a);
        return l(p.prototype, {
            drawTracker: n.prototype.drawTracker,
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"]
        }), h(p, "afterTranslate", function () {
            this.applyJitter()
        }), e.registerSeriesType("scatter", p), p
    }), i(e, "Series/CenteredUtilities.js", [e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r, s = t.deg2rad, n = i.fireEvent, a = i.isNumber, h = i.pick, l = i.relativeLength;
        return (o = r || (r = {})).getCenter = function () {
            var t, i, o, r = this.options, s = this.chart, c = 2 * (r.slicedOffset || 0), p = s.plotWidth - 2 * c,
                d = s.plotHeight - 2 * c, u = r.center, f = Math.min(p, d), g = r.thickness, m = r.size,
                y = r.innerSize || 0;
            "string" == typeof m && (m = parseFloat(m)), "string" == typeof y && (y = parseFloat(y));
            var v = [h(u[0], "50%"), h(u[1], "50%"), h(m && m < 0 ? void 0 : r.size, "100%"), h(y && y < 0 ? void 0 : r.innerSize || 0, "0%")];
            for (!s.angular || this instanceof e || (v[3] = 0), i = 0; i < 4; ++i) o = v[i], t = i < 2 || 2 === i && /%$/.test(o), v[i] = l(o, [p, d, f, v[2]][i]) + (t ? c : 0);
            return v[3] > v[2] && (v[3] = v[2]), a(g) && 2 * g < v[2] && g > 0 && (v[3] = v[2] - 2 * g), n(this, "afterGetCenter", {positions: v}), v
        }, o.getStartAndEndRadians = function (t, e) {
            var i = a(t) ? t : 0, o = a(e) && e > i && e - i < 360 ? e : i + 360;
            return {start: s * (i + -90), end: s * (o + -90)}
        }, r
    }), i(e, "Series/Pie/PiePoint.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
                return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), s = this && this.__assign || function () {
                return (s = Object.assign || function (t) {
                    for (var e, i = 1, o = arguments.length; i < o; i++) for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                    return t
                }).apply(this, arguments)
            }, n = t.setAnimation, a = i.addEvent, h = i.defined, l = i.extend, c = i.isNumber, p = (i.isString, i.pick),
            d = i.relativeLength, u = function (t) {
                function e(e, i, o) {
                    var r, s = this;
                    (s = t.call(this, e, i, o) || this).half = 0, null !== (r = s.name) && void 0 !== r || (s.name = "Slice");
                    var n = function (t) {
                        s.slice("select" === t.type)
                    };
                    return a(s, "select", n), a(s, "unselect", n), s
                }

                return r(e, t), e.prototype.getConnectorPath = function (t) {
                    var e = t.dataLabelPosition, i = t.options || {}, o = i.connectorShape,
                        r = this.connectorShapes[o] || o;
                    return e && r.call(this, s(s({}, e.computed), {alignment: e.alignment}), e.connectorPosition, i) || []
                }, e.prototype.getTranslate = function () {
                    return this.sliced && this.slicedTranslation || {translateX: 0, translateY: 0}
                }, e.prototype.haloPath = function (t) {
                    var e = this.shapeArgs;
                    return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + t, e.r + t, {
                        innerR: e.r - 1,
                        start: e.start,
                        end: e.end,
                        borderRadius: e.borderRadius
                    })
                }, e.prototype.isValid = function () {
                    return c(this.y) && this.y >= 0
                }, e.prototype.setVisible = function (t, e) {
                    void 0 === e && (e = !0), t !== this.visible && this.update({visible: null != t ? t : !this.visible}, e, void 0, !1)
                }, e.prototype.slice = function (t, e, i) {
                    var o = this.series;
                    n(i, o.chart), e = p(e, !0), this.sliced = this.options.sliced = t = h(t) ? t : !this.sliced, o.options.data[o.data.indexOf(this)] = this.options, this.graphic && this.graphic.animate(this.getTranslate())
                }, e
            }(e);
        return l(u.prototype, {
            connectorShapes: {
                fixedOffset: function (t, e, i) {
                    var o = e.breakAt, r = e.touchingSliceAt,
                        s = i.softConnector ? ["C", t.x + ("left" === t.alignment ? -5 : 5), t.y, 2 * o.x - r.x, 2 * o.y - r.y, o.x, o.y] : ["L", o.x, o.y];
                    return [["M", t.x, t.y], s, ["L", r.x, r.y]]
                }, straight: function (t, e) {
                    var i = e.touchingSliceAt;
                    return [["M", t.x, t.y], ["L", i.x, i.y]]
                }, crookedLine: function (t, e, i) {
                    var o = e.breakAt, r = e.touchingSliceAt, s = this.series, n = s.center, a = n[0], h = n[1],
                        l = n[2] / 2, c = s.chart, p = c.plotLeft, u = c.plotWidth, f = "left" === t.alignment, g = t.x,
                        m = t.y, y = o.x;
                    if (i.crookDistance) {
                        var v = d(i.crookDistance, 1);
                        y = f ? a + l + (u + p - a - l) * (1 - v) : p + (a - l) * v
                    } else y = a + (h - m) * Math.tan((this.angle || 0) - Math.PI / 2);
                    var x = [["M", g, m]];
                    return (f ? y <= g && y >= o.x : y >= g && y <= o.x) && x.push(["L", y, m]), x.push(["L", o.x, o.y], ["L", r.x, r.y]), x
                }
            }
        }), u
    }), i(e, "Series/Pie/PieSeriesDefaults.js", [], function () {
        return {
            borderRadius: 3,
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                connectorPadding: 5,
                connectorShape: "crookedLine",
                crookDistance: void 0,
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                },
                softConnector: !0,
                x: 0
            },
            fillColor: void 0,
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {followPointer: !0},
            borderColor: "#ffffff",
            borderWidth: 1,
            lineWidth: void 0,
            states: {hover: {brightness: .1}}
        }
    }), i(e, "Series/Pie/PieSeries.js", [e["Series/CenteredUtilities.js"], e["Series/Column/ColumnSeries.js"], e["Core/Globals.js"], e["Series/Pie/PiePoint.js"], e["Series/Pie/PieSeriesDefaults.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/Symbols.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s, n, a, h) {
        var l, c = this && this.__extends || (l = function (t, e) {
                return (l = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                l(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), p = t.getStartAndEndRadians, d = i.noop, u = h.clamp, f = h.extend, g = h.fireEvent, m = h.merge,
            y = h.pick;
        h.relativeLength, h.splat;
        var v = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return c(e, t), e.prototype.animate = function (t) {
                var e = this, i = e.points, o = e.startAngleRad;
                t || i.forEach(function (t) {
                    var i = t.graphic, r = t.shapeArgs;
                    i && r && (i.attr({
                        r: y(t.startR, e.center && e.center[3] / 2),
                        start: o,
                        end: o
                    }), i.animate({r: r.r, start: r.start, end: r.end}, e.options.animation))
                })
            }, e.prototype.drawEmpty = function () {
                var t, e, i = this.startAngleRad, o = this.endAngleRad, r = this.options;
                0 === this.total && this.center ? (t = this.center[0], e = this.center[1], this.graph || (this.graph = this.chart.renderer.arc(t, e, this.center[1] / 2, 0, i, o).addClass("highcharts-empty-series").add(this.group)), this.graph.attr({
                    d: a.arc(t, e, this.center[2] / 2, 0, {
                        start: i,
                        end: o,
                        innerR: this.center[3] / 2
                    })
                }), this.chart.styledMode || this.graph.attr({
                    "stroke-width": r.borderWidth,
                    fill: r.fillColor || "none",
                    stroke: r.color || "#cccccc"
                })) : this.graph && (this.graph = this.graph.destroy())
            }, e.prototype.drawPoints = function () {
                var t = this.chart.renderer;
                this.points.forEach(function (e) {
                    e.graphic && e.hasNewShapeType() && (e.graphic = e.graphic.destroy()), e.graphic || (e.graphic = t[e.shapeType](e.shapeArgs).add(e.series.group), e.delayedRendering = !0)
                })
            }, e.prototype.generatePoints = function () {
                t.prototype.generatePoints.call(this), this.updateTotals()
            }, e.prototype.getX = function (t, e, i, o) {
                var r = this.center, s = this.radii ? this.radii[i.index] || 0 : r[2] / 2, n = o.dataLabelPosition,
                    a = (null == n ? void 0 : n.distance) || 0, h = Math.asin(u((t - r[1]) / (s + a), -1, 1));
                return r[0] + (e ? -1 : 1) * (Math.cos(h) * (s + a)) + (a > 0 ? (e ? -1 : 1) * (o.padding || 0) : 0)
            }, e.prototype.hasData = function () {
                return !!this.processedXData.length
            }, e.prototype.redrawPoints = function () {
                var t, e, i, o, r = this, s = r.chart;
                this.drawEmpty(), r.group && !s.styledMode && r.group.shadow(r.options.shadow), r.points.forEach(function (n) {
                    var a = {};
                    e = n.graphic, !n.isNull && e ? (o = n.shapeArgs, t = n.getTranslate(), s.styledMode || (i = r.pointAttribs(n, n.selected && "select")), n.delayedRendering ? (e.setRadialReference(r.center).attr(o).attr(t), s.styledMode || e.attr(i).attr({"stroke-linejoin": "round"}), n.delayedRendering = !1) : (e.setRadialReference(r.center), s.styledMode || m(!0, a, i), m(!0, a, o, t), e.animate(a)), e.attr({visibility: n.visible ? "inherit" : "hidden"}), e.addClass(n.getClassName(), !0)) : e && (n.graphic = e.destroy())
                })
            }, e.prototype.sortByAngle = function (t, e) {
                t.sort(function (t, i) {
                    return void 0 !== t.angle && (i.angle - t.angle) * e
                })
            }, e.prototype.translate = function (t) {
                g(this, "translate"), this.generatePoints();
                var e, i, o, r, s, n, a, h = this.options, l = h.slicedOffset, c = p(h.startAngle, h.endAngle),
                    d = this.startAngleRad = c.start, u = (this.endAngleRad = c.end) - d, f = this.points,
                    m = h.ignoreHiddenPoint, y = f.length, v = 0;
                for (t || (this.center = t = this.getCenter()), n = 0; n < y; n++) {
                    a = f[n], e = d + v * u, a.isValid() && (!m || a.visible) && (v += a.percentage / 100), i = d + v * u;
                    var x = {
                        x: t[0],
                        y: t[1],
                        r: t[2] / 2,
                        innerR: t[3] / 2,
                        start: Math.round(1e3 * e) / 1e3,
                        end: Math.round(1e3 * i) / 1e3
                    };
                    a.shapeType = "arc", a.shapeArgs = x, (o = (i + e) / 2) > 1.5 * Math.PI ? o -= 2 * Math.PI : o < -Math.PI / 2 && (o += 2 * Math.PI), a.slicedTranslation = {
                        translateX: Math.round(Math.cos(o) * l),
                        translateY: Math.round(Math.sin(o) * l)
                    }, r = Math.cos(o) * t[2] / 2, s = Math.sin(o) * t[2] / 2, a.tooltipPos = [t[0] + .7 * r, t[1] + .7 * s], a.half = o < -Math.PI / 2 || o > Math.PI / 2 ? 1 : 0, a.angle = o
                }
                g(this, "afterTranslate")
            }, e.prototype.updateTotals = function () {
                var t, e, i = this.points, o = i.length, r = this.options.ignoreHiddenPoint, s = 0;
                for (t = 0; t < o; t++) (e = i[t]).isValid() && (!r || e.visible) && (s += e.y);
                for (t = 0, this.total = s; t < o; t++) (e = i[t]).percentage = s > 0 && (e.visible || !r) ? e.y / s * 100 : 0, e.total = s
            }, e.defaultOptions = m(s.defaultOptions, r), e
        }(s);
        return f(v.prototype, {
            axisTypes: [],
            directTouch: !0,
            drawGraph: void 0,
            drawTracker: e.prototype.drawTracker,
            getCenter: t.getCenter,
            getSymbol: d,
            isCartesian: !1,
            noSharedTooltip: !0,
            pointAttribs: e.prototype.pointAttribs,
            pointClass: o,
            requireSorting: !1,
            searchPoint: d,
            trackerGroups: ["group", "dataLabelsGroup"]
        }), n.registerSeriesType("pie", v), v
    }), i(e, "Series/Pie/PieDataLabel.js", [e["Core/Series/DataLabel.js"], e["Core/Globals.js"], e["Core/Renderer/RendererUtilities.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o, r) {
        var s, n = e.composed, a = e.noop, h = i.distribute, l = o.series, c = r.arrayMax, p = r.clamp, d = r.defined,
            u = r.pick, f = r.pushUnique, g = r.relativeLength;
        return function (e) {
            var i = {
                radialDistributionY: function (t, e) {
                    var i;
                    return ((null === (i = e.dataLabelPosition) || void 0 === i ? void 0 : i.top) || 0) + t.distributeBox.pos
                }, radialDistributionX: function (t, e, i, o, r) {
                    var s = r.dataLabelPosition;
                    return t.getX(i < ((null == s ? void 0 : s.top) || 0) + 2 || i > ((null == s ? void 0 : s.bottom) || 0) - 2 ? o : i, e.half, e, r)
                }, justify: function (t, e, i, o) {
                    var r;
                    return o[0] + (t.half ? -1 : 1) * (i + ((null === (r = e.dataLabelPosition) || void 0 === r ? void 0 : r.distance) || 0))
                }, alignToPlotEdges: function (t, e, i, o) {
                    var r = t.getBBox().width;
                    return e ? r + o : i - r - o
                }, alignToConnectors: function (t, e, i, o) {
                    var r, s = 0;
                    return t.forEach(function (t) {
                        (r = t.dataLabel.getBBox().width) > s && (s = r)
                    }), e ? s + o : i - s - o
                }
            };

            function o(t, e) {
                var i = this.center, o = this.options, r = i[2] / 2, s = t.angle || 0, n = Math.cos(s), a = Math.sin(s),
                    h = i[0] + n * r, l = i[1] + a * r,
                    c = Math.min((o.slicedOffset || 0) + (o.borderWidth || 0), e / 5);
                return {
                    natural: {x: h + n * e, y: l + a * e},
                    computed: {},
                    alignment: e < 0 ? "center" : t.half ? "right" : "left",
                    connectorPosition: {breakAt: {x: h + n * c, y: l + a * c}, touchingSliceAt: {x: h, y: l}},
                    distance: e
                }
            }

            function r() {
                var t, e, i, o, r = this, s = this, n = s.points, a = s.chart, p = a.plotWidth, f = a.plotHeight,
                    m = a.plotLeft, y = Math.round(a.chartWidth / 3), v = s.center, x = v[2] / 2, b = v[1],
                    M = [[], []], C = [0, 0, 0, 0], S = s.dataLabelPositioners, w = 0;
                s.visible && (null === (t = s.hasDataLabels) || void 0 === t ? void 0 : t.call(s)) && (n.forEach(function (t) {
                    (t.dataLabels || []).forEach(function (t) {
                        t.shortened && (t.attr({width: "auto"}).css({
                            width: "auto",
                            textOverflow: "clip"
                        }), t.shortened = !1)
                    })
                }), l.prototype.drawDataLabels.apply(s), n.forEach(function (t) {
                    (t.dataLabels || []).forEach(function (e, i) {
                        var o, s = v[2] / 2, n = e.options, a = g((null == n ? void 0 : n.distance) || 0, s);
                        0 === i && M[t.half].push(t), !d(null === (o = null == n ? void 0 : n.style) || void 0 === o ? void 0 : o.width) && e.getBBox().width > y && (e.css({width: Math.round(.7 * y) + "px"}), e.shortened = !0), e.dataLabelPosition = r.getDataLabelPosition(t, a), w = Math.max(w, a)
                    })
                }), M.forEach(function (t, e) {
                    var r, n, l, c = t.length, g = [], y = 0;
                    c && (s.sortByAngle(t, e - .5), w > 0 && (r = Math.max(0, b - x - w), n = Math.min(b + x + w, a.plotHeight), t.forEach(function (t) {
                        (t.dataLabels || []).forEach(function (e, i) {
                            var o, r = e.dataLabelPosition;
                            r && r.distance > 0 && (r.top = Math.max(0, b - x - r.distance), r.bottom = Math.min(b + x + r.distance, a.plotHeight), y = e.getBBox().height || 21, t.distributeBox = {
                                target: ((null === (o = e.dataLabelPosition) || void 0 === o ? void 0 : o.natural.y) || 0) - r.top + y / 2,
                                size: y,
                                rank: t.y
                            }, g.push(t.distributeBox))
                        })
                    }), h(g, l = n + y - r, l / 5)), t.forEach(function (r) {
                        (r.dataLabels || []).forEach(function (n) {
                            var a = n.options || {}, h = r.distributeBox, l = n.dataLabelPosition,
                                c = (null == l ? void 0 : l.natural.y) || 0, y = a.connectorPadding || 0, b = 0, M = c,
                                w = "inherit";
                            if (l) {
                                if (g && d(h) && l.distance > 0 && (void 0 === h.pos ? w = "hidden" : (o = h.size, M = S.radialDistributionY(r, n))), a.justify) b = S.justify(r, n, x, v); else switch (a.alignTo) {
                                    case"connectors":
                                        b = S.alignToConnectors(t, e, p, m);
                                        break;
                                    case"plotEdges":
                                        b = S.alignToPlotEdges(n, e, p, m);
                                        break;
                                    default:
                                        b = S.radialDistributionX(s, r, M, c, n)
                                }
                                if (l.attribs = {
                                    visibility: w,
                                    align: l.alignment
                                }, l.posAttribs = {
                                    x: b + (a.x || 0) + (({left: y, right: -y})[l.alignment] || 0),
                                    y: M + (a.y || 0) - n.getBBox().height / 2
                                }, l.computed.x = b, l.computed.y = M, u(a.crop, !0)) {
                                    i = n.getBBox().width;
                                    var k = void 0;
                                    b - i < y && 1 === e ? (k = Math.round(i - b + y), C[3] = Math.max(k, C[3])) : b + i > p - y && 0 === e && (k = Math.round(b + i - p + y), C[1] = Math.max(k, C[1])), M - o / 2 < 0 ? C[0] = Math.max(Math.round(-M + o / 2), C[0]) : M + o / 2 > f && (C[2] = Math.max(Math.round(M + o / 2 - f), C[2])), l.sideOverflow = k
                                }
                            }
                        })
                    }))
                }), (0 === c(C) || this.verifyDataLabelOverflow(C)) && (this.placeDataLabels(), this.points.forEach(function (t) {
                    (t.dataLabels || []).forEach(function (i) {
                        var o, r = i.options || {}, n = r.connectorColor, h = r.connectorWidth,
                            l = void 0 === h ? 1 : h, c = i.dataLabelPosition;
                        if (l) {
                            var p = void 0;
                            e = i.connector, c && c.distance > 0 ? (p = !e, e || (i.connector = e = a.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + t.colorIndex + (t.className ? " " + t.className : "")).add(s.dataLabelsGroup)), a.styledMode || e.attr({
                                "stroke-width": l,
                                stroke: n || t.color || "#666666"
                            }), e[p ? "attr" : "animate"]({d: t.getConnectorPath(i)}), e.attr({visibility: null === (o = c.attribs) || void 0 === o ? void 0 : o.visibility})) : e && (i.connector = e.destroy())
                        }
                    })
                })))
            }

            function s() {
                this.points.forEach(function (t) {
                    (t.dataLabels || []).forEach(function (t) {
                        var e, i = t.dataLabelPosition;
                        i ? (i.sideOverflow && (t.css({
                            width: Math.max(t.getBBox().width - i.sideOverflow, 0) + "px",
                            textOverflow: ((null === (e = t.options) || void 0 === e ? void 0 : e.style) || {}).textOverflow || "ellipsis"
                        }), t.shortened = !0), t.attr(i.attribs), t[t.moved ? "animate" : "attr"](i.posAttribs), t.moved = !0) : t && t.attr({y: -9999})
                    }), delete t.distributeBox
                }, this)
            }

            function m(t) {
                var e = this.center, i = this.options, o = i.center, r = i.minSize || 80, s = r, n = null !== i.size;
                return !n && (null !== o[0] ? s = Math.max(e[2] - Math.max(t[1], t[3]), r) : (s = Math.max(e[2] - t[1] - t[3], r), e[0] += (t[3] - t[1]) / 2), null !== o[1] ? s = p(s, r, e[2] - Math.max(t[0], t[2])) : (s = p(s, r, e[2] - t[0] - t[2]), e[1] += (t[0] - t[2]) / 2), s < e[2] ? (e[2] = s, e[3] = Math.min(i.thickness ? Math.max(0, s - 2 * i.thickness) : Math.max(0, g(i.innerSize || 0, s)), s), this.translate(e), this.drawDataLabels && this.drawDataLabels()) : n = !0), n
            }

            e.compose = function e(h) {
                if (t.compose(l), f(n, e)) {
                    var c = h.prototype;
                    c.dataLabelPositioners = i, c.alignDataLabel = a, c.drawDataLabels = r, c.getDataLabelPosition = o, c.placeDataLabels = s, c.verifyDataLabelOverflow = m
                }
            }
        }(s || (s = {})), s
    }), i(e, "Extensions/OverlappingDataLabels.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i = t.composed, o = e.addEvent, r = e.fireEvent, s = e.isNumber, n = e.objectEach, a = e.pick,
            h = e.pushUnique;

        function l(t) {
            for (var e, i, o, n, a, h = t.length, l = this.renderer, p = !1, d = 0; d < h; d++) (e = t[d]) && (e.oldOpacity = e.opacity, e.newOpacity = 1, e.absoluteBox = function (t) {
                var e, i, o, r, n, a = t.box ? 0 : t.padding || 0, h = 0, c = 0;
                if (t && (!t.alignAttr || t.placed)) return e = t.alignAttr || {
                    x: t.attr("x"),
                    y: t.attr("y")
                }, i = t.parentGroup, t.width || (o = t.getBBox(), t.width = o.width, t.height = o.height, h = l.fontMetrics(t.element).h), r = t.width - 2 * a, (n = ({
                    left: "0",
                    center: "0.5",
                    right: "1"
                })[t.alignValue]) ? c = +n * r : s(t.x) && Math.round(t.x) !== t.translateX && (c = t.x - (t.translateX || 0)), {
                    x: e.x + (i.translateX || 0) + a - (c || 0),
                    y: e.y + (i.translateY || 0) + a - h,
                    width: t.width - 2 * a,
                    height: (t.height || 0) - 2 * a
                }
            }(e));
            t.sort(function (t, e) {
                return (e.labelrank || 0) - (t.labelrank || 0)
            });
            for (var d = 0; d < h; ++d) {
                n = (i = t[d]) && i.absoluteBox;
                for (var u = d + 1; u < h; ++u) a = (o = t[u]) && o.absoluteBox, n && a && i !== o && 0 !== i.newOpacity && 0 !== o.newOpacity && "hidden" !== i.visibility && "hidden" !== o.visibility && !(a.x >= n.x + n.width || a.x + a.width <= n.x || a.y >= n.y + n.height || a.y + a.height <= n.y) && ((i.labelrank < o.labelrank ? i : o).newOpacity = 0)
            }
            for (var f = 0; f < t.length; f++) c(t[f], this) && (p = !0);
            p && r(this, "afterHideAllOverlappingLabels")
        }

        function c(t, e) {
            var i, o = !1;
            return t && (i = t.newOpacity, t.oldOpacity !== i && (t.hasClass("highcharts-data-label") ? (t[i ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), o = !0, t[t.isOld ? "animate" : "attr"]({opacity: i}, void 0, function () {
                e.styledMode || t.css({pointerEvents: i ? "auto" : "none"})
            }), r(e, "afterHideOverlappingLabel")) : t.attr({opacity: i})), t.isOld = !0), o
        }

        function p() {
            for (var t, e = this, i = [], o = 0, r = e.labelCollectors || []; o < r.length; o++) {
                var s = r[o];
                i = i.concat(s())
            }
            for (var h = 0, l = e.yAxis || []; h < l.length; h++) {
                var p = l[h];
                p.stacking && p.options.stackLabels && !p.options.stackLabels.allowOverlap && n(p.stacking.stacks, function (t) {
                    n(t, function (t) {
                        t.label && i.push(t.label)
                    })
                })
            }
            for (var d = 0, u = e.series || []; d < u.length; d++) {
                var f = u[d];
                if (f.visible && (null === (t = f.hasDataLabels) || void 0 === t ? void 0 : t.call(f))) {
                    var g = function (t) {
                        for (var o = function (t) {
                            t.visible && (t.dataLabels || []).forEach(function (o) {
                                var r, s, n = o.options || {};
                                o.labelrank = a(n.labelrank, t.labelrank, null === (r = t.shapeArgs) || void 0 === r ? void 0 : r.height), (null !== (s = n.allowOverlap) && void 0 !== s ? s : Number(n.distance) > 0) ? (o.oldOpacity = o.opacity, o.newOpacity = 1, c(o, e)) : i.push(o)
                            })
                        }, r = 0; r < t.length; r++) o(t[r])
                    };
                    g(f.nodes || []), g(f.points)
                }
            }
            this.hideOverlappingLabels(i)
        }

        return {
            compose: function t(e) {
                h(i, t) && (e.prototype.hideOverlappingLabels = l, o(e, "render", p))
            }
        }
    }), i(e, "Extensions/BorderRadius.js", [e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o = this && this.__spreadArray || function (t, e, i) {
                if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
                return t.concat(o || Array.prototype.slice.call(e))
            }, r = t.defaultOptions, s = e.composed, n = e.noop, a = i.addEvent, h = i.extend, l = i.isObject, c = i.merge,
            p = i.pushUnique, d = i.relativeLength, u = {radius: 0, scope: "stack", where: void 0}, f = n, g = n;

        function m(t, e, i, o, r) {
            void 0 === r && (r = {});
            var s = f(t, e, i, o, r), n = r.innerR, a = void 0 === n ? 0 : n, h = r.r, l = void 0 === h ? i : h,
                c = r.start, p = r.end;
            if (r.open || !r.borderRadius) return s;
            for (var u = (void 0 === p ? 0 : p) - (void 0 === c ? 0 : c), g = Math.sin(u / 2), m = Math.max(Math.min(d(r.borderRadius || 0, l - a), (l - a) / 2, l * g / (1 + g)), 0), y = Math.min(m, 2 * (u / Math.PI) * a), v = s.length - 1; v--;) !function (t, e, i) {
                var o, r, s, n = t[e], a = t[e + 1];
                if ("Z" === a[0] && (a = t[0]), ("M" === n[0] || "L" === n[0]) && "A" === a[0] ? (o = n, r = a, s = !0) : "A" === n[0] && ("M" === a[0] || "L" === a[0]) && (o = a, r = n), o && r && r.params) {
                    var h = r[1], l = r[5], c = r.params, p = c.start, d = c.end, u = c.cx, f = c.cy,
                        g = l ? h - i : h + i, m = g ? Math.asin(i / g) : 0, y = l ? m : -m, v = Math.cos(m) * g;
                    s ? (c.start = p + y, o[1] = u + v * Math.cos(p), o[2] = f + v * Math.sin(p), t.splice(e + 1, 0, ["A", i, i, 0, 0, 1, u + h * Math.cos(c.start), f + h * Math.sin(c.start)])) : (c.end = d - y, r[6] = u + h * Math.cos(c.end), r[7] = f + h * Math.sin(c.end), t.splice(e + 1, 0, ["A", i, i, 0, 0, 1, u + v * Math.cos(d), f + v * Math.sin(d)])), r[4] = Math.abs(c.end - c.start) < Math.PI ? 0 : 1
                }
            }(s, v, v > 1 ? y : m);
            return s
        }

        function y() {
            var t, e;
            if (this.options.borderRadius && !(this.chart.is3d && this.chart.is3d())) for (var i = this.options, o = this.yAxis, s = "percent" === i.stacking, n = null === (e = null === (t = r.plotOptions) || void 0 === t ? void 0 : t[this.type]) || void 0 === e ? void 0 : e.borderRadius, a = v(i.borderRadius, l(n) ? n : {}), c = o.options.reversed, p = 0, u = this.points; p < u.length; p++) {
                var f = u[p], g = f.shapeArgs;
                if ("roundedRect" === f.shapeType && g) {
                    var m = g.width, y = void 0 === m ? 0 : m, x = g.height, b = void 0 === x ? 0 : x, M = g.y,
                        C = void 0 === M ? 0 : M, S = b;
                    if ("stack" === a.scope && f.stackTotal) {
                        var w = o.translate(s ? 100 : f.stackTotal, !1, !0, !1, !0),
                            k = o.translate(i.threshold || 0, !1, !0, !1, !0),
                            A = this.crispCol(0, Math.min(w, k), 0, Math.abs(w - k));
                        C = A.y, S = A.height
                    }
                    var T = (f.negative ? -1 : 1) * (c ? -1 : 1) == -1, P = a.where;
                    !P && this.is("waterfall") && Math.abs((f.yBottom || 0) - (this.translatedThreshold || 0)) > this.borderWidth && (P = "all"), P || (P = "end");
                    var L = Math.min(d(a.radius, y), y / 2, "all" === P ? b / 2 : 1 / 0) || 0;
                    "end" === P && (T && (C -= L), S += L), h(g, {brBoxHeight: S, brBoxY: C, r: L})
                }
            }
        }

        function v(t, e) {
            return l(t) || (t = {radius: t || 0}), c(u, e, t)
        }

        function x() {
            for (var t = v(this.options.borderRadius), e = 0, i = this.points; e < i.length; e++) {
                var o = i[e].shapeArgs;
                o && (o.borderRadius = d(t.radius, (o.r || 0) - (o.innerR || 0)))
            }
        }

        function b(t, e, i, r, s) {
            void 0 === s && (s = {});
            var n = g(t, e, i, r, s), a = s.r, h = void 0 === a ? 0 : a, l = s.brBoxHeight, c = void 0 === l ? r : l,
                p = s.brBoxY, d = void 0 === p ? e : p, u = e - d, f = d + c - (e + r), m = u - h > -.1 ? 0 : h,
                y = f - h > -.1 ? 0 : h, v = Math.max(m && u, 0), x = Math.max(y && f, 0), b = [t + m, e],
                M = [t + i - m, e], C = [t + i, e + m], S = [t + i, e + r - y], w = [t + i - y, e + r],
                k = [t + y, e + r], A = [t, e + r - y], T = [t, e + m], P = function (t, e) {
                    return Math.sqrt(Math.pow(t, 2) - Math.pow(e, 2))
                };
            if (v) {
                var L = P(m, m - v);
                b[0] -= L, M[0] += L, C[1] = T[1] = e + m - v
            }
            if (r < m - v) {
                var L = P(m, m - v - r);
                C[0] = S[0] = t + i - m + L, w[0] = Math.min(C[0], w[0]), k[0] = Math.max(S[0], k[0]), A[0] = T[0] = t + m - L, C[1] = T[1] = e + r
            }
            if (x) {
                var L = P(y, y - x);
                w[0] += L, k[0] -= L, S[1] = A[1] = e + r - y + x
            }
            if (r < y - x) {
                var L = P(y, y - x - r);
                C[0] = S[0] = t + i - y + L, M[0] = Math.min(C[0], M[0]), b[0] = Math.max(S[0], b[0]), A[0] = T[0] = t + y - L, S[1] = A[1] = e
            }
            return n.length = 0, n.push(o(["M"], b, !0), o(["L"], M, !0), o(["A", m, m, 0, 0, 1], C, !0), o(["L"], S, !0), o(["A", y, y, 0, 0, 1], w, !0), o(["L"], k, !0), o(["A", y, y, 0, 0, 1], A, !0), o(["L"], T, !0), o(["A", m, m, 0, 0, 1], b, !0), ["Z"]), n
        }

        return {
            compose: function t(e, i, o, r) {
                if (p(s, t)) {
                    var n = r.prototype.symbols;
                    a(e, "afterColumnTranslate", y, {order: 9}), a(i, "afterTranslate", x), o.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY"), f = n.arc, g = n.roundedRect, n.arc = m, n.roundedRect = b
                }
            }, optionsToObject: v
        }
    }), i(e, "Core/Responsive.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = t.composed, r = e.diffObjects, s = e.extend, n = e.find, a = e.merge, h = e.pick, l = e.pushUnique,
            c = e.uniqueKey;
        return function (t) {
            function e(t, e) {
                var i = t.condition;
                (i.callback || function () {
                    return this.chartWidth <= h(i.maxWidth, Number.MAX_VALUE) && this.chartHeight <= h(i.maxHeight, Number.MAX_VALUE) && this.chartWidth >= h(i.minWidth, 0) && this.chartHeight >= h(i.minHeight, 0)
                }).call(this) && e.push(t._id)
            }

            function i(t, e) {
                var i, o = this, s = this.options.responsive, h = this.currentResponsive, l = [];
                !e && s && s.rules && s.rules.forEach(function (t) {
                    void 0 === t._id && (t._id = c()), o.matchResponsiveRule(t, l)
                }, this);
                var p = a.apply(void 0, l.map(function (t) {
                    return n((s || {}).rules || [], function (e) {
                        return e._id === t
                    })
                }).map(function (t) {
                    return t && t.chartOptions
                }));
                p.isResponsiveOptions = !0, l = l.toString() || void 0;
                var d = h && h.ruleIds;
                l !== d && (h && this.update(h.undoOptions, t, !0), l ? ((i = r(p, this.options, !0, this.collectionsWithUpdate)).isResponsiveOptions = !0, this.currentResponsive = {
                    ruleIds: l,
                    mergedOptions: p,
                    undoOptions: i
                }, this.update(p, t, !0)) : this.currentResponsive = void 0)
            }

            t.compose = function t(r) {
                return l(o, t) && s(r.prototype, {matchResponsiveRule: e, setResponsive: i}), r
            }
        }(i || (i = {})), i
    }), i(e, "masters/highcharts.src.js", [e["Core/Globals.js"], e["Core/Utilities.js"], e["Core/Defaults.js"], e["Core/Animation/Fx.js"], e["Core/Animation/AnimationUtilities.js"], e["Core/Renderer/HTML/AST.js"], e["Core/Templating.js"], e["Core/Renderer/RendererUtilities.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Renderer/HTML/HTMLElement.js"], e["Core/Renderer/HTML/HTMLRenderer.js"], e["Core/Axis/Axis.js"], e["Core/Axis/DateTimeAxis.js"], e["Core/Axis/LogarithmicAxis.js"], e["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], e["Core/Axis/Tick.js"], e["Core/Tooltip.js"], e["Core/Series/Point.js"], e["Core/Pointer.js"], e["Core/Legend/Legend.js"], e["Core/Chart/Chart.js"], e["Extensions/ScrollablePlotArea.js"], e["Core/Axis/Stacking/StackingAxis.js"], e["Core/Axis/Stacking/StackItem.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Series/Column/ColumnSeries.js"], e["Series/Column/ColumnDataLabel.js"], e["Series/Pie/PieSeries.js"], e["Series/Pie/PieDataLabel.js"], e["Core/Series/DataLabel.js"], e["Extensions/OverlappingDataLabels.js"], e["Extensions/BorderRadius.js"], e["Core/Responsive.js"], e["Core/Color/Color.js"], e["Core/Time.js"]], function (t, e, i, o, r, s, n, a, h, l, c, p, d, u, f, g, m, y, v, x, b, M, C, S, w, k, A, T, P, L, j, O, E, D, B, I, z) {
        return t.animate = r.animate, t.animObject = r.animObject, t.getDeferredAnimation = r.getDeferredAnimation, t.setAnimation = r.setAnimation, t.stop = r.stop, t.timers = o.timers, t.AST = s, t.Axis = d, t.Chart = M, t.chart = M.chart, t.Fx = o, t.Legend = b, t.PlotLineOrBand = g, t.Point = v, t.Pointer = x, t.Series = k, t.StackItem = w, t.SVGElement = h, t.SVGRenderer = l, t.Templating = n, t.Tick = m, t.Time = z, t.Tooltip = y, t.Color = I, t.color = I.parse, p.compose(l), c.compose(h), x.compose(M), b.compose(M), t.defaultOptions = i.defaultOptions, t.getOptions = i.getOptions, t.time = i.defaultTime, t.setOptions = i.setOptions, t.dateFormat = n.dateFormat, t.format = n.format, t.numberFormat = n.numberFormat, e.extend(t, e), t.distribute = a.distribute, t.seriesType = A.seriesType, P.compose(T), D.compose(k, L, h, l), O.compose(k), u.compose(d), f.compose(d), E.compose(M), j.compose(L), g.compose(d), B.compose(M), C.compose(d, M, k), S.compose(d, M, k), y.compose(x), t
    }), i(e, "Core/Axis/Color/ColorAxisComposition.js", [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = t.parse, s = e.composed, n = i.addEvent, a = i.extend, h = i.merge, l = i.pick, c = i.pushUnique,
            p = i.splat;
        return function (t) {
            var e;

            function i() {
                var t = this, i = this.userOptions;
                this.colorAxis = [], i.colorAxis && (i.colorAxis = p(i.colorAxis), i.colorAxis.map(function (i) {
                    return new e(t, i)
                }))
            }

            function o(t) {
                var e, i, o = this, r = this.chart.colorAxis || [], s = function (e) {
                    var i = t.allItems.indexOf(e);
                    -1 !== i && (o.destroyItem(t.allItems[i]), t.allItems.splice(i, 1))
                }, n = [];
                for (r.forEach(function (t) {
                    (e = t.options) && e.showInLegend && (e.dataClasses && e.visible ? n = n.concat(t.getDataClassLegendSymbols()) : e.visible && n.push(t), t.series.forEach(function (t) {
                        (!t.options.showInLegend || e.dataClasses) && ("point" === t.options.legendType ? t.points.forEach(function (t) {
                            s(t)
                        }) : s(t))
                    }))
                }), i = n.length; i--;) t.allItems.unshift(n[i])
            }

            function d(t) {
                t.visible && t.item.legendColor && t.item.legendItem.symbol.attr({fill: t.item.legendColor})
            }

            function u(t) {
                var e;
                null === (e = this.chart.colorAxis) || void 0 === e || e.forEach(function (e) {
                    e.update({}, t.redraw)
                })
            }

            function f() {
                (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors()
            }

            function g() {
                var t = this.axisTypes;
                t ? -1 === t.indexOf("colorAxis") && t.push("colorAxis") : this.axisTypes = ["colorAxis"]
            }

            function m(t) {
                var e = this, i = t ? "show" : "hide";
                e.visible = e.options.visible = !!t, ["graphic", "dataLabel"].forEach(function (t) {
                    e[t] && e[t][i]()
                }), this.series.buildKDTree()
            }

            function y() {
                var t = this, e = this.data.length ? this.data : this.points, i = this.options.nullColor,
                    o = this.colorAxis, r = this.colorKey;
                e.forEach(function (e) {
                    var s = e.getNestedProperty(r),
                        n = e.options.color || (e.isNull || null === e.value ? i : o && void 0 !== s ? o.toColor(s, e) : e.color || t.color);
                    n && e.color !== n && (e.color = n, "point" === t.options.legendType && e.legendItem && e.legendItem.label && t.chart.legend.colorizeItem(e, e.visible))
                })
            }

            function v() {
                this.elem.attr("fill", r(this.start).tweenTo(r(this.end), this.pos), void 0, !0)
            }

            function x() {
                this.elem.attr("stroke", r(this.start).tweenTo(r(this.end), this.pos), void 0, !0)
            }

            t.compose = function t(r, p, b, M, C) {
                if (c(s, t)) {
                    e = r;
                    var S, w = p.prototype, k = b.prototype, A = C.prototype;
                    w.collectionsWithUpdate.push("colorAxis"), w.collectionsWithInit.colorAxis = [w.addColorAxis], n(p, "afterGetAxes", i), S = p.prototype.createAxis, p.prototype.createAxis = function (t, i) {
                        if ("colorAxis" !== t) return S.apply(this, arguments);
                        var o = new e(this, h(i.axis, {index: this[t].length, isX: !1}));
                        return this.isDirtyLegend = !0, this.axes.forEach(function (t) {
                            t.series = []
                        }), this.series.forEach(function (t) {
                            t.bindAxes(), t.isDirtyData = !0
                        }), l(i.redraw, !0) && this.redraw(i.animation), o
                    }, k.fillSetter = v, k.strokeSetter = x, n(M, "afterGetAllItems", o), n(M, "afterColorizeItem", d), n(M, "afterUpdate", u), a(A, {
                        optionalAxis: "colorAxis",
                        translateColors: y
                    }), a(A.pointClass.prototype, {setVisible: m}), n(C, "afterTranslate", f, {order: 1}), n(C, "bindAxes", g)
                }
            }, t.pointSetVisible = m
        }(o || (o = {})), o
    }), i(e, "Core/Axis/Color/ColorAxisDefaults.js", [], function () {
        return {
            lineWidth: 0,
            minPadding: 0,
            maxPadding: 0,
            gridLineColor: "#ffffff",
            gridLineWidth: 1,
            tickPixelInterval: 72,
            startOnTick: !0,
            endOnTick: !0,
            offset: 0,
            marker: {animation: {duration: 50}, width: .01, color: "#999999"},
            labels: {distance: 8, overflow: "justify", rotation: 0},
            minColor: "#e6e9ff",
            maxColor: "#0022ff",
            tickLength: 5,
            showInLegend: !0
        }
    }), i(e, "Core/Axis/Color/ColorAxisLike.js", [e["Core/Color/Color.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o, r = t.parse, s = e.merge;
        return (i = o || (o = {})).initDataClasses = function (t) {
            var e, i, o, n = this.chart, a = this.legendItem = this.legendItem || {}, h = this.options,
                l = t.dataClasses || [], c = n.options.chart.colorCount, p = 0;
            this.dataClasses = i = [], a.labels = [];
            for (var d = 0, u = l.length; d < u; ++d) e = s(e = l[d]), i.push(e), (n.styledMode || !e.color) && ("category" === h.dataClassColor ? (n.styledMode || (c = (o = n.options.colors || []).length, e.color = o[p]), e.colorIndex = p, ++p === c && (p = 0)) : e.color = r(h.minColor).tweenTo(r(h.maxColor), u < 2 ? .5 : d / (u - 1)))
        }, i.initStops = function () {
            for (var t = this.options, e = this.stops = t.stops || [[0, t.minColor || ""], [1, t.maxColor || ""]], i = 0, o = e.length; i < o; ++i) e[i].color = r(e[i][1])
        }, i.normalizedValue = function (t) {
            var e = this.max || 0, i = this.min || 0;
            return this.logarithmic && (t = this.logarithmic.log2lin(t)), 1 - (e - t) / (e - i || 1)
        }, i.toColor = function (t, e) {
            var i, o, r, s, n, a, h = this.dataClasses, l = this.stops;
            if (h) {
                for (a = h.length; a--;) if (o = (n = h[a]).from, r = n.to, (void 0 === o || t >= o) && (void 0 === r || t <= r)) {
                    s = n.color, e && (e.dataClass = a, e.colorIndex = n.colorIndex);
                    break
                }
            } else {
                for (i = this.normalizedValue(t), a = l.length; a-- && !(i > l[a][0]);) ;
                o = l[a] || l[a + 1], i = 1 - ((r = l[a + 1] || o)[0] - i) / (r[0] - o[0] || 1), s = o.color.tweenTo(r.color, i)
            }
            return s
        }, o
    }), i(e, "Core/Axis/Color/ColorAxis.js", [e["Core/Axis/Axis.js"], e["Core/Axis/Color/ColorAxisComposition.js"], e["Core/Axis/Color/ColorAxisDefaults.js"], e["Core/Axis/Color/ColorAxisLike.js"], e["Core/Defaults.js"], e["Core/Legend/LegendSymbol.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s, n, a) {
        var h, l = this && this.__extends || (h = function (t, e) {
                return (h = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                h(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), c = r.defaultOptions, p = n.series, d = a.defined, u = a.extend, f = a.fireEvent, g = a.isArray,
            m = a.isNumber, y = a.merge, v = a.pick, x = a.relativeLength;
        c.colorAxis = y(c.xAxis, i);
        var b = function (t) {
            function i(e, i) {
                var o = t.call(this, e, i) || this;
                return o.coll = "colorAxis", o.visible = !0, o.init(e, i), o
            }

            return l(i, t), i.compose = function (t, o, r, s) {
                e.compose(i, t, o, r, s)
            }, i.prototype.init = function (e, i) {
                var o = e.options.legend || {}, r = i.layout ? "vertical" !== i.layout : "vertical" !== o.layout;
                this.side = i.side || r ? 2 : 1, this.reversed = i.reversed || !r, this.opposite = !r, t.prototype.init.call(this, e, i, "colorAxis"), this.userOptions = i, g(e.userOptions.colorAxis) && (e.userOptions.colorAxis[this.index] = i), i.dataClasses && this.initDataClasses(i), this.initStops(), this.horiz = r, this.zoomEnabled = !1
            }, i.prototype.hasData = function () {
                return !!(this.tickPositions || []).length
            }, i.prototype.setTickPositions = function () {
                if (!this.dataClasses) return t.prototype.setTickPositions.call(this)
            }, i.prototype.setOptions = function (e) {
                var i = y(c.colorAxis, e, {
                    showEmpty: !1,
                    title: null,
                    visible: this.chart.options.legend.enabled && !1 !== e.visible
                });
                t.prototype.setOptions.call(this, i), this.options.crosshair = this.options.marker
            }, i.prototype.setAxisSize = function () {
                var t, e = this.chart, o = null === (t = this.legendItem) || void 0 === t ? void 0 : t.symbol,
                    r = this.getSize(), s = r.width, n = r.height;
                o && (this.left = +o.attr("x"), this.top = +o.attr("y"), this.width = s = +o.attr("width"), this.height = n = +o.attr("height"), this.right = e.chartWidth - this.left - s, this.bottom = e.chartHeight - this.top - n, this.pos = this.horiz ? this.left : this.top), this.len = (this.horiz ? s : n) || i.defaultLegendLength
            }, i.prototype.getOffset = function () {
                var e, o = null === (e = this.legendItem) || void 0 === e ? void 0 : e.group,
                    r = this.chart.axisOffset[this.side];
                if (o) {
                    this.axisParent = o, t.prototype.getOffset.call(this);
                    var s = this.chart.legend;
                    s.allItems.forEach(function (t) {
                        t instanceof i && t.drawLegendSymbol(s, t)
                    }), s.render(), this.chart.getMargins(!0), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = r
                }
            }, i.prototype.setLegendColor = function () {
                var t = this.horiz, e = this.reversed, i = e ? 1 : 0, o = e ? 0 : 1,
                    r = t ? [i, 0, o, 0] : [0, o, 0, i];
                this.legendColor = {linearGradient: {x1: r[0], y1: r[1], x2: r[2], y2: r[3]}, stops: this.stops}
            }, i.prototype.drawLegendSymbol = function (t, e) {
                var i, o = e.legendItem || {}, r = t.padding, s = t.options, n = this.options.labels,
                    a = v(s.itemDistance, 10), h = this.horiz, l = this.getSize(), c = l.width, p = l.height,
                    d = v(s.labelPadding, h ? 16 : 30);
                this.setLegendColor(), o.symbol || (o.symbol = this.chart.renderer.symbol("roundedRect").attr({
                    r: null !== (i = s.symbolRadius) && void 0 !== i ? i : 3,
                    zIndex: 1
                }).add(o.group)), o.symbol.attr({
                    x: 0,
                    y: (t.baseline || 0) - 11,
                    width: c,
                    height: p
                }), o.labelWidth = c + r + (h ? a : v(n.x, n.distance) + this.maxLabelLength), o.labelHeight = p + r + (h ? d : 0)
            }, i.prototype.setState = function (t) {
                this.series.forEach(function (e) {
                    e.setState(t)
                })
            }, i.prototype.setVisible = function () {
            }, i.prototype.getSeriesExtremes = function () {
                var t, e, i, o, r, s, n, a, h = this.series, l = h.length;
                for (this.dataMin = 1 / 0, this.dataMax = -1 / 0; l--;) {
                    if (e = (s = h[l]).colorKey = v(s.options.colorKey, s.colorKey, s.pointValKey, s.zoneAxis, "y"), o = s.pointArrayMap, r = s[e + "Min"] && s[e + "Max"], s[e + "Data"]) t = s[e + "Data"]; else if (o) {
                        if (t = [], i = o.indexOf(e), n = s.yData, i >= 0 && n) for (a = 0; a < n.length; a++) t.push(v(n[a][i], n[a]))
                    } else t = s.yData;
                    if (r) s.minColorValue = s[e + "Min"], s.maxColorValue = s[e + "Max"]; else {
                        var c = p.prototype.getExtremes.call(s, t);
                        s.minColorValue = c.dataMin, s.maxColorValue = c.dataMax
                    }
                    d(s.minColorValue) && d(s.maxColorValue) && (this.dataMin = Math.min(this.dataMin, s.minColorValue), this.dataMax = Math.max(this.dataMax, s.maxColorValue)), r || p.prototype.applyExtremes.call(s)
                }
            }, i.prototype.drawCrosshair = function (e, i) {
                var o, r = this.legendItem || {}, s = i && i.plotX, n = i && i.plotY, a = this.pos, h = this.len;
                i && ((o = this.toPixels(i.getNestedProperty(i.series.colorKey))) < a ? o = a - 2 : o > a + h && (o = a + h + 2), i.plotX = o, i.plotY = this.len - o, t.prototype.drawCrosshair.call(this, e, i), i.plotX = s, i.plotY = n, this.cross && !this.cross.addedToColorAxis && r.group && (this.cross.addClass("highcharts-coloraxis-marker").add(r.group), this.cross.addedToColorAxis = !0, this.chart.styledMode || "object" != typeof this.crosshair || this.cross.attr({fill: this.crosshair.color})))
            }, i.prototype.getPlotLinePath = function (e) {
                var i = this.left, o = e.translatedValue, r = this.top;
                return m(o) ? this.horiz ? [["M", o - 4, r - 6], ["L", o + 4, r - 6], ["L", o, r], ["Z"]] : [["M", i, o], ["L", i - 6, o + 6], ["L", i - 6, o - 6], ["Z"]] : t.prototype.getPlotLinePath.call(this, e)
            }, i.prototype.update = function (e, i) {
                var o = this.chart.legend;
                this.series.forEach(function (t) {
                    t.isDirtyData = !0
                }), (e.dataClasses && o.allItems || this.dataClasses) && this.destroyItems(), t.prototype.update.call(this, e, i), this.legendItem && this.legendItem.label && (this.setLegendColor(), o.colorizeItem(this, !0))
            }, i.prototype.destroyItems = function () {
                var t = this.chart, e = this.legendItem || {};
                if (e.label) t.legend.destroyItem(this); else if (e.labels) for (var i = 0, o = e.labels; i < o.length; i++) {
                    var r = o[i];
                    t.legend.destroyItem(r)
                }
                t.isDirtyLegend = !0
            }, i.prototype.destroy = function () {
                this.chart.isDirtyLegend = !0, this.destroyItems(), t.prototype.destroy.apply(this, [].slice.call(arguments))
            }, i.prototype.remove = function (e) {
                this.destroyItems(), t.prototype.remove.call(this, e)
            }, i.prototype.getDataClassLegendSymbols = function () {
                var t, e = this, i = e.chart, o = e.legendItem && e.legendItem.labels || [], r = i.options.legend,
                    n = v(r.valueDecimals, -1), a = v(r.valueSuffix, ""), h = function (t) {
                        return e.series.reduce(function (e, i) {
                            return e.push.apply(e, i.points.filter(function (e) {
                                return e.dataClass === t
                            })), e
                        }, [])
                    };
                return o.length || e.dataClasses.forEach(function (r, l) {
                    var c = r.from, p = r.to, d = i.numberFormatter, g = !0;
                    t = "", void 0 === c ? t = "< " : void 0 === p && (t = "> "), void 0 !== c && (t += d(c, n) + a), void 0 !== c && void 0 !== p && (t += " - "), void 0 !== p && (t += d(p, n) + a), o.push(u({
                        chart: i,
                        name: t,
                        options: {},
                        drawLegendSymbol: s.rectangle,
                        visible: !0,
                        isDataClass: !0,
                        setState: function (t) {
                            for (var e = 0, i = h(l); e < i.length; e++) i[e].setState(t)
                        },
                        setVisible: function () {
                            this.visible = g = e.visible = !g;
                            for (var t = [], o = 0, r = h(l); o < r.length; o++) {
                                var s = r[o];
                                s.setVisible(g), -1 === t.indexOf(s.series) && t.push(s.series)
                            }
                            i.legend.colorizeItem(this, g), t.forEach(function (t) {
                                f(t, "afterDataClassLegendClick")
                            })
                        }
                    }, r))
                }), o
            }, i.prototype.getSize = function () {
                var t = this.chart, e = this.horiz, o = this.options, r = o.legend, s = o.height, n = o.width;
                return {
                    width: v(d(n) ? x(n, t.chartWidth) : void 0, null == r ? void 0 : r.symbolWidth, e ? i.defaultLegendLength : 12),
                    height: v(d(s) ? x(s, t.chartHeight) : void 0, null == r ? void 0 : r.symbolHeight, e ? 12 : i.defaultLegendLength)
                }
            }, i.defaultLegendLength = 200, i.keepProps = ["legendItem"], i
        }(t);
        return u(b.prototype, o), Array.prototype.push.apply(t.keepProps, b.keepProps), b
    }), i(e, "Maps/MapNavigationDefaults.js", [], function () {
        return {
            lang: {zoomIn: "Zoom in", zoomOut: "Zoom out"},
            mapNavigation: {
                buttonOptions: {
                    alignTo: "plotBox",
                    align: "left",
                    verticalAlign: "top",
                    x: 0,
                    width: 18,
                    height: 18,
                    padding: 5,
                    style: {color: "#666666", fontSize: "1em", fontWeight: "bold"},
                    theme: {fill: "#ffffff", stroke: "#e6e6e6", "stroke-width": 1, "text-align": "center"}
                }, buttons: {
                    zoomIn: {
                        onclick: function () {
                            this.mapZoom(.5)
                        }, text: "+", y: 0
                    }, zoomOut: {
                        onclick: function () {
                            this.mapZoom(2)
                        }, text: "-", y: 28
                    }
                }, mouseWheelSensitivity: 1.1
            }
        }
    }), i(e, "Maps/MapPointer.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = t.composed, r = e.defined, s = e.extend, n = e.pick, a = e.pushUnique, h = e.wrap;
        return function (t) {
            var e, i = 0;

            function l(t) {
                var e = this.chart;
                t = this.normalize(t), e.options.mapNavigation.enableDoubleClickZoomTo ? e.pointer.inClass(t.target, "highcharts-tracker") && e.hoverPoint && e.hoverPoint.zoomTo() : e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) && e.mapZoom(.5, void 0, void 0, t.chartX, t.chartY)
            }

            function c(t) {
                var o = this.chart,
                    s = r((t = this.normalize(t)).wheelDelta) && -t.wheelDelta / 120 || t.deltaY || t.detail;
                Math.abs(s) >= 1 && (i += Math.abs(s), e && clearTimeout(e), e = setTimeout(function () {
                    i = 0
                }, 50)), i < 10 && o.isInsidePlot(t.chartX - o.plotLeft, t.chartY - o.plotTop) && o.mapView && o.mapView.zoomBy(-((o.options.mapNavigation.mouseWheelSensitivity - 1) * s), void 0, [t.chartX, t.chartY], !(1 > Math.abs(s)) && void 0)
            }

            function p(t, e, i) {
                var o = this.chart;
                if (e = t.call(this, e, i), o && o.mapView) {
                    var r = o.mapView.pixelsToLonLat({x: e.chartX - o.plotLeft, y: e.chartY - o.plotTop});
                    r && s(e, r)
                }
                return e
            }

            function d(t, e, i, o, r, s, n) {
                var a;
                t.call(this, e, i, o, r, s, n), "map" === this.chart.options.chart.type && this.hasZoom && (a = o.scaleX > o.scaleY, this.pinchTranslateDirection(!a, e, i, o, r, s, n, a ? o.scaleX : o.scaleY))
            }

            function u(t) {
                var e = this.chart.options.mapNavigation;
                e && n(e.enableTouchZoom, e.enabled) && (this.chart.zooming.pinchType = "xy"), t.apply(this, [].slice.call(arguments, 1))
            }

            t.compose = function t(e) {
                if (a(o, t)) {
                    var i = e.prototype;
                    s(i, {
                        onContainerDblClick: l,
                        onContainerMouseWheel: c
                    }), h(i, "normalize", p), h(i, "pinchTranslate", d), h(i, "zoomOption", u)
                }
            }
        }(i || (i = {})), i
    }), i(e, "Maps/MapSymbols.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = t.composed, r = e.pushUnique;

        function s(t, e, o, r, s) {
            if (s) {
                var n = (null == s ? void 0 : s.r) || 0;
                s.brBoxY = e - n, s.brBoxHeight = r + n
            }
            return i.roundedRect(t, e, o, r, s)
        }

        function n(t, e, o, r, s) {
            if (s) {
                var n = (null == s ? void 0 : s.r) || 0;
                s.brBoxHeight = r + n
            }
            return i.roundedRect(t, e, o, r, s)
        }

        return {
            compose: function t(e) {
                r(o, t) && ((i = e.prototype.symbols).bottombutton = s, i.topbutton = n)
            }
        }
    }), i(e, "Maps/MapNavigation.js", [e["Core/Defaults.js"], e["Core/Globals.js"], e["Maps/MapNavigationDefaults.js"], e["Maps/MapPointer.js"], e["Maps/MapSymbols.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s) {
        var n = t.setOptions, a = e.composed, h = s.addEvent, l = s.extend, c = s.merge, p = s.objectEach, d = s.pick,
            u = s.pushUnique;

        function f(t) {
            t && (t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        }

        return function () {
            function t(t) {
                this.chart = t, this.navButtons = []
            }

            return t.compose = function (e, s, l) {
                o.compose(s), r.compose(l), u(a, this.compose) && (h(e, "beforeRender", function () {
                    this.mapNavigation = new t(this), this.mapNavigation.update()
                }), n(i))
            }, t.prototype.update = function (t) {
                var e, i = this, o = i.chart, r = i.navButtons, s = function (t) {
                    this.handler.call(o, t), f(t)
                }, n = o.options.mapNavigation;
                for (t && (n = o.options.mapNavigation = c(o.options.mapNavigation, t)); r.length;) r.pop().destroy();
                !o.renderer.forExport && d(n.enableButtons, n.enabled) && (i.navButtonsGroup || (i.navButtonsGroup = o.renderer.g().attr({zIndex: 4}).add()), p(n.buttons, function (t, a) {
                    t = c(n.buttonOptions, t), !o.styledMode && t.theme && ((e = t.theme).style = c(t.theme.style, t.style));
                    var p, d = t.text, u = t.width, g = void 0 === u ? 0 : u, m = t.height, y = void 0 === m ? 0 : m,
                        v = t.padding, x = void 0 === v ? 0 : v,
                        b = o.renderer.button("+" !== d && "-" !== d && d || "", 0, 0, s, e, void 0, void 0, void 0, "zoomIn" === a ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + ({
                            zoomIn: "zoom-in",
                            zoomOut: "zoom-out"
                        })[a]).attr({
                            width: g,
                            height: y,
                            title: o.options.lang[a],
                            padding: t.padding,
                            zIndex: 5
                        }).add(i.navButtonsGroup);
                    if ("+" === d || "-" === d) {
                        var M = g + 1, C = [["M", x + 3, x + y / 2], ["L", x + M - 3, x + y / 2]];
                        "+" === d && C.push(["M", x + M / 2, x + 3], ["L", x + M / 2, x + y - 3]), o.renderer.path(C).addClass("highcharts-button-symbol").attr(o.styledMode ? {} : {
                            stroke: null === (p = t.style) || void 0 === p ? void 0 : p.color,
                            "stroke-width": 3,
                            "stroke-linecap": "round"
                        }).add(b)
                    }
                    if (b.handler = t.onclick, h(b.element, "dblclick", f), r.push(b), l(t, {
                        width: b.width,
                        height: 2 * (b.height || 0)
                    }), o.hasLoaded) b.align(t, !1, t.alignTo); else var S = h(o, "load", function () {
                        b.element && b.align(t, !1, t.alignTo), S()
                    })
                }), o.hasLoaded || h(o, "render", function () {
                    var t = o.exportingGroup && o.exportingGroup.getBBox();
                    if (t) {
                        var e = i.navButtonsGroup.getBBox();
                        if (!(e.x >= t.x + t.width || e.x + e.width <= t.x || e.y >= t.y + t.height || e.y + e.height <= t.y)) {
                            var r = -e.y - e.height + t.y - 5, s = t.y + t.height - e.y + 5,
                                a = n.buttonOptions && n.buttonOptions.verticalAlign;
                            i.navButtonsGroup.attr({translateY: "bottom" === a ? r : s})
                        }
                    }
                })), this.updateEvents(n)
            }, t.prototype.updateEvents = function (t) {
                var e = this.chart;
                d(t.enableDoubleClickZoom, t.enabled) || t.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || h(e.container, "dblclick", function (t) {
                    e.pointer.onContainerDblClick(t)
                }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick()), d(t.enableMouseWheelZoom, t.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || h(e.container, "wheel", function (t) {
                    return e.pointer.inClass(t.target, "highcharts-no-mousewheel") || (e.pointer.onContainerMouseWheel(t), f(t)), !1
                }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
            }, t
        }()
    }), i(e, "Series/ColorMapComposition.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = t.seriesTypes.column.prototype, r = e.addEvent, s = e.defined;
        return function (t) {
            function e(t) {
                this.moveToTopOnHover && this.graphic && this.graphic.attr({zIndex: t && "hover" === t.state ? 1 : 0})
            }

            t.pointMembers = {
                dataLabelOnNull: !0, moveToTopOnHover: !0, isValid: function () {
                    return null !== this.value && this.value !== 1 / 0 && this.value !== -1 / 0 && (void 0 === this.value || !isNaN(this.value))
                }
            }, t.seriesMembers = {
                colorKey: "value",
                axisTypes: ["xAxis", "yAxis", "colorAxis"],
                parallelArrays: ["x", "y", "value"],
                pointArrayMap: ["value"],
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                colorAttribs: function (t) {
                    var e = {};
                    return s(t.color) && (!t.state || "normal" === t.state) && (e[this.colorProp || "fill"] = t.color), e
                },
                pointAttribs: o.pointAttribs
            }, t.compose = function (t) {
                return r(t.prototype.pointClass, "afterSetState", e), t
            }
        }(i || (i = {})), i
    }), i(e, "Core/Chart/MapChart.js", [e["Core/Chart/Chart.js"], e["Core/Defaults.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r, s, n = this && this.__extends || (r = function (t, e) {
            return (r = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), a = e.getOptions, h = o.isNumber, l = o.merge, c = o.pick, p = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return n(e, t), e.prototype.init = function (e, i) {
                var o = a().credits, r = l({
                    chart: {panning: {enabled: !0, type: "xy"}, type: "map"},
                    credits: {
                        mapText: c(o.mapText, ' \xa9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                        mapTextFull: c(o.mapTextFull, "{geojson.copyright}")
                    },
                    mapView: {},
                    tooltip: {followTouchMove: !1}
                }, e);
                t.prototype.init.call(this, r, i)
            }, e.prototype.mapZoom = function (t, e, i, o, r) {
                this.mapView && (h(t) && (t = Math.log(t) / Math.log(.5)), this.mapView.zoomBy(t, h(e) && h(i) ? this.mapView.projection.inverse([e, i]) : void 0, h(o) && h(r) ? [o, r] : void 0))
            }, e
        }(t);
        return (s = p || (p = {})).maps = {}, s.mapChart = function (t, e, i) {
            return new s(t, e, i)
        }, s.splitPath = function (t) {
            var e;
            return e = "string" == typeof t ? (t = t.replace(/([A-Za-z])/g, " $1 ").replace(/^\s*/, "").replace(/\s*$/, "")).split(/[ ,;]+/).map(function (t) {
                return /[A-za-z]/.test(t) ? t : parseFloat(t)
            }) : t, i.prototype.pathToSegments(e)
        }, p
    }), i(e, "Maps/MapUtilities.js", [], function () {
        return {
            boundsFromPath: function (t) {
                var e, i = -Number.MAX_VALUE, o = Number.MAX_VALUE, r = -Number.MAX_VALUE, s = Number.MAX_VALUE;
                if (t.forEach(function (t) {
                    var n = t[t.length - 2], a = t[t.length - 1];
                    "number" == typeof n && "number" == typeof a && (o = Math.min(o, n), i = Math.max(i, n), s = Math.min(s, a), r = Math.max(r, a), e = !0)
                }), e) return {x1: o, y1: s, x2: i, y2: r}
            }, pointInPolygon: function (t, e) {
                var i, o, r = !1, s = t.x, n = t.y;
                for (i = 0, o = e.length - 1; i < e.length; o = i++) e[i][1] > n != e[o][1] > n && s < (e[o][0] - e[i][0]) * (n - e[i][1]) / (e[o][1] - e[i][1]) + e[i][0] && (r = !r);
                return r
            }
        }
    }), i(e, "Series/Map/MapPoint.js", [e["Series/ColorMapComposition.js"], e["Maps/MapUtilities.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r, s = this && this.__extends || (r = function (t, e) {
                return (r = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), n = e.boundsFromPath, a = i.seriesTypes.scatter.prototype.pointClass, h = o.extend, l = o.isNumber,
            c = o.pick, p = function (t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }

                return s(e, t), e.getProjectedPath = function (t, e) {
                    return t.projectedPath || (e && t.geometry ? (e.hasCoordinates = !0, t.projectedPath = e.path(t.geometry)) : t.projectedPath = t.path), t.projectedPath || []
                }, e.prototype.applyOptions = function (e, i) {
                    var o = this.series, r = t.prototype.applyOptions.call(this, e, i), s = o.joinBy;
                    if (o.mapData && o.mapMap) {
                        var n = s[1], a = t.prototype.getNestedProperty.call(this, n), l = void 0 !== a && o.mapMap[a];
                        l ? h(r, l) : -1 !== o.pointArrayMap.indexOf("value") && (r.value = r.value || null)
                    }
                    return r
                }, e.prototype.getProjectedBounds = function (t) {
                    var i = n(e.getProjectedPath(this, t)), o = this.properties, r = this.series.chart.mapView;
                    if (i) {
                        var s = o && o["hc-middle-lon"], a = o && o["hc-middle-lat"];
                        if (r && l(s) && l(a)) {
                            var h = t.forward([s, a]);
                            i.midX = h[0], i.midY = h[1]
                        } else {
                            var p = o && o["hc-middle-x"], d = o && o["hc-middle-y"];
                            i.midX = i.x1 + (i.x2 - i.x1) * c(this.middleX, l(p) ? p : .5);
                            var u = c(this.middleY, l(d) ? d : .5);
                            this.geometry || (u = 1 - u), i.midY = i.y2 - (i.y2 - i.y1) * u
                        }
                        return i
                    }
                }, e.prototype.onMouseOver = function (e) {
                    o.clearTimeout(this.colorInterval), !this.isNull && this.visible || this.series.options.nullInteraction ? t.prototype.onMouseOver.call(this, e) : this.series.onMouseOut()
                }, e.prototype.setVisible = function (t) {
                    this.visible = this.options.visible = !!t, this.dataLabel && this.dataLabel[t ? "show" : "hide"](), this.graphic && this.graphic.attr(this.series.pointAttribs(this))
                }, e.prototype.zoomTo = function (t) {
                    var e = this.series.chart, i = e.mapView, o = this.bounds;
                    if (i && o) {
                        var r = l(this.insetIndex) && i.insets[this.insetIndex];
                        if (r) {
                            var s = r.projectedUnitsToPixels({x: o.x1, y: o.y1}),
                                n = r.projectedUnitsToPixels({x: o.x2, y: o.y2}),
                                a = i.pixelsToProjectedUnits({x: s.x, y: s.y}),
                                h = i.pixelsToProjectedUnits({x: n.x, y: n.y});
                            o = {x1: a.x, y1: a.y, x2: h.x, y2: h.y}
                        }
                        i.fitToBounds(o, void 0, !1), this.series.isDirty = !0, e.redraw(t)
                    }
                }, e
            }(a);
        return h(p.prototype, {
            dataLabelOnNull: t.pointMembers.dataLabelOnNull,
            moveToTopOnHover: t.pointMembers.moveToTopOnHover,
            isValid: t.pointMembers.isValid
        }), p
    }), i(e, "Series/Map/MapSeriesDefaults.js", [e["Core/Utilities.js"]], function (t) {
        var e = t.isNumber;
        return {
            affectsMapView: !0,
            animation: !1,
            dataLabels: {
                crop: !1, formatter: function () {
                    var t = this.series.chart.numberFormatter, i = this.point.value;
                    return e(i) ? t(i, -1) : ""
                }, inside: !0, overflow: !1, padding: 0, verticalAlign: "middle"
            },
            linecap: "round",
            marker: null,
            nullColor: "#f7f7f7",
            stickyTracking: !1,
            tooltip: {followPointer: !0, pointFormat: "{point.name}: {point.value}<br/>"},
            turboThreshold: 0,
            allAreas: !0,
            borderColor: "#e6e6e6",
            borderWidth: 1,
            joinBy: "hc-key",
            states: {
                hover: {halo: void 0, borderColor: "#666666", borderWidth: 2},
                normal: {animation: !0},
                select: {color: "#cccccc"}
            },
            legendSymbol: "rectangle"
        }
    }), i(e, "Maps/MapViewDefaults.js", [], function () {
        return {
            center: [0, 0],
            fitToGeometry: void 0,
            maxZoom: void 0,
            padding: 0,
            projection: {name: void 0, parallels: void 0, rotation: void 0},
            zoom: void 0,
            insetOptions: {
                borderColor: "#cccccc",
                borderWidth: 1,
                padding: "10%",
                relativeTo: "mapBoundingBox",
                units: "percent"
            }
        }
    }), i(e, "Maps/GeoJSONComposition.js", [e["Core/Globals.js"], e["Core/Templating.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = t.composed, s = t.win, n = e.format, a = i.error, h = i.extend, l = i.merge, c = i.pushUnique,
            p = i.wrap;
        return function (t) {
            function e(t) {
                return this.mapView && this.mapView.lonLatToProjectedUnits(t)
            }

            function i(t) {
                return this.mapView && this.mapView.projectedUnitsToLonLat(t)
            }

            function o(t, e) {
                var i = this.options.chart.proj4 || s.proj4;
                if (!i) {
                    a(21, !1, this);
                    return
                }
                var o = e.jsonmarginX, r = e.jsonmarginY, n = e.jsonres, h = void 0 === n ? 1 : n, l = e.scale,
                    c = void 0 === l ? 1 : l, p = e.xoffset, d = e.xpan, u = e.yoffset, f = e.ypan,
                    g = i(e.crs, [t.lon, t.lat]), m = e.cosAngle || e.rotation && Math.cos(e.rotation),
                    y = e.sinAngle || e.rotation && Math.sin(e.rotation),
                    v = e.rotation ? [g[0] * m + g[1] * y, -g[0] * y + g[1] * m] : g;
                return {
                    x: ((v[0] - (void 0 === p ? 0 : p)) * c + (void 0 === d ? 0 : d)) * h + (void 0 === o ? 0 : o),
                    y: -((((void 0 === u ? 0 : u) - v[1]) * c + (void 0 === f ? 0 : f)) * h - (void 0 === r ? 0 : r))
                }
            }

            function d(t, e) {
                var i = this.options.chart.proj4 || s.proj4;
                if (!i) {
                    a(21, !1, this);
                    return
                }
                if (null !== t.y) {
                    var o = e.jsonmarginX, r = e.jsonmarginY, n = e.jsonres, h = void 0 === n ? 1 : n, l = e.scale,
                        c = void 0 === l ? 1 : l, p = e.xoffset, d = e.xpan, u = e.yoffset, f = e.ypan, g = {
                            x: ((t.x - (void 0 === o ? 0 : o)) / h - (void 0 === d ? 0 : d)) / c + (void 0 === p ? 0 : p),
                            y: ((t.y - (void 0 === r ? 0 : r)) / h + (void 0 === f ? 0 : f)) / c + (void 0 === u ? 0 : u)
                        }, m = e.cosAngle || e.rotation && Math.cos(e.rotation),
                        y = e.sinAngle || e.rotation && Math.sin(e.rotation),
                        v = i(e.crs, "WGS84", e.rotation ? {x: g.x * m + -(g.y * y), y: g.x * y + g.y * m} : g);
                    return {lat: v.y, lon: v.x}
                }
            }

            function u(t, e) {
                e || (e = Object.keys(t.objects)[0]);
                var i = t.objects[e];
                if (i["hc-decoded-geojson"]) return i["hc-decoded-geojson"];
                var o = t.arcs;
                if (t.transform) {
                    var r = t.arcs, s = t.transform, n = s.scale, a = s.translate, h = void 0, l = void 0, c = void 0;
                    o = [];
                    for (var p = 0, d = r.length; p < d; ++p) {
                        var u = r[p];
                        o.push(h = []), l = 0, c = 0;
                        for (var f = 0, g = u.length; f < g; ++f) h.push([(l += u[f][0]) * n[0] + a[0], (c += u[f][1]) * n[1] + a[1]])
                    }
                }
                for (var m = function (t) {
                    return "number" == typeof t[0] ? t.reduce(function (t, e, i) {
                        var r = e < 0 ? o[~e] : o[e];
                        return e < 0 ? (r = r.slice(0, 0 === i ? r.length : r.length - 1)).reverse() : i && (r = r.slice(1)), t.concat(r)
                    }, []) : t.map(m)
                }, y = i.geometries, v = [], p = 0, d = y.length; p < d; ++p) v.push({
                    type: "Feature",
                    properties: y[p].properties,
                    geometry: {type: y[p].type, coordinates: y[p].coordinates || m(y[p].arcs)}
                });
                var x = {
                    type: "FeatureCollection",
                    copyright: t.copyright,
                    copyrightShort: t.copyrightShort,
                    copyrightUrl: t.copyrightUrl,
                    features: v,
                    "hc-recommended-mapview": i["hc-recommended-mapview"],
                    bbox: t.bbox,
                    title: t.title
                };
                return i["hc-decoded-geojson"] = x, x
            }

            function f(t, e) {
                e = l(!0, this.options.credits, e), this.mapCredits && (e.href = void 0), t.call(this, e), this.credits && this.mapCreditsFull && this.credits.attr({title: this.mapCreditsFull})
            }

            t.compose = function t(s) {
                if (c(r, t)) {
                    var n = s.prototype;
                    n.fromLatLonToPoint = e, n.fromPointToLatLon = i, n.transformFromLatLon = o, n.transformToLatLon = d, p(n, "addCredits", f)
                }
            }, t.geojson = function (t, e, i) {
                void 0 === e && (e = "map");
                for (var o, r, s = [], a = "Topology" === t.type ? u(t) : t, l = a.features, c = 0, p = l.length; c < p; ++c) {
                    var d = l[c], f = d.geometry || {}, g = f.type, m = f.coordinates, y = d.properties, v = void 0;
                    if (("map" === e || "mapbubble" === e) && ("Polygon" === g || "MultiPolygon" === g) ? m.length && (v = {
                        geometry: {
                            coordinates: m,
                            type: g
                        }
                    }) : "mapline" === e && ("LineString" === g || "MultiLineString" === g) ? m.length && (v = {
                        geometry: {
                            coordinates: m,
                            type: g
                        }
                    }) : "mappoint" === e && "Point" === g && m.length && (v = {
                        geometry: {
                            coordinates: m,
                            type: g
                        }
                    }), v) {
                        var x = y && (y.name || y.NAME), b = y && y.lon, M = y && y.lat;
                        s.push(h(v, {
                            lat: "number" == typeof M ? M : void 0,
                            lon: "number" == typeof b ? b : void 0,
                            name: "string" == typeof x ? x : void 0,
                            properties: y
                        }))
                    }
                }
                return i && a.copyrightShort && (i.chart.mapCredits = n(null === (o = i.chart.options.credits) || void 0 === o ? void 0 : o.mapText, {geojson: a}), i.chart.mapCreditsFull = n(null === (r = i.chart.options.credits) || void 0 === r ? void 0 : r.mapTextFull, {geojson: a})), s
            }, t.topo2geo = u
        }(o || (o = {})), o
    }), i(e, "Core/Geometry/PolygonClip.js", [], function () {
        function t(t, o, r) {
            void 0 === r && (r = !0);
            for (var s, n, a, h = o[o.length - 1], l = t, c = 0; c < o.length; c++) {
                var p = l;
                s = o[c], l = [], n = r ? p[p.length - 1] : p[0];
                for (var d = 0; d < p.length; d++) e(h, s, a = p[d]) ? (e(h, s, n) || l.push(i(h, s, n, a)), l.push(a)) : e(h, s, n) && l.push(i(h, s, n, a)), n = a;
                h = s
            }
            return l
        }

        function e(t, e, i) {
            return (e[0] - t[0]) * (i[1] - t[1]) > (e[1] - t[1]) * (i[0] - t[0])
        }

        function i(t, e, i, o) {
            var r = [t[0] - e[0], t[1] - e[1]], s = [i[0] - o[0], i[1] - o[1]], n = t[0] * e[1] - t[1] * e[0],
                a = i[0] * o[1] - i[1] * o[0], h = 1 / (r[0] * s[1] - r[1] * s[0]),
                l = [(n * s[0] - a * r[0]) * h, (n * s[1] - a * r[1]) * h];
            return l.isIntersection = !0, l
        }

        return {
            clipLineString: function (e, i) {
                for (var o = [], r = t(e, i, !1), s = 1; s < r.length; s++) r[s].isIntersection && r[s - 1].isIntersection && (o.push(r.splice(0, s)), s = 0), s === r.length - 1 && o.push(r);
                return o
            }, clipPolygon: t
        }
    }), i(e, "Maps/Projections/LambertConformalConic.js", [], function () {
        var t = Math.sign || function (t) {
            return 0 === t ? 0 : t > 0 ? 1 : -1
        }, e = Math.PI / 180, i = Math.PI / 2, o = function (t) {
            return Math.tan((i + t) / 2)
        };
        return function () {
            function r(i) {
                var r, s = (i.parallels || []).map(function (t) {
                    return t * e
                }), n = s[0] || 0, a = null !== (r = s[1]) && void 0 !== r ? r : n, h = Math.cos(n);
                "object" == typeof i.projectedBounds && (this.projectedBounds = i.projectedBounds);
                var l = n === a ? Math.sin(n) : Math.log(h / Math.cos(a)) / Math.log(o(a) / o(n));
                1e-10 > Math.abs(l) && (l = 1e-10 * (t(l) || 1)), this.n = l, this.c = h * Math.pow(o(n), l) / l
            }

            return r.prototype.forward = function (t) {
                var r = this.c, s = this.n, n = this.projectedBounds, a = t[0] * e, h = t[1] * e;
                r > 0 ? h < -i + 1e-6 && (h = -i + 1e-6) : h > i - 1e-6 && (h = i - 1e-6);
                var l = r / Math.pow(o(h), s), c = l * Math.sin(s * a) * 63.78137,
                    p = (r - l * Math.cos(s * a)) * 63.78137, d = [c, p];
                return n && (c < n.x1 || c > n.x2 || p < n.y1 || p > n.y2) && (d.outside = !0), d
            }, r.prototype.inverse = function (o) {
                var r = this.c, s = this.n, n = o[0] / 63.78137, a = r - o[1] / 63.78137,
                    h = t(s) * Math.sqrt(n * n + a * a), l = Math.atan2(n, Math.abs(a)) * t(a);
                return a * s < 0 && (l -= Math.PI * t(n) * t(a)), [l / s / e, (2 * Math.atan(Math.pow(r / h, 1 / s)) - i) / e]
            }, r
        }()
    }), i(e, "Maps/Projections/EqualEarth.js", [], function () {
        var t = Math.sqrt(3) / 2;
        return function () {
            function e() {
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243,
                    y1: -97.52595454902263,
                    y2: 97.52595454902263
                }
            }

            return e.prototype.forward = function (e) {
                var i = Math.PI / 180, o = Math.asin(t * Math.sin(e[1] * i)), r = o * o, s = r * r * r;
                return [e[0] * i * Math.cos(o) * 74.03120656864502 / (t * (1.340264 + -.24331799999999998 * r + s * (.0062510000000000005 + .034164 * r))), 74.03120656864502 * o * (1.340264 + -.081106 * r + s * (893e-6 + .003796 * r))]
            }, e.prototype.inverse = function (e) {
                for (var i, o, r, s, n = e[0] / 74.03120656864502, a = e[1] / 74.03120656864502, h = 180 / Math.PI, l = a, c = 0; c < 12 && (o = (i = l * l) * i * i, r = l * (1.340264 + -.081106 * i + o * (893e-6 + .003796 * i)) - a, l -= s = r / (1.340264 + -.24331799999999998 * i + o * (.0062510000000000005 + .034164 * i)), !(1e-9 > Math.abs(s))); ++c) ;
                o = (i = l * l) * i * i;
                var p = h * t * n * (1.340264 + -.24331799999999998 * i + o * (.0062510000000000005 + .034164 * i)) / Math.cos(l),
                    d = h * Math.asin(Math.sin(l) / t);
                return Math.abs(p) > 180 ? [NaN, NaN] : [p, d]
            }, e
        }()
    }), i(e, "Maps/Projections/Miller.js", [], function () {
        var t = Math.PI / 4, e = Math.PI / 180;
        return function () {
            function i() {
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243,
                    y1: -146.91480769173063,
                    y2: 146.91480769173063
                }
            }

            return i.prototype.forward = function (i) {
                return [i[0] * e * 63.78137, 79.7267125 * Math.log(Math.tan(t + .4 * i[1] * e))]
            }, i.prototype.inverse = function (i) {
                return [i[0] / 63.78137 / e, 2.5 * (Math.atan(Math.exp(.8 * (i[1] / 63.78137))) - t) / e]
            }, i
        }()
    }), i(e, "Maps/Projections/Orthographic.js", [], function () {
        var t = Math.PI / 180;
        return function () {
            function e() {
                this.antimeridianCutting = !1, this.bounds = {
                    x1: -63.78460826781007,
                    x2: 63.78460826781007,
                    y1: -63.78460826781007,
                    y2: 63.78460826781007
                }
            }

            return e.prototype.forward = function (e) {
                var i = e[0], o = e[1] * t,
                    r = [Math.cos(o) * Math.sin(i * t) * 63.78460826781007, 63.78460826781007 * Math.sin(o)];
                return (i < -90 || i > 90) && (r.outside = !0), r
            }, e.prototype.inverse = function (e) {
                var i = e[0] / 63.78460826781007, o = e[1] / 63.78460826781007, r = Math.sqrt(i * i + o * o),
                    s = Math.asin(r), n = Math.sin(s);
                return [Math.atan2(i * n, r * Math.cos(s)) / t, Math.asin(r && o * n / r) / t]
            }, e
        }()
    }), i(e, "Maps/Projections/WebMercator.js", [], function () {
        var t = Math.PI / 180;
        return function () {
            function e() {
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243,
                    y1: -200.3750834278071,
                    y2: 200.3750834278071
                }, this.maxLatitude = 85.0511287798
            }

            return e.prototype.forward = function (e) {
                var i = Math.sin(e[1] * t), o = [63.78137 * e[0] * t, 63.78137 * Math.log((1 + i) / (1 - i)) / 2];
                return Math.abs(e[1]) > this.maxLatitude && (o.outside = !0), o
            }, e.prototype.inverse = function (e) {
                return [e[0] / (63.78137 * t), (2 * Math.atan(Math.exp(e[1] / 63.78137)) - Math.PI / 2) / t]
            }, e
        }()
    }), i(e, "Maps/Projections/ProjectionRegistry.js", [e["Maps/Projections/LambertConformalConic.js"], e["Maps/Projections/EqualEarth.js"], e["Maps/Projections/Miller.js"], e["Maps/Projections/Orthographic.js"], e["Maps/Projections/WebMercator.js"]], function (t, e, i, o, r) {
        return {EqualEarth: e, LambertConformalConic: t, Miller: i, Orthographic: o, WebMercator: r}
    }), i(e, "Maps/Projection.js", [e["Core/Geometry/PolygonClip.js"], e["Maps/Projections/ProjectionRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o = this && this.__spreadArray || function (t, e, i) {
            if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
            return t.concat(o || Array.prototype.slice.call(e))
        }, r = t.clipLineString, s = t.clipPolygon, n = i.clamp, a = i.erase, h = 2 * Math.PI / 360;

        function l(t) {
            return t < -180 && (t += 360), t > 180 && (t -= 360), t
        }

        return function () {
            function t(e) {
                void 0 === e && (e = {}), this.hasCoordinates = !1, this.hasGeoProjection = !1, this.maxLatitude = 90, this.options = e;
                var i = e.name, o = e.projectedBounds, r = e.rotation;
                this.rotator = r ? this.getRotator(r) : void 0;
                var s = i ? t.registry[i] : void 0;
                s && (this.def = new s(e));
                var n = this.def, a = this.rotator;
                n && (this.maxLatitude = n.maxLatitude || 90, this.hasGeoProjection = !0), a && n ? (this.forward = function (t) {
                    return n.forward(a.forward(t))
                }, this.inverse = function (t) {
                    return a.inverse(n.inverse(t))
                }) : n ? (this.forward = function (t) {
                    return n.forward(t)
                }, this.inverse = function (t) {
                    return n.inverse(t)
                }) : a && (this.forward = a.forward, this.inverse = a.inverse), this.bounds = "world" === o ? n && n.bounds : o
            }

            return t.add = function (e, i) {
                t.registry[e] = i
            }, t.greatCircle = function (t, e, i) {
                var o = Math.atan2, r = Math.cos, s = Math.sin, n = Math.sqrt, a = t[1] * h, l = t[0] * h, c = e[1] * h,
                    p = e[0] * h, d = c - a, u = p - l, f = s(d / 2) * s(d / 2) + r(a) * r(c) * s(u / 2) * s(u / 2),
                    g = 2 * o(n(f), n(1 - f)), m = Math.round(6371e3 * g / 5e5), y = [];
                if (i && y.push(t), m > 1) for (var v = 1 / m, x = v; x < .999; x += v) {
                    var b = s((1 - x) * g) / s(g), M = s(x * g) / s(g), C = b * r(a) * r(l) + M * r(c) * r(p),
                        S = b * r(a) * s(l) + M * r(c) * s(p), w = o(b * s(a) + M * s(c), n(C * C + S * S)),
                        k = o(S, C);
                    y.push([k / h, w / h])
                }
                return i && y.push(e), y
            }, t.insertGreatCircles = function (e) {
                for (var i = e.length - 1; i--;) if (Math.max(Math.abs(e[i][0] - e[i + 1][0]), Math.abs(e[i][1] - e[i + 1][1])) > 10) {
                    var r = t.greatCircle(e[i], e[i + 1]);
                    r.length && e.splice.apply(e, o([i + 1, 0], r, !1))
                }
            }, t.toString = function (t) {
                var e = t || {}, i = e.name, o = e.rotation;
                return [i, o && o.join(",")].join(";")
            }, t.prototype.lineIntersectsBounds = function (t) {
                var e, i = this.bounds || {}, o = i.x1, r = i.x2, s = i.y1, n = i.y2, a = function (t, e, i) {
                    var o = t[0], r = t[1], s = e ? 0 : 1;
                    if ("number" == typeof i && o[e] >= i != r[e] >= i) {
                        var n = (i - o[e]) / (r[e] - o[e]), a = o[s] + n * (r[s] - o[s]);
                        return e ? [a, i] : [i, a]
                    }
                }, h = t[0];
                return (e = a(t, 0, o)) ? (h = e, t[1] = e) : (e = a(t, 0, r)) && (h = e, t[1] = e), (e = a(t, 1, s)) ? h = e : (e = a(t, 1, n)) && (h = e), h
            }, t.prototype.getRotator = function (t) {
                var e = t[0] * h, i = (t[1] || 0) * h, o = (t[2] || 0) * h, r = Math.cos(i), s = Math.sin(i),
                    n = Math.cos(o), a = Math.sin(o);
                if (0 !== e || 0 !== i || 0 !== o) return {
                    forward: function (t) {
                        var i = t[0] * h + e, o = t[1] * h, l = Math.cos(o), c = Math.cos(i) * l, p = Math.sin(i) * l,
                            d = Math.sin(o), u = d * r + c * s;
                        return [Math.atan2(p * n - u * a, c * r - d * s) / h, Math.asin(u * n + p * a) / h]
                    }, inverse: function (t) {
                        var i = t[0] * h, o = t[1] * h, l = Math.cos(o), c = Math.cos(i) * l, p = Math.sin(i) * l,
                            d = Math.sin(o), u = d * n - p * a;
                        return [(Math.atan2(p * n + d * a, c * r + u * s) - e) / h, Math.asin(u * r - c * s) / h]
                    }
                }
            }, t.prototype.forward = function (t) {
                return t
            }, t.prototype.inverse = function (t) {
                return t
            }, t.prototype.cutOnAntimeridian = function (e, i) {
                for (var r, s = [], h = [e], c = 0, p = e.length; c < p; ++c) {
                    var d = e[c], u = e[c - 1];
                    if (!c) {
                        if (!i) continue;
                        u = e[e.length - 1]
                    }
                    var f = u[0], g = d[0];
                    if ((f < -90 || f > 90) && (g < -90 || g > 90) && f > 0 != g > 0) {
                        var m = n((180 - (f + 360) % 360) / ((g + 360) % 360 - (f + 360) % 360), 0, 1),
                            y = u[1] + m * (d[1] - u[1]);
                        s.push({i: c, lat: y, direction: f < 0 ? 1 : -1, previousLonLat: u, lonLat: d})
                    }
                }
                if (s.length) {
                    if (i) {
                        s.length % 2 == 1 && (r = s.slice().sort(function (t, e) {
                            return Math.abs(e.lat) - Math.abs(t.lat)
                        })[0], a(s, r));
                        for (var c = s.length - 2; c >= 0;) {
                            var v = s[c].i, x = l(180 + 1e-6 * s[c].direction), b = l(180 - 1e-6 * s[c].direction),
                                M = e.splice.apply(e, o([v, s[c + 1].i - v], t.greatCircle([x, s[c].lat], [x, s[c + 1].lat], !0), !1));
                            M.push.apply(M, t.greatCircle([b, s[c + 1].lat], [b, s[c].lat], !0)), h.push(M), c -= 2
                        }
                        if (r) for (var C = 0; C < h.length; C++) {
                            var S = r.direction, y = r.lat, w = h[C], k = w.indexOf(r.lonLat);
                            if (k > -1) {
                                for (var A = (y < 0 ? -1 : 1) * this.maxLatitude, f = l(180 + 1e-6 * S), g = l(180 - 1e-6 * S), T = t.greatCircle([f, y], [f, A], !0), P = f + 120 * S; P > -180 && P < 180; P += 120 * S) T.push([P, A]);
                                T.push.apply(T, t.greatCircle([g, A], [g, r.lat], !0)), w.splice.apply(w, o([k, 0], T, !1));
                                break
                            }
                        }
                    } else for (var c = s.length; c--;) {
                        var v = s[c].i, M = e.splice(v, e.length, [l(180 + 1e-6 * s[c].direction), s[c].lat]);
                        M.unshift([l(180 - 1e-6 * s[c].direction), s[c].lat]), h.push(M)
                    }
                }
                return h
            }, t.prototype.path = function (e) {
                var i, o = this, n = this.bounds, a = this.def, h = this.rotator, l = [],
                    c = "Polygon" === e.type || "MultiPolygon" === e.type, p = this.hasGeoProjection,
                    d = !a || !1 !== a.antimeridianCutting, u = d ? h : void 0, f = d && a || this;
                n && (i = [[n.x1, n.y1], [n.x2, n.y1], [n.x2, n.y2], [n.x1, n.y2]]);
                var g = function (e) {
                    var a = e.map(function (t) {
                        if (d) {
                            u && (t = u.forward(t));
                            var e = t[0];
                            1e-6 > Math.abs(e - 180) && (e = e < 180 ? 179.999999 : 180.000001), t = [e, t[1]]
                        }
                        return t
                    }), h = [a];
                    p && (t.insertGreatCircles(a), d && (h = o.cutOnAntimeridian(a, c))), h.forEach(function (e) {
                        if (!(e.length < 2)) {
                            var o, a, h = !1, u = !1, g = function (t) {
                                h ? l.push(["L", t[0], t[1]]) : (l.push(["M", t[0], t[1]]), h = !0)
                            }, m = !1, y = !1, v = e.map(function (t) {
                                var e = f.forward(t);
                                return e.outside ? m = !0 : y = !0, e[1] === 1 / 0 ? e[1] = 1e10 : e[1] === -1 / 0 && (e[1] = -1e10), e
                            });
                            if (d) {
                                if (c && v.push(v[0]), m) {
                                    if (!y) return;
                                    if (i) {
                                        if (c) v = s(v, i); else if (n) {
                                            r(v, i).forEach(function (t) {
                                                h = !1, t.forEach(g)
                                            });
                                            return
                                        }
                                    }
                                }
                                v.forEach(g)
                            } else for (var x = 0; x < v.length; x++) {
                                var b = e[x], M = v[x];
                                M.outside ? u = !0 : (c && !o && (o = b, e.push(b), v.push(M)), u && a && (c && p ? t.greatCircle(a, b).forEach(function (t) {
                                    return g(f.forward(t))
                                }) : h = !1), g(M), a = b, u = !1)
                            }
                        }
                    })
                };
                return "LineString" === e.type ? g(e.coordinates) : "MultiLineString" === e.type ? e.coordinates.forEach(function (t) {
                    return g(t)
                }) : "Polygon" === e.type ? (e.coordinates.forEach(function (t) {
                    return g(t)
                }), l.length && l.push(["Z"])) : "MultiPolygon" === e.type && (e.coordinates.forEach(function (t) {
                    t.forEach(function (t) {
                        return g(t)
                    })
                }), l.length && l.push(["Z"])), l
            }, t.registry = e, t
        }()
    }), i(e, "Maps/MapView.js", [e["Core/Globals.js"], e["Maps/MapViewDefaults.js"], e["Maps/GeoJSONComposition.js"], e["Maps/MapUtilities.js"], e["Maps/Projection.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s) {
        var n, a = this && this.__extends || (n = function (t, e) {
                return (n = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                n(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), h = this && this.__spreadArray || function (t, e, i) {
                if (i || 2 == arguments.length) for (var o, r = 0, s = e.length; r < s; r++) !o && r in e || (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
                return t.concat(o || Array.prototype.slice.call(e))
            }, l = t.composed, c = i.topo2geo, p = o.boundsFromPath, d = o.pointInPolygon, u = s.addEvent, f = s.clamp,
            g = s.fireEvent, m = s.isArray, y = s.isNumber, v = s.isObject, x = s.isString, b = s.merge, M = s.pick,
            C = s.pushUnique, S = s.relativeLength, w = {};

        function k(t, e) {
            var i = e.width, o = e.height;
            return Math.log(400.979322 / Math.max((t.x2 - t.x1) / (i / 256), (t.y2 - t.y1) / (o / 256))) / Math.log(2)
        }

        var A = function () {
            function t(i, o) {
                var s, n, a = this;
                if (this.allowTransformAnimation = !0, this.eventsToUnbind = [], this.insets = [], this.padding = [0, 0, 0, 0], !(this instanceof T)) {
                    var l = h([i.options.chart.map], (i.options.series || []).map(function (t) {
                        return t.mapData
                    }), !0).map(function (t) {
                        return a.getGeoMap(t)
                    }), c = [];
                    l.forEach(function (t) {
                        if (t && (s || (s = t["hc-recommended-mapview"]), t.bbox)) {
                            var e = t.bbox, i = e[0], o = e[1], r = e[2], n = e[3];
                            c.push({x1: i, y1: o, x2: r, y2: n})
                        }
                    });
                    var p = c.length && t.compositeBounds(c);
                    g(i, "beforeMapViewInit", {geoBounds: p}, function () {
                        if (p) {
                            var t = p.x1, e = p.y1, i = p.x2, o = p.y2;
                            n = i - t > 180 && o - e > 90 ? {name: "EqualEarth"} : {
                                name: "LambertConformalConic",
                                parallels: [e, o],
                                rotation: [-(t + i) / 2]
                            }
                        }
                    }), this.geoMap = l[0]
                }
                this.userOptions = o || {}, i.options.mapView && i.options.mapView.recommendedMapView && (s = i.options.mapView.recommendedMapView);
                var d = b(e, {projection: n}, s, o), f = s && s.insets, m = o && o.insets;
                f && m && (d.insets = t.mergeInsets(f, m)), this.chart = i, this.center = d.center, this.options = d, this.projection = new r(d.projection), this.playingField = i.plotBox, this.zoom = d.zoom || 0, this.minZoom = d.minZoom, this.createInsets(), this.eventsToUnbind.push(u(i, "afterSetChartSize", function () {
                    a.playingField = a.getField(), (void 0 === a.minZoom || a.minZoom === a.zoom) && (a.fitToBounds(void 0, void 0, !1), !a.chart.hasRendered && y(a.userOptions.zoom) && (a.zoom = a.userOptions.zoom), a.userOptions.center && b(!0, a.center, a.userOptions.center))
                })), this.setUpEvents()
            }

            return t.compose = function (e) {
                C(l, this.compose) && (w = e.maps, u(e, "afterInit", function () {
                    this.mapView = new t(this, this.options.mapView)
                }, {order: 0}))
            }, t.compositeBounds = function (t) {
                if (t.length) return t.slice(1).reduce(function (t, e) {
                    return t.x1 = Math.min(t.x1, e.x1), t.y1 = Math.min(t.y1, e.y1), t.x2 = Math.max(t.x2, e.x2), t.y2 = Math.max(t.y2, e.y2), t
                }, b(t[0]))
            }, t.mergeInsets = function (t, e) {
                var i = function (t) {
                    var e = {};
                    return t.forEach(function (t, i) {
                        e[t && t.id || "i".concat(i)] = t
                    }), e
                }, o = b(i(t), i(e));
                return Object.keys(o).map(function (t) {
                    return o[t]
                })
            }, t.prototype.createInsets = function () {
                var t = this, e = this.options, i = e.insets;
                i && i.forEach(function (i) {
                    var o = new T(t, b(e.insetOptions, i));
                    t.insets.push(o)
                })
            }, t.prototype.fitToBounds = function (t, e, i, o) {
                void 0 === i && (i = !0);
                var r = t || this.getProjectedBounds();
                if (r) {
                    var s = M(e, t ? 0 : this.options.padding), n = this.getField(!1), a = m(s) ? s : [s, s, s, s];
                    this.padding = [S(a[0], n.height), S(a[1], n.width), S(a[2], n.height), S(a[3], n.width)], this.playingField = this.getField();
                    var h = k(r, this.playingField);
                    t || (this.minZoom = h);
                    var l = this.projection.inverse([(r.x2 + r.x1) / 2, (r.y2 + r.y1) / 2]);
                    this.setView(l, h, i, o)
                }
            }, t.prototype.getField = function (t) {
                void 0 === t && (t = !0);
                var e = t ? this.padding : [0, 0, 0, 0];
                return {
                    x: e[3],
                    y: e[0],
                    width: this.chart.plotWidth - e[1] - e[3],
                    height: this.chart.plotHeight - e[0] - e[2]
                }
            }, t.prototype.getGeoMap = function (t) {
                if (x(t)) return w[t] && "Topology" === w[t].type ? c(w[t]) : w[t];
                if (v(t, !0)) {
                    if ("FeatureCollection" === t.type) return t;
                    if ("Topology" === t.type) return c(t)
                }
            }, t.prototype.getMapBBox = function () {
                var t = this.getProjectedBounds(), e = this.getScale();
                if (t) {
                    var i = this.padding, o = this.projectedUnitsToPixels({x: t.x1, y: t.y2});
                    return {
                        width: (t.x2 - t.x1) * e + i[1] + i[3],
                        height: (t.y2 - t.y1) * e + i[0] + i[2],
                        x: o.x - i[3],
                        y: o.y - i[0]
                    }
                }
            }, t.prototype.getProjectedBounds = function () {
                var e = this.projection, i = this.chart.series.reduce(function (t, e) {
                    var i = e.getProjectedBounds && e.getProjectedBounds();
                    return i && !1 !== e.options.affectsMapView && t.push(i), t
                }, []), o = this.options.fitToGeometry;
                if (o) {
                    if (!this.fitToGeometryCache) {
                        if ("MultiPoint" === o.type) {
                            var r = o.coordinates.map(function (t) {
                                return e.forward(t)
                            }), s = r.map(function (t) {
                                return t[0]
                            }), n = r.map(function (t) {
                                return t[1]
                            });
                            this.fitToGeometryCache = {
                                x1: Math.min.apply(0, s),
                                x2: Math.max.apply(0, s),
                                y1: Math.min.apply(0, n),
                                y2: Math.max.apply(0, n)
                            }
                        } else this.fitToGeometryCache = p(e.path(o))
                    }
                    return this.fitToGeometryCache
                }
                return this.projection.bounds || t.compositeBounds(i)
            }, t.prototype.getScale = function () {
                return 256 / 400.979322 * Math.pow(2, this.zoom)
            }, t.prototype.getSVGTransform = function () {
                var t = this.playingField, e = t.x, i = t.y, o = t.width, r = t.height,
                    s = this.projection.forward(this.center), n = this.projection.hasCoordinates ? -1 : 1,
                    a = this.getScale(), h = a * n, l = e + o / 2 - s[0] * a, c = i + r / 2 - s[1] * h;
                return {scaleX: a, scaleY: h, translateX: l, translateY: c}
            }, t.prototype.lonLatToPixels = function (t) {
                var e = this.lonLatToProjectedUnits(t);
                if (e) return this.projectedUnitsToPixels(e)
            }, t.prototype.lonLatToProjectedUnits = function (t) {
                var e = this.chart, i = e.mapTransforms;
                if (i) {
                    for (var o in i) if (Object.hasOwnProperty.call(i, o) && i[o].hitZone) {
                        var r = e.transformFromLatLon(t, i[o]);
                        if (r && d(r, i[o].hitZone.coordinates[0])) return r
                    }
                    return e.transformFromLatLon(t, i.default)
                }
                for (var s = 0, n = this.insets; s < n.length; s++) {
                    var a = n[s];
                    if (a.options.geoBounds && d({x: t.lon, y: t.lat}, a.options.geoBounds.coordinates[0])) {
                        var h = a.projection.forward([t.lon, t.lat]), l = a.projectedUnitsToPixels({x: h[0], y: h[1]});
                        return this.pixelsToProjectedUnits(l)
                    }
                }
                var c = this.projection.forward([t.lon, t.lat]);
                if (!c.outside) return {x: c[0], y: c[1]}
            }, t.prototype.projectedUnitsToLonLat = function (t) {
                var e = this.chart, i = e.mapTransforms;
                if (i) {
                    for (var o in i) if (Object.hasOwnProperty.call(i, o) && i[o].hitZone && d(t, i[o].hitZone.coordinates[0])) return e.transformToLatLon(t, i[o]);
                    return e.transformToLatLon(t, i.default)
                }
                for (var r = this.projectedUnitsToPixels(t), s = 0, n = this.insets; s < n.length; s++) {
                    var a = n[s];
                    if (a.hitZone && d(r, a.hitZone.coordinates[0])) {
                        var h = a.pixelsToProjectedUnits(r), l = a.projection.inverse([h.x, h.y]);
                        return {lon: l[0], lat: l[1]}
                    }
                }
                var c = this.projection.inverse([t.x, t.y]);
                return {lon: c[0], lat: c[1]}
            }, t.prototype.redraw = function (t) {
                this.chart.series.forEach(function (t) {
                    t.useMapGeometry && (t.isDirty = !0)
                }), this.chart.redraw(t)
            }, t.prototype.setView = function (t, e, i, o) {
                void 0 === i && (i = !0), t && (this.center = t), "number" == typeof e && ("number" == typeof this.minZoom && (e = Math.max(e, this.minZoom)), "number" == typeof this.options.maxZoom && (e = Math.min(e, this.options.maxZoom)), y(e) && (this.zoom = e));
                var r = this.getProjectedBounds();
                if (r) {
                    var s = this.projection.forward(this.center), n = this.playingField, a = n.x, h = n.y, l = n.width,
                        c = n.height, p = this.getScale(), d = this.projectedUnitsToPixels({x: r.x1, y: r.y1}),
                        u = this.projectedUnitsToPixels({x: r.x2, y: r.y2}), f = [(r.x1 + r.x2) / 2, (r.y1 + r.y2) / 2];
                    if (!this.chart.series.some(function (t) {
                        return t.isDrilling
                    })) {
                        var m = d.x, v = u.y, x = u.x, b = d.y;
                        x - m < l ? s[0] = f[0] : m < a && x < a + l ? s[0] += Math.max(m - a, x - l - a) / p : x > a + l && m > a && (s[0] += Math.min(x - l - a, m - a) / p), b - v < c ? s[1] = f[1] : v < h && b < h + c ? s[1] -= Math.max(v - h, b - c - h) / p : b > h + c && v > h && (s[1] -= Math.min(b - c - h, v - h) / p), this.center = this.projection.inverse(s)
                    }
                    this.insets.forEach(function (t) {
                        t.options.field && (t.hitZone = t.getHitZone(), t.playingField = t.getField())
                    }), this.render()
                }
                g(this, "afterSetView"), i && this.redraw(o)
            }, t.prototype.projectedUnitsToPixels = function (t) {
                var e = this.getScale(), i = this.projection.forward(this.center), o = this.playingField,
                    r = o.x + o.width / 2, s = o.y + o.height / 2;
                return {x: r - e * (i[0] - t.x), y: s + e * (i[1] - t.y)}
            }, t.prototype.pixelsToLonLat = function (t) {
                return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(t))
            }, t.prototype.pixelsToProjectedUnits = function (t) {
                var e = t.x, i = t.y, o = this.getScale(), r = this.projection.forward(this.center),
                    s = this.playingField, n = s.x + s.width / 2, a = s.y + s.height / 2;
                return {x: r[0] + (e - n) / o, y: r[1] - (i - a) / o}
            }, t.prototype.setUpEvents = function () {
                var t, e, i, o = this, r = this.chart, s = function (s) {
                    var n = r.pointer.pinchDown, a = o.projection, h = r.mouseDownX, l = r.mouseDownY;
                    if (1 === n.length && (h = n[0].chartX, l = n[0].chartY), "number" == typeof h && "number" == typeof l) {
                        var c = "".concat(h, ",").concat(l), p = s.originalEvent, d = p.chartX, u = p.chartY;
                        c !== e && (e = c, t = o.projection.forward(o.center), i = (o.projection.options.rotation || [0, 0]).slice());
                        var g = a.def && a.def.bounds, m = g && k(g, o.playingField) || -1 / 0;
                        if ("Orthographic" === a.options.name && (o.minZoom || 1 / 0) < 1.3 * m) {
                            var v = 440 / (o.getScale() * Math.min(r.plotWidth, r.plotHeight));
                            if (i) {
                                var x = (h - d) * v - i[0], b = f(-i[1] - (l - u) * v, -80, 80), M = o.zoom;
                                o.update({projection: {rotation: [-x, -b]}}, !1), o.fitToBounds(void 0, void 0, !1), o.zoom = M, r.redraw(!1)
                            }
                        } else if (y(d) && y(u)) {
                            var C = o.getScale(), S = o.projection.hasCoordinates ? 1 : -1,
                                w = o.projection.inverse([t[0] + (h - d) / C, t[1] - (l - u) / C * S]);
                            isNaN(w[0] + w[1]) || o.setView(w, void 0, !0, !1)
                        }
                        s.preventDefault()
                    }
                };
                u(r, "pan", s), u(r, "touchpan", s), u(r, "selection", function (t) {
                    if (t.resetSelection) o.zoomBy(); else {
                        var e = t.x - r.plotLeft, i = t.y - r.plotTop, s = o.pixelsToProjectedUnits({x: e, y: i}),
                            n = s.y, a = s.x, h = o.pixelsToProjectedUnits({x: e + t.width, y: i + t.height}), l = h.y,
                            c = h.x;
                        o.fitToBounds({
                            x1: a,
                            y1: n,
                            x2: c,
                            y2: l
                        }, void 0, !0, !t.originalEvent.touches && void 0), /^touch/.test(t.originalEvent.type) || r.showResetZoom(), t.preventDefault()
                    }
                })
            }, t.prototype.render = function () {
                this.group || (this.group = this.chart.renderer.g("map-view").attr({zIndex: 4}).add())
            }, t.prototype.update = function (t, e, i) {
                void 0 === e && (e = !0);
                var o = t.projection, s = o && r.toString(o) !== r.toString(this.options.projection), n = !1;
                b(!0, this.userOptions, t), b(!0, this.options, t), "insets" in t && (this.insets.forEach(function (t) {
                    return t.destroy()
                }), this.insets.length = 0, n = !0), (s || "fitToGeometry" in t) && delete this.fitToGeometryCache, (s || n) && (this.chart.series.forEach(function (t) {
                    var e = t.transformGroups;
                    if (t.clearBounds && t.clearBounds(), t.isDirty = !0, t.isDirtyData = !0, n && e) for (; e.length > 1;) {
                        var i = e.pop();
                        i && i.destroy()
                    }
                }), s && (this.projection = new r(this.options.projection)), n && this.createInsets(), !t.center && Object.hasOwnProperty.call(t, "zoom") && !y(t.zoom) && this.fitToBounds(void 0, void 0, !1)), t.center || y(t.zoom) ? this.setView(this.options.center, t.zoom, !1) : "fitToGeometry" in t && this.fitToBounds(void 0, void 0, !1), e && this.chart.redraw(i)
            }, t.prototype.zoomBy = function (t, e, i, o) {
                var r = this.chart, s = this.projection.forward(this.center), n = e ? this.projection.forward(e) : [],
                    a = n[0], h = n[1];
                if ("number" == typeof t) {
                    var l = this.zoom + t, c = void 0;
                    if (i) {
                        var p = i[0], d = i[1], u = this.getScale(), f = p - r.plotLeft - r.plotWidth / 2,
                            g = d - r.plotTop - r.plotHeight / 2;
                        a = s[0] + f / u, h = s[1] + g / u
                    }
                    if ("number" == typeof a && "number" == typeof h) {
                        var u = 1 - Math.pow(2, this.zoom) / Math.pow(2, l), f = s[0] - a, g = s[1] - h;
                        s[0] -= f * u, s[1] += g * u, c = this.projection.inverse(s)
                    }
                    this.setView(c, l, void 0, o)
                } else this.fitToBounds(void 0, void 0, void 0, o)
            }, t
        }(), T = function (t) {
            function e(e, i) {
                var o = t.call(this, e.chart, i) || this;
                if (o.id = i.id, o.mapView = e, o.options = b({center: [0, 0]}, e.options.insetOptions, i), o.allBounds = [], o.options.geoBounds) {
                    var r = e.projection.path(o.options.geoBounds);
                    o.geoBoundsProjectedBox = p(r), o.geoBoundsProjectedPolygon = r.map(function (t) {
                        return [t[1] || 0, t[2] || 0]
                    })
                }
                return o
            }

            return a(e, t), e.prototype.getField = function (e) {
                void 0 === e && (e = !0);
                var i = this.hitZone;
                if (i) {
                    var o = e ? this.padding : [0, 0, 0, 0], r = i.coordinates[0], s = r.map(function (t) {
                            return t[0]
                        }), n = r.map(function (t) {
                            return t[1]
                        }), a = Math.min.apply(0, s) + o[3], h = Math.max.apply(0, s) - o[1],
                        l = Math.min.apply(0, n) + o[0], c = Math.max.apply(0, n) - o[2];
                    if (y(a) && y(l)) return {x: a, y: l, width: h - a, height: c - l}
                }
                return t.prototype.getField.call(this, e)
            }, e.prototype.getHitZone = function () {
                var t = this.chart, e = this.mapView, i = this.options, o = (i.field || {}).coordinates;
                if (o) {
                    var r = o[0];
                    if ("percent" === i.units) {
                        var s = "mapBoundingBox" === i.relativeTo && e.getMapBBox() || b(t.plotBox, {x: 0, y: 0});
                        r = r.map(function (t) {
                            return [S("".concat(t[0], "%"), s.width, s.x), S("".concat(t[1], "%"), s.height, s.y)]
                        })
                    }
                    return {type: "Polygon", coordinates: [r]}
                }
            }, e.prototype.getProjectedBounds = function () {
                return A.compositeBounds(this.allBounds)
            }, e.prototype.isInside = function (t) {
                var e = this.geoBoundsProjectedBox, i = this.geoBoundsProjectedPolygon;
                return !!(e && t.x >= e.x1 && t.x <= e.x2 && t.y >= e.y1 && t.y <= e.y2 && i && d(t, i))
            }, e.prototype.render = function () {
                var t = this.chart, e = this.mapView, i = this.options, o = i.borderPath || i.field;
                if (o && e.group) {
                    var r = !0;
                    this.border || (this.border = t.renderer.path().addClass("highcharts-mapview-inset-border").add(e.group), r = !1), t.styledMode || this.border.attr({
                        stroke: i.borderColor,
                        "stroke-width": i.borderWidth
                    });
                    var s = Math.round(this.border.strokeWidth()) % 2 / 2,
                        n = "mapBoundingBox" === i.relativeTo && e.getMapBBox() || e.playingField,
                        a = (o.coordinates || []).reduce(function (e, o) {
                            return o.reduce(function (e, o, r) {
                                var a = o[0], h = o[1];
                                return "percent" === i.units && (a = t.plotLeft + S("".concat(a, "%"), n.width, n.x), h = t.plotTop + S("".concat(h, "%"), n.height, n.y)), a = Math.floor(a) + s, h = Math.floor(h) + s, e.push(0 === r ? ["M", a, h] : ["L", a, h]), e
                            }, e)
                        }, []);
                    this.border[r ? "animate" : "attr"]({d: a})
                }
            }, e.prototype.destroy = function () {
                this.border && (this.border = this.border.destroy()), this.eventsToUnbind.forEach(function (t) {
                    return t()
                })
            }, e.prototype.setUpEvents = function () {
            }, e
        }(A);
        return A
    }), i(e, "Series/Map/MapSeries.js", [e["Core/Animation/AnimationUtilities.js"], e["Series/ColorMapComposition.js"], e["Series/CenteredUtilities.js"], e["Core/Globals.js"], e["Core/Chart/MapChart.js"], e["Series/Map/MapPoint.js"], e["Series/Map/MapSeriesDefaults.js"], e["Maps/MapView.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s, n, a, h, l) {
        var c, p = this && this.__extends || (c = function (t, e) {
                return (c = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                c(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), d = t.animObject, u = t.stop, f = o.noop, g = r.splitPath, m = h.seriesTypes, y = m.column, v = m.scatter,
            x = l.extend, b = l.find, M = l.fireEvent, C = l.getNestedProperty, S = l.isArray, w = l.defined,
            k = l.isNumber, A = l.isObject, T = l.merge, P = l.objectEach, L = l.pick, j = l.splat, O = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.processedData = [], e
                }

                return p(e, t), e.prototype.animate = function (t) {
                    var e = this.chart, i = this.group, o = d(this.options.animation);
                    t ? i.attr({
                        translateX: e.plotLeft + e.plotWidth / 2,
                        translateY: e.plotTop + e.plotHeight / 2,
                        scaleX: .001,
                        scaleY: .001
                    }) : i.animate({translateX: e.plotLeft, translateY: e.plotTop, scaleX: 1, scaleY: 1}, o)
                }, e.prototype.clearBounds = function () {
                    this.points.forEach(function (t) {
                        delete t.bounds, delete t.insetIndex, delete t.projectedPath
                    }), delete this.bounds
                }, e.prototype.doFullTranslate = function () {
                    return !!(this.isDirtyData || this.chart.isResizing || !this.hasRendered)
                }, e.prototype.drawMapDataLabels = function () {
                    t.prototype.drawDataLabels.call(this), this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
                }, e.prototype.drawPoints = function () {
                    var t = this, e = this, i = this.chart, o = this.group, r = this.transformGroups,
                        s = void 0 === r ? [] : r, n = i.mapView, a = i.renderer;
                    if (n) {
                        this.transformGroups = s, s[0] || (s[0] = a.g().add(o));
                        for (var h = 0, l = n.insets.length; h < l; ++h) s[h + 1] || s.push(a.g().add(o));
                        this.doFullTranslate() && (this.points.forEach(function (t) {
                            var e = t.graphic;
                            t.shapeArgs, t.group = s["number" == typeof t.insetIndex ? t.insetIndex + 1 : 0], e && e.parentGroup !== t.group && e.add(t.group)
                        }), y.prototype.drawPoints.apply(this), this.points.forEach(function (o) {
                            var r = o.graphic;
                            if (r) {
                                var s = r.animate, n = "";
                                o.name && (n += "highcharts-name-" + o.name.replace(/ /g, "-").toLowerCase()), o.properties && o.properties["hc-key"] && (n += " highcharts-key-" + o.properties["hc-key"].toString().toLowerCase()), n && r.addClass(n), i.styledMode && r.css(t.pointAttribs(o, o.selected && "select" || void 0)), r.animate = function (t, o, n) {
                                    var a = k(t["stroke-width"]) && !k(r["stroke-width"]),
                                        h = k(r["stroke-width"]) && !k(t["stroke-width"]);
                                    if (a || h) {
                                        var l = L(e.getStrokeWidth(e.options), 1) / (i.mapView && i.mapView.getScale() || 1);
                                        a && (r["stroke-width"] = l), h && (t["stroke-width"] = l)
                                    }
                                    return s.call(r, t, o, h ? function () {
                                        r.element.removeAttribute("stroke-width"), delete r["stroke-width"], n && n.apply(this, arguments)
                                    } : n)
                                }
                            }
                        })), s.forEach(function (o, r) {
                            var s = (0 === r ? n : n.insets[r - 1]).getSVGTransform(),
                                h = L(t.getStrokeWidth(t.options), 1), l = s.scaleX, c = s.scaleY > 0 ? 1 : -1,
                                p = function (i) {
                                    (e.points || []).forEach(function (e) {
                                        var o, r = e.graphic;
                                        r && r["stroke-width"] && (o = t.getStrokeWidth(e.options)) && r.attr({"stroke-width": o / i})
                                    })
                                };
                            if (a.globalAnimation && i.hasRendered && n.allowTransformAnimation) {
                                var f = Number(o.attr("translateX")), g = Number(o.attr("translateY")),
                                    m = Number(o.attr("scaleX")), y = function (t, e) {
                                        var i = m + (l - m) * e.pos;
                                        o.attr({
                                            translateX: f + (s.translateX - f) * e.pos,
                                            translateY: g + (s.translateY - g) * e.pos,
                                            scaleX: i,
                                            scaleY: i * c,
                                            "stroke-width": h / i
                                        }), p(i)
                                    }, v = T(d(a.globalAnimation)), x = v.step;
                                v.step = function () {
                                    x && x.apply(this, arguments), y.apply(this, arguments)
                                }, o.attr({animator: 0}).animate({animator: 1}, v, (function () {
                                    "boolean" != typeof a.globalAnimation && a.globalAnimation.complete && a.globalAnimation.complete({applyDrilldown: !0}), M(this, "mapZoomComplete")
                                }).bind(t))
                            } else u(o), o.attr(T(s, {"stroke-width": h / l})), p(l)
                        }), this.isDrilling || this.drawMapDataLabels()
                    }
                }, e.prototype.getProjectedBounds = function () {
                    var t = this;
                    if (!this.bounds && this.chart.mapView) {
                        var e = this.chart.mapView, i = e.insets, o = e.projection, r = [];
                        (this.points || []).forEach(function (e) {
                            if (e.path || e.geometry) {
                                if ("string" == typeof e.path ? e.path = g(e.path) : S(e.path) && "M" === e.path[0] && (e.path = t.chart.renderer.pathToSegments(e.path)), !e.bounds) {
                                    var s = e.getProjectedBounds(o);
                                    if (s) {
                                        e.labelrank = L(e.labelrank, (s.x2 - s.x1) * (s.y2 - s.y1));
                                        var n = s.midX, a = s.midY;
                                        if (i && k(n) && k(a)) {
                                            var h = b(i, function (t) {
                                                return t.isInside({x: n, y: a})
                                            });
                                            h && (delete e.projectedPath, (s = e.getProjectedBounds(h.projection)) && h.allBounds.push(s), e.insetIndex = i.indexOf(h))
                                        }
                                        e.bounds = s
                                    }
                                }
                                e.bounds && void 0 === e.insetIndex && r.push(e.bounds)
                            }
                        }), this.bounds = a.compositeBounds(r)
                    }
                    return this.bounds
                }, e.prototype.getStrokeWidth = function (t) {
                    var e = this.pointAttrToOptions;
                    return t[e && e["stroke-width"] || "borderWidth"]
                }, e.prototype.hasData = function () {
                    return !!this.processedXData.length
                }, e.prototype.pointAttribs = function (t, e) {
                    var i, o = t.series.chart, r = o.mapView,
                        s = o.styledMode ? this.colorAttribs(t) : y.prototype.pointAttribs.call(this, t, e),
                        n = this.getStrokeWidth(t.options);
                    if (e) {
                        var a = T(this.options.states && this.options.states[e], t.options.states && t.options.states[e] || {}),
                            h = this.getStrokeWidth(a);
                        w(h) && (n = h), s.stroke = null !== (i = a.borderColor) && void 0 !== i ? i : t.color
                    }
                    n && r && (n /= r.getScale());
                    var l = this.getStrokeWidth(this.options);
                    return s.dashstyle && r && k(l) && (n = l / r.getScale()), t.visible || (s.fill = this.options.nullColor), w(n) ? s["stroke-width"] = n : delete s["stroke-width"], s["stroke-linecap"] = s["stroke-linejoin"] = this.options.linecap, s
                }, e.prototype.updateData = function () {
                    return !this.processedData && t.prototype.updateData.apply(this, arguments)
                }, e.prototype.setData = function (e, i, o, r) {
                    void 0 === i && (i = !0), delete this.bounds, t.prototype.setData.call(this, e, !1, void 0, r), this.processData(), this.generatePoints(), i && this.chart.redraw(o)
                }, e.prototype.processData = function () {
                    var t, e, i, r = this.options, n = r.data, a = this.chart, h = a.options.chart, l = this.joinBy,
                        c = r.keys || this.pointArrayMap, p = [], d = {}, u = this.chart.mapView,
                        f = u && (A(r.mapData, !0) ? u.getGeoMap(r.mapData) : u.geoMap),
                        g = a.mapTransforms = h.mapTransforms || f && f["hc-transform"] || a.mapTransforms;
                    g && P(g, function (t) {
                        t.rotation && (t.cosAngle = Math.cos(t.rotation), t.sinAngle = Math.sin(t.rotation))
                    }), S(r.mapData) ? i = r.mapData : f && "FeatureCollection" === f.type && (this.mapTitle = f.title, i = o.geojson(f, this.type, this)), this.processedData = [];
                    var m = this.processedData;
                    if (n) for (var y = void 0, v = 0, x = n.length; v < x; ++v) {
                        if (k(y = n[v])) m[v] = {value: y}; else if (S(y)) {
                            var b = 0;
                            m[v] = {}, !r.keys && y.length > c.length && "string" == typeof y[0] && (m[v]["hc-key"] = y[0], ++b);
                            for (var M = 0; M < c.length; ++M, ++b) c[M] && void 0 !== y[b] && (c[M].indexOf(".") > 0 ? s.prototype.setNestedProperty(m[v], y[b], c[M]) : m[v][c[M]] = y[b])
                        } else m[v] = n[v];
                        l && "_i" === l[0] && (m[v]._i = v)
                    }
                    if (i) {
                        this.mapData = i, this.mapMap = {};
                        for (var v = 0; v < i.length; v++) e = (t = i[v]).properties, t._i = v, l[0] && e && e[l[0]] && (t[l[0]] = e[l[0]]), d[t[l[0]]] = t;
                        if (this.mapMap = d, l[1]) {
                            var w = l[1];
                            m.forEach(function (t) {
                                var e = C(w, t);
                                d[e] && p.push(d[e])
                            })
                        }
                        if (r.allAreas) {
                            if (l[1]) {
                                var L = l[1];
                                m.forEach(function (t) {
                                    p.push(C(L, t))
                                })
                            }
                            var j = "|" + p.map(function (t) {
                                return t && t[l[0]]
                            }).join("|") + "|";
                            i.forEach(function (t) {
                                l[0] && -1 !== j.indexOf("|" + t[l[0]] + "|") || m.push(T(t, {value: null}))
                            })
                        }
                    }
                    this.processedXData = Array(m.length)
                }, e.prototype.setOptions = function (e) {
                    var i = t.prototype.setOptions.call(this, e), o = i.joinBy;
                    return null === i.joinBy && (o = "_i"), (o = this.joinBy = j(o))[1] || (o[1] = o[0]), i
                }, e.prototype.translate = function () {
                    var t = this.doFullTranslate(), e = this.chart.mapView, i = e && e.projection;
                    if (this.chart.hasRendered && (this.isDirtyData || !this.hasRendered) && (this.processData(), this.generatePoints(), delete this.bounds, !e || e.userOptions.center || k(e.userOptions.zoom) || e.zoom !== e.minZoom ? this.getProjectedBounds() : e.fitToBounds(void 0, void 0, !1)), e) {
                        var o = e.getSVGTransform();
                        this.points.forEach(function (r) {
                            var n = k(r.insetIndex) && e.insets[r.insetIndex].getSVGTransform() || o;
                            n && r.bounds && k(r.bounds.midX) && k(r.bounds.midY) && (r.plotX = r.bounds.midX * n.scaleX + n.translateX, r.plotY = r.bounds.midY * n.scaleY + n.translateY), t && (r.shapeType = "path", r.shapeArgs = {d: s.getProjectedPath(r, i)}), r.projectedPath && !r.projectedPath.length ? r.setVisible(!1) : r.visible || r.setVisible(!0)
                        })
                    }
                    M(this, "afterTranslate")
                }, e.defaultOptions = T(v.defaultOptions, n), e
            }(v);
        return x(O.prototype, {
            type: "map",
            axisTypes: e.seriesMembers.axisTypes,
            colorAttribs: e.seriesMembers.colorAttribs,
            colorKey: e.seriesMembers.colorKey,
            directTouch: !0,
            drawDataLabels: f,
            drawGraph: f,
            forceDL: !0,
            getCenter: i.getCenter,
            getExtremesFromAll: !0,
            getSymbol: f,
            isCartesian: !1,
            parallelArrays: e.seriesMembers.parallelArrays,
            pointArrayMap: e.seriesMembers.pointArrayMap,
            pointClass: s,
            preserveAspectRatio: !0,
            searchPoint: f,
            trackerGroups: e.seriesMembers.trackerGroups,
            useMapGeometry: !0
        }), e.compose(O), h.registerSeriesType("map", O), O
    }), i(e, "Series/MapLine/MapLineSeriesDefaults.js", [], function () {
        return {lineWidth: 1, fillColor: "none", legendSymbol: "lineMarker"}
    }), i(e, "Series/MapLine/MapLineSeries.js", [e["Series/MapLine/MapLineSeriesDefaults.js"], e["Series/Map/MapSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r, s = this && this.__extends || (r = function (t, e) {
            return (r = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), n = o.extend, a = o.merge, h = function (i) {
            function o() {
                return null !== i && i.apply(this, arguments) || this
            }

            return s(o, i), o.prototype.pointAttribs = function (t, e) {
                var o = i.prototype.pointAttribs.call(this, t, e);
                return o.fill = this.options.fillColor, o
            }, o.defaultOptions = a(e.defaultOptions, t), o
        }(e);
        return n(h.prototype, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {stroke: "color", "stroke-width": "lineWidth"}
        }), i.registerSeriesType("mapline", h), h
    }), i(e, "Series/MapPoint/MapPointPoint.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = this && this.__extends || (i = function (t, e) {
            return (i = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function o() {
                this.constructor = t
            }

            i(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
        }), r = t.seriesTypes.scatter, s = e.isNumber;
        return function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return o(e, t), e.prototype.isValid = function () {
                return !!(this.options.geometry || s(this.x) && s(this.y) || s(this.options.lon) && s(this.options.lat))
            }, e
        }(r.prototype.pointClass)
    }), i(e, "Series/MapPoint/MapPointSeriesDefaults.js", [], function () {
        return {
            dataLabels: {
                crop: !1, defer: !1, enabled: !0, formatter: function () {
                    return this.point.name
                }, overflow: !1, style: {color: "#000000"}
            }, legendSymbol: "lineMarker"
        }
    }), i(e, "Series/MapPoint/MapPointSeries.js", [e["Core/Globals.js"], e["Series/MapPoint/MapPointPoint.js"], e["Series/MapPoint/MapPointSeriesDefaults.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s) {
        var n, a = this && this.__extends || (n = function (t, e) {
                return (n = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                n(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), h = t.noop, l = o.seriesTypes, c = l.map, p = l.scatter, d = s.extend, u = s.fireEvent, f = s.isNumber,
            g = s.merge, m = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.clearBounds = c.prototype.clearBounds, e
                }

                return a(e, t), e.prototype.drawDataLabels = function () {
                    t.prototype.drawDataLabels.call(this), this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
                }, e.prototype.projectPoint = function (t) {
                    var e = this.chart.mapView;
                    if (e) {
                        var i = t.geometry, o = t.lon, r = t.lat, s = i && "Point" === i.type && i.coordinates;
                        if (f(o) && f(r) && (s = [o, r]), s) return e.lonLatToProjectedUnits({lon: s[0], lat: s[1]})
                    }
                }, e.prototype.translate = function () {
                    var t = this, e = this.chart.mapView;
                    if (this.processedXData || this.processData(), this.generatePoints(), this.getProjectedBounds && this.isDirtyData && (delete this.bounds, this.getProjectedBounds()), e) {
                        var i = e.getSVGTransform(), o = e.projection.hasCoordinates;
                        this.points.forEach(function (r) {
                            var s, n = r.x, a = void 0 === n ? void 0 : n, h = r.y, l = void 0 === h ? void 0 : h,
                                c = f(r.insetIndex) && e.insets[r.insetIndex].getSVGTransform() || i,
                                p = t.projectPoint(r.options) || r.properties && t.projectPoint(r.properties);
                            if (p ? (a = p.x, l = p.y) : r.bounds && (a = r.bounds.midX, l = r.bounds.midY, c && f(a) && f(l) && (r.plotX = a * c.scaleX + c.translateX, r.plotY = l * c.scaleY + c.translateY, s = !0)), f(a) && f(l)) {
                                if (!s) {
                                    var d = e.projectedUnitsToPixels({x: a, y: l});
                                    r.plotX = d.x, r.plotY = o ? d.y : t.chart.plotHeight - d.y
                                }
                            } else r.y = r.plotX = r.plotY = void 0;
                            r.isInside = t.isPointInside(r), r.zone = t.zones.length ? r.getZone() : void 0
                        })
                    }
                    u(this, "afterTranslate")
                }, e.defaultOptions = g(p.defaultOptions, i), e
            }(p);
        return r.prototype.symbols.mapmarker = function (t, e, i, o, r) {
            var s, n, a = r && "legend" === r.context;
            a ? (s = t + i / 2, n = e + o) : r && "number" == typeof r.anchorX && "number" == typeof r.anchorY ? (s = r.anchorX, n = r.anchorY) : (s = t + i / 2, n = e + o / 2, e -= o);
            var h = a ? o / 3 : o / 2;
            return [["M", s, n], ["C", s, n, s - h, e + 1.5 * h, s - h, e + h], ["A", h, h, 1, 1, 1, s + h, e + h], ["C", s + h, e + 1.5 * h, s, n, s, n], ["Z"]]
        }, d(m.prototype, {
            type: "mappoint",
            axisTypes: ["colorAxis"],
            forceDL: !0,
            isCartesian: !1,
            pointClass: e,
            searchPoint: h,
            useMapGeometry: !0
        }), o.registerSeriesType("mappoint", m), m
    }), i(e, "Series/Bubble/BubbleLegendDefaults.js", [], function () {
        return {
            borderColor: void 0,
            borderWidth: 2,
            className: void 0,
            color: void 0,
            connectorClassName: void 0,
            connectorColor: void 0,
            connectorDistance: 60,
            connectorWidth: 1,
            enabled: !1,
            labels: {
                className: void 0,
                allowOverlap: !1,
                format: "",
                formatter: void 0,
                align: "right",
                style: {fontSize: "0.9em", color: "#000000"},
                x: 0,
                y: 0
            },
            maxSize: 60,
            minSize: 10,
            legendIndex: 0,
            ranges: {value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0},
            sizeBy: "area",
            sizeByAbsoluteValue: !1,
            zIndex: 1,
            zThreshold: 0
        }
    }), i(e, "Series/Bubble/BubbleLegendItem.js", [e["Core/Color/Color.js"], e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r = t.parse, s = i.noop, n = o.arrayMax, a = o.arrayMin, h = o.isNumber, l = o.merge, c = o.pick,
            p = o.stableSort;
        return function () {
            function t(t, e) {
                this.setState = s, this.init(t, e)
            }

            return t.prototype.init = function (t, e) {
                this.options = t, this.visible = !0, this.chart = e.chart, this.legend = e
            }, t.prototype.addToLegend = function (t) {
                t.splice(this.options.legendIndex, 0, this)
            }, t.prototype.drawLegendSymbol = function (t) {
                this.chart;
                var e, i = c(t.options.itemDistance, 20), o = this.legendItem || {}, r = this.options, s = r.ranges,
                    n = r.connectorDistance;
                if (!s || !s.length || !h(s[0].value)) {
                    t.options.bubbleLegend.autoRanges = !0;
                    return
                }
                p(s, function (t, e) {
                    return e.value - t.value
                }), this.ranges = s, this.setOptions(), this.render();
                var a = this.getMaxLabelSize(), l = this.ranges[0].radius, d = 2 * l;
                e = (e = n - l + a.width) > 0 ? e : 0, this.maxLabel = a, this.movementX = "left" === r.labels.align ? e : 0, o.labelWidth = d + e + i, o.labelHeight = d + a.height / 2
            }, t.prototype.setOptions = function () {
                var t = this.ranges, e = this.options, i = this.chart.series[e.seriesIndex], o = this.legend.baseline,
                    s = {zIndex: e.zIndex, "stroke-width": e.borderWidth},
                    n = {zIndex: e.zIndex, "stroke-width": e.connectorWidth}, a = {
                        align: this.legend.options.rtl || "left" === e.labels.align ? "right" : "left",
                        zIndex: e.zIndex
                    }, h = i.options.marker.fillOpacity, p = this.chart.styledMode;
                t.forEach(function (d, u) {
                    p || (s.stroke = c(d.borderColor, e.borderColor, i.color), s.fill = c(d.color, e.color, 1 !== h ? r(i.color).setOpacity(h).get("rgba") : i.color), n.stroke = c(d.connectorColor, e.connectorColor, i.color)), t[u].radius = this.getRangeRadius(d.value), t[u] = l(t[u], {center: t[0].radius - t[u].radius + o}), p || l(!0, t[u], {
                        bubbleAttribs: l(s),
                        connectorAttribs: l(n),
                        labelAttribs: a
                    })
                }, this)
            }, t.prototype.getRangeRadius = function (t) {
                var e = this.options, i = this.options.seriesIndex, o = this.chart.series[i], r = e.ranges[0].value,
                    s = e.ranges[e.ranges.length - 1].value, n = e.minSize, a = e.maxSize;
                return o.getRadius.call(this, s, r, n, a, t)
            }, t.prototype.render = function () {
                var t = this.legendItem || {}, e = this.chart.renderer, i = this.options.zThreshold;
                this.symbols || (this.symbols = {
                    connectors: [],
                    bubbleItems: [],
                    labels: []
                }), t.symbol = e.g("bubble-legend"), t.label = e.g("bubble-legend-item").css(this.legend.itemStyle || {}), t.symbol.translateX = 0, t.symbol.translateY = 0, t.symbol.add(t.label), t.label.add(t.group);
                for (var o = 0, r = this.ranges; o < r.length; o++) {
                    var s = r[o];
                    s.value >= i && this.renderRange(s)
                }
                this.hideOverlappingLabels()
            }, t.prototype.renderRange = function (t) {
                var e = this.ranges[0], i = this.legend, o = this.options, r = o.labels, s = this.chart,
                    n = s.series[o.seriesIndex], a = s.renderer, h = this.symbols, l = h.labels, c = t.center,
                    p = Math.abs(t.radius), d = o.connectorDistance || 0, u = r.align, f = i.options.rtl,
                    g = o.borderWidth, m = o.connectorWidth, y = e.radius || 0, v = c - p - g / 2 + m / 2,
                    x = (v % 1 ? 1 : .5) - (m % 2 ? 0 : .5), b = a.styledMode, M = f || "left" === u ? -d : d;
                "center" === u && (M = 0, o.connectorDistance = 0, t.labelAttribs.align = "center"), h.bubbleItems.push(a.circle(y, c + x, p).attr(b ? {} : t.bubbleAttribs).addClass((b ? "highcharts-color-" + n.colorIndex + " " : "") + "highcharts-bubble-legend-symbol " + (o.className || "")).add(this.legendItem.symbol)), h.connectors.push(a.path(a.crispLine([["M", y, v], ["L", y + M, v]], o.connectorWidth)).attr(b ? {} : t.connectorAttribs).addClass((b ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (o.connectorClassName || "")).add(this.legendItem.symbol));
                var C = a.text(this.formatLabel(t)).attr(b ? {} : t.labelAttribs).css(b ? {} : r.style).addClass("highcharts-bubble-legend-labels " + (o.labels.className || "")).add(this.legendItem.symbol),
                    S = {x: y + M + o.labels.x, y: v + o.labels.y + .4 * C.getBBox().height};
                C.attr(S), l.push(C), C.placed = !0, C.alignAttr = S
            }, t.prototype.getMaxLabelSize = function () {
                var t, e;
                return this.symbols.labels.forEach(function (i) {
                    e = i.getBBox(!0), t = t ? e.width > t.width ? e : t : e
                }), t || {}
            }, t.prototype.formatLabel = function (t) {
                var i = this.options, o = i.labels.formatter, r = i.labels.format, s = this.chart.numberFormatter;
                return r ? e.format(r, t) : o ? o.call(t) : s(t.value, 1)
            }, t.prototype.hideOverlappingLabels = function () {
                var t = this.chart, e = this.options.labels.allowOverlap, i = this.symbols;
                !e && i && (t.hideOverlappingLabels(i.labels), i.labels.forEach(function (t, e) {
                    t.newOpacity ? t.newOpacity !== t.oldOpacity && i.connectors[e].show() : i.connectors[e].hide()
                }))
            }, t.prototype.getRanges = function () {
                var t, e, i = this.legend.bubbleLegend, o = i.chart.series, r = i.options.ranges, s = Number.MAX_VALUE,
                    p = -Number.MAX_VALUE;
                return o.forEach(function (t) {
                    t.isBubble && !t.ignoreSeries && (e = t.zData.filter(h)).length && (s = c(t.options.zMin, Math.min(s, Math.max(a(e), !1 === t.options.displayNegative ? t.options.zThreshold : -Number.MAX_VALUE))), p = c(t.options.zMax, Math.max(p, n(e))))
                }), t = s === p ? [{value: p}] : [{value: s}, {value: (s + p) / 2}, {
                    value: p,
                    autoRanges: !0
                }], r.length && r[0].radius && t.reverse(), t.forEach(function (e, i) {
                    r && r[i] && (t[i] = l(r[i], e))
                }), t
            }, t.prototype.predictBubbleSizes = function () {
                var t, e = this.chart, i = e.legend.options, o = i.floating, r = "horizontal" === i.layout,
                    s = r ? e.legend.lastLineHeight : 0, n = e.plotSizeX, a = e.plotSizeY,
                    h = e.series[this.options.seriesIndex], l = h.getPxExtremes(), c = Math.ceil(l.minPxSize),
                    p = Math.ceil(l.maxPxSize), d = Math.min(a, n), u = h.options.maxSize;
                return o || !/%$/.test(u) ? t = p : (t = (d + s) * (u = parseFloat(u)) / 100 / (u / 100 + 1), (r && a - t >= n || !r && n - t >= a) && (t = p)), [c, Math.ceil(t)]
            }, t.prototype.updateRanges = function (t, e) {
                var i = this.legend.options.bubbleLegend;
                i.minSize = t, i.maxSize = e, i.ranges = this.getRanges()
            }, t.prototype.correctSizes = function () {
                var t = this.legend, e = this.chart.series[this.options.seriesIndex].getPxExtremes();
                Math.abs(Math.ceil(e.maxPxSize) - this.options.maxSize) > 1 && (this.updateRanges(this.options.minSize, e.maxPxSize), t.render())
            }, t
        }()
    }), i(e, "Series/Bubble/BubbleLegendComposition.js", [e["Series/Bubble/BubbleLegendDefaults.js"], e["Series/Bubble/BubbleLegendItem.js"], e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e, i, o, r) {
        var s = i.setOptions, n = o.composed, a = r.addEvent, h = r.objectEach, l = r.pushUnique, c = r.wrap;

        function p(t, e, i) {
            var o, r, s, n = this.legend, a = d(this) >= 0;
            n && n.options.enabled && n.bubbleLegend && n.options.bubbleLegend.autoRanges && a ? (o = n.bubbleLegend.options, r = n.bubbleLegend.predictBubbleSizes(), n.bubbleLegend.updateRanges(r[0], r[1]), o.placed || (n.group.placed = !1, n.allItems.forEach(function (t) {
                (s = t.legendItem || {}).group && (s.group.translateY = void 0)
            })), n.render(), this.getMargins(), this.axes.forEach(function (t) {
                t.visible && t.render(), o.placed || (t.setScale(), t.updateNames(), h(t.ticks, function (t) {
                    t.isNew = !0, t.isNewLabel = !0
                }))
            }), o.placed = !0, this.getMargins(), t.call(this, e, i), n.bubbleLegend.correctSizes(), m(n, u(n))) : (t.call(this, e, i), n && n.options.enabled && n.bubbleLegend && (n.render(), m(n, u(n))))
        }

        function d(t) {
            for (var e = t.series, i = 0; i < e.length;) {
                if (e[i] && e[i].isBubble && e[i].visible && e[i].zData.length) return i;
                i++
            }
            return -1
        }

        function u(t) {
            var e, i, o, r = t.allItems, s = [], n = r.length, a = 0, h = 0;
            for (a = 0; a < n; a++) if (i = r[a].legendItem || {}, o = (r[a + 1] || {}).legendItem || {}, i.labelHeight && (r[a].itemHeight = i.labelHeight), r[a] === r[n - 1] || i.y !== o.y) {
                for (s.push({height: 0}), e = s[s.length - 1]; h <= a; h++) r[h].itemHeight > e.height && (e.height = r[h].itemHeight);
                e.step = a
            }
            return s
        }

        function f(t) {
            var i = this.bubbleLegend, o = this.options, r = o.bubbleLegend, s = d(this.chart);
            i && i.ranges && i.ranges.length && (r.ranges.length && (r.autoRanges = !!r.ranges[0].autoRanges), this.destroyItem(i)), s >= 0 && o.enabled && r.enabled && (r.seriesIndex = s, this.bubbleLegend = new e(r, this), this.bubbleLegend.addToLegend(t.allItems))
        }

        function g(t) {
            if (t.defaultPrevented) return !1;
            var e, i = this.chart, o = this.visible, r = this.chart.legend;
            r && r.bubbleLegend && (this.visible = !o, this.ignoreSeries = o, e = d(i) >= 0, r.bubbleLegend.visible !== e && (r.update({bubbleLegend: {enabled: e}}), r.bubbleLegend.visible = e), this.visible = o)
        }

        function m(t, e) {
            var i, o, r, s, n = t.allItems, a = t.options.rtl, h = 0;
            n.forEach(function (t, n) {
                (s = t.legendItem || {}).group && (i = s.group.translateX || 0, o = s.y || 0, ((r = t.movementX) || a && t.ranges) && (r = a ? i - t.options.maxSize / 2 : i + r, s.group.attr({translateX: r})), n > e[h].step && h++, s.group.attr({translateY: Math.round(o + e[h].height / 2)}), s.y = o + e[h].height / 2)
            })
        }

        return {
            compose: function e(i, o, r) {
                l(n, e) && (s({legend: {bubbleLegend: t}}), c(i.prototype, "drawChartBox", p), a(o, "afterGetAllItems", f), a(r, "legendItemClick", g))
            }
        }
    }), i(e, "Series/Bubble/BubblePoint.js", [e["Core/Series/Point.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
            return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), s = e.seriesTypes.scatter.prototype.pointClass, n = i.extend, a = function (e) {
            function i() {
                return null !== e && e.apply(this, arguments) || this
            }

            return r(i, e), i.prototype.haloPath = function (e) {
                return t.prototype.haloPath.call(this, 0 === e ? 0 : (this.marker && this.marker.radius || 0) + e)
            }, i
        }(s);
        return n(a.prototype, {ttBelow: !1}), a
    }), i(e, "Series/Bubble/BubbleSeries.js", [e["Series/Bubble/BubbleLegendComposition.js"], e["Series/Bubble/BubblePoint.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o, r, s) {
        var n, a = this && this.__extends || (n = function (t, e) {
                return (n = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                n(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), h = i.parse, l = o.composed, c = o.noop, p = r.series, d = r.seriesTypes, u = d.column.prototype,
            f = d.scatter, g = s.addEvent, m = s.arrayMax, y = s.arrayMin, v = s.clamp, x = s.extend, b = s.isNumber,
            M = s.merge, C = s.pick, S = s.pushUnique;

        function w() {
            var t, e = this, i = this.len, o = this.coll, r = this.isXAxis, s = this.min, n = r ? "xData" : "yData",
                a = (this.max || 0) - (s || 0), h = 0, l = i, c = i / a;
            ("xAxis" === o || "yAxis" === o) && (this.series.forEach(function (i) {
                if (i.bubblePadding && i.reserveSpace()) {
                    e.allowZoomOutside = !0, t = !0;
                    var o = i[n];
                    if (r && ((i.onPoint || i).getRadii(0, 0, i), i.onPoint && (i.radii = i.onPoint.radii)), a > 0) {
                        for (var p = o.length; p--;) if (b(o[p]) && e.dataMin <= o[p] && o[p] <= e.max) {
                            var d = i.radii && i.radii[p] || 0;
                            h = Math.min((o[p] - s) * c - d, h), l = Math.max((o[p] - s) * c + d, l)
                        }
                    }
                }
            }), t && a > 0 && !this.logarithmic && (l -= i, c *= (i + Math.max(0, h) - Math.min(l, i)) / i, [["min", "userMin", h], ["max", "userMax", l]].forEach(function (t) {
                void 0 === C(e.options[t[0]], e[t[1]]) && (e[t[0]] += t[2] / c)
            })))
        }

        var k = function (e) {
            function i() {
                return null !== e && e.apply(this, arguments) || this
            }

            return a(i, e), i.compose = function (e, i, o, r) {
                t.compose(i, o, r), S(l, this.compose) && g(e, "foundExtremes", w)
            }, i.prototype.animate = function (t) {
                !t && this.points.length < this.options.animationLimit && this.points.forEach(function (t) {
                    var e = t.graphic;
                    e && e.width && (this.hasRendered || e.attr({
                        x: t.plotX,
                        y: t.plotY,
                        width: 1,
                        height: 1
                    }), e.animate(this.markerAttribs(t), this.options.animation))
                }, this)
            }, i.prototype.getRadii = function () {
                var t, e, i, o = this.zData, r = this.yData, s = [], n = this.chart.bubbleZExtremes,
                    a = this.getPxExtremes(), h = a.minPxSize, l = a.maxPxSize;
                if (!n) {
                    var c, p = Number.MAX_VALUE, d = -Number.MAX_VALUE;
                    this.chart.series.forEach(function (t) {
                        if (t.bubblePadding && t.reserveSpace()) {
                            var e = (t.onPoint || t).getZExtremes();
                            e && (p = Math.min(C(p, e.zMin), e.zMin), d = Math.max(C(d, e.zMax), e.zMax), c = !0)
                        }
                    }), c ? (n = {zMin: p, zMax: d}, this.chart.bubbleZExtremes = n) : n = {zMin: 0, zMax: 0}
                }
                for (e = 0, t = o.length; e < t; e++) i = o[e], s.push(this.getRadius(n.zMin, n.zMax, h, l, i, r && r[e]));
                this.radii = s
            }, i.prototype.getRadius = function (t, e, i, o, r, s) {
                var n = this.options, a = "width" !== n.sizeBy, h = n.zThreshold, l = e - t, c = .5;
                if (null === s || null === r) return null;
                if (b(r)) {
                    if (n.sizeByAbsoluteValue && (r = Math.abs(r - h), e = l = Math.max(e - h, Math.abs(t - h)), t = 0), r < t) return i / 2 - 1;
                    l > 0 && (c = (r - t) / l)
                }
                return a && c >= 0 && (c = Math.sqrt(c)), Math.ceil(i + c * (o - i)) / 2
            }, i.prototype.hasData = function () {
                return !!this.processedXData.length
            }, i.prototype.pointAttribs = function (t, e) {
                var i = this.options.marker.fillOpacity, o = p.prototype.pointAttribs.call(this, t, e);
                return 1 !== i && (o.fill = h(o.fill).setOpacity(i).get("rgba")), o
            }, i.prototype.translate = function () {
                e.prototype.translate.call(this), this.getRadii(), this.translateBubble()
            }, i.prototype.translateBubble = function () {
                for (var t = this.data, e = this.options, i = this.radii, o = this.getPxExtremes().minPxSize, r = t.length; r--;) {
                    var s = t[r], n = i ? i[r] : 0;
                    "z" === this.zoneAxis && (s.negative = (s.z || 0) < (e.zThreshold || 0)), b(n) && n >= o / 2 ? (s.marker = x(s.marker, {
                        radius: n,
                        width: 2 * n,
                        height: 2 * n
                    }), s.dlBox = {
                        x: s.plotX - n,
                        y: s.plotY - n,
                        width: 2 * n,
                        height: 2 * n
                    }) : (s.shapeArgs = s.plotY = s.dlBox = void 0, s.isInside = !1)
                }
            }, i.prototype.getPxExtremes = function () {
                var t = Math.min(this.chart.plotWidth, this.chart.plotHeight), e = function (e) {
                    var i;
                    return "string" == typeof e && (i = /%$/.test(e), e = parseInt(e, 10)), i ? t * e / 100 : e
                }, i = e(C(this.options.minSize, 8)), o = Math.max(e(C(this.options.maxSize, "20%")), i);
                return {minPxSize: i, maxPxSize: o}
            }, i.prototype.getZExtremes = function () {
                var t = this.options, e = (this.zData || []).filter(b);
                if (e.length) {
                    var i = C(t.zMin, v(y(e), !1 === t.displayNegative ? t.zThreshold || 0 : -Number.MAX_VALUE, Number.MAX_VALUE)),
                        o = C(t.zMax, m(e));
                    if (b(i) && b(o)) return {zMin: i, zMax: o}
                }
            }, i.defaultOptions = M(f.defaultOptions, {
                dataLabels: {
                    formatter: function () {
                        var t = this.series.chart.numberFormatter, e = this.point.z;
                        return b(e) ? t(e, -1) : ""
                    }, inside: !0, verticalAlign: "middle"
                },
                animationLimit: 250,
                marker: {
                    lineColor: null,
                    lineWidth: 1,
                    fillOpacity: .5,
                    radius: null,
                    states: {hover: {radiusPlus: 0}},
                    symbol: "circle"
                },
                minSize: 8,
                maxSize: "20%",
                softThreshold: !1,
                states: {hover: {halo: {size: 5}}},
                tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
                turboThreshold: 0,
                zThreshold: 0,
                zoneAxis: "z"
            }), i
        }(f);
        return x(k.prototype, {
            alignDataLabel: u.alignDataLabel,
            applyZones: c,
            bubblePadding: !0,
            isBubble: !0,
            pointArrayMap: ["y", "z"],
            pointClass: e,
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            zoneAxis: "z"
        }), g(k, "updatedData", function (t) {
            delete t.target.chart.bubbleZExtremes
        }), g(k, "remove", function (t) {
            delete t.target.chart.bubbleZExtremes
        }), r.registerSeriesType("bubble", k), k
    }), i(e, "Series/MapBubble/MapBubblePoint.js", [e["Series/Bubble/BubblePoint.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i) {
        var o, r = this && this.__extends || (o = function (t, e) {
            return (o = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
        }, function (t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function i() {
                this.constructor = t
            }

            o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }), s = e.seriesTypes.map.prototype.pointClass.prototype, n = i.extend, a = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return r(e, t), e.prototype.isValid = function () {
                return "number" == typeof this.z
            }, e
        }(t);
        return n(a.prototype, {applyOptions: s.applyOptions, getProjectedBounds: s.getProjectedBounds}), a
    }), i(e, "Series/MapBubble/MapBubbleSeries.js", [e["Series/Bubble/BubbleSeries.js"], e["Series/MapBubble/MapBubblePoint.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e, i, o) {
        var r, s = this && this.__extends || (r = function (t, e) {
                return (r = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), n = i.seriesTypes, a = n.map.prototype, h = n.mappoint.prototype, l = o.extend, c = o.merge,
            p = function (e) {
                function i() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.clearBounds = a.clearBounds, t
                }

                return s(i, e), i.prototype.searchPoint = function (t, e) {
                    return this.searchKDTree({
                        plotX: t.chartX - this.chart.plotLeft,
                        plotY: t.chartY - this.chart.plotTop
                    }, e, t)
                }, i.prototype.translate = function () {
                    h.translate.call(this), this.getRadii(), this.translateBubble()
                }, i.prototype.updateParallelArrays = function (t, i, o) {
                    e.prototype.updateParallelArrays.call(this, t, i, o);
                    var r = this.processedXData, s = this.xData;
                    r && s && (r.length = s.length)
                }, i.defaultOptions = c(t.defaultOptions, {
                    lineWidth: 0,
                    animationLimit: 500,
                    joinBy: "hc-key",
                    tooltip: {pointFormat: "{point.name}: {point.z}"}
                }), i
            }(t);
        return l(p.prototype, {
            type: "mapbubble",
            axisTypes: ["colorAxis"],
            getProjectedBounds: a.getProjectedBounds,
            isCartesian: !1,
            pointArrayMap: ["z"],
            pointClass: e,
            processData: a.processData,
            projectPoint: h.projectPoint,
            kdAxisArray: ["plotX", "plotY"],
            setData: a.setData,
            setOptions: a.setOptions,
            updateData: a.updateData,
            useMapGeometry: !0,
            xyFromShape: !0
        }), i.registerSeriesType("mapbubble", p), p
    }), i(e, "Series/Heatmap/HeatmapPoint.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (t, e) {
        var i, o = this && this.__extends || (i = function (t, e) {
                return (i = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function o() {
                    this.constructor = t
                }

                i(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
            }), r = t.seriesTypes.scatter.prototype.pointClass, s = e.clamp, n = e.defined, a = e.extend, h = e.pick,
            l = function (t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }

                return o(e, t), e.prototype.applyOptions = function (e, i) {
                    return (this.isNull || null === this.value) && delete this.color, t.prototype.applyOptions.call(this, e, i), this.formatPrefix = this.isNull || null === this.value ? "null" : "point", this
                }, e.prototype.getCellAttributes = function () {
                    for (var t = this.series, e = t.options, i = (e.colsize || 1) / 2, o = (e.rowsize || 1) / 2, r = t.xAxis, a = t.yAxis, l = this.options.marker || t.options.marker, c = t.pointPlacementToXValue(), p = h(this.pointPadding, e.pointPadding, 0), d = {
                        x1: s(Math.round(r.len - r.translate(this.x - i, !1, !0, !1, !0, -c)), -r.len, 2 * r.len),
                        x2: s(Math.round(r.len - r.translate(this.x + i, !1, !0, !1, !0, -c)), -r.len, 2 * r.len),
                        y1: s(Math.round(a.translate(this.y - o, !1, !0, !1, !0)), -a.len, 2 * a.len),
                        y2: s(Math.round(a.translate(this.y + o, !1, !0, !1, !0)), -a.len, 2 * a.len)
                    }, u = 0, f = [["width", "x"], ["height", "y"]]; u < f.length; u++) {
                        var g = f[u], m = g[0], y = g[1], v = y + "1", x = y + "2", b = Math.abs(d[v] - d[x]),
                            M = l && l.lineWidth || 0, C = Math.abs(d[v] + d[x]) / 2, S = l && l[m];
                        if (n(S) && S < b) {
                            var w = S / 2 + M / 2;
                            d[v] = C - w, d[x] = C + w
                        }
                        p && (("x" === y && r.reversed || "y" === y && !a.reversed) && (v = x, x = y + "1"), d[v] += p, d[x] -= p)
                    }
                    return d
                }, e.prototype.haloPath = function (t) {
                    if (!t) return [];
                    var e = this.shapeArgs || {}, i = e.x, o = void 0 === i ? 0 : i, r = e.y, s = void 0 === r ? 0 : r,
                        n = e.width, a = void 0 === n ? 0 : n, h = e.height, l = void 0 === h ? 0 : h;
                    return [["M", o - t, s - t], ["L", o - t, s + l + t], ["L", o + a + t, s + l + t], ["L", o + a + t, s - t], ["Z"]]
                }, e.prototype.isValid = function () {
                    return this.value !== 1 / 0 && this.value !== -1 / 0
                }, e
            }(r);
        return a(l.prototype, {dataLabelOnNull: !0, moveToTopOnHover: !0, ttBelow: !1}), l
    }), i(e, "Series/Heatmap/HeatmapSeriesDefaults.js", [e["Core/Utilities.js"]], function (t) {
        var e = t.isNumber;
        return {
            animation: !1,
            borderRadius: 0,
            borderWidth: 0,
            interpolation: !1,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function () {
                    var t = this.series.chart.numberFormatter, i = this.point.value;
                    return e(i) ? t(i, -1) : ""
                }, inside: !0, verticalAlign: "middle", crop: !1, overflow: "allow", padding: 0
            },
            marker: {symbol: "rect", radius: 0, lineColor: void 0, states: {hover: {lineWidthPlus: 0}, select: {}}},
            clip: !0,
            pointRange: null,
            tooltip: {pointFormat: "{point.x}, {point.y}: {point.value}<br/>"},
            states: {hover: {halo: !1, brightness: .2}},
            legendSymbol: "rectangle"
        }
    }), i(e, "Series/InterpolationUtilities.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (t, e) {
        var i = t.doc, o = e.defined, r = e.pick;
        return {
            colorFromPoint: function (t, e) {
                var i = e.series.colorAxis;
                if (i) {
                    var s = i.toColor(t || 0, e).split(")")[0].split("(")[1].split(",").map(function (t) {
                        return r(parseFloat(t), parseInt(t, 10))
                    });
                    return s[3] = 255 * r(s[3], 1), o(t) && e.visible || (s[3] = 0), s
                }
                return [0, 0, 0, 0]
            }, getContext: function (t) {
                var e = t.canvas, o = t.context;
                return e && o ? (o.clearRect(0, 0, e.width, e.height), o) : (t.canvas = i.createElement("canvas"), t.context = t.canvas.getContext("2d", {willReadFrequently: !0}) || void 0, t.context)
            }
        }
    }), i(e, "Series/Heatmap/HeatmapSeries.js", [e["Core/Color/Color.js"], e["Series/ColorMapComposition.js"], e["Series/Heatmap/HeatmapPoint.js"], e["Series/Heatmap/HeatmapSeriesDefaults.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Utilities.js"], e["Series/InterpolationUtilities.js"]], function (t, e, i, o, r, s, n, a) {
        var h, l = this && this.__extends || (h = function (t, e) {
                return (h = Object.setPrototypeOf || ({__proto__: []}) instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
            }, function (t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

                function i() {
                    this.constructor = t
                }

                h(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }), c = this && this.__assign || function () {
                return (c = Object.assign || function (t) {
                    for (var e, i = 1, o = arguments.length; i < o; i++) for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                    return t
                }).apply(this, arguments)
            }, p = r.series, d = r.seriesTypes, u = d.column, f = d.scatter, g = s.prototype.symbols, m = n.addEvent,
            y = n.extend, v = n.fireEvent, x = n.isNumber, b = n.merge, M = n.pick, C = a.colorFromPoint,
            S = a.getContext, w = function (e) {
                function i() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.valueMax = NaN, t.valueMin = NaN, t.isDirtyCanvas = !0, t
                }

                return l(i, e), i.prototype.drawPoints = function () {
                    var t = this, e = t.options, i = e.interpolation, o = e.marker || {};
                    if (i) {
                        var r = t.image, s = t.chart, n = t.xAxis, a = t.yAxis, h = n.reversed, l = n.len, d = a.reversed,
                            u = a.len, f = {width: l, height: u};
                        if (!r || t.isDirtyData || t.isDirtyCanvas) {
                            var g = S(t), m = t.canvas, y = t.options, v = y.colsize, x = y.rowsize, b = t.points,
                                M = t.points.length, w = s.colorAxis && s.colorAxis[0];
                            if (m && g && w) {
                                var k = n.getExtremes(), A = k.min, T = k.max, P = a.getExtremes(), L = P.min, j = P.max,
                                    O = T - A, E = j - L, D = Math.round(8 * (O / (void 0 === v ? 1 : v) / 8)),
                                    B = Math.round(8 * (E / (void 0 === x ? 1 : x) / 8)),
                                    I = [[D, D / O, void 0 !== h && h, "ceil"], [B, B / E, !(void 0 !== d && d), "floor"]].map(function (t) {
                                        var e = t[0], i = t[1], o = t[2], r = t[3];
                                        return o ? function (t) {
                                            return Math[r](e - i * t)
                                        } : function (t) {
                                            return Math[r](i * t)
                                        }
                                    }), z = I[0], R = I[1], N = m.width = D + 1, _ = N * (m.height = B + 1),
                                    G = (M - 1) / _, W = new Uint8ClampedArray(4 * _);
                                t.buildKDTree();
                                for (var X = 0; X < _; X++) {
                                    var H = b[Math.ceil(G * X)], U = H.x, F = H.y;
                                    W.set(C(H.value, H), 4 * Math.ceil(N * R(F - L) + z(U - A)))
                                }
                                g.putImageData(new ImageData(W, N), 0, 0), r ? r.attr(c(c({}, f), {href: m.toDataURL("image/png", 1)})) : (t.directTouch = !1, t.image = s.renderer.image(m.toDataURL("image/png", 1)).attr(f).add(t.group))
                            }
                            t.isDirtyCanvas = !1
                        } else (r.width !== l || r.height !== u) && r.attr(f)
                    } else (o.enabled || t._hasPointMarkers) && (p.prototype.drawPoints.call(t), t.points.forEach(function (e) {
                        e.graphic && (e.graphic[t.chart.styledMode ? "css" : "animate"](t.colorAttribs(e)), null === e.value && e.graphic.addClass("highcharts-null-point"))
                    }))
                }, i.prototype.getExtremes = function () {
                    var t = p.prototype.getExtremes.call(this, this.valueData), e = t.dataMin, i = t.dataMax;
                    return x(e) && (this.valueMin = e), x(i) && (this.valueMax = i), p.prototype.getExtremes.call(this)
                }, i.prototype.getValidPoints = function (t, e) {
                    return p.prototype.getValidPoints.call(this, t, e, !0)
                }, i.prototype.hasData = function () {
                    return !!this.processedXData.length
                }, i.prototype.init = function () {
                    e.prototype.init.apply(this, arguments);
                    var t = this.options;
                    t.pointRange = M(t.pointRange, t.colsize || 1), this.yAxis.axisPointRange = t.rowsize || 1, g.ellipse = g.circle, t.marker && x(t.borderRadius) && (t.marker.r = t.borderRadius)
                }, i.prototype.markerAttribs = function (t, e) {
                    var i = t.shapeArgs || {};
                    if (t.hasImage) return {x: t.plotX, y: t.plotY};
                    if (e && "normal" !== e) {
                        var o = t.options.marker || {}, r = this.options.marker || {}, s = r.states && r.states[e] || {},
                            n = o.states && o.states[e] || {},
                            a = (n.width || s.width || i.width || 0) + (n.widthPlus || s.widthPlus || 0),
                            h = (n.height || s.height || i.height || 0) + (n.heightPlus || s.heightPlus || 0);
                        return {
                            x: (i.x || 0) + ((i.width || 0) - a) / 2,
                            y: (i.y || 0) + ((i.height || 0) - h) / 2,
                            width: a,
                            height: h
                        }
                    }
                    return i
                }, i.prototype.pointAttribs = function (e, i) {
                    var o = p.prototype.pointAttribs.call(this, e, i), r = this.options || {},
                        s = this.chart.options.plotOptions || {}, n = s.series || {}, a = s.heatmap || {},
                        h = e && e.options.borderColor || r.borderColor || a.borderColor || n.borderColor,
                        l = e && e.options.borderWidth || r.borderWidth || a.borderWidth || n.borderWidth || o["stroke-width"];
                    if (o.stroke = e && e.marker && e.marker.lineColor || r.marker && r.marker.lineColor || h || this.color, o["stroke-width"] = l, i && "normal" !== i) {
                        var c = b(r.states && r.states[i], r.marker && r.marker.states && r.marker.states[i], e && e.options.states && e.options.states[i] || {});
                        o.fill = c.color || t.parse(o.fill).brighten(c.brightness || 0).get(), o.stroke = c.lineColor || o.stroke
                    }
                    return o
                }, i.prototype.translate = function () {
                    var t = this.options, e = t.borderRadius, i = t.marker, o = i && i.symbol || "rect",
                        r = g[o] ? o : "rect", s = -1 !== ["circle", "square"].indexOf(r);
                    this.generatePoints();
                    for (var n = 0, a = this.points; n < a.length; n++) {
                        var h = a[n], l = h.getCellAttributes(), c = Math.min(l.x1, l.x2), p = Math.min(l.y1, l.y2),
                            d = Math.max(Math.abs(l.x2 - l.x1), 0), u = Math.max(Math.abs(l.y2 - l.y1), 0);
                        if (h.hasImage = 0 === (h.marker && h.marker.symbol || o || "").indexOf("url"), s) {
                            var f = Math.abs(d - u);
                            c = Math.min(l.x1, l.x2) + (d < u ? 0 : f / 2), p = Math.min(l.y1, l.y2) + (d < u ? f / 2 : 0), d = u = Math.min(d, u)
                        }
                        h.hasImage && (h.marker = {
                            width: d,
                            height: u
                        }), h.plotX = h.clientX = (l.x1 + l.x2) / 2, h.plotY = (l.y1 + l.y2) / 2, h.shapeType = "path", h.shapeArgs = b(!0, {
                            x: c,
                            y: p,
                            width: d,
                            height: u
                        }, {d: g[r](c, p, d, u, {r: x(e) ? e : 0})})
                    }
                    v(this, "afterTranslate")
                }, i.defaultOptions = b(f.defaultOptions, o), i
            }(f);
        return m(w, "afterDataClassLegendClick", function () {
            this.isDirtyCanvas = !0, this.drawPoints()
        }), y(w.prototype, {
            axisTypes: e.seriesMembers.axisTypes,
            colorKey: e.seriesMembers.colorKey,
            directTouch: !0,
            getExtremesFromAll: !0,
            parallelArrays: e.seriesMembers.parallelArrays,
            pointArrayMap: ["y", "value"],
            pointClass: i,
            specialGroup: "group",
            trackerGroups: e.seriesMembers.trackerGroups,
            alignDataLabel: u.prototype.alignDataLabel,
            colorAttribs: e.seriesMembers.colorAttribs,
            getSymbol: p.prototype.getSymbol
        }), e.compose(w), r.registerSeriesType("heatmap", w), w
    }),i(e, "masters/modules/map.src.js", [e["Core/Globals.js"], e["Core/Axis/Color/ColorAxis.js"], e["Maps/MapNavigation.js"], e["Series/MapBubble/MapBubbleSeries.js"], e["Maps/GeoJSONComposition.js"], e["Core/Chart/MapChart.js"], e["Maps/MapView.js"], e["Maps/Projection.js"]], function (t, e, i, o, r, s, n, a) {
        t.ColorAxis = e, t.MapChart = s, t.mapChart = t.Map = s.mapChart, t.MapNavigation = i, t.MapView = n, t.maps = s.maps, t.Projection = a, t.geojson = r.geojson, t.topo2geo = r.topo2geo, e.compose(t.Chart, t.Fx, t.Legend, t.Series), r.compose(t.Chart), o.compose(t.Axis, t.Chart, t.Legend, t.Series), i.compose(s, t.Pointer, t.SVGRenderer), n.compose(s)
    }),i(e, "masters/highmaps.src.js", [e["masters/highcharts.src.js"]], function (t) {
        return t.product = "Highmaps", t
    }),e["masters/highmaps.src.js"]._modules = e,e["masters/highmaps.src.js"]
});