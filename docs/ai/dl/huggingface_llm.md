---
tags:
  - course_notes
---

# Hugging Face LLM course 的一点记录

## 1. 尝试Pipeline  

```python
import transformers
import torch
from transformers import pipeline

classifier = pipeline("sentiment-analysis") # 引入分析情绪的模型
results = classifier([
    "I've been waiting for a HuggingFace course my whole life.", 
    "I hate this so much!"
])
print(results)
```

**输出结果**:
```python
[{'label': 'POSITIVE', 'score': 0.9598049521446228}, 
 {'label': 'NEGATIVE', 'score': 0.9994558691978455}]
```

Pipeline 自动完成了以下步骤:
1. 预处理 - 将文本转换为模型可以理解的格式，先 tokenize 然后转换为 word_table 的 id
2. 模型推理 - 通过神经网络进行前向传播
3. 后处理 - 将模型输出转换为人类可理解的格式，将 logits 转换为自然语言

---

## 2. 模型组件剖析

### 2.1 Tokenizer 

#### 2.1.1 基本使用

**直接使用 tokenizer**
```python
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
tokenizer("Using a Transformer network is simple")****
```

输出结果
```python
{'input_ids': [101, 7993, 170, 11303, 1200, 2443, 1110, 3014, 102],
 'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 0],
 'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1]}
```

可以输出包含了 input_ids, token_type_ids(代表这些 input_ids 属于索引为 0 的 sequence), attention_mask


**逐步进行分词**
```python
from transformers import AutoTokenizer

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)

# 基本分词操作
sequence = "I love hugging face!"
tokens = tokenizer.tokenize(sequence)
ids = tokenizer.convert_tokens_to_ids(tokens)
decoded_string = tokenizer.decode(ids) # 这是解码操作

print("Tokens:", tokens)
print("Token IDs:", ids)
print("Decoded String:", decoded_string)
```

**输出结果**:
```python
Tokens: ['i', 'love', 'hugging', 'face', '!']
Token IDs: [1045, 2293, 17647, 2227, 999]
Decoded String: i love hugging face!
```

#### 2.1.2 处理多个序列

**注意实际使用中基本不会使用逐步 tokenize 的操作，所以这一部分可以跳过**

```python
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence = "I've been waiting for a HuggingFace course my whole life."

tokens = tokenizer.tokenize(sequence)
ids = tokenizer.convert_tokens_to_ids(tokens)
input_ids = torch.tensor(ids)
# This line will fail.
model(input_ids)
```

会报错，因为 model 需要接收二维的张量

改成
```python
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence = "I've been waiting for a HuggingFace course my whole life."

tokens = tokenizer.tokenize(sequence)
ids = tokenizer.convert_tokens_to_ids(tokens)

input_ids = torch.tensor([ids])
print("Input IDs:", input_ids)

output = model(input_ids)
print("Logits:", output.logits)
```

```python
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence1_ids = [[200, 200, 200]]
sequence2_ids = [[200, 200]]
batched_ids = [
    [200, 200, 200],
    [200, 200, tokenizer.pad_token_id],
]

print(model(torch.tensor(sequence1_ids)).logits)
print(model(torch.tensor(sequence2_ids)).logits)
print(model(torch.tensor(batched_ids)).logits)
```

**输出结果：**
```python
tensor([[ 1.5694, -1.3895]], grad_fn=<AddmmBackward>)
tensor([[ 0.5803, -0.4125]], grad_fn=<AddmmBackward>)
tensor([[ 1.5694, -1.3895],
        [ 1.3373, -1.2163]], grad_fn=<AddmmBackward>)
```
发现 batch_ids 结果第二行和 sequence2_ids 结果不一样，因为 self-attention 会注意到所有的 token，包括 padding


tokenizer 支持同时处理多个 sequence, 上文的 padding 就是用于这里，所有句子都会被 Padding 到最长的 sequence 长度
```python
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)
sequences = ["I've been waiting for a HuggingFace course my whole life.", "So have I!"]

tokens = tokenizer(sequences, padding=True, truncation=True, return_tensors="pt")
output = model(**tokens)
```



### 2.2 模型操作

#### 2.2.1 模型创建方式

```python
# 方式1: 从配置创建(随机初始化) 只有框架，参数随机
from transformers import BertConfig, BertModel
config = BertConfig()
model = BertModel(config)
print(model)
```

**输出结果**:
```python
BertModel(
  (embeddings): BertEmbeddings(...)
  (encoder): BertEncoder(...)
  (pooler): BertPooler(...)
)
```

```python
# 方式2: 加载预训练模型
model = BertModel.from_pretrained("bert-base-cased")
print(model)
```

**输出结果**:
```python
Some weights of the model checkpoint at bert-base-cased were not used when initializing BertModel: ['cls.predictions.bias', ...]
- This IS expected if you are initializing BertModel from the checkpoint of a model trained on another task.
```

输出结果的意思是：bert-base-cased 有很多部分如 transformer 层和输出头，我们使用 BertModel 时只用到了 transformer 层的权重
#### 2.2.2 保存模型

```python
model.save_pretrained("directory")
```

保存后会在'directory'下生成两个文件:
- `config.json` : 保存模型架构配置。
- `pytorch_model.bin` : 保存模型权重。

---

### 2.3 序列分类任务为例

```python
from transformers import AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

# 模型推理
inputs = tokenizer(
    ["I've been waiting for a HuggingFace course my whole life.", 
     "I hate this so much!"], 
    padding=True, truncation=True, return_tensors="pt"
)
outputs = model(**inputs)
predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)

print("Logits:", outputs.logits)
print("Predictions:", predictions)
```

**输出结果**:
```python
Logits: tensor([[-1.5607,  1.6123],
                [ 4.1692, -3.3464]])
Predictions: tensor([[0.0420, 0.9580],
                     [0.9995, 0.0005]])
```

---

## 3. 模型训练实践

### 3.1 基本训练循环

```python
from torch.optim import AdamW
from transformers import get_scheduler

# 优化器配置
optimizer = AdamW(model.parameters(), lr=5e-5)

# 学习率调度器配置
num_epochs = 3
num_training_steps = num_epochs * len(train_dataloader)
lr_scheduler = get_scheduler(
    "linear",
    optimizer=optimizer,
    num_warmup_steps=0,
    num_training_steps=num_training_steps
)

# 训练循环
model.train()
for epoch in range(num_epochs):
    for batch in train_dataloader:
        outputs = model(**batch)
        loss = outputs.loss
        loss.backward()
        
        optimizer.step()
        lr_scheduler.step()
        optimizer.zero_grad()
```

---

### 3.2 使用 Trainer API

```python
from transformers import Trainer, TrainingArguments

# 训练参数配置
training_args = TrainingArguments(
    "test-trainer",
    evaluation_strategy="epoch"
)

# 创建 Trainer 实例
trainer = Trainer(
    model,
    training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    data_collator=data_collator,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics
)

# 开始训练
trainer.train()
```
