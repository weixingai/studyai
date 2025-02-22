'use client';

import Link from 'next/link';
import { TopNavItem } from '@/lib/config/navigation';

interface Props {
  items: TopNavItem[];
  activeKey: string;
  onNavChange: (key: string) => void;
}

export default function TopNav({ items, activeKey, onNavChange }: Props) {
  const handleNavClick = (key: string) => {
    onNavChange(key);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">📚 StudyAI</span>
          </Link>
          <nav className="flex gap-6">
            {items.map((item) => {
              // 获取该导航项的默认链接
              const defaultHref = item.sidebar[0]?.href || 
                                item.sidebar[0]?.children?.[0]?.href || 
                                `/${item.key}`;
              
              return (
                <Link
                  key={item.key}
                  href={defaultHref}
                  className={`flex items-center text-lg font-medium transition-colors hover:text-green-600 
                    ${activeKey === item.key ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
                  onClick={() => handleNavClick(item.key)}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
} 