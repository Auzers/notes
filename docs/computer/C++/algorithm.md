---
tags:
    - 算法
---
# Basis of algorithm

## 时间复杂度

- [数据结构——时间复杂度计算](https://www.bilibili.com/video/BV13d4y1K74p/?spm_id_from=333.337.search-card.all.click&vd_source=df5a597928fba384c94060640080e142)

## 排序

### 快排

```cpp
void quick_sort(int q[], int l, int r)
{
    if(l >= r) return;
    int i = l - 1, j = r + 1, x = q[(l + r) >> 1];
    while(i < j)
    {
        do i++ ;while(q[i] < x);
        do j-- ;while(q[j] > x);
        if(i < j)
        {
            int t = q[i];
            q[i] = q[j];
            q[j] = t;
        }
        
    }
    quick_sort(q, l, j);
    quick_sort(q, j + 1, r);
    
}
```

- 除了 `if(l >= r)` 剩下的都是 `>` 或者 `<` 
- do while
- [快速排序算法的证明与边界分析](https://www.acwing.com/solution/content/16777/)

### 归并

```cpp
void merge_sort(int q[], int l, int r)
{
    //递归的终止情况
    if(l >= r) return;

    //第一步：分成子问题
    int mid = l + r >> 1;

    //第二步：递归处理子问题
    merge_sort(q, l, mid ), merge_sort(q, mid + 1, r);

    //第三步：合并子问题
    int k = 0, i = l, j = mid + 1, tmp[r - l + 1];
    while(i <= mid && j <= r)
        if(q[i] <= q[j]) tmp[k++] = q[i++];
        else tmp[k++] = q[j++];
    while(i <= mid) tmp[k++] = q[i++];
    while(j <= r) tmp[k++] = q[j++];

    for(k = 0, i = l; i <= r; k++, i++) q[i] = tmp[k];
}
```

- [归并排序的证明与边界分析](https://www.acwing.com/solution/content/16778/)

### 二分

```cpp
//查找左边界 SearchLeft 简写SL
int SL(int l, int r)
{
    while (l < r)
    {
        int mid = l + r >> 1;
        if (check(mid)) r = mid; 
        else l = mid + 1; 
    }   
    return l;
}
//查找右边界 SearchRight 简写SR 
int SR(int l, int r) 
{
    while (l < r)
    {                   
        int mid = l + r + 1 >> 1; //需要+1 防止死循环
        if (check(mid)) l = mid;
        else r = mid - 1; 
    }
    return r; 
}
```

- 发明男左女右的真是个天才，如果包含 x 的条件是左边，就 + 1，否则不加。
- [二分模板](https://www.acwing.com/solution/content/107848/)

## 高精度

### 加法

```cpp
#include <iostream>
#include <vector>
using namespace std;
vector<int> add(vector<int> &a, vector<int> &b)
{
    vector<int> res;
    int t = 0;
    for(int i = 0; i < a.size() || i < b.size() || t;i++)
    {
        if(i < a.size()) t += a[i];
        if(i < b.size()) t += b[i];
        res.push_back(t % 10);
        t /= 10;
    }
    return res;
}
int main()
{
    string a,b;
    cin >> a >> b;
    vector<int> A,B;
    for(int i = a.size() - 1; i >= 0; i --) A.push_back(a[i] - '0');
    for(int i = b.size() - 1; i >= 0; i --) B.push_back(b[i] - '0');
    
    auto C = add(A,B);
    for(int i = C.size() - 1;i >= 0; i --) printf("%d",C[i]);
    return 0;
}
```

### 减法

```cpp
#include<iostream>
#include<vector>
using namespace std;

bool cmp(vector<int> &a, vector<int> &b)
{
    if(a.size() != b.size()) return a.size() > b.size();
    else
    {
        for(int i = a.size() - 1; i>= 0;i--)
        {
            if(a[i] != b[i]) return a[i] > b[i];
        }
        return true;
    }
}

vector<int> sub(vector<int> &a,vector<int> &b)
{
    vector<int> res;
    for(int i = 0,t = 0; i < a.size(); i++)
    {
        t = a[i] - t;
        if(i < b.size()) t -= b[i];
        res.push_back((t + 10) % 10);
        if(t < 0) t = 1;
        else t = 0;
    }
    while(res.size() > 1 && res.back() == 0) res.pop_back();
    return res;
}
int main()
{
    string a,b;
    vector<int> A,B,C;
    cin >> a >> b;
    for(int i = a.size() - 1; i >= 0; i --) A.push_back(a[i] - '0');
    for(int i = b.size() - 1; i >= 0; i --) B.push_back(b[i] - '0');
    
    if(cmp(A, B))
    {
        C = sub(A, B);
        for(int i = C.size() - 1; i >= 0; i--) printf("%d",C[i]);
    }
    else 
    {
        C = sub(B, A);
        printf("-");
        for(int i = C.size() - 1; i >= 0; i--) printf("%d",C[i]);
    }
    
    return 0;
}
```

### 乘法

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> mul(vector<int> &a, vector<int> &b)
{
    vector<int> res(a.size() + b.size(), 0);
    for(int i = 0; i < a.size(); i++)
    {
        for(int j = 0; j < b.size(); j++)
        {
            res[i + j] += a[i] * b[j];  
        }
    }
    for(int i = 0; i + 1 < res.size(); i ++)
    {
        res[i + 1] += res[i] / 10;
        res[i] = res[i] % 10;
    }
    while(!res.back() && res.size() > 1) res.pop_back(); 
    return res;
}
int main()
{
    string a,b;
    vector<int> A, B, C;
    cin >> a >> b;
    for(int i = a.size() - 1; i >= 0; i--) A.push_back(a[i] - '0');
    for(int i = b.size() - 1; i >= 0; i--) B.push_back(b[i] - '0');
    C = mul(A, B);
    for(int i = C.size() - 1; i >= 0;i--) printf("%d",C[i]);
    return 0;
}
```

- [高精度乘法分析](https://www.acwing.com/solution/content/13694/)

### 除法

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> div(vector<int> &a, int b, int &r)
{
    vector<int> res;
    int t = 0;
    for(int i = a.size() - 1; i >= 0; i--)
    {
        t = t * 10 + a[i];
        res.push_back(t / b);
        t %= b;
    }
    r = t;
    reverse(res.begin(), res.end());
    while(res.size() > 1 && !res.back()) res.pop_back();
    return res;
}
int main()
{
    string a;
    int b, r;
    vector<int> A, C;
    cin >> a >> b;
    for(int i = a.size() - 1; i >= 0; i--) A.push_back(a[i] - '0');
    C = div(A, b, r);
    for(int i = C.size() - 1; i >= 0; i--) printf("%d",C[i]);
    cout << endl;
    cout << r << endl;
    
    return 0;
}
```

## 深度优先搜索(DFS)

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
