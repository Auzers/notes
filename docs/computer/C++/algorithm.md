# 算法基础

## 1 二分

- 二分查找：在一个有序数组中查找某个元素。
- 二分查找模板：

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

**示例1：**
> 给定一个 n×m
 的方格阵，沿着方格的边线走，从左上角 (0,0)
 开始，每次只能往右或者往下走一个单位距离，问走到右下角 (n,m)
 一共有多少种不同的走法。

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
**示例2：**
> 给定一个整数 n
，将数字 1∼n
 排成一排，将会有很多种排列方法。
现在，请你按照字典序将所有的排列方法输出。

```cpp
#include <iostream>

using namespace std;
const int N = 10;
void dfs(int u,int nums[],bool st[],int sz)
{
    if(u > sz)
    {
        for(int i = 1;i <= sz;i++)
        {
            cout << nums[i] << ' ';
        }
        cout << endl;
    }
    else
    {
        for(int i = 1;i <= sz;i++)
        {
            if(!st[i])
            {
                nums[u] = i;
                st[i] = true;
                dfs(u + 1,nums,st,sz);
                st[i] = false;//恢复现场
            }
        }
    }
}
int main()
{
    int n;
    cin >> n;
    int nums[N];
    bool st[N] = {0};
    dfs(1,nums,st,n);
    return 0;
}
```



1. **基本语法**：


