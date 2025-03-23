
# pnpm은 무엇이 다른가


많은 사람들이 기본 노드 패키지 매니저 툴인 npm을 사용하다가 yarn으로 넘어갔다. 그런데 제작년 부터인가? pnpm 사용자들이 많이 보이기 시작했다. 특히나 monorepo로 프로젝트 관리하는게 인기가 되면서 pnpm도 같이 인기를 얻은게 아닌가 싶다. 


개인적으로는 pnpm을 한번도 사용해본적이 없어 이번에 pnpm의 속도는 어떤지, 어떤 다른 특별한 기능을 제공하는지 살펴보려고 한다.


## 기능 비교


### Workspace Support


Workspace란 1개 이상의 app과 package로 구성된 것을 말한다. app은 next.js 와 express.js 같은 배포 가능한 프로젝트들을 말하고 package는 app들에서 사용되는 재사용 가능한 컴포넌트들이나 라이브러리들을 말한다.


pnpm, yarn, 그리고 npm 모두 Workspace를 지원해 여러 패키지들을 하나의 모노레포(monorepo)에서 관리할 수 있다.


### Isolated `node_modules`


pnpm에서는 기본적으로 각 app과 package들은 자체 node_modules를 가진다. 이는 의존성 충돌을 방지하고 선언된 패키지 끼리만 접근할 수 있다.


npm과 yarn도 isolated node_modules를 지원하지만 기본값은 아니다.


### Hoisted `node_modules`


npm은 기본적으로 dependencies를 root node_modules로 올리는(hoisting) 방식을 사용한다. pnpm과 yarn도 지원하지만, 기본적으로 hoisting을 하지 않도록 설정되어 있다.


Hoisted node_modules의 장점으로는 dependencies를 재사용함으로써 중복 설치를 방지할 수 있다. 모든 패키지가 root node_modules에 있는 dependency를 바로 import 할 수 있어서 접근이 쉽다.


단점으로는 선언되지 않은 dependencies를 사용할 위험이 있고, 충돌 발생 가능성이 높아진다.


### peerDependencies 자동 설치


peerDependencies란 자동으로 설치되지 않고 호스트 프로젝트에서 특정 버전의 dependency를 직접 설치해 제공해야 함을 나타내는 설정이다. peerDependencies가 필요한 이유는 dependency의 중복 설치 미 버전 충돌을 방지하고 호스트 프로젝트가 특정 라이브러리와 함께 동작하도록 강제하기 위해 사용된다. 


pnpm과 npm은 peerDependencies를 자동으로 설치해주지만 yarn은 수동으로 설치해야한다.


### Managing Node.js versions


pnpm은 Node.js 버전관리를 기본적으로 지원하지만 npm과 yarn은 nvm과 같은 별도 패키지를 설치해서 사용해야한다.


### Content-addressable storage


pnpm은 모든 패키지를 전역 저장소에 보관하고 심볼릭 링크를 사용하여 프로젝트에 연결한다. 


Linux/macOS: `~/.pnpm-store`


Windows: `C:\Users\<username>\.pnpm-store`


위와 같은 위치에서 패키지들이 전역적으로 한번 설치되며 각 프로젝트들은 심볼링 링크로 참조한다. 이는 디스크 공간을 절약하고 패키지 설치 속도를 훨씬 증가시킨다.


### Side-effects cache


pnpm은 패키지 빌드 결과 (side-effect)를 캐시하여 이후 설치 속도를 향상시킨다. npm과 yarn은 기본적으로 이 기능을 제공하지 않는다.


많은 npm 패키지들은 post-install 스크립트를 사용하여 코드를 컴파일하거나, 셋업 테스크들을 수행한다. 예를 들면 `bcrypt`나 `sqllite3`같은 패키지들은 C++ 애드온들을 컴파일한다. 이 컴파일은 패키지를 설치할때 마다 수행된다. 같은 버전의 패키지를 설치하더라도 컴파일 된다.


pnpm은 이러한 side-effects (post-installs)를 캐시하여 패키지 설치속도를 많이 개선한다. 예를 들면 side-effects cache 없이 bcrypt의 설치/컴파일 속도는 30-60초 정도 소요되지만 pnpm의 side-effects cache과 함께라면 1-2초 정도 밖에 안걸린다. 

