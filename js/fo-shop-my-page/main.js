/**
  * @im/fo-shop-my-page v0.2.0.1736139351761
  * main 521e4a91
  * production
  */
import { S as eo, n as Ht, d as or, r as to, u as pt, a as he, b as ro, R as x, c as Le, g as nr, p as oo, e as no, i as io, j as r, C as Tr, f as me, T as h, h as ao, k as ir, l as St, o as We, m as so, q as zr, s as Lt, t as lo, D as co, v as po, w as ut, x as Pr, y as uo, M as _t, z as Fr, A as fo, B as go, E as xo, V as ho, F as Ke, G as Dr, H as mo, I as yo, Q as bo, J as Co, K as vo, L as wo, N as So, O as _o } from "./DesignModeProvider-B5GoyoYE.js";
import { Q as ko, u as Ro, a as Oo, e as To, b as zo, c as Po, s as ar, f as sr, w as Fo, g as Do, d as D, O as q } from "./order.query-L8PTqunE.js";
import { D as te } from "./Div-BAius1RB.js";
import { O as Z, D as Be, a as Eo, S as Er } from "./DialogReturnOrExchangeDetail-Ced-IsmP.js";
import { u as nt, D as Wo, L as lr } from "./DialogCancelAcrossTheBoard-BnYN_zsN.js";
import { t as Lo, c as jt, a as Mo, f as Ge, D as dr, h as Xe, P as Bo } from "./DialogShippingInvoiceTraceInfo-Bqz1YGMR.js";
import { D as cr } from "./DialogCancelDetail-Cl6B0RtU.js";
import { S as ct, D as $o, a as No } from "./DialogGoProductDetail-B58UlGHJ.js";
import { u as it } from "./useCurrencyFormat-CrM1Ab0z.js";
class Ho extends eo {
  constructor(t, o) {
    super(), this.client = t, this.queries = [], this.result = [], this.observers = [], this.observersMap = {}, o && this.setQueries(o);
  }
  onSubscribe() {
    this.listeners.size === 1 && this.observers.forEach((t) => {
      t.subscribe((o) => {
        this.onUpdate(t, o);
      });
    });
  }
  onUnsubscribe() {
    this.listeners.size || this.destroy();
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), this.observers.forEach((t) => {
      t.destroy();
    });
  }
  setQueries(t, o) {
    this.queries = t, Ht.batch(() => {
      const n = this.observers, i = this.findMatchingObservers(this.queries);
      i.forEach((g) => g.observer.setOptions(g.defaultedQueryOptions, o));
      const s = i.map((g) => g.observer), c = Object.fromEntries(s.map((g) => [g.options.queryHash, g])), f = s.map((g) => g.getCurrentResult()), w = s.some((g, b) => g !== n[b]);
      n.length === s.length && !w || (this.observers = s, this.observersMap = c, this.result = f, this.hasListeners() && (or(n, s).forEach((g) => {
        g.destroy();
      }), or(s, n).forEach((g) => {
        g.subscribe((b) => {
          this.onUpdate(g, b);
        });
      }), this.notify()));
    });
  }
  getCurrentResult() {
    return this.result;
  }
  getQueries() {
    return this.observers.map((t) => t.getCurrentQuery());
  }
  getObservers() {
    return this.observers;
  }
  getOptimisticResult(t) {
    return this.findMatchingObservers(t).map((o) => o.observer.getOptimisticResult(o.defaultedQueryOptions));
  }
  findMatchingObservers(t) {
    const o = this.observers, n = new Map(o.map((m) => [m.options.queryHash, m])), i = t.map((m) => this.client.defaultQueryOptions(m)), s = i.flatMap((m) => {
      const C = n.get(m.queryHash);
      return C != null ? [{
        defaultedQueryOptions: m,
        observer: C
      }] : [];
    }), c = new Set(s.map((m) => m.defaultedQueryOptions.queryHash)), f = i.filter((m) => !c.has(m.queryHash)), w = new Set(s.map((m) => m.observer)), g = o.filter((m) => !w.has(m)), b = (m) => {
      const C = this.client.defaultQueryOptions(m), A = this.observersMap[C.queryHash];
      return A ?? new ko(this.client, C);
    }, _ = f.map((m, C) => {
      if (m.keepPreviousData) {
        const A = g[C];
        if (A !== void 0)
          return {
            defaultedQueryOptions: m,
            observer: A
          };
      }
      return {
        defaultedQueryOptions: m,
        observer: b(m)
      };
    }), S = (m, C) => i.indexOf(m.defaultedQueryOptions) - i.indexOf(C.defaultedQueryOptions);
    return s.concat(_).sort(S);
  }
  onUpdate(t, o) {
    const n = this.observers.indexOf(t);
    n !== -1 && (this.result = to(this.result, n, o), this.notify());
  }
  notify() {
    Ht.batch(() => {
      this.listeners.forEach(({
        listener: t
      }) => {
        t(this.result);
      });
    });
  }
}
function pr({
  queries: e,
  context: t
}) {
  const o = pt({
    context: t
  }), n = Ro(), i = Oo(), s = he.useMemo(() => e.map((S) => {
    const m = o.defaultQueryOptions(S);
    return m._optimisticResults = n ? "isRestoring" : "optimistic", m;
  }), [e, o, n]);
  s.forEach((S) => {
    To(S), zo(S, i);
  }), Po(i);
  const [c] = he.useState(() => new Ho(o, s)), f = c.getOptimisticResult(s);
  ro(he.useCallback((S) => n ? () => {
  } : c.subscribe(Ht.batchCalls(S)), [c, n]), () => c.getCurrentResult(), () => c.getCurrentResult()), he.useEffect(() => {
    c.setQueries(s, {
      listeners: !1
    });
  }, [s, c]);
  const g = f.some((S, m) => ar(s[m], S, n)) ? f.flatMap((S, m) => {
    const C = s[m], A = c.getObservers()[m];
    if (C && A) {
      if (ar(C, S, n))
        return sr(C, A, i);
      Fo(S, n) && sr(C, A, i);
    }
    return [];
  }) : [];
  if (g.length > 0)
    throw Promise.all(g);
  const b = c.getQueries(), _ = f.find((S, m) => {
    var C, A;
    return Do({
      result: S,
      errorResetBoundary: i,
      useErrorBoundary: (C = (A = s[m]) == null ? void 0 : A.useErrorBoundary) != null ? C : !1,
      query: b[m]
    });
  });
  if (_ != null && _.error)
    throw _.error;
  return f;
}
var Wr = { exports: {} }, Pt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jo = he, qo = Symbol.for("react.element"), Vo = Symbol.for("react.fragment"), Io = Object.prototype.hasOwnProperty, Ao = jo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Uo = { key: !0, ref: !0, __self: !0, __source: !0 };
function Lr(e, t, o) {
  var n, i = {}, s = null, c = null;
  o !== void 0 && (s = "" + o), t.key !== void 0 && (s = "" + t.key), t.ref !== void 0 && (c = t.ref);
  for (n in t) Io.call(t, n) && !Uo.hasOwnProperty(n) && (i[n] = t[n]);
  if (e && e.defaultProps) for (n in t = e.defaultProps, t) i[n] === void 0 && (i[n] = t[n]);
  return { $$typeof: qo, type: e, key: s, ref: c, props: i, _owner: Ao.current };
}
Pt.Fragment = Vo;
Pt.jsx = Lr;
Pt.jsxs = Lr;
Wr.exports = Pt;
var Se = Wr.exports, Qo = Object.defineProperty, Yo = Object.defineProperties, Ko = Object.getOwnPropertyDescriptors, kt = Object.getOwnPropertySymbols, Mr = Object.prototype.hasOwnProperty, Br = Object.prototype.propertyIsEnumerable, ur = (e, t, o) => t in e ? Qo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, at = (e, t) => {
  for (var o in t || (t = {})) Mr.call(t, o) && ur(e, o, t[o]);
  if (kt) for (var o of kt(t)) Br.call(t, o) && ur(e, o, t[o]);
  return e;
}, Ft = (e, t) => Yo(e, Ko(t)), ft = (e, t) => {
  var o = {};
  for (var n in e) Mr.call(e, n) && t.indexOf(n) < 0 && (o[n] = e[n]);
  if (e != null && kt) for (var n of kt(e)) t.indexOf(n) < 0 && Br.call(e, n) && (o[n] = e[n]);
  return o;
}, Go = { accent: "var(--clay-icon-accent)", critical: "var(--clay-icon-critical)" }, Xo = (e) => {
  var t = e, { variant: o = "accent" } = t, n = ft(t, ["variant"]);
  return Se.jsx("div", { className: "clay-icon-dot", style: at({ position: "absolute", top: "-0.0625em", right: "-0.125em", width: "0.5em", height: "0.5em", borderRadius: "50%", borderWidth: "0.075em", borderStyle: "solid", borderColor: "var(--clay-dot-bg, #fff)", background: Go[o], transition: "background-color 100ms ease-out" }, n) });
}, Jo = { small: "12px", medium: "16px", large: "20px", xlarge: "24px" }, Dt = he.forwardRef(({ children: e, rotate: t = 0, color: o, fill: n = "none", width: i, height: s, size: c = "medium", hasDot: f, dotProps: w, colorToken: g = "icon" }, b) => {
  let _ = Jo[c] || c, S = (m) => `var(--clay-${m}, #000)`;
  return Se.jsxs("div", { ref: b, style: { position: "relative", display: "inline-flex", transform: `rotate(${t}deg)`, color: o || S(g), fontSize: _, fill: n, width: i || _, height: s || _ }, children: [e, f && Se.jsx(Xo, at({}, w))] });
}), Zo = he.forwardRef((e, t) => {
  var o = e, { rotate: n, width: i, height: s, color: c, colorToken: f, size: w, vectorEffect: g = "non-scaling-stroke", hasDot: b, dotProps: _ } = o, S = ft(o, ["rotate", "width", "height", "color", "colorToken", "size", "vectorEffect", "hasDot", "dotProps"]);
  return Se.jsx(Dt, { hasDot: b, dotProps: _, rotate: n, width: i, height: s, color: c, colorToken: f, size: w, ref: t, children: Se.jsx("svg", Ft(at({ width: "100%", height: "100%", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, S), { children: Se.jsx("path", { d: "M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7ZM12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7ZM12 7L12 22M2 14H22M2 10.2L2 18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22L18.8 22C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V10.2C22 9.0799 22 8.51984 21.782 8.09202C21.5903 7.7157 21.2843 7.40974 20.908 7.21799C20.4802 7 19.9201 7 18.8 7L5.2 7C4.0799 7 3.51984 7 3.09202 7.21799C2.7157 7.40973 2.40973 7.71569 2.21799 8.09202C2 8.51984 2 9.07989 2 10.2Z", stroke: "currentColor", strokeWidth: "1.2", vectorEffect: g, strokeLinecap: "round", strokeLinejoin: "round" }) })) });
}), en = he.forwardRef((e, t) => {
  var o = e, { rotate: n, width: i, height: s, color: c, colorToken: f, size: w, vectorEffect: g = "non-scaling-stroke", hasDot: b, dotProps: _ } = o, S = ft(o, ["rotate", "width", "height", "color", "colorToken", "size", "vectorEffect", "hasDot", "dotProps"]);
  return Se.jsx(Dt, { hasDot: b, dotProps: _, rotate: n, width: i, height: s, color: c, colorToken: f, size: w, ref: t, children: Se.jsx("svg", Ft(at({ width: "100%", height: "100%", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, S), { children: Se.jsx("path", { d: "M18 15L12 9L6 15", stroke: "currentColor", strokeWidth: "1.2", vectorEffect: g, strokeLinecap: "round", strokeLinejoin: "round" }) })) });
}), tn = he.forwardRef((e, t) => {
  var o = e, { rotate: n, width: i, height: s, color: c, colorToken: f, size: w, vectorEffect: g = "non-scaling-stroke", hasDot: b, dotProps: _ } = o, S = ft(o, ["rotate", "width", "height", "color", "colorToken", "size", "vectorEffect", "hasDot", "dotProps"]);
  return Se.jsx(Dt, { hasDot: b, dotProps: _, rotate: n, width: i, height: s, color: c, colorToken: f, size: w, ref: t, children: Se.jsx("svg", Ft(at({ width: "100%", height: "100%", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, S), { children: Se.jsx("path", { d: "M6 9L12 15L18 9", stroke: "currentColor", strokeWidth: "1.2", vectorEffect: g, strokeLinecap: "round", strokeLinejoin: "round" }) })) });
}), Kt = he.forwardRef((e, t) => {
  var o = e, { rotate: n, width: i, height: s, color: c, colorToken: f, size: w, vectorEffect: g = "non-scaling-stroke", hasDot: b, dotProps: _ } = o, S = ft(o, ["rotate", "width", "height", "color", "colorToken", "size", "vectorEffect", "hasDot", "dotProps"]);
  return Se.jsx(Dt, { hasDot: b, dotProps: _, rotate: n, width: i, height: s, color: c, colorToken: f, size: w, ref: t, children: Se.jsx("svg", Ft(at({ width: "100%", height: "100%", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, S), { children: Se.jsx("path", { d: "M19 12H5M5 12L12 19M5 12L12 5", stroke: "currentColor", strokeWidth: "1.2", vectorEffect: g, strokeLinecap: "round", strokeLinejoin: "round" }) })) });
});
const tt = (e) => x.useRef(new URLSearchParams(window.location.search).get(e) ?? void 0).current;
function $r(e) {
  const [t, o] = he.useState(!1), {
    colors: n
  } = Le();
  return he.useEffect(() => {
    try {
      const c = nr([235, 235, 235]), f = i() ?? n.backgroundColor, w = f.startsWith("#") ? oo(f) : no(f), g = nr(w);
      o(g < c);
    } catch {
      o(!1);
    }
    function i() {
      try {
        const c = (e == null ? void 0 : e.closest(".section_wrap")).querySelector(".section_bg_color"), f = window.getComputedStyle(c).backgroundColor;
        return io(f) ? null : f;
      } catch {
        return null;
      }
    }
  }, [n.backgroundColor, e]), t;
}
const ye = ({
  title: e,
  summary: t,
  defaultStateOpen: o = !1,
  enableFold: n = !0,
  children: i
}) => {
  const {
    colors: s,
    fonts: c,
    align: f
  } = Le(), w = x.useRef(null), [g, b] = x.useState(o), _ = $r(w.current), S = () => {
    b((m) => !m);
  };
  return x.Children.count(i) === 0 ? null : r(x.Fragment, null, r("div", {
    "data-section-fold-root": !0,
    ref: w,
    css: [{
      backgroundColor: s.backgroundColor_hue_10
    }, {
      marginLeft: "-15px",
      marginRight: "-15px",
      marginBottom: "12px",
      borderRadius: "0",
      "@media (min-width: 768px)": {
        marginLeft: "0px",
        marginRight: "0px",
        marginBottom: "16px",
        borderRadius: "16px"
      }
    }, _ && {
      borderBottomWidth: "1px",
      borderTopWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(226 229 233 / var(--tw-border-opacity))",
      "@media (min-width: 768px)": {
        borderLeftWidth: "1px",
        borderRightWidth: "1px"
      }
    }]
  }, r("div", {
    css: [{
      padding: "24px",
      "@media (min-width: 768px)": {
        padding: "24px 20px"
      }
    }, {
      minHeight: 32,
      ...f.center,
      justifyContent: "space-between",
      cursor: n ? "pointer" : "default"
    }],
    onClick: n ? S : void 0
  }, r("div", {
    css: {
      fontFamily: c.pretendard,
      fontWeight: 700,
      fontSize: 20
    }
  }, e), n ? r("div", {
    css: f.center
  }, g ? null : r("span", {
    css: {
      marginRight: 16,
      color: s.titleColor,
      fontSize: 15,
      fontFamily: c.pretendard
    }
  }, t), r("div", {
    css: {
      border: "none",
      cursor: "pointer",
      backgroundColor: "transparent",
      padding: 0,
      ...f.center
    }
  }, g ? r(en, {
    size: "xlarge",
    color: s.titleColor
  }) : r(tn, {
    size: "xlarge",
    color: s.titleColor
  }))) : null), g ? r("div", {
    css: {
      padding: "0 24px 24px",
      "@media (min-width: 768px)": {
        padding: "0 20px 24px"
      }
    }
  }, i) : null));
};
function qt() {
  return qt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o) ({}).hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, qt.apply(null, arguments);
}
const Gt = ({
  children: e,
  forceMobileView: t,
  ...o
}) => {
  const {
    colors: n
  } = Le(), i = x.useRef(null), s = $r(i.current);
  return r("div", qt({
    ref: i,
    css: [{
      backgroundColor: n.backgroundColor_hue_10
    }, {
      height: "fit-content",
      "@media not all and (min-width: 768px)": {
        marginLeft: "-15px",
        marginRight: "-15px",
        marginBottom: "12px",
        borderRadius: "0"
      },
      "@media (min-width: 768px)": {
        marginBottom: "12px",
        borderRadius: "16px"
      }
    }, s && {
      borderBottomWidth: "1px",
      borderTopWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(226 229 233 / var(--tw-border-opacity))",
      "@media (min-width: 768px)": {
        borderLeftWidth: "1px",
        borderRightWidth: "1px"
      }
    }]
  }, o), e);
};
function rn(e, t) {
  const o = Lo(e);
  if (isNaN(t)) return jt(e, NaN);
  if (!t)
    return o;
  const n = o.getDate(), i = jt(e, o.getTime());
  i.setMonth(o.getMonth() + t + 1, 0);
  const s = i.getDate();
  return n >= s ? i : (o.setFullYear(
    i.getFullYear(),
    i.getMonth(),
    n
  ), o);
}
function on(e, t) {
  return Mo(e, -t);
}
function nn(e, t) {
  return rn(e, -t);
}
function an(e, t) {
  const {
    years: o = 0,
    months: n = 0,
    weeks: i = 0,
    days: s = 0,
    hours: c = 0,
    minutes: f = 0,
    seconds: w = 0
  } = t, g = nn(e, n + o * 12), b = on(g, s + i * 7), _ = f + c * 60, m = (w + _ * 60) * 1e3;
  return jt(e, b.getTime() - m);
}
const Mt = "#008AFF", sn = "#31708F", Ze = Tr("#212121").alpha(0.7).rgb().string(), fr = "#FB4637", gr = ({
  statusCode: e,
  isUnpaidDepositOrderCancelable: t,
  color: o,
  isExchange: n
}) => {
  const {
    ct: i
  } = me();
  switch (e) {
    case "OSS01":
      return t ? r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Mt
        }
      }, i("타이틀_입금대기")) : r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Mt
        }
      }, i("타이틀_상품준비"));
    case "OSS02":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Mt
        }
      }, i("타이틀_배송대기"));
    case "OSS03":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: sn
        }
      }, i("타이틀_배송중"));
    case "OSS04":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Ze
        }
      }, i("타이틀_배송완료"));
    case "OSS05":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Ze
        }
      }, i("타이틀_구매확정"));
    case "OSS06":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: fr
        }
      }, i("타이틀_취소접수"));
    case "OSS07":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Ze
        }
      }, i("타이틀_취소완료"));
    case "OSS08":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: fr
        }
      }, i(n ? "타이틀_교환접수" : "타이틀_반품접수"));
    case "OSS09":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Ze
        }
      }, i("타이틀_회수지시"));
    case "OSS10":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Ze
        }
      }, i("타이틀_회수중"));
    case "OSS11":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Ze
        }
      }, i("타이틀_상품확인중"));
    case "OSS12":
      return r(h, {
        css: {
          fontWeight: "bold",
          fontSize: 16,
          color: Ze
        }
      }, i(n ? "타이틀_교환완료" : "타이틀_반품완료"));
    default:
      return "";
  }
}, se = ao.button`
  font-family: Pretendard;
`, ln = ({
  queryOptions: e
} = {}) => ({
  queryKey: ["ShortToken"],
  queryFn: async ({
    signal: t
  }) => {
    let o = window.sessionStorage.getItem(ir);
    if (typeof o != "string") {
      const {
        data: i
      } = await St.get("/ajax/oms/OMS_auth.cm");
      if (!/^SUCCESS$/i.test(i == null ? void 0 : i.msg))
        throw new Error(i == null ? void 0 : i.msg);
      window.sessionStorage.setItem(ir, i.token), o = i.token;
    }
    const {
      data: n
    } = await St.get("/ajax/oms/OMS_short_token.cm", {
      signal: t,
      headers: {
        Authorization: `Bearer ${o}`
      }
    });
    return n;
  },
  ...e
}), dn = ({
  orderCode: e,
  orderSectionCode: t
}, o) => ({
  mutationKey: ["PurchaseConfirmation", e, t],
  mutationFn: async () => {
    const {
      data: n
    } = await We.patch(`/customer/v1/orders/${e}/sections/purchase-confirmation`, {
      orderCode: e,
      orderSectionCode: t
    });
    return n;
  },
  ...o
});
/*!
 * currency.js - v2.0.4
 * http://scurker.github.io/currency.js
 *
 * Copyright (c) 2021 Jason Wilson
 * Released under MIT license
 */
var cn = {
  symbol: "$",
  separator: ",",
  decimal: ".",
  errorOnInvalid: !1,
  precision: 2,
  pattern: "!#",
  negativePattern: "-!#",
  format: gn,
  fromCents: !1
}, Nr = function(t) {
  return Math.round(t);
}, Xt = function(t) {
  return Math.pow(10, t);
}, pn = function(t, o) {
  return Nr(t / o) * o;
}, un = /(\d)(?=(\d{3})+\b)/g, fn = /(\d)(?=(\d\d)+\d\b)/g;
function xe(e, t) {
  var o = this;
  if (!(o instanceof xe))
    return new xe(e, t);
  var n = Object.assign({}, cn, t), i = Xt(n.precision), s = Ct(e, n);
  o.intValue = s, o.value = s / i, n.increment = n.increment || 1 / i, n.useVedic ? n.groups = fn : n.groups = un, this.s = n, this.p = i;
}
function Ct(e, t) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, n = 0, i = t.decimal, s = t.errorOnInvalid, c = t.precision, f = t.fromCents, w = Xt(c), g = typeof e == "number", b = e instanceof xe;
  if (b && f)
    return e.intValue;
  if (g || b)
    n = b ? e.value : e;
  else if (typeof e == "string") {
    var _ = new RegExp("[^-\\d" + i + "]", "g"), S = new RegExp("\\" + i, "g");
    n = e.replace(/\((.*)\)/, "-$1").replace(_, "").replace(S, "."), n = n || 0;
  } else {
    if (s)
      throw Error("Invalid Input");
    n = 0;
  }
  return f || (n *= w, n = n.toFixed(4)), o ? Nr(n) : n;
}
function gn(e, t) {
  var o = t.pattern, n = t.negativePattern, i = t.symbol, s = t.separator, c = t.decimal, f = t.groups, w = ("" + e).replace(/^-/, "").split("."), g = w[0], b = w[1];
  return (e.value >= 0 ? o : n).replace("!", i).replace("#", g.replace(f, "$1" + s) + (b ? c + b : ""));
}
xe.prototype = {
  /**
   * Adds values together.
   * @param {number} number
   * @returns {currency}
   */
  add: function(t) {
    var o = this.intValue, n = this.s, i = this.p;
    return xe((o += Ct(t, n)) / (n.fromCents ? 1 : i), n);
  },
  /**
   * Subtracts value.
   * @param {number} number
   * @returns {currency}
   */
  subtract: function(t) {
    var o = this.intValue, n = this.s, i = this.p;
    return xe((o -= Ct(t, n)) / (n.fromCents ? 1 : i), n);
  },
  /**
   * Multiplies values.
   * @param {number} number
   * @returns {currency}
   */
  multiply: function(t) {
    var o = this.intValue, n = this.s;
    return xe((o *= t) / (n.fromCents ? 1 : Xt(n.precision)), n);
  },
  /**
   * Divides value.
   * @param {number} number
   * @returns {currency}
   */
  divide: function(t) {
    var o = this.intValue, n = this.s;
    return xe(o /= Ct(t, n, !1), n);
  },
  /**
   * Takes the currency amount and distributes the values evenly. Any extra pennies
   * left over from the distribution will be stacked onto the first set of entries.
   * @param {number} count
   * @returns {array}
   */
  distribute: function(t) {
    for (var o = this.intValue, n = this.p, i = this.s, s = [], c = Math[o >= 0 ? "floor" : "ceil"](o / t), f = Math.abs(o - c * t), w = i.fromCents ? 1 : n; t !== 0; t--) {
      var g = xe(c / w, i);
      f-- > 0 && (g = g[o >= 0 ? "add" : "subtract"](1 / w)), s.push(g);
    }
    return s;
  },
  /**
   * Returns the dollar value.
   * @returns {number}
   */
  dollars: function() {
    return ~~this.value;
  },
  /**
   * Returns the cent value.
   * @returns {number}
   */
  cents: function() {
    var t = this.intValue, o = this.p;
    return ~~(t % o);
  },
  /**
   * Formats the value as a string according to the formatting settings.
   * @param {boolean} useSymbol - format with currency symbol
   * @returns {string}
   */
  format: function(t) {
    var o = this.s;
    return typeof t == "function" ? t(this, o) : o.format(this, Object.assign({}, o, t));
  },
  /**
   * Formats the value as a string according to the formatting settings.
   * @returns {string}
   */
  toString: function() {
    var t = this.intValue, o = this.p, n = this.s;
    return pn(t / o, n.increment).toFixed(n.precision);
  },
  /**
   * Value for JSON serialization.
   * @returns {float}
   */
  toJSON: function() {
    return this.value;
  }
};
function xr(e, t) {
  if (e.inserted[t.name] === void 0)
    return e.insert("", t, e.sheet, !0);
}
function hr(e, t, o) {
  var n = [], i = zr(e, n, o);
  return n.length < 2 ? o : i + t(n);
}
var xn = function(t) {
  var o = so(t);
  o.sheet.speedy = function(f) {
    this.isSpeedy = f;
  }, o.compat = !0;
  var n = function() {
    for (var w = arguments.length, g = new Array(w), b = 0; b < w; b++)
      g[b] = arguments[b];
    var _ = Lt(g, o.registered, void 0);
    return lo(o, _, !1), o.key + "-" + _.name;
  }, i = function() {
    for (var w = arguments.length, g = new Array(w), b = 0; b < w; b++)
      g[b] = arguments[b];
    var _ = Lt(g, o.registered), S = "animation-" + _.name;
    return xr(o, {
      name: _.name,
      styles: "@keyframes " + S + "{" + _.styles + "}"
    }), S;
  }, s = function() {
    for (var w = arguments.length, g = new Array(w), b = 0; b < w; b++)
      g[b] = arguments[b];
    var _ = Lt(g, o.registered);
    xr(o, _);
  }, c = function() {
    for (var w = arguments.length, g = new Array(w), b = 0; b < w; b++)
      g[b] = arguments[b];
    return hr(o.registered, n, hn(g));
  };
  return {
    css: n,
    cx: c,
    injectGlobal: s,
    keyframes: i,
    hydrate: function(w) {
      w.forEach(function(g) {
        o.inserted[g] = !0;
      });
    },
    flush: function() {
      o.registered = {}, o.inserted = {}, o.sheet.flush();
    },
    // $FlowFixMe
    sheet: o.sheet,
    cache: o,
    getRegisteredStyles: zr.bind(null, o.registered),
    merge: hr.bind(null, o.registered, n)
  };
}, hn = function e(t) {
  for (var o = "", n = 0; n < t.length; n++) {
    var i = t[n];
    if (i != null) {
      var s = void 0;
      switch (typeof i) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(i))
            s = e(i);
          else {
            s = "";
            for (var c in i)
              i[c] && c && (s && (s += " "), s += c);
          }
          break;
        }
        default:
          s = i;
      }
      s && (o && (o += " "), o += s);
    }
  }
  return o;
}, mn = xn({
  key: "css"
}), yn = mn.cx;
const st = x.memo(({
  productCode: e,
  orderCode: t,
  subOrderCode: o,
  ...n
}) => {
  const i = x.useRef(null);
  return x.useEffect(() => {
    typeof window.crema < "u" && i.current !== null && window.crema.run();
  }), r("a", {
    ref: i,
    className: yn("crema-new-review-link", n.className),
    "data-product-code": e,
    "data-order-code": t,
    "data-sub-order-code": o,
    "data-sub-order-validation": "true",
    "data-show-after-loading": "true",
    style: {
      display: "none"
    },
    href: "#"
  }, n.children);
}), bn = ({
  sectionItem: e,
  section: t
}) => {
  var ve, pe, be, Re, Oe, _e, Te, Me, He, Fe, De, je, d, U, l, p, a, u, v, k, z, Q, re, ne, Ce, Je, qe, Ve;
  const o = tt("order_no"), {
    ct: n,
    nf: i
  } = me(), {
    buttons: s,
    colors: c,
    fonts: f
  } = Le(), w = pt(), g = x.useRef(null), b = x.useRef(null), _ = x.useRef(null), S = x.useRef(null), m = x.useRef(null), C = x.useRef(null), {
    data: A
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => R.currency
    }
  })), ee = it(A, A === n("getCurrency")), {
    data: K
  } = D(ct({
    queryOptions: {
      select: (R) => R.reviewThirdParty
    }
  })), {
    data: P
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => R.orderCode
    }
  })), {
    data: Y
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => R.orderTypeCd === Z.OOT03.code
    }
  })), {
    data: B
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => R.isUnpaidDepositOrderCancelable
    }
  })), {
    data: j
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => {
        const [I] = R.payments;
        return (I == null ? void 0 : I.paidPrice) ?? 0;
      }
    }
  })), {
    data: ie
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => {
        const I = new URLSearchParams();
        return I.set("m2", "order"), I.set("idx", R.orderNo), I.set("cancel_idx", R.orderNo), I.set("order_no", R.orderNo), I.set("section_item_code", e.orderSectionItemCode), R.isMember !== "Y" && I.set("guest_login", "Y"), "/shop_mypage/?" + I.toString();
      }
    }
  })), {
    data: V
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => {
        const I = new URLSearchParams();
        return I.set("m2", "order"), I.set("idx", R.orderNo), I.set("return_idx", R.orderNo), I.set("order_no", R.orderNo), I.set("section_item_code", e.orderSectionItemCode), R.isMember !== "Y" && I.set("guest_login", "Y"), "/shop_mypage/?" + I.toString();
      }
    }
  })), {
    data: T
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => R.orderItems.find((I) => I.orderItemCode === e.orderItemCode)
    }
  })), {
    data: M
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (R) => {
        var xt;
        const [I] = ((xt = R.orderItems.find((ht) => ht.orderItemCode === e.orderItemCode)) == null ? void 0 : xt.imageUrls) ?? [];
        return I || "";
      }
    }
  })), {
    data: $
  } = D(ln({
    queryOptions: {
      select: (R) => {
        const I = new URLSearchParams();
        return I.set("orderCode", P ?? ""), I.set("sectionCode", t.orderSectionCode), I.set("sectionItemCode", e.orderSectionItemCode), I.set("t", (R == null ? void 0 : R.token) ?? ""), "/shop/oms/OMS_digital_product_download.cm?" + I.toString();
      }
    }
  })), {
    mutateAsync: le,
    data: H
  } = nt(dn({
    orderCode: P,
    orderSectionCode: e.orderSectionCode
  })), [N, G, E] = (((ve = e.groupPass) == null ? void 0 : ve.expireDate) ?? "").split("-").map(Number), y = Ge(an(new Date(N || 9999, (G ?? 12) - 1, E ?? 31), {
    days: 1
  }), "yyyy-MM-dd 23:59");
  typeof ((pe = e.groupPass) == null ? void 0 : pe.expireDate) == "string" && (/* @__PURE__ */ new Date()).getTime() > new Date((be = e.groupPass) == null ? void 0 : be.expireDate).getTime(), typeof ((Re = e.digitalProduct) == null ? void 0 : Re.downloadLimitTime) == "string" && (/* @__PURE__ */ new Date()).getTime() > new Date((Oe = e.digitalProduct) == null ? void 0 : Oe.downloadLimitTime).getTime(), typeof ((_e = e.digitalProduct) == null ? void 0 : _e.downloadAbleCnt) == "number" && ((Te = e.digitalProduct) == null ? void 0 : Te.downloadAbleCnt) <= 0;
  const F = () => {
    window.SITE_SHOP_REVIEW.C3_openAddReview(0, T == null ? void 0 : T.prodCode, T == null ? void 0 : T.orderItemCode);
  }, L = async () => {
    if (!window.confirm(n("설명_구매확정여부확인")))
      return;
    const {
      code: R,
      data: I
    } = await le();
    if (I.updateResult)
      return window.location.reload();
    window.alert(n("설명_구매확정처리실패"));
  }, O = () => window.SITE_SHOP_MYPAGE.C3_withdrawCancelOrder({
    qty: e.qty,
    orderCode: P,
    orderSectionCode: t.orderSectionCode,
    orderSectionItemCode: e.orderSectionItemCode
  }), J = () => window.SITE_SHOP_MYPAGE.C3_withdrawExchangeOrder({
    orderCode: P,
    orderSectionCode: t.orderSectionCode,
    orderSectionItemCode: e.orderSectionItemCode,
    qty: e.qty
  }), oe = () => window.SITE_SHOP_MYPAGE.C3_withdrawReturnOrder({
    orderCode: P,
    orderSectionCode: t.orderSectionCode,
    orderSectionItemCode: e.orderSectionItemCode,
    qty: e.qty
  }), X = [s.default, {
    height: "fit-content",
    minWidth: "100px",
    padding: "9px 0",
    textAlign: "center",
    fontSize: "14px",
    lineHeight: "22.4px",
    "@media not all and (min-width: 768px)": {
      flex: "1 1 0%"
    }
  }], de = [s.primary, {
    height: "fit-content",
    minWidth: "100px",
    padding: "9px 0",
    textAlign: "center",
    fontSize: "14px",
    lineHeight: "22.4px",
    "@media not all and (min-width: 768px)": {
      flex: "1 1 0%"
    }
  }];
  return r("div", {
    css: {
      display: "flex",
      paddingLeft: "24px",
      paddingRight: "24px",
      ":last-child": {
        marginBottom: "8px"
      },
      ":not(:last-child)": {
        marginBottom: "32px"
      },
      "@media not all and (min-width: 768px)": {
        flexDirection: "column",
        ":last-child": {
          marginBottom: "0px"
        },
        ":not(:last-child)": {
          marginBottom: "42px"
        }
      },
      "@media (min-width: 768px)": {
        minHeight: "136px"
      }
    }
  }, r("a", {
    href: `/shop_view/?idx=${T.no}`,
    css: {
      display: "flex",
      flex: "1 1 0%",
      "@media not all and (min-width: 768px)": {
        marginBottom: "16px"
      },
      "@media (min-width: 768px)": {
        marginRight: "16px",
        alignItems: "center"
      }
    }
  }, r("img", {
    src: M,
    css: {
      marginRight: "16px",
      height: "56px",
      width: "56px",
      borderRadius: "12px",
      objectFit: "cover"
    }
  }), r("div", {
    css: {
      flex: "1 1 0%"
    }
  }, r("div", {
    css: {
      marginBottom: "6px",
      fontWeight: "700",
      lineHeight: "22px",
      "@media (min-width: 768px)": {
        display: "none"
      }
    }
  }, r(gr, {
    statusCode: t.statusCd,
    isUnpaidDepositOrderCancelable: B ?? !1,
    isExchange: ((Me = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : Me.isExchange) === "Y"
  })), r(h, {
    css: [{
      color: c.titleColor,
      fontSize: "16px",
      lineHeight: "22px",
      marginBottom: 2
    }, {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: "3"
    }]
  }, T == null ? void 0 : T.prodName), r(te, {
    flex: !0,
    css: [{
      color: c.bodyColor_mist_font70,
      fontSize: "14px",
      fontFamily: f.pretendard,
      lineHeight: "22px",
      marginBottom: 2,
      alignItems: "center",
      flexWrap: "wrap"
    }]
  }, T == null ? void 0 : T.optionInfo.map((R, I) => r(x.Fragment, {
    key: `${I}_optionInfo`
  }, `${R.optionName}: ${R.optionValue}`, r(te, {
    css: [{
      marginLeft: "4px",
      marginRight: "4px",
      height: "12px",
      width: "1px",
      padding: "0px"
    }, {
      backgroundColor: c.bodyColor_mist_font10
    }]
  }))), (t == null ? void 0 : t.statusCd) === "OSS05" && typeof ((He = e.digitalProduct) == null ? void 0 : He.downloadAbleCnt) == "number" && ((Fe = e.digitalProduct) == null ? void 0 : Fe.downloadAbleCnt) <= co ? r(x.Fragment, null, r(te, {
    inline: !0,
    css: [{
      fontFamily: f.pretendard,
      color: "#E28100"
    }]
  }, n("설명_다운로드n회가능", i(Math.max(0, (De = e.digitalProduct) == null ? void 0 : De.downloadAbleCnt)))), r(te, {
    css: [{
      marginLeft: "4px",
      marginRight: "4px",
      height: "12px",
      width: "1px",
      padding: "0px"
    }, {
      backgroundColor: c.bodyColor_mist_font10
    }]
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS05" && typeof ((je = e.digitalProduct) == null ? void 0 : je.downloadLimitTime) == "string" && !new RegExp(po).test((d = e.digitalProduct) == null ? void 0 : d.downloadLimitTime) ? r(x.Fragment, null, r(te, {
    inline: !0,
    css: [{
      fontFamily: f.pretendard,
      color: "#E28100"
    }]
  }, `${Ge(new Date((U = e.digitalProduct) == null ? void 0 : U.downloadLimitTime), "yyyy-MM-dd HH:mm")} ${n("설명_만료")}`), r(te, {
    css: [{
      marginLeft: "4px",
      marginRight: "4px",
      height: "12px",
      width: "1px",
      padding: "0px"
    }, {
      backgroundColor: c.bodyColor_mist_font10
    }]
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS05" && typeof ((l = e.groupPass) == null ? void 0 : l.expireDate) == "string" ? r(x.Fragment, null, r(
    te,
    {
      inline: !0,
      css: [{
        fontFamily: f.pretendard,
        color: "#E28100"
      }]
    },
    // 만료 시간을 하드코딩한 이유는 현재 아임웹에서는 만료 날짜만 들고 있기 때문. 엔드유저의 타임존에 대한 고려도 되어 있지 않아 브라우저에서 변환하지 않고 그대로 사용.
    `${y} ${n("설명_만료")}`
  ), r(te, {
    css: [{
      marginLeft: "4px",
      marginRight: "4px",
      height: "12px",
      width: "1px",
      padding: "0px"
    }, {
      backgroundColor: c.bodyColor_mist_font10
    }]
  })) : null, `${i(e.qty)} ${n("설명_개")}`), r("div", {
    css: {
      display: "flex",
      fontFamily: "Pretendard"
    }
  }, r(te, {
    css: [{
      color: c.bodyColor,
      fontWeight: "bold",
      fontSize: 16
    }, {
      "@media not all and (min-width: 768px)": {
        lineHeight: "21px"
      },
      "@media (min-width: 768px)": {
        lineHeight: "19px"
      }
    }]
  }, ee(xe((T == null ? void 0 : T.itemPrice) ?? 0).multiply(e.qty))), ((T == null ? void 0 : T.baseItemPrice) ?? 0) > ((T == null ? void 0 : T.itemPrice) ?? 0) ? r(te, {
    css: [{
      marginLeft: 4,
      color: c.bodyColorDisabled,
      fontSize: 14,
      textDecoration: "line-through"
    }, {
      "@media not all and (min-width: 768px)": {
        lineHeight: "21px"
      },
      "@media (min-width: 768px)": {
        lineHeight: "19px"
      }
    }]
  }, ee(((T == null ? void 0 : T.baseItemPrice) ?? 0) * e.qty)) : null))), r("div", {
    css: [{
      marginRight: "16px",
      display: "flex",
      width: "136px",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      "@media not all and (min-width: 768px)": {
        display: "none"
      }
    }, {
      color: c.bodyColor_mist_font70
    }]
  }, r(gr, {
    statusCode: t.statusCd,
    isUnpaidDepositOrderCancelable: B ?? !1,
    isExchange: ((p = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : p.isExchange) === "Y"
  })), r("div", {
    css: {
      display: "flex",
      minWidth: "100px",
      flexDirection: "column",
      justifyContent: "center",
      gap: "8px",
      "@media not all and (min-width: 768px)": {
        flexDirection: "row"
      }
    }
  }, (t == null ? void 0 : t.statusCd) === "OSS01" && !B && K === "crema" ? r(st, {
    css: de,
    productCode: `${(T == null ? void 0 : T.no) ?? ""}`,
    orderCode: o,
    subOrderCode: `${e.orderSectionItemNo}`
  }, n("버튼_구매평작성")) : null, (t == null ? void 0 : t.statusCd) === "OSS01" && B ? r(x.Fragment, null, r("button", {
    css: X,
    onClick: () => {
      var R;
      return (R = g.current) == null ? void 0 : R.open();
    }
  }, n("버튼_취소")), r(Wo, {
    ref: g,
    orderCode: P ?? "",
    unPaidPrice: j ?? 0,
    onSubmitSuccess: () => w.invalidateQueries(["Orders", o]),
    currencyUnit: A
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS01" && !B && e.isCancelable ? r("a", {
    css: X,
    href: ie
  }, n("버튼_취소")) : null, (t == null ? void 0 : t.statusCd) === "OSS02" && K === "crema" ? r(st, {
    css: de,
    productCode: `${(T == null ? void 0 : T.no) ?? ""}`,
    orderCode: o,
    subOrderCode: `${e.orderSectionItemNo}`
  }, n("버튼_구매평작성")) : null, (t == null ? void 0 : t.statusCd) === "OSS02" && e.isCancelable ? r("a", {
    css: X,
    href: ie
  }, n("버튼_취소")) : null, (t == null ? void 0 : t.statusCd) === "OSS03" && K === "crema" ? r(st, {
    css: de,
    productCode: `${(T == null ? void 0 : T.no) ?? ""}`,
    orderCode: o,
    subOrderCode: `${e.orderSectionItemNo}`
  }, n("버튼_구매평작성")) : null, (t == null ? void 0 : t.statusCd) === "OSS03" && e.isReturnable ? r("a", {
    href: V,
    css: X
  }, n("버튼_반품교환")) : null, (t == null ? void 0 : t.statusCd) === "OSS03" && [
    Z.ODT02.code,
    // 택배
    Z.ODT05.code,
    // 직접배송
    Z.ODT06.code,
    // 퀵
    Z.ODT08.code
    // 편의점
  ].includes(t == null ? void 0 : t.deliveryTypeCd) ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = b.current) == null ? void 0 : R.open();
    }
  }, n("버튼_배송조회")), r(dr, {
    ref: b,
    orderNo: o,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS04" && K === "crema" ? r(st, {
    css: de,
    productCode: `${(T == null ? void 0 : T.no) ?? ""}`,
    orderCode: o,
    subOrderCode: `${e.orderSectionItemNo}`
  }, n("버튼_구매평작성")) : null, (t == null ? void 0 : t.statusCd) === "OSS04" && e.isReturnable ? r("a", {
    href: V,
    css: X
  }, n("버튼_반품교환")) : null, (t == null ? void 0 : t.statusCd) === "OSS04" && [
    Z.ODT02.code,
    // 택배
    Z.ODT05.code,
    // 직접배송
    Z.ODT06.code,
    // 퀵
    Z.ODT08.code
    // 편의점
  ].includes(t == null ? void 0 : t.deliveryTypeCd) ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = b.current) == null ? void 0 : R.open();
    }
  }, n("버튼_배송조회")), r(dr, {
    ref: b,
    orderNo: o,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS04" && !(H != null && H.data.updateResult) ? r(se, {
    css: de,
    onClick: L
  }, n("버튼_구매확정")) : null, (t == null ? void 0 : t.statusCd) === "OSS05" && K === "crema" ? r(st, {
    css: de,
    productCode: `${(T == null ? void 0 : T.no) ?? ""}`,
    orderCode: o,
    subOrderCode: `${e.orderSectionItemNo}`
  }, n("버튼_구매평작성")) : null, (t == null ? void 0 : t.statusCd) === "OSS05" && !(T != null && T.reviewCode) && K === null ? r(se, {
    css: de,
    onClick: F
  }, n("버튼_구매평작성")) : null, (t == null ? void 0 : t.statusCd) === "OSS05" && Y ? r("a", {
    css: X,
    href: $
  }, n("버튼_다운로드")) : null, (t == null ? void 0 : t.statusCd) === "OSS05" && e.isRepurchasable ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = m.current) == null ? void 0 : R.open();
    }
  }, n("버튼_재구매")), r($o, {
    ref: m,
    orderNo: o,
    orderItemCode: T.orderItemCode,
    sectionItemCode: e.orderSectionItemCode,
    fallbackCallback: () => {
      var R, I;
      (R = m.current) == null || R.close(), (I = C.current) == null || I.open();
    }
  }), r(No, {
    ref: C,
    itemNo: T.no
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS06" ? r(se, {
    css: X,
    onClick: O
  }, n("버튼_취소철회")) : null, (t == null ? void 0 : t.statusCd) === "OSS06" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = _.current) == null ? void 0 : R.open();
    }
  }, n("버튼_취소상세")), r(cr, {
    ref: _,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode,
    currencyUnit: A
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS07" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = _.current) == null ? void 0 : R.open();
    }
  }, n("버튼_취소상세")), r(cr, {
    ref: _,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode,
    currencyUnit: A
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS08" && ((a = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : a.isExchange) === "Y" ? r(se, {
    css: X,
    onClick: J
  }, n("버튼_교환철회")) : null, (t == null ? void 0 : t.statusCd) === "OSS08" && ((u = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : u.isExchange) === "Y" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_교환상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS08" && ((v = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : v.isExchange) === "N" ? r(se, {
    css: X,
    onClick: oe
  }, n("버튼_반품철회")) : null, (t == null ? void 0 : t.statusCd) === "OSS08" && ((k = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : k.isExchange) === "N" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_반품상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS09" && ((z = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : z.isExchange) === "Y" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_교환상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS09" && ((Q = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : Q.isExchange) === "N" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_반품상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS10" && ((re = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : re.isExchange) === "Y" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_교환상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS10" && ((ne = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : ne.isExchange) === "N" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_반품상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS11" && ((Ce = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : Ce.isExchange) === "Y" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_교환상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS11" && ((Je = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : Je.isExchange) === "N" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_반품상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS12" && ((qe = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : qe.isExchange) === "Y" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_교환상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null, (t == null ? void 0 : t.statusCd) === "OSS12" && ((Ve = t == null ? void 0 : t.orderSectionReturn) == null ? void 0 : Ve.isExchange) === "N" ? r(x.Fragment, null, r(se, {
    css: X,
    onClick: () => {
      var R;
      return (R = S.current) == null ? void 0 : R.open();
    }
  }, n("버튼_반품상세")), r(Be, {
    ref: S,
    orderNo: o,
    orderItemCode: e == null ? void 0 : e.orderItemCode,
    sectionItemCode: e == null ? void 0 : e.orderSectionItemCode,
    sectionCode: t.orderSectionCode
  })) : null));
}, Cn = ({
  section: e,
  currencyUnit: t,
  ...o
}) => {
  const {
    ct: n
  } = me(), i = it(t, t === n("getCurrency")), s = e.deliveryPrice + e.deliveryIslandPrice + Math.max(0, e.deliveryExtraPrice), c = s === 0 ? n("타이틀_무료배송A") : i(s);
  return r("div", {
    css: [{
      ":not(:last-child)": {
        marginBottom: "32px",
        borderBottomWidth: "1px",
        "--tw-border-opacity": "1",
        borderBottomColor: "rgb(226 229 233 / var(--tw-border-opacity))"
      },
      "@media not all and (min-width: 768px)": {
        marginTop: "32px",
        ":not(:last-child)": {
          marginBottom: "42px"
        }
      }
    }, e.deliveryPayTypeCd === Z.ODP01.code && {
      paddingBottom: "24px"
    }]
  }, (e.orderSectionItems ?? []).map((f) => r(bn, {
    key: f.orderSectionItemCode,
    sectionItem: f,
    section: e
  })), e.deliveryPayTypeCd === Z.ODP02.code ? r("div", {
    css: {
      display: "flex",
      height: "40px",
      justifyContent: "center"
    }
  }, r(h, {
    css: {
      fontSize: "15px"
    }
  }, n("설명_배송비"), r(te, {
    inline: !0,
    css: {
      marginLeft: "4px",
      fontSize: "15px",
      fontWeight: "700"
    }
  }, c))) : null, e.deliveryPayTypeCd === Z.ODP03.code ? r("div", {
    css: {
      display: "flex",
      height: "40px",
      justifyContent: "center"
    }
  }, r(h, {
    css: {
      fontSize: "15px"
    }
  }, r(te, {
    inline: !0,
    css: {
      marginRight: "4px"
    }
  }, n("타이틀_착불")), n("설명_배송비"), s > 0 ? r(te, {
    inline: !0,
    css: {
      marginLeft: "4px",
      fontSize: "15px",
      fontWeight: "700"
    }
  }, c) : null)) : null);
};
function Vt() {
  return Vt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o) ({}).hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, Vt.apply(null, arguments);
}
const ze = ({
  color: e = "#999999",
  ...t
}) => r("span", Vt({
  css: [{
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "2px 4px",
    fontSize: "11px"
  }, {
    color: e,
    borderColor: e
  }]
}, t), t.children), vn = (e, t = !1) => (e == null ? void 0 : e.addressFormat) === "KR" && (t ? (
  // addr2 is optional: 도서산간 등 계산시 필요없음. 서버 api 검증에서도 체크하지 않음.
  ["zipcode", "addr1"].every((o) => (e[o] ?? "").length > 0)
) : !0), wn = (e, t = !1) => (e == null ? void 0 : e.addressFormat) === "5" && (t ? ["zipcode", "city", "state", "building", "street"].every((o) => (e[o] ?? "").length > 0) : !0), Sn = (e, t = !1) => (e == null ? void 0 : e.addressFormat) === "3" && (t ? ["zipcode", "addr1", "addr2"].every((o) => (e[o] ?? "").length > 0) : !0), _n = (e, t = !1) => (e == null ? void 0 : e.addressFormat) === "TW" && (t ? ["city", "street", "addr1", "zipcode"].every((o) => (e[o] ?? "").length > 0) : !0), kn = (e, t = !1) => (e == null ? void 0 : e.addressFormat) === "VN" && (t ? ["state", "city", "addr1"].every((o) => (e[o] ?? "").length > 0) : !0), Rn = (e, t = !1) => (e == null ? void 0 : e.addressFormat) === "HK" && (t ? ["city", "street", "addr1"].every((o) => (e[o] ?? "").length > 0) : !0);
function Hr({
  address: e,
  defaultTag: t,
  latest: o,
  disabled: n,
  strict: i,
  textColor: s = "#20252b"
}) {
  const {
    ct: c
  } = me(), f = ut("brand_color");
  if (typeof e > "u")
    return null;
  switch (!0) {
    case (vn(e, i) || Sn(e, i)):
      return r("div", {
        css: [{
          margin: "0px",
          padding: "0px",
          fontSize: "15px"
        }, n ? {
          opacity: "0.25"
        } : null, {
          color: s
        }]
      }, r("div", {
        css: {
          display: "flex",
          alignItems: "center"
        }
      }, e.name, t ? r(ze, {
        css: {
          marginLeft: "4px"
        },
        color: f
      }, c("설명_기본")) : null, o ? r(ze, {
        css: {
          marginLeft: "4px"
        }
      }, c("설명_최근")) : null), r("p", {
        css: [{
          margin: "0px",
          fontSize: "14px",
          "--tw-text-opacity": "1",
          color: "rgb(117 117 117 / var(--tw-text-opacity))"
        }, {
          color: s
        }]
      }, e.call), r("p", {
        css: {
          margin: "0px"
        }
      }, e.addr1), r("p", {
        css: {
          margin: "0px"
        }
      }, e.addr2), r("p", {
        css: {
          margin: "0px"
        }
      }, `(${e.zipcode})`));
    case wn(e, i):
      return r("div", {
        css: [{
          margin: "0px",
          padding: "0px",
          fontSize: "15px"
        }, n ? {
          opacity: "0.25"
        } : null, {
          color: s
        }]
      }, r("div", {
        css: {
          display: "flex",
          alignItems: "center"
        }
      }, e.name, t ? r(ze, {
        css: {
          marginLeft: "4px"
        },
        color: f
      }, c("설명_기본")) : null, o ? r(ze, {
        css: {
          marginLeft: "4px"
        }
      }, c("설명_최근")) : null), r("p", {
        css: [{
          margin: "0px",
          fontSize: "14px",
          "--tw-text-opacity": "1",
          color: "rgb(117 117 117 / var(--tw-text-opacity))"
        }, {
          color: s
        }]
      }, e.call), r("p", {
        css: {
          margin: "0px"
        }
      }, `${e.street} ${e.building}`), r("p", {
        css: {
          margin: "0px"
        }
      }, `${e.city} ${e.state}`), r("p", {
        css: {
          margin: "0px"
        }
      }, `(${e.zipcode})`));
    case _n(e, i):
      return r("div", {
        css: [{
          margin: "0px",
          padding: "0px",
          fontSize: "15px"
        }, n ? {
          opacity: "0.25"
        } : null, {
          color: s
        }]
      }, r("div", {
        css: {
          display: "flex",
          alignItems: "center"
        }
      }, e.name, t ? r(ze, {
        css: {
          marginLeft: "4px"
        },
        color: f
      }, c("설명_기본")) : null, o ? r(ze, {
        css: {
          marginLeft: "4px"
        }
      }, c("설명_최근")) : null), r("p", {
        css: [{
          margin: "0px",
          fontSize: "14px",
          "--tw-text-opacity": "1",
          color: "rgb(117 117 117 / var(--tw-text-opacity))"
        }, {
          color: s
        }]
      }, e.call), r("p", {
        css: {
          margin: "0px"
        }
      }, e.city), r("p", {
        css: {
          margin: "0px"
        }
      }, e.street), r("p", {
        css: {
          margin: "0px"
        }
      }, e.addr1), r("p", {
        css: {
          margin: "0px"
        }
      }, `(${e.zipcode})`));
    case kn(e, i):
      return r("div", {
        css: [{
          margin: "0px",
          padding: "0px",
          fontSize: "15px"
        }, n ? {
          opacity: "0.25"
        } : null, {
          color: s
        }]
      }, r("div", {
        css: {
          display: "flex",
          alignItems: "center"
        }
      }, e.name, t ? r(ze, {
        css: {
          marginLeft: "4px"
        },
        color: f
      }, c("설명_기본")) : null, o ? r(ze, {
        css: {
          marginLeft: "4px"
        }
      }, c("설명_최근")) : null), r("p", {
        css: [{
          margin: "0px",
          fontSize: "14px",
          "--tw-text-opacity": "1",
          color: "rgb(117 117 117 / var(--tw-text-opacity))"
        }, {
          color: s
        }]
      }, e.call), r("p", {
        css: {
          margin: "0px"
        }
      }, e.state), r("p", {
        css: {
          margin: "0px"
        }
      }, e.city), r("p", {
        css: {
          margin: "0px"
        }
      }, e.addr1));
    case Rn(e, i):
      return r("div", {
        css: [{
          margin: "0px",
          padding: "0px",
          fontSize: "15px"
        }, n ? {
          opacity: "0.25"
        } : null, {
          color: s
        }]
      }, r("div", {
        css: {
          display: "flex",
          alignItems: "center"
        }
      }, e.name, t ? r(ze, {
        css: {
          marginLeft: "4px"
        },
        color: f
      }, c("설명_기본")) : null, o ? r(ze, {
        css: {
          marginLeft: "4px"
        }
      }, c("설명_최근")) : null), r("p", {
        css: [{
          margin: "0px",
          fontSize: "14px",
          "--tw-text-opacity": "1",
          color: "rgb(117 117 117 / var(--tw-text-opacity))"
        }, {
          color: s
        }]
      }, e.call), r("p", {
        css: {
          margin: "0px"
        }
      }, e.city), r("p", {
        css: {
          margin: "0px"
        }
      }, e.street), r("p", {
        css: {
          margin: "0px"
        }
      }, e.addr1));
    default:
      return r("div", {
        css: [{
          margin: "0px",
          padding: "0px",
          fontSize: "15px"
        }, n ? {
          opacity: "0.25"
        } : null, {
          color: s
        }]
      }, r("div", {
        css: {
          display: "flex",
          alignItems: "center"
        }
      }, e.name, t ? r(ze, {
        css: {
          marginLeft: "4px"
        },
        color: f
      }, c("설명_기본")) : null, o ? r(ze, {
        css: {
          marginLeft: "4px"
        }
      }, c("설명_최근")) : null), r("p", {
        css: [{
          margin: "0px",
          fontSize: "14px",
          "--tw-text-opacity": "1",
          color: "rgb(117 117 117 / var(--tw-text-opacity))"
        }, {
          color: s
        }]
      }, e.call), [e.zipcode ? `(${e.zipcode})` : null, e.street, e.building, e.state, e.city, e.street, e.state, e.addr1, e.addr2].filter(Boolean).map((w, g) => r("p", {
        css: {
          margin: "0px"
        }
      }, w)));
  }
}
const mt = {
  CCC01: "exchangeHana",
  //	외환카드
  CCC02: "woori",
  //	우리카드
  CCC03: "lotte",
  //	롯데카드
  CCC04: "hyundai",
  //	현대카드
  CCC05: "kb",
  //	국민카드
  CCC06: "bc",
  //	BC
  CCC07: "samsung",
  //	삼성카드
  CCC08: "shinhan",
  //	신한카드
  CCC09: "hanmi",
  //	한미카드
  CCC10: "nooghyp",
  //	농협
  CCC11: "hanaSk",
  //	하나
  CCC12: "globakVisa",
  //	글로벌
  CCC13: "globakMater",
  //	글로벌
  CCC14: "globakJcb",
  //	글로벌
  CCC15: "globakAmex",
  //	글로벌
  CCC16: "globakDiners",
  //	글로벌
  CCC17: "union",
  //	중국은련카드
  CCC18: "kj",
  //	광주카드
  CCC19: "jb",
  //	전북카드
  CCC20: "hana",
  //	하나카드
  CCC21: "kdb",
  //	산업카드
  CCC22: "wooriBc",
  //	우리BC카드
  CCC23: "nh",
  //	NH카드
  CCC24: "citi",
  //	씨티카드
  CCC25: "hacufokCheck",
  //	신협체크카드
  CCC26: "suhyup",
  //	수협카드
  CCC27: "jeju",
  //	제주카드
  CCC28: "mgCheck",
  //	MG새마을금고체크
  CCC29: "kbankCheck",
  //	케이뱅크카드
  CCC30: "kakaoBank",
  //	카카오뱅크
  CCC31: "epostcheck",
  //	우체국체크
  CCC32: "naverPoint",
  //	네이버포인트
  CCC33: "tossMoney",
  //	토스머니
  CCC34: "ssgMoney",
  //	SSG머니
  CCC35: "fsbCheck",
  //	저축은행체크
  CCC36: "lPoint",
  //	엘포인트
  CCC37: "kakaoMoney",
  //	카카오머니
  CCC38: "paycoPoint"
  //	페이코
}, yt = {
  exchangeHana: "외환카드",
  woori: "우리카드",
  lotte: "롯데카드",
  hyundai: "현대카드",
  kb: "국민카드",
  bc: "BC",
  samsung: "삼성카드",
  shinhan: "신한카드",
  hanmi: "한미카드",
  nooghyp: "농협",
  hanaSk: "하나",
  globakVisa: "글로벌",
  globakMater: "글로벌",
  globakJcb: "글로벌",
  globakAmex: "글로벌",
  globakDiners: "글로벌",
  union: "중국은련카드",
  kj: "광주카드",
  jb: "전북카드",
  hana: "하나카드",
  kdb: "산업카드",
  wooriBc: "우리BC카드",
  nh: "NH카드",
  citi: "씨티카드",
  hacufokCheck: "신협체크카드",
  suhyup: "수협카드",
  jeju: "제주카드",
  mgCheck: "MG새마을금고체크",
  kbankCheck: "케이뱅크카드",
  kakaoBank: "카카오뱅크",
  epostcheck: "우체국체크",
  naverPoint: "네이버포인트",
  tossMoney: "토스머니",
  ssgMoney: "SSG머니",
  fsbCheck: "저축은행체크",
  lPoint: "엘포인트",
  kakaoMoney: "카카오머니",
  paycoPoint: "페이코"
}, jr = ({
  orderNo: e,
  guestMemberCode: t,
  ordererCall: o,
  queryOptions: n
} = {}) => ({
  queryKey: ["Orders", e, "PaymentPrice"],
  queryFn: async ({
    signal: i
  }) => {
    const s = new URLSearchParams();
    s.set("orderNo", e), typeof t == "string" ? s.set("guestMemberCode", t) : typeof o == "string" && s.set("ordererCall", o);
    const {
      data: c
    } = await We.get(`customer/v1/orders/${e}/payment-price?${s.toString()}`, {
      signal: i
    });
    return c == null ? void 0 : c.data;
  },
  ...n,
  enabled: typeof e == "string" && ((n == null ? void 0 : n.enabled) ?? !0)
}), Ue = {
  TEXT: "IFT01",
  TEXTAREA: "IFT02",
  RADIO: "IFT03",
  SELECT: "IFT04",
  CHECKBOX: "IFT05",
  DATE: "IFT06",
  TIME: "IFT07",
  FILE: "IFT08"
}, qr = ({
  countryShippingCode: e,
  queryOptions: t
}) => ({
  queryKey: ["DelivAddressFormat", e],
  queryFn: async ({
    signal: o
  }) => {
    const {
      data: n
    } = await St.post("/ajax/oms/OMS_get_deliv_address_format.cm", {
      country: e
    }, {
      signal: o,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return n == null ? void 0 : n.addressFormat;
  },
  ...t,
  enabled: typeof e == "string" && ((t == null ? void 0 : t.enabled) ?? !0)
});
function It() {
  return It = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o) ({}).hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, It.apply(null, arguments);
}
const On = ({
  title: e,
  contentStyle: t = {
    padding: "16px"
  },
  maxWidth: o,
  ...n
}) => (he.useEffect(() => {
  if (!n.isOpen)
    return;
  const s = document.body.style.overflow, c = document.body.style.paddingRight, f = document.createElement("div");
  f.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;", document.body.appendChild(f);
  const w = f.offsetWidth - f.clientWidth;
  return f.remove(), document.body.style.overflow = "hidden", document.body.style.paddingRight = `${w}px`, () => {
    document.body.style.overflow = s, document.body.style.paddingRight = c;
  };
}, [n.isOpen]), r(Pr, It({
  style: {
    overlay: {
      zIndex: "1000",
      height: "100vh",
      overflow: "scroll",
      "--tw-bg-opacity": "0.5",
      backgroundColor: "rgb(0 0 0 / var(--tw-bg-opacity))",
      paddingTop: "80px",
      paddingBottom: "80px"
    },
    content: {
      position: "relative",
      bottom: "0px",
      left: "50%",
      top: "0px",
      marginLeft: "0px",
      marginRight: "0px",
      "--tw-translate-x": "-50%",
      transform: "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
      borderRadius: "3px",
      borderWidth: "0px",
      padding: "0px",
      "--tw-text-opacity": "1",
      color: "rgb(33 33 33 / var(--tw-text-opacity))",
      "--tw-shadow": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      "--tw-shadow-colored": "0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)",
      boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      maxWidth: o ?? "600px"
    }
  }
}, n), typeof e == "string" ? r("header", {
  css: {
    position: "relative",
    display: "flex",
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: "1px",
    "--tw-border-opacity": "1",
    borderBottomColor: "rgb(229 229 229 / var(--tw-border-opacity))",
    padding: "16px",
    fontSize: "18px",
    fontWeight: "500"
  }
}, r("span", {
  css: {
    flex: "1 1 0%",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "500"
  }
}, e), r("button", {
  css: {
    position: "absolute",
    right: "20px",
    top: "50%",
    display: "flex",
    height: "24px",
    width: "24px",
    "--tw-translate-y": "-50%",
    transform: "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "unset",
    padding: "0px"
  },
  onClick: n.onRequestClose
}, r("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, r("path", {
  d: "M18 0L0 18M0 0L18 18",
  stroke: "currentColor"
})))) : null, r("main", {
  style: t
}, n.children))), Vr = x.forwardRef(({
  onChange: e,
  hideShowButton: t
}, o) => {
  const {
    ct: n
  } = me(), [i, s] = he.useState(!1), c = uo("global", {
    marginLeft: "10px",
    paddingLeft: "0",
    paddingRight: "0",
    width: "50%"
  }), f = ut("brand_color"), w = he.useRef(null), g = () => {
    s(!0);
  }, b = () => {
    s(!1);
  };
  x.useImperativeHandle(o, () => ({
    openModal: g,
    closeModal: b
  }));
  const _ = (S) => {
    typeof window.daum > "u" || w.current !== null && w.current && new window.daum.Postcode({
      oncomplete: (m) => {
        let C = m.address;
        m.addressType === "R" && (m.bname !== "" || m.buildingName !== "") && (C += ` (${[m.bname, m.buildingName].filter(Boolean).join(", ")})`), e({
          zipcode: m.zonecode,
          addr1: C
        }), s(!1);
      },
      theme: {
        emphTextColor: f
      },
      width: "100%",
      height: "100%",
      submitMode: !1,
      useBannerLink: !1,
      onclose: () => {
        s(!1);
      },
      onresize: (m) => {
        var C;
        (C = w.current) == null || C.setAttribute("style", `width:100%;height:${m.height}px;`);
      }
    }).embed(w.current);
  };
  return x.useEffect(() => {
    if (typeof window.daum > "u") {
      const S = document.createElement("script");
      S.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js", document.head.appendChild(S);
    }
  }, []), r(x.Fragment, null, t ? null : r("button", {
    type: "button",
    css: c,
    onClick: g
  }, n("버튼_주소찾기")), r(On, {
    isOpen: i,
    title: n("버튼_주소찾기"),
    onRequestClose: b,
    onAfterOpen: _,
    contentStyle: {
      padding: 0
    }
  }, r("div", {
    css: {
      minHeight: "500px"
    },
    ref: w
  })));
});
var gt = (e) => e.type === "checkbox", ot = (e) => e instanceof Date, we = (e) => e == null;
const Ir = (e) => typeof e == "object";
var fe = (e) => !we(e) && !Array.isArray(e) && Ir(e) && !ot(e), Tn = (e) => fe(e) && e.target ? gt(e.target) ? e.target.checked : e.target.value : e, zn = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, Pn = (e, t) => e.has(zn(t)), Fn = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return fe(t) && t.hasOwnProperty("isPrototypeOf");
}, Jt = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function Pe(e) {
  let t;
  const o = Array.isArray(e);
  if (e instanceof Date)
    t = new Date(e);
  else if (e instanceof Set)
    t = new Set(e);
  else if (!(Jt && (e instanceof Blob || e instanceof FileList)) && (o || fe(e)))
    if (t = o ? [] : {}, !o && !Fn(e))
      t = e;
    else
      for (const n in e)
        e.hasOwnProperty(n) && (t[n] = Pe(e[n]));
  else
    return e;
  return t;
}
var Et = (e) => Array.isArray(e) ? e.filter(Boolean) : [], ce = (e) => e === void 0, W = (e, t, o) => {
  if (!t || !fe(e))
    return o;
  const n = Et(t.split(/[,[\].]+?/)).reduce((i, s) => we(i) ? i : i[s], e);
  return ce(n) || n === e ? ce(e[t]) ? o : e[t] : n;
}, $e = (e) => typeof e == "boolean", Zt = (e) => /^\w*$/.test(e), Ar = (e) => Et(e.replace(/["|']|\]/g, "").split(/\.|\[/)), ae = (e, t, o) => {
  let n = -1;
  const i = Zt(t) ? [t] : Ar(t), s = i.length, c = s - 1;
  for (; ++n < s; ) {
    const f = i[n];
    let w = o;
    if (n !== c) {
      const g = e[f];
      w = fe(g) || Array.isArray(g) ? g : isNaN(+i[n + 1]) ? {} : [];
    }
    if (f === "__proto__")
      return;
    e[f] = w, e = e[f];
  }
  return e;
};
const mr = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, Ee = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, Ie = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
};
x.createContext(null);
var Dn = (e, t, o, n = !0) => {
  const i = {
    defaultValues: t._defaultValues
  };
  for (const s in e)
    Object.defineProperty(i, s, {
      get: () => {
        const c = s;
        return t._proxyFormState[c] !== Ee.all && (t._proxyFormState[c] = !n || Ee.all), e[c];
      }
    });
  return i;
}, ke = (e) => fe(e) && !Object.keys(e).length, En = (e, t, o, n) => {
  o(e);
  const { name: i, ...s } = e;
  return ke(s) || Object.keys(s).length >= Object.keys(t).length || Object.keys(s).find((c) => t[c] === Ee.all);
}, vt = (e) => Array.isArray(e) ? e : [e];
function Wn(e) {
  const t = x.useRef(e);
  t.current = e, x.useEffect(() => {
    const o = !e.disabled && t.current.subject && t.current.subject.subscribe({
      next: t.current.next
    });
    return () => {
      o && o.unsubscribe();
    };
  }, [e.disabled]);
}
var Ne = (e) => typeof e == "string", Ln = (e, t, o, n, i) => Ne(e) ? (n && t.watch.add(e), W(o, e, i)) : Array.isArray(e) ? e.map((s) => (n && t.watch.add(s), W(o, s))) : (n && (t.watchAll = !0), o), Mn = (e, t, o, n, i) => t ? {
  ...o[e],
  types: {
    ...o[e] && o[e].types ? o[e].types : {},
    [n]: i || !0
  }
} : {}, yr = (e) => ({
  isOnSubmit: !e || e === Ee.onSubmit,
  isOnBlur: e === Ee.onBlur,
  isOnChange: e === Ee.onChange,
  isOnAll: e === Ee.all,
  isOnTouch: e === Ee.onTouched
}), br = (e, t, o) => !o && (t.watchAll || t.watch.has(e) || [...t.watch].some((n) => e.startsWith(n) && /^\.\w+/.test(e.slice(n.length))));
const dt = (e, t, o, n) => {
  for (const i of o || Object.keys(e)) {
    const s = W(e, i);
    if (s) {
      const { _f: c, ...f } = s;
      if (c) {
        if (c.refs && c.refs[0] && t(c.refs[0], i) && !n)
          return !0;
        if (c.ref && t(c.ref, c.name) && !n)
          return !0;
        if (dt(f, t))
          break;
      } else if (fe(f) && dt(f, t))
        break;
    }
  }
};
var Bn = (e, t, o) => {
  const n = vt(W(e, o));
  return ae(n, "root", t[o]), ae(e, o, n), e;
}, er = (e) => e.type === "file", Ae = (e) => typeof e == "function", Rt = (e) => {
  if (!Jt)
    return !1;
  const t = e ? e.ownerDocument : 0;
  return e instanceof (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement);
}, wt = (e) => Ne(e), tr = (e) => e.type === "radio", Ot = (e) => e instanceof RegExp;
const Cr = {
  value: !1,
  isValid: !1
}, vr = { value: !0, isValid: !0 };
var Ur = (e) => {
  if (Array.isArray(e)) {
    if (e.length > 1) {
      const t = e.filter((o) => o && o.checked && !o.disabled).map((o) => o.value);
      return { value: t, isValid: !!t.length };
    }
    return e[0].checked && !e[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      e[0].attributes && !ce(e[0].attributes.value) ? ce(e[0].value) || e[0].value === "" ? vr : { value: e[0].value, isValid: !0 } : vr
    ) : Cr;
  }
  return Cr;
};
const wr = {
  isValid: !1,
  value: null
};
var Qr = (e) => Array.isArray(e) ? e.reduce((t, o) => o && o.checked && !o.disabled ? {
  isValid: !0,
  value: o.value
} : t, wr) : wr;
function Sr(e, t, o = "validate") {
  if (wt(e) || Array.isArray(e) && e.every(wt) || $e(e) && !e)
    return {
      type: o,
      message: wt(e) ? e : "",
      ref: t
    };
}
var rt = (e) => fe(e) && !Ot(e) ? e : {
  value: e,
  message: ""
}, _r = async (e, t, o, n, i) => {
  const { ref: s, refs: c, required: f, maxLength: w, minLength: g, min: b, max: _, pattern: S, validate: m, name: C, valueAsNumber: A, mount: ee, disabled: K } = e._f, P = W(t, C);
  if (!ee || K)
    return {};
  const Y = c ? c[0] : s, B = (H) => {
    n && Y.reportValidity && (Y.setCustomValidity($e(H) ? "" : H || ""), Y.reportValidity());
  }, j = {}, ie = tr(s), V = gt(s), T = ie || V, M = (A || er(s)) && ce(s.value) && ce(P) || Rt(s) && s.value === "" || P === "" || Array.isArray(P) && !P.length, $ = Mn.bind(null, C, o, j), le = (H, N, G, E = Ie.maxLength, y = Ie.minLength) => {
    const F = H ? N : G;
    j[C] = {
      type: H ? E : y,
      message: F,
      ref: s,
      ...$(H ? E : y, F)
    };
  };
  if (i ? !Array.isArray(P) || !P.length : f && (!T && (M || we(P)) || $e(P) && !P || V && !Ur(c).isValid || ie && !Qr(c).isValid)) {
    const { value: H, message: N } = wt(f) ? { value: !!f, message: f } : rt(f);
    if (H && (j[C] = {
      type: Ie.required,
      message: N,
      ref: Y,
      ...$(Ie.required, N)
    }, !o))
      return B(N), j;
  }
  if (!M && (!we(b) || !we(_))) {
    let H, N;
    const G = rt(_), E = rt(b);
    if (!we(P) && !isNaN(P)) {
      const y = s.valueAsNumber || P && +P;
      we(G.value) || (H = y > G.value), we(E.value) || (N = y < E.value);
    } else {
      const y = s.valueAsDate || new Date(P), F = (J) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + J), L = s.type == "time", O = s.type == "week";
      Ne(G.value) && P && (H = L ? F(P) > F(G.value) : O ? P > G.value : y > new Date(G.value)), Ne(E.value) && P && (N = L ? F(P) < F(E.value) : O ? P < E.value : y < new Date(E.value));
    }
    if ((H || N) && (le(!!H, G.message, E.message, Ie.max, Ie.min), !o))
      return B(j[C].message), j;
  }
  if ((w || g) && !M && (Ne(P) || i && Array.isArray(P))) {
    const H = rt(w), N = rt(g), G = !we(H.value) && P.length > +H.value, E = !we(N.value) && P.length < +N.value;
    if ((G || E) && (le(G, H.message, N.message), !o))
      return B(j[C].message), j;
  }
  if (S && !M && Ne(P)) {
    const { value: H, message: N } = rt(S);
    if (Ot(H) && !P.match(H) && (j[C] = {
      type: Ie.pattern,
      message: N,
      ref: s,
      ...$(Ie.pattern, N)
    }, !o))
      return B(N), j;
  }
  if (m) {
    if (Ae(m)) {
      const H = await m(P, t), N = Sr(H, Y);
      if (N && (j[C] = {
        ...N,
        ...$(Ie.validate, N.message)
      }, !o))
        return B(N.message), j;
    } else if (fe(m)) {
      let H = {};
      for (const N in m) {
        if (!ke(H) && !o)
          break;
        const G = Sr(await m[N](P, t), Y, N);
        G && (H = {
          ...G,
          ...$(N, G.message)
        }, B(G.message), o && (j[C] = H));
      }
      if (!ke(H) && (j[C] = {
        ref: Y,
        ...H
      }, !o))
        return j;
    }
  }
  return B(!0), j;
};
function $n(e, t) {
  const o = t.slice(0, -1).length;
  let n = 0;
  for (; n < o; )
    e = ce(e) ? n++ : e[t[n++]];
  return e;
}
function Nn(e) {
  for (const t in e)
    if (e.hasOwnProperty(t) && !ce(e[t]))
      return !1;
  return !0;
}
function ge(e, t) {
  const o = Array.isArray(t) ? t : Zt(t) ? [t] : Ar(t), n = o.length === 1 ? e : $n(e, o), i = o.length - 1, s = o[i];
  return n && delete n[s], i !== 0 && (fe(n) && ke(n) || Array.isArray(n) && Nn(n)) && ge(e, o.slice(0, -1)), e;
}
var Bt = () => {
  let e = [];
  return {
    get observers() {
      return e;
    },
    next: (i) => {
      for (const s of e)
        s.next && s.next(i);
    },
    subscribe: (i) => (e.push(i), {
      unsubscribe: () => {
        e = e.filter((s) => s !== i);
      }
    }),
    unsubscribe: () => {
      e = [];
    }
  };
}, Tt = (e) => we(e) || !Ir(e);
function Qe(e, t) {
  if (Tt(e) || Tt(t))
    return e === t;
  if (ot(e) && ot(t))
    return e.getTime() === t.getTime();
  const o = Object.keys(e), n = Object.keys(t);
  if (o.length !== n.length)
    return !1;
  for (const i of o) {
    const s = e[i];
    if (!n.includes(i))
      return !1;
    if (i !== "ref") {
      const c = t[i];
      if (ot(s) && ot(c) || fe(s) && fe(c) || Array.isArray(s) && Array.isArray(c) ? !Qe(s, c) : s !== c)
        return !1;
    }
  }
  return !0;
}
var Yr = (e) => e.type === "select-multiple", Hn = (e) => tr(e) || gt(e), $t = (e) => Rt(e) && e.isConnected, Kr = (e) => {
  for (const t in e)
    if (Ae(e[t]))
      return !0;
  return !1;
};
function zt(e, t = {}) {
  const o = Array.isArray(e);
  if (fe(e) || o)
    for (const n in e)
      Array.isArray(e[n]) || fe(e[n]) && !Kr(e[n]) ? (t[n] = Array.isArray(e[n]) ? [] : {}, zt(e[n], t[n])) : we(e[n]) || (t[n] = !0);
  return t;
}
function Gr(e, t, o) {
  const n = Array.isArray(e);
  if (fe(e) || n)
    for (const i in e)
      Array.isArray(e[i]) || fe(e[i]) && !Kr(e[i]) ? ce(t) || Tt(o[i]) ? o[i] = Array.isArray(e[i]) ? zt(e[i], []) : { ...zt(e[i]) } : Gr(e[i], we(t) ? {} : t[i], o[i]) : o[i] = !Qe(e[i], t[i]);
  return o;
}
var bt = (e, t) => Gr(e, t, zt(t)), Xr = (e, { valueAsNumber: t, valueAsDate: o, setValueAs: n }) => ce(e) ? e : t ? e === "" ? NaN : e && +e : o && Ne(e) ? new Date(e) : n ? n(e) : e;
function Nt(e) {
  const t = e.ref;
  if (!(e.refs ? e.refs.every((o) => o.disabled) : t.disabled))
    return er(t) ? t.files : tr(t) ? Qr(e.refs).value : Yr(t) ? [...t.selectedOptions].map(({ value: o }) => o) : gt(t) ? Ur(e.refs).value : Xr(ce(t.value) ? e.ref.value : t.value, e);
}
var jn = (e, t, o, n) => {
  const i = {};
  for (const s of e) {
    const c = W(t, s);
    c && ae(i, s, c._f);
  }
  return {
    criteriaMode: o,
    names: [...e],
    fields: i,
    shouldUseNativeValidation: n
  };
}, lt = (e) => ce(e) ? e : Ot(e) ? e.source : fe(e) ? Ot(e.value) ? e.value.source : e.value : e;
const kr = "AsyncFunction";
var qn = (e) => (!e || !e.validate) && !!(Ae(e.validate) && e.validate.constructor.name === kr || fe(e.validate) && Object.values(e.validate).find((t) => t.constructor.name === kr)), Vn = (e) => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate);
function Rr(e, t, o) {
  const n = W(e, o);
  if (n || Zt(o))
    return {
      error: n,
      name: o
    };
  const i = o.split(".");
  for (; i.length; ) {
    const s = i.join("."), c = W(t, s), f = W(e, s);
    if (c && !Array.isArray(c) && o !== s)
      return { name: o };
    if (f && f.type)
      return {
        name: s,
        error: f
      };
    i.pop();
  }
  return {
    name: o
  };
}
var In = (e, t, o, n, i) => i.isOnAll ? !1 : !o && i.isOnTouch ? !(t || e) : (o ? n.isOnBlur : i.isOnBlur) ? !e : (o ? n.isOnChange : i.isOnChange) ? e : !0, An = (e, t) => !Et(W(e, t)).length && ge(e, t);
const Un = {
  mode: Ee.onSubmit,
  reValidateMode: Ee.onChange,
  shouldFocusError: !0
};
function Qn(e = {}) {
  let t = {
    ...Un,
    ...e
  }, o = {
    submitCount: 0,
    isDirty: !1,
    isLoading: Ae(t.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: t.errors || {},
    disabled: t.disabled || !1
  }, n = {}, i = fe(t.defaultValues) || fe(t.values) ? Pe(t.defaultValues || t.values) || {} : {}, s = t.shouldUnregister ? {} : Pe(i), c = {
    action: !1,
    mount: !1,
    watch: !1
  }, f = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, w, g = 0;
  const b = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, _ = {
    values: Bt(),
    array: Bt(),
    state: Bt()
  }, S = yr(t.mode), m = yr(t.reValidateMode), C = t.criteriaMode === Ee.all, A = (l) => (p) => {
    clearTimeout(g), g = setTimeout(l, p);
  }, ee = async (l) => {
    if (b.isValid || l) {
      const p = t.resolver ? ke((await T()).errors) : await $(n, !0);
      p !== o.isValid && _.state.next({
        isValid: p
      });
    }
  }, K = (l, p) => {
    (b.isValidating || b.validatingFields) && ((l || Array.from(f.mount)).forEach((a) => {
      a && (p ? ae(o.validatingFields, a, p) : ge(o.validatingFields, a));
    }), _.state.next({
      validatingFields: o.validatingFields,
      isValidating: !ke(o.validatingFields)
    }));
  }, P = (l, p = [], a, u, v = !0, k = !0) => {
    if (u && a) {
      if (c.action = !0, k && Array.isArray(W(n, l))) {
        const z = a(W(n, l), u.argA, u.argB);
        v && ae(n, l, z);
      }
      if (k && Array.isArray(W(o.errors, l))) {
        const z = a(W(o.errors, l), u.argA, u.argB);
        v && ae(o.errors, l, z), An(o.errors, l);
      }
      if (b.touchedFields && k && Array.isArray(W(o.touchedFields, l))) {
        const z = a(W(o.touchedFields, l), u.argA, u.argB);
        v && ae(o.touchedFields, l, z);
      }
      b.dirtyFields && (o.dirtyFields = bt(i, s)), _.state.next({
        name: l,
        isDirty: H(l, p),
        dirtyFields: o.dirtyFields,
        errors: o.errors,
        isValid: o.isValid
      });
    } else
      ae(s, l, p);
  }, Y = (l, p) => {
    ae(o.errors, l, p), _.state.next({
      errors: o.errors
    });
  }, B = (l) => {
    o.errors = l, _.state.next({
      errors: o.errors,
      isValid: !1
    });
  }, j = (l, p, a, u) => {
    const v = W(n, l);
    if (v) {
      const k = W(s, l, ce(a) ? W(i, l) : a);
      ce(k) || u && u.defaultChecked || p ? ae(s, l, p ? k : Nt(v._f)) : E(l, k), c.mount && ee();
    }
  }, ie = (l, p, a, u, v) => {
    let k = !1, z = !1;
    const Q = {
      name: l
    }, re = !!(W(n, l) && W(n, l)._f && W(n, l)._f.disabled);
    if (!a || u) {
      b.isDirty && (z = o.isDirty, o.isDirty = Q.isDirty = H(), k = z !== Q.isDirty);
      const ne = re || Qe(W(i, l), p);
      z = !!(!re && W(o.dirtyFields, l)), ne || re ? ge(o.dirtyFields, l) : ae(o.dirtyFields, l, !0), Q.dirtyFields = o.dirtyFields, k = k || b.dirtyFields && z !== !ne;
    }
    if (a) {
      const ne = W(o.touchedFields, l);
      ne || (ae(o.touchedFields, l, a), Q.touchedFields = o.touchedFields, k = k || b.touchedFields && ne !== a);
    }
    return k && v && _.state.next(Q), k ? Q : {};
  }, V = (l, p, a, u) => {
    const v = W(o.errors, l), k = b.isValid && $e(p) && o.isValid !== p;
    if (e.delayError && a ? (w = A(() => Y(l, a)), w(e.delayError)) : (clearTimeout(g), w = null, a ? ae(o.errors, l, a) : ge(o.errors, l)), (a ? !Qe(v, a) : v) || !ke(u) || k) {
      const z = {
        ...u,
        ...k && $e(p) ? { isValid: p } : {},
        errors: o.errors,
        name: l
      };
      o = {
        ...o,
        ...z
      }, _.state.next(z);
    }
  }, T = async (l) => {
    K(l, !0);
    const p = await t.resolver(s, t.context, jn(l || f.mount, n, t.criteriaMode, t.shouldUseNativeValidation));
    return K(l), p;
  }, M = async (l) => {
    const { errors: p } = await T(l);
    if (l)
      for (const a of l) {
        const u = W(p, a);
        u ? ae(o.errors, a, u) : ge(o.errors, a);
      }
    else
      o.errors = p;
    return p;
  }, $ = async (l, p, a = {
    valid: !0
  }) => {
    for (const u in l) {
      const v = l[u];
      if (v) {
        const { _f: k, ...z } = v;
        if (k) {
          const Q = f.array.has(k.name), re = v._f && qn(v._f);
          re && b.validatingFields && K([u], !0);
          const ne = await _r(v, s, C, t.shouldUseNativeValidation && !p, Q);
          if (re && b.validatingFields && K([u]), ne[k.name] && (a.valid = !1, p))
            break;
          !p && (W(ne, k.name) ? Q ? Bn(o.errors, ne, k.name) : ae(o.errors, k.name, ne[k.name]) : ge(o.errors, k.name));
        }
        !ke(z) && await $(z, p, a);
      }
    }
    return a.valid;
  }, le = () => {
    for (const l of f.unMount) {
      const p = W(n, l);
      p && (p._f.refs ? p._f.refs.every((a) => !$t(a)) : !$t(p._f.ref)) && be(l);
    }
    f.unMount = /* @__PURE__ */ new Set();
  }, H = (l, p) => (l && p && ae(s, l, p), !Qe(oe(), i)), N = (l, p, a) => Ln(l, f, {
    ...c.mount ? s : ce(p) ? i : Ne(l) ? { [l]: p } : p
  }, a, p), G = (l) => Et(W(c.mount ? s : i, l, e.shouldUnregister ? W(i, l, []) : [])), E = (l, p, a = {}) => {
    const u = W(n, l);
    let v = p;
    if (u) {
      const k = u._f;
      k && (!k.disabled && ae(s, l, Xr(p, k)), v = Rt(k.ref) && we(p) ? "" : p, Yr(k.ref) ? [...k.ref.options].forEach((z) => z.selected = v.includes(z.value)) : k.refs ? gt(k.ref) ? k.refs.length > 1 ? k.refs.forEach((z) => (!z.defaultChecked || !z.disabled) && (z.checked = Array.isArray(v) ? !!v.find((Q) => Q === z.value) : v === z.value)) : k.refs[0] && (k.refs[0].checked = !!v) : k.refs.forEach((z) => z.checked = z.value === v) : er(k.ref) ? k.ref.value = "" : (k.ref.value = v, k.ref.type || _.values.next({
        name: l,
        values: { ...s }
      })));
    }
    (a.shouldDirty || a.shouldTouch) && ie(l, v, a.shouldTouch, a.shouldDirty, !0), a.shouldValidate && J(l);
  }, y = (l, p, a) => {
    for (const u in p) {
      const v = p[u], k = `${l}.${u}`, z = W(n, k);
      (f.array.has(l) || !Tt(v) || z && !z._f) && !ot(v) ? y(k, v, a) : E(k, v, a);
    }
  }, F = (l, p, a = {}) => {
    const u = W(n, l), v = f.array.has(l), k = Pe(p);
    ae(s, l, k), v ? (_.array.next({
      name: l,
      values: { ...s }
    }), (b.isDirty || b.dirtyFields) && a.shouldDirty && _.state.next({
      name: l,
      dirtyFields: bt(i, s),
      isDirty: H(l, k)
    })) : u && !u._f && !we(k) ? y(l, k, a) : E(l, k, a), br(l, f) && _.state.next({ ...o }), _.values.next({
      name: c.mount ? l : void 0,
      values: { ...s }
    });
  }, L = async (l) => {
    c.mount = !0;
    const p = l.target;
    let a = p.name, u = !0;
    const v = W(n, a), k = () => p.type ? Nt(v._f) : Tn(l), z = (Q) => {
      u = Number.isNaN(Q) || Qe(Q, W(s, a, Q));
    };
    if (v) {
      let Q, re;
      const ne = k(), Ce = l.type === mr.BLUR || l.type === mr.FOCUS_OUT, Je = !Vn(v._f) && !t.resolver && !W(o.errors, a) && !v._f.deps || In(Ce, W(o.touchedFields, a), o.isSubmitted, m, S), qe = br(a, f, Ce);
      ae(s, a, ne), Ce ? (v._f.onBlur && v._f.onBlur(l), w && w(0)) : v._f.onChange && v._f.onChange(l);
      const Ve = ie(a, ne, Ce, !1), R = !ke(Ve) || qe;
      if (!Ce && _.values.next({
        name: a,
        type: l.type,
        values: { ...s }
      }), Je)
        return b.isValid && (e.mode === "onBlur" ? Ce && ee() : ee()), R && _.state.next({ name: a, ...qe ? {} : Ve });
      if (!Ce && qe && _.state.next({ ...o }), t.resolver) {
        const { errors: I } = await T([a]);
        if (z(ne), u) {
          const xt = Rr(o.errors, n, a), ht = Rr(I, n, xt.name || a);
          Q = ht.error, a = ht.name, re = ke(I);
        }
      } else
        K([a], !0), Q = (await _r(v, s, C, t.shouldUseNativeValidation))[a], K([a]), z(ne), u && (Q ? re = !1 : b.isValid && (re = await $(n, !0)));
      u && (v._f.deps && J(v._f.deps), V(a, re, Q, Ve));
    }
  }, O = (l, p) => {
    if (W(o.errors, p) && l.focus)
      return l.focus(), 1;
  }, J = async (l, p = {}) => {
    let a, u;
    const v = vt(l);
    if (t.resolver) {
      const k = await M(ce(l) ? l : v);
      a = ke(k), u = l ? !v.some((z) => W(k, z)) : a;
    } else l ? (u = (await Promise.all(v.map(async (k) => {
      const z = W(n, k);
      return await $(z && z._f ? { [k]: z } : z);
    }))).every(Boolean), !(!u && !o.isValid) && ee()) : u = a = await $(n);
    return _.state.next({
      ...!Ne(l) || b.isValid && a !== o.isValid ? {} : { name: l },
      ...t.resolver || !l ? { isValid: a } : {},
      errors: o.errors
    }), p.shouldFocus && !u && dt(n, O, l ? v : f.mount), u;
  }, oe = (l) => {
    const p = {
      ...c.mount ? s : i
    };
    return ce(l) ? p : Ne(l) ? W(p, l) : l.map((a) => W(p, a));
  }, X = (l, p) => ({
    invalid: !!W((p || o).errors, l),
    isDirty: !!W((p || o).dirtyFields, l),
    error: W((p || o).errors, l),
    isValidating: !!W(o.validatingFields, l),
    isTouched: !!W((p || o).touchedFields, l)
  }), de = (l) => {
    l && vt(l).forEach((p) => ge(o.errors, p)), _.state.next({
      errors: l ? o.errors : {}
    });
  }, ve = (l, p, a) => {
    const u = (W(n, l, { _f: {} })._f || {}).ref, v = W(o.errors, l) || {}, { ref: k, message: z, type: Q, ...re } = v;
    ae(o.errors, l, {
      ...re,
      ...p,
      ref: u
    }), _.state.next({
      name: l,
      errors: o.errors,
      isValid: !1
    }), a && a.shouldFocus && u && u.focus && u.focus();
  }, pe = (l, p) => Ae(l) ? _.values.subscribe({
    next: (a) => l(N(void 0, p), a)
  }) : N(l, p, !0), be = (l, p = {}) => {
    for (const a of l ? vt(l) : f.mount)
      f.mount.delete(a), f.array.delete(a), p.keepValue || (ge(n, a), ge(s, a)), !p.keepError && ge(o.errors, a), !p.keepDirty && ge(o.dirtyFields, a), !p.keepTouched && ge(o.touchedFields, a), !p.keepIsValidating && ge(o.validatingFields, a), !t.shouldUnregister && !p.keepDefaultValue && ge(i, a);
    _.values.next({
      values: { ...s }
    }), _.state.next({
      ...o,
      ...p.keepDirty ? { isDirty: H() } : {}
    }), !p.keepIsValid && ee();
  }, Re = ({ disabled: l, name: p, field: a, fields: u, value: v }) => {
    if ($e(l) && c.mount || l) {
      const k = l ? void 0 : ce(v) ? Nt(a ? a._f : W(u, p)._f) : v;
      ae(s, p, k), ie(p, k, !1, !1, !0);
    }
  }, Oe = (l, p = {}) => {
    let a = W(n, l);
    const u = $e(p.disabled) || $e(e.disabled);
    return ae(n, l, {
      ...a || {},
      _f: {
        ...a && a._f ? a._f : { ref: { name: l } },
        name: l,
        mount: !0,
        ...p
      }
    }), f.mount.add(l), a ? Re({
      field: a,
      disabled: $e(p.disabled) ? p.disabled : e.disabled,
      name: l,
      value: p.value
    }) : j(l, !0, p.value), {
      ...u ? { disabled: p.disabled || e.disabled } : {},
      ...t.progressive ? {
        required: !!p.required,
        min: lt(p.min),
        max: lt(p.max),
        minLength: lt(p.minLength),
        maxLength: lt(p.maxLength),
        pattern: lt(p.pattern)
      } : {},
      name: l,
      onChange: L,
      onBlur: L,
      ref: (v) => {
        if (v) {
          Oe(l, p), a = W(n, l);
          const k = ce(v.value) && v.querySelectorAll && v.querySelectorAll("input,select,textarea")[0] || v, z = Hn(k), Q = a._f.refs || [];
          if (z ? Q.find((re) => re === k) : k === a._f.ref)
            return;
          ae(n, l, {
            _f: {
              ...a._f,
              ...z ? {
                refs: [
                  ...Q.filter($t),
                  k,
                  ...Array.isArray(W(i, l)) ? [{}] : []
                ],
                ref: { type: k.type, name: l }
              } : { ref: k }
            }
          }), j(l, !1, void 0, k);
        } else
          a = W(n, l, {}), a._f && (a._f.mount = !1), (t.shouldUnregister || p.shouldUnregister) && !(Pn(f.array, l) && c.action) && f.unMount.add(l);
      }
    };
  }, _e = () => t.shouldFocusError && dt(n, O, f.mount), Te = (l) => {
    $e(l) && (_.state.next({ disabled: l }), dt(n, (p, a) => {
      const u = W(n, a);
      u && (p.disabled = u._f.disabled || l, Array.isArray(u._f.refs) && u._f.refs.forEach((v) => {
        v.disabled = u._f.disabled || l;
      }));
    }, 0, !1));
  }, Me = (l, p) => async (a) => {
    let u;
    a && (a.preventDefault && a.preventDefault(), a.persist && a.persist());
    let v = Pe(s);
    if (_.state.next({
      isSubmitting: !0
    }), t.resolver) {
      const { errors: k, values: z } = await T();
      o.errors = k, v = z;
    } else
      await $(n);
    if (ge(o.errors, "root"), ke(o.errors)) {
      _.state.next({
        errors: {}
      });
      try {
        await l(v, a);
      } catch (k) {
        u = k;
      }
    } else
      p && await p({ ...o.errors }, a), _e(), setTimeout(_e);
    if (_.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: ke(o.errors) && !u,
      submitCount: o.submitCount + 1,
      errors: o.errors
    }), u)
      throw u;
  }, He = (l, p = {}) => {
    W(n, l) && (ce(p.defaultValue) ? F(l, Pe(W(i, l))) : (F(l, p.defaultValue), ae(i, l, Pe(p.defaultValue))), p.keepTouched || ge(o.touchedFields, l), p.keepDirty || (ge(o.dirtyFields, l), o.isDirty = p.defaultValue ? H(l, Pe(W(i, l))) : H()), p.keepError || (ge(o.errors, l), b.isValid && ee()), _.state.next({ ...o }));
  }, Fe = (l, p = {}) => {
    const a = l ? Pe(l) : i, u = Pe(a), v = ke(l), k = v ? i : u;
    if (p.keepDefaultValues || (i = a), !p.keepValues) {
      if (p.keepDirtyValues)
        for (const z of f.mount)
          W(o.dirtyFields, z) ? ae(k, z, W(s, z)) : F(z, W(k, z));
      else {
        if (Jt && ce(l))
          for (const z of f.mount) {
            const Q = W(n, z);
            if (Q && Q._f) {
              const re = Array.isArray(Q._f.refs) ? Q._f.refs[0] : Q._f.ref;
              if (Rt(re)) {
                const ne = re.closest("form");
                if (ne) {
                  ne.reset();
                  break;
                }
              }
            }
          }
        n = {};
      }
      s = e.shouldUnregister ? p.keepDefaultValues ? Pe(i) : {} : Pe(k), _.array.next({
        values: { ...k }
      }), _.values.next({
        values: { ...k }
      });
    }
    f = {
      mount: p.keepDirtyValues ? f.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, c.mount = !b.isValid || !!p.keepIsValid || !!p.keepDirtyValues, c.watch = !!e.shouldUnregister, _.state.next({
      submitCount: p.keepSubmitCount ? o.submitCount : 0,
      isDirty: v ? !1 : p.keepDirty ? o.isDirty : !!(p.keepDefaultValues && !Qe(l, i)),
      isSubmitted: p.keepIsSubmitted ? o.isSubmitted : !1,
      dirtyFields: v ? {} : p.keepDirtyValues ? p.keepDefaultValues && s ? bt(i, s) : o.dirtyFields : p.keepDefaultValues && l ? bt(i, l) : p.keepDirty ? o.dirtyFields : {},
      touchedFields: p.keepTouched ? o.touchedFields : {},
      errors: p.keepErrors ? o.errors : {},
      isSubmitSuccessful: p.keepIsSubmitSuccessful ? o.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, De = (l, p) => Fe(Ae(l) ? l(s) : l, p);
  return {
    control: {
      register: Oe,
      unregister: be,
      getFieldState: X,
      handleSubmit: Me,
      setError: ve,
      _executeSchema: T,
      _getWatch: N,
      _getDirty: H,
      _updateValid: ee,
      _removeUnmounted: le,
      _updateFieldArray: P,
      _updateDisabledField: Re,
      _getFieldArray: G,
      _reset: Fe,
      _resetDefaultValues: () => Ae(t.defaultValues) && t.defaultValues().then((l) => {
        De(l, t.resetOptions), _.state.next({
          isLoading: !1
        });
      }),
      _updateFormState: (l) => {
        o = {
          ...o,
          ...l
        };
      },
      _disableForm: Te,
      _subjects: _,
      _proxyFormState: b,
      _setErrors: B,
      get _fields() {
        return n;
      },
      get _formValues() {
        return s;
      },
      get _state() {
        return c;
      },
      set _state(l) {
        c = l;
      },
      get _defaultValues() {
        return i;
      },
      get _names() {
        return f;
      },
      set _names(l) {
        f = l;
      },
      get _formState() {
        return o;
      },
      set _formState(l) {
        o = l;
      },
      get _options() {
        return t;
      },
      set _options(l) {
        t = {
          ...t,
          ...l
        };
      }
    },
    trigger: J,
    register: Oe,
    handleSubmit: Me,
    watch: pe,
    setValue: F,
    getValues: oe,
    reset: De,
    resetField: He,
    clearErrors: de,
    unregister: be,
    setError: ve,
    setFocus: (l, p = {}) => {
      const a = W(n, l), u = a && a._f;
      if (u) {
        const v = u.refs ? u.refs[0] : u.ref;
        v.focus && (v.focus(), p.shouldSelect && v.select());
      }
    },
    getFieldState: X
  };
}
function Yn(e = {}) {
  const t = x.useRef(), o = x.useRef(), [n, i] = x.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: Ae(e.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: e.errors || {},
    disabled: e.disabled || !1,
    defaultValues: Ae(e.defaultValues) ? void 0 : e.defaultValues
  });
  t.current || (t.current = {
    ...Qn(e),
    formState: n
  });
  const s = t.current.control;
  return s._options = e, Wn({
    subject: s._subjects.state,
    next: (c) => {
      En(c, s._proxyFormState, s._updateFormState) && i({ ...s._formState });
    }
  }), x.useEffect(() => s._disableForm(e.disabled), [s, e.disabled]), x.useEffect(() => {
    if (s._proxyFormState.isDirty) {
      const c = s._getDirty();
      c !== n.isDirty && s._subjects.state.next({
        isDirty: c
      });
    }
  }, [s, n.isDirty]), x.useEffect(() => {
    e.values && !Qe(e.values, o.current) ? (s._reset(e.values, s._options.resetOptions), o.current = e.values, i((c) => ({ ...c }))) : s._resetDefaultValues();
  }, [e.values, s]), x.useEffect(() => {
    e.errors && s._setErrors(e.errors);
  }, [e.errors, s]), x.useEffect(() => {
    s._state.mount || (s._updateValid(), s._state.mount = !0), s._state.watch && (s._state.watch = !1, s._subjects.state.next({ ...s._formState })), s._removeUnmounted();
  }), x.useEffect(() => {
    e.shouldUnregister && s._subjects.values.next({
      values: s._getWatch()
    });
  }, [e.shouldUnregister, s]), t.current.formState = Dn(n, s), t.current;
}
function ue() {
  return ue = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o) ({}).hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, ue.apply(null, arguments);
}
const Kn = x.forwardRef(({
  orderDeliveryCode: e,
  currentAddress: t,
  orderNo: o
}, n) => {
  var B, j, ie, V, T, M, $, le, H;
  const {
    ct: i
  } = me(), s = pt(), {
    colors: c,
    buttons: f
  } = Le(), w = x.useRef(null), g = x.useRef(null);
  x.useRef(null);
  const [b, _] = x.useState(!1);
  x.useImperativeHandle(n, () => ({
    open: () => _(!0),
    close: () => _(!1)
  }));
  const {
    data: S
  } = D(qr({
    countryShippingCode: t == null ? void 0 : t.country,
    queryOptions: {
      select: (N) => N === "KR"
    }
  })), {
    mutateAsync: m
  } = nt({
    mutationKey: ["RequestCancelAcrossTheBoard"],
    mutationFn: async ({
      orderDeliveryCode: N,
      addressForm: G
    }) => {
      const {
        data: E
      } = await We.patch(`/customer/v1/order-deliverys/${N}`, G, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return E == null ? void 0 : E.data;
    }
  }), {
    register: C,
    handleSubmit: A,
    setValue: ee,
    formState: {
      isLoading: K
    }
  } = Yn({
    mode: "onSubmit"
  }), P = async (N, G) => {
    const E = new FormData(G.target);
    await m({
      orderDeliveryCode: e,
      addressForm: E
    }), s.invalidateQueries(["Orders", o]), _(!1);
  }, Y = async (N) => {
    const [G, E] = Object.entries(N)[0];
    window.alert(E.message);
  };
  return S ? r(_t, {
    isOpen: b,
    title: i("타이틀_배송정보수정"),
    onRequestClose: () => _(!1)
  }, r("form", {
    onSubmit: A(P, Y)
  }, r("div", {
    css: {
      maxHeight: "calc(100vh - 92px)",
      overflow: "auto",
      padding: "12px 24px 112px",
      fontFamily: "Pretendard",
      "--tw-text-opacity": "1",
      color: "rgb(21 24 30 / var(--tw-text-opacity))"
    }
  }, r("div", {
    css: {
      display: "flex",
      gap: "8px"
    }
  }, r("div", {
    css: {
      width: "100%",
      flex: "1 1 0%"
    }
  }, r(h, {
    css: {
      fontSize: "14px"
    }
  }, i("설명_수령인")), r("input", ue({
    placeholder: i("설명_수령인"),
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    },
    defaultValue: t == null ? void 0 : t.receiverName
  }, C("receiverName", {
    required: i("설명_수령인이름을입력해주세요")
  })))), r("div", {
    css: {
      flex: "1 1 0%"
    }
  }, r(h, {
    css: {
      fontSize: "14px"
    }
  }, i("설명_연락처")), r("input", ue({
    placeholder: i("설명_연락처"),
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    },
    defaultValue: t == null ? void 0 : t.receiverCall
  }, C("receiverCall", {
    required: i("설명_연락처를입력해주세요")
  }))))), r("div", {
    css: {
      marginTop: "24px",
      display: "flex",
      gap: "8px"
    }
  }, r("div", {
    css: {
      marginTop: "6px",
      width: "100%"
    }
  }, r(h, {
    css: {
      fontSize: "14px"
    }
  }, i("설명_주소")), r("div", {
    css: {
      marginTop: "6px",
      display: "flex",
      gap: "8px"
    }
  }, r("input", ue({
    readOnly: !0,
    placeholder: i("설명_우편번호"),
    defaultValue: t.zipcode,
    css: {
      display: "block",
      height: "48px",
      minWidth: "0px",
      flex: "1 1 0%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "0px",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(248 249 251 / var(--tw-bg-opacity))",
      padding: "12px 16px"
    }
  }, C("zipcode", {
    required: i("설명_우편번호를입력하세요")
  }))), r("button", {
    type: "button",
    css: [f.default, {
      height: "48px",
      fontSize: "15px",
      fontWeight: "400"
    }],
    onClick: () => {
      var N;
      return (N = w.current) == null ? void 0 : N.openModal();
    }
  }, r(h, null, i("버튼_주소찾기"))), r(Vr, {
    ref: w,
    onChange: ({
      addr1: N,
      zipcode: G
    }) => {
      ee("zipcode", G), ee("addr1", N);
    },
    hideShowButton: !0
  })), r("input", ue({
    ref: g,
    placeholder: i("설명_주소"),
    readOnly: !0,
    defaultValue: t == null ? void 0 : t.addr1,
    css: {
      marginTop: "12px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "0px",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(248 249 251 / var(--tw-bg-opacity))",
      padding: "12px 16px"
    }
  }, C("addr1", {
    required: i("설명_주소를입력하세요")
  }))), r("input", ue({
    defaultValue: t == null ? void 0 : t.addr2,
    placeholder: i("설명_상세주소"),
    css: {
      marginTop: "12px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("addr2", {
    required: i("설명_상세주소를입력하세요")
  }))))), r("div", {
    css: {
      marginTop: "24px",
      display: "flex",
      gap: "8px"
    }
  }, r("div", {
    css: {
      marginTop: "6px",
      width: "100%",
      flex: "1 1 0%"
    }
  }, r(h, {
    css: {
      fontSize: "14px"
    }
  }, i("설명_배송메모")), r("input", ue({
    placeholder: i("설명_배송메모"),
    defaultValue: t == null ? void 0 : t.memo,
    css: {
      margin: "6px 0 24px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("memo")))))), r("div", {
    css: [{
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      padding: "12px 24px 16px"
    }, {
      backgroundColor: c.backgroundColor_hue_10
    }]
  }, r("button", {
    type: "submit",
    css: [f.primary, {
      minHeight: "38px",
      width: "100%",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "400"
    }],
    disabled: K
  }, r(h, null, i("버튼_저장"))), r("button", {
    type: "button",
    onClick: () => _(!1),
    css: [f.default, {
      marginTop: "8px",
      minHeight: "38px",
      width: "100%",
      borderRadius: "8px",
      borderWidth: "0px",
      fontSize: "14px",
      fontWeight: "400"
    }]
  }, r(h, null, i("버튼_취소")))))) : r(_t, {
    isOpen: b,
    title: i("타이틀_배송정보수정"),
    onRequestClose: () => _(!1)
  }, r("form", {
    onSubmit: A(P, Y)
  }, r("div", {
    css: {
      maxHeight: "calc(100vh - 92px)",
      overflow: "auto",
      padding: "12px 24px 112px",
      "--tw-text-opacity": "1",
      color: "rgb(21 24 30 / var(--tw-text-opacity))"
    }
  }, r("div", {
    css: {
      display: "flex",
      gap: "8px"
    }
  }, r("div", {
    css: {
      flex: "1 1 0%"
    }
  }, r(h, {
    css: {
      fontSize: "14px"
    }
  }, i("설명_수령인")), r("input", ue({
    placeholder: i("설명_수령인"),
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    },
    defaultValue: t == null ? void 0 : t.receiverName
  }, C("receiverName", {
    required: i("설명_수령인이름을입력해주세요")
  })))), r("div", {
    css: {
      flex: "1 1 0%"
    }
  }, r(h, {
    css: {
      fontSize: "14px"
    }
  }, i("설명_연락처")), r("input", ue({
    placeholder: i("설명_연락처"),
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    },
    defaultValue: t == null ? void 0 : t.receiverCall
  }, C("receiverCall", {
    required: i("설명_연락처를입력해주세요")
  }))))), r("div", {
    css: {
      marginTop: "24px",
      display: "flex",
      gap: "8px"
    }
  }, r("div", {
    css: {
      marginTop: "6px",
      flex: "1 1 0%"
    }
  }, r(h, {
    css: {
      fontSize: "14px"
    }
  }, i("설명_주소")), ((B = (t == null ? void 0 : t.country) ?? "") == null ? void 0 : B.length) > 0 ? r("input", ue({
    readOnly: !0,
    type: "hidden",
    placeholder: i("설명_국가선택"),
    defaultValue: (t == null ? void 0 : t.country) ?? ""
  }, C("country"))) : null, ((j = (t == null ? void 0 : t.countryName) ?? "") == null ? void 0 : j.length) > 0 ? r("input", ue({
    readOnly: !0,
    placeholder: i("설명_국가선택"),
    value: (t == null ? void 0 : t.countryName) ?? "",
    css: {
      marginTop: "12px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "0px",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(248 249 251 / var(--tw-bg-opacity))",
      padding: "12px 16px"
    }
  }, C("countryName"))) : null, ((ie = (t == null ? void 0 : t.zipcode) ?? "") == null ? void 0 : ie.length) > 0 ? r("input", ue({
    placeholder: i("설명_우편번호"),
    defaultValue: (t == null ? void 0 : t.zipcode) ?? "",
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("zipcode", {
    required: i("설명_우편번호를입력하세요")
  }))) : null, ((V = (t == null ? void 0 : t.addr1) ?? "") == null ? void 0 : V.length) > 0 ? r("input", ue({
    placeholder: i("설명_주소"),
    defaultValue: (t == null ? void 0 : t.addr1) ?? "",
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("addr1", {
    required: i("설명_주소를입력하세요")
  }))) : null, ((T = (t == null ? void 0 : t.addr2) ?? "") == null ? void 0 : T.length) > 0 ? r("input", ue({
    placeholder: i("설명_상세주소"),
    defaultValue: (t == null ? void 0 : t.addr2) ?? "",
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("addr2", {
    required: i("설명_상세주소를입력하세요")
  }))) : null, ((M = (t == null ? void 0 : t.building) ?? "") == null ? void 0 : M.length) > 0 ? r("input", ue({
    placeholder: i("설명_건물명"),
    defaultValue: (t == null ? void 0 : t.building) ?? "",
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("building", {
    required: i("설명_n을입력하세요", i("설명_건물명"))
  }))) : null, (($ = (t == null ? void 0 : t.city) ?? "") == null ? void 0 : $.length) > 0 ? r("input", ue({
    placeholder: i("설명_도시명"),
    defaultValue: (t == null ? void 0 : t.city) ?? "",
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("city", {
    required: i("설명_n을입력하세요", i("설명_도시명"))
  }))) : null, ((le = (t == null ? void 0 : t.state) ?? "") == null ? void 0 : le.length) > 0 ? r("input", ue({
    placeholder: i("설명_도시군"),
    defaultValue: (t == null ? void 0 : t.state) ?? "",
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("state", {
    required: i("설명_n을입력하세요", i("설명_도시군"))
  }))) : null, ((H = (t == null ? void 0 : t.street) ?? "") == null ? void 0 : H.length) > 0 ? r("input", ue({
    placeholder: i("설명_거리주소"),
    defaultValue: (t == null ? void 0 : t.street) ?? "",
    css: {
      marginTop: "6px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("street", {
    required: i("설명_n을입력하세요", i("설명_거리주소"))
  }))) : null)), r("div", {
    css: {
      marginTop: "24px",
      display: "flex",
      gap: "8px"
    }
  }, r("div", {
    css: {
      marginTop: "6px",
      flex: "1 1 0%"
    }
  }, r(h, {
    css: {
      fontSize: "14px"
    }
  }, i("설명_배송메모")), r("input", ue({
    placeholder: i("설명_배송메모"),
    defaultValue: t == null ? void 0 : t.memo,
    css: {
      margin: "6px 0 24px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px"
    }
  }, C("memo")))))), r("div", {
    css: [{
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      padding: "12px 24px 16px"
    }, {
      backgroundColor: c.backgroundColor_hue_10
    }]
  }, r("button", {
    type: "submit",
    css: [f.primary, {
      minHeight: "38px",
      width: "100%",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "400"
    }],
    disabled: K
  }, r(h, null, i("버튼_저장"))), r("button", {
    type: "button",
    onClick: () => _(!1),
    css: [f.default, {
      marginTop: "8px",
      minHeight: "38px",
      width: "100%",
      borderRadius: "8px",
      borderWidth: "0px",
      fontSize: "14px",
      fontWeight: "400"
    }]
  }, r(h, null, i("버튼_취소"))))));
}), Gn = ({
  queryOptions: e
} = {}) => ({
  queryKey: ["DepositAccounts"],
  queryFn: async ({
    signal: t
  }) => {
    const {
      data: o
    } = await We.get("/customer/v1/payment/deposit-account-info", {
      signal: t
    });
    return o == null ? void 0 : o.data;
  },
  ...e
}), Xn = ({
  queryOptions: e
} = {}) => ({
  queryKey: ["PaymentMethods"],
  queryFn: async ({
    signal: t
  }) => {
    const {
      data: o
    } = await We.get("/customer/v1/payment/payment-method-list", {
      signal: t
    });
    return o == null ? void 0 : o.data;
  },
  ...e
});
function At() {
  return At = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o) ({}).hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, At.apply(null, arguments);
}
const Ye = ({
  svgHtml: e,
  ...t
}) => {
  const o = ut("body_color"), n = `rgba(${Fr(o).join(",")}, 0.4)`;
  return r("select", At({
    css: [{
      margin: "0px !important",
      minWidth: "0px",
      cursor: "pointer",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      backgroundColor: "transparent",
      padding: "12px 16px",
      fontSize: "15px",
      "--tw-text-opacity": "1",
      color: "rgb(33 33 33 / var(--tw-text-opacity))"
    }, `
background-size: 20px 20px;
background-repeat: no-repeat;
background-position: right 12px center;
background-image: url('data:image/svg+xml;utf8,${e ?? `<svg width="24" height="24" viewBox="0 0 24 24" fill="${n}" stroke="${n}" xmlns="http://www.w3.org/2000/svg"><path d="M8.71466 8.91003C8.19283 8.91003 7.93192 8.91003 7.79572 9.01749C7.67722 9.11097 7.60729 9.25298 7.60544 9.40391C7.60331 9.57738 7.7624 9.78419 8.08056 10.1978L11.4559 14.5857C11.6716 14.8662 11.7795 15.0064 11.911 15.0568C12.0262 15.101 12.1537 15.101 12.2689 15.0568C12.4004 15.0064 12.5083 14.8662 12.7241 14.5857L16.0994 10.1978C16.4175 9.78419 16.5766 9.57738 16.5745 9.40391C16.5727 9.25298 16.5027 9.11097 16.3842 9.01749C16.248 8.91003 15.9871 8.91003 15.4653 8.91003H8.71466Z" /></svg>`}');`]
  }, t), t.children);
};
function Ut() {
  return Ut = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o) ({}).hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, Ut.apply(null, arguments);
}
const et = x.forwardRef(({
  children: e,
  icon: t,
  ...o
}, n) => {
  const i = ut("brand_color");
  return `${Fr(i).join(",")}`, r("label", {
    css: [{
      display: "flex !important",
      cursor: "pointer",
      alignItems: "center",
      "--tw-text-opacity": "1 !important",
      color: "rgb(33 33 33 / var(--tw-text-opacity)) !important"
    }, o.disabled ? {
      cursor: "not-allowed"
    } : null]
  }, r("input", Ut({
    css: [{
      margin: "0 !important",
      height: "18px",
      width: "18px",
      cursor: "pointer",
      appearance: "none",
      borderRadius: "3px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(255 255 255 / var(--tw-bg-opacity))"
    }, "border: #dddddd 1px solid;", `:checked {
            border-color: transparent;
            background-size: contain;
            background-repeat: no-repeat;
            background-color: ${i};
            background-image: url('data:image/svg+xml;utf8,${(t ?? "check") === "check" ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="stroke-width: 3" ><path d="M19 6L9.375 17L5 12" stroke="%23FFFFFF" /></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="stroke-width: 3" ><path d="M5 12H19" stroke="%23FFFFFF" /></svg>'}');
          }`, `:focus {
            outline: none !important;
            outline-offset: unset !important;
            box-shadow: none !important;
          }`, `:disabled {
            background-color: #f5f5f5;
            border-color: #e5e5e5;
          }`]
  }, o, {
    ref: n,
    type: "checkbox"
  })), e);
});
var Wt = { exports: {} };
Wt.exports = rr;
Wt.exports.isMobile = rr;
Wt.exports.default = rr;
const Jn = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, Zn = /CrOS/, ei = /android|ipad|playbook|silk/i;
function rr(e) {
  e || (e = {});
  let t = e.ua;
  if (!t && typeof navigator < "u" && (t = navigator.userAgent), t && t.headers && typeof t.headers["user-agent"] == "string" && (t = t.headers["user-agent"]), typeof t != "string") return !1;
  let o = Jn.test(t) && !Zn.test(t) || !!e.tablet && ei.test(t);
  return !o && e.tablet && e.featureDetect && navigator && navigator.maxTouchPoints > 1 && t.indexOf("Macintosh") !== -1 && t.indexOf("Safari") !== -1 && (o = !0), o;
}
var ti = Wt.exports;
const ri = /* @__PURE__ */ fo(ti), oi = x.forwardRef(({
  orderNo: e
}, t) => {
  const {
    ct: o,
    nf: n
  } = me(), {
    ct: i
  } = me(!0), {
    colors: s,
    buttons: c,
    fonts: f
  } = Le(), w = x.useRef(null), [g, b] = x.useState(!1), [_, S] = x.useState(), [m, C] = x.useState(""), [A, ee] = x.useState(""), [K, P] = x.useState(!1), [Y, B] = x.useState(null), [j, ie] = x.useState(""), [V, T] = x.useState(!1), [M, $] = x.useState(), le = () => {
    b(!1), S(void 0), C(""), ee(""), P(!1), T(!1), $(void 0);
  }, H = (O) => {
    S(O), C(""), ee(""), P(!1), T(!1);
  };
  x.useImperativeHandle(t, () => ({
    open: () => b(!0),
    close: le
  }));
  const {
    data: N
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (O) => O.orderCode
    }
  })), {
    data: G
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (O) => O.ordererName
    }
  })), {
    data: E
  } = D(Xn({
    queryOptions: {
      select: (O) => O.map((J) => ({
        ...J,
        // 임시: 무통장입금, 신용카드, 가상계좌, 실시간계좌이체, 페이팔 5가지만 문자열이 동일하여 `/admin/config/localize`에서 변경 가능
        // 코드 기반으로 못 바꾸는 이유는 고객사가 임의로 결제수단 이름을 바꿀 수 있기 때문. ex) 무통장입금 -> 렌탈
        description: i(`버튼_${J.description}`) ?? J.description,
        __idx: Xe(J)
      })).sort(go)
    }
  })), {
    data: y
  } = D(Gn({
    queryOptions: {
      select: (O) => O.map((J) => ({
        ...J,
        __idx: Xe(J)
      }))
    }
  })), F = (O) => {
    var J, oe, X;
    if (O.preventDefault(), typeof _ > "u") {
      alert(o("설명_결제수단을선택해주세요"));
      return;
    }
    if (((J = E.find((de) => de.__idx === _)) == null ? void 0 : J.code) === Z.OPM01.code) {
      if ((m ?? "") === "") {
        alert(o("설명_입금하실은행을선택해주세요"));
        return;
      }
      if (K && (j ?? "") === "") {
        alert(o("설명_현금영수증신청정보를입력해주세요"));
        return;
      }
    }
    if (!V) {
      alert(o("설명_구매조건확인및결제진행에동의"));
      return;
    }
    $({
      pageType: "myPage",
      pgIdx: (oe = E.find((de) => de.__idx === _)) == null ? void 0 : oe.pgIdx,
      method: (X = E.find((de) => de.__idx === _)) == null ? void 0 : X.code,
      orderNo: e,
      orderCode: N,
      ordererName: G,
      deviceCd: ri({
        featureDetect: !0,
        tablet: !0
      }) ? "DTA02" : "DTA01",
      closeUrl: encodeURI(`${window.location.origin}/backpg/payment/oms/OMS_close.cm?failUrl=${encodeURIComponent(location.href)}`),
      returnUrl: encodeURI(`${window.location.origin}/backpg/payment/oms/OMS_confirm.cm?orderCode=${N}&orderNo=${e}`),
      depositAccountInfo: typeof m == "string" && m !== "" ? {
        ...y.find((de) => de.__idx === m),
        depositor: A || G
      } : void 0,
      cashReceiptInfo: {
        cashReceiptType: Y,
        cashReceiptValue: j
      }
    });
  };
  x.useEffect(() => {
    var O;
    g && typeof E < "u" && E.length > 0 && typeof _ > "u" && S((O = E.find((J) => J.isDefault === "Y") ?? E[0]) == null ? void 0 : O.__idx);
  }, [g, E, _]), x.useEffect(() => {
    var O;
    typeof M < "u" && ((O = w.current) == null || O.submit(), le());
  }, [M]);
  const L = E.find((O) => O.__idx === _);
  return he.useEffect(() => {
    y && (L == null ? void 0 : L.code) === Z.OPM01.code && C(y[0].__idx);
  }, [y, L == null ? void 0 : L.code]), r(_t, {
    isOpen: g,
    title: o("타이틀_결제하기"),
    onRequestClose: le
  }, r("form", {
    ref: w,
    method: "POST",
    action: "/backpg/payment/oms/OMS_payment.cm",
    onSubmit: F
  }, r("div", {
    css: {
      maxHeight: "calc(100vh - 92px)",
      overflow: "auto",
      padding: "12px 24px 66px"
    }
  }, r("div", {
    css: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      ":last-child": {
        paddingBottom: "24px"
      }
    }
  }, E == null ? void 0 : E.map((O) => r("button", {
    type: "button",
    key: O.__idx,
    css: [_ === O.__idx ? c.primary : c.default, {
      flex: "1 1 0%",
      flexGrow: "0",
      flexBasis: "calc(50% - 4px)",
      padding: "18px 12px"
    }],
    onClick: () => H(O.__idx)
  }, r(h, {
    css: {
      fontSize: "14px",
      fontWeight: "400"
    }
  }, O.description)))), (L == null ? void 0 : L.code) === Z.OPM01.code ? r(x.Fragment, null, r("div", {
    css: {
      marginTop: "24px",
      fontFamily: "Pretendard"
    }
  }, r(Ye, {
    css: {
      height: "48px",
      width: "100%"
    },
    svgHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="chevron-down"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
    value: m,
    onChange: (O) => C(O.target.value ?? "")
  }, r("option", {
    value: ""
  }, o("설명_입금계좌")), y.map((O) => r("option", {
    key: O.__idx,
    value: O.__idx
  }, O.bankName, " ", O.bankAccount, " ", O.accountHolderName))), r("input", {
    css: {
      marginTop: "8px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_입금자명미입력시주문자명"),
    value: A,
    onChange: (O) => ee(O.target.value ?? "")
  }), (L == null ? void 0 : L.useAutoCancel) === "Y" ? r(h, {
    css: {
      marginTop: "8px",
      fontSize: "13px"
    }
  }, o("설명_n시간동안입금하지않으면결제가자동으로취소돼요", L == null ? void 0 : L.autoCancelHours)) : null), r("div", {
    css: {
      marginTop: "24px"
    }
  }, r(et, {
    checked: K,
    onChange: (O) => {
      P(O.target.checked), B(O.target.checked ? "CRT01" : null), ie("");
    }
  }, r(h, {
    css: {
      marginLeft: "8px",
      fontSize: "14px"
    }
  }, `${o("타이틀_현금영수증신청")} ${o("설명_선택")}`))), K ? r("div", {
    css: {
      marginBottom: "24px"
    }
  }, r("div", {
    css: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      ":last-child": {
        paddingBottom: "24px"
      }
    }
  }, r("button", {
    type: "button",
    css: [Y === "CRT01" ? c.primary : c.default, {
      flex: "1 1 0%",
      flexGrow: "0",
      flexBasis: "calc(50% - 4px)",
      padding: "18px 12px"
    }],
    onClick: () => B("CRT01")
  }, r(h, {
    css: {
      fontSize: "14px",
      fontWeight: "400"
    }
  }, o("타이틀_소득공제용"))), r("button", {
    type: "button",
    css: [Y === "CRT02" ? c.primary : c.default, {
      flex: "1 1 0%",
      flexGrow: "0",
      flexBasis: "calc(50% - 4px)",
      padding: "18px 12px"
    }],
    onClick: () => B("CRT02")
  }, r(h, {
    css: {
      fontSize: "14px",
      fontWeight: "400"
    }
  }, o("타이틀_지출증빙용")))), r("div", {
    css: {
      marginTop: "8px",
      fontFamily: "Pretendard"
    }
  }, r("input", {
    css: {
      marginTop: "8px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o(Y === "CRT01" ? "설명_휴대전화번호입력" : "설명_사업자번호입력"),
    value: j,
    onChange: (O) => ie(O.target.value ?? "")
  }))) : null, r("div", {
    css: {}
  }, r(et, {
    checked: V,
    onChange: (O) => T(O.target.checked)
  }, r(h, {
    css: {
      marginLeft: "8px",
      fontSize: "14px"
    }
  }, `${o("설명_구매조건확인및결제진행에동의")} ${o("설명_필수")}`)))) : null, (L == null ? void 0 : L.code) === Z.OPM03.code ? r(x.Fragment, null, r("div", {
    css: {
      marginTop: "24px"
    }
  }, r(h, {
    css: {
      marginTop: "8px",
      fontSize: "13px"
    }
  }, o("설명_n시간동안입금하지않으면결제가자동으로취소돼요", L == null ? void 0 : L.autoCancelHours))), r("div", {
    css: {
      marginTop: "24px"
    }
  }, r(et, {
    checked: V,
    onChange: (O) => T(O.target.checked)
  }, r(h, {
    css: {
      marginLeft: "8px",
      fontSize: "14px"
    }
  }, `${o("설명_구매조건확인및결제진행에동의")} ${o("설명_필수")}`)))) : null, [Z.OPM01.code, Z.OPM03.code].includes(L == null ? void 0 : L.code) ? null : r(x.Fragment, null, r("div", {
    css: {
      marginTop: "24px"
    }
  }, r(et, {
    checked: V,
    onChange: (O) => T(O.target.checked)
  }, r(h, {
    css: {
      marginLeft: "8px",
      fontSize: "14px"
    }
  }, `${o("설명_구매조건확인및결제진행에동의")} ${o("설명_필수")}`))))), typeof M < "u" ? r("input", {
    type: "hidden",
    name: "payload",
    value: JSON.stringify(M)
  }) : null, r("div", {
    css: [{
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      padding: "12px 24px 16px"
    }, {
      backgroundColor: s.backgroundColor_hue_10
    }]
  }, r("button", {
    type: "submit",
    css: [c.primary, {
      minHeight: "38px",
      width: "100%",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "400"
    }]
  }, r(h, null, o("버튼_결제하기"))))));
}), ni = (e) => xo({
  queryKey: ["Payments", e, "ReceiptUrl"],
  queryFn: async ({
    signal: t
  }) => {
    try {
      const {
        data: o
      } = await We.get(`/customer/v1/payment/${e}/receipt-url`, {
        signal: t
      });
      return [e, o.data.url];
    } catch {
      return [e, ""];
    }
  },
  enabled: !!e
}), ii = Eo.ODP00;
function ai(e) {
  var P, Y;
  const [{
    data: t,
    isFetched: o,
    isError: n
  }, {
    data: i,
    isFetched: s,
    isError: c
  }] = pr({
    queries: [q({
      orderNo: e
    }), jr({
      orderNo: e
    })]
  }), f = pr({
    queries: (P = t == null ? void 0 : t.payments) == null ? void 0 : P.map((B) => ni(B.paymentCode))
  });
  if (!o || !s)
    return {
      isFetched: !1,
      isError: !1,
      data: null
    };
  if (n || c)
    return {
      isFetched: !0,
      isError: !0,
      data: null
    };
  const w = f.filter(({
    isLoading: B,
    isError: j
  }) => !B && !j).map(({
    data: B
  }) => B), g = Object.fromEntries(w), {
    deliveryPrice: b,
    deliveryIslandPrice: _,
    deliveryExtraPrice: S,
    deliveryAfterPrice: m,
    deliveryIslandAfterPrice: C,
    deliveryExtraAfterPrice: A
  } = i, ee = ((Y = t.orderSections[0]) == null ? void 0 : Y.deliveryPayTypeCd) === ii.ODP03.code;
  return {
    isFetched: !0,
    isError: !1,
    data: {
      receiptUrlList: w,
      receiptUrlMap: g,
      delivery: {
        isCashOnDelivery: ee,
        // 착불인 경우와 그렇지 않은 경우 배송비에 표시되는 필드가 달라짐
        deliveryPrice: ee ? m : b,
        deliveryIslandPrice: ee ? C : _,
        deliveryExtraPrice: ee ? A : S
      }
    }
  };
}
const si = ({
  orderNo: e,
  payload: t,
  queryOptions: o
}) => ({
  queryKey: ["OrderAmountDue", e, t],
  queryFn: async ({
    signal: n
  }) => {
    const {
      data: i
    } = await We.post(`/customer/v1/orders/${e}/amount-due`, t, {
      signal: n,
      __bypassAlert: !0
    });
    return (i == null ? void 0 : i.data) || null;
  },
  ...o,
  enabled: typeof e == "string" && typeof t == "object" && t !== null && ((o == null ? void 0 : o.enabled) ?? !0)
}), li = x.forwardRef(({
  paymentCode: e,
  isEditable: t
}, o) => {
  const {
    ct: n,
    nf: i
  } = me();
  me(!0);
  const {
    colors: s,
    buttons: c,
    fonts: f
  } = Le(), [w, g] = x.useState(!1), [b, _] = x.useState("CRT01"), [S, m] = x.useState(""), C = () => {
    g(!1);
  };
  x.useImperativeHandle(o, () => ({
    open: () => g(!0),
    close: C
  }));
  const {
    mutate: A
  } = nt({
    mutationKey: ["CashReceipt"],
    mutationFn: async ({
      cashReceiptType: P,
      cashReceiptValue: Y
    }) => {
      await We.post(`/customer/v1/payment/${e}/cash-receipt`, {
        cashReceiptType: `${P}`,
        cashReceiptValue: `${Y}`
      });
    }
  }), {
    mutate: ee
  } = nt({
    mutationKey: ["CashReceipt"],
    mutationFn: async ({
      cashReceiptType: P,
      cashReceiptValue: Y
    }) => {
      await We.patch(`/customer/v1/payment/${e}/cash-receipt`, {
        cashReceiptType: `${P}`,
        cashReceiptValue: `${Y}`
      });
    }
  }), K = (P) => {
    P.preventDefault();
    const Y = S.replace(/\D/g, "");
    if (Y.length === 0) {
      alert(n("설명_현금영수증신청정보를입력해주세요"));
      return;
    }
    if (b === "CRT01" && Y.length !== 11 && Y.length !== 10) {
      alert(n("설명_현금영수증신청정보를확인해주세요"));
      return;
    }
    if (b === "CRT01" && !Y.startsWith("01")) {
      alert(n("설명_현금영수증신청정보를확인해주세요"));
      return;
    }
    t ? ee({
      cashReceiptType: b,
      cashReceiptValue: Y
    }) : A({
      cashReceiptType: b,
      cashReceiptValue: Y
    }), C();
  };
  return r(_t, {
    isOpen: w,
    title: n("타이틀_현금영수증신청"),
    onRequestClose: C
  }, r("div", null, r("div", {
    css: {
      maxHeight: "calc(100vh - 92px)",
      overflow: "auto",
      padding: "12px 24px 112px"
    }
  }, r("div", {
    css: {
      marginBottom: "24px"
    }
  }, r("div", {
    css: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      ":last-child": {
        paddingBottom: "24px"
      }
    }
  }, r("button", {
    type: "button",
    css: [b === "CRT01" ? c.primary : c.default, {
      flex: "1 1 0%",
      flexGrow: "0",
      flexBasis: "calc(50% - 4px)",
      padding: "18px 12px"
    }],
    onClick: () => _("CRT01")
  }, r(h, {
    css: {
      fontSize: "14px",
      fontWeight: "400"
    }
  }, n("타이틀_소득공제용"))), r("button", {
    type: "button",
    css: [b === "CRT02" ? c.primary : c.default, {
      flex: "1 1 0%",
      flexGrow: "0",
      flexBasis: "calc(50% - 4px)",
      padding: "18px 12px"
    }],
    onClick: () => _("CRT02")
  }, r(h, {
    css: {
      fontSize: "14px",
      fontWeight: "400"
    }
  }, n("타이틀_지출증빙용")))), r("div", {
    css: {
      marginTop: "8px",
      fontFamily: "Pretendard"
    }
  }, r("input", {
    css: {
      marginTop: "8px",
      display: "block",
      height: "48px",
      width: "100%",
      minWidth: "0px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: n(b === "CRT01" ? "설명_휴대전화번호입력" : "설명_사업자번호입력"),
    value: S,
    onChange: (P) => m(P.target.value ?? "")
  })))), r("div", {
    css: [{
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      padding: "12px 24px 16px"
    }, {
      backgroundColor: s.backgroundColor_hue_10
    }]
  }, r("button", {
    onClick: K,
    css: [c.primary, {
      minHeight: "38px",
      width: "100%",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "400"
    }]
  }, r(h, null, n("버튼_신청하기"))), r("button", {
    onClick: () => g(!1),
    css: [c.default, {
      marginTop: "8px",
      minHeight: "38px",
      width: "100%",
      borderRadius: "8px",
      borderWidth: "0px",
      fontSize: "14px",
      fontWeight: "400"
    }]
  }, r(h, null, n("버튼_닫기"))))));
}), Or = "irsePLRCN0pCprC9wknvww==", di = () => {
  var L, O, J, oe, X, de, ve, pe, be, Re, Oe, _e, Te, Me, He, Fe, De, je;
  const e = tt("order_no"), {
    fonts: t,
    colors: o,
    buttons: n
  } = Le(), {
    ct: i
  } = me(), {
    ct: s
  } = me(!0), {
    data: c
  } = D(q({
    orderNo: e
  })), {
    data: f
  } = D(si({
    orderNo: e,
    payload: {
      isGift: c == null ? void 0 : c.isGift,
      isApp: (c == null ? void 0 : c.deviceCd) === "DTA02",
      couponIssueCodes: c == null ? void 0 : c.orderCoupons.map((d) => d.couponIssueCode)
    },
    queryOptions: {
      select: (d) => (d == null ? void 0 : d.givePoint) ?? 0,
      enabled: !!c && c.isMember === "Y"
    }
  })), w = x.useRef(null), g = x.useRef(null), b = x.useRef(null), {
    data: _
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d.isMember
    }
  })), {
    data: S
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d.isGift === "Y"
    }
  })), {
    data: m
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d.currency
    }
  })), C = it(m, m === i("getCurrency")), {
    data: A
  } = D(ct({
    queryOptions: {
      select: (d) => d == null ? void 0 : d.pointName
    }
  })), {
    data: ee
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d == null ? void 0 : d.wtime
    }
  })), {
    data: K
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => (d == null ? void 0 : d.isRequestPayment) === "Y"
    }
  })), {
    data: P
  } = D(ct({
    queryOptions: {
      // 'Y', 'N', 'AUTO'
      select: (d) => (d == null ? void 0 : d.useCashReceipt) === "Y" || (d == null ? void 0 : d.useCashReceipt) === "AUTO"
    }
  })), {
    data: Y
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => Object.values(d == null ? void 0 : d.orderCoupons.reduce((U, l) => ({
        ...U,
        [l.couponIssueCode]: l
      }), {}))
    }
  })), {
    data: B
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d.orderSections.some((U) => [
        Z.ODT02.code,
        // 택배
        Z.ODT05.code,
        // 직접배송
        Z.ODT06.code,
        // 퀵
        Z.ODT08.code
        // 편의점
      ].includes(U.deliveryTypeCd))
    }
  })), {
    data: j
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d.orderSections.map((U) => U.pickupMemo)
    }
  })), {
    data: ie
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d.isGift !== "Y" && d.statusCd === Z.OOS03.code && d.orderSections.every((U) => U.statusCd === Z.OSS01.code)
    }
  })), {
    data: V
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d.orderSections.map((U) => U)
    }
  })), {
    data: T
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => {
        const U = d.orderSections.reduce((l, p) => (l[p.orderDeliveryCode] = p, l), {});
        return d.orderDeliverys.filter((l) => l.orderDeliveryCode === null || typeof U[l.orderDeliveryCode] < "u").map((l) => ({
          ...l,
          addressFormat: ["KR", "VN", "TW", "HK"].includes(l.country) ? l.country : l.country === "JP" ? "3" : "5"
        }));
      }
    }
  })), {
    data: M
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => {
        const U = /* @__PURE__ */ new Map();
        for (const l of d.orderItems)
          U.set(l.orderItemCode, l);
        return d.orderSections.filter((l) => l.deliveryTypeCd === Z.ODT07.code).flatMap((l) => l.orderSectionItems.map((p) => {
          var a;
          return (a = U.get(p.orderItemCode)) == null ? void 0 : a.prodCode;
        }));
      }
    }
  })), {
    data: $
  } = D(Er({
    productCodes: M
  })), le = ($ == null ? void 0 : $.shippingOriginAddress) ?? ($ == null ? void 0 : $.companyAddress), H = ($ == null ? void 0 : $.directNumber) ?? ((L = $ == null ? void 0 : $.companyContact) == null ? void 0 : L.call_num), {
    data: N
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => d.orderSections.some((U) => U.deliveryTypeCd === Z.ODT07.code)
    }
  })), {
    data: G
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (d) => {
        var U;
        return (U = d == null ? void 0 : d.payments) == null ? void 0 : U.filter((l) => l.isCancel === "N" && (typeof l.paymentBankTransfer < "u" || typeof l.paymentVirtual < "u") && l.statusCd === Z.OPS01.code);
      }
    }
  })), {
    data: E
  } = D(jr({
    orderNo: e
  })), {
    data: y
  } = ai(e);
  if (!c || !E)
    return null;
  const F = K && (c == null ? void 0 : c.paymentPrice) - (c == null ? void 0 : c.refundPendingPrice) > (c == null ? void 0 : c.pgAmount) - (c == null ? void 0 : c.pgCancelPrice) && !((c == null ? void 0 : c.payments) ?? []).some(
    // 무통장 입금 or 가상계좌인데, 결제 대기인 상태가 있는 경우 미결된 금액이 있어도 결제하기 버튼을 보여주지 않는다.
    (d) => [Z.OPM01.code, Z.OPM03.code].includes(d.methodCd) && d.statusCd === Z.OPS01.code
  );
  return r(x.Fragment, null, r("div", {
    css: {
      marginBottom: "16px",
      display: "flex",
      minHeight: "16px"
    }
  }, r("a", {
    css: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: "transparent"
      }
    },
    href: _ ? "/shop_mypage" : "/"
  }, r(Kt, {
    width: "24px",
    height: "24px",
    color: o.titleColor
  })), r(te, {
    inline: !0,
    css: [Ke({
      fontFamily: t.pretendard,
      fontSize: 18,
      fontWeight: 700,
      paddingLeft: 12
    })]
  }, i("타이틀_주문상세내역")), S ? r(te, {
    inline: !0,
    css: [{
      marginLeft: "8px",
      display: "flex",
      alignItems: "center",
      borderRadius: "100vh",
      backgroundColor: "rgba(0,0,0,0.04)",
      padding: "6px 10px"
    }]
  }, r(Zo, null), r("div", {
    css: {
      paddingLeft: "4px",
      fontSize: "13px",
      color: "Pretendard"
    }
  }, i("설명_선물"))) : null), G == null ? void 0 : G.map((d) => {
    var u, v, k, z, Q, re, ne, Ce;
    const U = ((u = d.paymentBankTransfer) == null ? void 0 : u.bankName) ?? ((v = d == null ? void 0 : d.paymentVirtual) == null ? void 0 : v.bankName), l = ((k = d.paymentBankTransfer) == null ? void 0 : k.accountHolderName) ?? ((z = d == null ? void 0 : d.paymentVirtual) == null ? void 0 : z.accountHolderName), p = ((Q = d.paymentBankTransfer) == null ? void 0 : Q.bankAccount) ?? ((re = d == null ? void 0 : d.paymentVirtual) == null ? void 0 : re.bankAccount), a = ((ne = d.paymentBankTransfer) == null ? void 0 : ne.expireTime) ?? ((Ce = d == null ? void 0 : d.paymentVirtual) == null ? void 0 : Ce.expireTime);
    return r("div", {
      css: [{
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "12px",
        padding: "20px 16px"
      }, {
        backgroundColor: o.brandColor_alpha10
      }],
      key: d.paymentNo
    }, r("div", {
      css: {
        "@media not all and (min-width: 768px)": {
          display: "flex",
          flexDirection: "column"
        },
        "@media (min-width: 768px)": {
          display: "flex",
          flex: "1 1 0%",
          alignItems: "center",
          justifyContent: "space-between"
        }
      }
    }, r(lr, {
      iconWidth: 16,
      iconHeight: 16,
      svgPlainText: '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V13M12 16V16.1M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
    }, r(h, {
      css: [{
        fontSize: "13px",
        lineHeight: "160%"
      }, {
        color: "rgba(33,33,33,0.7)"
      }]
    }, i("설명_까지입금해주세요", Ge(new Date(a), "yyyy-MM-dd HH:mm"))), r(h, {
      css: [{
        fontSize: "13px",
        "@media not all and (min-width: 768px)": {
          display: "none"
        }
      }]
    }, `${s(`설명_${U}`) ?? U} ${p} · ${l}`)), r(h, {
      css: [{
        paddingLeft: "24px",
        fontSize: "13px",
        "@media (min-width: 768px)": {
          display: "none"
        }
      }]
    }, `${s(`설명_${U}`) ?? U} ${p} · ${l}`), r(h, {
      css: {
        display: "flex",
        flexShrink: "0",
        justifyContent: "flex-start",
        fontSize: "20px",
        fontWeight: "700",
        "@media not all and (min-width: 768px)": {
          marginLeft: "24px",
          flex: "1 1 0%"
        }
      }
    }, C(d.paidPrice))));
  }), F ? r("div", {
    css: [{
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "12px",
      padding: "20px 16px"
    }, {
      backgroundColor: o.brandColor_alpha10
    }]
  }, r("div", {
    css: {
      "@media not all and (min-width: 768px)": {
        display: "flex",
        flexDirection: "column"
      },
      "@media (min-width: 768px)": {
        display: "flex",
        flex: "1 1 0%",
        justifyContent: "space-between"
      }
    }
  }, r(lr, {
    iconWidth: 16,
    iconHeight: 16,
    svgPlainText: '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V13M12 16V16.1M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
  }, r(te, {
    inline: !0,
    css: {
      fontFamily: "Pretendard",
      fontSize: "14px"
    }
  }, i("설명_추가결제가필요해요"))), r("div", {
    css: {
      display: "flex",
      flexShrink: "0",
      fontFamily: "Pretendard",
      fontSize: "20px",
      fontWeight: "700",
      "@media not all and (min-width: 768px)": {
        marginLeft: "24px"
      }
    }
  }, C(xe(c.paymentPrice).subtract(c.refundPendingPrice).subtract(c.pgAmount).add(c.pgCancelPrice)))), r("button", {
    onClick: () => {
      var d;
      return (d = g.current) == null ? void 0 : d.open();
    },
    css: [n.primary, {
      marginLeft: "16px",
      minHeight: "40px",
      padding: "9px 12px"
    }]
  }, i("버튼_결제하기")), r(oi, {
    ref: g,
    orderNo: e
  })) : null, r(Gt, null, r("div", {
    css: {
      marginBottom: "16px",
      paddingTop: "24px",
      "@media not all and (min-width: 768px)": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "24px",
        paddingRight: "24px"
      },
      "@media (min-width: 768px)": {
        paddingLeft: "20px",
        paddingRight: "20px"
      }
    }
  }, r("div", null, r(te, {
    inline: !0,
    css: [{
      fontFamily: t.pretendard
    }, {
      fontSize: "14px",
      fontWeight: "700"
    }]
  }, `${i("타이틀_주문번호")} ${e}`)), r("div", null, r(te, {
    inline: !0,
    css: [{
      fontFamily: t.pretendard,
      color: o.bodyColor_mist_font70
    }, {
      fontSize: "14px"
    }]
  }, Ge(new Date(ee), "yyyy-MM-dd")))), V == null ? void 0 : V.map((d) => r(Cn, {
    key: d.orderSectionCode,
    section: d,
    currencyUnit: m
  }))), ((O = c.orderFormData) == null ? void 0 : O.length) > 0 ? r(ye, {
    title: i("타이틀_상세구매정보"),
    summary: ""
  }, c.orderFormData.map((d) => {
    var U, l;
    switch (d.inputTypeCd) {
      case Ue.TEXT: {
        const [p] = d.value;
        return ((p == null ? void 0 : p.length) ?? 0) === 0 ? null : r("div", {
          css: {
            marginTop: "8px",
            "@media (min-width: 768px)": {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }
          },
          key: d.idx
        }, r(h, {
          key: d.idx,
          css: [{
            fontSize: "15px"
          }, {
            color: o.bodyColor_mist_font70
          }]
        }, d.title), r(h, {
          css: {
            overflowWrap: "normal",
            wordBreak: "normal",
            fontSize: "15px"
          }
        }, p));
      }
      case Ue.TEXTAREA: {
        const [p] = d.value;
        return ((p == null ? void 0 : p.length) ?? 0) === 0 ? null : r("div", {
          css: {
            marginTop: "8px",
            "@media (min-width: 768px)": {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }
          }
        }, r(h, {
          key: d.idx,
          css: [{
            fontSize: "15px"
          }, {
            color: o.bodyColor_mist_font70
          }]
        }, d.title), r(h, {
          css: {
            overflowWrap: "normal",
            wordBreak: "normal",
            fontSize: "15px"
          }
        }, p));
      }
      case Ue.RADIO: {
        const [p] = d.value;
        return ((p == null ? void 0 : p.length) ?? 0) === 0 ? null : r("div", {
          css: {
            marginTop: "8px",
            "@media (min-width: 768px)": {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }
          }
        }, r(h, {
          key: d.idx,
          css: [{
            fontSize: "15px"
          }, {
            color: o.bodyColor_mist_font70
          }]
        }, d.title), r(h, {
          css: {
            overflowWrap: "normal",
            wordBreak: "normal",
            fontSize: "15px"
          }
        }, p));
      }
      case Ue.SELECT: {
        const [p] = d.value;
        return ((p == null ? void 0 : p.length) ?? 0) === 0 ? null : r("div", {
          css: {
            marginTop: "8px",
            "@media (min-width: 768px)": {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }
          }
        }, r(h, {
          key: d.idx,
          css: [{
            fontSize: "15px"
          }, {
            color: o.bodyColor_mist_font70
          }]
        }, d.title), r(h, {
          css: {
            overflowWrap: "normal",
            wordBreak: "normal",
            fontSize: "15px"
          }
        }, p));
      }
      case Ue.CHECKBOX: {
        const p = d.value.join(", ");
        return ((p == null ? void 0 : p.length) ?? 0) === 0 ? null : r("div", {
          css: {
            marginTop: "8px",
            "@media (min-width: 768px)": {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }
          }
        }, r(h, {
          key: d.idx,
          css: [{
            fontSize: "15px"
          }, {
            color: o.bodyColor_mist_font70
          }]
        }, d.title), r(h, {
          css: {
            overflowWrap: "normal",
            wordBreak: "normal",
            fontSize: "15px"
          }
        }, p));
      }
      case Ue.DATE: {
        const [p] = d.value;
        return ((p == null ? void 0 : p.length) ?? 0) === 0 ? null : r("div", {
          css: {
            marginTop: "8px",
            "@media (min-width: 768px)": {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }
          }
        }, r(h, {
          key: d.idx,
          css: [{
            fontSize: "15px"
          }, {
            color: o.bodyColor_mist_font70
          }]
        }, d.title), r(h, {
          css: {
            overflowWrap: "normal",
            wordBreak: "normal",
            fontSize: "15px"
          }
        }, p));
      }
      case Ue.TIME: {
        const [p] = d.value;
        return ((p == null ? void 0 : p.length) ?? 0) === 0 ? null : r("div", {
          css: {
            marginTop: "8px",
            "@media (min-width: 768px)": {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }
          }
        }, r(h, {
          key: d.idx,
          css: [{
            fontSize: "15px"
          }, {
            color: o.bodyColor_mist_font70
          }]
        }, d.title), r(h, {
          css: {
            overflowWrap: "normal",
            wordBreak: "normal",
            fontSize: "15px"
          }
        }, p));
      }
      case Ue.FILE: {
        const p = typeof ((U = d.fileDownloadUrl) == null ? void 0 : U.fileName) == "string" ? (l = d.fileDownloadUrl) == null ? void 0 : l.fileName : void 0;
        return ((p == null ? void 0 : p.length) ?? 0) === 0 ? null : r("div", {
          css: {
            marginTop: "8px",
            "@media (min-width: 768px)": {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }
          }
        }, r(h, {
          key: d.idx,
          css: [{
            fontSize: "15px"
          }, {
            color: o.bodyColor_mist_font70
          }]
        }, d.title), r(h, {
          css: {
            fontSize: "15px"
          }
        }, p));
      }
    }
  }).filter(Boolean)) : null, r(ye, {
    title: i("타이틀_주문자"),
    summary: (c == null ? void 0 : c.ordererName) ?? ""
  }, r("div", null, r(h, {
    css: [{
      color: o.bodyColor_mist_font70
    }, {
      marginBottom: "8px",
      fontSize: "15px",
      lineHeight: "22px"
    }]
  }, c == null ? void 0 : c.ordererName), r(h, {
    css: [{
      color: o.bodyColor_mist_font70
    }, {
      marginBottom: "8px",
      fontSize: "15px",
      lineHeight: "22px"
    }]
  }, c == null ? void 0 : c.ordererCall), r(h, {
    css: [{
      color: o.bodyColor_mist_font70
    }, {
      fontSize: "15px",
      lineHeight: "22px"
    }]
  }, c == null ? void 0 : c.ordererEmail))), S ? (J = T ?? []) == null ? void 0 : J.map((d) => {
    const U = (d == null ? void 0 : d.orderDeliveryCode) ?? Xe(d, {
      excludeKeys: (l) => !["wtime"].includes(l)
    });
    return r(x.Fragment, null, r(ye, {
      key: U,
      title: i("설명_선물정보"),
      summary: (d == null ? void 0 : d.receiverName) ?? ""
    }, r("div", null, r(h, {
      css: [{
        color: o.bodyColor_mist_font70
      }, {
        marginBottom: "8px",
        fontSize: "15px",
        lineHeight: "22px"
      }]
    }, (d == null ? void 0 : d.receiverName) ?? ""), r(h, {
      css: [{
        color: o.bodyColor_mist_font70
      }, {
        marginBottom: "8px",
        fontSize: "15px",
        lineHeight: "22px"
      }]
    }, (d == null ? void 0 : d.receiverCall) ?? ""))));
  }) : null, B ? (oe = T ?? []) == null ? void 0 : oe.map((d, U) => {
    if (d.whoInput === "receiver") return null;
    const l = (d == null ? void 0 : d.orderDeliveryCode) ?? Xe(d, {
      excludeKeys: (p) => !["wtime"].includes(p)
    });
    return r(he.Fragment, {
      key: U
    }, r(ye, {
      key: l,
      title: i("타이틀_배송지"),
      summary: (d == null ? void 0 : d.receiverName) ?? ""
    }, r("div", {
      css: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        fontFamily: "Pretendard",
        "@media (min-width: 768px)": {
          flexDirection: "row",
          alignItems: "center"
        }
      }
    }, r("div", {
      css: {
        flexGrow: "1"
      }
    }, r(h, {
      css: [{
        color: o.bodyColor_mist_font70
      }, {
        marginBottom: "8px",
        fontSize: "15px",
        lineHeight: "22px"
      }]
    }, (d == null ? void 0 : d.receiverName) ?? ""), r(h, {
      css: [{
        color: o.bodyColor_mist_font70
      }, {
        marginBottom: "8px",
        fontSize: "15px",
        lineHeight: "22px"
      }]
    }, (d == null ? void 0 : d.receiverCall) ?? ""), r("div", {
      css: {
        display: "flex",
        alignItems: "flex-start",
        gap: "16px"
      }
    }, r(Hr, {
      address: d,
      strict: !0,
      textColor: o.bodyColor_mist_font70
    })), r(h, {
      css: [{
        color: o.bodyColor_mist_font70
      }, {
        fontSize: "15px",
        lineHeight: "22px"
      }]
    }, (d == null ? void 0 : d.memo) ?? "")), ie && r(x.Fragment, null, r("button", {
      onClick: () => {
        var p;
        return (p = w.current) == null ? void 0 : p.open();
      },
      css: [n.default, {
        height: "fit-content",
        minWidth: "100px",
        padding: "9px 0",
        textAlign: "center",
        fontSize: "14px",
        lineHeight: "22.4px",
        "@media not all and (min-width: 768px)": {
          flex: "1 1 0%"
        }
      }]
    }, i("버튼_수정")), r(he.Suspense, {
      fallback: null
    }, r(Kn, {
      ref: w,
      orderNo: e ?? "",
      currentAddress: d,
      orderDeliveryCode: d.orderDeliveryCode ?? ""
    }))))));
  }) : null, N ? r(ye, {
    title: i("타이틀_방문수령정보")
  }, le == null ? void 0 : le.filter(([, d]) => d).map(([d, U]) => r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    },
    key: d
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, U))), !!H && r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, H)), r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      justifyContent: "space-between"
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, j == null ? void 0 : j.map((d) => d).join(", ")))) : null, E.totalDiscountPrice > 0 ? r(ye, {
    title: i("타이틀_할인정보"),
    summary: C(-E.totalDiscountPrice)
  }, E.gradeDiscount > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("설명_등급")), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(-E.gradeDiscount))) : null, E.itemCouponDiscount > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("타이틀_쿠폰")), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(-E.itemCouponDiscount))) : null, r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      borderLeftWidth: "4px",
      "--tw-border-opacity": "1",
      borderColor: "rgb(233 237 241 / var(--tw-border-opacity))",
      paddingLeft: "10px"
    }
  }, Y.filter((d) => d.applySaleType !== "delivery").map((d) => r(h, {
    key: d.couponIssueCode,
    css: [{
      "@media not all and (min-width: 768px)": {
        fontSize: "13px"
      },
      "@media (min-width: 768px)": {
        fontSize: "15px"
      }
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, d == null ? void 0 : d.couponName))), E.itemPointAmount > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, A), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(-E.itemPointAmount))) : null, E.deliveryCouponDiscount ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("설명_배송비쿠폰")), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(-E.deliveryCouponDiscount))) : null, r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      borderLeftWidth: "4px",
      "--tw-border-opacity": "1",
      borderColor: "rgb(233 237 241 / var(--tw-border-opacity))",
      paddingLeft: "10px"
    }
  }, Y.filter((d) => d.applySaleType === "delivery").map((d) => r(h, {
    key: d.couponIssueCode,
    css: [{
      "@media not all and (min-width: 768px)": {
        fontSize: "13px"
      },
      "@media (min-width: 768px)": {
        fontSize: "15px"
      }
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, d == null ? void 0 : d.couponName))), E.deliveryPointAmount ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("설명_배송비포인트")), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(-E.deliveryPointAmount))) : null, r("div", {
    css: {
      marginTop: "12px",
      display: "flex",
      justifyContent: "space-between"
    }
  }, r(h, {
    css: {
      fontSize: "16px",
      fontWeight: "700"
    }
  }, i("설명_할인합계")), r(h, {
    css: {
      fontSize: "20px",
      fontWeight: "700"
    }
  }, C(-E.totalDiscountPrice)))) : null, r(ye, {
    title: i("타이틀_결제정보"),
    summary: c.pgAmount > 0 ? C(c.pgAmount) : "",
    defaultStateOpen: !0
  }, r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "8px"
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("설명_상품금액")), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(E == null ? void 0 : E.itemPrice))), B ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "8px"
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("설명_기본배송비"), (y == null ? void 0 : y.delivery.isCashOnDelivery) && ` (${i("타이틀_착불")})`), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(y == null ? void 0 : y.delivery.deliveryPrice))) : null, B && ((y == null ? void 0 : y.delivery.deliveryIslandPrice) ?? 0) > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "8px"
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("타이틀_도서산간배송비"), (y == null ? void 0 : y.delivery.isCashOnDelivery) && ` (${i("타이틀_착불")})`), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(y == null ? void 0 : y.delivery.deliveryIslandPrice))) : null, B && ((y == null ? void 0 : y.delivery.deliveryExtraPrice) ?? 0) > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "8px"
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("설명_추가배송비"), (y == null ? void 0 : y.delivery.isCashOnDelivery) && ` (${i("타이틀_착불")})`), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(Math.max(0, (y == null ? void 0 : y.delivery.deliveryExtraPrice) ?? 0)))) : null, E.totalDiscountPrice > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "8px"
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("설명_할인합계")), r(h, {
    css: {
      fontSize: "15px"
    }
  }, C(-E.totalDiscountPrice))) : null, r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      justifyContent: "space-between"
    }
  }, r(h, {
    css: {
      fontSize: "16px",
      fontWeight: "700"
    }
  }, i("설명_결제된금액")), r(h, {
    css: {
      fontSize: "20px",
      fontWeight: "700"
    }
  }, C(c.pgAmount))), r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, r("div", {
    css: {
      marginTop: "12px",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      borderLeftWidth: "4px",
      "--tw-border-opacity": "1",
      borderColor: "rgb(233 237 241 / var(--tw-border-opacity))",
      paddingLeft: "10px"
    }
  }, (X = c == null ? void 0 : c.payments) == null ? void 0 : X.filter((d) => d.isCancel === "N").map((d) => {
    var u, v, k, z, Q, re, ne, Ce, Je, qe, Ve, R;
    const {
      methodCd: U,
      statusCd: l
    } = d, p = s(`CD_${U}`), a = (
      // 결제상태가 표시되는 경우
      ["OPS01", "OPS02", "OPS03", "OPS04", "OPS05", "OPS08"].includes(l) ? ` (${s(`CD_${l}`)})` : ""
    );
    return r("div", {
      key: Xe(d),
      css: [{
        display: "flex",
        justifyContent: "space-between",
        ":not(:last-child)": {
          marginBottom: "12px"
        }
      }]
    }, r("div", {
      css: [{
        color: o.bodyColor_mist_font70
      }]
    }, d.methodCd === "OPM10" && typeof d.paymentCard < "u" ? (
      // 정기구독 결제 - 신용카드로 표시
      r(x.Fragment, null, r(h, {
        css: {
          fontWeight: "700",
          lineHeight: "1.6",
          "@media not all and (min-width: 768px)": {
            fontSize: "13px"
          },
          "@media (min-width: 768px)": {
            fontSize: "15px"
          }
        }
      }, p), r(h, {
        css: {
          lineHeight: "1.6",
          "@media not all and (min-width: 768px)": {
            fontSize: "13px"
          },
          "@media (min-width: 768px)": {
            fontSize: "15px"
          }
        }
      }, `${yt[mt[((u = d.paymentCard) == null ? void 0 : u.companyCd) ?? "CCC01"]]} · ${d.paymentCard.cardNo.replace(/-/g, " ")}`))
    ) : null, d.methodCd !== "OPM10" && typeof d.paymentCard < "u" ? r(x.Fragment, null, r(h, {
      css: {
        fontWeight: "700",
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, p, a), r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${yt[mt[((v = d.paymentCard) == null ? void 0 : v.companyCd) ?? "CCC01"]]} · ${d.paymentCard.cardNo.replace(/-/g, " ")}`)) : null, typeof d.paymentBankTransfer < "u" ? r(x.Fragment, null, r(h, {
      css: {
        fontWeight: "700",
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, p, a), r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${s(`설명_${d.paymentBankTransfer.bankName}`) ?? d.paymentBankTransfer.bankName} ${d.paymentBankTransfer.bankAccount}`), r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${i("설명_예금주")} ${d.paymentBankTransfer.accountHolderName}`), P ? r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, r("span", {
      css: {
        fontWeight: "700"
      }
    }, i("타이틀_현금영수증")), ((k = d.paymentCashReceipt) == null ? void 0 : k.statusCd) === "CRS02" ? r("span", {
      css: {
        marginLeft: "4px"
      }
    }, ((z = d.paymentCashReceipt) == null ? void 0 : z.isCustomer) === "Y" ? i("타이틀_발행완료") : `${i("타이틀_발행완료")} ${i("타이틀_판매자자진발급")}`) : ((Q = d.paymentCashReceipt) == null ? void 0 : Q.isRequire) === "Y" && ((re = d.paymentCashReceipt) == null ? void 0 : re.value) === Or || ((ne = d.paymentCashReceipt) == null ? void 0 : ne.isCustomer) !== "Y" ? r("span", {
      css: {
        marginLeft: "4px"
      }
    }, i("타이틀_미신청")) : r("span", {
      css: {
        marginLeft: "4px"
      }
    }, i("타이틀_신청완료")), window.LANG_CODE === "KR" && (((Ce = d.paymentCashReceipt) == null ? void 0 : Ce.statusCd) ?? "CRS01") === "CRS01" && (/* @__PURE__ */ new Date()).getTime() - new Date(d.paymentBankTransfer.wtime).getTime() < ho ? r(x.Fragment, null, ((Je = d.paymentCashReceipt) == null ? void 0 : Je.isRequire) === "Y" && ((qe = d.paymentCashReceipt) == null ? void 0 : qe.value) === Or || ((Ve = d.paymentCashReceipt) == null ? void 0 : Ve.isCustomer) !== "Y" ? r("button", {
      css: [{
        color: o.brandColor,
        textDecoration: "underline",
        marginLeft: "4px"
      }, {
        marginLeft: "4px",
        appearance: "none",
        borderWidth: "0px",
        backgroundColor: "transparent",
        padding: "0px",
        textDecorationLine: "underline"
      }],
      onClick: () => {
        var I;
        return (I = b.current) == null ? void 0 : I.open();
      }
    }, i("버튼_신청하기")) : r("button", {
      css: [{
        color: o.brandColor,
        textDecoration: "underline",
        marginLeft: "4px"
      }, {
        marginLeft: "4px",
        appearance: "none",
        borderWidth: "0px",
        backgroundColor: "transparent",
        padding: "0px",
        textDecorationLine: "underline"
      }],
      onClick: () => {
        var I;
        return (I = b.current) == null ? void 0 : I.open();
      }
    }, i("버튼_수정")), r(li, {
      ref: b,
      paymentCode: d.paymentCode,
      isEditableDisplay: ((R = d.paymentCashReceipt) == null ? void 0 : R.isCustomer) === "Y",
      isEditable: typeof d.paymentCashReceipt < "u"
    }), r(h, null, i("설명_주문일로부터5일이지나면신청이불가능합니다"))) : null) : null, d.isCancel === "N" && d.statusCd === Z.OPS01.code ? r(h, {
      css: {
        lineHeight: "1.6",
        "--tw-text-opacity": "1",
        color: "rgb(226 129 0 / var(--tw-text-opacity))",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${i("설명_까지입금해주세요", Ge(new Date(d.paymentBankTransfer.expireTime), "yyyy-MM-dd HH:mm"))}`) : null) : null, typeof d.paymentVirtual < "u" ? r(x.Fragment, null, r(h, {
      css: {
        fontWeight: "700",
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, p, a), r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${s(`설명_${d.paymentVirtual.bankName}`) ?? d.paymentVirtual.bankName} ${d.paymentVirtual.bankAccount}`), r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${i("설명_예금주")} ${d.paymentVirtual.accountHolderName}`), d.isCancel === "N" && d.statusCd === Z.OPS01.code ? r(h, {
      css: {
        lineHeight: "1.6",
        "--tw-text-opacity": "1",
        color: "rgb(226 129 0 / var(--tw-text-opacity))",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${i("설명_까지입금해주세요", Ge(new Date(d.paymentVirtual.expireTime), "yyyy-MM-dd HH:mm"))}`) : null) : null, typeof d.paymentCard > "u" && typeof d.paymentBankTransfer > "u" && typeof d.paymentVirtual > "u" ? r(x.Fragment, null, r(h, {
      css: {
        fontWeight: "700",
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, p, a)) : null), r("div", null, r(h, {
      css: {
        textAlign: "right",
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, C(d.paidPrice)), !!(y != null && y.receiptUrlMap[d.paymentCode]) && r("a", {
      href: y.receiptUrlMap[d.paymentCode],
      target: "_blank",
      rel: "noreferrer noopener"
    }, r(h, {
      css: [{
        textAlign: "right",
        fontSize: "15px",
        textDecorationLine: "underline",
        "@media not all and (min-width: 768px)": {
          display: "none"
        }
      }, {
        color: o.brandColor
      }]
    }, i("버튼_영수증")))));
  }))), !!((de = y == null ? void 0 : y.receiptUrlList[0]) != null && de[1]) && r("button", {
    onClick: () => window.open(y.receiptUrlList[0][1], "_blank", "noopener,noreferrer"),
    css: [n.default, {
      marginTop: "24px",
      height: "fit-content",
      width: "100%",
      padding: "9px 0",
      textAlign: "center",
      fontSize: "14px",
      lineHeight: "22.4px",
      "@media (min-width: 768px)": {
        display: "none"
      }
    }]
  }, i("버튼_영수증")), f > 0 && (c.isUnpaidDepositOrderCancelable || c.orderSections.find((d) => ["OSS01", "OSS02", "OSS03", "OSS04"].includes(d.statusCd))) ? r("div", {
    css: {
      marginTop: "12px",
      display: "flex",
      justifyContent: "space-between"
    }
  }, r(h, {
    css: [{
      color: o.brandColor
    }, {
      fontSize: "15px"
    }]
  }, i("타이틀_n포인트명적립예정", i("getCurrencyFormat", f), A))) : null, F ? r("div", {
    css: {
      marginTop: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, r("div", {
    css: {
      display: "flex",
      flex: "1 1 0%"
    }
  }, r(h, {
    css: {
      flex: "1 1 0%",
      fontSize: "16px",
      fontWeight: "700"
    }
  }, i("타이틀_추가결제필요")), r("div", {
    css: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end"
    }
  }, r(h, {
    css: {
      fontSize: "20px",
      fontWeight: "700"
    }
  }, C(xe(c.paymentPrice).subtract(c.refundPendingPrice).subtract(c.pgAmount).add(c.pgCancelPrice))), r(h, {
    css: [{
      fontSize: "14px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }))), r("button", {
    onClick: () => {
      var d;
      return (d = g.current) == null ? void 0 : d.open();
    },
    css: [n.primary, {
      marginLeft: "16px",
      minHeight: "40px",
      padding: "9px 12px"
    }]
  }, i("버튼_결제하기"))) : null), ((ve = c.orderRefundPrice) == null ? void 0 : ve.totalPrice) > 0 ? r(ye, {
    title: i("타이틀_환불정보"),
    summary: C((pe = c.orderRefundPrice) == null ? void 0 : pe.totalPrice)
  }, ((be = c.orderRefundPrice) == null ? void 0 : be.productPrice) > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("타이틀_환불상품금액")), r(h, {
    css: {
      fontSize: "15px",
      lineHeight: "1.6"
    }
  }, C((Re = c.orderRefundPrice) == null ? void 0 : Re.productPrice))) : null, ((Oe = c.orderRefundPrice) == null ? void 0 : Oe.deliveryPrice) > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("타이틀_배송비")), r(h, {
    css: {
      fontSize: "15px",
      lineHeight: "1.6"
    }
  }, C((_e = c.orderRefundPrice) == null ? void 0 : _e.deliveryPrice))) : null, ((Te = c.orderRefundPrice) == null ? void 0 : Te.refundPoint) > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("타이틀_포인트")), r(h, {
    css: {
      fontSize: "15px",
      lineHeight: "1.6"
    }
  }, C((Me = c.orderRefundPrice) == null ? void 0 : Me.refundPoint))) : null, ((He = c.orderRefundPrice) == null ? void 0 : He.etcPrice) > 0 ? r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between",
      ":not(:first-child)": {
        marginTop: "8px"
      }
    }
  }, r(h, {
    css: [{
      fontSize: "15px"
    }, {
      color: o.bodyColor_mist_font70
    }]
  }, i("타이틀_기타환불")), r(h, {
    css: {
      fontSize: "15px",
      lineHeight: "1.6"
    }
  }, C((Fe = c.orderRefundPrice) == null ? void 0 : Fe.etcPrice))) : null, r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      justifyContent: "space-between"
    }
  }, r(h, {
    css: {
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "1.6"
    }
  }, i("설명_환불금액")), r(h, {
    css: {
      fontSize: "20px",
      fontWeight: "700",
      lineHeight: "1.6"
    }
  }, C((De = c.orderRefundPrice) == null ? void 0 : De.totalPrice))), r("div", {
    css: {
      marginTop: "12px",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      borderLeftWidth: "4px",
      "--tw-border-opacity": "1",
      borderColor: "rgb(233 237 241 / var(--tw-border-opacity))",
      paddingLeft: "10px"
    }
  }, (je = c == null ? void 0 : c.payments) == null ? void 0 : je.filter((d) => d.isCancel === "Y").map((d) => {
    var u, v;
    const {
      methodCd: U,
      statusCd: l
    } = d, p = s(`CD_${U}`), a = (
      // 결제상태가 표시되는 경우
      ["OPS01", "OPS02", "OPS03", "OPS04", "OPS05", "OPS08"].includes(l) ? r("span", {
        css: {
          fontWeight: "700"
        }
      }, ` (${s(`CD_${l}`)})`) : ""
    );
    return r("div", {
      key: Xe(d),
      css: [{
        display: "flex",
        justifyContent: "space-between",
        ":not(:last-child)": {
          marginBottom: "12px"
        }
      }]
    }, r("div", {
      css: [{
        color: o.bodyColor_mist_font70
      }]
    }, d.methodCd === "OPM10" && typeof d.paymentCard < "u" ? (
      // 정기구독 결제 - 신용카드로 표시
      r(x.Fragment, null, r(h, {
        css: {
          lineHeight: "1.6",
          "@media not all and (min-width: 768px)": {
            fontSize: "13px"
          },
          "@media (min-width: 768px)": {
            fontSize: "15px"
          }
        }
      }, p), r(h, {
        css: {
          lineHeight: "1.6",
          "@media not all and (min-width: 768px)": {
            fontSize: "13px"
          },
          "@media (min-width: 768px)": {
            fontSize: "15px"
          }
        }
      }, `${yt[mt[((u = d.paymentCard) == null ? void 0 : u.companyCd) ?? "CCC01"]]} · ${d.paymentCard.cardNo.replace(/-/g, " ")}`))
    ) : null, d.methodCd !== "OPM10" && typeof d.paymentCard < "u" ? r(x.Fragment, null, r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, p, a), r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${yt[mt[((v = d.paymentCard) == null ? void 0 : v.companyCd) ?? "CCC01"]]} · ${d.paymentCard.cardNo.replace(/-/g, " ")}`)) : null, typeof d.paymentBankTransfer < "u" ? r(x.Fragment, null, r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, p, a)) : null, typeof d.paymentVirtual < "u" ? r(x.Fragment, null, r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, p, a), r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${s(`설명_${d.paymentVirtual.bankName}`) ?? d.paymentVirtual.bankName} ${d.paymentVirtual.bankAccount}`), r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, `${i("설명_예금주")} ${d.paymentVirtual.accountHolderName}`)) : null, typeof d.paymentCard > "u" && typeof d.paymentBankTransfer > "u" && typeof d.paymentVirtual > "u" ? r(x.Fragment, null, r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, p, a)) : null), r("div", null, r(h, {
      css: {
        lineHeight: "1.6",
        "@media not all and (min-width: 768px)": {
          fontSize: "13px"
        },
        "@media (min-width: 768px)": {
          fontSize: "15px"
        }
      }
    }, C(d.paidPrice))));
  }))) : null);
}, Jr = ({
  type: e,
  queryOptions: t
} = {}) => ({
  queryKey: ["ClaimReasonConfig"],
  queryFn: async ({
    signal: o
  }) => {
    const {
      data: n
    } = await St.get(`/ajax/oms/OMS_get_claim_reason_config.cm?type=${e}`, {
      signal: o
    });
    return (n == null ? void 0 : n.list) ?? [];
  },
  ...t
}), ci = ({
  value: e,
  maxValue: t = Number.MAX_SAFE_INTEGER,
  minValue: o = 0,
  ...n
}) => {
  const [i, s] = x.useState(e), c = (w) => {
    const {
      innerText: g,
      textContent: b
    } = w.currentTarget, _ = b.replace(/[^0-9-]/g, "");
    w.nativeEvent instanceof InputEvent && g.length !== b.length && (w.currentTarget.textContent = _, w.currentTarget.blur());
  }, f = (w) => {
    const g = parseInt(w.currentTarget.textContent.replace(/[^0-9-]/g, "") || "0", 10);
    if (isNaN(g)) {
      n.onChange && (n.onChange(o), s(o));
      return;
    }
    const b = Math.max(
      o,
      // maxValue가 없을 경우 수량이 음수인 입력은 허용하지 않음
      typeof t > "u" ? g : Math.min(g >= 0 ? g : t + g, t)
    );
    w.currentTarget.textContent = b.toString(), n.onChange && (n.onChange(b), s(b));
  };
  return r("div", {
    css: {
      display: "flex",
      height: "30px",
      alignItems: "center"
    }
  }, r("button", {
    css: [{
      display: "flex",
      height: "100%",
      width: "30px",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(234 236 239 / var(--tw-bg-opacity))"
    }],
    disabled: i <= o,
    onClick: () => s((w) => {
      var g;
      return (g = n.onChange) == null || g.call(n, Math.max(o, w - 1)), Math.max(o, w - 1);
    })
  }, r("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none"
  }, r("path", {
    d: "M16.6663 10.0003H3.33301",
    stroke: i > o ? "#15181E" : "#BCC0C6"
  }))), r("div", {
    contentEditable: !0,
    suppressContentEditableWarning: !0,
    onBlur: f,
    onInput: c,
    css: {
      height: "100%",
      minWidth: "42px",
      appearance: "none",
      borderWidth: "1px",
      borderStyle: "solid !important",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      paddingLeft: "16px",
      paddingRight: "16px",
      textAlign: "center",
      fontSize: "14px",
      lineHeight: "30px"
    }
  }, i), r("button", {
    css: [{
      display: "flex",
      height: "100%",
      width: "30px",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(234 236 239 / var(--tw-bg-opacity))"
    }, {
      display: "flex",
      height: "100%",
      width: "30px",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(234 236 239 / var(--tw-bg-opacity))"
    }],
    disabled: i >= t,
    onClick: () => s((w) => {
      var g;
      return (g = n.onChange) == null || g.call(n, Math.min(t, w + 1)), Math.min(t, w + 1);
    })
  }, r("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none"
  }, r("path", {
    d: "M9.99967 3.33301V16.6663M16.6663 9.99967H3.33301",
    stroke: i < t ? "#15181E" : "#BCC0C6"
  }))));
}, pi = ({
  orderItemCode: e,
  ...t
}) => {
  const o = tt("order_no"), {
    ct: n,
    nf: i
  } = me(), {
    colors: s,
    fonts: c
  } = Le(), {
    data: f
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (S) => S.currency
    }
  })), w = it(f, f === n("getCurrency")), {
    data: g
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (S) => S.orderItems.find((m) => m.orderItemCode === e)
    }
  })), {
    data: b
  } = D(q({
    orderNo: o,
    queryOptions: {
      select: (S) => {
        var C;
        const [m] = ((C = S.orderItems.find((A) => A.orderItemCode === e)) == null ? void 0 : C.imageUrls) ?? [];
        return m || "";
      }
    }
  })), _ = (S) => {
    t.onCheckChange && t.onCheckChange(S);
  };
  return g ? r("div", {
    css: {
      display: "flex",
      flexDirection: "column",
      "@media not all and (min-width: 768px)": {
        paddingTop: "16px",
        paddingBottom: "16px"
      },
      "@media (min-width: 768px)": {
        padding: "16px 0 24px"
      }
    }
  }, r("div", {
    css: {
      margin: "0px",
      display: "flex",
      flex: "1 1 0%",
      alignItems: "flex-start"
    }
  }, r(et, {
    checked: t.checked,
    onChange: (S) => _(S.target.checked)
  }, r("img", {
    src: b,
    css: {
      marginLeft: "12px",
      marginRight: "16px",
      height: "56px",
      borderRadius: "12px",
      objectFit: "cover"
    }
  })), r("div", {
    css: {
      flex: "1 1 0%"
    }
  }, r(h, {
    css: [{
      color: Tr(s.bodyColor).toString(),
      fontSize: "16px",
      lineHeight: "22px",
      marginBottom: 2
    }, {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: "3"
    }]
  }, g == null ? void 0 : g.prodName), r(h, {
    css: {
      display: "flex",
      color: s.bodyColor_mist_font70,
      fontSize: "14px",
      lineHeight: "160%",
      marginBottom: 2,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, ((g == null ? void 0 : g.optionInfo) ?? []).length > 0 ? r(te, {
    flex: !0,
    css: [{
      alignItems: "center",
      flexWrap: "wrap"
    }]
  }, g == null ? void 0 : g.optionInfo.map((S, m) => r(x.Fragment, {
    key: `${m}_optionInfo`
  }, `${S.optionName}: ${S.optionValue}`, r(te, {
    css: [{
      marginLeft: "4px",
      marginRight: "4px",
      height: "12px",
      width: "1px",
      padding: "0px"
    }, {
      backgroundColor: s.bodyColor_mist_font10
    }]
  })))) : null, `${i(t.maxCount)} ${n("설명_개")}`), r("div", {
    css: {
      display: "flex"
    }
  }, r(te, {
    css: [{
      color: s.bodyColor,
      fontWeight: "bold",
      fontSize: 16
    }, {
      "@media not all and (min-width: 768px)": {
        lineHeight: "21px"
      },
      "@media (min-width: 768px)": {
        lineHeight: "19px"
      }
    }]
  }, w(g == null ? void 0 : g.itemPrice)), ((g == null ? void 0 : g.baseItemPrice) ?? 0) > ((g == null ? void 0 : g.itemPrice) ?? 0) ? r(te, {
    css: [{
      marginLeft: 4,
      color: s.bodyColorDisabled,
      fontSize: 14,
      textDecoration: "line-through"
    }, {
      "@media not all and (min-width: 768px)": {
        lineHeight: "21px"
      },
      "@media (min-width: 768px)": {
        lineHeight: "19px"
      }
    }]
  }, w((g == null ? void 0 : g.baseItemPrice) ?? 0)) : null))), t.checked ? r("div", {
    css: {
      margin: "16px 0 0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "12px",
      padding: "12px 16px 12px 12px"
    }
  }, r(ci, {
    value: t.itemCount ?? 0,
    onChange: t.onQuantityChange,
    maxValue: t.maxCount,
    minValue: 1
  }), r("div", {
    css: {
      marginTop: "8px",
      textAlign: "center",
      fontSize: "17px",
      fontWeight: "700"
    }
  }, w(xe(g == null ? void 0 : g.itemPrice).multiply(t.itemCount ?? 0)))) : null) : null;
}, Zr = ({
  section: e,
  ...t
}) => (me(), r("div", {
  css: {
    marginLeft: "24px",
    marginRight: "24px",
    "@media not all and (min-width: 768px)": {
      ":last-child": {
        marginBottom: "-16px"
      }
    },
    "@media (min-width: 768px)": {
      ":last-child": {
        marginBottom: "-24px"
      }
    }
  }
}, (e.orderSectionItems ?? []).map((o) => r(pi, {
  key: o.orderSectionItemCode,
  orderItemCode: o.orderItemCode,
  checked: typeof t.targetSectionInformation[e.orderSectionCode] < "u" && typeof t.targetSectionInformation[e.orderSectionCode][o.orderSectionItemCode] == "number",
  itemCount: typeof t.targetSectionInformation[e.orderSectionCode] < "u" ? t.targetSectionInformation[e.orderSectionCode][o.orderSectionItemCode] : void 0,
  maxCount: o.qty,
  onCheckChange: (n) => {
    t.setTargetSectionInformation((i) => {
      if (n)
        return {
          ...i,
          [e.orderSectionCode]: {
            ...i[e.orderSectionCode],
            [o.orderSectionItemCode]: o.qty
          }
        };
      const {
        [o.orderSectionItemCode]: s,
        ...c
      } = i[e.orderSectionCode];
      if (Object.keys(c).length === 0) {
        const {
          [e.orderSectionCode]: f,
          ...w
        } = i;
        return w;
      }
      return {
        ...i,
        [e.orderSectionCode]: c
      };
    });
  },
  onQuantityChange: (n) => {
    t.setTargetSectionInformation((i) => ({
      ...i,
      [e.orderSectionCode]: {
        ...i[e.orderSectionCode],
        [o.orderSectionItemCode]: n
      }
    }));
  }
}))));
function Qt() {
  return Qt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o) ({}).hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, Qt.apply(null, arguments);
}
const Yt = ({
  maxLength: e = 2e3,
  onChangeValue: t,
  placeholderColor: o,
  ...n
}) => {
  const i = x.useRef(null), [s, c] = x.useState(!1), [f, w] = x.useState(n.value), g = (S) => {
    if (S.innerText.length === 0) {
      S.focus();
      return;
    }
    const m = window.getSelection(), C = document.createRange();
    C.selectNodeContents(S), C.collapse(!1), m == null || m.removeAllRanges(), m == null || m.addRange(C);
  }, b = (S) => {
    S.currentTarget.innerText.length > e && (S.currentTarget.innerText = S.currentTarget.innerText.slice(0, e), g(S.currentTarget)), w(S.currentTarget.innerText);
  }, _ = (S) => {
    c(!1), t && t(S.currentTarget.innerText);
  };
  return x.useEffect(() => () => {
    t && t("");
  }, []), r("div", Qt({
    css: {
      position: "relative",
      minHeight: "96px",
      width: "100%",
      cursor: "text",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      color: "inherit"
    },
    onClick: () => {
      var S;
      return (S = i.current) == null ? void 0 : S.focus();
    }
  }, n), !s && ((f == null ? void 0 : f.length) ?? 0) === 0 ? r("div", {
    css: [{
      position: "absolute",
      left: "16px",
      top: "12px",
      userSelect: "none",
      fontSize: "15px",
      color: "inherit"
    }, {
      color: o
    }]
  }, n.placeholder) : null, r("div", {
    css: [{
      position: "absolute",
      bottom: "12px",
      right: "16px",
      userSelect: "none",
      fontSize: "16px",
      color: "inherit"
    }, {
      color: o
    }]
  }, `${(f == null ? void 0 : f.length) ?? 0}/${e}`), r("div", {
    css: {
      minHeight: "96px",
      padding: "12px 16px calc(12px + 30px)"
    },
    contentEditable: !0,
    suppressContentEditableWarning: !0,
    ref: i,
    onFocus: () => c(!0),
    onBlur: _,
    onInput: b
  }));
}, ui = () => {
  const e = tt("order_no"), t = tt("section_item_code"), {
    ct: o
  } = me(), {
    ct: n
  } = me(!0), {
    fonts: i,
    colors: s,
    buttons: c
  } = Le(), [f, w] = x.useState({}), [g, b] = x.useState(""), [_, S] = x.useState(""), [m, C] = x.useState({}), [A] = x.useState(() => window.LANG_CODE !== "KR" ? [{
    code: "CCB00",
    description: ""
  }] : [...Object.values(Z).filter((F) => F.group_code === "CCB00" && F.code !== "CCB00").sort((F, L) => {
    var O, J;
    if (typeof String.prototype.localeCompare == "function") {
      const oe = n(`설명_${(O = F.description) == null ? void 0 : O.replace(/ /g, "_")}`) ?? F.description, X = n(`설명_${(J = L.description) == null ? void 0 : J.replace(/ /g, "_")}`) ?? L.description;
      return oe.localeCompare(X);
    }
    return 0;
  }).sort(Dr), {
    code: "CCB00",
    description: ""
  }]), {
    data: ee
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (y) => y.currency
    }
  })), K = it(ee, ee === o("getCurrency")), {
    data: P
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (y) => y == null ? void 0 : y.orderSections.some((F) => F.orderSectionItems.some((L) => L.isCancelable))
    }
  })), {
    data: Y
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (y) => y == null ? void 0 : y.orderCode
    }
  })), {
    data: B
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (y) => y == null ? void 0 : y.wtime
    }
  })), {
    data: j
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (y) => y.orderSections.map((F) => ({
        ...F,
        orderSectionItems: F.orderSectionItems.filter((L) => L.isCancelable)
      })).filter((F) => F.orderSectionItems.length > 0)
    }
  })), {
    data: ie
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (y) => y.orderItems.reduce((F, L) => ({
        ...F,
        [L.orderItemCode]: L
      }), {})
    }
  })), {
    data: V
  } = D(Jr({
    // exchange 와 return 은 같은 쿼리를 사용한다.
    type: "cancel",
    queryOptions: {
      enabled: !0,
      select: (y) => Object.entries(y).map(([F, L]) => ({
        code: F,
        ...L
      }))
    }
  })), {
    data: T
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (y) => y.payments.some((F) => ["OPM01", "OPM03", "OPM04"].includes(F.methodCd))
    }
  })), {
    data: [M, $]
  } = D(ct({
    queryOptions: {
      select: (y) => y.cancelContent
    }
  })), {
    mutate: le
  } = nt({
    mutationKey: ["CancelRequestOrderSections"],
    mutationFn: (y) => We.patch(`/customer/v1/orders/${Y}/sections/cancel-request`, y),
    onError: (y) => {
      y instanceof Error && alert(y.message);
    },
    onSuccess: () => {
      window.location.replace(`/shop_mypage?m2=order&idx=${e}&order_no=${e}`);
    }
  }), H = (y) => {
    if (y.target.checked) {
      const F = (j ?? []).reduce((L, O) => ({
        ...L,
        [O.orderSectionCode]: O.orderSectionItems.reduce((J, oe) => ({
          ...J,
          [oe.orderSectionItemCode]: oe.qty
        }), {})
      }), {});
      return w(F);
    }
    return w({});
  }, N = () => {
    if (Object.keys(f).length === 0 || Object.values(f).some((y) => Object.values(y).some((F) => F <= 0))) {
      alert(o("설명_취소할상품을선택해주세요"));
      return;
    }
    if (g === "") {
      alert(o("설명_취소사유를선택해주세요"));
      return;
    }
    if (T && (m.bankName ?? "") === "") {
      alert(o("설명_대체환불수단은행명을입력해주세요"));
      return;
    }
    if (T && (m.bankAccount ?? "") === "") {
      alert(o("설명_대체환불수단계좌번호을입력해주세요"));
      return;
    }
    if (T && (m.accountHolderName ?? "") === "") {
      alert(o("설명_대체환불수단예금주를입력해주세요"));
      return;
    }
    if (confirm(o("설명_해당상품을취소하시겠습니까")))
      return le({
        cancelReason: g,
        cancelReasonDetail: _,
        alternativeRefundData: m,
        targetSectionInformation: Object.entries(f).map(([y, F]) => ({
          orderSectionCode: y,
          targetItemInformation: Object.entries(F).map(([L, O]) => ({
            orderSectionItemCode: L,
            qty: O
          }))
        }))
      });
  }, G = j == null ? void 0 : j.every((y) => y.orderSectionItems.every((F) => typeof f < "u" && typeof f[y.orderSectionCode] < "u" && typeof f[y.orderSectionCode][F.orderSectionItemCode] == "number" && f[y.orderSectionCode][F.orderSectionItemCode] === F.qty)), E = Object.keys(f).length === 0;
  if (x.useEffect(() => {
    typeof t == "string" && w((j ?? []).reduce((y, F) => {
      const L = F.orderSectionItems.reduce((O, J) => J.orderSectionItemCode === t ? {
        ...O,
        [J.orderSectionItemCode]: J.qty
      } : O, {});
      return Object.keys(L).length === 0 ? y : {
        ...y,
        [F.orderSectionCode]: L
      };
    }, {}));
  }, [t]), P === !1)
    throw new Error(o("설명_취소가능한상품이없습니다"));
  return r(x.Fragment, null, r("div", {
    css: {
      marginBottom: "16px",
      display: "flex",
      minHeight: "16px"
    }
  }, r("a", {
    css: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: "transparent"
      }
    },
    href: `/shop_mypage?m2=order&idx=${e}&order_no=${e}`
  }, r(Kt, {
    width: "24px",
    height: "24px",
    color: s.titleColor
  })), r(te, {
    inline: !0,
    css: [Ke({
      fontFamily: i.pretendard,
      fontSize: 18,
      fontWeight: 700,
      paddingLeft: 12
    })]
  }, o("타이틀_취소요청"))), (M == null ? void 0 : M.length) > 0 || ($ == null ? void 0 : $.length) > 0 ? r(ye, {
    title: o("타이틀_취소안내"),
    defaultStateOpen: !0,
    enableFold: !1
  }, r("div", {
    css: {
      marginBottom: "24px"
    },
    dangerouslySetInnerHTML: {
      __html: M
    }
  }), r("div", {
    css: {
      "--tw-text-opacity": "1",
      color: "rgb(255 0 0 / var(--tw-text-opacity))"
    },
    dangerouslySetInnerHTML: {
      __html: $
    }
  })) : null, r("div", {
    css: {
      display: "grid",
      gridTemplateColumns: "none",
      fontFamily: "Pretendard",
      "@media (min-width: 768px)": {
        gridAutoRows: "min-content",
        gridTemplateColumns: "1fr 380px",
        gap: "20px"
      }
    }
  }, r(Gt, {
    css: {
      paddingBottom: "24px",
      fontFamily: "Pretendard"
    }
  }, r("div", {
    css: {
      marginBottom: "16px",
      paddingTop: "24px",
      "@media not all and (min-width: 768px)": {
        marginLeft: "24px",
        marginRight: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      },
      "@media (min-width: 768px)": {
        marginLeft: "20px",
        marginRight: "20px"
      }
    }
  }, r("div", null, r(te, {
    inline: !0,
    css: [{
      fontFamily: i.pretendard
    }, {
      fontSize: "16px",
      fontWeight: "700",
      "@media not all and (min-width: 768px)": {
        fontSize: "13px"
      }
    }]
  }, `${o("타이틀_주문번호")} ${e}`)), r("div", null, r(te, {
    inline: !0,
    css: [{
      fontFamily: i.pretendard,
      color: s.bodyColor_mist_font70
    }, {
      fontSize: "14px",
      "@media not all and (min-width: 768px)": {
        fontSize: "13px"
      }
    }]
  }, Ge(new Date(B), "yyyy-MM-dd")))), r("div", {
    css: {
      marginLeft: "24px",
      marginRight: "24px",
      marginTop: "0px",
      marginBottom: "0px"
    }
  }, r(et, {
    checked: G || !E,
    onChange: H,
    icon: !G && !E ? "minus" : "check"
  }, r("span", {
    css: {
      marginLeft: "12px",
      fontSize: "15px"
    }
  }, o("타이틀_전체")))), j == null ? void 0 : j.map((y) => r(Zr, {
    key: y.orderSectionCode,
    section: y,
    targetSectionInformation: f,
    setTargetSectionInformation: w
  }))), r("div", {
    css: {
      fontFamily: i.pretendard
    }
  }, r(ye, {
    title: o("타이틀_취소사유"),
    defaultStateOpen: !0,
    enableFold: !1
  }, r(Ye, {
    css: [{
      color: s.bodyColor_mist_font70
    }, {
      height: "48px",
      width: "100%"
    }],
    svgHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="chevron-down"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
    value: g,
    onChange: (y) => b(y.target.value)
  }, r("option", {
    value: ""
  }, o("설명_취소사유선택")), V == null ? void 0 : V.map((y) => r("option", {
    key: y.code,
    value: y.title
  }, y.title))), r(Yt, {
    css: {
      marginTop: "8px"
    },
    value: _,
    onChangeValue: S,
    placeholder: `${o("설명_상세사유입력")} ${o("설명_선택")}`,
    placeholderColor: s.bodyColor_mist_font40
  })), r(ye, {
    title: o("타이틀_예상환불금액"),
    defaultStateOpen: !0,
    enableFold: !1
  }, r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, r(te, {
    inline: !0,
    css: [{
      fontFamily: i.pretendard
    }, {
      fontSize: "15px",
      fontWeight: "700"
    }]
  }, o("타이틀_예상환불금액")), r(te, {
    inline: !0,
    css: [{
      fontFamily: i.pretendard
    }, {
      fontSize: "17px",
      fontWeight: "700"
    }]
  }, K(j == null ? void 0 : j.reduce((y, F) => typeof f[F.orderSectionCode] > "u" ? y : xe(y).add(F.orderSectionItems.reduce((L, O) => {
    if (typeof f[F.orderSectionCode][O.orderSectionItemCode] > "u" || typeof ie > "u" || typeof ie[O.orderItemCode] > "u")
      return L;
    const {
      itemPrice: J
    } = ie[O.orderItemCode];
    return xe(L).add(xe(J).multiply(f[F.orderSectionCode][O.orderSectionItemCode] ?? 0));
  }, 0)), 0)))), r("div", {
    css: [{
      marginTop: "16px",
      fontSize: "13px"
    }, Ke`
                  .text-brand {
                    color: ${s.brandColor};
                  }
                `],
    dangerouslySetInnerHTML: {
      __html: o("설명_취소반품요청이후할인혜택귀책사유판매정책에따라")
    }
  })), r(ye, {
    title: r(x.Fragment, null, o("타이틀_대체환불수단"), T ? null : r("span", {
      css: {
        "--tw-text-opacity": "1",
        color: "rgb(113 118 128 / var(--tw-text-opacity))"
      }
    }, o("설명_선택"))),
    defaultStateOpen: !0,
    enableFold: !1
  }, r(Ye, {
    css: [{
      color: s.bodyColor_mist_font70
    }, {
      height: "48px",
      width: "100%"
    }],
    svgHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="chevron-down"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
    value: m == null ? void 0 : m.bankCode,
    onChange: (y) => {
      var F;
      C({
        ...m,
        bankCode: y.target.value,
        bankName: ((F = A.find((L) => L.code === y.target.value)) == null ? void 0 : F.description) ?? y.target.value
      });
    }
  }, r("option", {
    value: ""
  }, o("설명_은행명")), A.map((y) => r("option", {
    key: y.code,
    value: y.code
  }, y.description || o("설명_직접입력")))), (m == null ? void 0 : m.bankCode) === "CCB00" ? r("input", {
    css: {
      marginTop: "8px",
      height: "48px",
      width: "100%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_은행명"),
    value: m == null ? void 0 : m.bankName,
    onChange: (y) => {
      C({
        ...m,
        bankName: y.target.value.trim(),
        // 임의로 직접 입력한 경우에 밸리데이션을 위해 미리 정의되지 않은 코드를 넣어준다
        bankCode: "CCB00"
      });
    }
  }) : null, r("input", {
    css: {
      marginTop: "8px",
      minHeight: "48px",
      width: "100%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      backgroundColor: "transparent",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_계좌번호"),
    value: m == null ? void 0 : m.bankAccount,
    onChange: (y) => {
      C({
        ...m,
        bankAccount: y.target.value.replace(/\D/g, "")
      });
    }
  }), r("input", {
    css: {
      marginTop: "8px",
      minHeight: "48px",
      width: "100%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      backgroundColor: "transparent",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_예금주"),
    value: m == null ? void 0 : m.accountHolderName,
    onChange: (y) => {
      C({
        ...m,
        accountHolderName: y.target.value
      });
    }
  })), r("div", {
    css: {
      paddingLeft: "24px",
      paddingRight: "24px"
    }
  }, r(se, {
    css: [c.primary, {
      minHeight: "48px",
      width: "100%",
      fontFamily: "Pretendard",
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "25.6px",
      "@media not all and (min-width: 768px)": {
        display: "none"
      }
    }],
    onClick: N
  }, o("버튼_취소요청"))))), r("div", {
    css: [{
      zIndex: "10",
      borderTopWidth: "1px",
      padding: "12px 24px 16px 24px",
      "@media not all and (min-width: 768px)": {
        position: "fixed",
        bottom: "0px",
        left: "0px",
        right: "0px"
      },
      "@media (min-width: 768px)": {
        display: "none"
      }
    }, {
      backgroundColor: s.backgroundColor_hue_10
    }]
  }, r(se, {
    css: [c.primary, {
      minHeight: "48px",
      width: "100%",
      fontFamily: "Pretendard",
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "25.6px"
    }],
    onClick: N
  }, o("버튼_취소요청"))));
}, fi = x.forwardRef(({
  value: e,
  margin: t = 8,
  ...o
}, n) => {
  const [i, s] = x.useState(!1);
  ut("body_color");
  const c = mo(), [f, w] = x.useState(null), g = x.useDeferredValue(Math.floor(((f == null ? void 0 : f.bottom) ?? -1e4) + t)), b = x.useDeferredValue(Math.floor((f == null ? void 0 : f.left) ?? -1e4)), _ = x.useDeferredValue(Math.floor((f == null ? void 0 : f.width) ?? 0)), S = x.useRef(null), m = x.useRef(new IntersectionObserver((B) => {
  })), C = () => {
    S.current && w(S.current.getBoundingClientRect());
  };
  x.useImperativeHandle(n, () => ({
    opened: () => i,
    open: () => s(!0),
    close: () => s(!1)
  }), [i]), x.useEffect(() => {
    C();
  }, []), x.useEffect(() => {
    const B = m.current;
    return S.current && (B == null || B.observe(S.current)), () => {
      B == null || B.disconnect();
    };
  }, []), x.useEffect(() => (window.addEventListener("resize", C), () => {
    window.removeEventListener("resize", C);
  }), []), x.useEffect(() => (window.addEventListener("scroll", C), () => {
    window.removeEventListener("scroll", C);
  }), []), x.useEffect(() => {
    const B = setInterval(() => {
      C();
    }, 16.666666666666668);
    return () => clearInterval(B);
  }, []);
  const A = {
    position: "fixed",
    inset: `${g}px auto auto ${b}px`,
    width: `${_}px`,
    display: "block",
    maxHeight: "360px",
    border: "none",
    boxShadow: "0px 0px 1px 0px rgba(75, 81, 91, 0.20), 0px 0px 0px 1px rgba(75, 81, 91, 0.03), 0px 10px 14px 0px rgba(75, 81, 91, 0.06), 0px 14px 32px 0px rgba(75, 81, 91, 0.12)",
    overflow: "auto",
    padding: "8px",
    borderRadius: "8px"
  }, ee = x.Children.toArray(o.children).filter((B) => !!(x.isValidElement(B) && "data-dropdown-value" in B.props)), K = ee.find((B) => {
    if (x.isValidElement(B) && "data-dropdown-value" in B.props)
      return B.props["data-dropdown-value"] === e;
  }) ?? ee[0];
  return r(x.Fragment, null, r("div", {
    "data-dropdown-root": !0,
    css: Ke({
      appearance: "none",
      cursor: "pointer",
      background: "none",
      border: "1px solid #DBDEE3",
      borderRadius: "8px",
      padding: "0",
      fontFamily: c,
      backgroundPosition: "right 8px center",
      backgroundSize: "18px",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url('data:image/svg+xml;utf8,${i ? '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"></path></svg>' : '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"></path></svg>'}')`,
      ">*": {
        width: "100%"
      }
    }),
    ref: S,
    onClick: () => s(!0)
  }, K), r(Pr, {
    isOpen: i,
    style: {
      overlay: {
        backgroundColor: "transparent"
      },
      content: A
    },
    onRequestClose: () => s(!1)
  }, o.children));
}), gi = () => {
  var d, U, l, p;
  const e = tt("order_no"), t = tt("section_item_code");
  pt();
  const {
    ct: o
  } = me(), {
    ct: n
  } = me(!0), {
    fonts: i,
    colors: s,
    buttons: c
  } = Le(), f = x.useRef(null), w = x.useRef(null), [g, b] = x.useState({}), [_, S] = x.useState(""), [m, C] = x.useState(!1), [A, ee] = x.useState(""), [K, P] = x.useState("RRT01"), [Y, B] = x.useState("RPT04"), [j, ie] = x.useState(null), [V, T] = x.useState({}), [M, $] = x.useState({
    case: "designateTypeOrderDelivery"
  }), [le] = x.useState(() => window.LANG_CODE !== "KR" ? [{
    code: "CCB00",
    description: ""
  }] : [...Object.values(Z).filter((u) => u.group_code === "CCB00" && u.code !== "CCB00").sort((u, v) => {
    var k, z;
    if (typeof String.prototype.localeCompare == "function") {
      const Q = n(`설명_${(k = u.description) == null ? void 0 : k.replace(/ /g, "_")}`) ?? u.description, re = n(`설명_${(z = v.description) == null ? void 0 : z.replace(/ /g, "_")}`) ?? v.description;
      return Q.localeCompare(re);
    }
    return 0;
  }).sort(Dr), {
    code: "CCB00",
    description: ""
  }]), {
    data: H
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a.currency
    }
  })), N = it(H, H === o("getCurrency")), {
    data: G
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a == null ? void 0 : a.orderSections.filter((u) => typeof t > "u" ? !0 : u.orderSectionItems.some((v) => v.orderSectionItemCode === t)).some((u) => u.orderSectionItems.some((v) => v.isReturnable))
    }
  })), {
    data: E
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a == null ? void 0 : a.orderCode
    }
  })), {
    data: y
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a == null ? void 0 : a.wtime
    }
  }));
  D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a == null ? void 0 : a.orderItems.map((u) => u.shippingPlaceCode)
    }
  }));
  const {
    data: F
  } = D(ct({
    queryOptions: {
      select: (a) => a.exchangeRefundContent
    }
  })), {
    data: L
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a.orderItems
    }
  })), {
    data: O
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a.orderItems.reduce((u, v) => ({
        ...u,
        [v.orderItemCode]: v
      }), {})
    }
  })), {
    data: J
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a.orderSections.find((u) => u.orderSectionItems.some((v) => v.orderSectionItemCode === t))
    }
  })), {
    data: oe
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a.orderSections.map((u) => ({
        ...u,
        orderSectionItems: u.orderSectionItems.filter((v) => v.isReturnable)
      })).filter((u) => u.orderSectionItems.length > 0)
    }
  })), {
    data: X
  } = D(Jr({
    // exchange 와 return 은 같은 쿼리를 사용한다.
    type: "return",
    queryOptions: {
      enabled: !0,
      select: (a) => Object.entries(a).map(([u, v]) => ({
        code: u,
        ...v
      }))
    }
  })), {
    data: de
  } = D(Bo()), {
    data: ve
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a == null ? void 0 : a.orderDeliverys.map((u) => ({
        ...u,
        id: Xe(u)
      }))
    }
  })), {
    data: pe
  } = D(Er({
    productCodes: (L == null ? void 0 : L.map((a) => a.prodCode)) ?? []
  })), be = (pe == null ? void 0 : pe.returnAddress) ?? (pe == null ? void 0 : pe.companyAddress), Re = (pe == null ? void 0 : pe.directNumber) ?? ((d = pe == null ? void 0 : pe.companyContact) == null ? void 0 : d.call_num), {
    data: Oe
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a.orderSections.some((u) => [
        Z.ODT02.code,
        // 택배
        Z.ODT05.code,
        // 직접배송
        Z.ODT06.code,
        // 퀵
        Z.ODT08.code
        // 편의점
      ].includes(u.deliveryTypeCd))
    }
  })), {
    data: _e
  } = D(qr({
    countryShippingCode: (U = (ve ?? [])[0]) == null ? void 0 : U.country,
    queryOptions: {
      enabled: Oe && (ve ?? []).length > 0,
      select: (a) => a === "KR"
    }
  })), {
    data: Te
  } = D(q({
    orderNo: e,
    queryOptions: {
      select: (a) => a.payments.some((u) => ["OPM01", "OPM03", "OPM04"].includes(u.methodCd))
    }
  })), {
    mutate: Me
  } = nt({
    mutationKey: ["ReturnRequestOrderSections"],
    mutationFn: (a) => We.patch(`/customer/v1/orders/${E}/sections/return-request`, a),
    onError: (a) => {
      a instanceof Error && alert(a.message);
    },
    onSuccess: () => {
      window.location.replace(`/shop_mypage?m2=order&idx=${e}&order_no=${e}`);
    }
  });
  x.useEffect(() => {
    _e === !1 && (P("RRT02"), $({
      case: "directTypeDirect",
      retrieveMemo: ""
    }));
  }, [_e]);
  const He = (a) => {
    if (a.target.checked) {
      const u = (oe ?? []).reduce((v, k) => ({
        ...v,
        [k.orderSectionCode]: k.orderSectionItems.reduce((z, Q) => ({
          ...z,
          [Q.orderSectionItemCode]: Q.qty
        }), {})
      }), {});
      return b(u);
    }
    return b({});
  }, Fe = async () => {
    if (Object.keys(g).length === 0 || Object.values(g).some((a) => Object.values(a).some((u) => u <= 0))) {
      alert(o("설명_반품할상품을선택해주세요"));
      return;
    }
    if (_ === "") {
      alert(o(m ? "설명_교환사유를선택해주세요" : "설명_반품사유를선택해주세요"));
      return;
    }
    switch (M == null ? void 0 : M.case) {
      case "designateTypeOrderDelivery": {
        if (j === null) {
          alert(o("알림_수거지를선택해주세요"));
          return;
        }
        break;
      }
      case "designateTypeInput": {
        if (Object.values(yo(M, ["receiverCall", "receiverName", "addr1", "addr2", "zipcode"])).some((a) => !a)) {
          alert(o("설명_상품수거지정보를모두입력해주세요"));
          return;
        }
        break;
      }
      case "directTypeParcel": {
        if ((M == null ? void 0 : M.parcelCompanyIdx) === 0) {
          alert(o("설명_택배사를선택해주세요"));
          return;
        }
        if ((M == null ? void 0 : M.invoiceNo) === "") {
          alert(o("설명_송장번호를입력해주세요"));
          return;
        }
        break;
      }
    }
    if (Te && (V.bankName ?? "") === "") {
      alert(o("설명_대체환불수단은행명을입력해주세요"));
      return;
    }
    if (Te && (V.bankAccount ?? "") === "") {
      alert(o("설명_대체환불수단계좌번호을입력해주세요"));
      return;
    }
    if (Te && (V.accountHolderName ?? "") === "") {
      alert(o("설명_대체환불수단예금주를입력해주세요"));
      return;
    }
    if (confirm(o(m ? "설명_해당상품을교환하시겠습니까" : "설명_해당상품을반품하시겠습니까")))
      return Me({
        isExchange: m ? "Y" : "N",
        returnReason: _,
        returnReasonDetail: A,
        alternativeRefundData: V,
        retrieveTypeCode: K,
        retrievePayTypeCode: Y,
        retrieveData: M,
        targetSectionInformation: Object.entries(g).map(([a, u]) => ({
          orderSectionCode: a,
          targetItemInformation: Object.entries(u).map(([v, k]) => ({
            orderSectionItemCode: v,
            qty: k
          }))
        }))
      });
  }, De = oe == null ? void 0 : oe.every((a) => a.orderSectionItems.every((u) => typeof g < "u" && typeof g[a.orderSectionCode] < "u" && typeof g[a.orderSectionCode][u.orderSectionItemCode] == "number" && g[a.orderSectionCode][u.orderSectionItemCode] === u.qty)), je = Object.keys(g).length === 0;
  if (x.useEffect(() => {
    const [a] = ve ?? [];
    j === null && (ie((a == null ? void 0 : a.id) ?? ""), $((u) => u.case === "designateTypeOrderDelivery" ? {
      ...u,
      orderDeliveryCode: (a == null ? void 0 : a.orderDeliveryCode) ?? void 0
    } : u));
  }, [ve]), x.useEffect(() => {
    typeof t == "string" && b((oe ?? []).reduce((a, u) => {
      const v = u.orderSectionItems.reduce((k, z) => z.orderSectionItemCode === t ? {
        ...k,
        [z.orderSectionItemCode]: z.qty
      } : k, {});
      return Object.keys(v).length === 0 ? a : {
        ...a,
        [u.orderSectionCode]: v
      };
    }, {}));
  }, [t]), G === !1)
    throw new Error(((l = J == null ? void 0 : J.orderSectionReturn) == null ? void 0 : l.isExchange) === "Y" ? o("설명_교환가능한상품이없습니다") : o("설명_반품가능한상품이없습니다"));
  return r(x.Fragment, null, r("div", {
    css: {
      marginBottom: "16px",
      display: "flex",
      minHeight: "16px"
    }
  }, r("a", {
    css: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: "transparent"
      }
    },
    href: `/shop_mypage?m2=order&idx=${e}&order_no=${e}`
  }, r(Kt, {
    width: "24px",
    height: "24px"
  })), r(te, {
    inline: !0,
    css: [Ke({
      fontFamily: i.pretendard,
      fontSize: 18,
      fontWeight: 700,
      paddingLeft: 12
    })]
  }, o("타이틀_반품교환요청"))), (F == null ? void 0 : F.pc.length) > 0 ? r(ye, {
    title: o("타이틀_교환환불안내"),
    defaultStateOpen: !0,
    enableFold: !1
  }, r("div", {
    css: {
      "@media not all and (min-width: 768px)": {
        display: "none"
      }
    },
    dangerouslySetInnerHTML: {
      __html: F.pc
    }
  }), r("div", {
    css: {
      "@media (min-width: 768px)": {
        display: "none"
      }
    },
    dangerouslySetInnerHTML: {
      __html: F.mobile
    }
  })) : null, r("div", {
    css: {
      display: "grid",
      gridTemplateColumns: "none",
      fontFamily: "Pretendard",
      "@media (min-width: 768px)": {
        gridAutoRows: "min-content",
        gridTemplateColumns: "1fr 380px",
        gap: "20px"
      }
    }
  }, r(Gt, {
    css: {
      paddingBottom: "24px",
      fontFamily: "Pretendard"
    }
  }, r("div", {
    css: {
      marginBottom: "16px",
      paddingTop: "24px",
      "@media not all and (min-width: 768px)": {
        marginLeft: "24px",
        marginRight: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      },
      "@media (min-width: 768px)": {
        marginLeft: "20px",
        marginRight: "20px"
      }
    }
  }, r("div", null, r(te, {
    inline: !0,
    css: [{
      fontFamily: i.pretendard
    }, {
      fontSize: "16px",
      fontWeight: "700",
      "@media not all and (min-width: 768px)": {
        fontSize: "13px"
      }
    }]
  }, `${o("타이틀_주문번호")} ${e}`)), r("div", null, r(te, {
    inline: !0,
    css: [{
      fontFamily: i.pretendard,
      color: s.bodyColor_mist_font70
    }, {
      fontSize: "14px",
      "@media not all and (min-width: 768px)": {
        fontSize: "13px"
      }
    }]
  }, Ge(new Date(y), "yyyy-MM-dd")))), r("div", {
    css: {
      marginTop: "8px",
      marginBottom: "8px",
      display: "flex",
      borderRadius: "8px",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(248 249 251 / var(--tw-bg-opacity))",
      padding: "4px",
      "@media not all and (min-width: 768px)": {
        marginLeft: "24px",
        marginRight: "24px"
      },
      "@media (min-width: 768px)": {
        marginLeft: "20px",
        marginRight: "20px"
      }
    }
  }, r("button", {
    onClick: () => C(!1),
    css: [{
      minHeight: "44px",
      flex: "1 1 0%",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600"
    }, {
      backgroundColor: m ? "transparent" : s.backgroundColor_hue_10
    }, {
      boxShadow: m ? "none" : "0px 0px 2px 0px rgba(75, 81, 91, 0.20), 0px 2px 10px 0px rgba(75, 81, 91, 0.10)"
    }, {
      color: m ? s.bodyColor_mist_font70 : s.bodyColor
    }]
  }, o("버튼_반품")), r("button", {
    onClick: () => C(!0),
    css: [{
      minHeight: "44px",
      flex: "1 1 0%",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600"
    }, {
      backgroundColor: m ? s.backgroundColor_hue_10 : "transparent"
    }, {
      boxShadow: m ? "0px 0px 2px 0px rgba(75, 81, 91, 0.20), 0px 2px 10px 0px rgba(75, 81, 91, 0.10)" : "none"
    }, {
      color: m ? s.bodyColor : s.bodyColor_mist_font70
    }]
  }, o("버튼_교환"))), r("div", {
    css: {
      marginLeft: "24px",
      marginRight: "24px",
      marginTop: "24px"
    }
  }, r(et, {
    checked: De || !je,
    onChange: He,
    icon: !De && !je ? "minus" : "check"
  }, r("span", {
    css: {
      marginLeft: "12px",
      fontSize: "15px"
    }
  }, o("타이틀_전체")))), oe == null ? void 0 : oe.map((a) => r(Zr, {
    key: a.orderSectionCode,
    section: a,
    targetSectionInformation: g,
    setTargetSectionInformation: b
  }))), r("div", {
    css: {
      fontFamily: "Pretendard"
    }
  }, r(ye, {
    title: o(m ? "타이틀_교환사유" : "타이틀_반품사유"),
    defaultStateOpen: !0,
    enableFold: !1
  }, r(Ye, {
    css: {
      height: "48px",
      width: "100%"
    },
    svgHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="chevron-down"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
    value: _,
    onChange: (a) => S(a.target.value)
  }, r("option", {
    value: ""
  }, o(m ? "설명_교환사유선택" : "설명_반품사유선택")), X == null ? void 0 : X.map((a) => r("option", {
    key: a.code,
    value: a.title
  }, a.title))), r(Yt, {
    css: {
      marginTop: "8px"
    },
    value: A,
    onChangeValue: ee,
    placeholder: `${o("설명_상세사유입력")} ${o("설명_선택")}`,
    placeholderColor: s.bodyColor_mist_font40
  })), Oe ? r(ye, {
    title: o(m ? "타이틀_교환방법" : "타이틀_반품방법"),
    defaultStateOpen: !0,
    enableFold: !1
  }, r("div", {
    css: {
      display: "flex",
      borderRadius: "8px",
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(248 249 251 / var(--tw-bg-opacity))",
      padding: "4px"
    }
  }, r("button", {
    onClick: () => {
      P("RRT01"), B("RPT04"), ie((a) => a === "" ? ($({
        case: "designateTypeInput",
        receiverName: "",
        receiverCall: "",
        zipcode: "",
        addr1: "",
        addr2: ""
      }), a) : ($({
        case: "designateTypeOrderDelivery",
        orderDeliveryCode: (ve ?? []).find((u) => u.id === a).orderDeliveryCode
      }), a));
    },
    disabled: _e === !1,
    css: [{
      minHeight: "36px",
      flex: "1 1 0%",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600"
    }, {
      backgroundColor: K === "RRT01" ? s.backgroundColor_hue_10 : "transparent"
    }, {
      boxShadow: K === "RRT01" ? "0px 0px 2px 0px rgba(75, 81, 91, 0.20), 0px 2px 10px 0px rgba(75, 81, 91, 0.10)" : "none"
    }, {
      color: K === "RRT01" ? s.bodyColor : s.bodyColor_mist_font70
    }]
  }, o("버튼_쇼핑몰지정택배")), r("button", {
    onClick: () => {
      P("RRT02"), B("RPT02"), $({
        case: "directTypeParcel",
        parcelCompanyIdx: 0,
        invoiceNo: ""
      });
    },
    disabled: _e === !1,
    css: [{
      minHeight: "36px",
      flex: "1 1 0%",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600"
    }, {
      backgroundColor: K === "RRT02" ? s.backgroundColor_hue_10 : "transparent"
    }, {
      boxShadow: K === "RRT02" ? "0px 0px 2px 0px rgba(75, 81, 91, 0.20), 0px 2px 10px 0px rgba(75, 81, 91, 0.10)" : "none"
    }, {
      color: K === "RRT02" ? s.bodyColor : s.bodyColor_mist_font70
    }]
  }, o("버튼_직접발송"))), K === "RRT01" ? r(x.Fragment, null, r("div", {
    css: [{
      fontFamily: i.pretendard
    }, {
      margin: "24px 0 8px",
      fontSize: "15px",
      fontWeight: "700"
    }]
  }, o("타이틀_수거지정보")), r(fi, {
    ref: f,
    value: j ?? ""
  }, r("button", {
    key: Xe({
      id: ""
    }),
    "data-dropdown-value": "",
    onClick: () => {
      var a;
      ie(""), (a = f.current) == null || a.close(), $({
        case: "designateTypeInput",
        receiverName: "",
        receiverCall: "",
        zipcode: "",
        addr1: "",
        addr2: ""
      });
    },
    css: [{
      display: "block",
      minHeight: "44px",
      width: "100%",
      appearance: "none",
      backgroundColor: "transparent",
      paddingLeft: "16px",
      paddingRight: "16px",
      textAlign: "left",
      fontFamily: "Pretendard"
    }, Ke({
      ".ReactModalPortal &": {
        padding: "16px"
      }
    })]
  }, o("설명_직접입력")), (p = ve ?? []) == null ? void 0 : p.map((a) => r("button", {
    key: a.id,
    "data-dropdown-value": a.id,
    onClick: () => {
      var u;
      ie(a.id), (u = f.current) == null || u.close(), $({
        case: "designateTypeOrderDelivery",
        orderDeliveryCode: a.orderDeliveryCode ?? void 0
      });
    },
    css: [{
      display: "block",
      width: "100%",
      appearance: "none",
      borderRadius: "8px",
      backgroundColor: "transparent",
      padding: "16px",
      textAlign: "justify",
      fontFamily: "Pretendard"
    }, a.id === j ? Ke({
      ".ReactModalPortal &": {
        backgroundColor: "#F8F9FB"
      }
    }) : null]
  }, r("div", {
    css: {
      display: "flex",
      alignItems: "center",
      fontSize: "15px"
    }
  }, a.receiverName, r(te, {
    css: [{
      marginLeft: "4px",
      marginRight: "4px",
      height: "12px",
      width: "1px",
      padding: "0px"
    }, {
      backgroundColor: s.bodyColor_mist_font10
    }]
  }), a.receiverCall), r(Hr, {
    address: a
  })))), j === "" && (M == null ? void 0 : M.case) === "designateTypeInput" ? r(x.Fragment, null, r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      gap: "8px"
    }
  }, r("input", {
    css: {
      display: "block",
      height: "48px",
      minWidth: "0px",
      flex: "1 1 0%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_보내는사람"),
    value: (M == null ? void 0 : M.receiverName) ?? "",
    onChange: (a) => $((u) => (u == null ? void 0 : u.case) !== "designateTypeInput" ? u : {
      ...u,
      receiverName: a.target.value
    })
  }), r("input", {
    css: {
      display: "block",
      height: "48px",
      minWidth: "0px",
      flex: "1 1 0%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_연락처"),
    value: M.receiverCall ?? "",
    onChange: (a) => $((u) => (u == null ? void 0 : u.case) !== "designateTypeInput" ? u : {
      ...u,
      receiverCall: a.target.value
    })
  })), r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      gap: "8px"
    }
  }, r("input", {
    css: {
      display: "block",
      height: "48px",
      minWidth: "0px",
      flex: "1 1 0%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_우편번호"),
    value: M.zipcode,
    onClick: () => {
      var a;
      return (a = w.current) == null ? void 0 : a.openModal();
    },
    readOnly: !0
  }), r("button", {
    css: {
      display: "block",
      height: "48px",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      backgroundColor: "transparent",
      paddingLeft: "12px",
      paddingRight: "12px",
      fontSize: "15px"
    },
    onClick: () => {
      var a;
      return (a = w.current) == null ? void 0 : a.openModal();
    }
  }, o("버튼_주소찾기")), r(Vr, {
    ref: w,
    hideShowButton: !0,
    onChange: (a) => {
      $((u) => (u == null ? void 0 : u.case) !== "designateTypeInput" ? u : {
        ...u,
        addr1: a.addr1,
        zipcode: a.zipcode
      });
    }
  })), r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      gap: "8px"
    }
  }, r("input", {
    css: {
      display: "block",
      height: "48px",
      minWidth: "0px",
      flex: "1 1 0%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_주소"),
    value: M.addr1,
    onClick: () => {
      var a;
      return (a = w.current) == null ? void 0 : a.openModal();
    },
    readOnly: !0
  })), r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      gap: "8px"
    }
  }, r("input", {
    css: {
      display: "block",
      height: "48px",
      minWidth: "0px",
      flex: "1 1 0%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_상세주소"),
    value: M.addr2,
    onChange: (a) => $((u) => (u == null ? void 0 : u.case) !== "designateTypeInput" ? u : {
      ...u,
      addr2: a.target.value
    })
  }))) : null, r("div", {
    css: [{
      fontFamily: i.pretendard
    }, {
      margin: "24px 0 8px",
      fontSize: "15px",
      fontWeight: "700"
    }]
  }, o("타이틀_도착지정보")), r("div", {
    css: {
      fontSize: "15px"
    }
  }, be == null ? void 0 : be.filter(([, a]) => a).map(([, a]) => a).join(" ")), !!Re && r("div", {
    css: {
      fontSize: "15px"
    }
  }, Re)) : r(x.Fragment, null, r("div", {
    css: {
      marginTop: "16px",
      minHeight: "48px"
    }
  }, r(Ye, {
    css: {
      height: "48px",
      width: "100%"
    },
    svgHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="chevron-down"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
    value: M == null ? void 0 : M.case,
    disabled: _e === !1,
    onChange: (a) => {
      a.target.value === "directTypeParcel" ? (B("RPT02"), P("RRT02"), $({
        case: "directTypeParcel",
        parcelCompanyIdx: 0,
        invoiceNo: ""
      })) : (B("RPT04"), P("RRT03"), $({
        case: a.target.value,
        retrieveMemo: ""
      }));
    }
  }, r("option", {
    value: "directTypeParcel"
  }, o("설명_택배발송")), r("option", {
    value: "directTypeQuick"
  }, o("타이틀_퀵서비스")), r("option", {
    value: "directTypeDirect"
  }, o("설명_직접전달")))), (M == null ? void 0 : M.case) === "directTypeParcel" ? r(x.Fragment, null, r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      gap: "8px"
    }
  }, r(Ye, {
    css: {
      height: "48px",
      flex: "1 1 0%"
    },
    svgHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="chevron-down"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
    value: Y,
    onChange: (a) => {
      B(a.target.value);
    }
  }, r("option", {
    value: "RPT02"
  }, o("설명_선불")), r("option", {
    value: "RPT03"
  }, o("버튼_착불")))), r("div", {
    css: {
      marginTop: "8px",
      display: "flex",
      gap: "8px"
    }
  }, r(Ye, {
    css: {
      height: "48px",
      flex: "1 1 0%"
    },
    svgHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="chevron-down"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
    value: M.parcelCompanyIdx,
    onChange: (a) => {
      $({
        ...M,
        parcelCompanyIdx: parseInt(a.target.value)
      });
    }
  }, r("option", {
    value: ""
  }, o("설명_택배사")), (de ?? []).map((a) => r("option", {
    key: a.code,
    value: a.idx
  }, window.LANG_CODE === "KR" ? a.name : a.code))), r("input", {
    css: {
      display: "block",
      height: "48px",
      minWidth: "0px",
      flex: "1 1 0%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_송장번호"),
    value: M.invoiceNo,
    onChange: (a) => {
      $({
        ...M,
        invoiceNo: a.target.value
      });
    }
  }))) : null, (M == null ? void 0 : M.case) === "directTypeQuick" || (M == null ? void 0 : M.case) === "directTypeDirect" ? r(Yt, {
    css: {
      marginTop: "8px",
      display: "flex",
      gap: "8px"
    },
    value: M.retrieveMemo,
    onChangeValue: (a) => $((u) => ({
      ...u,
      retrieveMemo: a
    })),
    placeholder: `${o("설명_상세사유입력")} ${o("설명_선택")}`,
    placeholderColor: s.bodyColor_mist_font40
  }) : null, r("div", {
    css: [{
      fontFamily: i.pretendard
    }, {
      margin: "24px 0 8px",
      fontSize: "15px",
      fontWeight: "700"
    }]
  }, o("타이틀_도착지정보")), r("div", {
    css: {
      fontSize: "15px"
    }
  }, be == null ? void 0 : be.filter(([, a]) => a).map(([, a]) => a).join(" ")), !!Re && r("div", {
    css: {
      fontSize: "15px"
    }
  }, Re))) : null, m ? null : r(ye, {
    title: o("타이틀_예상환불금액"),
    defaultStateOpen: !0,
    enableFold: !1
  }, r("div", {
    css: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, r(te, {
    inline: !0,
    css: [{
      fontFamily: i.pretendard
    }, {
      fontSize: "15px",
      fontWeight: "700"
    }]
  }, o("타이틀_예상환불금액")), r(te, {
    inline: !0,
    css: [{
      fontFamily: i.pretendard
    }, {
      fontSize: "17px",
      fontWeight: "700"
    }]
  }, N(oe == null ? void 0 : oe.reduce((a, u) => typeof g[u.orderSectionCode] > "u" ? a : xe(a).add(u.orderSectionItems.reduce((v, k) => {
    if (typeof g[u.orderSectionCode][k.orderSectionItemCode] > "u" || typeof O > "u" || typeof O[k.orderItemCode] > "u")
      return v;
    const {
      itemPrice: z
    } = O[k.orderItemCode];
    return xe(v).add(xe(z).multiply(g[u.orderSectionCode][k.orderSectionItemCode] ?? 0));
  }, 0)), 0)))), r("div", {
    css: [{
      marginTop: "16px",
      fontSize: "13px"
    }, Ke`
                    .text-brand {
                      color: ${s.brandColor};
                    }
                  `],
    dangerouslySetInnerHTML: {
      __html: o("설명_취소반품요청이후할인혜택귀책사유판매정책에따라")
    }
  })), r(ye, {
    title: r(x.Fragment, null, o("타이틀_대체환불수단"), Te ? null : r("span", {
      css: {
        "--tw-text-opacity": "1",
        color: "rgb(113 118 128 / var(--tw-text-opacity))"
      }
    }, o("설명_선택"))),
    defaultStateOpen: !0,
    enableFold: !1
  }, r(Ye, {
    css: {
      height: "48px",
      width: "100%"
    },
    svgHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="chevron-down"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
    value: V == null ? void 0 : V.bankCode,
    onChange: (a) => {
      var u;
      T({
        ...V,
        bankCode: a.target.value,
        bankName: ((u = le.find((v) => v.code === a.target.value)) == null ? void 0 : u.description) ?? a.target.value
      });
    }
  }, r("option", {
    value: ""
  }, o("설명_은행명")), le.map((a) => r("option", {
    key: a.code,
    value: a.code
  }, a.description || o("설명_직접입력")))), (V == null ? void 0 : V.bankCode) === "CCB00" ? r("input", {
    css: {
      marginTop: "8px",
      height: "48px",
      width: "100%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_은행명"),
    value: V == null ? void 0 : V.bankName,
    onChange: (a) => {
      T({
        ...V,
        bankName: a.target.value.trim(),
        // 임의로 직접 입력한 경우에 밸리데이션을 위해 미리 정의되지 않은 코드를 넣어준다
        bankCode: "CCB00"
      });
    }
  }) : null, r("input", {
    css: {
      marginTop: "8px",
      height: "48px",
      width: "100%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_계좌번호"),
    value: V == null ? void 0 : V.bankAccount,
    onChange: (a) => {
      T({
        ...V,
        bankAccount: a.target.value.replace(/\D/g, "")
      });
    }
  }), r("input", {
    css: {
      marginTop: "8px",
      height: "48px",
      width: "100%",
      appearance: "none",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      "--tw-border-opacity": "1",
      borderColor: "rgb(219 222 227 / var(--tw-border-opacity))",
      padding: "12px 16px",
      fontSize: "15px"
    },
    placeholder: o("설명_예금주"),
    value: V == null ? void 0 : V.accountHolderName,
    onChange: (a) => {
      T({
        ...V,
        accountHolderName: a.target.value
      });
    }
  })), r("div", {
    css: {
      paddingLeft: "24px",
      paddingRight: "24px"
    }
  }, r(se, {
    css: [c.primary, {
      minHeight: "48px",
      width: "100%",
      fontFamily: "Pretendard",
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "25.6px",
      "@media not all and (min-width: 768px)": {
        display: "none"
      }
    }],
    onClick: Fe
  }, o(m ? "타이틀_교환요청" : "버튼_반품요청"))))), r("div", {
    css: [{
      zIndex: "10",
      borderTopWidth: "1px",
      padding: "12px 24px 16px 24px",
      "@media not all and (min-width: 768px)": {
        position: "fixed",
        bottom: "0px",
        left: "0px",
        right: "0px"
      },
      "@media (min-width: 768px)": {
        display: "none"
      }
    }, {
      backgroundColor: s.backgroundColor_hue_10
    }]
  }, r(se, {
    css: [c.primary, {
      minHeight: "48px",
      width: "100%",
      fontFamily: "Pretendard",
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "25.6px"
    }],
    onClick: Fe
  }, o(m ? "타이틀_교환요청" : "버튼_반품요청"))));
}, xi = x.createContext("detail"), hi = ({
  children: e
}) => {
  const t = pt(), [o] = x.useState(() => {
    const i = new URLSearchParams(window.location.search);
    switch (!0) {
      case i.has("cancel_idx"):
        return "cancel";
      case i.has("return_idx"):
        return "return";
      default:
        return t.setDefaultOptions({
          queries: {
            staleTime: 500,
            refetchOnWindowFocus: !0,
            suspense: !0,
            useErrorBoundary: !0,
            keepPreviousData: !0
          }
        }), "detail";
    }
  }), n = x.Children.toArray(e).find((i) => x.isValidElement(i) && i.props["data-name"] === o);
  return r(xi.Provider, {
    value: o
  }, n);
};
function mi() {
  const e = new bo({
    defaultOptions: {
      queries: {
        staleTime: 500,
        refetchOnWindowFocus: !1,
        suspense: !0,
        useErrorBoundary: !0,
        keepPreviousData: !0
      }
    }
  });
  return r(x.StrictMode, null, r(Co, null, r(vo, {
    client: e
  }, r(wo, null, r(he.Suspense, {
    fallback: r("div", null, "Loading...")
  }, r(hi, null, r(di, {
    "data-name": "detail"
  }), r(ui, {
    "data-name": "cancel"
  }), r(gi, {
    "data-name": "return"
  }))), r(So, {
    initialIsOpen: !1
  })))));
}
const yi = (e) => e !== null;
[document.getElementById("@im/fo-shop-my-page")].filter(yi).forEach((e) => {
  _o.createRoot(e).render(mi());
});
