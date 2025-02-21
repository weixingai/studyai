import CursorClient from './CursorClient'
import { getAllCursorContent } from '@/lib/markdown-server'

export default async function CursorTutorial() {
  const navItems = await getAllCursorContent()
  
  return <CursorClient initialNavItems={navItems} />
} 