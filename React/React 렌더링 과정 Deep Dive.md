
[https://pomb.us/build-your-own-react/](https://pomb.us/build-your-own-react/)


[https://incepter.github.io/how-react-works/docs/react-dom/how.rendering_components.works](https://incepter.github.io/how-react-works/docs/react-dom/how.rendering_components.works)


```scss
JSX → React.createElement()
     ↓
React Element Tree
     ↓
Fiber Root + Initial Work Loop
     ↓
beginWork()   ←── 🔍 Fiber comparison (reconciliation) happens here
    └─ Calls your components
    └─ Compares new elements with old fiber tree
    └─ Builds or reuses child fibers
     ↓
completeWork()
     ↓
commitRoot() → DOM updated
```

