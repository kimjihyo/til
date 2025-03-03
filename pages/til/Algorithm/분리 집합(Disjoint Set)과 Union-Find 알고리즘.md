
# 분리 집합 (Disjoint Set)


분리 집합 또는 서로소 집합은 각각의 집합이 공통 원소를 가지고 있지 않은 집합이다. 즉, 전체 집합 U에 대해 U의 분리 집합 A, B는 다음 조건을 만족한다.

- A, B는 U의 부분 집합이다.
- A, B는 공통 원소를 가지지 않는다. (교집합이 공집합이다.)
- A, B의 합집합은 전체 집합 U이다.

위 조건은 분리 집합의 개수가 3개 이상일때도 만족한다.


![IMG_0077.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/be468a48-6628-44e2-8c56-229edd5978f7/deec4933-919e-44c6-a2f0-083b7c24c799/IMG_0077.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ALA4QCP%2F20250303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250303T133630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAf0soxcdeadsfxCOmUjlP3RFHlJdlJM0cNqR2QVUh2QIgKdG7ud3s%2FGrBqnWZNKRbRvpeqGDauZoEaD%2FGuhZaBrIqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFsma%2BO4GtszncnjhSrcAyUQ85To%2F03T1%2Bv0A0oJ8mXnCISvOLs%2Fd0d%2Fg65eos9HC%2By5x91K98xtlcs11uhQircdCgrm60%2FqaW5N%2By6OyIz106gmx8D1bFbt2Wb5X9PUhz5jw2K3uU3N%2BtsL9hZydE%2FLmSr16cDzEsi0CgM2cToem0py5wHnoum12uiF6c6OrPEvcirosiP1yMn38hNsNnXFIumJX%2F6KTkglwSPxnGr4CFTjw0SA65DZYyS2aesyNGvoMMg7ZUZoIo61Lo0AWWUNelnUXM5rHRV8UvAZMDLKfULb4P%2FP6lkwzvXIE%2FQRXo%2FUopOLYXXG8q7dD7IGYAfjABoPPqCOSb72HRD7CJI%2B%2B4WLkuzwf4nikF1ue%2FFRpNZw9qptvkt2VqQhnXt90grISBEGvVEkwAFtyZcQmB9HXo4e5kH5BuGeC%2FUeODO4Su%2Bto4%2BPSjYIDwdrhb%2Fc5zcOiw43uH6dpaETI%2BDjGreZmnRDuPzuq3TofcrV9PfJZYs8P2X1x4PqdTZzSHzYReRwTlTNs%2BG4SsGhmPSblrd44ldLyhLUFArQsUqP4Z4wQaqikcBob9pnBT5Jwbde2N%2BvBD%2FlJudtsVbBnCcd1MrOOq%2FI1arxTftF6XMFy8rMhHtuhukeRLBR1KL8MNXZlr4GOqUBM4a2cJ3nwzLVSJz%2F7wyWeyZsNxr1JhpruA9tN19GaIiU99JgIvPM5%2BXJl6fyYJztuXm9NB3rgO2QjJr6ZlB2ahR0IO2eZ%2FPpvYX0G077WfdEk77a8oikz%2FabIES8RZuahZbAyt430PozQDpoVuAzxXwSScBWbevNZWPmj7ICYghYpbNvxljsgs%2BzRolBLwEq50Y4AzYNSI4d%2FE3xMErdHk%2Bh%2FF8k&X-Amz-Signature=077f397b534ad22e17bb8c9286ff38c959b0baa36c8f06928892e8905dd18b40&X-Amz-SignedHeaders=host&x-id=GetObject)


# Union-Find


Union-Find 알고리즘은 여러 개의 노드가 존재할 때 두 개의 노드를 선택해서 현재 이 두 노드가 서로 같은 집합에 속하는지 판별하는 알고리즘이다.


집합을 구현하는 데는 배열, 연결 리스트등을 이용할 수 있으나 그 중 가장 효율적인 트리를 이용하여 구현한다. Union-Find 에는 아래 3가지 주요 연산들이 있다.

- 초기화: n 개의 원소가 각각의 집합에 포함되어 있도록 초기화
- 합치기(Union): 두 원소 a, b가 주어질 때 이들이 속한 두 집합을 하나로 합친다.
- 찾기(find) 연산: 어떤 원소 a가 주어질때 이 원소가 속한 집합을 반환

## Union-Find의 사용 예시

- Undirected graph 에서 사이클 형성 여부를 판단하기 위해 사용할 수 있다.
	- Kruskal 알고리즘에서 사이클 여부를 판단하기 위해 사용한다.

##  트리들(Forest)을 이용하여 구현

- 초기화
	- 트리의 루트 노드를 저장하는 배열 parents 를 선언 후, 각 노드에 대해 자기 자신을 루트 노드로 초기화
- 찾기(find) 연산
	- 어떤 원소 a가 주어질때 a가 속한 트리의 루트 노드를 반환
- 합치기(merge) 연산
	- 각 노드의 루트 노드를 찾은 다음, 한 트리의 루트를 다른 트리의 루트의 자식으로 만들면 된다.

```c++
// 노드가 10개 있을때
// 각 노드의 부모 노드를 저장하는 배열
int parents[10];

// 각 노드의 부모 노드를 자기 자신으로 초기화. 
// 다른 말로 각 원소가 각각의 집합에 포함되어 있도록 초기화
void init() {
	for (int i = 0; i < 10; i++) {
		parents[i] = i;
	}
}

// 해당 노드가 속한 트리의 루트 노드를 반환
// 다른말로, 노드 u 가 속한 집합을 반환한다.
int find(int u) {
	if (u == parents[u]) return u; // u가 루트인 경우
	return find(parents[u]);
}

// 노드 u 가 속한 트리 와 노드 v 가 속한 트리를 합친다.
// 다른말로, 노드 u 와 노드 v가 속한 집합을 하나로 합친다.
void merge(int u, int v) {
	u = find(u); v = find(v);
	if (u == v) return;
	// 트리 u를 트리 v에 병합
	parents[u] = v;
}
```


## 최적화 1 - 트리가 기우는 현상 방지 (Balanced tree)


위 방법의 시간 복잡도는 트리의 높이에 의해서 결정된다. 트리가 한쪽으로 기울어 져서 트리의 장점을 전혀 살릴 수 없는 연결 리스트와 같은 형태 (skewed binary tree)가 된다면, Union과 Find 연산 모두 O(n)이 되어 버릴 수 있다.


![IMG_0080.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/be468a48-6628-44e2-8c56-229edd5978f7/6898599a-ca28-4f80-8c76-9d476b4f9cfe/IMG_0080.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ALA4QCP%2F20250303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250303T133630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAf0soxcdeadsfxCOmUjlP3RFHlJdlJM0cNqR2QVUh2QIgKdG7ud3s%2FGrBqnWZNKRbRvpeqGDauZoEaD%2FGuhZaBrIqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFsma%2BO4GtszncnjhSrcAyUQ85To%2F03T1%2Bv0A0oJ8mXnCISvOLs%2Fd0d%2Fg65eos9HC%2By5x91K98xtlcs11uhQircdCgrm60%2FqaW5N%2By6OyIz106gmx8D1bFbt2Wb5X9PUhz5jw2K3uU3N%2BtsL9hZydE%2FLmSr16cDzEsi0CgM2cToem0py5wHnoum12uiF6c6OrPEvcirosiP1yMn38hNsNnXFIumJX%2F6KTkglwSPxnGr4CFTjw0SA65DZYyS2aesyNGvoMMg7ZUZoIo61Lo0AWWUNelnUXM5rHRV8UvAZMDLKfULb4P%2FP6lkwzvXIE%2FQRXo%2FUopOLYXXG8q7dD7IGYAfjABoPPqCOSb72HRD7CJI%2B%2B4WLkuzwf4nikF1ue%2FFRpNZw9qptvkt2VqQhnXt90grISBEGvVEkwAFtyZcQmB9HXo4e5kH5BuGeC%2FUeODO4Su%2Bto4%2BPSjYIDwdrhb%2Fc5zcOiw43uH6dpaETI%2BDjGreZmnRDuPzuq3TofcrV9PfJZYs8P2X1x4PqdTZzSHzYReRwTlTNs%2BG4SsGhmPSblrd44ldLyhLUFArQsUqP4Z4wQaqikcBob9pnBT5Jwbde2N%2BvBD%2FlJudtsVbBnCcd1MrOOq%2FI1arxTftF6XMFy8rMhHtuhukeRLBR1KL8MNXZlr4GOqUBM4a2cJ3nwzLVSJz%2F7wyWeyZsNxr1JhpruA9tN19GaIiU99JgIvPM5%2BXJl6fyYJztuXm9NB3rgO2QjJr6ZlB2ahR0IO2eZ%2FPpvYX0G077WfdEk77a8oikz%2FabIES8RZuahZbAyt430PozQDpoVuAzxXwSScBWbevNZWPmj7ICYghYpbNvxljsgs%2BzRolBLwEq50Y4AzYNSI4d%2FE3xMErdHk%2Bh%2FF8k&X-Amz-Signature=0876a2145ce7d5d4e05083c234e196010eceb47b69081c0057cb285eb782a611&X-Amz-SignedHeaders=host&x-id=GetObject)


이러한 문제를 해결하기 위해 여러가지 방법들이 고안되어 있다. 그 중 간단한 것은 두 트리를 합칠때 항상 높이가 더 낮은 트리를 더 높은 트리 밑에 집어 넣으므로써 트리의 높이가 높아지는 상황을 방지하는것이다. (balnanced tree)


```mermaid
%%{ init: { 'flowchart': { 'curve': 'linear' } } }%%
flowchart TD
A((2))
B((0))
C((1))
A1((5))
B1((4))
C1((3))
D1((6))
E1((7))
A2((2))
B2((0))
C2((1))
A12((5))
B12((4))
C12((3))
D12((6))
E12((7))
subgraph a + b
A12---A2
A2---B2
A2---C2
A12---B12
B12---C12
B12---D12
B12---E12
end
subgraph b
A1---B1
B1---C1
B1---D1
B1---E1
end
subgraph a
A---B
A---C
end
```


ranks 배열이 새로 생겼는데 해당 노드가 한 트리의 루트인 경우 해당 트리의 높이를 저장한다. 처음에는 각 노드가 속한 트리의 높이가 1이다.


```c++
// 노드가 10개 있을때

// 각 노드의 부모 노드를 저장하는 배열
int parents[10];
// 각 노드의 트리의 높이를 저장하는 배열
int ranks[10];

void init() {
	for (int i = 0; i < 10; i++) {
		parents[i] = i;
		ranks[i] = 1;
	}
}

int find(int u) {
	if (u == parents[u]) return u; // u가 루트인 경우
	return find(parents[u]);
}

void merge(int u, int v) {
	u = find(u); v = find(v);
	if (u == v) return;
	// u가 속한 트리의 높이가 더 크면
	// v가 속한 트리를 u가 속한 트리 밑에 집어 넣는다.
	if (ranks[u] > ranks[v]) swap(u, v);
	parents[u] = v;
	// 두 트리의 높이가 같은 경우에는 트리의 높이가 1 늘어난다.
	if (ranks[u] == ranks[v]) ranks[v]++;
}
```


merge 함수를 보면 두 트리의 높이가 같은 경우에는 트리의 높이를 1 늘려준다.


```mermaid
%%{ init: { 'flowchart': { 'curve': 'linear' } } }%%
flowchart TD
A((2))
B((0))
C((1))
A1((5))
B1((4))
C1((3))
E1((7))
A2((2))
B2((0))
C2((1))
A12((5))
B12((4))
C12((3))
E12((7))
subgraph a + b
A12---B12
A12---C12
A12---E12
A12---A2
A2---B2
A2---C2
end
subgraph b
A1---B1
A1---C1
A1---E1
end
subgraph a
A---B
A---C
end
```


## 최적화 2 - 경로 압축 (Path compression)


위의 코드에 한 번더 최적화를 할 수 있다. 이 방법은 찾기 연산이 중복된 계산을 여러 번 하고 있다는 거에서 출발한다. 지금까지는 find(u)를 통해 u가 속하는 트리의 루트를 호출을 할 때마다 재귀 함수를 통해서 계속 찾아냈다. 하지만 이럴 필요 없이 parent[u]를 찾아낸 루트로 아예 바꿔 버리면 다음에 find(u)가 호출 되었을때는 경로를 따라 올라갈 것 없이 바로 루트를 찾을 수 있다.


```mermaid
%%{ init: { 'flowchart': { 'curve': 'linear' } } }%%
flowchart TD
A((2))
B((0))
C((1))
A1((5))
B1((4))
C1((3))
D1((6))
E1((7))
A2((2))
B2((0))
C2((1))
A12((5))
B12((4))
C12((3))
D12((6))
E12((7))
subgraph after find 6
A1---A
A1---B1
A---B
A---C
A1---D1
B1---C1
B1---E1
end
subgraph a + b
A12---A2
A2---B2
A2---C2
A12---B12
B12---C12
B12---D12
B12---E12
end
```


```c++
// 노드가 10개 있을때
int parents[10];
int ranks[10];

void init() {
	for (int i = 0; i < 10; i++) {
		parents[i] = i;
		ranks[i] = 1;
	}
}

int find(int u) {
	if (u == parents[u]) return u; // u가 루트인 경우
	// 다시 find(u) 했을때 바로 반환할 수 있게 업데이트
	parents[u] = find(parents[u]);
	return parents[u];
}

void merge(int u, int v) {
	u = find(u); v = find(v);
	if (u == v) return;
	if (ranks[u] > ranks[v]) swap(u, v);
	parents[u] = v;
	if (ranks[u] == ranks[v]) ranks[v]++;
}
```

