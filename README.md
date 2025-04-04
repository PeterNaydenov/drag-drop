# Drag-Drop (@peter.naydenov/drag-drop)
( IN A HEAVY DEVELOPMENT. IT'S NOT SAVE TO USE IN PRODUCTION )

![version](https://img.shields.io/github/package-json/v/peterNaydenov/drag-drop)
![license](https://img.shields.io/github/license/peterNaydenov/drag-drop)
![GitHub issues](https://img.shields.io/github/issues-raw/peterNaydenov/drag-drop)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40peter.naydenov%2Fdrag-drop)

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
, dependencies         : {} // Object will be available as prop in the hook functions. Available after version 0.4.0

, onStartDragging : f   // A hook. [function]
, onDrop          : f   // A hook. [function]
, ignoreSelect    : f   // Control places where you can start dragging a selection.
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



## External Links
- [History of changes](https://github.com/PeterNaydenov/drag-drop/Changelog.md)


## Credits
`Drag-drop` was created by Peter Naydenov


## License
`Drag-drop` is released under the [MIT license](./LICENSE)