# Product Hunt 风格重设计 - 实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**目标:** 实现 Product Hunt 风格的紧凑布局和组件，包括三栏布局、时间导航、来源图标、药丸筛选器。

**架构:** 采用渐进式重构策略，先创建新组件，再替换首页组件。布局使用 CSS Grid 实现响应式三栏，支持 >1280px 完整显示，768-1280px 折叠为汉堡菜单，<768px 单栏布局。

**技术栈:** Next.js 14, React 18, TypeScript, Tailwind CSS 4.x, simple-icons, React Query

**参考文档:**
- `docs/plans/2025-02-09-product-hunt-style-redesign.md` - 设计规格
- `components/article/ArticleCardCompactPH.tsx` - 已完成的卡片组件（作为参考）
- `components/article/ArticleListPH.tsx` - 已完成的列表组件（作为参考）

---

## 阶段 1: 基础组件（TimeNav + SourceIcon + SourceFilterPills）

### Task 1: 创建 TimeNav 时间切换导航组件

**Files:**
- Create: `components/layout/TimeNav.tsx`
- Modify: `app/page.tsx:20-25`（添加到页面）
- Test: `components/layout/TimeNav.tsx`（验证渲染）

**Step 1: 创建 TimeNav.tsx**

```tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type Period = 'today' | 'yesterday' | 'week' | 'month';

interface TimeNavProps {
  value: Period;
  onChange: (period: Period) => void;
}

const periods: { value: Period; label: string }[] = [
  { value: 'today', label: '今日热门' },
  { value: 'yesterday', label: '昨日热门' },
  { value: 'week', label: '本周热门' },
  { value: 'month', label: '上月热门' },
];

export function TimeNav({ value, onChange }: TimeNavProps) {
  const [animating, setAnimating] = useState(false);

  const handleChange = (period: Period) => {
    if (period !== value && !animating) {
      setAnimating(true);
      onChange(period);
      setTimeout(() => setAnimating(false), 300);
    }
  };

  return (
    <div className="flex gap-1">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => handleChange(period.value)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            value === period.value
              ? 'bg-[#FF6B4A] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
```

**Step 2: 验证组件可以编译**

Run: `cd /home/young/code/ai-daily-web && npx tsc --noEmit components/layout/TimeNav.tsx 2>&1`
Expected: No errors (ignore warnings about @types)

**Step 3: 修改 app/page.tsx 添加 TimeNav**

在搜索栏下方添加：

```tsx
import { TimeNav } from '@/components/layout/TimeNav';

// 在 HomePage 组件中添加：
const [period, setPeriod] = useState<Period>('today');

// 在 SearchBar 下方添加：
<TimeNav value={period} onChange={setPeriod} />
```

**Step 4: 提交**

```bash
cd /home/young/code/ai-daily-web
git add components/layout/TimeNav.tsx app/page.tsx
git commit -m "feat: add TimeNav component for period switching"
```

---

### Task 2: 创建 SourceIcon 来源图标组件

**Files:**
- Create: `components/icons/SourceIcon.tsx`
- Test: `components/icons/SourceIcon.tsx`（验证渲染）

**Step 1: 创建 SourceIcon.tsx**

```tsx
'use client';

import * as SimpleIcons from 'simple-icons';

interface SourceIconProps {
  source: string;
  size?: number;
  className?: string;
}

// 来源名称到 simple-icons slug 的映射
const iconMap: Record<string, string> = {
  'Hacker News': 'ycombinator',
  'GitHub': 'github',
  'Product Hunt': 'producthunt',
  'V2EX': 'v2ex',
  'OpenAI': 'openai',
  'Dev.to': 'devdotto',
  'TechCrunch': 'techcrunch',
  'The Verge': 'theverge',
  '36氪': '36kr',
  '掘金': 'juejin',
  '知乎': 'zhihu',
  '微信公众号': 'wechat',
  'MIT Tech Review': 'mittechnologyreview',
  'Wired': 'wired',
  'VentureBeat': 'venturebeat',
  'Ars Technica': 'arstechnica',
};

function getIconSvg(slug: string): string {
  const iconGetter = (SimpleIcons as unknown as Record<string, () => { svg: string }>)[slug];
  if (iconGetter) {
    return iconGetter().svg;
  }
  // 返回默认图标
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>';
}

export function SourceIcon({ source, size = 24, className }: SourceIconProps) {
  const iconSlug = iconMap[source] || 'generic';
  const iconSvg = getIconSvg(iconSlug);
  const encodedIcon = encodeURIComponent(iconSvg);

  return (
    <img
      src={`data:image/svg+xml,${encodedIcon}`}
      alt={source}
      width={size}
      height={size}
      className={className}
      style={{ color: '#6B7280' }}
    />
  );
}
```

**Step 2: 验证组件可以编译**

Run: `cd /home/young/code/ai-daily-web && npx tsc --noEmit components/icons/SourceIcon.tsx 2>&1`
Expected: No errors

**Step 3: 提交**

```bash
cd /home/young/code/ai-daily-web
git add components/icons/SourceIcon.tsx
git commit -m "feat: add SourceIcon component for source logos"
```

---

### Task 3: 创建 SourceFilterPills 药丸式筛选组件

**Files:**
- Create: `components/filters/SourceFilterPills.tsx`
- Modify: `app/page.tsx:95-98`（替换原有的 SourceFilter）
- Test: `components/filters/SourceFilterPills.tsx`（验证渲染）

**Step 1: 创建 SourceFilterPills.tsx**

```tsx
'use client';

import { Article } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface SourceFilterPillsProps {
  articles: Article[];
  selectedSource: string | null;
  onSelectSource: (source: string | null) => void;
}

export function SourceFilterPills({ articles, selectedSource, onSelectSource }: SourceFilterPillsProps) {
  const sources = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      counts[a.source] = (counts[a.source] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [articles]);

  if (sources.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelectSource(null)}
        className={cn(
          'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all',
          selectedSource === null
            ? 'bg-[#FF6B4A] text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        )}
      >
        全部
      </button>
      {sources.map(({ name, count }) => (
        <button
          key={name}
          onClick={() => onSelectSource(name === selectedSource ? null : name)}
          className={cn(
            'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5',
            selectedSource === name
              ? 'bg-[#FF6B4A] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          <span>{name}</span>
          <span className="text-xs opacity-70">({count})</span>
        </button>
      ))}
    </div>
  );
}
```

**Step 2: 验证组件可以编译**

Run: `cd /home/young/code/ai-daily-web && npx tsc --noEmit components/filters/SourceFilterPills.tsx 2>&1`
Expected: No errors

**Step 3: 修改 app/page.tsx**

替换 SourceFilter 为 SourceFilterPills：

```tsx
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';

// 在页面中使用：
<SourceFilterPills
  articles={articles}
  selectedSource={selectedSource}
  onSelectSource={setSelectedSource}
/>
```

**Step 4: 提交**

```bash
cd /home/young/code/ai-daily-web
git add components/filters/SourceFilterPills.tsx app/page.tsx
git commit -m "feat: add SourceFilterPills for source filtering"
```

---

## 阶段 2: API 集成

### Task 4: 添加时间段参数到 API

**Files:**
- Modify: `lib/api.ts`
- Test: `lib/api.ts`（验证类型）

**Step 1: 修改 api.ts 添加 period 参数**

```typescript
export async function fetchArticles(limit: number = 100, period: 'today' | 'yesterday' | 'week' | 'month' = 'today'): Promise<Article[]> {
  try {
    const response = await fetch(`/api/articles?limit=${limit}&period=${period}`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}
```

**Step 2: 提交**

```bash
cd /home/young/code/ai-daily-web
git add lib/api.ts
git commit -m "feat: add period parameter to fetchArticles API"
```

---

## 阶段 3: 集成与测试

### Task 5: 更新首页集成新组件

**Files:**
- Modify: `app/page.tsx`
- Test: 手动测试（npm run dev）

**Step 1: 修改 app/page.tsx 完整集成**

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';
import { TimeNav } from '@/components/layout/TimeNav';
import { ArticleListPH } from '@/components/article/ArticleListPH';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';

type Period = 'today' | 'yesterday' | 'week' | 'month';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('today');

  useEffect(() => {
    loadArticles();
  }, [period]);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchArticles(100, period);
      if (data.length > 0) {
        setArticles(data);
      } else {
        setArticles(getMockArticles());
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
      setArticles(getMockArticles());
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchSource = !selectedSource || article.source === selectedSource;
    return matchSource;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B4A] rounded-xl flex items-center justify-center text-xl text-white">
              🤖
            </div>
            <h1 className="text-xl font-bold">AI Daily</h1>
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="font-medium">首页</Link>
            <Link href="/timeline" className="text-gray-600">时间线</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[760px] mx-auto px-4 py-6">
        {/* Time Navigation */}
        <TimeNav value={period} onChange={setPeriod} />

        {/* Search & Filters */}
        <div className="mt-4">
          <SourceFilterPills
            articles={articles}
            selectedSource={selectedSource}
            onSelectSource={setSelectedSource}
          />
        </div>

        {/* Articles */}
        <div className="mt-4">
          <ArticleListPH
            articles={filteredArticles}
            loading={loading}
            onArticleClick={(article) => window.open(article.url, '_blank')}
          />
        </div>
      </main>
    </div>
  );
}
```

**Step 2: 提交**

```bash
cd /home/young/code/ai-daily-web
git add app/page.tsx
git commit -m "feat: integrate TimeNav and SourceFilterPills into homepage"
```

---

### Task 6: 验证与测试

**Step 1: 启动开发服务器测试**

Run: `cd /home/young/code/ai-daily-web && npm run dev`
Expected: 页面正常加载，显示新的时间导航和药丸筛选器

**Step 2: 提交最终更改**

```bash
cd /home/young/code/ai-daily-web
git add .
git commit -m "feat: complete Product Hunt style redesign phase 1"
```

---

## 📋 任务清单汇总

| Task | 组件 | 状态 |
|------|------|------|
| 1 | TimeNav 时间导航 | ⏳ 待开始 |
| 2 | SourceIcon 图标组件 | ⏳ 待开始 |
| 3 | SourceFilterPills 筛选器 | ⏳ 待开始 |
| 4 | API period 参数 | ⏳ 待开始 |
| 5 | 首页集成 | ⏳ 待开始 |
| 6 | 验证测试 | ⏳ 待开始 |

---

## ✅ 计划完成

**计划已保存到:** `docs/plans/IMPLEMENTATION_PLAN.md`

**两种执行方式：**

**1. Subagent-Driven (当前会话)** - 我逐个任务分配 subagent，每个任务后审查代码，快速迭代

**2. Parallel Session (新会话)** - 打开新会话使用 superpowers:executing-plans，分批执行

**选择哪种方式? 🎯**
