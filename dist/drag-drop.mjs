function ee(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var te = T;
function T(e) {
  let r = !1, t;
  return e ? (t = ne(e), r = !0) : t = q(), t.timeout = re(r, t), t;
}
T.sequence = function(r, ...t) {
  const n = T(), o = [];
  function* s(u) {
    for (const c of u)
      yield c;
  }
  const a = s(r);
  function i(u, ...c) {
    if (u.done) {
      n.done(o);
      return;
    }
    u.value(...c).then((l) => {
      o.push(l), i(a.next(), ...c, l);
    });
  }
  return i(a.next(), ...t), n;
};
T.all = function(r, ...t) {
  const n = T(), o = [], s = r.map((a, i) => typeof a == "function" ? a(...t).then((u) => o[i] = u) : a.then((u) => o[i] = u));
  return Promise.all(s).then(() => n.done(o)), n;
};
function q() {
  let e, r;
  const t = new Promise((n, o) => {
    e = n, r = o;
  });
  return {
    promise: t,
    done: e,
    cancel: r,
    onComplete: P(t)
  };
}
function ne(e) {
  let r = e.map((n) => q()), t = r.map((n) => n.promise);
  return r.promises = t, r.onComplete = P(Promise.all(t)), r;
}
function P(e) {
  return function(t) {
    e.then((n) => t(n));
  };
}
function re(e, r) {
  let t;
  return e ? t = Promise.all(r.promises) : t = r.promise, function(n, o) {
    let s, a = new Promise((i, u) => {
      s = setTimeout(() => {
        i(o), Promise.resolve(t);
      }, n);
    });
    return t.then(() => clearTimeout(s)), r.onComplete = P(Promise.race([t, a])), r;
  };
}
const Y = /* @__PURE__ */ ee(te);
function j(e) {
  return e == null || e.nodeType ? "simple" : e instanceof Array ? "array" : typeof e == "object" ? "object" : "simple";
}
function oe(e, r) {
  return r instanceof Array ? !isNaN(e) : !1;
}
function N(e, r, t, n, o, ...s) {
  let [a, i] = n;
  Object.keys(e).forEach((c) => {
    let l = j(e[c]), d = e[c], p = j(r) === "array", h = !isNaN(c), f = Symbol("ignore___");
    if (l !== "simple" && i) {
      if (d = i({ value: d, key: c, breadcrumbs: `${o}/${c}`, IGNORE: f }, ...s), d === f)
        return;
      l = j(d);
    }
    if (l === "simple") {
      if (!a) {
        r[c] = d;
        return;
      }
      let y = a({ value: d, key: c, breadcrumbs: `${o}/${c}`, IGNORE: f }, ...s);
      if (y === f)
        return;
      oe(c, r) ? r.push(y) : r[c] = y;
    }
    if (l === "object") {
      const y = {};
      p && h ? r.push(y) : r[c] = y, t.push(M(d, y, t, n, `${o}/${c}`, s));
    }
    if (l === "array") {
      const y = [];
      p && h ? r.push(y) : r[c] = y, t.push(M(d, y, t, n, `${o}/${c}`, s));
    }
  });
}
function* M(e, r, t, n, o, s) {
  yield N(e, r, t, n, o, ...s);
}
function F({ data: e, keyCallback: r, objectCallback: t }, ...n) {
  let o = j(e), s, a = [], i = "root", u = [r, t];
  switch (o) {
    case "array":
      s = [], N(e, s, a, u, i, ...n);
      break;
    case "object":
      s = {}, N(e, s, a, u, i, ...n);
      break;
    case "simple":
      return e;
  }
  for (const c of a)
    c.next();
  return s;
}
function se(e, r) {
  return function(n, o) {
    const { convert: s, isDTO: a, isDTM: i, walk: u } = e();
    let c, l;
    a(o) ? (c = o.export(), l = o.copy()) : i(o) ? (c = u({ data: o }), l = u({ data: o })) : ([l, , c] = s.from("std").toFlat(e, o), console.warn('A non "dt-object" data segment was inserted. Autoconverted to "dt-object".'));
    const d = new RegExp("^root/");
    c.forEach((p) => {
      p[0] === p[2] && (p[0] = n, p[2] = n), p[2] = p[2].replace(d, `${n}/`), p[3].forEach((h, f) => p[3][f] = h.replace(d, `${n}/`));
    }), r.insert([l, , c]);
  };
}
function ae(e, r) {
  return (t) => r.export(t);
}
function ie(e, r) {
  return function(n = "root") {
    const o = r.getCopy(n), { walk: s } = e();
    return o ? s({ data: o }) : null;
  };
}
function ce(e, r, t) {
  return function() {
    let o = [], s = {};
    const { convert: a, draft: i, INIT_DATA_TYPES: u, main: { load: c } } = e(), l = {
      set: i.set(o, s),
      connect: i.connect(s),
      save: i.save(s),
      push: i.push(s)
      // Selection: Adds a new value to selection row if data is an array structure;
    }, [d, ...p] = arguments, { as: h } = d({ ...t, ...l }, ...p) || {}, f = o.length === 0 ? r.export() : o, y = h ? u.includes(h) : !1;
    let g;
    return h === "dt-object" ? c(f) : h && !y ? (console.error(`Model '${h}' is unknown data-model.`), null) : (h ? g = a.to(h, e, f) : g = c(f), r.resetScan(), g);
  };
}
function ue(e, r, t) {
  return function() {
    const { main: { load: o }, draft: s } = e(), [a, ...i] = arguments;
    let u = [], c = {};
    const l = {
      set: s.set(u, c),
      connect: s.connect(c),
      save: s.save(c),
      push: s.push(c)
      // Selection: Adds a new value to selection row if data is an array structure;
    };
    return a({ ...t, ...l }, ...i), r.resetScan(), u.length === 0 ? this : o(u);
  };
}
function le(e) {
  return (r, t) => e.setupFilter(r, t);
}
function fe(e, r, t) {
  return function(o, s) {
    const a = t("root"), { main: { load: i }, INIT_DATA_TYPES: u } = e(), c = [...u, "dt-object"];
    let l = !1, d = "";
    if (s && (s.as || (l = !0, d = 'Options should be an object and property "as" is required'), !l && !c.includes(s.as) && (l = !0, d = `Invalid option "as" value: ${s.as}.`), l))
      throw new Error(d);
    return o.map((p) => {
      let h = r.export(p);
      return h.length === 0 ? a[1].hasOwnProperty(p) ? a[1][p] : null : h;
    }).map((p) => p == null ? null : p instanceof Array ? i(p).model(() => s) : p);
  };
}
function C(e, r) {
  const { flatData: t } = e(), [n, o] = t(e, r), s = {
    // I/O Operations
    insertSegment: se(e, n),
    export: ae(e, n),
    copy: ie(e, n),
    model: ce(e, n, o),
    query: ue(e, n, o),
    setupFilter: le(n),
    listSegments: () => Object.keys(n.getIndexes()).reduce((u, c) => (c.includes("/") || u.push(c), u), []),
    index: a
  };
  function a(i) {
    if (i == null)
      return null;
    let u = n.getLine(i);
    if (u) {
      let [c, l, d, p] = u, h;
      return l instanceof Array ? h = [...l] : h = { ...l }, [c, h, d, [...p]];
    } else
      return null;
  }
  return s.extractList = fe(e, n, a), s;
}
function de(e, r, t) {
  return function(o) {
    const [s, , a] = o, i = a[0][0], [u, c, l] = e, d = t();
    u[i] = s, a.forEach((p) => {
      const [, , h] = p;
      c[h] = p, l.push(p), d.forEach((f) => r(f, p));
    });
  };
}
function pe(e) {
  return function(t) {
    const [, n, o] = e;
    if (t && !n[t])
      return [];
    if (!t) {
      const a = [];
      return o.forEach((i) => {
        const [u, c, l, d] = i, p = c instanceof Array ? [...c] : { ...c };
        a.push([u, p, l, [...d]]);
      }), a;
    }
    const s = [];
    return o.forEach((a) => {
      const [i, u, c, l] = a, d = new RegExp(`^${t}/`);
      if (c === t || c.match(d)) {
        let p = i === c ? "root" : i, h = u instanceof Array ? [...u] : { ...u }, f = c.includes("/") ? c.replace(d, "root/") : "root", y = l.map((g) => g.replace(d, "root/"));
        s.push([p, h, f, y]);
      }
    }), s;
  };
}
function he(e, r, t, n) {
  return function(s, a) {
    const i = n(), [, , u] = e;
    if (i.includes(s))
      return console.error(`Filter name "${s}" is already defined`), this;
    r[s] = a, u.forEach((c) => t(s, c));
  };
}
function ye(e) {
  return function(t) {
    const n = e.getIndexes(), o = n[t], s = [];
    return o ? (s.push(o), U(n, s, o[3]), e.setupScanList(s), this) : (e.setupScanList([]), this);
  };
}
function U(e, r, t) {
  t.forEach((n) => {
    const o = e[n];
    o && (r.push(o), U(e, r, o[3]));
  });
}
function ge(e) {
  return function(t) {
    const n = e.getFilters()[t];
    return n && e.setupScanList(n), this;
  };
}
function me(e) {
  return function(t) {
    const n = [];
    return e.getScanList().forEach((o) => {
      o[0] === t && n.push(o);
    }), e.setupScanList(n), this;
  };
}
function Se(e) {
  return function(t) {
    const n = [], o = t instanceof Array ? t : [t];
    return e.getScanList().forEach((s) => {
      const a = s[0];
      o.forEach((i) => {
        a.includes(i) && n.push(s);
      });
    }), e.setupScanList(n), this;
  };
}
function ve(e) {
  return function(t) {
    e.getScanList().forEach((n) => {
      const [o, s, a, i] = n, u = s instanceof Array, c = () => "$__NEXT__LOOK_", l = () => "$__FINISH__WITH__THE__LOOKING_";
      let d = !1;
      const p = i.map((f) => {
        let y = f.replace(`${a}/`, "");
        return [o, y];
      });
      if (u)
        s.length === 0 ? h([]) : s.every((f, y) => {
          if (d)
            return !1;
          const g = t({ value: f, key: y, name: o, flatData: s, breadcrumbs: a, links: p, next: c, finish: l });
          return g === l() && (d = !0), ![l(), c()].includes(g);
        });
      else {
        const f = Object.entries(s);
        f.length === 0 ? h({}) : f.every(([y, g]) => {
          if (d)
            return !1;
          const v = t({ value: g, key: y, name: o, flatData: s, breadcrumbs: a, links: p, next: c, finish: l });
          return v === l() && (d = !0), ![l(), c()].includes(v);
        });
      }
      function h(f) {
        t({ value: null, key: null, name: o, flatData: f, breadcrumbs: a, links: p, empty: !0, next: c, finish: l });
      }
      e.resetScan();
    });
  };
}
function Ee(e) {
  return function(t) {
    const n = [];
    return e.getScanList().every((o) => o[2] === t ? (n.push(o), !1) : !0), e.setupScanList(n), this;
  };
}
function be({ flatData: e }) {
  return e instanceof Array;
}
function De({ name: e, flatData: r }) {
  return r instanceof Array ? !1 : !isNaN(e);
}
function $e({ flatData: e }) {
  return !(e instanceof Array);
}
function Le({ name: e, breadcrumbs: r }) {
  return e === r;
}
function xe(e, r) {
  const [t, n, o] = r, s = [t, n, o], a = {}, i = { list: be, listObject: De, object: $e, root: Le };
  let u = o;
  const c = () => Object.keys(i), l = (f, y) => {
    if (i[f]) {
      const [g, v, m, b] = y;
      if (a[f] || (a[f] = []), i[f]({ name: g, flatData: v, breadcrumbs: m, edges: b })) {
        const $ = n[m];
        a[f].push($);
      }
    }
  };
  c().forEach((f) => o.forEach((y) => l(f, y)));
  const p = {
    insert: de(s, l, c),
    export: pe(s),
    getCopy: (f) => t[f] ? t[f] : null,
    getIndexes: () => n,
    getLine: (f) => n[f] ? n[f] : null,
    getFilters: () => a,
    getScanList: () => u,
    setupScanList: (f) => u = f,
    setupFilter: he(s, i, l, c),
    resetScan: () => {
      u = o;
    }
    // Reset the scanList to use all flatData;
  }, h = {
    // Query and Model functions will add methods related to new structure: set, connect, save, push;
    from: ye(p),
    use: ge(p),
    get: Ee(p),
    find: me(p),
    like: Se(p),
    look: ve(p)
    // Scan: Executes on each object property in the selection list;
  };
  return [p, h];
}
function we(e, r) {
  const t = r instanceof Array ? [] : {}, { walk: n } = e(), o = [
    //  Store record line positions:
    //    0      1        2          3    
    // [ name, data , breadcrumbs, edges ] 
    ["root", t, "root", []]
  ], s = { root: o[0] }, a = 1, i = 3;
  function u({ value: d, key: p, breadcrumbs: h }) {
    const f = d instanceof Array, y = f ? [] : {}, g = p, v = new RegExp(`/${p}$`), m = h.replace(v, ""), b = [g, y, h, []];
    return s[m][i].push(h), o.push(b), s[h] = o.at(-1), d;
  }
  function c({ value: d, key: p, breadcrumbs: h }) {
    const f = new RegExp(`/${p}$`), y = h.replace(f, "");
    return s[y][a][p] = d, d;
  }
  return [{ root: n({
    data: r,
    keyCallback: c,
    objectCallback: u
  }) }, s, o];
}
function Ae(e) {
  let r = {};
  return e.reverse().forEach(([n, o, s, a]) => {
    const i = o instanceof Array ? [...o] : { ...o };
    r[s] = i, a.forEach((u) => {
      if (r[u]) {
        const c = u.replace(`${s}/`, "");
        r[s][c] = r[u];
      }
    });
  }), r.root;
}
const X = { toFlat: we, toType: Ae };
function Te(e, r) {
  const t = Object.entries(r), { walk: n } = e(), o = {}, s = [], a = {}, i = {};
  function u(h) {
    a[h] || (a[h] = "object");
    const f = h.split("/");
    f.length != 1 && (f.pop(), f.length != 1 && u(f.join("/")));
  }
  function c(h, f) {
    Object.keys(f).forEach((g) => {
      isNaN(g) || (a[h] = "array");
    });
  }
  return t.forEach(([h, f]) => {
    h.startsWith("root") || (h = `root/${h}`), u(h), c(h, f), i[h] = f;
  }), Object.entries(a).forEach(([h, f]) => {
    if (i[h] === "object")
      return;
    if (i[h]) {
      const g = i[h] instanceof Array;
      if (f === "array" && !g) {
        const v = Object.values(i[h]);
        i[h] = v;
      }
      return;
    }
    const y = f === "object" ? {} : [];
    i[h] = y;
  }), Object.entries(i).sort().forEach(([h, f]) => {
    const y = h.split("/").pop(), g = h.replace(`/${y}`, ""), v = f instanceof Array ? [...f] : { ...f }, m = [y, v, h, []];
    o[h] = m, s.push(m), h !== "root" && g && o[g] && o[g][3].push(h);
  }), [n({ data: r }), o, s];
}
function je(e) {
  const r = {};
  return e.forEach((t) => {
    const [, n, o] = t;
    if (Object.keys(n).length === 0)
      return;
    const a = o.replace("root/", ""), i = n instanceof Array ? [...n] : { ...n };
    r[a] = i;
  }), r;
}
const R = { toFlat: Te, toType: je };
function _e(e, r) {
  const { walk: t } = e(), n = {}, o = { root: [] }, s = [];
  function a(d) {
    let p, h, f;
    if (d == "root")
      return p = "root", h = "root", f = null, [p, h, f];
    const y = d.split("/");
    return y.length === 2 && (p = "root", h = "root", f = y.pop()), y.length > 2 && (f = y.pop(), p = y.pop(), y.length === 0 ? h = `root/${p}` : h = `${y.join("/")}/${p}`), [p, h, f];
  }
  function i(d) {
    if (d === "root")
      return;
    const p = d.split("/");
    p.pop();
    const h = p.join("/");
    o[h] || (o[h] = []), h.includes("/") && i(h);
  }
  r.forEach((d) => {
    const [p, h] = d, f = p === "root" ? "root" : `root/${p}`;
    o[f] ? o[f].push(h) : o[f] = [h], i(f);
  });
  let u = Object.entries(o).sort();
  const c = { root: "object" };
  return u.forEach(([d, p]) => {
    if (d === "root")
      return;
    const h = d.split("/"), f = h.pop(), y = h.join("/");
    c[y] !== "array" && !isNaN(f) && (c[y] = "array"), p.length === 0 && (c[d] = "object");
  }), u = Object.entries(o).sort(), u.forEach(([d, p]) => {
    const [h, f, y] = a(d), g = p.length === 0, v = p.length === 1;
    let m, b;
    if (g) {
      if (n[`${f}/${y}`])
        return;
      if (y == null) {
        b = c.root === "object" ? {} : [], m = ["root", b, "root", []], n.root = m, s.push(m);
        return;
      }
      b = c[`${f}/${y}`] === "object" ? {} : [], m = [y, b, `${f}/${y}`, []], n[`${f}/${y}`] = m, s.push(m);
      return;
    }
    if (!v) {
      m = [y, p, `${f}/${y}`, []], n[`${f}/${y}`] = m, s.push(m);
      return;
    }
    if (n[`${f}`])
      n[f][1][y] = p[0];
    else {
      const $ = {};
      $[y] = p[0], m = [h, $, f, []], n[f] = m, s.push(m);
    }
  }), s.reverse(), s.forEach((d) => {
    const [p, h, f] = d, y = f.replace(`/${p}`, ""), g = n[y];
    y !== f && g && g[3].push(f);
  }), s.reverse(), [t({ data: r }), n, s];
}
function ke(e) {
  let r = [];
  return e.forEach((t) => {
    const [n, o, s] = t, a = o instanceof Array;
    let i = "";
    if (n !== "root" && (i = s.replace("root/", "")), a) {
      i.length == 0 ? o.forEach((c, l) => r.push(["root", c])) : o.forEach((c) => r.push([i, c]));
      return;
    }
    Object.entries(o).forEach(([c, l]) => {
      i.length == 0 ? r.push([c, l]) : r.push([`${i}/${c}`, l]);
    });
  }), r;
}
const L = { toFlat: _e, toType: ke }, Fe = (e) => (r, t) => {
  switch (e) {
    case "std":
    case "standard":
      return X.toFlat(r, t);
    case "tuple":
    case "tuples":
      return L.toFlat(r, t);
    case "breadcrumb":
    case "breadcrumbs":
      const n = Object.entries(t);
      return L.toFlat(r, n);
    case "file":
    case "files":
      const o = t.map((s) => {
        let a = s.split("/");
        a.length === 1 && (a = ["root"].concat(a));
        const i = a.pop();
        return [a.join("/"), i];
      });
      return L.toFlat(r, o);
    case "midFlat":
      return R.toFlat(r, t);
  }
  return [["object", 0], {}];
};
function Ce(e) {
  return { toFlat: Fe(e) };
}
function Oe(e, r, t) {
  const n = {}, { walk: o } = r(), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  let i, u = 0;
  switch (e) {
    case "flat":
    case "dt-model":
      return o({ data: t });
    case "std":
    case "standard":
      return X.toType(t);
    case "midflat":
    case "midFlat":
      return R.toType(t);
    case "tuple":
    case "tuples":
      return L.toType(t);
    case "files":
      return i = L.toType(t), i.map(([l, d]) => typeof d == "function" ? `${l}/function:${d.name}` : d != null && d.nodeType ? `${l}/HtmlElement:${d.tagName ? d.tagName.toLowerCase() : "notSpecified"}` : l === "root" ? d : `${l}/${d}`);
    case "breadcrumb":
    case "breadcrumbs":
      let c;
      return i = L.toType(t), i.forEach(([l, d]) => s.has(l) ? a.add(l) : s.add(l)), i.forEach(([l, d]) => {
        if (a.has(l)) {
          c !== l && (c = l, u = 0);
          let p = l === "root" ? u : `${l}/${u}`;
          n[p] = d, u++;
        } else
          n[l] = d;
      }), n;
  }
}
const x = { from: Ce, to: Oe };
function Ne(e) {
  return function(t, n) {
    const o = e[t] ? e[t][1] : !1;
    return o ? o instanceof Array ? typeof value == "object" ? this : (o.push(n), this) : this : this;
  };
}
function Pe(e, r) {
  return function(n, o) {
    const s = o instanceof Array, a = [];
    return a.push(n), s ? a.push([...o]) : a.push({ ...o }), a.push(n), a.push([]), e.push(a), r[n] = a, this;
  };
}
function Me(e) {
  return function(t) {
    t.forEach((n) => {
      let o = n.split("/");
      const s = o.pop(), a = o.pop(), i = e[a];
      if (!e[s])
        return this;
      if (!i)
        return this;
      if (i[1][s])
        return this;
      let c = `${i[2]}/${s}`;
      return W(e, s, c), i[3].includes(c) ? this : (i[3].push(c), this);
    });
  };
}
function W(e, r, t) {
  const n = e[r], o = n[2];
  n[2] = t, e[o] = n, n[3].forEach((s, a) => {
    const i = new RegExp(`^${o}/`), u = s.replace(i, `${t}/`);
    W(e[s], s, u);
  });
}
function Ze(e) {
  return function(t, n, o) {
    const s = e[t] ? e[t][1] : !1;
    return s ? s[n] ? this : (s[n] = o, this) : this;
  };
}
const Ie = {
  push: Ne,
  set: Pe,
  connect: Me,
  save: Ze
}, w = [
  "std",
  "standard",
  "tuple",
  "tuples",
  "breadcrumb",
  "breadcrumbs",
  "file",
  "files",
  "midFlat",
  "midflat",
  "flat",
  "dt-model"
], D = {
  dependencies() {
    return {
      walk: F,
      flatData: xe,
      flatObject: C,
      convert: x,
      INIT_DATA_TYPES: w,
      main: { load: D.load },
      isDTO: (e) => typeof e.insertSegment == "function",
      isDTM: (e) => !(!(e instanceof Array) || !(e[0] instanceof Array) || e[0].length !== 4 || e[0][0] !== "root"),
      draft: Ie
    };
  },
  init(e, r = {}) {
    let t = { model: "std" }, { model: n } = Object.assign({}, t, r), o = D.dependencies;
    if (!w.includes(n))
      return console.error(`Can't understand your data-model: ${n}. Please, find what is possible on https://github.com/PeterNaydenov/dt-toolbox`), null;
    const s = ["flat", "dt-model"].includes(n) ? D.load(e) : x.from(n).toFlat(o, e);
    return C(o, s);
  },
  load(e) {
    const r = {};
    e.forEach((n) => {
      const [, , o] = n;
      r[o] = n;
    });
    const t = F({ data: e });
    return C(D.dependencies, [t, r, e]);
  },
  flating(e, r = {}) {
    let t = { model: "std" }, { model: n } = Object.assign({}, t, r);
    if (!w.includes(n))
      return null;
    let [, , o] = x.from("std").toFlat(D.dependencies, e);
    return o;
  },
  converting(e, r = {}) {
    let t = { model: "std", as: "std" }, { model: n, as: o } = Object.assign({}, t, r);
    if (!w.includes(n) || !w.includes(o))
      return null;
    let [, , s] = x.from("std").toFlat(D.dependencies, e);
    return x.to(o, D.dependencies, s);
  },
  getWalk: () => F
}, { init: qe, load: Ye, flating: Ue, converting: Xe, getWalk: Re } = D, A = {
  init: qe,
  load: Ye,
  flat: Ue,
  convert: Xe,
  getWalk: Re
};
function B(e) {
  const r = {};
  e.look(({
    name: t,
    flatData: n,
    breadcrumbs: o,
    links: s,
    next: a
  }) => {
    if (e.set(t, n), t === "root")
      return a();
    if (t === o && e.connect([`root/${t}`]), s.forEach(([i, u]) => r[u] = [i, u]), r[t]) {
      const [i, u] = r[t];
      e.connect([`${i}/${u}`]);
    }
    return a();
  });
}
function _(e) {
  const r = {};
  e.look(({
    name: t,
    flatData: n,
    links: o,
    next: s
  }) => {
    if (o.forEach(([a, i]) => {
      a !== "root" && (r[i] = [a, i]);
    }), e.set(t, n), r[t]) {
      const [a, i] = r[t];
      e.connect([`${a}/${i}`]);
    }
    return s();
  });
}
function K(e, r) {
  const t = r.export("root")[0][1], n = [];
  let o = null;
  e.use("root").look(({ flatData: s, breadcrumbs: a, next: i }) => a === "root" ? (o = s, i()) : (n.push(a), i())), o instanceof Array ? e.set("root", []) : e.set("root", {}), n.forEach((s) => {
    let a = !1;
    const i = {};
    r.query((u) => {
      u.from(s).look(({ name: c, flatData: l, breadcrumbs: d, links: p, next: h }) => {
        if (a = !0, e.set(c, l), i.hasOwnProperty(d)) {
          const [f, y] = i[d];
          e.connect([`${f}/${y}`]);
        }
        return p.forEach(([f, y]) => i[`${d}/${y}`] = [f, y]), h();
      });
    }), !a && t.hasOwnProperty(s) && (a = !0, e.save("root", s, o[s])), a || e.from(s).look(({ name: u, flatData: c, breadcrumbs: l, links: d, next: p }) => {
      if (e.set(u, c), i.hasOwnProperty(l)) {
        const [h, f] = i[l];
        e.connect([`${h}/${f}`]);
      }
      return d.forEach(([h, f]) => i[`${l}/${f}`] = [h, f]), p();
    });
  }), Object.entries(o).forEach(([s, a]) => {
    const i = {};
    let u = !1;
    r.query((c) => {
      c.from(s).look(({ name: l, flatData: d, breadcrumbs: p, links: h, next: f }) => {
        if (u = !0, e.set(l, d), i.hasOwnProperty(p)) {
          const [y, g] = i[p];
          e.connect([`${y}/${g}`]);
        }
        return h.forEach(([y, g]) => i[`${p}/${g}`] = [y, g]), f();
      });
    }), !u && t.hasOwnProperty(s) && (u = !0, e.save("root", s, t[s])), u || e.save("root", s, a);
  });
}
function We() {
  return function(e, r) {
    let t = {}, n = {}, o = {};
    return e.forEach((s) => {
      const [a, i, u, c, l] = s, d = r[c], p = `${a}/${i}`;
      t[p] = d || null, n[p] = u, Be(l) && (o[p] = [], o[p][0] = l[0], o[p][1] = l[1]);
    }), { transitions: t, nextState: n, chainActions: o };
  };
}
function Be(e) {
  return !(e instanceof Array) || e.length != 2 ? !1 : (e.forEach((r) => {
    if (r !== !1 || typeof r != "string")
      return !1;
  }), !0);
}
function Ke(e) {
  return function(t) {
    const { dtbox: n, query: o } = e.dependencies;
    let s = "javascriptObject";
    return t.export && (s = "dt-object"), t instanceof Array && t[0][0] === t[0][2] && t.every((a) => a.length === 4) && (s = "dt-model"), s === "javascriptObject" && t instanceof Array ? (console.error("State update failed. Reason: Received an array. Expectation: Object where top-level property name is the name of the data segment."), e.stateData) : (["javascriptObject"].includes(s) && (t = n.init(t).export()), ["javascriptObject", "dt-model"].includes(s) && (t = n.load(t)), ["javascriptObject", "dt-model", "dt-object"].includes(s) && (t = t.query(o.splitSegments)), e.stateData.query(o.updateState, t));
  };
}
function He(e) {
  return function(r, t, n) {
    const { askForPromise: o } = e.dependencies, s = o(), a = `${e.state}/${t}`, i = e.callback;
    e.lock = !0, e._transit(s, a, n), s.onComplete(
      (u) => {
        let c = e._getChain(a), l = u.response;
        if (u.success) {
          if (e.state = e.nextState[a], u.stateData != null && (e.stateData = e._updateStateData(u.stateData)), i.positive.forEach((d) => d(e.state, l)), i.transition.forEach((d) => d(e.state, l)), c && c[0]) {
            e._updateStep(r, c[0], l);
            return;
          }
        } else if (i.negative.forEach((d) => d(e.state, l)), i.transition.forEach((d) => d(e.state, l)), c && c[1]) {
          e._updateStep(r, c[1], l);
          return;
        }
        r.done(l);
      }
    ), s.promise.catch(() => console.log(`Failed in step ${a}`));
  };
}
function Ge(e) {
  return function(r) {
    Object.entries(r).forEach(([t, n]) => {
      n == null && console.log(`Warning: Transition for ${t} is not defined`);
    });
  };
}
function ze(e) {
  return function() {
    const [r, t, ...n] = arguments, { state: o, stateData: s, dependencies: a } = e, i = e.transitions[t], u = e.api.extractList;
    typeof i == "function" ? i({ task: r, state: o, extractList: u, dependencies: a }, ...n) : r.done({ success: !1 });
  };
}
function Ve(e) {
  return function(t) {
    const n = e.chainActions;
    return n[t] ? n[t] : !1;
  };
}
function Je(e) {
  return function() {
    if (e.cache.length !== 0) {
      const { updateTask: r, action: t, dt: n } = e.cache[0];
      e.cache = e.cache.reduce((o, s, a) => (a != 0 && o.push(s), o), []), e._updateStep(r, t, n), r.onComplete((o) => e._onUpdateTask(o));
    }
  };
}
function Qe(e) {
  return function(t) {
    const n = e.callback, o = e.dependencies.askForPromise(n.update);
    n.update.forEach((s, a) => {
      s(e.state, t), o[a].done();
    }), o.onComplete((s) => {
      e.lock = !1, e._triggerCacheUpdate();
    });
  };
}
function et(e) {
  return function(t) {
    e.dependencies = { ...e.dependencies, ...t };
  };
}
function tt(e) {
  return function() {
    return e.dependencies;
  };
}
function nt(e) {
  return function(r, t) {
    const n = e.callback;
    n[r] && n[r].push(t);
  };
}
function rt(e) {
  return function(r) {
    e.callback[r] && (e.callback[r] = []);
  };
}
function ot(e) {
  return function({ state: r, stateData: t }) {
    const { dtbox: n, query: o } = e.dependencies;
    if (r && (e.state = r, t)) {
      const s = n.load(t).query(o.splitSegments);
      e.stateData = e.stateData.query(o.updateState, s);
    }
  };
}
function st(e) {
  return function() {
    const { query: t } = e.dependencies;
    return {
      state: e.state,
      stateData: e.stateData.query(t.joinSegments).export()
    };
  };
}
function at(e) {
  return function(t, n) {
    const { askForPromise: o } = e.dependencies, s = o();
    return e.lock ? (e.cache.push({ updateTask: s, action: t, dt: n }), s.promise) : (e._updateStep(s, t, n), s.onComplete((a) => e._onUpdateTask(a)), s.promise);
  };
}
function it(e) {
  return function() {
    const { dtbox: r } = e.dependencies;
    e.state = e.initialState, e.stateData = r.load(e.initialStateData.export());
  };
}
function ct(e) {
  return function() {
    e.cache.forEach(({ updateTask: t, action: n, dt: o }) => t.cancel(`Action '${n}' was ignored`)), e.cache = [];
  };
}
function ut(e) {
  return function() {
    return e.state;
  };
}
function lt(e) {
  return function(t, n = !1) {
    const o = e.dependencies.query;
    return arguments.length == 0 ? e.stateData.query(o.joinSegments).model(() => ({ as: "std" })) : n ? e.stateData.extractList(t, n) : e.stateData.extractList(t, e.stateDataFormat);
  };
}
const O = {
  // *** "Private" methods
  _setTransitions: We,
  _updateStateData: Ke,
  _updateStep: He,
  _warn: Ge,
  _transit: ze,
  _getChain: Ve,
  _triggerCacheUpdate: Je,
  _onUpdateTask: Qe,
  setDependencies: et,
  getDependencies: tt,
  on: nt,
  off: rt,
  importState: ot,
  exportState: st,
  update: at,
  reset: it,
  ignoreCachedUpdates: ct,
  getState: ut,
  extractList: lt
  // Return a stateData values
}, Z = "N/A", H = A.getWalk();
function G({ init: e, behavior: r, stateData: t = {}, debug: n, stateDataFormat: o = { as: "std" } }, s = {}) {
  const a = this, i = {};
  a.state = e || Z, a.initialState = e || Z, a.stateDataFormat = o, a.lock = !1, a.cache = [], a.dependencies = {
    walk: H,
    dtbox: A,
    askForPromise: Y,
    query: { splitSegments: _, joinSegments: B, updateState: K }
  }, a.callback = {
    update: [],
    transition: [],
    positive: [],
    negative: []
  };
  for (let d in O)
    d.startsWith("_") ? a[d] = O[d](a) : i[d] = O[d](a);
  a.api = i, a.stateData = A.init(t).query(_), a.initialStateData = A.init(t).query(_);
  const { transitions: u, nextState: c, chainActions: l } = a._setTransitions(r, s);
  return n && (a._warn(u), global.debugFSM = a), a.transitions = u, a.nextState = c, a.chainActions = l, i;
}
G.dependencies = {
  walk: H,
  dtbox: A,
  askForPromise: Y,
  query: { splitSegments: _, joinSegments: B, updateState: K }
};
function ft({ startX: e, startY: r, newX: t, newY: n }) {
  let o = Math.min(e, t), s = Math.max(e, t), a = Math.min(r, n), i = Math.max(r, n);
  return { xMin: o, xMax: s, yMin: a, yMax: i };
}
function dt(e, r) {
  const { xMin: t, xMax: n, yMin: o, yMax: s } = e;
  r.style.left = `${t}px`, r.style.top = `${o}px`, r.style.width = `${n - t}px`, r.style.height = `${s - o}px`;
}
function pt(e, r) {
  let t;
  return r ? (t = r, t.style.visibility = "visible") : (t = document.createElement("div"), t.style.position = "absolute", t.style.border = "1px dotted #333", document.getElementsByTagName("body")[0].appendChild(t)), t.style.left = `${e.clientX}px`, t.style.top = `${e.clientY}px`, t.style.width = "20px", t.style.height = "20px", t;
}
function ht(e) {
  return function() {
    let t = document.querySelectorAll("[draggable]"), n = [];
    return t.forEach((o) => {
      o.parentNode == e && n.push(o);
    }), n;
  };
}
function z(e, r) {
  return typeof e == "string" || e === document || e.tagName == "BODY" ? !1 : e.classList.contains(r) ? e : z(e.parentNode, r);
}
function V(e, r) {
  return {
    mouseDown: (t) => {
      t.target.draggable || r && r(t) || e.update("select", { event: t });
    },
    mouseUp: (t) => {
      if (t.target.draggable) {
        t.altKey ? e.update("removeItem", { event: t }) : t.shiftKey ? e.update("addItem", { event: t }) : e.update("newSelection", { event: t });
        return;
      }
      e.update("end", { event: t });
    },
    mouseMove: (t) => {
      e.update("move", { event: t });
    },
    dragStart: (t) => {
      e.update("drag", { event: t });
    },
    dragEnd: (t) => {
      e.ignoreCachedUpdates(), e.update("end", { event: t });
    },
    dragOver: (t) => t.preventDefault(),
    dragEnter: (t) => e.update("move", { event: t }),
    drop: (t) => e.update("drop", { event: t })
  };
}
const yt = {
  minMax: ft,
  updateSelection: dt,
  drawSelection: pt,
  targetList: ht,
  findDropZone: z,
  getEventFunctions: V
};
function gt({ event: e, dropZone: r, dragged: t, selection: n, log: o, dragOffset: s }) {
  r && (n.forEach((a) => {
    a.parentNode.removeChild(a), r.appendChild(a);
  }), t.style = "");
}
function mt({ event: e, selection: r, draggedTransperency: t, selectStyle: n }) {
  r.forEach((o) => {
    o.style.opacity = t, o.classList.add(n);
  });
}
function St({ event: e, dropZone: r, dragged: t, selection: n, log: o, dragOffset: s }) {
  console.log("DROP OUT");
}
const I = {
  onDrop: gt,
  onStartDragging: mt,
  onDropOut: St
}, vt = [
  // [ state     , action         , nextState   , functionName    , chainAction(optional)]
  ["none", "start", "wait", "setConfig", ["start", !1]],
  ["wait", "start", "ready", "start"],
  ["ready", "addItem", "ready", "addSingleItem"],
  ["ready", "newSelection", "ready", "replaceSelection"],
  ["ready", "removeItem", "ready", "removeSingleItem"],
  ["ready", "select", "inSelect", "startSelection"],
  ["inSelect", "move", "inSelect", "changeSelection"],
  ["inSelect", "end", "ready", "endSelection"],
  ["ready", "drag", "inDrag", "startDragging"],
  ["inDrag", "end", "ready", "endDragging"],
  ["inDrag", "move", "inDrag", "changeDragZone"],
  ["inDrag", "drop", "inDrag", "drop"],
  ["ready", "disable", "off", "disable"],
  ["off", "enable", "ready", "enable"],
  ["off", "changeConfig", "off", "setConfig"],
  ["ready", "changeConfig", "ready", "setConfig"],
  ["ready", "destroy", "end", "destroy"],
  ["off", "destroy", "end", "destroy"]
], Et = {
  init: "none",
  behavior: vt,
  stateData: {
    dropStyle: "dropzone",
    selectStyle: "dd-select",
    filter: !1,
    draggedTransperency: 0.5,
    selection: [],
    dragged: null,
    activeDropZone: null,
    activeZoneStyle: "actZone",
    selectDraw: null,
    mouseSelection: !1,
    hasDrop: !1,
    dragOffset: null,
    startX: 0,
    startY: 0,
    newX: !1,
    newY: !1
  }
};
function bt({ task: e, dependencies: r }, t) {
  let { eFn: n } = r;
  document.addEventListener("mousedown", n.mouseDown), document.addEventListener("mousemove", n.mouseMove), document.addEventListener("mouseup", n.mouseUp), document.addEventListener("dragstart", n.dragStart), document.addEventListener("dragend", n.dragEnd), document.addEventListener("dragover", n.dragOver), document.addEventListener("dragenter", n.dragEnter), document.addEventListener("drop", n.drop), e.done({
    success: !0,
    response: t
  });
}
function Dt({ task: e, dependencies: r, extractList: t }, n) {
  const { event: o } = n, { fn: s } = r, [a] = t(["selectDraw"]), i = {};
  o.preventDefault(), i.selectDraw = s.drawSelection(o, a), i.mouseSelection = !0, i.startX = o.clientX, i.startY = o.clientY, e.done({
    success: !0,
    stateData: i
  });
}
function $t({ task: e, dependencies: r, extractList: t }, n) {
  let { event: o } = n, { fn: s } = r, [a, i, u, c] = t(["mouseSelection", "selectDraw", "startX", "startY"]);
  if (!a) {
    e.done({ success: !1 });
    return;
  }
  o.preventDefault();
  let l = o.clientX, d = o.clientY;
  s.updateSelection(s.minMax({ startX: u, startY: c, newX: l, newY: d }), i), e.done({
    success: !0,
    stateData: { newX: l, newY: d }
  });
}
function Lt({ task: e, dependencies: r, extractList: t }, n) {
  let { event: o } = n, { fn: s } = r, [
    a,
    i,
    u,
    c,
    l,
    d,
    p,
    h
  ] = t([
    "selection",
    "startX",
    "startY",
    "newX",
    "newY",
    "selectDraw",
    "selectStyle",
    "filter"
  ]), f = "new", y = [];
  if (o.preventDefault(), d.style.visibility = "hidden", !c) {
    a.forEach((S) => S.classList.remove(p)), y = [], e.done({
      success: !0,
      stateData: { selection: y }
    });
    return;
  }
  o.altKey && (f = "reduce"), o.shiftKey && (f = "expand"), f !== "expand" && a.forEach((S) => {
    S.classList.remove(p);
  });
  let { xMin: g, xMax: v, yMin: m, yMax: b } = s.minMax({ startX: i, startY: u, newX: c, newY: l }), $ = document.querySelectorAll("[draggable]"), k = [];
  switch (h ? $.forEach((S) => {
    S.classList.contains(h) && k.push(S);
  }) : $.forEach((S) => k.push(S)), k.forEach((S) => {
    let E = !0;
    E && (E = S.offsetLeft > g), E && (E = S.offsetTop > m), E && (E = S.offsetLeft + S.clientWidth < v), E && (E = S.offsetTop + S.clientHeight < b), E && y.push(S);
  }), f) {
    case "new":
      y = y.map((S) => (S.classList.add(p), S));
      break;
    case "expand":
      y = y.reduce((S, E) => (S.includes(E) || (S.push(E), E.classList.add(p)), S), y);
      break;
    case "reduce":
      y = y.reduce((S, E) => (y.includes(E) || (S.push(E), E.classList.add(p)), S), []);
      break;
  }
  const J = !1;
  c = !1, l = !1, e.done({
    success: !0,
    stateData: { selection: y, mouseSelection: J, newX: c, newY: l }
  });
}
function xt({ task: e, extractList: r }, t) {
  let { event: n } = t, o = n.target, [s, a, i] = r(["selection", "selectStyle", "filter"]), u = s.includes(o), c = !0;
  i && (c = o.classList.contains(i)), !u && c && (s.push(o), o.classList.add(a)), e.done({
    success: !0,
    stateData: { selection: s }
  });
}
function wt({ task: e, extractList: r }, t) {
  let { event: n } = t, o = n.target, [s, a] = r([s, a]);
  s = s.reduce((i, u) => (u != o ? i.push(u) : u.classList.remove(a), i), []), e.done({
    success: !0,
    stateData: { selection: s }
  });
}
function At({ task: e, extractList: r }, t) {
  let { event: n } = t, [o, s, a] = r(["selectStyle", "filter", "selection"]), i = n.target, u = !0;
  if (s && (u = i.classList.contains(s)), !u) {
    e.done({ success: !1 });
    return;
  }
  a.forEach((c) => c.classList.remove(o)), i.classList.add(o), a = [i], e.done({
    success: !0,
    stateData: { selection: a }
  });
}
function Tt({ task: e, dependencies: r, extractList: t }, n) {
  let { event: o } = n, { target: s } = o, [
    a,
    i,
    u,
    c,
    l
  ] = t([
    "draggedTransperency",
    "selection",
    "selectStyle",
    "dropStyle",
    "filter"
  ]), { hooks: d, fn: p, deps: h } = r, f = !0, y = {};
  if (l && (f = s.classList.contains(l)), !f) {
    e.done({ success: !1 });
    return;
  }
  i.length === 0 && (i = [s]), d.onStartDragging({ event: o, selection: i, draggedTransperency: a, selectStyle: u, dependencies: h }), y.dragged = s, y.dragOffset = {
    x: o.offsetX,
    y: o.offsetY
  }, y.selection = i, y.activeDropZone = p.findDropZone(s, c), e.done({
    success: !0,
    stateData: y
  });
}
function jt({ task: e, dependencies: r, extractList: t }, n) {
  let { event: o } = n, { fn: s } = r, [
    a,
    i,
    u,
    c
  ] = t([
    "activeDropZone",
    "dragged",
    "activeZoneStyle",
    "dropStyle"
  ]), l = !1;
  if (i.parentNode === o.target.parentNode) {
    e.done({ success: !0 });
    return;
  }
  if (l = s.findDropZone(o.target, c), !l) {
    e.done({ success: !1 });
    return;
  }
  if (l) {
    a && a.classList.remove(u), l.classList.add(u), e.done({
      success: !0,
      stateData: {
        activeDropZone: l
      }
    });
    return;
  }
  e.done({ success: !1 });
}
function _t({ task: e, dependencies: r, extractList: t }, n) {
  let { hooks: o, fn: s, deps: a } = r, [
    i,
    u,
    c,
    l,
    d,
    p
  ] = t([
    "activeDropZone",
    "activeZoneStyle",
    "dragged",
    "selection",
    "selectStyle",
    "hasDrop",
    "dependencies"
  ]), { event: h } = n, f = [];
  if (!p) {
    let y = !1;
    l.forEach((g) => {
      let v = s.targetList(g.parentNode), m = {
        source: g.parentNode,
        target: !1,
        el: g,
        sourceList: v
        // it's a function
      };
      f.push(m);
    }), o.onDropOut({ event: h, dropZone: y, dragged: c, selection: l, log: f, dependencies: a });
  }
  i && i.classList.remove(u), l.forEach((y) => {
    y.classList.remove(d), y.style.opacity = "", y.style[0] || y.removeAttribute("style");
  }), i = null, l = [], p = !1, e.done({
    success: !0,
    stateData: { activeDropZone: i, selection: l, hasDrop: p }
  });
}
function kt({ task: e, dependencies: r, extractList: t }, n) {
  let { event: o } = n, [s, a, i, u, c] = t(["activeDropZone", "dragged", "selection", "dropStyle", "dragOffset"]), { hooks: l, fn: d, deps: p } = r, h = [], f = d.targetList(o.target), y = d.findDropZone(o.target, u), g = !1;
  o.preventDefault(), y == s && (i.forEach((v) => {
    let m = d.targetList(v.parentNode), b = {
      source: v.parentNode,
      target: y,
      el: v,
      targetList: f,
      sourceList: m
      // it's a function
    };
    h.push(b);
  }), l.onDrop({ event: o, dropZone: y, dragged: a, selection: i, log: h, dragOffset: c, dependencies: p }), g = !0), c = null, e.done({
    success: !0,
    stateData: { hasDrop: g, dragOffset: c }
  });
}
function Ft({ task: e, dependencies: r }) {
  let { eFn: t } = r;
  document.removeEventListener("mousedown", t.mouseDown), document.removeEventListener("mousemove", t.mouseMove), document.removeEventListener("mouseup", t.mouseUp), document.removeEventListener("dragstart", t.dragStart), document.removeEventListener("dragend", t.dragEnd), document.removeEventListener("dragover", t.dragOver), document.removeEventListener("dragenter", t.dragEnter), document.removeEventListener("drop", t.drop), e.done({ success: !0 });
}
function Ct({ task: e }, r = {}) {
  let { hooks: t, config: n } = r, o = {};
  t || (t = {}), n || (n = {}), n.onStartDragging && (t.onStartDragging = n.onStartDragging), n.onDrop && (t.onDrop = n.onDrop), n.onDropOut && (t.onDropOut = n.onDropOut), n.dropStyle && typeof n.dropStyle == "string" && (o.dropStyle = n.dropStyle), n.draggedTransperency && typeof n.draggedTransperency == "number" && (o.draggedTransperency = n.draggedTransperency), n.activeZoneStyle && typeof n.activeZoneStyle == "string" && (o.activeZoneStyle = n.activeZoneStyle), n.selectStyle && typeof n.selectStyle == "string" && (o.selectStyle = n.selectStyle), n.filter && typeof n.filter == "string" && (o.filter = n.filter), n.dependencies ? o.dependencies = n.dependencies : o.dependencies = {}, e.done({
    success: !0,
    stateData: o,
    response: t
  });
}
function Ot({ task: e }) {
  e.done({ success: !0 });
}
function Nt({ task: e }) {
  e.don({ success: !0 });
}
const Pt = {
  start: bt,
  startSelection: Dt,
  changeSelection: $t,
  endSelection: Lt,
  addSingleItem: xt,
  removeSingleItem: wt,
  replaceSelection: At,
  startDragging: Tt,
  changeDragZone: jt,
  endDragging: _t,
  drop: kt,
  destroy: Ft,
  setConfig: Ct,
  disable: Ot,
  enable: Nt
};
function Mt(e = {}) {
  const r = new G(Et, Pt), t = V(r, e.ignoreSelect);
  return window.dd = r, r.setDependencies({ deps: e.dependencies }), r.setDependencies({ eFn: t, fn: yt }), r.update("start", { config: e, hooks: I }).then((n) => r.setDependencies({ hooks: n })).then(() => ({
    changeConfig: (n) => {
      r.update("changeConfig", { hooks: I, config: n }).then((o) => r.setDependencies({ hooks: o }));
    },
    destroy: () => r.update("destroy"),
    disable: () => r.update("disable"),
    enable: () => r.update("enable")
  }));
}
export {
  Mt as default
};
