import Link from 'next/link'
import { ArrowUpRight } from './shared/icons'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-4">
          {/* iOS App */}
          <div>
            <h3 className="font-semibold mb-3 text-white">我开发的iOS App</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ios/prompt" className="hover:text-white flex items-center">
                  📱 拍照学单词
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/ios/light" className="hover:text-white flex items-center">
                  💡 Light屏幕亮度调节
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/ios/xiaozhi" className="hover:text-white flex items-center">
                  📍 小智找灯
                  <ArrowUpRight />
                </Link>
              </li>
            </ul>
          </div>

          {/* AI网站 */}
          <div>
            <h3 className="font-semibold mb-3 text-white">我开发的AI网站</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai/image" className="hover:text-white flex items-center">
                  🎨 Image 204G图像魔方
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/ai/codewhiz" className="hover:text-white flex items-center">
                  💻 CodeWhizAI编程教程
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/ai/humanize" className="hover:text-white flex items-center">
                  🤖 HumanizeAI文本优化
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/ai/analysis" className="hover:text-white flex items-center">
                  📊 用户反馈分析工具
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/ai/smart" className="hover:text-white flex items-center">
                  🧠 智能技术大师
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/ai/cat" className="hover:text-white flex items-center">
                  😺 猫咪路由评译
                  <ArrowUpRight />
                </Link>
              </li>
            </ul>
          </div>

          {/* GPTs */}
          <div>
            <h3 className="font-semibold mb-3 text-white">我创建的GPTs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gpts/update" className="hover:text-white flex items-center">
                  更新更更新的GPTs
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/gpts/ai-helper" className="hover:text-white flex items-center">
                  AI使用助手
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/gpts/assistant" className="hover:text-white flex items-center">
                  AI问答助手
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/gpts/chinese" className="hover:text-white flex items-center">
                  GPT翻译-专业中英双语翻译
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/gpts/claude" className="hover:text-white flex items-center">
                  Claude 3 Opus
                  <ArrowUpRight />
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-semibold mb-3 text-white">More</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://cursor.so" className="hover:text-white flex items-center" target="_blank">
                  跟我学Cursor
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white flex items-center">
                  即刻
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com" className="hover:text-white flex items-center" target="_blank">
                  Youtube
                  <ArrowUpRight />
                </Link>
              </li>
              <li>
                <Link href="https://bilibili.com" className="hover:text-white flex items-center" target="_blank">
                  Bilibili
                  <ArrowUpRight />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 text-center text-sm">
          <p>Copyright © 2025 StudyAI, Inc.</p>
        </div>
      </div>
    </footer>
  )
} 