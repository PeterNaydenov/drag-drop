var __defProp=Object.defineProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,n)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,__spreadValues=(e,t)=>{for(var n in t||(t={}))__hasOwnProp.call(t,n)&&__defNormalProp(e,n,t[n]);if(__getOwnPropSymbols)for(var n of __getOwnPropSymbols(t))__propIsEnum.call(t,n)&&__defNormalProp(e,n,t[n]);return e};!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).dragDrop=t()}(this,(function(){"use strict";function e(){let e,n;const o=new Promise(((t,o)=>{e=t,n=o}));return{promise:o,done:e,cancel:n,onComplete:t(o)}}function t(e){return function(t){e.then((e=>t(e)))}}const n=function(n){let o,a=!1;n?(o=function(n){let o=n.map((t=>e())),a=o.map((e=>e.promise));return o.promises=a,o.onComplete=t(Promise.all(a)),o}(n),a=!0):o=e();return o.timeout=function(e,n){let o;o=e?Promise.all(n.promises):n.promise;return function(e,a){let s,r=new Promise(((t,n)=>{s=setTimeout((()=>{t(a),Promise.resolve(o)}),e)}));return o.then((()=>clearTimeout(s))),n.onComplete=t(Promise.race([o,r])),n}}(a,o),o},o={_setTransitions:function(){return function(e,t){let n={},o={},a={};return e.forEach((e=>{const[s,r,i,c,d]=e,l=t[c],u=`${s}/${r}`;n[u]=l||null,o[u]=i,function(e){return e instanceof Array&&(2==e.length&&(e.forEach((e=>{if(!1!==e||"string"!=typeof e)return!1})),!0))}(d)&&(a[u]=[],a[u][0]=d[0],a[u][1]=d[1])})),{transitions:n,nextState:o,chainActions:a}}},_updateStep:function(e){return function(t,n,o){const a=e.askForPromise(),s=`${e.state}/${n}`,r=e.callback;e.lock=!0,e._transit(a,s,o),a.onComplete((n=>{let o=e._getChain(e.chainActions,s),a=n.response;if(n.success){if(e.state=e.nextState[s],n.stateData&&(e.stateData=n.stateData),r.positive.forEach((t=>t(e.state,a))),r.transition.forEach((t=>t(e.state,a))),o&&o[0])return void e._updateStep(t,o[0],a)}else if(r.negative.forEach((t=>t(e.state,a))),r.transition.forEach((t=>t(e.state,a))),o&&o[1])return void e._updateStep(t,o[1],a);n.command?e._updateStep(t,n.command,a):t.done(a)})),a.promise.catch((()=>console.log(`Failed in step ${s}`)))}},_warn:function(e){return function(e){Object.keys(e).forEach((t=>{null==e[t]&&console.log(`Warning: Transition for ${t} is not defined`)}))}},_transit:function(e){return function(t,n,o){const a=e.dependencies,s=__spreadValues({},e.stateData),r=e.transitions[n];"function"==typeof r?r(t,a,s,o):t.done({success:!1})}},_getChain:function(){return function(e,t){return!!e[t]&&e[t]}},_triggerCacheUpdate:function(e){return function(){if(0!==e.cache.length){const{updateTask:t,action:n,dt:o}=e.cache[0];e.cache=e.cache.reduce(((e,t,n)=>(0!=n&&e.push(t),e)),[]),e._updateStep(t,n,o),t.onComplete((t=>e._onUpdateTask(t)))}}},_onUpdateTask:function(e){return function(t){const n=e.callback,o=e.askForPromise(n.update);n.update.forEach(((n,a)=>{n(e.state,t),o[a].done()})),o.onComplete((t=>{e.lock=!1,e._triggerCacheUpdate()}))}},setDependencies:function(e){return function(t){e.dependencies=__spreadValues(__spreadValues({},e.dependencies),t)}},on:function(e){return function(t,n){const o=e.callback;o[t]&&o[t].push(n)}},off:function(e){return function(t){e.callback[t]&&(e.callback[t]=[])}},importState:function(e){return function({state:t,stateData:n}){t&&(e.state=t,e.stateData=__spreadValues({},n))}},exportState:function(e){return function(){return{state:e.state,stateData:__spreadValues({},e.stateData)}}},update:function(e){return function(t,n){const o=e.askForPromise();return e.lock?(e.cache.push({updateTask:o,action:t,dt:n}),o.promise):(e._updateStep(o,t,n),o.onComplete((t=>e._onUpdateTask(t))),o.promise)}},reset:function(e){return function(){e.state=e.initialState,e.stateData=e.initialStateData}},ignoreCachedUpdates:function(e){return function(){e.cache.forEach((({updateTask:e,action:t,dt:n})=>e.cancel(`Action '${t}' was ignored`))),e.cache=[]}},getState:function(e){return function(){return e.state}}};var a=function({init:e,table:t,stateData:a,debug:s},r={}){const i=this,c=Object.keys(o);i.state=e||"N/A",i.initialState=e||"N/A",i.lock=!1,i.cache=[],i.askForPromise=n,i.stateData=__spreadValues({},a),i.initialStateData=__spreadValues({},a),i.dependencies={},i.callback={update:[],transition:[],positive:[],negative:[]},c.forEach((e=>i[e]=o[e](i)));const{transitions:d,nextState:l,chainActions:u}=i._setTransitions(t,r);s&&i._warn(d),i.transitions=d,i.nextState=l,i.chainActions=u};function s(e){return{mouseDown:t=>{t.target.draggable||e.update("select",{event:t})},mouseUp:t=>{t.target.draggable?t.altKey?e.update("removeItem",{event:t}):t.shiftKey?e.update("addItem",{event:t}):e.update("newSelection",{event:t}):e.update("end",{event:t})},mouseMove:t=>e.update("move",{event:t}),dragStart:t=>e.update("drag",{event:t}),dragEnd:t=>{e.ignoreCachedUpdates(),e.update("end",{event:t})},dragOver:e=>e.preventDefault(),dragEnter:t=>e.update("move",{event:t}),drop:t=>e.update("drop",{event:t})}}const r={minMax:function({startX:e,startY:t,newX:n,newY:o}){return{xMin:Math.min(e,n),xMax:Math.max(e,n),yMin:Math.min(t,o),yMax:Math.max(t,o)}},updateSelection:function(e,t){const{xMin:n,xMax:o,yMin:a,yMax:s}=e;t.style.left=`${n}px`,t.style.top=`${a}px`,t.style.width=o-n+"px",t.style.height=s-a+"px"},drawSelection:function(e,t){let n;return t?(n=t,n.style.visibility="visible"):(n=document.createElement("div"),n.style.position="absolute",n.style.border="1px dotted #333",document.getElementsByTagName("body")[0].appendChild(n)),n.style.left=`${e.clientX}px`,n.style.top=`${e.clientY}px`,n.style.width="20px",n.style.height="20px",n},targetList:function(e){return function(){let t=document.querySelectorAll("[draggable]"),n=[];return t.forEach((t=>{t.parentNode==e&&n.push(t)})),n}},findDropZone:function e(t,n){return t!==document&&("BODY"!=t.tagName&&(t.classList.contains(n)?t:e(t.parentNode,n)))},getEventFunctions:s};const i={onDrop:function({event:e,dropZone:t,dragged:n,selection:o,log:a,dragOffset:s}){o.forEach((e=>{e.parentNode.removeChild(e),t.appendChild(e)})),n.style=""},onStartDragging:function({event:e,selection:t,draggedTransperency:n,selectStyle:o}){t.forEach((e=>{e.style.opacity=n,e.classList.add(o)}))},onDropOut:function({event:e,dropZone:t,dragged:n,selection:o,log:a,dragOffset:s}){console.log("DROP OUT")}},c={init:"none",table:[["none","start","wait","setConfig",["start",!1]],["wait","start","ready","start"],["ready","addItem","ready","addSingleItem"],["ready","newSelection","ready","replaceSelection"],["ready","removeItem","ready","removeSingleItem"],["ready","select","inSelect","startSelection"],["inSelect","move","inSelect","changeSelection"],["inSelect","end","ready","endSelection"],["ready","drag","inDrag","startDragging"],["inDrag","end","ready","endDragging"],["inDrag","move","inDrag","changeDragZone"],["inDrag","drop","inDrag","drop"],["ready","disable","off","disable"],["off","enable","ready","enable"],["off","changeConfig","off","setConfig"],["ready","changeConfig","ready","setConfig"],["ready","destroy","end","destroy"],["off","destroy","end","destroy"]],stateData:{dropStyle:"dropzone",selectStyle:"dd-select",filter:!1,draggedTransperency:.5,selection:[],dragged:null,activeDropZone:null,activeZoneStyle:"actZone",selectDraw:null,mouseSelection:!1,hasDrop:!1,dragOffset:null,startX:0,startY:0,newX:!1,newY:!1}};const d={start:function(e,t,n,o){let{eFn:a}=t;document.addEventListener("mousedown",a.mouseDown),document.addEventListener("mousemove",a.mouseMove),document.addEventListener("mouseup",a.mouseUp),document.addEventListener("dragstart",a.dragStart),document.addEventListener("dragend",a.dragEnd),document.addEventListener("dragover",a.dragOver),document.addEventListener("dragenter",a.dragEnter),document.addEventListener("drop",a.drop),e.done({success:!0,response:o})},startSelection:function(e,t,n,o){const{event:a}=o,{fn:s}=t,{selectDraw:r}=n;a.preventDefault(),n.selectDraw=s.drawSelection(a,r),n.mouseSelection=!0,n.startX=a.clientX,n.startY=a.clientY,e.done({success:!0,stateData:n})},changeSelection:function(e,t,n,o){let{mouseSelection:a,selectDraw:s,startX:r,startY:i}=n,{event:c}=o,{fn:d}=t;if(!a)return void e.done({success:!1});c.preventDefault();let l=c.clientX,u=c.clientY;d.updateSelection(d.minMax({startX:r,startY:i,newX:l,newY:u}),s),n.newX=l,n.newY=u,e.done({success:!0,stateData:n})},endSelection:function(e,t,n,o){let{event:a}=o,{fn:s}=t,{startX:r,startY:i,newX:c,newY:d,selectDraw:l,selectStyle:u,filter:p}=n,f=[],g="new";if(a.preventDefault(),l.style.visibility="hidden",!c)return n.selection.forEach((e=>e.classList.remove(u))),n.selection=[],void e.done({success:!0,stateData:n});a.altKey&&(g="reduce"),a.shiftKey&&(g="expand"),"expand"!==g&&n.selection.forEach((e=>e.classList.remove(u)));let{xMin:m,xMax:y,yMin:v,yMax:h}=s.minMax({startX:r,startY:i,newX:c,newY:d}),D=document.querySelectorAll("[draggable]"),S=[];switch(p?D.forEach((e=>{e.classList.contains(p)&&S.push(e)})):D.forEach((e=>S.push(e))),S.forEach((e=>{let t=!0;if(t&&(t=e.offsetLeft>m),t&&(t=e.offsetTop>v),t){t=e.offsetLeft+e.clientWidth<y}if(t){t=e.offsetTop+e.clientHeight<h}t&&f.push(e)})),g){case"new":n.selection=f.map((e=>(e.classList.add(u),e)));break;case"expand":n.selection=f.reduce(((e,t)=>(e.includes(t)||(e.push(t),t.classList.add(u)),e)),n.selection);break;case"reduce":n.selection=n.selection.reduce(((e,t)=>(f.includes(t)||(e.push(t),t.classList.add(u)),e)),[])}n.mouseSelection=!1,n.newX=!1,n.newY=!1,e.done({success:!0,stateData:n})},addSingleItem:function(e,t,n,o){let{event:a}=o,s=a.target,{selection:r,selectStyle:i,filter:c}=n,d=r.includes(s),l=!0;c&&(l=s.classList.contains(c)),!d&&l&&(r.push(s),s.classList.add(i)),e.done({success:!0,stateData:n})},removeSingleItem:function(e,t,n,o){let{event:a}=o,s=a.target,{selection:r,selectStyle:i}=n;n.selection=r.reduce(((e,t)=>(t!=s?e.push(t):t.classList.remove(i),e)),[]),e.done({success:!0,stateData:n})},replaceSelection:function(e,t,n,o){let{event:a}=o,{selectStyle:s,filter:r}=n,i=a.target,c=!0;r&&(c=i.classList.contains(r)),c?(n.selection.forEach((e=>e.classList.remove(s))),i.classList.add(s),n.selection=[i],e.done({success:!0,stateData:n})):e.done({success:!1})},startDragging:function(e,t,n,o){let{event:a}=o,{target:s}=a,{draggedTransperency:r,selection:i,selectStyle:c,dropStyle:d,filter:l}=n,{hooks:u,fn:p}=t,f=!0;l&&(f=s.classList.contains(l)),f?(0===i.length&&(i=[s]),u.onStartDragging({event:a,selection:i,draggedTransperency:r,selectStyle:c}),n.dragged=s,n.dragOffset={x:a.offsetX,y:a.offsetY},n.selection=i,n.activeDropZone=p.findDropZone(s,d),e.done({success:!0,stateData:n})):e.done({success:!1})},changeDragZone:function(e,t,n,o){let{event:a}=o,{fn:s}=t,{activeDropZone:r,dragged:i,activeZoneStyle:c,dropStyle:d}=n,l=!1;if(i.parentNode!==a.target.parentNode){if(l=s.findDropZone(a.target,d),l)return l?(r.classList.remove(c),l.classList.add(c),n.activeDropZone=l,void e.done({success:!0,stateData:n})):void e.done({success:!1});e.done({success:!1})}else e.done({success:!0})},endDragging:function(e,t,n,o){let{hooks:a,fn:s}=t,{activeDropZone:r,activeZoneStyle:i,dragged:c,selection:d,selectStyle:l,hasDrop:u}=n,{event:p}=o,f=[];if(!u){let e=!1;d.forEach((e=>{let t=s.targetList(e.parentNode),n={source:e.parentNode,target:!1,el:e,sourceList:t};f.push(n)})),a.onDropOut({event:p,dropZone:e,dragged:c,selection:d,log:f})}r.classList.remove(i),d.forEach((e=>{e.classList.remove(l),e.style.opacity="",e.style[0]||e.removeAttribute("style")})),n.activeDropZone=null,n.selection=[],n.hasDrop=!1,e.done({success:!0,stateData:n})},drop:function(e,t,n,o){let{event:a}=o,{activeDropZone:s,dragged:r,selection:i,dropStyle:c,dragOffset:d}=n,{hooks:l,fn:u}=t,p=[],f=u.targetList(a.target),g=u.findDropZone(a.target,c);a.preventDefault(),g==s&&(i.forEach((e=>{let t=u.targetList(e.parentNode),n={source:e.parentNode,target:g,el:e,targetList:f,sourceList:t};p.push(n)})),l.onDrop({event:a,dropZone:g,dragged:r,selection:i,log:p,dragOffset:d}),n.hasDrop=!0),n.dragOffset=null,e.done({success:!0,stateData:n})},destroy:function(e,t,n,o){let{eFn:a}=t;document.removeEventListener("mousedown",a.mouseDown),document.removeEventListener("mousemove",a.mouseMove),document.removeEventListener("mouseup",a.mouseUp),document.removeEventListener("dragstart",a.dragStart),document.removeEventListener("dragend",a.dragEnd),document.removeEventListener("dragover",a.dragOver),document.removeEventListener("dragenter",a.dragEnter),document.removeEventListener("drop",a.drop),e.done({success:!0})},setConfig:function(e,t,n,o={}){let{hooks:a,config:s}=o;a||(a={}),s||(s={}),s.onStartDragging&&(a.onStartDragging=s.onStartDragging),s.onDrop&&(a.onDrop=s.onDrop),s.dropStyle&&"string"==typeof s.dropStyle&&(n.dropStyle=s.dropStyle),s.draggedTransperency&&"number"==typeof s.draggedTransperency&&(n.draggedTransperency=s.draggedTransperency),s.activeZoneStyle&&"string"==typeof s.activeZoneStyle&&(n.activeZoneStyle=s.activeZoneStyle),s.selectStyle&&"string"==typeof s.selectStyle&&(n.selectStyle=s.selectStyle),s.filter&&"string"==typeof s.filter&&(n.filter=s.filter),e.done({success:!0,stateData:n,response:a})},disable:function(e,t,n,o){e.done({success:!0})},enable:function(e,t,n,o){e.don({success:!0})}};return function(e){const t=new a(c,d),n=s(t),o=t.askForPromise;return t.setDependencies({eFn:n,fn:r,askForPromise:o}),t.update("start",{config:e,hooks:i}).then((e=>t.setDependencies({hooks:e}))).then((()=>({changeConfig:e=>{t.update("changeConfig",{hooks:i,config:e}).then((e=>t.setDependencies({hooks:e})))},destroy:()=>t.update("destroy"),disable:()=>t.update("disable"),enable:()=>t.update("enable")})))}}));
