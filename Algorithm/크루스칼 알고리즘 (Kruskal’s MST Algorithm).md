
# 크루스칼 알고리즘이란?


크루스칼 알고리즘이란 그래프에서 MST를 찾는 알고리즘이다. MST에 관한 설명은 [이전 TIL에서 다루었다.](/8e2ed66f35054ed2b467993c152884b5)


크루스칼 알고리즘은 그리디 알고리즘의 일종이다. 즉, 그래프 간선들을 가중치가 낮은 순으로 고르는데 이때 사이클을 형성하지 않는 선에서 고른다. 

1. 간선을 가중치를 기준으로 오름차순 정렬한다.
2. 간선을 하나씩 확인하며 현재의 간선이 사이클을 방생시키는지 확인한다.
    1. 사이클이 발생하지 않는 경우 MST에 포함시킨다.
    2. 사이클이 발생하는 경우 MST에 포함시키지 않는다.
3. 모든 간선에 대하여 2번의 과정을 반복한다.

# 사이클 판단하기


그래프 간선들중 사이클을 형성하지 않는 간선을 고른다고 했다. 사이클을 형성하는지 판단하기 위해서는 [Union-Find 알고리즘](/cf819e260c4e4e609acfcee331981660)을 사용한다. 위에서 설명한 크루스칼 알고리즘의 작동 방식을 Union-Find 알고리즘을 추가하여 다시 설명하면 아래와 같다. 

1. 간선을 가중치를 기준으로 오름차순 정렬한다.
2. 그래프 상의 모든 노드를 각각의 disjoint set에 넣어준다.
3. 선택하려는 간선의 두 노드에 대해 find 연산을 해주어, 같은 집합에 있는지 확인한다.
    1. 같은 집합에 없으면, 해당 간선으로 연결된 두 노드를 union 연산을 통해서 같은 집합으로 묶어준다. 그리고 해당 간선을 MST에 포함시킨다.
    2. 같은 집합에 있으면, MST에 포함시키지 않는다.
4. 모든 간선에 대하여 3번의 과정을 반복한다.

즉 사이클을 형성하는지 알아보는 방법은, 각 노드의 부모 노드가 동일한지 아닌지 보는 것으로 알 수 있게 된다.


다음은 [백준 1197번 문제, 최소 스패닝 트리](https://www.acmicpc.net/problem/1197)를 크루스칼 알고리즘을 통해서 푼것이다.


```c++
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

// A structure that represents an edge
struct edge {
  int u;
  int v;
  int w;
};

// A compare function to sort edges in ascending order
bool comp(edge &a, edge &b) { return a.w < b.w; }

int find(vector<int> &parents, int u) {
  if (parents[u] == u)
    return u;
  // 경로 압축 (path compression)
  parents[u] = find(parents, parents[u]);
  return parents[u];
}

void unite(vector<int> &parents, vector<int> &ranks, int u, int v) {
  u = find(parents, u);
  v = find(parents, v);
  if (u == v)
    return;
    
  if (ranks[u] > ranks[v]) {
    parents[v] = u;
  } else if (ranks[u] < ranks[v]) {
    parents[u] = v;
  } else {
    parents[u] = v;
    ranks[v] += 1;
  }
}

int main() {
  ios::sync_with_stdio(0);
  cin.tie(0);

  int v, e;
  vector<edge> edges;
  vector<int> parents;
  vector<int> ranks;

  cin >> v >> e;

	// Initialize Union-Find
  for (int i = 0; i < v; i++) {
    parents.push_back(i);
    ranks.push_back(1);
  }

  for (int i = 0; i < e; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    edges.push_back({u, v, w});
  }

	// Sort the edges in ascending order
  sort(edges.begin(), edges.end(), comp);

  int cost = 0;
  for (auto edge : edges) {
    int rootU = find(parents, edge.u);
    int rootV = find(parents, edge.v);
    // If vertices u and v are not in the same set,
    // In other words, connecting vertices, u and v, does not form a cycle,
    if (rootU != rootV) {
	    // Calcuate the total weight of the MST
      cost += edge.w;
      // Put vertices, u and v, in the same set by performing union operation
      unite(parents, ranks, edge.u, edge.v);
    }
  }

  cout << cost << '\n';
  return 0;
}
```

