import Link from 'next/link'
import { ChatGPTIcon, CursorIcon, DeepseekIcon } from './components/icon'

export default function Home() {
  return (
    <div className="h-[900px] flex flex-col">
      {/* Hero Section */}
      <section className="bg-green-700 text-white h-[400px] -mt-16 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6 translate-y-[20px]">
            <h1 className="text-5xl font-bold">StudyAI.TOP，你的最佳AI中文学习网站</h1>
            <p className="text-lg opacity-90">
              ChatGPT教程、Prompt提示词，Cursor使用教程，ChatGPT账号解决方案等，一站尽收！
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/chatgpt" 
                className="bg-white text-green-700 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2 text-lg font-medium"
              >
                学习ChatGPT教程
                <ChatGPTIcon />
              </Link>
              <Link 
                href="/cursor" 
                className="bg-white text-green-700 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2 text-lg font-medium"
              >
                学习Cursor开发
                <CursorIcon />
              </Link>
              <Link 
                href="/deepseek" 
                className="bg-white text-green-700 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2 text-lg font-medium"
              >
                学习Deepseek
                <DeepseekIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="h-[700px] bg-gray-50">
        {/* Features Section */}
        <section className="h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">易于学习</h2>
                <p className="text-gray-600">
                  我们的教程设计简单明了，让您轻松入门AI技术。
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">实用性强</h2>
                <p className="text-gray-600">
                  所有教程都基于实际应用场景，帮助您快速上手AI工具。
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">持续更新</h2>
                <p className="text-gray-600">
                  我们不断更新内容，确保您能掌握最新的AI技术和应用。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 