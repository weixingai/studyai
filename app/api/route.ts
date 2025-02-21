import { NextResponse } from 'next/server'
import { getContentData, getArticleNavigation } from '@/lib/markdown-server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  if (!action) {
    return NextResponse.json({ error: 'Action parameter is required' }, { status: 400 })
  }

  try {
    // 获取内容
    if (action === 'get-content') {
      const page = searchParams.get('page')
      if (!page) {
        return NextResponse.json({ error: 'Page parameter is required' }, { status: 400 })
      }

      // 分割路径，第一个部分是类型，剩余部分是文件路径
      const [type, ...pathParts] = page.split('/')
      const filePath = pathParts.join('/')
      
      if (!type || !filePath) {
        return NextResponse.json({ error: 'Invalid page parameter format' }, { status: 400 })
      }

      if (!['chatgpt', 'cursor', 'deepseek'].includes(type)) {
        return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
      }

      const content = await getContentData(filePath, type as 'chatgpt' | 'cursor' | 'deepseek')
      return NextResponse.json({ success: true, content: content.content, metadata: content })
    }
    
    // 获取导航
    if (action === 'get-navigation') {
      const currentId = searchParams.get('currentId')
      const type = searchParams.get('type') as 'chatgpt' | 'cursor' | 'deepseek'

      if (!currentId) {
        return NextResponse.json({ error: 'Current ID is required' }, { status: 400 })
      }

      if (!type) {
        return NextResponse.json({ error: 'Type is required' }, { status: 400 })
      }

      const navigation = await getArticleNavigation(currentId, type)
      return NextResponse.json({ success: true, navigation })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error in content API:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Operation failed' 
    }, { status: 500 })
  }
} 