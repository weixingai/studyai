'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from '@/app/components/shared/icons'

export default function NavLink({ href, children, showArrow = true }: { 
  href: string; 
  children: React.ReactNode;
  showArrow?: boolean;
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link 
      href={href} 
      className={`${
        isActive 
          ? 'text-green-600 font-medium border-b-2 border-green-600 text-lg' 
          : 'text-gray-600 hover:text-green-600 hover:border-b-2 hover:border-green-600 text-lg'
      } transition-all duration-200 py-1 group inline-flex items-center gap-1`}
    >
      {children}
      {showArrow && <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </Link>
  )
} 