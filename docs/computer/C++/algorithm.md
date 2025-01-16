# 算法基础

## 1 二分

- 二分查找：在一个有序数组中查找某个元素。
- 二分查找的模板：

```cpp
int binary_search(int a[], int n, int x) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int mid = l + r >> 1;
        if (a[mid] == x) return mid;
        else if (a[mid] < x) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}
```
## 2 深度优先搜索(DFS)

- 深度优先搜索（DFS）是一种用于遍历或搜索树或图的算法。
深度优先搜索示例：

```cpp
#include <iostream>

using namespace std;
int n,m;
int res = 0;
void dfs(int x,int y)
{
    if(x == n && y == m)
    {
        res ++;//找到了路径条数加一
        return;
    }
   if(x < n) dfs(x + 1,y);//向右走
   if(y < m) dfs(x, y + 1);//向下走
}
int main()
{
    cin >> n >> m;
    dfs(0,0);
    cout << res;
    return 0;
}
```
