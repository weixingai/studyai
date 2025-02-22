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
  initialNavItems: ContentNavItem[]
}

// 验证路径是否属于当前内容类型
const isValidPath = (path: string) => {
  return path.startsWith('/cursor/') || path === '/cursor'
}

// 获取第一个导航项作为默认路径
const getDefaultPath = (navItems: NavItem[]) => {
  // 如果没有导航项，返回默认路径
  if (!navItems || navItems.length === 0) {
    return '/cursor/header/guide';
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
  return '/cursor/header/guide';
}

export default function CursorClient({ initialNavItems: _ }: Props) {  // Rename to _ to indicate intentionally unused
  // 获取Cursor部分的导航配置
  const cursorNav = topNavigation.find(nav => nav.key === 'cursor')
  const navItems = useMemo(() => cursorNav?.sidebar || [], [cursorNav])

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
      // 如果是根路径或 cursor 路径，使用默认路径
      if (path === '/' || path === '/cursor') {
        const defaultPath = getDefaultPath(navItems)
        return defaultPath
      }
      // 如果是有效的 cursor 路径，使用当前路径
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
      
      const response = await fetch(`/api?action=get-content&page=cursor/${cleanPage}`);
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
        const navResponse = await fetch(`/api?action=get-navigation&currentId=${cleanPage}&type=cursor`);
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
      .replace('/cursor/', '')  // 移除前缀
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
    
    if (href === '/cursor') {
      const defaultPath = getDefaultPath(navItems)
      if (defaultPath) {
        setCurrentPage(defaultPath)
        window.history.pushState({}, '', defaultPath)
        // 立即加载内容
        const contentPath = defaultPath.replace('/cursor/', '').replace(/^\/+|\/+$/g, '')
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
      const contentPath = cleanHref.replace('/cursor/', '').replace(/^\/+|\/+$/g, '')
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
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex">
        {/* Sidebar */}
        <nav className="w-64 border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="px-6">
            <h2 className="text-lg font-semibold text-gray-900">{metadata.title || 'Cursor Guide'}</h2>
          </div>
          {/* Navigation items */}
          <div className="mt-5 px-3 space-y-1">
            {navItems.map((item) => renderNavItem(item))}
          </div>
        </nav>
        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </main>
        {/* Table of contents */}
        <nav className="w-64 border-l border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="px-6">
            <h2 className="text-lg font-semibold text-gray-900">Table of Contents</h2>
          </div>
          <div className="mt-5 px-3 space-y-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleTocClick(e, item.id)}
                className={`block py-2 px-3 text-sm hover:bg-gray-50 rounded-md
                  ${item.level === 1 ? 'font-semibold' : ''}
                  ${item.level === 2 ? 'pl-6' : ''}
                  ${item.level === 3 ? 'pl-9' : ''}
                  ${item.level === 4 ? 'pl-12' : ''}
                  ${item.level === 5 ? 'pl-15' : ''}
                  ${item.level === 6 ? 'pl-18' : ''}`}
              >
                {item.text}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
} 