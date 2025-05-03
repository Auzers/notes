---
tags:
  - RAG
  - AI
---

# RAG
!!! note ""
    - 代码 --> [RAG_from_scratch](https://github.com/langchain-ai/rag-from-scratch?tab=readme-ov-file) 这个仓库的代码使用 [langchain](../aitools/langchain.md) 作为框架

R-Retrieve 检索

A-Augment  增强

G-Generate 生成

**RAG 用于解决以下问题**：

- 幻觉 (生成不存在的信息)
- 数据时效性弱
- 大模型上下文窗口有限，不过现在模型都在朝无限上下文靠拢
- ....

**概览：**
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250502220325711.png)
## 最简单的 RAG_demo
1. 读取用户输入的 question，
2. 查询相关文档
3. 将这些文档作为上下文
4. 生成 answer

## Query translation

### mutiquery

1. 读取用户输入的 question
2. 生成相关问题
3. 通过相关问题查找文档
4. 整合文档作为上下文
5. 生成 answer

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250502184913723.png)

### RAG-Fusion

1. 读取输入的 question
2. 生成相关问题
3. 通过相关问题查找文档
4. 用某种机制对文档进行过滤，找到"高质量"文档作为上下文
5. 生成 answer
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250502192908510.png)
### Decomposition

- answer recursively
把问题分成几个子问题，回答子问题 2 时，上下文分为两部分，第一部分是子问题 1 和答案 1，第二部分是子问题 2retrieve 的结果，递归进行最后生成答案
有点 cot 的感觉

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250502211306523.png)

- answer individually
跟 recursively 的不同就是把所有子问题和对应解答打包作为上下文回答 origin question

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250502212050545.png)
### step back

1. 读取输入的 question
2. 把问题退化为一个更容易给出精确回答的问题
3. 把对退化后问题的回答和 retrieve 的结果作为上下文
4. 生成 answer
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250503162340142.png)

### HyDE

1. 读取输入的 question
2. 通过 question 生成一个科学性文档
3. 通过这个文档进行 retrieve 得到上下文
4. 生成 answer
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250502215911686.png)
 
## Routing

### logical routing

1. 读取用户输入的 query
2. 分析 query 的逻辑结构
3. 根据逻辑规则选择合适的数据源
4. 从选定的数据源中检索相关文档
5. 使用检索到的文档生成 answer
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250503093430939.png)
### semantic routing

1. 读取用户输入的 query
2. 将 query 转换为语义向量
3. 根据语义相似度选择合适的数据源
4. 从选定的数据源中检索相关文档
5. 使用检索到的文档生成 answer
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250503101409696.png)


## Query Construction

### Query structuring for metadata filters

1. 读取用户输入的 query
2. 分析 query 中的关键字和意图
3. 将 query 转换为结构化格式，适用于元数据过滤
4. 应用元数据过滤器筛选相关文档
5. 使用筛选后的文档生成 answer
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250503110005292.png)
## Indexing

### Multi-representation Indexing

1. 读取输入的文档
2. 为每个文档生成多种表示形式：
   - 生成摘要向量
   - 生成原文向量
   - 生成结构化信息
3. 分别存储这些表示：
   - 摘要存入向量数据库
   - 原文存入文档存储
   - 用唯一 ID 关联不同表示
4. 检索时：
   - 先通过摘要快速定位相关文档
   - 再通过 ID 获取完整原文
   - 最后生成 answer

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250503162607858.png)


### RAPTOR

1. 读取用户查询
2. 查询优化：
   - 分析原始查询
   - 生成多个优化版本的查询
   - 选择最佳查询版本

3. 检索增强：
   - 使用优化后的查询进行检索
   - 对检索结果进行相关性排序
   - 过滤低质量结果

4. 提示词重写：
   - 根据检索结果动态调整提示词
   - 加入上下文信息
   - 优化提示词结构

5. 迭代优化：
   - 评估生成结果质量
   - 根据反馈调整检索策略
   - 持续改进提示词模板

### ColBERT

1. 读取输入的文档和查询
2. 生成 token 级别的向量表示：
   - 为文档中每个 token 生成向量
   - 为查询中每个 token 生成向量

3. 进行延迟交互：
   - 在检索时计算查询和文档 token 的相似度
   - 通过最大相似度计算文档得分

4. 检索和排序：
   - 使用向量数据库快速检索相关文档
   - 根据相似度得分排序文档

1. 生成 answer：
   - 使用检索到的文档作为上下文
   - 生成最终的回答

## Retrieval

### Re-ranking (在 RAG-Fusion 中提到过一遍'_')

1. 初步检索相关文档
2. 使用高级模型对初步结果进行重新排序
3. 根据新的排序选择最相关的文档
4. 使用这些文档生成 answer

### CRAG (Corrective Retrieval-Augmented Generation)

1. 读取用户输入的 query
2. 初步检索相关文档
3. 生成初步 answer
4. 根据初步 answer 进行检索修正
5. 使用修正后的文档生成更准确的 answer

## Generation

### self-RAG

1. 读取用户输入的 query
2. 自我检索相关文档
3. 自我生成初步 answer
4. 评估初步 answer 的质量
5. 根据评估结果进行自我调整和优化

### impact of long context

1. 读取用户输入的 query
2. 检索长上下文文档
3. 分析长上下文对生成 answer 的影响
4. 优化长上下文的使用策略
5. 生成更具上下文相关性的 answer