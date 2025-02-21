import DeepSeekClient from './DeepSeekClient'
import { getAllDeepSeekContent } from '@/lib/markdown-server'

export default async function DeepSeekTutorial() {
  const navItems = await getAllDeepSeekContent()
  
  return <DeepSeekClient initialNavItems={navItems} />
} 