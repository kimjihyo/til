
### 시작하기에 앞서…


나는 꽤 오랫동안 Visual Studio Code 를 사용해왔지만 tasks.json 과 launch.json 이 뭐하는 녀석들인지 잘 모르고 있었다. 이번에 윈도우에서 VSCode로 C++ 개발하기 위해 세팅하면서 알게된 내용을 정리해 보려고 한다.


### Task 란 무엇인가?


우리가 VSCode에서 작성한 소스코드를 가지고 컴파일, 빌드. 린트. 패키징, 테스트 등등을 하려면 외부의 프로그램과 연동이 되어야한다. Linux 환경에서 C++을 컴파일 하는걸 예시로 들자면, VSCode에서 C++ 코드를 작성하고, GCC 라는 컴파일러 (외부 프로그램)로 컴파일 과 빌드를 해야한다. 이때 이 외부 프로그램과 VSCode 와의 연동을 쉽게 해주는게 Task 이다.


언어 별로 빌드와 디버깅 같은 기본 Task들이 정의 되어 있다.  Javascript 의 기본 tasks 중에서 build 는 아래와 같이 정의 되어 있다.


```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "JS Run",
            "type": "shell",
            "command": "node",
            "args": [
                "${file}"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```


Tasks의 속성들은 아래와 같은 의미를 가지고 있다.

- **label**: 해당 Task 의 이름
- **type**: 해당 Task의 타입. `shell`  또는 `process` 이다. type 이 `shell` 이라면, command 속성을 쉘 커멘드로 해석하고, `process` 이면 command 속성은 실행할 process 명으로 해석한다.
- **command**: 실제로 실행할 커맨드
- **args**: command 와 함께 사용될 argument 들
- **group**: 헤딩 Task 가 어떤 그룹에 속할지 정의한다. 예를들어 build 그룹에 속해있으면, 해당 task 는 **Run Build Task** 를 통해서 실행이 가능하다.
- **optons**: 기본 `cwd`(current working directory), `env` (environment variables), `shell` (default shell) 을 오버라이드 한다. Options 는 task 별로 설정될 수도 있으나, 글로벌하게 혹은 플랫폼 별로도 설정할 수 있다.

아래는 VSCode 에서 C++ 코드를 빌드 하기 위한 Custom Tasks 다.


```json
{
  "version": "2.0.0",
  "windows": {
    "options": {
      "shell": {
        "executable": "cmd.exe",
        "args": [
          "/C",
          // The path to VsDevCmd.bat depends on the version of Visual Studio you have installed.
          "\"C:/Program Files (x86)/Microsoft Visual Studio/2019/Community/Common7/Tools/VsDevCmd.bat\"",
          "&&"
        ]
      }
    }
  },
  "tasks": [
    {
      "type": "shell",
      "label": "cl.exe build active file",
      "command": "cl.exe",
      "args": [
        "/Zi",
        "/EHsc",
        "/Fe:",
        "${fileDirname}\\${fileBasenameNoExtension}.exe",
        "${file}"
      ],
      "problemMatcher": ["$msCompile"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

