
# 벨만-포드 알고리즘 이란?


벨만-포드 알고리즘은 그래프의 최단 경로를 구하는 알고리즘이다. 다익스트라 알고리즘은 음의 간선이 포함된 그래프에서는 적용이 불가능했다면, 벨만-포드 알고리즘은 음의 간선이 포함되어 있어도 최단 경로를 구할 수 있다. 음의 사이클(negative cycle)이 존재하는 그래프에서는 그래프를 탐색을 하면 할수록 무한히 비용이 줄어드는 현상이 발생한다. 그래서 음의 사이클이 있는 그래프에서는 최단 경로를 구할 수 없다. 하지만 벨만-포드 알고리즘은 음의 간선을 탐지할 수 있어서 음의 간선을 포함하는 그래프에서도 최단 거리를 구할 수가 있다. 벨만-포드의 시간 복잡도는 O(V*E)로 다익스트라 알고리즘 O(E*logV)보다 느리다.


## 알고리즘 동작 과정

- N개의 정점이 있는 그래프에서 최단 경로를 구하기 위해서는 모든 간선이 N-1번 만큼 완화(relaxation) 되어야 한다.
- 그래프가 음의 순환을 가지고 있는지 알기 위해서는 모든 간선을 한번 더 완화한다. (즉, N번 완화한다.) N번째 완화 했을 때 최단 거리가 줄어들면 음의 간선이 존재한다는 것이다.

## 왜 간선을 N-1번 완화하면 최단 거리를 구할 수 있을까?


N개의 정점을 가지는 그래프에서 임의의 정점 두 개의 최단 경로는 최대 N-1개의 간선을 가진다. 그래서 N-1번의 완화는 최대 N-1개를 간선을 가지는 경로를 포함해서 모든 경로를 다 탐색해봤다는 뜻이다. 


## N번째 완화의 최단 거리 감소가 왜 음의 사이클을 의미하는가?


위에서 말했다시피 최단 경로를 구하기 위해서는 최대 N-1 번의 완화가 필요하다. 만약 N 번째 완화를 진행했을 때 최단 거리가 감소된다면 음의 가중치를 갖는 간선이 한 번 더 방문 되었다는 뜻이고 이 말은 해당 그래프가 음의 사이클을 가지고 있다는 뜻이다.


## 구현


```c++
// n is the number of verticies
// This function returns true if a negative cycle exists in the graph
bool bellmanFord(int n, vector<edge> &edges) {
  vector<int> dist(n + 1, MAX);
  dist[1] = 0;

	// Relax edges N-1 times
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < edges.size(); j++) {
      int u = edges[j].u;
      int v = edges[j].v;
      int w = edges[j].w;
      if (dist[u] != MAX && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  
  // N'th relaxation
  for (int j = 0; j < edges.size(); j++) {
    int u = edges[j].u;
    int v = edges[j].v;
    int w = edges[j].w;
    
    // A negative cycle is detected
    if (dist[u] != MAX && dist[u] + w < dist[v]) {
      return true;
    }
  }
  return false;
}ㄷ
```

