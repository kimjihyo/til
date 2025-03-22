
# 신장 트리 (Spanning Tree)란?


그래프 내의 모든 정점을 포함하는 트리 이다. n개의 정점을 가지는 그래프의 최소 간선의 수는 (n-1)개이고, (n-1)개의 간선으로 연결되어 있으면 필연적으로 트리 형태가 되고 이것이 바로 Spanning Tree가 된다.


## Spanning Tree의 특징

- Disconnected graph 에서는 spanning tree가 존재할 수 없다.
- DFS, BFS를 이용하여 그래프에서 Spanning Tree를 찾을 수 있다. (탐색 도중에 사용된 간선만 모으면됨)
- 하나의 그래프에는 많은 신장 트리가 존재할 수 있다.
- 모든 정점들이 연결 되어 있어야 하고 사이클이 존재해서는 안된다.
- 트리니까 undirected, 즉 방향성이 없다.

# Minimum Spanning Tree (MST)란


Spanning Tree 중에서 사용된 간선들의 가중치 합이 최소인 트리이다. 각 간선의 가중치가 동일하지 않을떄 단순히 가장 적은 수의 간선을 사용한다고 해서 최소 비용이 얻어지는 것은 아니다. 그래서 간선에 가중치를 고려하여 최소 비용의 신장 트리를 선택하는 것을 말한다.


## MST의 특징 

- 간선의 가중치의 합이 최소여야 한다.
- n개의 정점을 가지는 그래프에 대해 반드시 n-1개의 간선만을 사용해야 한다.
- 사이클이 포함되어서는 안된다.
- 하나의 그래프에 여러개의 MST가 존재 할 수 있다.

## 그래프에서 MST를 찾는 알고리즘

- [크루스칼 알고리즘(Kruskal’s MST Algorithm)](/8013ff3de55243a8911813d37df0b1d3)
- 프림 알고리즘(Prim’s MST Algorithm)
- Boruvka’s Algorithm
- Reverse-Delete Algorithm
