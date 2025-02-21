'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FloatingAd, FloatingAdsConfig } from '@/lib/config/floating-ads';

interface FloatingAdsProps {
  config: FloatingAdsConfig;
}

export function FloatingAds({ config }: FloatingAdsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  if (!config?.enabled || !config?.ads?.length) {
    return null;
  }

  // 计算总页数
  const totalPages = Math.ceil(config.ads.length / config.cardsPerPage);
  
  // 获取当前页的广告
  const currentAds = config.ads.slice(
    currentPage * config.cardsPerPage,
    (currentPage + 1) * config.cardsPerPage
  );

  useEffect(() => {
    if (!config.autoPlayInterval || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, config.autoPlayInterval);

    return () => clearInterval(interval);
  }, [config.autoPlayInterval, totalPages, config.ads.length]);

  return (
    <div className="fixed right-0 top-[calc(50%-60px)] -translate-y-1/2 z-40">
      {/* 展开/折叠按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -left-6 top-1/2 -translate-y-1/2 bg-green-600 text-white w-6 h-10 flex items-center justify-center rounded-l-md"
        aria-label={isExpanded ? "折叠广告" : "展开广告"}
      >
        {isExpanded ? ">" : "<"}
      </button>

      {/* 广告容器 */}
      <div 
        className={`bg-white rounded-l-lg shadow-lg transition-all duration-300 overflow-hidden ${
          isExpanded ? 'w-64 opacity-100 h-[420px]' : 'w-0 opacity-0'
        }`}
      >
        <div className="relative h-full flex flex-col">
          {/* 广告卡片容器 */}
          <div className="flex-1 p-3 overflow-y-auto">
            <div className="grid grid-cols-1 gap-[10px]">
              {currentAds.map((ad) => (
                <div 
                  key={ad.id}
                  className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="p-3 flex flex-col h-[180px]">
                    {/* 标签 */}
                    {ad.tag && (
                      <div className="mb-1">
                        <span 
                          className={`${ad.tagColor || 'bg-yellow-400'} text-xs px-1.5 py-0.5 rounded-full text-white font-medium`}
                        >
                          {ad.tag}
                        </span>
                      </div>
                    )}
                    
                    {/* 标题 */}
                    <h3 className="text-gray-900 font-medium text-sm mb-1">
                      {ad.title}
                    </h3>
                    
                    {/* 描述 */}
                    <p className="text-gray-500 text-xs leading-[1.4] line-clamp-4 mb-auto">
                      {ad.description}
                    </p>
                    
                    {/* 按钮和作者 */}
                    <div className="flex items-center justify-between mt-2">
                      <Link
                        href={ad.link}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition-colors"
                      >
                        {ad.buttonText || '立即查看'}
                      </Link>
                      {ad.author && (
                        <span className="text-gray-400 text-[10px]">
                          {ad.author}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 轮播指示器 */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-1.5 py-2 bg-white">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentPage ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  aria-label={`切换到第 ${index + 1} 页广告`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 