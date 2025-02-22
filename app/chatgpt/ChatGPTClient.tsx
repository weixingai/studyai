'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { NavItem as ContentNavItem } from '@/lib/markdown-server'
import { topNavigation, NavItem } from '@/lib/config/navigation'

interface TableOfContents {
  id: string;
  text: string;
  level: number;
}

interface ArticleData {
  title: string;
  date: string;
  tags: string[];
  section: string;
  content: string;
}

interface Props {
  initialNavItems?: ContentNavItem[]  // Make it optional since we're not using it
}

// 验证路径是否属于当前内容类型
const isValidPath = (path: string) => {
  return path.startsWith('/chatgpt/') || path === '/chatgpt'
}

// 获取第一个导航项作为默认路径
const getDefaultPath = (navItems: NavItem[]) => {
  // 如果没有导航项，返回默认路径
  if (!navItems || navItems.length === 0) {
    return '/chatgpt/header/ai-tools';
  }

  // 遍历查找第一个有效的路径
  for (const item of navItems) {
    // 如果当前项有直接的 href，返回它
    if (item.href) {
      return item.href;
    }
    // 如果当前项有子项，返回第一个子项的 href
    if (item.children && item.children.length > 0) {
      const firstChild = item.children[0];
      if (firstChild.href) {
        return firstChild.href;
      }
    }
  }

  // 如果都没找到，返回默认路径
  return '/chatgpt/header/ai-tools';
}

export default function ChatGPTClient({ initialNavItems: _ }: Props) {
  // 获取ChatGPT部分的导航配置
  const chatgptNav = topNavigation.find(nav => nav.key === 'chatgpt')
  const navItems = useMemo(() => chatgptNav?.sidebar || [], [chatgptNav])

  // 解析HTML内容中的标题并设置ID
  const processContent = useCallback((content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const toc: TableOfContents[] = [];
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent?.trim() || '';
      
      if (!text) return;
      
      // 生成唯一的 ID
      const id = `heading-${index}-${text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '')}`;
      
      // 将ID添加到原始HTML中的标题
      heading.id = id;
      
      toc.push({ id, text, level });
    });
    
    return {
      processedContent: doc.body.innerHTML,
      toc
    };
  }, []);

  const [content, setContent] = useState<string>('')
  const [toc, setToc] = useState<TableOfContents[]>([])
  const [navigation, setNavigation] = useState<{ 
    prev: { id: string; title: string } | null; 
    next: { id: string; title: string } | null 
  }>({ prev: null, next: null })
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      // 如果是根路径或 chatgpt 路径，使用默认路径
      if (path === '/' || path === '/chatgpt') {
        const defaultPath = getDefaultPath(navItems)
        return defaultPath
      }
      // 如果是有效的 chatgpt 路径，使用当前路径
      if (isValidPath(path)) {
        return path
      }
      // 其他情况使用默认路径
      return getDefaultPath(navItems)
    }
    return getDefaultPath(navItems)
  })
  const [metadata, setMetadata] = useState<ArticleData>({
    title: '',
    date: '',
    tags: [],
    section: '',
    content: ''
  })
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // 使用 useCallback 包装 loadContent
  const loadContent = useCallback(async (page: string) => {
    try {
      if (!page) return;
      
      const cleanPage = page.replace(/^\/+|\/+$/g, '').trim();
      if (!cleanPage) return;
      
      const response = await fetch(`/api?action=get-content&page=chatgpt/${cleanPage}`);
      const data = await response.json();
      
      if (data.success) {
        // 处理内容和目录
        const { processedContent, toc: newToc } = processContent(data.content);
        setContent(processedContent);
        setToc(newToc);
        
        setMetadata(data.metadata || {
          title: '',
          date: '',
          tags: [],
          section: '',
          content: ''
        });
        
        // 获取导航信息
        const navResponse = await fetch(`/api?action=get-navigation&currentId=${cleanPage}&type=chatgpt`);
        const navData = await navResponse.json();
        if (navData.success) {
          setNavigation(navData.navigation);
        }
        
        // 处理URL中的锚点
        if (window.location.hash) {
          const hash = window.location.hash.slice(1);
          requestAnimationFrame(() => {
            const element = document.getElementById(hash);
            if (element) {
              const navHeight = 64;
              const padding = 24;
              const elementRect = element.getBoundingClientRect();
              const absoluteElementTop = window.pageYOffset + elementRect.top;
              const offsetPosition = absoluteElementTop - navHeight - padding;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }, [processContent]);

  useEffect(() => {
    // 从完整路径中提取内容路径
    const contentPath = currentPage
      .replace('/chatgpt/', '')  // 移除前缀
      .replace(/^\/+|\/+$/g, '') // 移除开头和结尾的多余斜杠
    
    if (contentPath && isValidPath(currentPage)) {  // 只在有效路径时才加载内容
      loadContent(contentPath)
    }
  }, [currentPage, loadContent])

  const handleNavItemClick = (href: string) => {
    if (!href || href === '#') return;
    
    // 验证路径是否合法
    if (!isValidPath(href)) {
      console.error('Invalid path:', href);
      return;
    }
    
    if (href === '/chatgpt') {
      const defaultPath = getDefaultPath(navItems)
      if (defaultPath) {
        setCurrentPage(defaultPath)
        window.history.pushState({}, '', defaultPath)
        // 立即加载内容
        const contentPath = defaultPath.replace('/chatgpt/', '').replace(/^\/+|\/+$/g, '')
        if (contentPath) {
          loadContent(contentPath)
        }
      }
    } else {
      // 确保 href 是有效的路径
      const cleanHref = href.replace(/\/+/g, '/') // 将多个斜杠替换为单个斜杠
      setCurrentPage(cleanHref)
      window.history.pushState({}, '', cleanHref)
      // 立即加载内容
      const contentPath = cleanHref.replace('/chatgpt/', '').replace(/^\/+|\/+$/g, '')
      if (contentPath) {
        loadContent(contentPath)
      }
    }
  }

  // 初始化时展开当前路径所在的导航项
  useEffect(() => {
    const expandedSections = navItems
      .filter(item => item.children?.some(child => child.href === currentPage))
      .map(item => item.title);
    setExpandedItems(expandedSections);
  }, [currentPage, navItems]);

  // 处理目录点击
  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;
      
      const navHeight = 64; // 导航栏高度
      const padding = 24; // 额外的padding
      
      // 获取元素的位置
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = window.pageYOffset + elementRect.top;
      const offsetPosition = absoluteElementTop - navHeight - padding;
      
      // 滚动
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // 更新URL
      history.pushState(null, '', `#${id}`);
      
      // 高亮效果
      element.style.backgroundColor = '#fef9c3';
      element.style.transition = 'background-color 0.3s ease';
      
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 1000);
    });
  };

  const toggleExpand = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const renderNavItem = (item: NavItem) => {
    const isExpanded = expandedItems.includes(item.title);
    const isActive = currentPage === item.href ||
                    item.children?.some(child => currentPage === child.href);
    
    if (item.children) {
      return (
        <div key={item.title} className="py-[2px]">
          <button 
            onClick={() => toggleExpand(item.title)}
            className="flex items-center w-full text-left text-[14px] leading-[1.6] py-[6px] px-2 text-gray-700 hover:text-green-600"
          >
            <span className="flex items-center">
              <span className="mr-1 text-gray-400 w-4">
                {isExpanded ? '▼' : '▶'}
              </span>
              {item.title}
            </span>
          </button>
          {isExpanded && (
            <div className="mt-[2px] space-y-[2px]">
              {item.children.map(child => (
                <Link
                  key={child.title}
                  href={child.href || '#'}
                  className={`block text-[14px] leading-[1.6] py-[6px] px-2 pl-6 w-full text-left transition-colors duration-200 rounded
                    ${currentPage === child.href
                      ? 'text-green-600 font-medium bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (child.href) {
                      handleNavItemClick(child.href);
                    }
                  }}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.title}
        href={item.href || '#'}
        className={`block text-[14px] leading-[1.6] py-[6px] px-2 w-full text-left transition-colors duration-200 rounded
          ${isActive
            ? 'text-green-600 font-medium bg-green-50'
            : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
          }`}
        onClick={(e) => {
          e.preventDefault();
          if (item.href) {
            handleNavItemClick(item.href);
          }
        }}
      >
        {item.title}
      </Link>
    )
  }

  // 获取当前页面的路径信息
  const getPathInfo = () => {
    const currentItem = navItems.find(item => 
      item.href === currentPage ||
      item.children?.some(child => child.href === currentPage)
    )
    
    if (!currentItem) {
      return { section: '', title: '' }
    }

    const childItem = currentItem.children?.find(child => 
      child.href === currentPage
    )

    return {
      section: currentItem.title,
      title: childItem?.title || currentItem.title
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-24">
            <nav className="space-y-[2px]">
              {navItems.map(renderNavItem)}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="prose max-w-none">
            <nav className="text-sm mb-8">
              <Link href="/" className="text-gray-500 hover:text-green-600 inline-flex items-center">
                <span className="mr-1">🏠</span>
                首页
              </Link>
              <span className="mx-2 text-gray-300">/</span>
              {getPathInfo().section && (
                <>
                  <span className="text-gray-500">{getPathInfo().section}</span>
                  <span className="mx-2 text-gray-300">/</span>
                </>
              )}
              <span className="text-gray-900">{getPathInfo().title}</span>
            </nav>

            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }} 
            />

            {/* Article Navigation */}
            <div className="mt-12 border-t border-gray-200">
              <div className={`grid gap-4 py-6 ${navigation.prev && navigation.next ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {/* Previous Article */}
                {navigation.prev && (
                  <button
                    onClick={() => {
                      const prevPath = `/chatgpt/${navigation.prev!.id}`;
                      setCurrentPage(prevPath);
                      window.history.pushState({}, '', prevPath);
                    }}
                    className="group flex items-center p-4 -ml-4 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <span className="text-[16px]">« {navigation.prev.title}</span>
                  </button>
                )}

                {/* Next Article */}
                {navigation.next && (
                  <button
                    onClick={() => {
                      const nextPath = `/chatgpt/${navigation.next!.id}`;
                      setCurrentPage(nextPath);
                      window.history.pushState({}, '', nextPath);
                    }}
                    className={`group flex items-center p-4 -mr-4 transition-colors
                      ${navigation.prev ? 'justify-end text-right' : 'justify-end text-right ml-auto'} 
                      text-gray-500 hover:text-green-600`}
                  >
                    <span className="text-[16px]">{navigation.next.title} »</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-medium text-gray-900 mb-2">目录</h3>
              <ul className="space-y-1 text-sm">
                {toc.map((item) => (
                  <li 
                    key={item.id}
                    style={{ 
                      paddingLeft: `${(item.level - 2) * 12}px`,
                      marginTop: item.level === 2 ? '8px' : '4px'
                    }}
                  >
                    <a 
                      href={`#${item.id}`}
                      className={`
                        block text-gray-600 hover:text-green-600
                        ${item.level === 2 ? 'font-medium text-[14px]' : 'text-[13px]'}
                      `}
                      onClick={(e) => handleTocClick(e, item.id)}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
                {toc.length === 0 && (
                  <li className="text-gray-500">暂无目录</li>
                )}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
} 