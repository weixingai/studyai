'use client';

import { NavItem } from '@/lib/config/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SidebarProps {
  items: NavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // 初始化时展开当前路径所在的导航项
  useEffect(() => {
    const expandedSections = items
      .filter(item => item.children?.some(child => 
        pathname?.startsWith(child.href || '')
      ))
      .map(item => item.title);
    setExpandedItems(expandedSections);
  }, [pathname, items]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.title);
    const isActive = pathname?.startsWith(item.href || '') || 
                    item.children?.some(child => pathname?.startsWith(child.href || ''));
    
    return (
      <div key={item.title} className={`ml-${level * 4}`}>
        {item.children ? (
          <div>
            <button
              onClick={() => toggleExpand(item.title)}
              className={`flex items-center w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg
                ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
            >
              <span className="flex-1">{item.title}</span>
              <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                ›
              </span>
            </button>
            {isExpanded && (
              <div className="mt-1">
                {item.children.map(child => renderNavItem(child, level + 1))}
              </div>
            )}
          </div>
        ) : (
          <Link
            href={item.href || '#'}
            className={`block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
              ${isActive ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-900' : 'text-gray-700 dark:text-gray-300'}`}
          >
            {item.title}
          </Link>
        )}
      </div>
    );
  };

  return (
    <nav className="w-64 h-full overflow-y-auto">
      <div className="py-4">
        {items.map(item => renderNavItem(item))}
      </div>
    </nav>
  );
} 