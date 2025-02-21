# Cursor 项目实战：构建一个 Todo 应用

本教程将指导你使用 Cursor 的 AI 功能来构建一个简单的 Todo 应用，展示如何在实际项目中运用 Cursor 的各种功能。

## 项目概述

我们将构建一个具有以下功能的 Todo 应用：
- 添加/删除/编辑待办事项
- 标记完成状态
- 按类别筛选
- 数据持久化

## 技术栈
- React
- TypeScript
- TailwindCSS
- LocalStorage

## 项目初始化

### 1. 创建项目
使用 Cursor AI 帮助我们初始化项目：

```bash
# 在命令行中输入
npx create-react-app todo-app --template typescript
cd todo-app
npm install tailwindcss @heroicons/react
```

### 2. 配置 TailwindCSS
让 Cursor AI 帮我们生成配置文件：

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 实现核心功能

### 1. 定义类型
使用 Cursor AI 生成 TypeScript 类型定义：

```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  createdAt: Date;
}

type TodoFilter = 'all' | 'active' | 'completed';
```

### 2. 创建组件
让 Cursor AI 帮我们生成组件结构：

```typescript
// TodoList.tsx
import React, { useState } from 'react';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');

  // 使用 Cursor AI 补全实现...
};
```

### 3. 使用 AI 实现功能
通过 Cursor AI 的代码生成功能，我们可以快速实现各项功能：

```typescript
// 添加 Todo
const addTodo = (text: string, category: string) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    category,
    createdAt: new Date()
  };
  setTodos([...todos, newTodo]);
};

// 删除 Todo
const deleteTodo = (id: string) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

// 更新 Todo
const updateTodo = (id: string, updates: Partial<Todo>) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, ...updates } : todo
  ));
};
```

## 使用 Cursor AI 优化代码

### 1. 代码重构
使用 Cursor 的 AI 重构功能优化代码结构：

```typescript
// 重构前
const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true;
});

// 重构后（使用 AI 优化）
const filterMap = {
  all: () => true,
  active: (todo: Todo) => !todo.completed,
  completed: (todo: Todo) => todo.completed
};

const filteredTodos = todos.filter(filterMap[filter]);
```

### 2. 性能优化
让 AI 帮助我们识别和解决性能问题：

```typescript
// 使用 useMemo 优化过滤操作
const filteredTodos = useMemo(() => 
  todos.filter(filterMap[filter]),
  [todos, filter]
);
```

## 添加本地存储

### 1. 实现数据持久化
使用 Cursor AI 生成本地存储相关代码：

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // 使用 AI 补全实现...
}
```

## 样式优化

### 1. 使用 TailwindCSS
让 AI 帮助我们设计响应式布局：

```tsx
<div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
  <div className="bg-white rounded-lg shadow-lg p-6">
    {/* 使用 AI 生成更多样式... */}
  </div>
</div>
```

## 测试

### 1. 编写测试用例
使用 Cursor AI 生成测试代码：

```typescript
// TodoList.test.tsx
import { render, fireEvent } from '@testing-library/react';

describe('TodoList', () => {
  test('adds a new todo', () => {
    // 使用 AI 生成测试用例...
  });
});
```

## 调试技巧

### 1. 使用 Cursor AI 调试
- 复制错误信息给 AI 分析
- 使用 AI 生成调试代码
- 获取优化建议

## 项目完善

### 1. 文档生成
使用 AI 生成项目文档：
- README.md
- API 文档
- 使用说明

### 2. 代码审查
让 AI 帮助我们：
- 检查代码质量
- 发现潜在问题
- 提供改进建议

## 总结

通过这个实战项目，我们学会了：
1. 使用 Cursor AI 加速开发
2. 优化代码质量
3. 提高开发效率
4. 解决实际问题

记住，Cursor 的 AI 功能是强大的开发助手，但要注意：
- 审查 AI 生成的代码
- 理解代码逻辑
- 保持代码可维护性

下一步，你可以：
1. 添加更多功能
2. 优化用户体验
3. 部署应用
4. 分享你的经验

祝你编码愉快！ 