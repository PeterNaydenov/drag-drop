function E(t) {
  return t == null ? "simple" : t instanceof Array ? "array" : typeof t == "object" ? "object" : "simple";
}
function A(t, n) {
  return n instanceof Array ? !isNaN(t) : !1;
}
function w(t, n, e, i, r) {
  let [o, s] = i;
  Object.keys(t).forEach((c) => {
    let d = E(t[c]), l = t[c], p = E(n) === "array", g = !isNaN(c), h = Symbol("ignore___");
    if (d !== "simple" && s) {
      if (l = s({ value: l, key: c, breadcrumbs: `${r}/${c}`, IGNORE: h }), l === h)
        return;
      d = E(l);
    }
    if (d === "simple") {
      if (!o) {
        n[c] = l;
        return;
      }
      let f = o({ value: l, key: c, breadcrumbs: `${r}/${c}`, IGNORE: h });
      if (f === h)
        return;
      A(c, n) ? n.push(f) : n[c] = f;
    }
    if (d === "object") {
      const f = {};
      p && g ? n.push(f) : n[c] = f, e.push(k(l, f, e, i, `${r}/${c}`));
    }
    if (d === "array") {
      const f = [];
      p && g ? n.push(f) : n[c] = f, e.push(k(l, f, e, i, `${r}/${c}`));
    }
  });
}
function* k(t, n, e, i, r) {
  yield w(t, n, e, i, r);
}
function P({ data: t, keyCallback: n, objectCallback: e }) {
  let i = E(t), r, o = [], s = "root", a = [n, e];
  switch (i) {
    case "array":
      r = [], w(t, r, o, a, s);
      break;
    case "object":
      r = {}, w(t, r, o, a, s);
      break;
    case "simple":
      return t;
  }
  for (const c of o)
    c.next();
  return r;
}
function F() {
  return function(t, n) {
    let e = {}, i = {}, r = {};
    return t.forEach((o) => {
      const [s, a, c, d, l] = o, p = n[d], g = `${s}/${a}`;
      e[g] = p || null, i[g] = c, I(l) && (r[g] = [], r[g][0] = l[0], r[g][1] = l[1]);
    }), { transitions: e, nextState: i, chainActions: r };
  };
}
function I(t) {
  return !(t instanceof Array) || t.length != 2 ? !1 : (t.forEach((n) => {
    if (n !== !1 || typeof n != "string")
      return !1;
  }), !0);
}
function Y(t) {
  return function(n, e, i) {
    const r = t.askForPromise(), o = `${t.state}/${e}`, s = t.callback;
    t.lock = !0, t._transit(r, o, i), r.onComplete(
      (a) => {
        let c = t._getChain(t.chainActions, o), d = a.response;
        if (a.success) {
          if (t.state = t.nextState[o], a.stateData && (t.stateData = a.stateData), s.positive.forEach((l) => l(t.state, d)), s.transition.forEach((l) => l(t.state, d)), c && c[0]) {
            t._updateStep(n, c[0], d);
            return;
          }
        } else if (s.negative.forEach((l) => l(t.state, d)), s.transition.forEach((l) => l(t.state, d)), c && c[1]) {
          t._updateStep(n, c[1], d);
          return;
        }
        if (a.command) {
          t._updateStep(n, a.command, d);
          return;
        }
        n.done(d);
      }
    ), r.promise.catch(() => console.log(`Failed in step ${o}`));
  };
}
function X(t) {
  return function(n) {
    Object.entries(n).forEach(([e, i]) => {
      e == null && console.log(`Warning: Transition for ${i} is not defined`);
    });
  };
}
function j(t) {
  return function(n, e, i) {
    const r = t.dependencies, o = { ...t.stateData }, s = t.transitions[e];
    typeof s == "function" ? s(n, r, o, i) : n.done({ success: !1 });
  };
}
function U() {
  return function(t, n) {
    return t[n] ? t[n] : !1;
  };
}
function K(t) {
  return function() {
    if (t.cache.length !== 0) {
      const { updateTask: n, action: e, dt: i } = t.cache[0];
      t.cache = t.cache.reduce((r, o, s) => (s != 0 && r.push(o), r), []), t._updateStep(n, e, i), n.onComplete((r) => t._onUpdateTask(r));
    }
  };
}
function z(t) {
  return function(e) {
    const i = t.callback, r = t.askForPromise(i.update);
    i.update.forEach((o, s) => {
      o(t.state, e), r[s].done();
    }), r.onComplete((o) => {
      t.lock = !1, t._triggerCacheUpdate();
    });
  };
}
function R(t) {
  return function(n) {
    t.dependencies = { ...t.dependencies, ...n };
  };
}
function q(t) {
  return function(n, e) {
    const i = t.callback;
    i[n] && i[n].push(e);
  };
}
function B(t) {
  return function(n) {
    !t.callback[n] || (t.callback[n] = []);
  };
}
function G(t) {
  return function({ state: n, stateData: e }) {
    n && (t.state = n, e && (t.stateData = { ...e }));
  };
}
function H(t) {
  return function() {
    const n = t.state, e = { ...t.stateData };
    return {
      state: n,
      stateData: e
    };
  };
}
function W(t) {
  return function(n, e) {
    const i = t.askForPromise();
    return t.lock ? (t.cache.push({ updateTask: i, action: n, dt: e }), i.promise) : (t._updateStep(i, n, e), i.onComplete((r) => t._onUpdateTask(r)), i.promise);
  };
}
function V(t) {
  return function() {
    t.state = t.initialState, t.stateData = {}, Object.entries(t.initialStateData).forEach(([n, e]) => t.stateData[n] = e);
  };
}
function J(t) {
  return function() {
    t.cache.forEach(({ updateTask: e, action: i, dt: r }) => e.cancel(`Action '${i}' was ignored`)), t.cache = [];
  };
}
function Q(t) {
  return function() {
    return t.state;
  };
}
const C = {
  _setTransitions: F,
  _updateStep: Y,
  _warn: X,
  _transit: j,
  _getChain: U,
  _triggerCacheUpdate: K,
  _onUpdateTask: z,
  setDependencies: R,
  on: q,
  off: B,
  importState: G,
  exportState: H,
  update: W,
  reset: V,
  ignoreCachedUpdates: J,
  getState: Q
};
var Z = ee;
function ee(t) {
  let n = !1, e;
  return t ? (e = te(t), n = !0) : e = T(), e.timeout = ne(n, e), e;
}
function T() {
  let t, n;
  const e = new Promise((i, r) => {
    t = i, n = r;
  });
  return {
    promise: e,
    done: t,
    cancel: n,
    onComplete: x(e)
  };
}
function te(t) {
  let n = t.map((i) => T()), e = n.map((i) => i.promise);
  return n.promises = e, n.onComplete = x(Promise.all(e)), n;
}
function x(t) {
  return function(n) {
    t.then((e) => n(e));
  };
}
function ne(t, n) {
  let e;
  return t ? e = Promise.all(n.promises) : e = n.promise, function(i, r) {
    let o, s = new Promise((a, c) => {
      o = setTimeout(() => {
        a(r), Promise.resolve(e);
      }, i);
    });
    return e.then(() => clearTimeout(o)), n.onComplete = x(Promise.race([e, s])), n;
  };
}
const O = "N/A";
function re({ init: t, table: n, stateData: e, debug: i }, r = {}) {
  const o = this;
  o.state = t || O, o.initialState = t || O, o.lock = !1, o.cache = [], o.askForPromise = Z, o.stateData = { ...e }, o.initialStateData = Object.freeze({ ...e }), o.dependencies = { walk: P, askForPromise: Z }, o.callback = {
    update: [],
    transition: [],
    positive: [],
    negative: []
  };
  for (let d in C)
    o[d] = C[d](o);
  const { transitions: s, nextState: a, chainActions: c } = o._setTransitions(n, r);
  i && o._warn(s), o.transitions = s, o.nextState = a, o.chainActions = c;
}
function oe({ startX: t, startY: n, newX: e, newY: i }) {
  let r = Math.min(t, e), o = Math.max(t, e), s = Math.min(n, i), a = Math.max(n, i);
  return { xMin: r, xMax: o, yMin: s, yMax: a };
}
function ie(t, n) {
  const { xMin: e, xMax: i, yMin: r, yMax: o } = t;
  n.style.left = `${e}px`, n.style.top = `${r}px`, n.style.width = `${i - e}px`, n.style.height = `${o - r}px`;
}
function se(t, n) {
  let e;
  return n ? (e = n, e.style.visibility = "visible") : (e = document.createElement("div"), e.style.position = "absolute", e.style.border = "1px dotted #333", document.getElementsByTagName("body")[0].appendChild(e)), e.style.left = `${t.clientX}px`, e.style.top = `${t.clientY}px`, e.style.width = "20px", e.style.height = "20px", e;
}
function ce(t) {
  return function() {
    let e = document.querySelectorAll("[draggable]"), i = [];
    return e.forEach((r) => {
      r.parentNode == t && i.push(r);
    }), i;
  };
}
function N(t, n) {
  return t === document || t.tagName == "BODY" ? !1 : t.classList.contains(n) ? t : N(t.parentNode, n);
}
function $(t, n) {
  return {
    mouseDown: (e) => {
      e.target.draggable || n && n(e) || t.update("select", { event: e });
    },
    mouseUp: (e) => {
      if (e.target.draggable) {
        e.altKey ? t.update("removeItem", { event: e }) : e.shiftKey ? t.update("addItem", { event: e }) : t.update("newSelection", { event: e });
        return;
      }
      t.update("end", { event: e });
    },
    mouseMove: (e) => t.update("move", { event: e }),
    dragStart: (e) => t.update("drag", { event: e }),
    dragEnd: (e) => {
      t.ignoreCachedUpdates(), t.update("end", { event: e });
    },
    dragOver: (e) => e.preventDefault(),
    dragEnter: (e) => t.update("move", { event: e }),
    drop: (e) => t.update("drop", { event: e })
  };
}
const ae = {
  minMax: oe,
  updateSelection: ie,
  drawSelection: se,
  targetList: ce,
  findDropZone: N,
  getEventFunctions: $
};
function de({ event: t, dropZone: n, dragged: e, selection: i, log: r, dragOffset: o }) {
  i.forEach((s) => {
    s.parentNode.removeChild(s), n.appendChild(s);
  }), e.style = "";
}
function le({ event: t, selection: n, draggedTransperency: e, selectStyle: i }) {
  n.forEach((r) => {
    r.style.opacity = e, r.classList.add(i);
  });
}
function ue({ event: t, dropZone: n, dragged: e, selection: i, log: r, dragOffset: o }) {
  console.log("DROP OUT");
}
const M = {
  onDrop: de,
  onStartDragging: le,
  onDropOut: ue
}, fe = [
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
], pe = {
  init: "none",
  table: fe,
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
function ge(t, n, e, i) {
  let { eFn: r } = n;
  document.addEventListener("mousedown", r.mouseDown), document.addEventListener("mousemove", r.mouseMove), document.addEventListener("mouseup", r.mouseUp), document.addEventListener("dragstart", r.dragStart), document.addEventListener("dragend", r.dragEnd), document.addEventListener("dragover", r.dragOver), document.addEventListener("dragenter", r.dragEnter), document.addEventListener("drop", r.drop), t.done({
    success: !0,
    response: i
  });
}
function ye(t, n, e, i) {
  const { event: r } = i, { fn: o } = n, { selectDraw: s } = e;
  r.preventDefault(), e.selectDraw = o.drawSelection(r, s), e.mouseSelection = !0, e.startX = r.clientX, e.startY = r.clientY, t.done({
    success: !0,
    stateData: e
  });
}
function he(t, n, e, i) {
  let { mouseSelection: r, selectDraw: o, startX: s, startY: a } = e, { event: c } = i, { fn: d } = n;
  if (!r) {
    t.done({ success: !1 });
    return;
  }
  c.preventDefault();
  let l = c.clientX, p = c.clientY;
  d.updateSelection(d.minMax({ startX: s, startY: a, newX: l, newY: p }), o), e.newX = l, e.newY = p, t.done({
    success: !0,
    stateData: e
  });
}
function me(t, n, e, i) {
  let { event: r } = i, { fn: o } = n, { startX: s, startY: a, newX: c, newY: d, selectDraw: l, selectStyle: p, filter: g } = e, h = [], f = "new";
  if (r.preventDefault(), l.style.visibility = "hidden", !c) {
    e.selection.forEach((u) => u.classList.remove(p)), e.selection = [], t.done({
      success: !0,
      stateData: e
    });
    return;
  }
  r.altKey && (f = "reduce"), r.shiftKey && (f = "expand"), f !== "expand" && e.selection.forEach((u) => u.classList.remove(p));
  let { xMin: m, xMax: v, yMin: S, yMax: b } = o.minMax({ startX: s, startY: a, newX: c, newY: d }), _ = document.querySelectorAll("[draggable]"), L = [];
  switch (g ? _.forEach((u) => {
    u.classList.contains(g) && L.push(u);
  }) : _.forEach((u) => L.push(u)), L.forEach((u) => {
    let y = !0;
    y && (y = u.offsetLeft > m), y && (y = u.offsetTop > S), y && (y = u.offsetLeft + u.clientWidth < v), y && (y = u.offsetTop + u.clientHeight < b), y && h.push(u);
  }), f) {
    case "new":
      e.selection = h.map((u) => (u.classList.add(p), u));
      break;
    case "expand":
      e.selection = h.reduce((u, y) => (u.includes(y) || (u.push(y), y.classList.add(p)), u), e.selection);
      break;
    case "reduce":
      e.selection = e.selection.reduce((u, y) => (h.includes(y) || (u.push(y), y.classList.add(p)), u), []);
      break;
  }
  e.mouseSelection = !1, e.newX = !1, e.newY = !1, t.done({
    success: !0,
    stateData: e
  });
}
function ve(t, n, e, i) {
  let { event: r } = i, o = r.target, { selection: s, selectStyle: a, filter: c } = e, d = s.includes(o), l = !0;
  c && (l = o.classList.contains(c)), !d && l && (s.push(o), o.classList.add(a)), t.done({
    success: !0,
    stateData: e
  });
}
function Se(t, n, e, i) {
  let { event: r } = i, o = r.target, { selection: s, selectStyle: a } = e;
  e.selection = s.reduce((c, d) => (d != o ? c.push(d) : d.classList.remove(a), c), []), t.done({
    success: !0,
    stateData: e
  });
}
function be(t, n, e, i) {
  let { event: r } = i, { selectStyle: o, filter: s } = e, a = r.target, c = !0;
  if (s && (c = a.classList.contains(s)), !c) {
    t.done({ success: !1 });
    return;
  }
  e.selection.forEach((d) => d.classList.remove(o)), a.classList.add(o), e.selection = [a], t.done({
    success: !0,
    stateData: e
  });
}
function Ee(t, n, e, i) {
  let { event: r } = i, { target: o } = r, { draggedTransperency: s, selection: a, selectStyle: c, dropStyle: d, filter: l, dependencies: p } = e, { hooks: g, fn: h } = n, f = !0;
  if (l && (f = o.classList.contains(l)), !f) {
    t.done({ success: !1 });
    return;
  }
  a.length === 0 && (a = [o]), g.onStartDragging({ event: r, selection: a, draggedTransperency: s, selectStyle: c, dependencies: p }), e.dragged = o, e.dragOffset = {
    x: r.offsetX,
    y: r.offsetY
  }, e.selection = a, e.activeDropZone = h.findDropZone(o, d), t.done({
    success: !0,
    stateData: e
  });
}
function Le(t, n, e, i) {
  let { event: r } = i, { fn: o } = n, {
    activeDropZone: s,
    dragged: a,
    activeZoneStyle: c,
    dropStyle: d
  } = e, l = !1;
  if (a.parentNode === r.target.parentNode) {
    t.done({ success: !0 });
    return;
  }
  if (l = o.findDropZone(r.target, d), !l) {
    t.done({ success: !1 });
    return;
  }
  if (l) {
    s && s.classList.remove(c), l.classList.add(c), e.activeDropZone = l, t.done({
      success: !0,
      stateData: e
    });
    return;
  }
  t.done({ success: !1 });
}
function we(t, n, e, i) {
  let { hooks: r, fn: o } = n, {
    activeDropZone: s,
    activeZoneStyle: a,
    dragged: c,
    selection: d,
    selectStyle: l,
    hasDrop: p,
    dependencies: g
  } = e, { event: h } = i, f = [];
  if (!p) {
    let m = !1;
    d.forEach((v) => {
      let S = o.targetList(v.parentNode), b = {
        source: v.parentNode,
        target: !1,
        el: v,
        sourceList: S
      };
      f.push(b);
    }), r.onDropOut({ event: h, dropZone: m, dragged: c, selection: d, log: f, dependencies: g });
  }
  s.classList.remove(a), d.forEach((m) => {
    m.classList.remove(l), m.style.opacity = "", m.style[0] || m.removeAttribute("style");
  }), e.activeDropZone = null, e.selection = [], e.hasDrop = !1, t.done({
    success: !0,
    stateData: e
  });
}
function xe(t, n, e, i) {
  let { event: r } = i, { activeDropZone: o, dragged: s, selection: a, dropStyle: c, dragOffset: d, dependencies: l } = e, { hooks: p, fn: g } = n, h = [], f = g.targetList(r.target), m = g.findDropZone(r.target, c);
  r.preventDefault(), m == o && (a.forEach((v) => {
    let S = g.targetList(v.parentNode), b = {
      source: v.parentNode,
      target: m,
      el: v,
      targetList: f,
      sourceList: S
    };
    h.push(b);
  }), p.onDrop({ event: r, dropZone: m, dragged: s, selection: a, log: h, dragOffset: d, dependencies: l }), e.hasDrop = !0), e.dragOffset = null, t.done({
    success: !0,
    stateData: e
  });
}
function _e(t, n, e, i) {
  let { eFn: r } = n;
  document.removeEventListener("mousedown", r.mouseDown), document.removeEventListener("mousemove", r.mouseMove), document.removeEventListener("mouseup", r.mouseUp), document.removeEventListener("dragstart", r.dragStart), document.removeEventListener("dragend", r.dragEnd), document.removeEventListener("dragover", r.dragOver), document.removeEventListener("dragenter", r.dragEnter), document.removeEventListener("drop", r.drop), t.done({ success: !0 });
}
function ke(t, n, e, i = {}) {
  let { hooks: r, config: o } = i;
  r || (r = {}), o || (o = {}), o.onStartDragging && (r.onStartDragging = o.onStartDragging), o.onDrop && (r.onDrop = o.onDrop), o.onDropOut && (r.onDropOut = o.onDropOut), o.dropStyle && typeof o.dropStyle == "string" && (e.dropStyle = o.dropStyle), o.draggedTransperency && typeof o.draggedTransperency == "number" && (e.draggedTransperency = o.draggedTransperency), o.activeZoneStyle && typeof o.activeZoneStyle == "string" && (e.activeZoneStyle = o.activeZoneStyle), o.selectStyle && typeof o.selectStyle == "string" && (e.selectStyle = o.selectStyle), o.filter && typeof o.filter == "string" && (e.filter = o.filter), o.dependencies ? e.dependencies = o.dependencies : e.dependencies = {}, t.done({
    success: !0,
    stateData: e,
    response: r
  });
}
function Ce(t, n, e, i) {
  t.done({ success: !0 });
}
function Ze(t, n, e, i) {
  t.don({ success: !0 });
}
const Oe = {
  start: ge,
  startSelection: ye,
  changeSelection: he,
  endSelection: me,
  addSingleItem: ve,
  removeSingleItem: Se,
  replaceSelection: be,
  startDragging: Ee,
  changeDragZone: Le,
  endDragging: we,
  drop: xe,
  destroy: _e,
  setConfig: ke,
  disable: Ce,
  enable: Ze
};
function Me(t = {}) {
  const n = new re(pe, Oe), e = $(n, t.ignoreSelect), i = n.askForPromise;
  return window.dd = n, n.setDependencies({ eFn: e, fn: ae, askForPromise: i }), n.update("start", { config: t, hooks: M }).then((r) => n.setDependencies({ hooks: r })).then(() => ({
    changeConfig: (r) => {
      n.update("changeConfig", { hooks: M, config: r }).then((o) => n.setDependencies({ hooks: o }));
    },
    destroy: () => n.update("destroy"),
    disable: () => n.update("disable"),
    enable: () => n.update("enable")
  }));
}
function Te() {
  console.log("injected");
}
const Ne = {
  ignoreSelect(t) {
    return !t.target.classList.contains("dropzone");
  },
  onDropOut({ event: t, dropZone: n, dragged: e, selection: i, log: r, dragOffset: o, dependencies: s }) {
    console.log("YES drop out"), s.yok();
  },
  dependencies: {
    yok: Te
  }
};
Me(Ne);
export {
  Me as default
};