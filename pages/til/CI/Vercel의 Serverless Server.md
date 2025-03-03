
[https://vercel.com/blog/serverless-servers-node-js-with-in-function-concurrency-2MoEVmoCwraZoZC9t5HI59](https://vercel.com/blog/serverless-servers-node-js-with-in-function-concurrency-2MoEVmoCwraZoZC9t5HI59)


며칠전 Vercel에 글이 하나 올라왔습니다. 제목은 Serverless servers. 말이 웃깁니다. 오늘은 Vercel이 serverless의 치명적인 단점을 극복해낸 이야기를 적어볼까 합니다.


# Serverless 란?


Server + Less 의 합성어로, ’서버가 없다‘ 라고 이해됩니다. 뭐… 서버가 없는건 아닙니다. 단지 개발자가 서버를 직접 관리할 필요가 없는 아키텍쳐 입니다. 직접 관리할 필요가 없다라는 말은 스케일링에 크게 신경을 쓰지 않아도 된다라는 말입니다. 


예를 들어서 유저의 수가 1만명이 될 걸 예상하고 그 만큼의 유저 수를 감당할 수 있는 서버의 스팩을 대여/구매 했다면 실제 유저가 0명이든 1만명이든 같은 금액을 내야 합니다.  하지만 serverless는 동적으로 서버의 자원을 할당 합니다. 


유저가 서버에 요청을 보내면 serverless service는 해당 요청만을 위한 server instance를 생성하고 요청을 처리 했으면 해당 instance를 내립니다. 즉 리소스를 효율적으로 사용할 수 있기 때문에 경제적입니다. 또한 개발자는 스케일링 같은 것에 대해 신경 쓸 필요가 없어 비즈니스 로직에 집중하여 개발할 수 있습니다.


AWS Lambda, Azure Functions, Google Cloud Functions 와 같은 서비스들이 serverless 입니다.


# Serverless 의 단점


유저가 요청을 보내면 해당 요청만을 위한 server instance가 띄워집니다. 해당 instance에서 만약 외부 서버에서 데이터를 받아온다던지 DB query를 요청하고 받아오는 등 오래걸리는 I/O 작업을 하게 되면 해당 instance의 아무런 일도 하지 않고 응답만을 기다리는 상태가 됩니다. 여러 유저가 그러한 요청을 보내면 결국 아무런 일도 하지 않는 instance들이 여럿 떠있게 될 것 입니다. 즉 경제적으로나 리소스적으로나 비효율적 입니다. 


기존의 server 아키텍쳐에서는 이러한 상황에서 그냥 threads 를 여러개 생성해 처리한다거나 Node 같은 경우에는 기본적으로 concurrent 한 환경이기 때문에 걱정할 필요 없었습니다.


# Vercel’s in-function concurrency


Vercel 의 serverless 서비스는 Vercel Function이라고 불립니다. 예전에는 그냥 AWS Lambda의 wrapper 였습니다. 하지만 Lambda의 기술적 제약때문에 Vercel Function의 런터임을 Rust로 다시 만들었고 또한 이 과정에서 I/O 작업 때문에 놀고 있는 function instance들에게 새로운 유저의 요청을 처리하도록 할당함으로서 엄청난 “efficiency gains”을 이루었다고 합니다. 별도의 코드 수정없이 대략 한 50%정도 나아졌다고 합니다. 


네 최근 Next.js 의 행태 때문에 많은 Vercel haters들이 있는걸로 알고있습니다. 하지만 이번에 Vercel에서 발표한 in-function concurrency feature는 많은 사람들에게 thumbs up을 받고 있는걸로 보입니다. AWS도 자극을 받아서 해당 기능을 AWS Lambda에도 넣어주었으면 하는 바램입니다.


자세한 내용은 원글을 참고해보시고 [https://youtu.be/cY98nN8jwG8?si=GyMS4u5E8H8pQljO](https://youtu.be/cY98nN8jwG8?si=GyMS4u5E8H8pQljO) 이 영상도 도움이 됩니다.

