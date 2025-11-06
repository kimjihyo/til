# React와 Tree Shacking

## `import React from 'react'`가 번들사이즈를 증가시킬까

```js
// 1.
import React from "react";

React.useState();

// 2.
import { useState } from "react";

useState();
```

1번과 2번 코드를 각각 빌드해서 번들 사이즈를 비교하면 차이가 날까? 결론을 말하자면 나긴한다.

```bash
# 1.
dist/assets/index-CqEJfQO3.js   194.17 kB │ gzip: 61.02 kB

# 2.
dist/assets/index-BkkEujKN.js   194.05 kB │ gzip: 60.96 kB
```

0.07KB 정도 나는데, 이걸 난다고 말할 수 있을까? 그럼 왜 차이가 적을까? 직관적으로 봤을 때 1번 방식은 모든 React 모듈을 불러오는 것이고, 2번은 `useState` 훅 하나만 불러오는 것이라 번들 사이즈가 꽤 날 것 같다.

> ChatGPT: 0.07 KB 정도는 interop 래퍼/식별자 길이/압축 결과 차이 같은 미세한 노이즈 수준

## React는 CommonJS 패키지이다

```json
{
  "name": "react",
  "description": "React is a JavaScript library for building user interfaces.",
  "keywords": ["react"],
  "version": "19.2.0",
  "homepage": "https://react.dev/",
  "bugs": "https://github.com/facebook/react/issues",
  "license": "MIT",
  "files": [
    "LICENSE",
    "README.md",
    "index.js",
    "cjs/",
    "compiler-runtime.js",
    "jsx-runtime.js",
    "jsx-runtime.react-server.js",
    "jsx-dev-runtime.js",
    "jsx-dev-runtime.react-server.js",
    "react.react-server.js"
  ],
  "main": "index.js",
  "exports": {
    ".": {
      "react-server": "./react.react-server.js",
      "default": "./index.js"
    },
    "./package.json": "./package.json",
    "./jsx-runtime": {
      "react-server": "./jsx-runtime.react-server.js",
      "default": "./jsx-runtime.js"
    },
    "./jsx-dev-runtime": {
      "react-server": "./jsx-dev-runtime.react-server.js",
      "default": "./jsx-dev-runtime.js"
    },
    "./compiler-runtime": {
      "react-server": "./compiler-runtime.js",
      "default": "./compiler-runtime.js"
    }
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git",
    "directory": "packages/react"
  },
  "engines": {
    "node": ">=0.10.0"
  }
}
```

```js
"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/react.production.js");
} else {
  module.exports = require("./cjs/react.development.js");
}
```

빌드된 React의 `package.json`과 `index.js`를 확인해보면 알 수 있듯이 React 19.2 버전 기준으로 CommonJS 패키지임을 확인할 수 있다.

[[Tree Shacking - ESM vs. CJS]]에서 학습했듯이, CJS는 트리쉐이킹이 거의 불가능한 구조이다. 따라서 결국 모든 React 패키지가 번들에 포함되는 것이다.

## `import { useState } from 'react'` 가 더 선호되는 이유?

우선 예전에는 `import React from 'react'`가 필수였다. React API를 명시적으로 코드내에서 사용하지 않아도 적어야 했다. 그 이유는 JSX 문법이 내부적으로 `React.createElement`를 호출했기 때문이다.

```jsx
// 변환 전
const el = <div>Hello</div>;

// 뱐환 후
const el = React.createElement("div", null, "Hello");
```

React 17 버전 부터는 새로운 JSX transform 방식이 적용됐다.

```jsx
import { jsx as _jsx } from "react/jsx-runtime";

const el = _jsx("div", { children: "Hello" });
```

즉, JSX가 `react/jsx-runtime` 모듈을 직접 import하게 되었고, 더 이상 코드상에서 `React`이름을 참조하지 않게 됐다.

내 생각에는 두 방식 중 어떤걸 무조건 써야하는건 없는 것 같다. 번들 사이즈에 유의미한 차이를 주지 않으니... 그냥 코드 스타일 차이 정도로 볼 수 있을 것 같다.

개인적인 생각은 `import React from 'react'`가 더 좋다. 왜냐하면 시각적으로 내가 React API를 가져다 쓰는지 커스텀 훅이나 API를 가져다 쓰는지 구분이 되기 때문이다.

마치 큰 C++ 프로젝트에서는 `using namespace std;`가 권장되지 않는 것 처럼.
