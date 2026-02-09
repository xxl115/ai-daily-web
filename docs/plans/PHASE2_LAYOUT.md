# Product Hunt 风格重设计 - 阶段 2 实现计划

> **For Claude:** 使用 superpowers:subagent-driven-development 逐个任务执行

**目标:** 实现响应式三栏布局，左侧导航栏（折叠）、主内容区、右侧统计栏。

**设计规格:** `docs/plans/2025-02-09-product-hunt-style-redesign.md`

---

## 阶段 2: 响应式三栏布局

### Task 7: 创建左侧导航栏组件 SideNav

**Files:**
- Create: `components/layout/SideNav.tsx`
- Modify: `app/page.tsx` - 添加 SideNav

**Step 1: 创建 SideNav.tsx**

```tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { SourceIcon } from '@/components/icons/SourceIcon';

interface SideNavProps {
  sources: { name: string; count: number }[];
  hotArticles: { id: string; title: string; hotScore: number }[];
}

export function SideNav({ sources, hotArticles }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      'fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40',
      collapsed ? 'w-16' : 'w-[240px]'
    )}>
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700"
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Navigation */}
      <nav className="p-4 space-y-4">
        {/* Time Navigation */}
        <div className={cn('space-y-1', collapsed && 'hidden')}>
          <h3 className="text-xs font-medium text-gray-400 uppercase">时间</h3>
          <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            今日热门
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            昨日热门
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            本周热门
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            上月热门
          </a>
        </div>

        {/* Source Stats */}
        <div className={cn('space-y-2', collapsed && 'hidden')}>
          <h3 className="text-xs font-medium text-gray-400 uppercase">来源统计</h3>
          {sources.slice(0, 10).map((source) => (
            <div key={source.name} className="flex items-center gap-2 px-3 py-1.5">
              <SourceIcon source={source.name} size={16} />
              <span className="text-sm text-gray-600 truncate flex-1">{source.name}</span>
              <span className="text-xs text-gray-400">{source.count}</span>
            </div>
          ))}
        </div>

        {/* Hot Top 5 */}
        <div className={cn('space-y-2', collapsed && 'hidden')}>
          <h3 className="text-xs font-medium text-gray-400 uppercase">热门 Top 5</h3>
          {hotArticles.slice(0, 5).map((article, i) => (
            <a key={article.id} href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="text-xs text-orange-500 mr-1">{i + 1}</span>
              <span className="text-sm text-gray-700 line-clamp-2">{article.title}</span>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
```

**Step 2: 修改 app/page.tsx**

```tsx
import { SideNav } from '@/components/layout/SideNav';

// 在页面中添加 SideNav
<SideNav sources={sources} hotArticles={hotArticles} />

// 修改主内容区 margin
<main className="ml-[240px] mr-[320px] ...">
```

---

### Task 8: 创建右侧统计栏组件 StatsPanel

**Files:**
- Create: `components/layout/StatsPanel.tsx`
- Modify: `app/page.tsx` - 添加 StatsPanel

**Step 1: 创建 StatsPanel.tsx**

```tsx
'use client';

interface StatsPanelProps {
  total: number;
  hot: number;
  sources: number;
}

export function StatsPanel({ total, hot, sources }: StatsPanelProps) {
  return (
    <aside className="fixed right-0 top-16 bottom-0 w-[320px] bg-white border-l border-gray-200 p-6 z-40">
      <h3 className="text-sm font-medium text-gray-900 mb-4">统计数据</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-500">文章总数</div>
        </div>
        
        <div className="bg-orange-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-orange-500">{hot}</div>
          <div className="text-sm text-gray-500">热门文章</div>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-blue-500">{sources}</div>
          <div className="text-sm text-gray-500">来源数量</div>
        </div>
      </div>

      {/* Newsletter Subscribe */}
      <div className="mt-8 p-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl text-white">
        <h4 className="font-medium mb-2">订阅 AI Daily</h4>
        <p className="text-sm opacity-90 mb-3">每天获取最新的 AI 热点资讯</p>
        <input
          type="email"
          placeholder="输入邮箱"
          className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm mb-2"
        />
        <button className="w-full bg-white text-orange-500 py-2 rounded-lg text-sm font-medium">
          订阅
        </button>
      </div>
    </aside>
  );
}
```

---

### Task 9: 实现响应式布局

**Files:**
- Modify: `app/page.tsx` - 添加响应式类

**响应式断点:**

```tsx
// < 768px: 单栏，侧边栏隐藏
// 768-1280px: 左侧折叠为汉堡菜单，右侧移到底部
// > 1280px: 完整三栏
```

---

## 📋 任务清单

| Task | 描述 | 状态 |
|------|------|------|
| 7 | SideNav 左侧导航 | ⏳ |
| 8 | StatsPanel 右侧统计 | ⏳ |
| 9 | 响应式布局 | ⏳ |

---

**开始执行阶段 2**
