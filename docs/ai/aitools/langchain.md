---
tags:
  - tools
  - AI
---

# langchain 

调用的是[智谱的api](https://bigmodel.cn/dev/api/normal-model/glm-4),相比ds快很多
如果想要调 openai 的api,可以用[这个](https://bewildcard.com/)搞定 payment detail

## 1. Prompt 系统

### 1.1 基础 PromptTemplate

最简单的模板系统，适合单轮对话：

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate

# 加载环境变量
load_dotenv()

# 初始化模型
model = ChatOpenAI(
    model = 'glm-4',  # 使用智谱的GLM-4模型
    openai_api_base = 'https://open.bigmodel.cn/api/paas/v4/',  # 智谱API地址
    openai_api_key = os.getenv("ZHIPU_API_KEY"),  # 从环境变量获取API密钥
    max_tokens = 500,  # 限制输出长度
    temperature = 0.3  # 控制输出的随机性，越低越稳定
)

# 创建一个简单模板
template = PromptTemplate.from_template(
    "给我讲一个{input}"
)
message_a = template.format(input="笑话")
print(message_a)  # 输出: 给我讲一个笑话

# 调用模型
result = model.invoke(message_a)
print(result.content)
# 输出示例：当然，这里有一个简单的笑话：有一天，小明问妈妈："妈妈，为什么你的眼睛下面有黑黑的东西？"...
```

### 1.2 ChatPromptTemplate

#### 1.2.1 基于元组创建

```python
from langchain_core.prompts import ChatPromptTemplate

# 创建聊天模板
chat_template = ChatPromptTemplate.from_messages([
    ("system", "你是一位人工智能助手，你的名字是{name}."),  # 系统级指令，设定AI角色
    ("human", "你好"),  # 代表用户的输入
    ("ai", "我很好，谢谢"),  # 用于构建对话历史
    ("human", "{user_input}"),  # 动态用户输入
])

# 格式化并获取消息
messages = chat_template.format_messages(
    name="glm4",
    user_input="你叫什么名字"
)
print(messages)  # 输出格式化后的消息列表

# 调用模型获取回复
output = model.invoke(messages)
print(output.content)
# 输出示例: 我是人工智能助手，你可以称呼我为glm4。有什么我可以帮助你的吗？

# 链式调用
chain = chat_template | model
output = chain.invoke({"name": "glm4", "user_input": "你的名字叫什么"})
print(output)
```

#### 1.2.2 基于 Message 对象创建

```python
from langchain_core.messages import SystemMessage, AIMessage, HumanMessage
from langchain_core.prompts import HumanMessagePromptTemplate

# 使用更结构化的方式创建模板
chat_template = ChatPromptTemplate.from_messages([
    SystemMessage(
        content="你是一个乐于助人的助手，可以润色内容，使其看起来简单"
    ),
    HumanMessagePromptTemplate.from_template("{text}")  # 需要用户输入的地方要使用template
])

# 格式化消息
messages = chat_template.format_messages(text="我不爱吃饭")
print(messages)


output = model.invoke(messages)
print(output.content)
# 输出示例: 我不是很饿。或者更儿童化的表达：我不想吃东西。
```

#### 1.2.3 使用 MessagesPlaceholder 保持对话历史

```python
from langchain_core.prompts import MessagesPlaceholder

# 创建支持对话历史的模板
chat_template = ChatPromptTemplate.from_messages([
    SystemMessage(content="你是一个乐于助人的助手"),
    MessagesPlaceholder(variable_name="history"),  # 用于插入对话历史
    HumanMessagePromptTemplate.from_template("{input}")
])

# 准备对话历史
history = [
    HumanMessage(content="你好"),
    AIMessage(content="你好！有什么我可以帮你的吗"),
    HumanMessage(content="python 是什么？"),
    AIMessage(content="python是一种编程语言...")
]

# 格式化消息
messages = chat_template.format_messages(
    history=history,
    input="能给我一个Python例子吗？"
)


result = model.invoke(messages)
print(result.content)
# 输出示例:
# 当然可以。下面是一个简单的Python程序例子，它会打印出"Hello, World!"...
```

### 1.3 Few-Shot Learning 提示模板

#### 1.3.1 基础 Few-Shot 模板

通过提供示例来引导模型输出：

```python
from langchain.prompts import FewShotPromptTemplate
from langchain.prompts.prompt import PromptTemplate

# 准备示例
examples = [
    {
        "question": "如何反转一个字符串？",
        "answer": "要反转字符串'hello'，可以使用切片：'hello'[::-1]，结果是'olleh'"
    },
    {
        "question": "如何获取列表长度？",
        "answer": "使用len()函数，例如：len([1,2,3])，结果是3"
    },
    {
        "question": "如何判断是否是偶数？",
        "answer": "使用取模运算符%，例如：num % 2 == 0，如果为True则是偶数"
    }
]

# 创建示例模板
example_template = """
问题：{question}
答案：{answer}
"""

example_prompt = PromptTemplate(
    input_variables=["question", "answer"],
    template=example_template
)

# 创建 Few-Shot 模板
few_shot_prompt = FewShotPromptTemplate(
    examples=examples,  # 示例列表
    example_prompt=example_prompt,  # 示例模板
    prefix="你是一个Python专家，请按照以下例子的风格回答问题：",  # 前缀说明
    suffix="问题：{input_question}\n答案：",  # 后缀格式
    input_variables=["input_question"], # 可变输入
    example_separator="\n\n"  # 示例之间的分隔符
)

# 格式化模板
prompt = few_shot_prompt.format(input_question="如何计算平方根")
print(prompt)  # 打印完整的提示内容

response = model.invoke(prompt)
print(response.content)
# 输出示例: 使用math模块中的sqrt()函数，例如：import math; math.sqrt(9)，结果是3.0
```

#### 1.3.2 基于语义相似度的 Few-Shot 模板

根据输入动态选择最相关的示例：

```python
from langchain.prompts.example_selector import SemanticSimilarityExampleSelector
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# 准备更多示例
examples = [
    {"question": "如何反转字符串？", 
     "answer": "使用切片：str[::-1]"},
    {"question": "如何获取字典的所有键？", 
     "answer": "使用dict.keys()方法"},
    {"question": "如何连接两个列表？", 
     "answer": "使用list1 + list2或list1.extend(list2)"},
    {"question": "如何删除列表中的重复元素？", 
     "answer": "使用list(set(my_list))"},
    {"question": "如何读取文件？", 
     "answer": "使用with open('file.txt', 'r') as f:"}
]

# 创建embedding模型
glm_embeddings = OpenAIEmbeddings(
    model = "embedding-2",
    openai_api_base = "https://open.bigmodel.cn/api/paas/v4/",
    openai_api_key = os.getenv("ZHIPU_API_KEY")
)

# 创建示例选择器
example_selector = SemanticSimilarityExampleSelector.from_examples(
    examples,                # 示例列表
    glm_embeddings,         # 使用的词嵌入模型
    Chroma,                 # 向量存储
    k=2                     # 选择最相似的2个示例
)

# 示例模板
example_prompt = PromptTemplate(
    input_variables=["question", "answer"],
    template="问：{question}\n答：{answer}"
)

# 创建动态 Few-Shot 模板
prompt = FewShotPromptTemplate(
    example_selector=example_selector,  # 使用语义选择器
    example_prompt=example_prompt,
    prefix="你是Python专家，请回答问题：",
    suffix="问：{input}\n答：",
    input_variables=["input"]
)

# 测试模板
result = prompt.format(input="如何在列表末尾添加元素")
print(result)
# 输出示例会显示最相关的两个示例，然后是问题
```

## 2. langchain 工作流编排

langchain 主要通过 LCEL (LangChain Expression Language) 实现工作流的编排

### 2.1 基础链式调用

最简单的工作流是将提示模板和模型连接起来：

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# 加载环境变量
load_dotenv()

# 初始化模型
model = ChatOpenAI(
    model = 'glm-4',
    openai_api_base = 'https://open.bigmodel.cn/api/paas/v4/',
    openai_api_key = os.getenv("ZHIPU_API_KEY"),
    max_tokens = 500,
    temperature = 0.3
)

# 创建提示模板
prompt_template = ChatPromptTemplate.from_messages([
    ('system', "你是世界级技术专家，请用中文回复所有问题"),
    ('human', "{input}")
])

# 创建链式调用
chain = prompt_template | model

# 调用并获取结果
result = chain.invoke({"input": "1+1=多少"})
print(result.content)
# 输出示例: 1+1=2。如果您有其他问题或需要更专业的技术解答，请随时提问。
```

### 2.2 流式输出

对于长响应，流式输出可以提供更好的用户体验 (可以看见输出执行到哪一步了)

```python
# 流式调用
chunks = []
for chunk in model.stream("天空是什么颜色？"):
    chunks.append(chunk)
    print(chunk.content, end="|", flush=True)
# 输出示例: 天空|的颜色|通常|是由|多种|因素|决定的|，|包括|时间|、|天气|...

# 流式链式调用
stream_chain = prompt_template | model
for chunk in stream_chain.stream({"input": "解释一下量子计算"}):
    # 实时处理每个文本块
    print(chunk.content, end="", flush=True)
```

### 2.3 组合多个组件

LangChain 允许组合多个组件以构建复杂的处理流程：

```python
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 创建输出解析器
output_parser = StrOutputParser()

# 构建更复杂的工作流
workflow = (
    {"input": RunnablePassthrough()} # RunnablePassthrough就是个占位符,接受"input"返回一个格式化的prompt
    | prompt_template 
    | model 
    | output_parser
)

# 调用工作流
result = workflow.invoke("什么是机器学习？")
print(result)  # 直接输出字符串，而不是消息对象
```

### 2.4 条件分支

使用 RunnableBranch 实现条件逻辑：

```python
from langchain_core.runnables import RunnableBranch

# 定义条件函数
def is_math_question(input_text):
    math_keywords = ["计算", "加", "减", "乘", "除", "方程", "数学"]
    return any(keyword in input_text for keyword in math_keywords)

# 数学问题模板
math_template = ChatPromptTemplate.from_messages([
    ("system", "你是一名数学专家，善于解决各类数学问题"),
    ("human", "{input}")
])

# 通用问题模板
general_template = ChatPromptTemplate.from_messages([
    ("system", "你是一名通用助手，提供全面的信息"),
    ("human", "{input}")
])

# 创建分支链
branch_chain = RunnableBranch(
    (is_math_question, math_template | model | StrOutputParser()),
    (general_template | model | StrOutputParser())
)

# 测试分支
math_result = branch_chain.invoke("计算25乘以4等于多少？") # 含有关键词则选择math_template
print("数学问题回答:", math_result)

general_result = branch_chain.invoke("推荐一本科幻小说")
print("一般问题回答:", general_result)
```

### 2.5 Map-Reduce 模式

处理大量数据的常用模式：

```python
from langchain_core.runnables import RunnableMap

# 准备多个输入
documents = [
    "Python是一种解释型高级编程语言，由Guido van Rossum于1991年创建",
    "Java是一种广泛使用的编程语言，特点是"一次编写，到处运行"",
    "JavaScript是一种主要用于Web开发的脚本语言"
]

# 创建摘要模板
summarize_template = ChatPromptTemplate.from_messages([
    ("system", "你是专业的文本分析师，请对以下文本进行简洁摘要"),
    ("human", "{text}")
])

# Map阶段：单独处理每个文档
map_chain = summarize_template | model | StrOutputParser()

# 对每个文档应用处理
summaries = [map_chain.invoke({"text": doc}) for doc in documents]
print("单独摘要:", summaries)

# Reduce阶段：合并结果
combine_template = ChatPromptTemplate.from_messages([
    ("system", "你是信息整合专家，请将这些摘要组合成一个连贯的段落"),
    ("human", "这些是不同编程语言的摘要，请整合:\n{summaries}")
])

reduce_chain = combine_template | model | StrOutputParser()
final_result = reduce_chain.invoke({"summaries": "\n".join(summaries)})
print("合并结果:", final_result)
```

### 2.6 错误处理

在工作流中添加错误处理：

```python
from langchain_core.runnables import RunnablePassthrough

# 添加错误处理的工作流
def handle_error(error):
    print(f"发生错误: {error}")
    return "很抱歉，处理您的请求时出现了问题，请稍后再试。"

robust_chain = (
    prompt_template
    | model.with_fallbacks([handle_error])
    | StrOutputParser()
)

# 正常请求
normal_result = robust_chain.invoke({"input": "什么是人工智能？"})
print("正常结果:", normal_result)

# 模拟错误情况
try:
    # 这里可以模拟一个会导致错误的输入
    error_result = robust_chain.invoke({"wrong_key": "这会导致错误"})
    print("错误处理结果:", error_result)
except Exception as e:
    print(f"未捕获的错误: {e}")
```

### 2.7 LCEL 完整示例

下面是一个综合应用 LCEL 构建复杂工作流的完整示例：

```python
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_core.output_parsers import StrOutputParser

# 创建并行处理步骤
parallel_chain = RunnableParallel(
    summary=ChatPromptTemplate.from_messages([
        ("system", "你是摘要专家"),
        ("human", "请总结以下内容：{input}")
    ]) | model | StrOutputParser(),
    
    translation=ChatPromptTemplate.from_messages([
        ("system", "你是翻译专家"),
        ("human", "请将以下内容翻译成英文：{input}")
    ]) | model | StrOutputParser(),
    
    keywords=ChatPromptTemplate.from_messages([
        ("system", "你是关键词提取专家"),
        ("human", "请从以下内容提取5个关键词：{input}")
    ]) | model | StrOutputParser()
)

# 创建组合结果的模板
combine_template = ChatPromptTemplate.from_messages([
    ("system", "你是内容整合专家"),
    ("human", """请整合以下信息成一个格式化报告:
    原始内容: {original}
    摘要: {results.summary}
    英文翻译: {results.translation}
    关键词: {results.keywords}
    """)
])

# 构建完整工作流
complete_workflow = (
    {
        "original": RunnablePassthrough(),
        "results": parallel_chain
    }
    | combine_template
    | model
    | StrOutputParser()
)

# 测试完整工作流
test_content = "人工智能(AI)是计算机科学的一个前沿领域，致力于创建能够模拟人类智能的系统。它包括机器学习、自然语言处理和计算机视觉等多个子领域。"
result = complete_workflow.invoke(test_content)
print(result)
```

关键一步是，把输入传给 original 和 results
输出：
```python
{
    "original": "原始内容",
    "results": {
        "summary": "...",
        "translation": "...",
        "keywords": "..."
    }
}
```

## 3. langchain 消息管理和聊天历史存储


### 3.1 基础消息类型

langchain 定义了多种消息类型来表示对话中的不同角色：

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import (
    SystemMessage,
    HumanMessage, 
    AIMessage,
    FunctionMessage
)

# 加载环境变量
load_dotenv()

# 初始化模型
model = ChatOpenAI(
    model = 'glm-4',
    openai_api_base = 'https://open.bigmodel.cn/api/paas/v4/',
    openai_api_key = os.getenv("ZHIPU_API_KEY"),
    max_tokens = 500,
    temperature = 0.3
)

# 创建各种类型的消息
system_message = SystemMessage(content="你是一个有用的AI助手")
human_message = HumanMessage(content="你好，请问今天天气怎么样？")
ai_message = AIMessage(content="我无法获取实时天气信息，但我可以帮你查询天气预报网站")
function_message = FunctionMessage(
    name="get_weather",
    content='{"location": "北京", "temperature": "25°C", "condition": "晴天"}'
)

# 打印各种消息
print(f"系统消息: {system_message}")
print(f"用户消息: {human_message}")
print(f"AI消息: {ai_message}")
print(f"函数消息: {function_message}")
```

### 3.2 构建对话历史

使用消息列表构建对话历史：

```python
# 创建一个对话历史
messages = [
    SystemMessage(content="你是一位有帮助的AI助手，专注于提供简洁的回答"),
    HumanMessage(content="你好"),
    AIMessage(content="你好！我能帮你什么忙？"),
    HumanMessage(content="什么是机器学习？")
]

# 使用模型生成回复
response = model.invoke(messages)
print(response.content)
# 输出示例: 机器学习是人工智能的一个子领域，它使计算机系统能够通过数据学习和改进，而无需显式编程...

# 将新的消息添加到历史中
messages.append(response)
messages.append(HumanMessage(content="给我一个机器学习的简单例子"))

# 继续对话
next_response = model.invoke(messages)
print(next_response.content)
# 输出示例: 一个简单的机器学习例子是垃圾邮件过滤器。系统通过分析已标记为"垃圾"或"非垃圾"的邮件样本...
```

### 3.3 使用 MessagePlaceholder 动态插入历史

```python
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# 创建包含历史占位符的模板
template = ChatPromptTemplate.from_messages([
    SystemMessage(content="你是一位友好的AI助手"),
    MessagesPlaceholder(variable_name="chat_history"),  # 动态插入历史
    ("human", "{input}")
])

# 准备历史消息
chat_history = [
    HumanMessage(content="Python中如何打开文件？"),
    AIMessage(content="在Python中，你可以使用open()函数打开文件。基本语法是：\nfile = open('filename.txt', 'r')")
]

# 格式化消息并获取回复
messages = template.format_messages(
    chat_history=chat_history,
    input="如何关闭文件？"
)

response = model.invoke(messages)
print(response.content)
# 输出示例: 在Python中，你可以使用file.close()方法关闭已打开的文件...
```

### 3.4 基于内存的聊天历史存储

使用 ConversationBufferMemory 存储完整对话历史：

```python
from langchain.memory import ConversationBufferMemory
from langchain_core.messages import get_buffer_string

# 创建基于缓冲区的内存
memory = ConversationBufferMemory(return_messages=True)

# 添加消息到内存
memory.chat_memory.add_user_message("你好")
memory.chat_memory.add_ai_message("你好！有什么我可以帮助你的？")
memory.chat_memory.add_user_message("什么是LangChain？")

# 获取并查看历史消息
messages = memory.load_memory_variables({})["history"]
print("历史消息:", messages)

# 使用历史记录生成回复
template = ChatPromptTemplate.from_messages([
    SystemMessage(content="你是一位LangChain专家"),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

chain = template | model

response = chain.invoke({
    "history": messages,
    "input": "它有哪些主要组件？"
})

print("回复:", response.content)

# 将新回复添加到内存
memory.chat_memory.add_user_message("它有哪些主要组件？")
memory.chat_memory.add_ai_message(response.content)

# 查看更新后的历史
updated_history = memory.load_memory_variables({})["history"]
print("更新后的历史长度:", len(updated_history))
```

### 3.5 窗口记忆存储

限制历史记录长度，仅保留最近的消息：

```python
from langchain.memory import ConversationBufferWindowMemory

# 创建窗口内存，只保留最近的k条消息
window_memory = ConversationBufferWindowMemory(k=2, return_messages=True)

# 添加一系列消息
window_memory.chat_memory.add_user_message("你好")
window_memory.chat_memory.add_ai_message("你好！我能帮你什么忙？")
window_memory.chat_memory.add_user_message("什么是神经网络？")
window_memory.chat_memory.add_ai_message("神经网络是一种模拟人脑结构和功能的机器学习模型...")

# 获取窗口内的历史（只有最近的2条）
window_messages = window_memory.load_memory_variables({})["history"]
print("窗口内的历史消息:", [msg.content for msg in window_messages])
# 输出应该只有最后两条消息关于神经网络的交流
```

### 3.6 摘要记忆存储

使用模型总结长对话历史，减少 token 消耗：

```python
from langchain.memory import ConversationSummaryMemory

# 创建摘要内存
summary_memory = ConversationSummaryMemory(llm=model, return_messages=True)

# 添加一系列消息
summary_memory.chat_memory.add_user_message("你好，我想学习编程")
summary_memory.chat_memory.add_ai_message("你好！学习编程是个很好的决定。你有什么特定的编程语言或领域感兴趣吗？")
summary_memory.chat_memory.add_user_message("我对Python和数据科学感兴趣")
summary_memory.chat_memory.add_ai_message("Python是数据科学的绝佳选择！它有许多强大的库如NumPy、Pandas和Scikit-learn...")
summary_memory.chat_memory.add_user_message("我应该从哪里开始学习？")
summary_memory.chat_memory.add_ai_message("我建议从Python基础开始，然后逐步学习数据操作和分析...")

# 获取摘要记忆
summary = summary_memory.load_memory_variables({})
print("对话摘要:", summary)

# 创建包含摘要的提示
summary_template = ChatPromptTemplate.from_messages([
    SystemMessage(content="你是一位编程导师"),
    ("human", "我们之前聊了什么？")
])

summary_chain = summary_template | model

# 使用摘要回答问题
response = summary_chain.invoke({})
print("基于摘要的回复:", response.content)
```

### 3.7 组合记忆策略

结合多种记忆策略：

```python
from langchain.memory import CombinedMemory
from langchain.memory import ConversationEntityMemory

# 创建实体记忆（记录对话中提到的关键实体）
entity_memory = ConversationEntityMemory(llm=model)

# 创建窗口记忆（保留最近的消息）
window_memory = ConversationBufferWindowMemory(k=3)

# 组合不同的记忆策略
combined_memory = CombinedMemory(memories=[entity_memory, window_memory])
```

### 3.8 使用外部存储持久化聊天历史

将对话历史保存到外部数据库：

```python
# 示例：使用Redis存储聊天历史
from langchain.memory import RedisChatMessageHistory
import os

# 设置Redis连接（需要安装redis包：pip install redis）
# 这里使用示例URL，实际使用时替换为你的Redis实例URL
redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# 创建基于Redis的聊天历史存储
session_id = "user-123"  # 通常是用户的唯一标识符
message_history = RedisChatMessageHistory(session_id=session_id, url=redis_url)

# 添加消息到Redis
message_history.add_user_message("你好，我有关于Python的问题")
message_history.add_ai_message("你好！请问有什么Python问题我可以帮助你解决？")

# 从Redis获取消息
messages = message_history.messages
print("从Redis获取的消息:", [msg.content for msg in messages])

# 清空消息（可选）
# message_history.clear()
```

### 3.9 构建完整的带记忆对话链

将内存组件与对话链集成：

```python
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

# 创建对话内存
memory = ConversationBufferMemory()

# 创建对话链
conversation = ConversationChain(
    llm=model,
    memory=memory,
    verbose=True  # 设置为True可以看到详细处理过程
)

# 开始对话
response1 = conversation.predict(input="你好")
print("回复1:", response1)

response2 = conversation.predict(input="我想学习编程，有什么建议？")
print("回复2:", response2)

response3 = conversation.predict(input="这些编程语言中哪个最简单？")
print("回复3:", response3)

# 查看内存中存储的内容
print("对话历史:", memory.buffer)
```

## 4. langchain 多模态输入和自定义输出

### 4.1 多模态输入 - 图像处理

使用支持多模态的模型处理图像输入：

```python
import os
import base64
import httpx
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

# 初始化支持多模态的模型
model = ChatOpenAI(
    model="qwen-vl-max",  # 使用支持视觉的模型
    api_key=os.getenv("QWEN_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    max_tokens=500,
    temperature=0.3
)

# 获取图片并转换为base64格式
image_url = "https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/wechat_bcode.png"
image_data = base64.b64encode(httpx.get(image_url).content).decode("utf-8")

# 创建多模态消息
message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "这是一张什么图片"
        },
        {
            "type": "image_url",
            "image_url": {
                "url": "data:image/png;base64," + image_data  
            }
        }
    ]
)

# 获取模型回复
response = model.invoke([message])
print(response.content)
# 输出示例：这是一张微信二维码图片，用于添加好友。图片上方有一个头像和一个昵称"amaranth"，下方是一个标准的微信二维码图案，中间是微信的标志。二维码下方的文字提示用户扫描二维码以添加对方为微信好友。
```


### 4.2 处理多张图像

能够同时处理多张图像并分析它们之间的关系：

```python
import base64
import httpx
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI

# 获取两张不同的图片
image_url1 = "https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/wechat_bcode.png"
image_url2 = "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg"

# 转换图片为base64格式
image_data1 = base64.b64encode(httpx.get(image_url1).content).decode("utf-8")
image_data2 = base64.b64encode(httpx.get(image_url2).content).decode("utf-8")

# 创建包含两张图片的消息
message = HumanMessage(
    content = [
        {"type": "text", "text": "这两张图片有什么关系"},
        {
            "type": "image_url",
            "image_url": {"url": f"data:image/png;base64,{image_data1}"}
        },
        {
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{image_data2}"}
        }
    ]
)

# 获取模型回复
response = model.invoke([message])
print(response.content)

# 输出示例：这两张图片之间没有明显的直接关系。第一张图片是一个微信二维码，用于添加名
#为"amaranth"的好友。第二张图片则展示了一位女士和一只狗在海滩上互动的温馨场景。
```

这种方式使得我们可以先通过本地网络访问 url，下载图片后传递给 model, 如果直接传入 url，aliyun (本例中的服务器) 可能无法访问 url



### 4.4 自定义输出格式

#### 4.4.1 使用输出解析器生成特定格式的输出示例

通过输出解析器可以将模型输出转换为指定格式：

```python
from langchain_core.output_parsers import JsonOutputParser, XMLOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI

# 定义输出结构
class Joke(BaseModel):
    setup: str = Field(description="设置笑话的问题")
    punchline: str = Field(description="解决笑话的答案")

# 创建查询
query = "生成周星驰的简化电影作品列表，按照最新的时间降序"

# 使用XML解析器
parser = XMLOutputParser()

# 创建提示模板
prompt = PromptTemplate(
    template="回答用户的查询。\n{format_instructions}\n{query}\n",
    input_variables={"query"},
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

# 创建链
chain = prompt | model | parser
response = chain.invoke({"query": query})
print(response)

# 输出示例
# {'filmography': [{'actor': [{'movie': [{'title': '西游记·降魔篇'}, {'releaseYear': '2013'}]}, {'movie': [{'title': '长江七号'}, {'releaseYear': '2008'}]}, {'movie': [{'title': '功夫'}, {'releaseYear': '2004'}]}, {'movie': [{'title': '少林足球'}, {'releaseYear': '2001'}]}]}]}
```


---
tags:
  - "#langchain"
---

# langchain 

## 1. Prompt 系统


### 1.1 基础 PromptTemplate

最简单的模板系统，适合单轮对话：

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate

# 加载环境变量
load_dotenv()

# 初始化模型
model = ChatOpenAI(
    model = 'glm-4',  # 使用智谱的GLM-4模型
    openai_api_base = 'https://open.bigmodel.cn/api/paas/v4/',  # 智谱API地址
    openai_api_key = os.getenv("ZHIPU_API_KEY"),  # 从环境变量获取API密钥
    max_tokens = 500,  # 限制输出长度
    temperature = 0.3  # 控制输出的随机性，越低越稳定
)

# 创建一个简单模板
template = PromptTemplate.from_template(
    "给我讲一个{input}"
)
message_a = template.format(input="笑话")
print(message_a)  # 输出: 给我讲一个笑话

# 调用模型
result = model.invoke(message_a)
print(result.content)
# 输出示例：当然，这里有一个简单的笑话：有一天，小明问妈妈："妈妈，为什么你的眼睛下面有黑黑的东西？"...
```

### 1.2 ChatPromptTemplate

#### 1.2.1 基于元组创建

```python
from langchain_core.prompts import ChatPromptTemplate

# 创建聊天模板
chat_template = ChatPromptTemplate.from_messages([
    ("system", "你是一位人工智能助手，你的名字是{name}."),  # 系统级指令，设定AI角色
    ("human", "你好"),  # 代表用户的输入
    ("ai", "我很好，谢谢"),  # 用于构建对话历史
    ("human", "{user_input}"),  # 动态用户输入
])

# 格式化并获取消息
messages = chat_template.format_messages(
    name="glm4",
    user_input="你叫什么名字"
)
print(messages)  # 输出格式化后的消息列表

# 调用模型获取回复
output = model.invoke(messages)
print(output.content)
# 输出示例: 我是人工智能助手，你可以称呼我为glm4。有什么我可以帮助你的吗？

# 链式调用
chain = chat_template | model
output = chain.invoke({"name": "glm4", "user_input": "你的名字叫什么"})
print(output)
```

#### 1.2.2 基于 Message 对象创建

```python
from langchain_core.messages import SystemMessage, AIMessage, HumanMessage
from langchain_core.prompts import HumanMessagePromptTemplate

# 使用更结构化的方式创建模板
chat_template = ChatPromptTemplate.from_messages([
    SystemMessage(
        content="你是一个乐于助人的助手，可以润色内容，使其看起来简单"
    ),
    HumanMessagePromptTemplate.from_template("{text}")  # 需要用户输入的地方要使用template
])

# 格式化消息
messages = chat_template.format_messages(text="我不爱吃饭")
print(messages)


output = model.invoke(messages)
print(output.content)
# 输出示例: 我不是很饿。或者更儿童化的表达：我不想吃东西。
```

#### 1.2.3 使用 MessagesPlaceholder 保持对话历史

```python
from langchain_core.prompts import MessagesPlaceholder

# 创建支持对话历史的模板
chat_template = ChatPromptTemplate.from_messages([
    SystemMessage(content="你是一个乐于助人的助手"),
    MessagesPlaceholder(variable_name="history"),  # 用于插入对话历史
    HumanMessagePromptTemplate.from_template("{input}")
])

# 准备对话历史
history = [
    HumanMessage(content="你好"),
    AIMessage(content="你好！有什么我可以帮你的吗"),
    HumanMessage(content="python 是什么？"),
    AIMessage(content="python是一种编程语言...")
]

# 格式化消息
messages = chat_template.format_messages(
    history=history,
    input="能给我一个Python例子吗？"
)


result = model.invoke(messages)
print(result.content)
# 输出示例:
# 当然可以。下面是一个简单的Python程序例子，它会打印出"Hello, World!"...
```

### 1.3 Few-Shot Learning 提示模板

#### 1.3.1 基础 Few-Shot 模板

通过提供示例来引导模型输出：

```python
from langchain.prompts import FewShotPromptTemplate
from langchain.prompts.prompt import PromptTemplate

# 准备示例
examples = [
    {
        "question": "如何反转一个字符串？",
        "answer": "要反转字符串'hello'，可以使用切片：'hello'[::-1]，结果是'olleh'"
    },
    {
        "question": "如何获取列表长度？",
        "answer": "使用len()函数，例如：len([1,2,3])，结果是3"
    },
    {
        "question": "如何判断是否是偶数？",
        "answer": "使用取模运算符%，例如：num % 2 == 0，如果为True则是偶数"
    }
]

# 创建示例模板
example_template = """
问题：{question}
答案：{answer}
"""

example_prompt = PromptTemplate(
    input_variables=["question", "answer"],
    template=example_template
)

# 创建 Few-Shot 模板
few_shot_prompt = FewShotPromptTemplate(
    examples=examples,  # 示例列表
    example_prompt=example_prompt,  # 示例模板
    prefix="你是一个Python专家，请按照以下例子的风格回答问题：",  # 前缀说明
    suffix="问题：{input_question}\n答案：",  # 后缀格式
    input_variables=["input_question"], # 可变输入
    example_separator="\n\n"  # 示例之间的分隔符
)

# 格式化模板
prompt = few_shot_prompt.format(input_question="如何计算平方根")
print(prompt)  # 打印完整的提示内容

response = model.invoke(prompt)
print(response.content)
# 输出示例: 使用math模块中的sqrt()函数，例如：import math; math.sqrt(9)，结果是3.0
```

#### 1.3.2 基于语义相似度的 Few-Shot 模板

根据输入动态选择最相关的示例：

```python
from langchain.prompts.example_selector import SemanticSimilarityExampleSelector
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# 准备更多示例
examples = [
    {"question": "如何反转字符串？", 
     "answer": "使用切片：str[::-1]"},
    {"question": "如何获取字典的所有键？", 
     "answer": "使用dict.keys()方法"},
    {"question": "如何连接两个列表？", 
     "answer": "使用list1 + list2或list1.extend(list2)"},
    {"question": "如何删除列表中的重复元素？", 
     "answer": "使用list(set(my_list))"},
    {"question": "如何读取文件？", 
     "answer": "使用with open('file.txt', 'r') as f:"}
]

# 创建embedding模型
glm_embeddings = OpenAIEmbeddings(
    model = "embedding-2",
    openai_api_base = "https://open.bigmodel.cn/api/paas/v4/",
    openai_api_key = os.getenv("ZHIPU_API_KEY")
)

# 创建示例选择器
example_selector = SemanticSimilarityExampleSelector.from_examples(
    examples,                # 示例列表
    glm_embeddings,         # 使用的词嵌入模型
    Chroma,                 # 向量存储
    k=2                     # 选择最相似的2个示例
)

# 示例模板
example_prompt = PromptTemplate(
    input_variables=["question", "answer"],
    template="问：{question}\n答：{answer}"
)

# 创建动态 Few-Shot 模板
prompt = FewShotPromptTemplate(
    example_selector=example_selector,  # 使用语义选择器
    example_prompt=example_prompt,
    prefix="你是Python专家，请回答问题：",
    suffix="问：{input}\n答：",
    input_variables=["input"]
)

# 测试模板
result = prompt.format(input="如何在列表末尾添加元素")
print(result)
# 输出示例会显示最相关的两个示例，然后是问题
```

## 2. langchain 工作流编排

langchain 主要通过 LCEL (LangChain Expression Language) 实现工作流的编排

### 2.1 基础链式调用

最简单的工作流是将提示模板和模型连接起来：

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# 加载环境变量
load_dotenv()

# 初始化模型
model = ChatOpenAI(
    model = 'glm-4',
    openai_api_base = 'https://open.bigmodel.cn/api/paas/v4/',
    openai_api_key = os.getenv("ZHIPU_API_KEY"),
    max_tokens = 500,
    temperature = 0.3
)

# 创建提示模板
prompt_template = ChatPromptTemplate.from_messages([
    ('system', "你是世界级技术专家，请用中文回复所有问题"),
    ('human', "{input}")
])

# 创建链式调用
chain = prompt_template | model

# 调用并获取结果
result = chain.invoke({"input": "1+1=多少"})
print(result.content)
# 输出示例: 1+1=2。如果您有其他问题或需要更专业的技术解答，请随时提问。
```

### 2.2 流式输出

对于长响应，流式输出可以提供更好的用户体验 (可以看见输出执行到哪一步了)

```python
# 流式调用
chunks = []
for chunk in model.stream("天空是什么颜色？"):
    chunks.append(chunk)
    print(chunk.content, end="|", flush=True)
# 输出示例: 天空|的颜色|通常|是由|多种|因素|决定的|，|包括|时间|、|天气|...

# 流式链式调用
stream_chain = prompt_template | model
for chunk in stream_chain.stream({"input": "解释一下量子计算"}):
    # 实时处理每个文本块
    print(chunk.content, end="", flush=True)
```

### 2.3 组合多个组件

LangChain 允许组合多个组件以构建复杂的处理流程：

```python
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 创建输出解析器
output_parser = StrOutputParser()

# 构建更复杂的工作流
workflow = (
    {"input": RunnablePassthrough()} # RunnablePassthrough就是个占位符,接受"input"返回一个格式化的prompt
    | prompt_template 
    | model 
    | output_parser
)

# 调用工作流
result = workflow.invoke("什么是机器学习？")
print(result)  # 直接输出字符串，而不是消息对象
```

### 2.4 条件分支

使用 RunnableBranch 实现条件逻辑：

```python
from langchain_core.runnables import RunnableBranch

# 定义条件函数
def is_math_question(input_text):
    math_keywords = ["计算", "加", "减", "乘", "除", "方程", "数学"]
    return any(keyword in input_text for keyword in math_keywords)

# 数学问题模板
math_template = ChatPromptTemplate.from_messages([
    ("system", "你是一名数学专家，善于解决各类数学问题"),
    ("human", "{input}")
])

# 通用问题模板
general_template = ChatPromptTemplate.from_messages([
    ("system", "你是一名通用助手，提供全面的信息"),
    ("human", "{input}")
])

# 创建分支链
branch_chain = RunnableBranch(
    (is_math_question, math_template | model | StrOutputParser()),
    (general_template | model | StrOutputParser())
)

# 测试分支
math_result = branch_chain.invoke("计算25乘以4等于多少？") # 含有关键词则选择math_template
print("数学问题回答:", math_result)

general_result = branch_chain.invoke("推荐一本科幻小说")
print("一般问题回答:", general_result)
```

### 2.5 Map-Reduce 模式

处理大量数据的常用模式：

```python
from langchain_core.runnables import RunnableMap

# 准备多个输入
documents = [
    "Python是一种解释型高级编程语言，由Guido van Rossum于1991年创建",
    "Java是一种广泛使用的编程语言，特点是"一次编写，到处运行"",
    "JavaScript是一种主要用于Web开发的脚本语言"
]

# 创建摘要模板
summarize_template = ChatPromptTemplate.from_messages([
    ("system", "你是专业的文本分析师，请对以下文本进行简洁摘要"),
    ("human", "{text}")
])

# Map阶段：单独处理每个文档
map_chain = summarize_template | model | StrOutputParser()

# 对每个文档应用处理
summaries = [map_chain.invoke({"text": doc}) for doc in documents]
print("单独摘要:", summaries)

# Reduce阶段：合并结果
combine_template = ChatPromptTemplate.from_messages([
    ("system", "你是信息整合专家，请将这些摘要组合成一个连贯的段落"),
    ("human", "这些是不同编程语言的摘要，请整合:\n{summaries}")
])

reduce_chain = combine_template | model | StrOutputParser()
final_result = reduce_chain.invoke({"summaries": "\n".join(summaries)})
print("合并结果:", final_result)
```

### 2.6 错误处理

在工作流中添加错误处理：

```python
from langchain_core.runnables import RunnablePassthrough

# 添加错误处理的工作流
def handle_error(error):
    print(f"发生错误: {error}")
    return "很抱歉，处理您的请求时出现了问题，请稍后再试。"

robust_chain = (
    prompt_template
    | model.with_fallbacks([handle_error])
    | StrOutputParser()
)

# 正常请求
normal_result = robust_chain.invoke({"input": "什么是人工智能？"})
print("正常结果:", normal_result)

# 模拟错误情况
try:
    # 这里可以模拟一个会导致错误的输入
    error_result = robust_chain.invoke({"wrong_key": "这会导致错误"})
    print("错误处理结果:", error_result)
except Exception as e:
    print(f"未捕获的错误: {e}")
```

### 2.7 LCEL 完整示例

下面是一个综合应用 LCEL 构建复杂工作流的完整示例：

```python
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_core.output_parsers import StrOutputParser

# 创建并行处理步骤
parallel_chain = RunnableParallel(
    summary=ChatPromptTemplate.from_messages([
        ("system", "你是摘要专家"),
        ("human", "请总结以下内容：{input}")
    ]) | model | StrOutputParser(),
    
    translation=ChatPromptTemplate.from_messages([
        ("system", "你是翻译专家"),
        ("human", "请将以下内容翻译成英文：{input}")
    ]) | model | StrOutputParser(),
    
    keywords=ChatPromptTemplate.from_messages([
        ("system", "你是关键词提取专家"),
        ("human", "请从以下内容提取5个关键词：{input}")
    ]) | model | StrOutputParser()
)

# 创建组合结果的模板
combine_template = ChatPromptTemplate.from_messages([
    ("system", "你是内容整合专家"),
    ("human", """请整合以下信息成一个格式化报告:
    原始内容: {original}
    摘要: {results.summary}
    英文翻译: {results.translation}
    关键词: {results.keywords}
    """)
])

# 构建完整工作流
complete_workflow = (
    {
        "original": RunnablePassthrough(),
        "results": parallel_chain
    }
    | combine_template
    | model
    | StrOutputParser()
)

# 测试完整工作流
test_content = "人工智能(AI)是计算机科学的一个前沿领域，致力于创建能够模拟人类智能的系统。它包括机器学习、自然语言处理和计算机视觉等多个子领域。"
result = complete_workflow.invoke(test_content)
print(result)
```

关键一步是，把输入传给 original 和 results
输出：
```python
{
    "original": "原始内容",
    "results": {
        "summary": "...",
        "translation": "...",
        "keywords": "..."
    }
}
```

## 3. langchain 消息管理和聊天历史存储


### 3.1 基础消息类型

langchain 定义了多种消息类型来表示对话中的不同角色：

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import (
    SystemMessage,
    HumanMessage, 
    AIMessage,
    FunctionMessage
)

# 加载环境变量
load_dotenv()

# 初始化模型
model = ChatOpenAI(
    model = 'glm-4',
    openai_api_base = 'https://open.bigmodel.cn/api/paas/v4/',
    openai_api_key = os.getenv("ZHIPU_API_KEY"),
    max_tokens = 500,
    temperature = 0.3
)

# 创建各种类型的消息
system_message = SystemMessage(content="你是一个有用的AI助手")
human_message = HumanMessage(content="你好，请问今天天气怎么样？")
ai_message = AIMessage(content="我无法获取实时天气信息，但我可以帮你查询天气预报网站")
function_message = FunctionMessage(
    name="get_weather",
    content='{"location": "北京", "temperature": "25°C", "condition": "晴天"}'
)

# 打印各种消息
print(f"系统消息: {system_message}")
print(f"用户消息: {human_message}")
print(f"AI消息: {ai_message}")
print(f"函数消息: {function_message}")
```

### 3.2 构建对话历史

使用消息列表构建对话历史：

```python
# 创建一个对话历史
messages = [
    SystemMessage(content="你是一位有帮助的AI助手，专注于提供简洁的回答"),
    HumanMessage(content="你好"),
    AIMessage(content="你好！我能帮你什么忙？"),
    HumanMessage(content="什么是机器学习？")
]

# 使用模型生成回复
response = model.invoke(messages)
print(response.content)
# 输出示例: 机器学习是人工智能的一个子领域，它使计算机系统能够通过数据学习和改进，而无需显式编程...

# 将新的消息添加到历史中
messages.append(response)
messages.append(HumanMessage(content="给我一个机器学习的简单例子"))

# 继续对话
next_response = model.invoke(messages)
print(next_response.content)
# 输出示例: 一个简单的机器学习例子是垃圾邮件过滤器。系统通过分析已标记为"垃圾"或"非垃圾"的邮件样本...
```

### 3.3 使用 MessagePlaceholder 动态插入历史

```python
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# 创建包含历史占位符的模板
template = ChatPromptTemplate.from_messages([
    SystemMessage(content="你是一位友好的AI助手"),
    MessagesPlaceholder(variable_name="chat_history"),  # 动态插入历史
    ("human", "{input}")
])

# 准备历史消息
chat_history = [
    HumanMessage(content="Python中如何打开文件？"),
    AIMessage(content="在Python中，你可以使用open()函数打开文件。基本语法是：\nfile = open('filename.txt', 'r')")
]

# 格式化消息并获取回复
messages = template.format_messages(
    chat_history=chat_history,
    input="如何关闭文件？"
)

response = model.invoke(messages)
print(response.content)
# 输出示例: 在Python中，你可以使用file.close()方法关闭已打开的文件...
```

### 3.4 基于内存的聊天历史存储

使用 ConversationBufferMemory 存储完整对话历史：

```python
from langchain.memory import ConversationBufferMemory
from langchain_core.messages import get_buffer_string

# 创建基于缓冲区的内存
memory = ConversationBufferMemory(return_messages=True)

# 添加消息到内存
memory.chat_memory.add_user_message("你好")
memory.chat_memory.add_ai_message("你好！有什么我可以帮助你的？")
memory.chat_memory.add_user_message("什么是LangChain？")

# 获取并查看历史消息
messages = memory.load_memory_variables({})["history"]
print("历史消息:", messages)

# 使用历史记录生成回复
template = ChatPromptTemplate.from_messages([
    SystemMessage(content="你是一位LangChain专家"),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

chain = template | model

response = chain.invoke({
    "history": messages,
    "input": "它有哪些主要组件？"
})

print("回复:", response.content)

# 将新回复添加到内存
memory.chat_memory.add_user_message("它有哪些主要组件？")
memory.chat_memory.add_ai_message(response.content)

# 查看更新后的历史
updated_history = memory.load_memory_variables({})["history"]
print("更新后的历史长度:", len(updated_history))
```

### 3.5 窗口记忆存储

限制历史记录长度，仅保留最近的消息：

```python
from langchain.memory import ConversationBufferWindowMemory

# 创建窗口内存，只保留最近的k条消息
window_memory = ConversationBufferWindowMemory(k=2, return_messages=True)

# 添加一系列消息
window_memory.chat_memory.add_user_message("你好")
window_memory.chat_memory.add_ai_message("你好！我能帮你什么忙？")
window_memory.chat_memory.add_user_message("什么是神经网络？")
window_memory.chat_memory.add_ai_message("神经网络是一种模拟人脑结构和功能的机器学习模型...")

# 获取窗口内的历史（只有最近的2条）
window_messages = window_memory.load_memory_variables({})["history"]
print("窗口内的历史消息:", [msg.content for msg in window_messages])
# 输出应该只有最后两条消息关于神经网络的交流
```

### 3.6 摘要记忆存储

使用模型总结长对话历史，减少 token 消耗：

```python
from langchain.memory import ConversationSummaryMemory

# 创建摘要内存
summary_memory = ConversationSummaryMemory(llm=model, return_messages=True)

# 添加一系列消息
summary_memory.chat_memory.add_user_message("你好，我想学习编程")
summary_memory.chat_memory.add_ai_message("你好！学习编程是个很好的决定。你有什么特定的编程语言或领域感兴趣吗？")
summary_memory.chat_memory.add_user_message("我对Python和数据科学感兴趣")
summary_memory.chat_memory.add_ai_message("Python是数据科学的绝佳选择！它有许多强大的库如NumPy、Pandas和Scikit-learn...")
summary_memory.chat_memory.add_user_message("我应该从哪里开始学习？")
summary_memory.chat_memory.add_ai_message("我建议从Python基础开始，然后逐步学习数据操作和分析...")

# 获取摘要记忆
summary = summary_memory.load_memory_variables({})
print("对话摘要:", summary)

# 创建包含摘要的提示
summary_template = ChatPromptTemplate.from_messages([
    SystemMessage(content="你是一位编程导师"),
    ("human", "我们之前聊了什么？")
])

summary_chain = summary_template | model

# 使用摘要回答问题
response = summary_chain.invoke({})
print("基于摘要的回复:", response.content)
```

### 3.7 组合记忆策略

结合多种记忆策略：

```python
from langchain.memory import CombinedMemory
from langchain.memory import ConversationEntityMemory

# 创建实体记忆（记录对话中提到的关键实体）
entity_memory = ConversationEntityMemory(llm=model)

# 创建窗口记忆（保留最近的消息）
window_memory = ConversationBufferWindowMemory(k=3)

# 组合不同的记忆策略
combined_memory = CombinedMemory(memories=[entity_memory, window_memory])
```

### 3.8 使用外部存储持久化聊天历史

将对话历史保存到外部数据库：

```python
# 示例：使用Redis存储聊天历史
from langchain.memory import RedisChatMessageHistory
import os

# 设置Redis连接（需要安装redis包：pip install redis）
# 这里使用示例URL，实际使用时替换为你的Redis实例URL
redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# 创建基于Redis的聊天历史存储
session_id = "user-123"  # 通常是用户的唯一标识符
message_history = RedisChatMessageHistory(session_id=session_id, url=redis_url)

# 添加消息到Redis
message_history.add_user_message("你好，我有关于Python的问题")
message_history.add_ai_message("你好！请问有什么Python问题我可以帮助你解决？")

# 从Redis获取消息
messages = message_history.messages
print("从Redis获取的消息:", [msg.content for msg in messages])

# 清空消息（可选）
# message_history.clear()
```

### 3.9 构建完整的带记忆对话链

将内存组件与对话链集成：

```python
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

# 创建对话内存
memory = ConversationBufferMemory()

# 创建对话链
conversation = ConversationChain(
    llm=model,
    memory=memory,
    verbose=True  # 设置为True可以看到详细处理过程
)

# 开始对话
response1 = conversation.predict(input="你好")
print("回复1:", response1)

response2 = conversation.predict(input="我想学习编程，有什么建议？")
print("回复2:", response2)

response3 = conversation.predict(input="这些编程语言中哪个最简单？")
print("回复3:", response3)

# 查看内存中存储的内容
print("对话历史:", memory.buffer)
```

## 4. langchain 多模态输入和自定义输出

### 4.1 多模态输入 - 图像处理

使用支持多模态的模型处理图像输入：

```python
import os
import base64
import httpx
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

# 初始化支持多模态的模型
model = ChatOpenAI(
    model="qwen-vl-max",  # 使用支持视觉的模型
    api_key=os.getenv("QWEN_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    max_tokens=500,
    temperature=0.3
)

# 获取图片并转换为base64格式
image_url = "https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/wechat_bcode.png"
image_data = base64.b64encode(httpx.get(image_url).content).decode("utf-8")

# 创建多模态消息
message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "这是一张什么图片"
        },
        {
            "type": "image_url",
            "image_url": {
                "url": "data:image/png;base64," + image_data  
            }
        }
    ]
)

# 获取模型回复
response = model.invoke([message])
print(response.content)
# 输出示例：这是一张微信二维码图片，用于添加好友。图片上方有一个头像和一个昵称"amaranth"，下方是一个标准的微信二维码图案，中间是微信的标志。二维码下方的文字提示用户扫描二维码以添加对方为微信好友。
```


### 4.2 处理多张图像

能够同时处理多张图像并分析它们之间的关系：

```python
import base64
import httpx
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI

# 获取两张不同的图片
image_url1 = "https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/wechat_bcode.png"
image_url2 = "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg"

# 转换图片为base64格式
image_data1 = base64.b64encode(httpx.get(image_url1).content).decode("utf-8")
image_data2 = base64.b64encode(httpx.get(image_url2).content).decode("utf-8")

# 创建包含两张图片的消息
message = HumanMessage(
    content = [
        {"type": "text", "text": "这两张图片有什么关系"},
        {
            "type": "image_url",
            "image_url": {"url": f"data:image/png;base64,{image_data1}"}
        },
        {
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{image_data2}"}
        }
    ]
)

# 获取模型回复
response = model.invoke([message])
print(response.content)

# 输出示例：这两张图片之间没有明显的直接关系。第一张图片是一个微信二维码，用于添加名
#为"amaranth"的好友。第二张图片则展示了一位女士和一只狗在海滩上互动的温馨场景。
```

这种方式使得我们可以先通过本地网络访问 url，下载图片后传递给 model, 如果直接传入 url，aliyun (本例中的服务器) 可能无法访问 url



### 4.4 自定义输出格式

#### 4.4.1 使用输出解析器生成特定格式的输出示例

通过输出解析器可以将模型输出转换为指定格式：

```python
from langchain_core.output_parsers import JsonOutputParser, XMLOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI

# 定义输出结构
class Joke(BaseModel):
    setup: str = Field(description="设置笑话的问题")
    punchline: str = Field(description="解决笑话的答案")

# 创建查询
query = "生成周星驰的简化电影作品列表，按照最新的时间降序"

# 使用XML解析器
parser = XMLOutputParser()

# 创建提示模板
prompt = PromptTemplate(
    template="回答用户的查询。\n{format_instructions}\n{query}\n",
    input_variables={"query"},
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

# 创建链
chain = prompt | model | parser
response = chain.invoke({"query": query})
print(response)

# 输出示例
# {'filmography': [{'actor': [{'movie': [{'title': '西游记·降魔篇'}, {'releaseYear': '2013'}]}, {'movie': [{'title': '长江七号'}, {'releaseYear': '2008'}]}, {'movie': [{'title': '功夫'}, {'releaseYear': '2004'}]}, {'movie': [{'title': '少林足球'}, {'releaseYear': '2001'}]}]}]}
```


