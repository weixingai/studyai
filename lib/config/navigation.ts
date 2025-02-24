export interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
}

export interface TopNavItem {
  title: string;
  key: string;
  sidebar: NavItem[];
}

export const topNavigation: TopNavItem[] = [
  {
    title: 'ChatGPT教程',
    key: 'chatgpt',
    sidebar: [
      { title: '全球Top100消费级生成式AI应用榜', href: '/chatgpt/header/ai-tools' },
      {
        title: 'ChatGPT 基础教程',
        children: [
          { title: 'ChatGPT学习指南', href: '/chatgpt/basic/guide' }
        ]
      },
      {
        title: 'ChatGPT 进阶教程',
        children: [
          { title: 'ChatGPT Prompt 进阶指南', href: '/chatgpt/advanced/prompt' },
          { title: 'GraphRAG: 图检索增强生成的新范式', href: '/chatgpt/advanced/graphrag' }
        ]
      },
      {
        title: 'ChatGPT 实战教程',
        children: [
          { title: '一个警服，让ChatGPT翻译质量提升100%，超越专业译者', href: '/chatgpt/practice/translation' }
        ]
      },
      {
        title: 'ChatGPT 资料分享',
        children: [
          { title: 'ChatGPT with Canvas教程：最好的AI写作编辑器', href: '/chatgpt/resources/canvas' },
          { title: '28个ChatGPT使用技巧 - 提升AI对话效率', href: '/chatgpt/resources/tips' }
        ]
      },
      { title: '28个ChatGPT使用技巧 - 提升AI对话效率', href: '/chatgpt/footer/chatgpt-tips' }
    ]
  },
  {
    title: 'Cursor教程',
    key: 'cursor',
    sidebar: [
      { title: 'Cursor 教程简介', href: '/cursor/header/guide' },
      { title: 'Cursor vs Windsurf vs GitHub Copilot', href: '/cursor/header/cursor-windsurf-copilot' },
      {
        title: 'Cursor 基础教程',
        children: [
          { title: 'Cursor 安装教程', href: '/cursor/basic/installation' }
        ]
      },
      {
        title: 'Cursor 进阶教程',
        children: [
          { title: 'Cursor AI 功能详解', href: '/cursor/advanced/ai-features' },
          { title: '代码索引(Codebase Indexing)', href: '/cursor/advanced/codebase-idexing' },
          { title: 'AI 规则(Rules for AI)', href: '/cursor/advanced/rules-for-ai' }
        ]
      },
      {
        title: 'Cursor 实战变现',
        children: [
          { title: 'Cursor 项目实战：构建一个 Todo 应用', href: '/cursor/tutorials/project-example' }
        ]
      },
      {
        title: 'Cursor 资料分享',
        children: [
          { title: 'Cursor 快捷键参考指南', href: '/cursor/information/shortcuts' }
        ]
      },
      {
        title: '关于 Cursor',
        href: '/cursor/footer/about'
      }
    ]
  },
  {
    title: 'DeepSeek介绍',
    key: 'deepseek',
    sidebar: [
      { title: 'DeepSeek 简介', href: '/deepseek/header/introduction' },
      {
        title: 'DeepSeek 基础教程',
        children: [
          { title: 'DeepSeek 快速入门', href: '/deepseek/basic/getting-started' }
        ]
      },
      {
        title: 'DeepSeek 进阶教程',
        children: [
          { title: 'DeepSeek 模型微调指南', href: '/deepseek/advanced/fine-tuning' }
        ]
      },
      {
        title: 'DeepSeek 实战教程',
        children: [
          { title: '使用 DeepSeek 构建聊天机器人', href: '/deepseek/tutorials/chatgpt-dialogue' }
        ]
      },
      {
        title: 'DeepSeek 资料分享',
        children: [
          { title: 'DeepSeek 学习资源', href: '/deepseek/information/resources' }
        ]
      },
      {
        title: '联系我们',
        href: '/deepseek/footer/contact'
      }
    ]
  }
]; 