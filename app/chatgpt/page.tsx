import ChatGPTClient from './ChatGPTClient'
import { getAllChatGPTContent } from '@/lib/markdown-server'

export default async function ChatGPTTutorial() {
  const navItems = await getAllChatGPTContent()
  
  return <ChatGPTClient initialNavItems={navItems} />
} 