var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var askForPromise_1 = askForPromise$1;
function askForPromise$1(list) {
  let isList = false, askObject;
  if (list) {
    askObject = _manyPromises(list);
    isList = true;
  } else
    askObject = _singlePromise();
  askObject.timeout = _timeout(isList, askObject);
  return askObject;
}
function _singlePromise() {
  let done, cancel;
  const x = new Promise((resolve, reject) => {
    done = resolve;
    cancel = reject;
  });
  return {
    promise: x,
    done,
    cancel,
    onComplete: _after(x)
  };
}
function _manyPromises(list) {
  let askObject = list.map((el) => _singlePromise());
  let askList = askObject.map((o) => o.promise);
  askObject["promises"] = askList;
  askObject["onComplete"] = _after(Promise.all(askList));
  return askObject;
}
function _after(x) {
  return function(fx) {
    x.then((res) => fx(res));
  };
}
function _timeout(isList, askObject) {
  let main;
  if (isList)
    main = Promise.all(askObject.promises);
  else
    main = askObject.promise;
  return function(ttl, expMsg) {
    let timer;
    let timeout = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        resolve(expMsg);
        Promise.resolve(main);
      }, ttl);
    });
    main.then(() => clearTimeout(timer));
    askObject["onComplete"] = _after(Promise.race([main, timeout]));
    return askObject;
  };
}
function _setTransitions$1() {
  return function(table2, lib) {
    let transitions = {}, nextState = {}, chainActions = {};
    table2.forEach((el) => {
      const [from, action, next, transitionName, alt] = el, transition = lib[transitionName], key = `${from}/${action}`;
      transitions[key] = transition || null;
      nextState[key] = next;
      if (_isAltValid(alt)) {
        chainActions[key] = [];
        chainActions[key][0] = alt[0];
        chainActions[key][1] = alt[1];
      }
    });
    return { transitions, nextState, chainActions };
  };
}
function _isAltValid(alt) {
  if (!(alt instanceof Array))
    return false;
  if (alt.length != 2)
    return false;
  alt.forEach((m) => {
    if (m !== false || typeof m != "string")
      return false;
  });
  return true;
}
var _setTransitions_1 = _setTransitions$1;
function _updateStep$1(fsm) {
  return function(updateTask, action, dt) {
    const task = fsm.askForPromise(), key = `${fsm.state}/${action}`, cb = fsm.callback;
    fsm.lock = true;
    fsm._transit(task, key, dt);
    task.onComplete((result) => {
      let chainActions = fsm._getChain(fsm.chainActions, key), data = result.response;
      if (result.success) {
        fsm.state = fsm.nextState[key];
        if (result.stateData)
          fsm.stateData = result.stateData;
        cb["positive"].forEach((fn2) => fn2(fsm.state, data));
        cb["transition"].forEach((fn2) => fn2(fsm.state, data));
        if (chainActions && chainActions[0]) {
          fsm._updateStep(updateTask, chainActions[0], data);
          return;
        }
      } else {
        cb["negative"].forEach((fn2) => fn2(fsm.state, data));
        cb["transition"].forEach((fn2) => fn2(fsm.state, data));
        if (chainActions && chainActions[1]) {
          fsm._updateStep(updateTask, chainActions[1], data);
          return;
        }
      }
      if (result.command) {
        fsm._updateStep(updateTask, result.command, data);
        return;
      }
      updateTask.done(data);
    });
    task.promise.catch(() => console.log(`Failed in step ${key}`));
  };
}
var _updateStep_1 = _updateStep$1;
function _warn$1(fsm) {
  return function(transitions) {
    Object.keys(transitions).forEach((k) => {
      if (transitions[k] == null)
        console.log(`Warning: Transition for ${k} is not defined`);
    });
  };
}
var _warn_1 = _warn$1;
function _transit$1(fsm) {
  return function(task, key, dt) {
    const dependencies = fsm.dependencies, stateData = __spreadValues({}, fsm.stateData), transition = fsm.transitions[key];
    if (typeof transition === "function")
      transition(task, dependencies, stateData, dt);
    else
      task.done({ success: false });
  };
}
var _transit_1 = _transit$1;
function _getChain$1() {
  return function(chainActions, key) {
    if (!chainActions[key])
      return false;
    return chainActions[key];
  };
}
var _getChain_1 = _getChain$1;
function _triggerCacheUpdate$1(fsm) {
  return function() {
    if (fsm.cache.length !== 0) {
      const { updateTask, action, dt } = fsm.cache[0];
      fsm.cache = fsm.cache.reduce((res, el, i) => {
        if (i != 0)
          res.push(el);
        return res;
      }, []);
      fsm._updateStep(updateTask, action, dt);
      updateTask.onComplete((data) => fsm._onUpdateTask(data));
    }
  };
}
var _triggerCacheUpdate_1 = _triggerCacheUpdate$1;
function _onUpdateTask$1(fsm) {
  return function _onUpdateTask2(data) {
    const cb = fsm.callback, updateCallbacks = fsm.askForPromise(cb["update"]);
    cb["update"].forEach((fn2, i) => {
      fn2(fsm.state, data);
      updateCallbacks[i].done();
    });
    updateCallbacks.onComplete((x) => {
      fsm.lock = false;
      fsm._triggerCacheUpdate();
    });
  };
}
var _onUpdateTask_1 = _onUpdateTask$1;
function setDependencies$1(fsm) {
  return function(deps) {
    fsm.dependencies = __spreadValues(__spreadValues({}, fsm.dependencies), deps);
  };
}
var setDependencies_1 = setDependencies$1;
function on$1(fsm) {
  return function(eName, fn2) {
    const cb = fsm.callback;
    if (cb[eName])
      cb[eName].push(fn2);
  };
}
var on_1 = on$1;
function off$1(fsm) {
  return function(eName) {
    if (!fsm.callback[eName])
      return;
    fsm.callback[eName] = [];
  };
}
var off_1 = off$1;
function importState$1(fsm) {
  return function({ state, stateData }) {
    if (state) {
      fsm.state = state;
      fsm.stateData = __spreadValues({}, stateData);
    }
  };
}
var importState_1 = importState$1;
function exportState$1(fsm) {
  return function() {
    const state = fsm.state, stateData = __spreadValues({}, fsm.stateData);
    return {
      state,
      stateData
    };
  };
}
var exportState_1 = exportState$1;
function update$1(fsm) {
  return function(action, dt) {
    const updateTask = fsm.askForPromise();
    if (fsm.lock) {
      fsm.cache.push({ updateTask, action, dt });
      return updateTask.promise;
    }
    fsm._updateStep(updateTask, action, dt);
    updateTask.onComplete((data) => fsm._onUpdateTask(data));
    return updateTask.promise;
  };
}
var update_1 = update$1;
function reset$1(fsm) {
  return function() {
    fsm.state = fsm.initialState;
    fsm.stateData = fsm.initialStateData;
  };
}
var reset_1 = reset$1;
function ignoreCachedUpdates$1(fsm) {
  return function() {
    const cache = fsm.cache;
    cache.forEach(({ updateTask, action, dt }) => updateTask.cancel(`Action '${action}' was ignored`));
    fsm.cache = [];
  };
}
var ignoreCacheUpdates = ignoreCachedUpdates$1;
function getState$1(fsm) {
  return function() {
    return fsm.state;
  };
}
var getState_1 = getState$1;
const _setTransitions = _setTransitions_1, _updateStep = _updateStep_1, _warn = _warn_1, _transit = _transit_1, _getChain = _getChain_1, _triggerCacheUpdate = _triggerCacheUpdate_1, _onUpdateTask = _onUpdateTask_1, setDependencies = setDependencies_1, on = on_1, off = off_1, importState = importState_1, exportState = exportState_1, update = update_1, reset = reset_1, ignoreCachedUpdates = ignoreCacheUpdates, getState = getState_1;
const fn$1 = {
  _setTransitions,
  _updateStep,
  _warn,
  _transit,
  _getChain,
  _triggerCacheUpdate,
  _onUpdateTask,
  setDependencies,
  on,
  off,
  importState,
  exportState,
  update,
  reset,
  ignoreCachedUpdates,
  getState
};
var methods$1 = fn$1;
const MISSING_STATE = "N/A", askForPromise = askForPromise_1, methods = methods$1;
function Fsm({ init, table: table2, stateData, debug }, lib = {}) {
  const fsm = this, fnKeys = Object.keys(methods);
  fsm.state = init || MISSING_STATE;
  fsm.initialState = init || MISSING_STATE;
  fsm.lock = false;
  fsm.cache = [];
  fsm.askForPromise = askForPromise;
  fsm.stateData = __spreadValues({}, stateData);
  fsm.initialStateData = __spreadValues({}, stateData);
  fsm.dependencies = {};
  fsm.callback = {
    update: [],
    transition: [],
    positive: [],
    negative: []
  };
  fnKeys.forEach((k) => fsm[k] = methods[k](fsm));
  const { transitions, nextState, chainActions } = fsm._setTransitions(table2, lib);
  if (debug)
    fsm._warn(transitions);
  fsm.transitions = transitions;
  fsm.nextState = nextState;
  fsm.chainActions = chainActions;
}
var src = Fsm;
function minMax({ startX, startY, newX, newY }) {
  let xMin = Math.min(startX, newX), xMax = Math.max(startX, newX), yMin = Math.min(startY, newY), yMax = Math.max(startY, newY);
  return { xMin, xMax, yMin, yMax };
}
function updateSelection(coordinates, node) {
  const { xMin, xMax, yMin, yMax } = coordinates;
  node.style.left = `${xMin}px`;
  node.style.top = `${yMin}px`;
  node.style.width = `${xMax - xMin}px`;
  node.style.height = `${yMax - yMin}px`;
}
function drawSelection(event, selectDraw) {
  let draw;
  if (!selectDraw) {
    draw = document.createElement("div");
    draw.style.position = "absolute";
    draw.style.border = "1px dotted #333";
    document.getElementsByTagName("body")[0].appendChild(draw);
  } else {
    draw = selectDraw;
    draw.style.visibility = "visible";
  }
  draw.style.left = `${event.clientX}px`;
  draw.style.top = `${event.clientY}px`;
  draw.style.width = "20px";
  draw.style.height = "20px";
  return draw;
}
function targetList(container) {
  return function targetList2() {
    let list = document.querySelectorAll("[draggable]"), selection = [];
    list.forEach((el) => {
      if (el.parentNode == container)
        selection.push(el);
    });
    return selection;
  };
}
function findDropZone(node, dropStyle) {
  if (node === document)
    return false;
  if (node.tagName == "BODY")
    return false;
  if (node.classList.contains(dropStyle))
    return node;
  return findDropZone(node.parentNode, dropStyle);
}
function getEventFunctions(dragDrop2, ignoreSelect) {
  return {
    mouseDown: (event) => {
      if (event.target.draggable)
        return;
      if (ignoreSelect && ignoreSelect(event))
        return;
      dragDrop2.update("select", { event });
    },
    mouseUp: (event) => {
      if (event.target.draggable) {
        if (event.altKey)
          dragDrop2.update("removeItem", { event });
        else if (event.shiftKey)
          dragDrop2.update("addItem", { event });
        else
          dragDrop2.update("newSelection", { event });
        return;
      }
      dragDrop2.update("end", { event });
    },
    mouseMove: (event) => dragDrop2.update("move", { event }),
    dragStart: (event) => dragDrop2.update("drag", { event }),
    dragEnd: (event) => {
      dragDrop2.ignoreCachedUpdates();
      dragDrop2.update("end", { event });
    },
    dragOver: (event) => event.preventDefault(),
    dragEnter: (event) => dragDrop2.update("move", { event }),
    drop: (event) => dragDrop2.update("drop", { event })
  };
}
const fn = {
  minMax,
  updateSelection,
  drawSelection,
  targetList,
  findDropZone,
  getEventFunctions
};
function onDrop({ event, dropZone, dragged, selection, log, dragOffset }) {
  selection.forEach((el) => {
    el.parentNode.removeChild(el);
    dropZone.appendChild(el);
  });
  dragged.style = "";
}
function onStartDragging({ event, selection, draggedTransperency, selectStyle }) {
  selection.forEach((el) => {
    el.style.opacity = draggedTransperency;
    el.classList.add(selectStyle);
  });
}
function onDropOut({ event, dropZone, dragged, selection, log, dragOffset }) {
  console.log("DROP OUT");
}
const hooks = {
  onDrop,
  onStartDragging,
  onDropOut
};
const table = [
  ["none", "start", "wait", "setConfig", ["start", false]],
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
];
const logic = {
  init: "none",
  table,
  stateData: {
    dropStyle: "dropzone",
    selectStyle: "dd-select",
    filter: false,
    draggedTransperency: 0.5,
    selection: [],
    dragged: null,
    activeDropZone: null,
    activeZoneStyle: "actZone",
    selectDraw: null,
    mouseSelection: false,
    hasDrop: false,
    dragOffset: null,
    startX: 0,
    startY: 0,
    newX: false,
    newY: false
  }
};
function start(task, dependencies, stateData, data) {
  let { eFn } = dependencies;
  document.addEventListener("mousedown", eFn.mouseDown);
  document.addEventListener("mousemove", eFn.mouseMove);
  document.addEventListener("mouseup", eFn.mouseUp);
  document.addEventListener("dragstart", eFn.dragStart);
  document.addEventListener("dragend", eFn.dragEnd);
  document.addEventListener("dragover", eFn.dragOver);
  document.addEventListener("dragenter", eFn.dragEnter);
  document.addEventListener("drop", eFn.drop);
  task.done({
    success: true,
    response: data
  });
}
function startSelection(task, dependencies, stateData, data) {
  const { event } = data, { fn: fn2 } = dependencies, { selectDraw } = stateData;
  event.preventDefault();
  stateData.selectDraw = fn2.drawSelection(event, selectDraw);
  stateData.mouseSelection = true;
  stateData.startX = event.clientX;
  stateData.startY = event.clientY;
  task.done({
    success: true,
    stateData
  });
}
function changeSelection(task, dependencies, stateData, data) {
  let { mouseSelection, selectDraw, startX, startY } = stateData, { event } = data, { fn: fn2 } = dependencies;
  if (!mouseSelection) {
    task.done({ success: false });
    return;
  }
  event.preventDefault();
  let newX = event.clientX, newY = event.clientY;
  fn2.updateSelection(fn2.minMax({ startX, startY, newX, newY }), selectDraw);
  stateData.newX = newX;
  stateData.newY = newY;
  task.done({
    success: true,
    stateData
  });
}
function endSelection(task, dependencies, stateData, data) {
  let { event } = data, { fn: fn2 } = dependencies, { startX, startY, newX, newY, selectDraw, selectStyle, filter } = stateData, selection = [], selectionType = "new";
  event.preventDefault();
  selectDraw.style.visibility = "hidden";
  if (!newX) {
    stateData.selection.forEach((el) => el.classList.remove(selectStyle));
    stateData.selection = [];
    task.done({
      success: true,
      stateData
    });
    return;
  }
  if (event.altKey)
    selectionType = "reduce";
  if (event.shiftKey)
    selectionType = "expand";
  if (selectionType !== "expand")
    stateData.selection.forEach((el) => el.classList.remove(selectStyle));
  let { xMin, xMax, yMin, yMax } = fn2.minMax({ startX, startY, newX, newY });
  let dragNodes = document.querySelectorAll("[draggable]"), list = [];
  if (filter) {
    dragNodes.forEach((el) => {
      if (el.classList.contains(filter))
        list.push(el);
    });
  } else
    dragNodes.forEach((el) => list.push(el));
  list.forEach((el) => {
    let check = true;
    if (check)
      check = el.offsetLeft > xMin;
    if (check)
      check = el.offsetTop > yMin;
    if (check) {
      let lastX = el.offsetLeft + el.clientWidth;
      check = lastX < xMax;
    }
    if (check) {
      let lastY = el.offsetTop + el.clientHeight;
      check = lastY < yMax;
    }
    if (check)
      selection.push(el);
  });
  switch (selectionType) {
    case "new":
      stateData.selection = selection.map((el) => {
        el.classList.add(selectStyle);
        return el;
      });
      break;
    case "expand":
      stateData.selection = selection.reduce((res, el) => {
        if (!res.includes(el)) {
          res.push(el);
          el.classList.add(selectStyle);
        }
        return res;
      }, stateData.selection);
      break;
    case "reduce":
      stateData.selection = stateData.selection.reduce((res, el) => {
        if (!selection.includes(el)) {
          res.push(el);
          el.classList.add(selectStyle);
        }
        return res;
      }, []);
      break;
  }
  stateData.mouseSelection = false;
  stateData.newX = false;
  stateData.newY = false;
  task.done({
    success: true,
    stateData
  });
}
function addSingleItem(task, dependencies, stateData, data) {
  let { event } = data, target = event.target, { selection, selectStyle, filter } = stateData, listHasTarget = selection.includes(target), validNode = true;
  if (filter)
    validNode = target.classList.contains(filter);
  if (!listHasTarget && validNode) {
    selection.push(target);
    target.classList.add(selectStyle);
  }
  task.done({
    success: true,
    stateData
  });
}
function removeSingleItem(task, dependencies, stateData, data) {
  let { event } = data, target = event.target, { selection, selectStyle } = stateData;
  stateData.selection = selection.reduce((res, el) => {
    if (el != target)
      res.push(el);
    else
      el.classList.remove(selectStyle);
    return res;
  }, []);
  task.done({
    success: true,
    stateData
  });
}
function replaceSelection(task, dependencies, stateData, data) {
  let { event } = data, { selectStyle, filter } = stateData, target = event.target, validNode = true;
  if (filter)
    validNode = target.classList.contains(filter);
  if (!validNode) {
    task.done({ success: false });
    return;
  }
  stateData.selection.forEach((el) => el.classList.remove(selectStyle));
  target.classList.add(selectStyle);
  stateData.selection = [target];
  task.done({
    success: true,
    stateData
  });
}
function startDragging(task, dependencies, stateData, data) {
  let { event } = data, { target } = event, { draggedTransperency, selection, selectStyle, dropStyle, filter, dependencies: deps } = stateData, { hooks: hooks2, fn: fn2 } = dependencies, validTarget = true;
  if (filter)
    validTarget = target.classList.contains(filter);
  if (!validTarget) {
    task.done({ success: false });
    return;
  }
  if (selection.length === 0)
    selection = [target];
  hooks2.onStartDragging({ event, selection, draggedTransperency, selectStyle, dependencies: deps });
  stateData.dragged = target;
  stateData.dragOffset = {
    x: event.offsetX,
    y: event.offsetY
  };
  stateData.selection = selection;
  stateData.activeDropZone = fn2.findDropZone(target, dropStyle);
  task.done({
    success: true,
    stateData
  });
}
function changeDragZone(task, dependencies, stateData, data) {
  let { event } = data, { fn: fn2 } = dependencies, {
    activeDropZone: oldDropZone,
    dragged,
    activeZoneStyle,
    dropStyle
  } = stateData, actZone = false;
  if (dragged.parentNode === event.target.parentNode) {
    task.done({ success: true });
    return;
  }
  actZone = fn2.findDropZone(event.target, dropStyle);
  if (!actZone) {
    task.done({ success: false });
    return;
  }
  if (actZone) {
    if (oldDropZone)
      oldDropZone.classList.remove(activeZoneStyle);
    actZone.classList.add(activeZoneStyle);
    stateData.activeDropZone = actZone;
    task.done({
      success: true,
      stateData
    });
    return;
  }
  task.done({ success: false });
}
function endDragging(task, dependencies, stateData, data) {
  let { hooks: hooks2, fn: fn2 } = dependencies, {
    activeDropZone,
    activeZoneStyle,
    dragged,
    selection,
    selectStyle,
    hasDrop,
    dependencies: deps
  } = stateData, { event } = data, log = [];
  if (!hasDrop) {
    let dropZone = false;
    selection.forEach((el) => {
      let sourceList = fn2.targetList(el.parentNode), item = {
        source: el.parentNode,
        target: false,
        el,
        sourceList
      };
      log.push(item);
    });
    hooks2.onDropOut({ event, dropZone, dragged, selection, log, dependencies: deps });
  }
  activeDropZone.classList.remove(activeZoneStyle);
  selection.forEach((el) => {
    el.classList.remove(selectStyle);
    el.style.opacity = "";
    if (!el.style[0])
      el.removeAttribute("style");
  });
  stateData.activeDropZone = null;
  stateData.selection = [];
  stateData.hasDrop = false;
  task.done({
    success: true,
    stateData
  });
}
function drop(task, dependencies, stateData, data) {
  let { event } = data, { activeDropZone, dragged, selection, dropStyle, dragOffset, dependencies: deps } = stateData, { hooks: hooks2, fn: fn2 } = dependencies, log = [], targetList2 = fn2.targetList(event.target), dropZone = fn2.findDropZone(event.target, dropStyle);
  event.preventDefault();
  if (dropZone == activeDropZone) {
    selection.forEach((el) => {
      let sourceList = fn2.targetList(el.parentNode), item = {
        source: el.parentNode,
        target: dropZone,
        el,
        targetList: targetList2,
        sourceList
      };
      log.push(item);
    });
    hooks2.onDrop({ event, dropZone, dragged, selection, log, dragOffset, dependencies: deps });
    stateData.hasDrop = true;
  }
  stateData.dragOffset = null;
  task.done({
    success: true,
    stateData
  });
}
function destroy(task, dependencies, stateData, data) {
  let { eFn } = dependencies;
  document.removeEventListener("mousedown", eFn.mouseDown);
  document.removeEventListener("mousemove", eFn.mouseMove);
  document.removeEventListener("mouseup", eFn.mouseUp);
  document.removeEventListener("dragstart", eFn.dragStart);
  document.removeEventListener("dragend", eFn.dragEnd);
  document.removeEventListener("dragover", eFn.dragOver);
  document.removeEventListener("dragenter", eFn.dragEnter);
  document.removeEventListener("drop", eFn.drop);
  task.done({ success: true });
}
function setConfig(task, dependencies, stateData, data = {}) {
  let { hooks: hooks2, config } = data;
  if (!hooks2)
    hooks2 = {};
  if (!config)
    config = {};
  if (config.onStartDragging)
    hooks2.onStartDragging = config.onStartDragging;
  if (config.onDrop)
    hooks2.onDrop = config.onDrop;
  if (config.onDropOut)
    hooks2.onDropOut = config.onDropOut;
  if (config.dropStyle && typeof config.dropStyle === "string")
    stateData.dropStyle = config.dropStyle;
  if (config.draggedTransperency && typeof config.draggedTransperency === "number")
    stateData.draggedTransperency = config.draggedTransperency;
  if (config.activeZoneStyle && typeof config.activeZoneStyle === "string")
    stateData.activeZoneStyle = config.activeZoneStyle;
  if (config.selectStyle && typeof config.selectStyle === "string")
    stateData.selectStyle = config.selectStyle;
  if (config.filter && typeof config.filter === "string")
    stateData.filter = config.filter;
  if (config.dependencies)
    stateData.dependencies = config.dependencies;
  else
    stateData.dependencies = {};
  task.done({
    success: true,
    stateData,
    response: hooks2
  });
}
function disable(task, dependencies, stateData, data) {
  task.done({ success: true });
}
function enable(task, dependencies, stateData, data) {
  task.don({ success: true });
}
const tranistions = {
  start,
  startSelection,
  changeSelection,
  endSelection,
  addSingleItem,
  removeSingleItem,
  replaceSelection,
  startDragging,
  changeDragZone,
  endDragging,
  drop,
  destroy,
  setConfig,
  disable,
  enable
};
function dragDrop(config = {}) {
  const dragMachine = new src(logic, tranistions), eFn = getEventFunctions(dragMachine, config.ignoreSelect), askForPromise2 = dragMachine.askForPromise;
  dragMachine.setDependencies({ eFn, fn, askForPromise: askForPromise2 });
  return dragMachine.update("start", { config, hooks }).then((hooks2) => dragMachine.setDependencies({ hooks: hooks2 })).then(() => ({
    changeConfig: (config2) => {
      dragMachine.update("changeConfig", { hooks, config: config2 }).then((hooks2) => dragMachine.setDependencies({ hooks: hooks2 }));
    },
    destroy: () => dragMachine.update("destroy"),
    disable: () => dragMachine.update("disable"),
    enable: () => dragMachine.update("enable")
  }));
}
function yok() {
  console.log("injected");
}
const cfg = {
  ignoreSelect(e) {
    const tg = e.target;
    if (!tg.classList.contains("dropzone"))
      return true;
    else
      return false;
  },
  onDropOut({ event, dropZone, dragged, selection, log, dragOffset, dependencies }) {
    console.log("YES drop out");
    dependencies.yok();
  },
  dependencies: {
    yok
  }
};
dragDrop(cfg);
export { dragDrop as default };
