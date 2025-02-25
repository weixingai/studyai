# 模型选择

使用聊天、编写器、选项卡或代理在 Cursor 中以不同的定价层级切换 AI 模型

使用 Composer、⌘ K 和 Terminal Ctrl/⌘ K，您可以轻松地在您选择的不同模型之间切换。

## ​可用型号
Cursor 提供了多种模型选择，包括：
Pro 和 Business 计划每月包含 500 个请求，并且可以通过启用基于使用情况的定价进行扩展。
[![pE17yPP.png](https://s21.ax1x.com/2025/02/25/pE17yPP.png)](https://imgse.com/i/pE17yPP)
Cursor Settings您可以在>下添加其他模型Models。所有模型均托管在美国基础设施上。

​
## 模型下拉菜单

[![pE1768f.png](https://s21.ax1x.com/2025/02/25/pE1768f.png)](https://imgse.com/i/pE1768f)
在 AI 输入框下方，您将看到一个下拉菜单，可让您选择要使用的模型。以下模型可用：

​
## 上下文窗口
在 Chat 和 Composer 中，我们默认使用 40,000 个 token 上下文窗口。对于 Cmd-K，我们限制为大约 10,000 个 token 以平衡 TTFT 和质量。代理从 60,000 个 token 开始，最多支持 120,000 个 token。对于较长的对话，我们会自动汇总上下文以节省 token 空间。请注意，这些阈值会不时更改以优化体验。