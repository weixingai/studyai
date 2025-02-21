export interface FloatingAd {
  id: string;
  tag?: string;
  tagColor?: string;
  title: string;
  description: string;
  link: string;
  buttonText?: string;
  author?: string;
}

export interface FloatingAdsConfig {
  enabled: boolean;
  cardsPerPage: number;
  autoPlayInterval?: number; // 自动播放间隔，单位毫秒
  ads: FloatingAd[];
}

export const floatingAdsConfig: FloatingAdsConfig = {
  enabled: true,
  cardsPerPage: 2,
  autoPlayInterval: 5000,
  ads: [
    {
      id: 'monica-deepseek',
      tag: '免费',
      tagColor: 'bg-yellow-400',
      title: '通过Monica免费使用满血可联网DeepSeek R1',
      description: 'Monica接入DeepSeek R1、OpenAI、GPT-4、Claude 3.5和Gemini 1.5，本年度空前绝后。',
      link: '/deepseek/basic/getting-started',
      buttonText: '立即查看',
      author: '一位AI老手'
    },
    {
      id: 'ai-zhishixinqiu',
      tag: '99元特惠',
      tagColor: 'bg-yellow-400',
      title: 'AI编程-知识星球',
      description: '解锁AI编程，可能是中文互联网最值得了AI编程类知识星球',
      link: 'https://wx.zsxq.com/group/28885124811551',
      buttonText: '立即加入',
      author: '卫星AI进化论'
    },
    {
      id: 'chatgpt-tutorial',
      tag: '热门',
      tagColor: 'bg-yellow-400',
      title: 'ChatGPT完全使用指南',
      description: '从零开始学习ChatGPT，包含提示词工程、API调用等进阶内容',
      link: '/chatgpt/basic/getting-started',
      buttonText: '开始学习',
      author: 'GPT专家'
    }
    ,
    {
      id: 'cursor-ai-update',
      tag: '365特惠',
      tagColor: 'bg-yellow-400',
      title: 'CursorAI增强知识星球',
      description: '解锁Cursor教学视频已达100万人观看，可能是中文互联网最值得了',
      link: '/cursor/advanced/ai-features',
      buttonText: '立即查看',
      author: '30天AI老手'
    }
  ]
}; 