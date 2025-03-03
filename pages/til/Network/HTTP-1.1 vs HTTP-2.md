
# TLDR;


|         | HTTP/1.1                    | HTTP/2                    |
| ------- | --------------------------- | ------------------------- |
| 표준 승인   | 1997.1                      | 2015.5                    |
| 처리 방식   | 하나씩 처리                      | 여러개 동시에 처리 (Multiplexing) |
| 데이터     | String                      | Binary                    |
| 헤더 정보   | 요청시 마다 쿠키를 포함하고 중복된 헤더 값 전송 | 헤더정보 HPACK 압축 전송          |
| 응답 우선순위 | 없음                          | 우선순위를 정할 수 있음             |
| 리소스 요청  | 클라이언트에서 요청                  | 서버가 클라이언트의 요청없이 보낼 수 있음   |


# HTTP란 무엇인가? 왜 HTTP/2가 HTTP/1.1보다 빠른가?


HTTP는 hypertext transfer protocol 의 약자이고 웹 어플리케이션의 기본이 되는 기술이다. 구체적으로는, HTTP는 클라이언트와 서버가 데이터를 요청하고 보내기 위해서 사용하는 방법이다. 예를 들어서 어느 한 사용자가 본인의 렙탑에서 [naver.com](http://naver.com/) 를 방문한다. 그러면 사용자의 웹 브라우저는 화면에 표시할 데이터들을 naver의 서버에 HTTP 요청을 보낸다. 그러면 naver의 서버는 텍스트와 이미지들을 포함한 HTTP 응답을 해당 브라우저로 보낸다. 우리가 사용하는 웹 브라우저에서 인터넷 주소 맨 앞에 들어가는 http:// 혹은 https:// 가 바로 이 프로토콜을 사용해서 정보를 교환하겠다는 표시인 것이다.


## HTTP/1.1이란 무엇인가?


최초 규격인 HTTP/0.9가 1991년에 나왔고 1996년에는 첫 상용화 버전인 HTTP/1.0이 발표되었다. 그리고 1999년에 HTTP/1.1이 발표되었다. 아직까지도 대부분의 웹 어플리케이션들은 HTTP/1.1을 사용하여 통신하고 있다.

- 데이터는 string으로 전송한다.
- 연결당 하나의 요청과 응답을 처리한다. 그래서 동시전송 문제와 다수의 리소스를 처리하기에 속도와 성능의 문제를 가지고 있다.
- 매 요청시 마다 쿠키 정보를 헤더에 포함시키고 중복된 헤더 값을 전송한다.

## HTTP/2


2015년에 HTTP/2가 개발되었다. HTTP/2 는 이전 버전에서 가지고 있는 몇몇의 문제들을 해결한다. 특히 HTTP/2 는 이전 버전과 비교해서 훨씬 빠르고 효율적이다. HTTP/2가 더 빠른 이유 중 하나는 로딩 프로세스 중에 콘텐츠의 우선순위를 지정하는 방법이다. 

- 데이터는 바이너리로 인코딩하여 압축해서 전송한다.
- Multiplexed streams 방식이 도입되어 한번의 연결으로 여러개의 메세지를 동시에 주고 받을 수 있다.
- Stream prioritizion으로 요청 리소스간 우선순위를 설정하여 응답을 빨리 받을 수 있다.
- Header compression: 헤더 정보를 HPACK 압축 방식을 이용하여 압축 전송한다.
- Server Push: 클라이언트 요청 없이 서버에서 리소스를 보내줄 수 있다.

## HTTP/2 Server Push


이 기능은 SSE(Server Sent Event)와는 다르다. HTTP/1.1에서는 클라이언트가 웹 페이지를 요청 하면 서버가 HTML을 응답할 때까지 기다린다. 서버에서 응답으로 받은 HTML을 브라우저가 파싱하여 추가적인 리소스들(Javascript, CSS 등)을 새롭게 서버로 요청을 보낸다. 이는 요청을 순차적으로 처리해야하기 때문에 레이턴시의 증가로 이어진다.


하지만 HTTP/2에서는 클라이언트가 웹 페이지를 서버에 요청을 하면 HTML파일 뿐만 아니라 추가적으로 필요한 리소스들을 같이 보내준다. 순차적으로 요청을 기다릴 필요없이 하나의 요청으로 필요한 리소스들을 응답받을 수 있어서 더욱 빠르다. 


참고한 글:


[https://www.cloudflare.com/learning/performance/http2-vs-http1.1/#:~:text=Multiplexing%3A HTTP%2F1.1 loads resources,resource blocks any other resource](https://www.cloudflare.com/learning/performance/http2-vs-http1.1/#:~:text=Multiplexing%3A%20HTTP%2F1.1%20loads%20resources,resource%20blocks%20any%20other%20resource).


[https://velog.io/@goblin820/HTTP-1.0-vs-HTTP-2.0](https://velog.io/@goblin820/HTTP-1.0-vs-HTTP-2.0)

