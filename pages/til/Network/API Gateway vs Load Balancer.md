
시스템 디자인 인터뷰 질문들 중 가장 많이 질문되는 것중 하나인 API Gateway 와 Load Balancer 의 차이이다. 


로드밸런서와 API 게이트웨이 모두 웹 서비스와 네트워크 인프라에 있어서 매우 중요한 두 요소이다. 두 개 모두 트래픽을 관리하고 최적화하는데에 매우 중요한 역할을 하지만 목적은 다르다.


# TLDR;


한마디로 정리해서 로드벨런서는 한 서비스의 여러 인스턴스들에게 고르게 트래픽을 분산시키는 역할을 하고 API 게이트웨이는 요청에 따라서 여러개의 서비스들중 어느 서비스로 라우팅 시킬지 결정해주는 역할을 한다.


# API 게이트웨이


API 게이트웨이는 클라이언트와 서버(혹은 리소스) 중간에 앉아 미들웨어로서 역할한다. 다양한 서버의 엔드포인트들과 기능들의 중앙화된 엔트리 포인트를 제공한다.

- API Management
	- Authentication, authorization, rate limiting, caching 같은 기능들을 제공한다.
- Protocol Transformation
	- 클라이언트가 벡엔드 서비스들과 다른 프로토콜과 메시지 포멧으로 소통할 수 있게한다.
- Routing and Versioning
	- 클라이언트의 요청을 알맞는 벡엔드 서비스로 라우팅 해준다.
- Analytics and Monitoring
	- API 사용량, 성능 메트릭스, 에러 트래킹 같은 기능을 제공한다.

AWS로 예를 들자면, Lambda로 구성된 여러개의 마이크로 서비스들이 있을 수 있겠고 API Gateway를 앞단에 두어서 알맞는 lambda function으로 routing 하게 시킬 수 있다.


# 로드벨런서 


로드벨런서는 트레픽을 여러개의 인스턴스들에게 트래픽을 분산시키는 역할을 한다. 로드벨런스를 사용함으로서 리소스 사용을 최적화시키고 가용성을 증가시키고 퍼포먼스를 향상시킬 수 있다.

- Traffic Distribution
	- round-robin, least connections 또는 weighted distribution 같은 알고리즘을 사용하여 트레픽을 분산 시킬 수 있다.
- High Availability
	- 너무 바빠서 오버로드됐거나 다운이된 인스턴스들에게는 트래픽을 보내지 않음으로서 가용성을 높힐 수 있다.
- Session Persistence
	- 세션 상태를 유지하는게 중요한 상황에선 로드벨런서가 같은 클라이언트 요청은 같은 벡엔드 서버로 요청을 라우팅시킨다.
- SSL Termination
	- SSL/TLS encryption 과 decryption도 제공한다.

참고:

- [https://dev.to/somadevtoo/difference-between-api-gateway-and-load-balancer-in-system-design-54dd](https://dev.to/somadevtoo/difference-between-api-gateway-and-load-balancer-in-system-design-54dd)
