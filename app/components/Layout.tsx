'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { topNavigation, NavItem } from '@/lib/config/navigation';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

const getDefaultRoute = (navItems: typeof topNavigation) => {
  const firstNav = navItems[0];
  if (!firstNav) return '';
  
  const firstSidebarItem = firstNav.sidebar[0];
  if (!firstSidebarItem) return '';

  if (firstSidebarItem.children && firstSidebarItem.children.length > 0) {
    return firstSidebarItem.children[0].href || '';
  }
  
  return firstSidebarItem.href || '';
};

// 从路径中获取当前激活的导航键
const getActiveKeyFromPath = (path: string) => {
  if (!path) return topNavigation[0].key;
  
  const pathParts = path.split('/');
  if (pathParts.length > 1) {
    const section = pathParts[1]; // 获取路径的第一部分
    const matchingNav = topNavigation.find(nav => nav.key === section);
    return matchingNav?.key || topNavigation[0].key;
  }
  
  return topNavigation[0].key;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeNavKey, setActiveNavKey] = useState(() => getActiveKeyFromPath(pathname));
  
  const router = useRouter();
  
  // 监听路径变化，更新激活的导航键
  useEffect(() => {
    const newActiveKey = getActiveKeyFromPath(pathname);
    setActiveNavKey(newActiveKey);
  }, [pathname]);
  
  useEffect(() => {
    // 只在根路径时进行重定向
    if (pathname === '/') {
      const defaultRoute = getDefaultRoute(topNavigation);
      if (defaultRoute) {
        router.push(defaultRoute);
      }
    }
  }, [pathname]);
  
  const activeNav = topNavigation.find(nav => nav.key === activeNavKey);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TopNav
        items={topNavigation}
        activeKey={activeNavKey}
        onNavChange={setActiveNavKey}
      />
      
      <div className="flex">
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 min-h-[calc(100vh-4rem)]">
          {activeNav && <Sidebar items={activeNav.sidebar} />}
        </aside>
        
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 