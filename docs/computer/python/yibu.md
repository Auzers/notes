---
title: Python异步编程
date: 2025-05-18
tags:
    - programming_language
    - async
---
# Python异步编程

!!! note ""
    - [video](https://www.bilibili.com/video/BV1cK4y1E77y/?spm_id_from=333.337.search-card.all.click&vd_source=df5a597928fba384c94060640080e142)
## 协程

协程不是计算机提供，是程序员人为创造的
协程也可以被称为**微线程**，是一种用户态内的上下文切换技术

实现协程的几种方法

- greenlet, 早期模块
- yield 关键字
- asyncio 装饰器
- async, await 关键字【推荐】

协程的意义？
如果遇到 IO 等待时间，线程不会傻傻等，利用空闲的时间去做其他事

### greenlet 实现协程

```Python
from greenlet import greenlet
def func1():
    print(1.1)
    gr2.switch()
    print(1.2)
    gr2.switch()
    
def func2():
    print(2.1)
    gr1.switch()
    print(2.2)

gr1 = greenlet(func1)
gr2 = greenlet(func2)

gr1.switch()
```

### yield 实现协程
```python
def func1():
    yield 1
    yield from func2()
    yield 2

def func2():
    yield 3
    yield 4

iterator = func1()
for i in iterator:
    print(i)
```

### asyncio
```python
import asyncio
import nest_asyncio 
nest_asyncio.apply()

@asyncio.coroutine
def func1():
    print(1)
    # 网络IO请求：下载一张图片
    yield from asyncio.sleep(2) # 遇到IO耗时操作，自动化切换到tasks中的其它任务
    print(2)

@asyncio.coroutine
def func2():
    print(3)
    # 网络IO请求：下载一张图片
    yield from asyncio.sleep(2) # 自动切换
    print(4)

tasks = [
    asyncio.ensure_future(func1()),
    asyncio.ensure_future(func2())
]

loop = asyncio.get_event_loop() # 获取一个事件循环对象
loop.run_until_complete(asyncio.wait(tasks)) # asyncio.wait是创建了一个新的协程，这行代码使得tasks的任务全部完成后才继续下一行代码
```

在 `.ipynb` 文件中，需要加上第二行和第三行代码，因为 jupter notebook 中本身就有一个 event_loop 在运行

### async & await 关键字

```python
import asyncio
import nest_asyncio 
nest_asyncio.apply()


async def func1():
    print(1)
    # 网络IO请求：下载一张图片
    await asyncio.sleep(2) # 遇到IO耗时操作，自动化切换到tasks中的其它任务
    print(2)

async def func2():
    print(3)
    # 网络IO请求：下载一张图片
    await asyncio.sleep(2) # 自动切换
    print(4)

tasks = [
    asyncio.ensure_future(func1()),
    asyncio.ensure_future(func2())
]

loop = asyncio.get_event_loop() # 获取一个事件循环对象
loop.run_until_complete(asyncio.wait(tasks)) # asyncio.wait是创建了一个新的协程，这行代码使得tasks的任务全部完成后才继续下一行代码
```

## 异步编程

### 事件循环

理解称为一个死循环，去检测并执行某些代码
```
task_list = [task1, task2, task3]
while True:
	可执行的任务列表，已完成的任务列表 = 去任务列表中检查所有任务，将"可执行"和"已完成"的任务返回
	for 就绪任务 in 可执行任务列表：
	    执行
	
	for 已完成任务 in 已完成任务列表：
		从任务列表中移除
		
	如果任务列表中的任务都已完成，则终止循环

```

```python
import asyncio

# 生成或获取一个事件循环
loop = asyncio.get_event_loop()

# 将任务放到任务列表
loop.run_until_complete(任务)
```

### 快速上手

协程函数，定义函数的时候 async.def 的函数名。

协程对象，执行协程函数 () 得到的协程对象
```python
async def func():
	pass
	

result = func()
```

执行协程函数创建协程对象，函数内部代码不会执行

```python
async def func():
	print("I like u")

result = func()

# loop = asyncio.get_event_loop()
# loop.run_until_complete(result)
asyncio.run(result) # python 3.7
```

### await

await + 可等待对象（协程对象，future, task 对象->IO 等待）

```python
import asyncio

async def others():
    print("start")
    await asyncio.sleep(2)
    print('end')
    return '返回值'

async def func():
    print("执行协程函数内部代码")

    response1 = await others()
    print("IO结束：",response1)

    response2 = await others()
    print("IO请求结束，结果为：",response2)


asyncio.run(func())
```

await 就是等待对象的值得到结果之后再继续往下走

### Task 对象

在事件循环中添加多个任务
```python
import asyncio
import nest_asyncio
nest_asyncio.apply()
async def func():
    print(1)
    await asyncio.sleep(2)
    print(2)
    return '返回值'

async def main():
    print("main 开始")
# 创建task对象，添加到事件循环
    task1 = asyncio.create_task(func())
# 添加到事件循环
    task2 = asyncio.create_task(func())
 
    print("main end")

    ret1 = await task1
    ret2 = await task2
    print(ret1,ret2)


asyncio.run(main())
```

运行结果：
```text
main 开始
main end
1
1
2
2
返回值 返回值
```

下面的方式更常用
```python
import asyncio
import nest_asyncio
nest_asyncio.apply()
async def func():
    print(1)
    await asyncio.sleep(2)
    print(2)
    return '返回值'

async def main():
    print("main 开始")
    task_list = [
        asyncio.create_task(func()),
        asyncio.create_task(func())
    ]
    print('main end')
    done,pending = await asyncio.wait(task_list,timeout=None)
    print(done)


asyncio.run(main())
```


下面的方式会报错
```python
import asyncio
import nest_asyncio
nest_asyncio.apply()
async def func():
    print(1)
    await asyncio.sleep(2)
    print(2)
    return '返回值'

task_list = [
        asyncio.create_task(func()),
        asyncio.create_task(func())
    ] # 会报错，因为还没有创建事件循环
done,pending = asyncio.run(asyncio.wait(task_list)) # asyncio.run才创建事件循环
print(done)

```

原因是当执行到 `asyncio.run` 的时候才会创建事件循环，在这之前，asyncio. create_task 不起作用

下面是改进版本，但是用的不多
```python
import asyncio
import nest_asyncio
nest_asyncio.apply()
async def func():
    print(1)
    await asyncio.sleep(2)
    print(2)
    return '返回值'

task_list = [
       func(),
       func()
    ] 
done,pending = asyncio.run(asyncio.wait(task_list)) # asyncio.run才创建事件循环
print(done)
```


### Future对象

好像不常用的样子，

```python
import asyncio

async def set_after(fut):
    await asyncio.sleep(2)
    fut.set_result("666")

async def main():
    # 获取事件循环
    loop = asyncio._get_running_loop()

    # 创建一个future对象，没绑定任何行为
    fut = loop.create_future()

    await loop.create_task( set_after(fut))

    # 等待future对象获取最终结果，否则一直等下去
    data = await fut
    print(data)

asyncio.run(main())
```

### concurrent.futures.Future 对象

使用线程池，进程池实现异步操作时使用到的对象
```python
import time
from concurrent.futures import Future
from concurrent.futures.thread import ThreadPoolExecutor
from concurrent.futures.process import ProcessPoolExecutor


def func(value):
    time.sleep(1)
    print(value)
    return 123

# 创建线程池
pool = ThreadPoolExecutor(max_workers=5)

# 创建进程池
# pool = ProcessPoolExecutor(max_workers=5)


for i in range(10):
    fut = pool.submit(func, i)
    print(fut)
```

 案例：asyncio + 不支持异步的模块
 ```python
 import asyncio
 import requests
 import os
 async def download_image(url):
     print("开始下载", url)
     loop = asyncio.get_event_loop()
     future = loop.run_in_executor(None, requests.get, url) # 默认线程池全局共享
     response = await future
     print("下载完成")
 
     file_name = url.rsplit('_')[-1]
     # 从url中提取文件名，从右边按'_'分割，取最后一个部分
     file_path = os.path.join("pic", file_name)
     with open(file_path, mode='wb') as file_object:
         file_object.write(response.content)
 
 # if __name__ == '__main__':
 #     url_list = [
 #         'https://www3.autoimg.cn/newsdfs/g26/M02/35/A9/120x90_0_autohomecar__ChsEe12AXQ6AOOH_AAFocMs8nzU621.jpg',
 #         'https://www2.autoimg.cn/newsdfs/g30/M01/3C/E2/120x90_0_autohomecar__ChcCSV2BBICAUntfAADjJFd6800429.jpg',
 #         'https://www3.autoimg.cn/newsdfs/g26/M0B/3C/65/120x90_0_autohomecar__ChcCP12BFCmAIO83AAGq7vK0sGY193.jpg'
 #     ]
 
 #     tasks = [ download_image(url)  for url in url_list]
 
 #     loop = asyncio.get_event_loop()
 #     loop.run_until_complete( asyncio.wait(tasks) )
 
 async def main():
     url_list = [
         'https://www3.autoimg.cn/newsdfs/g26/M02/35/A9/120x90_0_autohomecar__ChsEe12AXQ6AOOH_AAFocMs8nzU621.jpg',
         'https://www2.autoimg.cn/newsdfs/g30/M01/3C/E2/120x90_0_autohomecar__ChcCSV2BBICAUntfAADjJFd6800429.jpg',
         'https://www3.autoimg.cn/newsdfs/g26/M0B/3C/65/120x90_0_autohomecar__ChcCP12BFCmAIO83AAGq7vK0sGY193.jpg'
     ]
     tasks = [asyncio.create_task(download_image(url)) for url in url_list]
     await asyncio.wait(tasks)
 
 if __name__ == '__main__':
     asyncio.run(main())  # 直接使用 asyncio.run
 
 ```

## 案例：异步爬虫

```python
import aiohttp
import asyncio

async def fetch(session, url):
    print("发送请求", url)
    async with session.get(url, verify_ssl=False) as response:
        text = await response.text()
        print("得到结果",url,len(text))
        return text
    
async def main():
    async with aiohttp.ClientSession() as session:
        url_list = [
            'https://python.org',
            'https://www.baidu.com',
            'https://www.pythonav.com'
        ]
        tasks = [asyncio.create_task(fetch(session,url)) for url in url_list]
        await asyncio.wait(tasks)

if __name__ == "__main__":
    asyncio.run(main())

```

## 总结

什么时候要用 async 修饰函数?

1. 函数中有 await
2. 有 async with
3. 有 async for
