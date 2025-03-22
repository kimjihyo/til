
DB Transaction Isolation Level이란 동시에 여러 db transaction들이 처리될때 특정 transaction이 다른 transaction을 변경하거나 조회하는 데이터를 볼 수 있도록 허용할지 말지를 결정하는 것.


transation을 isolate 하는 이유는 DB의 데이터가 contend 되는 상황에서 synchronization을 유지하기 위함이다. 


하지만 transation isolation level이 너무 높아지면 syncronization은 화실히 보장되겠지만, concurrent 처리에 대한 성능이 감소하고, deadlock이 발생할 확률이 높아지고, lock 으로 인한 시스템 overhead가 증가한다.


Transaction Iolation Level 종류

- Read Uncommitted
    - transaction의 commit 이나 rollback에 상관없이 데이터 변경 내용을 다른 transaction이 읽는 것을 허용하는 것.
- Read Committed
    - transaction이 commit 이나 rollback으로 완료되면 다른 transaction에서 데이터를 읽기/쓰기가 가능함 하지만 non-repeatable read가 발생할 수 있다. (같은 select query의 결과가 한 transaction 내에서 일정하지 않을 수 있다는 말)
- Repeatable Read
    - transaction 내에서 조회한 내용이 항상 동일함을 보장함
    - MVCC(Multiversion Concurrency Control)로 구현이 될 수 있음
    - Phantom Read가 발생할 수 있음 (다른 transaction에서 수행한 변경 작업에 의해 record가 보였다가 안 보였다가 하는 현상 예를 들어 select … where … 을 했을 떄 해당 조건을 만족하는 새로운 row가 추가되었을 떄)
- Serializable
    - 한 transaction에서 읽고 쓰는 record는 다른 transation에서는 절대 접근할 수 있음.  → phantom read조차 안일어난다.
