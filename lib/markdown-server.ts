import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export interface NavItem {
  id: string
  title: string
  section?: string
  date?: string
  tags?: string[]
}

export interface ContentData {
  content: string
  title?: string
  section?: string
}

export interface NavLink {
  title: string;
  id: string;
}

export interface ArticleNavigation {
  prev: NavLink | null;
  next: NavLink | null;
}

// 获取所有教程内容的通用函数
export async function getNavItems(type: 'chatgpt' | 'cursor' | 'deepseek'): Promise<NavItem[]> {
  const typeDirectory = path.join(contentDirectory, type)
  if (!fs.existsSync(typeDirectory)) {
    return []
  }

  let headerContent: NavItem[] = []
  let mainContent: NavItem[] = []

  // 首先加载 header 文件夹中的文件
  const headerPath = path.join(typeDirectory, 'header')
  if (fs.existsSync(headerPath)) {
    const headerFiles = fs.readdirSync(headerPath)
    headerContent = headerFiles
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const id = `header/${fileName.replace(/\.md$/, '')}`
        const fullPath = path.join(headerPath, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const title = data.title || content
          .split('\n')
          .find(line => line.startsWith('# '))
          ?.replace('# ', '')
          .trim()

        return {
          id,
          title: title || id,
          section: 'header'
        }
      })
  }

  // 定义其他目录映射关系和顺序
  const sectionDirs = [
    { dir: 'basic', section: 'basic' },
    { dir: 'advanced', section: 'advanced' },
    { dir: 'tutorials', section: 'tutorials' },
    { dir: 'information', section: 'information' },
    { dir: 'footer', section: 'footer' }
  ]

  // 遍历其他分类目录
  for (const { dir: dirName, section: sectionName } of sectionDirs) {
    const sectionPath = path.join(typeDirectory, dirName)
    
    if (fs.existsSync(sectionPath)) {
      const fileNames = fs.readdirSync(sectionPath)
      const sectionContent = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
          const id = `${dirName}/${fileName.replace(/\.md$/, '')}`
          const fullPath = path.join(sectionPath, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContents)
          const title = data.title || content
            .split('\n')
            .find(line => line.startsWith('# '))
            ?.replace('# ', '')
            .trim()

          return {
            id,
            title: title || id,
            section: sectionName
          }
        })
      
      // 对每个分类中的文章按标题排序
      sectionContent.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
      mainContent = mainContent.concat(sectionContent)
    }
  }

  // 读取根目录下的文件（其他类别）
  const rootFiles = fs.readdirSync(typeDirectory)
    .filter(fileName => fileName.endsWith('.md'))
    .filter(fileName => !fileName.includes('/')) // 只获取根目录的文件
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(typeDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const firstTitle = fileContents
        .split('\n')
        .find(line => line.startsWith('# '))
        ?.replace('# ', '')
        .trim()

      return {
        id,
        title: firstTitle || id,
        section: 'other'
      }
    })
  
  // 对其他类别的文章按标题排序
  rootFiles.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))

  // 将 header 内容放在最前面，然后是主要内容，最后是根目录文件
  return [...headerContent, ...mainContent, ...rootFiles]
}

// 获取所有ChatGPT教程的markdown文件
export async function getAllChatGPTContent(): Promise<NavItem[]> {
  return getNavItems('chatgpt')
}

// 获取所有Cursor教程的markdown文件
export async function getAllCursorContent(): Promise<NavItem[]> {
  return getNavItems('cursor')
}

// 获取所有DeepSeek教程的markdown文件
export async function getAllDeepSeekContent(): Promise<NavItem[]> {
  return getNavItems('deepseek')
}

// 获取内容数据
export async function getContentData(slug: string, type: 'chatgpt' | 'cursor' | 'deepseek' = 'chatgpt'): Promise<ContentData> {
  try {
    // 处理多级路径
    const pathParts = slug.split('/')
    const fileName = pathParts.pop() // 获取最后一部分作为文件名
    const section = pathParts[0] // 第一级目录作为section

    if (!fileName) {
      throw new Error('Invalid file path')
    }

    // 构建完整的文件路径
    const fullPath = path.join(contentDirectory, type, ...pathParts, `${fileName}.md`)
    
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const processedContent = await remark()
        .use(html)
        .process(content)
      const contentHtml = processedContent.toString()

      return {
        content: contentHtml,
        title: data.title,
        section: section
      }
    }

    throw new Error(`Content not found for path: ${slug}`)
  } catch (error) {
    console.error('Error in getContentData:', error)
    throw error
  }
}

// 获取上一篇和下一篇文章
export async function getArticleNavigation(currentId: string, type: 'chatgpt' | 'cursor' | 'deepseek') {
  const allContent = await getNavItems(type)
  
  // 找到当前文章的索引
  const currentIndex = allContent.findIndex(item => item.id === currentId)
  
  if (currentIndex === -1) {
    return {
      prev: null,
      next: null
    }
  }
  
  // 获取上一篇和下一篇文章
  const prev = currentIndex > 0 ? {
    id: allContent[currentIndex - 1].id,
    title: allContent[currentIndex - 1].title
  } : null
  const next = currentIndex < allContent.length - 1 ? {
    id: allContent[currentIndex + 1].id,
    title: allContent[currentIndex + 1].title
  } : null
  
  return {
    prev,
    next
  }
} 