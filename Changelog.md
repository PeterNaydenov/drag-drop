## Release History

### 0.4.3 ( 2023-09-18 )
- [x] Dependency update: @peter.naydenov/fsm v.5.1.0;

### 0.4.0 (2021-09-03)
- [x] Config object was extended with 'dependencies'. The object will be injected and available to hook functions;

### 0.3.3 (2021-08-18)
- [x] Fix: Hook 'onDropOut' doesn't work;

### 0.3.2 (2021-07-29)
- [x] Fix: JS error if drag container is not a drop-zone.
- [ ] Error: Hook 'onDropOut' doesn't work;

### 0.3.1 (2021-07-29)
- [] Error: broken build

### 0.3.0 (2021-07-26)
- [x] Config contains a property `ignoreSelect`. It's a function that receive "event" as a argument and should return boolean (true/false). The function `ignoreSelect` control places where you can start dragging selection.
- [ ] Error: JS error if drag container is not a drop-zone.
- [ ] Error: Hook 'onDropOut' doesn't work;

### 0.2.0 (2021-07-15 )
- [x] Hook 'onDrop' has a new argument "dragOffset". It is an object with X and Y coordinates and represents position of the mouse during drag event from top-left corner of the dragged object;
- [x] Filter draggable elements on class name; 
- [ ] Error: JS error if drag container is not a drop-zone.
- [ ] Error: Hook 'onDropOut' doesn't work;

### 0.1.0 (2021-07-13 )
- [x] New hook - onDropOut. When drop is out of drop zones.
- [x] Fix: Dropzones. You can drop even on top of other child elements;
- [ ] Error: JS error if drag container is not a drop-zone.
- [ ] Error: Hook 'onDropOut' doesn't work;

### 0.0.1 (2021-07-12 )
- [x] Starting
- [ ] Dropzones definition is wrong;
- [ ] Error: JS error if drag container is not a drop-zone.