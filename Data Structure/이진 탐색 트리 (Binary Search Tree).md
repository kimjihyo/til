
# 서론


Binary Serach Tree (이하 BST)는 학교 다닐때 배운 자료구조중에 하나 이다. 개념적으로 이 자료구조를 이해하고 있지만 복기하는 느낌으로 글을 작성해보려고 한다.


# BST의 정의


BST는 binary tree 종류중의 하나로,  왼쪽 자식 노드의 값은 부모 노드 값 보다 작고, 오른쪽 자식 노드의 값은 부모 노드 값 보다 크다. 이러한 특성때문에 BST의 탐색, 삽입 그리고 삭제는 효율적이다. BST는 아래의 특성들을 만족한다.

1. 왼쪽 서브 트리의 노드들의 값은 루트 노드의 값 보다 작다.
2. 오른쪽 서브 트리의 노드들의 값은 루트 노드의 값 보다 크다.
3. 왼쪽, 오른쪽 서브 트리 모두 BST 이다.
4. 중복의 값은 없어야 한다.

# BST에서의 노드 탐색

1. 찾으려는 값과 루트 노드의 값과 비교 한다.
    - 루트의 값과 찾으려는 값이 일치하면 해당 노드의 위치를 반환한다.
    - 다르면 찾으려는 값이 루트의 값보다 작은지 체크한다. 만약 더 작으면 왼쪽 서브트리로 이동한다.
    - 더 큰 경우에는 오른쪽 서브 트리로 이동한다.
2. 값을 찾을때 까지 위의 절차를 반복한다.
3. 값을 찾지 못했으면 NULL을 리턴한다.

```c++
struct Node {
	int key;
	struct Node *left, *right;
};

Node* search(Node* root, int key) {
	if (root == nullptr || root->key == key) {
		return root;
	}
	if (root->key < key) {
		return search(root->right, key);
	}
	return search(root->left, key);
}
```


# BST에서의 노드 삽입


새로운 노드는 항상 leaf 노드에 생성이된다. 삽입하려는 값을 루트 노드에서 leaf 노드까지 탐색을 진행해서, leaf 노드를 만나면, 새로운 노드를 해당 leaf 노드의 자식 노드로 삽입한다.


```c++
Node* insert(Node* node, int key) {
	if (node == nullptr) {
		return newNode(key);
	}
	if (key < node->key) {
		node->left = insert(node->left, key);
	}
	if (key > node->key) {
		node->right = insert(node->right, key);
	}
	return node;
}
```


# BST에서의 노드 삭제


노드를 삭제 할때에는 몇가지 시나리오들을 고려해서 구현해야한다.

1. 삭제하려는 노드가 leaf 노드 일때
    - 그냥 해당 노드를 null 로 바꿔주고 삭제
2. 삭제하려는 노드가 하나의 자식노드를 가지고 있을때
    - 노드를 삭제하고 자식 노드를 삭제된 노드 부모에 직접 연결
3. 삭제하려는 노드가 두개의 자식노드를 가지고 있을때
    - 오른쪽 subtree 에서 가장 작은 값을 가지고 있는 노드를 삭제하려고 하는 노드와 바꾸고 삭제

```c++
Node* deleteNode(Node *root, int key) {
	if (root == nullptr) return root;
	if (key < root->key) {
		root->left = deleteNode(root->left, key);
	} else if (key > root->key) {
		root->right = deleteNode(root->right, key);
	} else {
		// If the key is same as root's key,
		// the this is the node to be deleted
		
		// Node with only one child or no child
		if (root->left == nullptr) {
			Node *temp = root->right;
			free(root);
			return temp;
		} else if (root->right == nullptr) {
			Node *temp = root->left;
			free(root);
			return temp;
		}
		
		// Node with two children
		// Get the inorder successor(smallest
		// in the right subtree)
		Node *temp = minValueNode(root->right);
		root->key = temp->key;
		root->right = deleteNode(root->right, temp->key);
	}
	return root;
}
```

