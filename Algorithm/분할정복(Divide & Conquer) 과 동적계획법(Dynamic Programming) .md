
# 분할 정복 이란 ?


분할 정복(Divide & Conquer)은 가장 유명한 알고리즘 설계 기법 중 하나로,둘 이상의 부분 문제로 나눈 뒤 각 문제에 대한 답을 재귀 호출을 이용해 계산하고, 각 부분 문제의 답으로 부터 전체 문제의 답을 계산한다.


## 분할 정복의 과정

1. Divide: 문제를 더 작은 문제로 분할
2. Merge: 각 문제에 대해 구한 답을 원래 문제에 대한 답으로 병합
3. Conquer: 더 이상 답을 분할하지 않고 곧장 풀 수 있는 매우 작은 문제

## 대표적인 예시

- 병합정렬(Merge Sort)
- 퀵정렬(Quick Sort)
- 별찍기 - 10

[bookmark](https://www.acmicpc.net/problem/2447)


# 동적 계획법(Dynamic Programming) 이란?


동적 계획법은 복잡한 문제를 더 작은 하위 문제로 나누어 해결하는 알고리즘 설계 기법이다. 동적 계획법은 중복되는 계산 결과를 저장하는 메모리 기법인 메모이제이션을 사용한다. 이를 통해 이전에 계산한 값을 캐시하고, 다시 필요할 때 해당 값을 가져와 재사용한다. 


# 분할 정복과 동적 계획법의 차이는?


둘의 공통점은 큰 문제를 작은 문제로 나눌 수 있고, 작은 문제의 답을 모아서 큰 문제를 해결하는 상황에 사용가능하단 점이다.


하지만 둘의 차이점은 **부분 문제의 중복** 이다.

- 동적 계획법
    - 부분 문제는 중복되어, 상위 문제 해결시 재활용 된다.
    - 메모이제이션 기법 사용
- 분할 정복
    - 부분 문제들은 중복되지 않는다. (서로 독립적이다.)
    - 메모이제이션 기법 사용 하지 않는다.
