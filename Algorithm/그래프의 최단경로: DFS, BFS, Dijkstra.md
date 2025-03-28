
그래프에서 최단경로를 탐색하는 알고리즘은 여러가지가 있다. 대표적으로, DFS, BFS, Dijkstra, Bellman-Ford, Floyd-Warshall 알고리즘이 있다. 모든 상황을 커버할 수 있는 알고리즘은 없다. 그러므로 주어진 상황에 맞는 적절한 알고리즘을 사용하는게 중요하다.

- 간선의 가중치가 없는 그래프 일때는 BFS
- 간선의 가중치가 양수인 그래프 일때는 다익스트라 알고리즘
- 간선의 가중치가 음수를 포함하면 벨만-포드 알고리즘 또는 플로이드-워셜 알고리즘
- 사이클이 없는 유향 그래프(DAG) 에서는 위상 정렬을 활용한 최단거리 알고리즘 (물론 다익스트라로도 풀 수 있지만 위상 정렬이 더 빠르다. 위상 정렬 - O(V+E), 다익스트라 - O(V+ElogV))

# 사이클이 없는 그래프일땐 (i.e. 트리) DFS


사이클이 없는 무향 그래프(acyclic undirected graph)에서 임의의 정점 u에서 v까지 갈 수 있는 경로는 하나만 존재한다. 그러므로 사이클이 없는 그래프 무향 그래프에서는 DFS로도 충분히 최단거리를 구할 수가 있다. 반면에 사이클이 없어도 간선의 방향이 있는 유향 그래프에서는 다익스트라 알고리즘이나 위상 정렬을 활용해서 최단거리를 구해야한다.


# 가중치가 없는 그래프일땐, BFS


대표적인 그래프 탐색 알고리즘인 Breadth First Search, 너비 우선 탐색 알고리즘이다. 가중치가 없는 그래프의 최단경로를 찾는 경우에 응용하여 사용할 수 있다.

1. 시작 정점, S를 정한다.
2. 정점 S에서 부터 모든 정점의 최단거리를 기록하는 배열 D를 선언해준다. 이때, 각 정점에 대해서 아직 방문을 안했다는 뜻으로 원소들을 모두 -1 로 초기화해준다.
3. 정점 S에서 시작 정점까지의 거리는 0이므로, D[S] = 0 으로 초기화 해준다.
4. 정점 S를 큐에 넣는다.
5. 큐에서 정점(S)을 빼낸다. 방문을 안한 정점 (D[S] == -1) 이면 아래 절차를 진행하고, 이미 방문을 했으면 큐에서 다시 정점을 빼낸다.
6. 정점 S의 이웃 정점을 N이라고 하면, 시작 정점에서 정점 N까지의 최단 거리는 시작 정점에서 정점 S까지의 거리 + 1 이 되고 수식으로 표현하면  D[N] = D[S] + 1 이 된다. 배열 D를 이와 같이 업데이트 해준다.
7. 정점 N을 큐에 넣는다.
8. 큐가 비어질때까지 5~7번을 반복한다.

4~7 번은 BFS를 하는 과정인데, 최단거리를 기록하는 배열인 D를 업데이트 하는 과정이 추가된것 뿐이다. C++로 구현하면 아래와 같다.


```c++
vector<vector<int>> adj; // adjacency list
vector<int> distances(adj.size, -1) // 각 정점의 최단거리

void bfs(int start) {
	queue<int> q;
	distances[start] = 0;
	q.push(start);
	while(!q.empty()) {
		int here = q.front();
		q.pop();
		for (auto leaf : adj[here]) {
			if (distances[leaf] == -1) {
				q.push(leaf);
				distances[leaf] = distances[here] + 1;
			}
		}
	}
}
```


# 가중치가 있는 그래프면 Dijkstra, 단 음수 가중치는 없을때.


위에서 설명한 BFS를 사용한 최단거리 탐색 알고리즘을  조금만 변형하면 가중치가 달라도 최단거리를 구할 수 있는 다익스트라 알고리즘이 된다.  다익스트라 를 구현하는 방법은 두가지가 있다. 선형 탐색 하는 법 또는 우선 순위 큐를 활용 하는 법 이다.


선형 탐색의 시간 복잡도는 O(V^2)이고 우선 순위 큐를 사용하면 O(V*logV)이다.


선형 탐색 하는법의 구체적인 동작 과정은 다음과 같다.

1. 출발 정점에서 이웃 정점까지의 최단 거리를 기록하고, 현재 노드를 방문 처리한다.
2. 방문 하지 않은 정점들 중, 출발 정점에서 거리가 가장 짧은 정점을 선택한다.
3. 선택된 정점의 이웃 정점들 까지의 최단 거리를 업데이트 하고 선택된 정점을 방문 처리한다.
4. 모든 정점을 방문할 때 까지 2, 3번을 반복한다.

아래는 우선순위 큐를 사용해서 C++로 구현한것이다.


```c++
void dijkstra(vector<vector<pair<int, int>>> adj, int source) {
	// 출발점으로부터의 최단 거리를 저장하는 배열 d
	// 모든 값을 INF로 초기화한다.
	vector<int> d(adj.size(), INF);
	// 출발점으로 부터의 거리가 제일 짧은 순서대로 뽑기 위해서
	// 우선순위 큐를 사용한다.
	priority_queue<pair<int,int>, vector<pair<int,int>>, compare> pq;
	// 출발 노드에는 0을 넣어준다.
	d[source] = 0;	
	pq.push(make_pair(source, 0));
	while (!pq.empty()) {
		// 출발점으로 부터의 거리가 제일 짧은 노드, u를 고른다.
		int u = pq.top().first; // 노드, u
		int distToU = pq.top().second; // 출발점에서 u까지의 거리
		pq.pop(); // 노드 u를 방문한 것이므로 큐에서 제거
		// 출발점에서 u까지 가는 현재의 경로가
		// 최단 경로가 아니라면 스킵한다.
		if (d[u] < distToU) continue; 
		for (auto n : adj[u]) {
			int v = n.first; // 이웃 노드, v
			int distToV = distToU + n.second; // 출발점에서 v까지의 거리
			// 현재까지 찾은 출발점에서 v까지의 거리중
			// 지금 찾은 경로가 더 최단경로라면
			if (d[v] > distToV) {
				// 출발점에서 v까지의 최단거리를 업데이트 해준다.
				d[v] = distToV;
				// 우선순위 큐에 넣어준다
				pq.push(make_pair(v, distToV));
			}	
		}
	}
}
```

