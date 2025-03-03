
# 위상 정렬 (Topological Sort)란?


위상 정렬은 방향이 있고 사이클이 없는 그래프(DAG)의 모든 간선 u-v에 대해, 정점 u가 정점 v 보다 먼저 오게 하도록 정렬하는 방법이다. 즉, 다시 말해 DAG의 정점을 간선의 방향을 거스르지 않도록 정렬하는 것을 의미한다. 일반적으로 순서가 있는 작업을 차례로 수행하여야 할 때 사용된다. 위상 정렬은 아래와 같은 특징을 가지고 있다.

- 사이클이 없는 유향 그래프 (Directed Acylcic Graph, DAG)에서만 사용이 가능하다.
- 위상 정렬 순서는 하나가 아니라 여러 개 존재하는 게 보통이다.

### 왜 무향 그래프(undirected graph)에서는 위상 정렬을 사용할 수 없나?


정점 u와 v를 잇는 무향 간선에서는 u에서 v로의 간선이 있을 뿐만 아니라 v에서 u로의 간선도 있다는 말이다. 이 말은 u가 먼저인지 v가 먼저인지 결정할 수 없으므로 위상 정렬을 사용할 수가 없다.


### 왜 사이클이 있는 그래프에서는 위상 정렬을 사용할 수 없나?


마찬가지로 정점 u와 v사이에 사이클이 있으면 어떤 정점이 먼저 정렬 되어야 하는지 알 수가 없다.


# 구현


위상 정렬은 DFS 또는 BFS로 구현할 수 있다. 구현이 비교적 간단해 보이는 DFS부터 소개를 하겠다.


### DFS


재귀 함수를 사용한 DFS하는 코드를 아주 조금만 수정하면 구현할 수 있다. DFS에서 재귀 함수를 빠져나가는 순서로 정점을 나열하고 그것을 거꾸로 뒤집으면 위상 정렬 순서를 얻을 수 있다. 시간 복잡도는 O(V+E) 이다. V는 정점의 수, E는 간선의 수를 의미한다. 


### BFS


BFS로 구현하는 법을 설명하기에 앞서서 진입 차수(in degree)와 진출 차수 (out degree)에 대한 설명을 간단히 하고 넘어가겠다. 진입 차수란 한 정점으로 들어오는 간선의 수이고 반대로 진출 차수는 한 정점에서 나가는 간선의 수이다. 이 개념을 이해한 상태로 구현 방법을 살펴보자. 

	1. 진입 차수가 0인 정점을 큐에 넣는다.
	2. 큐가 빌 때까지 다음의 과정을 반복한다.
		1. 큐에서 원소를 꺼내 해당 정점에서 나가는 간선을 그래프에서 제거
		2. 새롭게 진입 차수가 0이 된 정점을 큐에 삽입

즉, 각 정점이 큐에 들어온 순서가 위상 정렬을 수행한 결과이다.


```c++
void topologicalSort() {
	// Create a vector to store in-degree of all verticies
	vector<int> inDegrees(V, 0);
	// Traverse adjacency lists to fill in-degree of verticies
	for (int i = 0; i < V; i++) {
		for (auto v : adj[i]) {
			inDegrees[v]++;
		}
	}
	// Create a queue and enqueue all vertices with in-degree of 0
	queue<int> q;
	for (int i = 0; i < V; i++) {
		if (inDegrees[i] == 0)
			q.push(i);
	}
	// Initialize count of visited verticese
	int count = 0;
	// Create a vector to store opological order
	vector<int> topOrder;
	// One by one dequeue vertices from queue and enqueue
	// adjacent vertices if in-degree of adjacent becomes 0
	while (!q.empty()) {
		int u = q.front();
		q.pop();
		topOrder.push_back(u);
		for (auto v : adj[u]) {
			inDegrees[v]--;
			if (inDegrees[v] == 0) {
				q.push(v);
			}
		}
		count++;
	}
	
	// Check if there was acycle
	if (count != V) {
		cout << "There is a cycle\n";
		return;
	}
	// Print topological order
	for (auto i : topOrder) cout << i << " ";
	cout << '\n';
}
```


# 위상 정렬 어디서 왜 사용할까?

- 앞서 설명한 순서가 있는 작업을 차례로 수행하기 위해서
- Directed graph에서 사이클이 있는지 확인하기 위해서
	- Undirected graph에서는 Union-Find 알고리즘을 사용하면 된다.
- DAG에서 최단 거리 알고리즘으로 응용할 수 있다.
	- 물론 다익스트라로도 최단 거리를 구할 수 있지만 DAG라는 특수한 상황에서는 topological sort로 최단 거리 구하는게 시간 복잡도 측면에서 더 낫다. 다익스트라는 O(E+VlogV)라면 topological sort는 O(V+E)이다.
