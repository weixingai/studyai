# StudyAI.TOP - AI学习教程网站

这是一个使用 [Next.js](https://nextjs.org) 构建的 AI 学习教程网站，提供 ChatGPT、Cursor、DeepSeek 等 AI 工具的中文教程。

## 快速开始

首先，运行开发服务器：

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```
myblog-next/
├── app/                    # Next.js App Router 目录
│   ├── api/               # API 路由
│   │   └── content/       # 内容相关的 API 端点
│   ├── components/        # 共享组件
│   │   ├── icons/        # 图标组件
│   │   ├── Footer.tsx    # 页脚组件
│   │   ├── NavLink.tsx   # 导航链接组件
│   │   └── PostMeta.tsx  # 文章元数据组件
│   ├── chatgpt/          # ChatGPT 教程页面
│   ├── cursor/           # Cursor 教程页面
│   ├── deepseek/         # DeepSeek 教程页面
│   ├── layout.tsx        # 根布局组件
│   ├── page.tsx          # 首页组件
│   └── globals.css       # 全局样式
│
├── content/              # Markdown 内容目录
│   ├── chatgpt/         # ChatGPT 教程内容
│   ├── cursor/          # Cursor 教程内容
│   └── deepseek/        # DeepSeek 教程内容
│
├── lib/                  # 工具函数和类型定义
│   ├── markdown.ts      # Markdown 处理工具
│   └── markdown-server.ts # 服务端 Markdown 处理
│
├── public/              # 静态资源目录
│   ├── globe.svg       # 全局图标
│   ├── window.svg      # 窗口图标
│   └── file.svg        # 文件图标
│
└── 配置文件
    ├── next.config.ts   # Next.js 配置
    ├── tailwind.config.ts # Tailwind CSS 配置
    ├── tsconfig.json    # TypeScript 配置
    ├── postcss.config.mjs # PostCSS 配置
    └── eslint.config.mjs  # ESLint 配置
```

## 主要功能

- 📚 提供结构化的 AI 工具教程
- 🔍 支持文章目录导航
- 📱 响应式设计，支持移动端
- 🎨 使用 Tailwind CSS 构建现代 UI
- ⚡ 基于 Next.js App Router，性能优异
- 🔄 支持文章间导航（上一篇/下一篇）

## 目录说明

### `/app` 目录
- 包含所有页面组件和路由
- 使用 Next.js 13+ 的 App Router 架构
- 包含共享组件和布局

### `/content` 目录
- 存储所有教程的 Markdown 文件
- 按照不同 AI 工具分类组织
- 支持元数据和分节结构

### `/lib` 目录
- 包含核心工具函数
- 处理 Markdown 内容和导航
- 提供类型定义和接口

### `/public` 目录
- 存储静态资源文件
- 包含网站所需的图标和图片

## 技术栈

- **框架**: Next.js 13+
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **内容**: Markdown
- **部署**: Vercel

## 开发指南

1. 添加新教程：
   - 在 `/content` 目录下相应分类中创建 Markdown 文件
   - 添加必要的元数据（标题、日期、分类等）
   - 编写教程内容

2. 修改样式：
   - 编辑 `app/globals.css` 或组件中的 Tailwind 类
   - 根据需要在 `tailwind.config.ts` 中添加自定义配置

3. 添加新功能：
   - 在 `app/components` 中创建新组件
   - 在 `lib` 目录添加必要的工具函数
   - 更新相关页面组件

## 贡献指南

欢迎提交 Pull Request 来改进项目。在提交之前，请确保：

1. 代码符合项目的代码风格
2. 添加了必要的测试
3. 更新了相关文档
4. 提交信息清晰明了

## 许可证

[MIT](LICENSE) 