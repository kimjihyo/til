
# 백트래킹(Backtracking) 이란?


알고리즘 기법 중 하나로 **재귀**적으로 문제를 해결 하되 현재 재귀를 통해 확인 중인 상태가 **제한 조건**에 위배 되는지 판단하고, 해당 상태가 위배되는 경우 해당 상태를 **제외**하고 다음 단계로 넘어간다.


더 이상 탐색할 필요가 없는 상태를 제외한다는 점에서 가지치기 라고도 한다.


백트래킹은 **모든 경우의 수**에서 조건을 만족하는 경우를 탐색하는 것이기 때문에, DFS, BFS로 모두 구현이 가능하다. 하지만 백트래킹 특성상 조건에 부합하지 않으면 이전 수행으로 돌아가야 함으로 BFS 보다는 **DFS**가 구현이 편리하다.


# 
백트래킹 예시


순열(Permutation)


[bookmark](https://www.acmicpc.net/problem/15649)


조합(Combination)


[bookmark](https://www.acmicpc.net/problem/15650)


암호 만들기


[bookmark](https://www.acmicpc.net/problem/1759)


N-Queen


[bookmark](https://www.acmicpc.net/problem/9663)

