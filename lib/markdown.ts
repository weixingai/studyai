export interface ContentData {
  content: string
  title?: string
  section?: string
}

export interface NavItem {
  id: string
  title: string
  section?: string
}

// 获取所有ChatGPT教程的markdown文件
export async function getAllChatGPTContent(): Promise<NavItem[]> {
  try {
    const response = await fetch('/api/content?action=get-navigation&currentId=index&type=chatgpt')
    if (!response.ok) {
      throw new Error('Failed to fetch navigation')
    }
    const data = await response.json()
    return data.items
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return []
  }
}

export async function getContentData(slug: string): Promise<ContentData> {
  try {
    const response = await fetch(`/api/content?action=get-content&page=${slug}`)
    if (!response.ok) {
      throw new Error('Failed to fetch content')
    }
    const data = await response.json()
    return {
      content: data.content,
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    return {
      content: '',
    }
  }
} 