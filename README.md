# Drag-Drop (@peter.naydenov/drag-drop)

( IN A HEAVY DEVELOPMENT. IT'S NOT SAVE TO USE IN PRODUCTION )

Platform independent "drag and drop" module. It's a try to simplify and automate `drag and drop` functionality as it possible.

Minimal requirements for start a `drag-drop` is:
 - Drag nodes should have property draggable="true";
 - Define nodes that can become drop targets. Default style is `dropzone`;
 - Call dragDrop () function and your `drag and drop` is already works;
 
Module `drag-drop` has settings and hooks that can customize your `drag and drop` experience.









## Installation

### Node based project
Install `drag-drop` as a npm package:

```
npm i @peter.naydenov/drag-drop
```

Use package in javascript project:
```js
import dragDrop from '@peter.naydenov/drag-drop'
dragDrop ();
```



### UMD Module

Find the **UMD** module in "`/dist`" folder - */dist/drag-drop.umd.js*. Add link to your HTML code. Function `dragDrop()` is available as global variable.
```html
  <script src="/dist/drag-drop.umd.js"></script>
  <script>
      dragDrop ()
  </script>
```



### ES Module
Find the **ES** module in "`/dist`" folder - */dist/drag-drop.es.js*.  Add a script tag, import the module and use it.
```html
<script>
      import dragDrop from '/dist/drag-drop.es.js'
      dragDrop ()
</script>
```










## How to use it

When function `dragDrop()` is available for your project just call it: ` dragDrop()`. The function receives a configuration object as an argument but it is not required. By modifing configuration props and hooks you can modify the behaviour of the `drag-drop` module.

If you need to control a parameters of the the module during code execution, function will return a promise. Promise will resolve with the dragAPI object.

```js
const config = {
                  dropStyle : 'zones'
                , draggedTransperency : 0.3
          }
dragDrop ( config )
    .then ( dragAPI => {
                    // drag API is available. 
              })
```










## Configuration Object

Here is the configuration keys available and their default values. For keys that are not provided, `drag-drop` will use the default ones.

```js
  dropStyle            : 'dropzone'   // CSS class name for drop zones
, draggedTransperency  : 0.5          // Transperency of dragged DOM element
, activeZoneStyle      : 'actZone'    // Active drop zone style name.
, selectStyle          : 'dd-select'  // CSS class name for selected drag elements

, onStartDragging : f   // A hook. [function]
, onDrop          : f   // A hook. [function]
```









## Hooks
Hooks are function placeholders in configuration object. If they are defined, default behaviour on the event will be overwritten with the hooks. List of available hooks:
```js
   onStartDragging : 'Define what to happen on start dragging'
 , onDrop          : 'Define what should happen on dropping in a drop-zone'
 , onDropOut       : 'Define what should happen on dropping outside of the drop-zones'
```

Content of default hooks is available in `src/hooks` folder. Feel free to use this code as starting point of your custom hooks.










## Drag-drop API

Simpler way to use `drag-drop` is just to call a dragDrop function.

```js
 dragDrop ( config )
```

Function call returns a promise. Methods are coming as result of this promise:
```js
 let dragControl;
 dragDrop ( config )
    .then ( api => dragControl = api )
```

Here is the list of methods provided in `drag-drop` api:
```js
{
  changeConfig   // Change configuration
, destroy       // Remove 'drag-drop' from the memory.
, disable       // Disable 'drag-drop' for a while
, enable        // Enable 'drag-drop' 
}
```


## Questions and Answers

1. **Can I create custom drag object**?
    - Yes. Take a look at hook `onStartDragging`. Event argument contains property `dataTransfer`. By using `event.dataTransfer.setData ()` you can set your drag object to whatever you want. For more information you can read [the official documentation](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData);

2. **Is it possible to drag multiple items**?
    - Yes. With module `drag-drop` is possible to select multiple items from different containers. Drag a already selected item will keep the selection available during `drop` event. The hook `onDrop` will take care of the result of `drag and drop`. The hook receives parameters like **selection** and **log** that can be used in customized hooks.





## Release History


### 0.2.0 (2021-07-15 )
- [x] Hook 'onDrop' has a new argument "dragOffset". It is an object with X and Y coordinates and represents position of the mouse during drag event from top-left corner of the dragged object;
- [x] Filter draggable elements on class name; 

### 0.1.0 (2021-07-13 )
- [x] New hook - onDropOut. When drop is out of drop zones.
- [x] Fix: Dropzones. You can drop even on top of other child elements;

### 0.0.1 (2021-07-12 )
- [x] Starting
- [ ] Dropzones definition is wrong;