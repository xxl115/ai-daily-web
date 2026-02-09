# Product Hunt 风格重设计实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标:** 将 AI Daily Web 重设计为 Product Hunt 风格，包括紧凑卡片布局、时间维度切换和简化交互。

**架构:** 保持 Next.js App Router 架构，重构首页和卡片组件，添加时间维度状态管理，使用 React Query 优化数据缓存。

**技术栈:** Next.js 16, React 19, TypeScript, Tailwind CSS, React Query, simple-icons

---

## Phase 1: 基础设施准备

### Task 1: 安装 simple-icons 依赖

**Files:**
- Modify: `package.json`

**Step 1: 安装 simple-icons**

Run: `npm install simple-icons`

Expected: package.json updated with simple-icons dependency

**Step 2: 验证安装**

Run: `npm list simple-icons`

Expected: `simple-icons@<version>`

**Step 3: 提交**

```bash
git add package.json package-lock.json
git commit -m "deps: add simple-icons for source icons"
```

---

### Task 2: 创建时间维度类型定义

**Files:**
- Modify: `lib/types/index.ts`

**Step 1: 添加 TimePeriod 类型**

在 `lib/types/index.ts` 中添加：

```typescript
export type TimePeriod = 'today' | 'yesterday' | 'week' | 'month';

export interface TimeFilter {
  period: TimePeriod;
  label: string;
}
```

**Step 2: 导出类型**

确保类型被导出：

```typescript
export type { Article, ApiResponse, TimePeriod, TimeFilter };
```

**Step 3: 提交**

```bash
git add lib/types/index.ts
git commit -m "types: add TimePeriod type for time filtering"
```

---

### Task 3: 创建时间周期常量

**Files:**
- Create: `lib/constants/time-periods.ts`

**Step 1: 创建时间周期配置**

创建 `lib/constants/time-periods.ts`：

```typescript
import { TimeFilter } from '@/lib/types';

export const TIME_PERIODS: TimeFilter[] = [
  { period: 'today', label: '今日热门' },
  { period: 'yesterday', label: '昨日热门' },
  { period: 'week', label: '本周热门' },
  { period: 'month', label: '上月热门' },
];

export const DEFAULT_PERIOD: TimePeriod = 'today';

// 获取周期对应的 API 参数
export function getPeriodParam(period: TimePeriod): string {
  const params: Record<TimePeriod, string> = {
    today: 'today',
    yesterday: 'yesterday',
    week: 'week',
    month: 'month',
  };
  return params[period];
}
```

**Step 2: 提交**

```bash
git add lib/constants/time-periods.ts
git commit -m "feat: add time period constants and utilities"
```

---

## Phase 2: 来源图标组件

### Task 4: 创建来源图标映射

**Files:**
- Create: `lib/constants/source-icons.ts`

**Step 1: 创建图标映射配置**

创建 `lib/constants/source-icons.ts`：

```typescript
export interface SourceIconConfig {
  name: string;           // simple-icons 中的图标名称
  color?: string;         // 可选的品牌色
  fallback?: string;      // 回退文字
}

export const SOURCE_ICONS: Record<string, SourceIconConfig> = {
  'Hacker News': {
    name: 'ycombinator',
    color: '#FF6600',
    fallback: 'HN',
  },
  'GitHub': {
    name: 'github',
    color: '#24292E',
    fallback: 'GH',
  },
  'V2EX': {
    name: 'v2ex', // simple-icons 可能有，如果没有用通用
    color: '#fff',
    fallback: 'V2',
  },
  'Product Hunt': {
    name: 'producthunt',
    color: '#DA552F',
    fallback: 'PH',
  },
  'OpenAI Blog': {
    name: 'openai',
    color: '#000',
    fallback: 'AI',
  },
  'Dev.to': {
    name: 'devdotto',
    color: '#0A0A0A',
    fallback: 'DEV',
  },
  'TechCrunch': {
    name: 'techcrunch',
    color: '#0A9E01',
    fallback: 'TC',
  },
  'The Verge': {
    name: 'theverge',
    color: '#E5127D',
    fallback: 'TV',
  },
  '36氪': {
    name: null as any, // simple-icons 可能没有
    color: '#FF6600',
    fallback: '36',
  },
  'AI Blogs': {
    name: null as any,
    color: '#6366F1',
    fallback: 'AI',
  },
};

export function getSourceIcon(source: string): SourceIconConfig {
  return SOURCE_ICONS[source] || {
    name: null as any,
    color: '#6B7280',
    fallback: source.substring(0, 2).toUpperCase(),
  };
}
```

**Step 2: 提交**

```bash
git add lib/constants/source-icons.ts
git commit -m "feat: add source icon mapping configuration"
```

---

### Task 5: 创建 SourceIcon 组件

**Files:**
- Create: `components/icons/SourceIcon.tsx`

**Step 1: 创建 SourceIcon 组件**

创建 `components/icons/SourceIcon.tsx`：

```typescript
'use client';

import { getSourceIcon } from '@/lib/constants/source-icons';
import * as SimpleIcons from 'simple-icons';
import { memo } from 'react';

interface SourceIconProps {
  source: string;
  size?: number;
  className?: string;
}

export const SourceIcon = memo(({ source, size = 32, className = '' }: SourceIconProps) => {
  const config = getSourceIcon(source);

  if (config.name && SimpleIcons[config.name]) {
    const icon = SimpleIcons[config.name as keyof typeof SimpleIcons] as any;
    const svg = icon.svg;
    const color = config.color || icon.hex;

    return (
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
        alt={source}
        width={size}
        height={size}
        className={className}
        style={{ color }}
      />
    );
  }

  // 回退到文字图标
  return (
    <div
      className={`flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-xs`}
      style={{
        width: size,
        height: size,
        borderRadius: '6px',
        backgroundColor: config.color ? `${config.color}20` : undefined,
        color: config.color,
      }}
    >
      {config.fallback}
    </div>
  );
});

SourceIcon.displayName = 'SourceIcon';
```

**Step 3: 提交**

```bash
git add components/icons/SourceIcon.tsx
git commit -m "feat: add SourceIcon component with simple-icons integration"
```

---

## Phase 3: PH 风格卡片组件

### Task 6: 创建 ArticleCardCompactPH 组件

**Files:**
- Create: `components/article/ArticleCardCompactPH.tsx`

**Step 1: 创建紧凑卡片组件**

创建 `components/article/ArticleCardCompactPH.tsx`：

```typescript
'use client';

import { Article } from '@/lib/types';
import { SourceIcon } from '@/components/icons/SourceIcon';
import { timeAgo } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

interface ArticleCardCompactPHProps {
  article: Article;
  onToggleSummary?: (id: string) => void;
}

export function ArticleCardCompactPH({
  article,
  onToggleSummary,
}: ArticleCardCompactPHProps) {
  const [showSummary, setShowSummary] = useState(false);

  const handleSummaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSummary(!showSummary);
    onToggleSummary?.(article.id);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm hover:-translate-y-px transition-all duration-200">
      <div className="flex gap-3">
        {/* 左侧：来源图标 */}
        <div className="shrink-0 pt-0.5">
          <SourceIcon source={article.source} size={32} />
        </div>

        {/* 中间：内容 */}
        <div className="flex-1 min-w-0">
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="font-medium text-sm text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-2 mb-1">
              {article.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium">{article.source}</span>
            <span>·</span>
            <span>{timeAgo(article.publishedAt)}</span>
          </div>

          {/* AI 摘要展开 */}
          {showSummary && article.summary && (
            <div className="mt-2 text-xs text-gray-600 bg-gray-50 rounded p-2 line-clamp-3">
              {article.summary}
            </div>
          )}
        </div>

        {/* 右侧：热度和操作 */}
        <div className="shrink-0 flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm">🔥</span>
            <span className="font-display font-bold text-sm text-gray-900">
              {article.hotScore}
            </span>
          </div>

          <button
            onClick={handleSummaryClick}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-400 hover:text-brand-orange"
            title={showSummary ? '收起摘要' : '查看 AI 摘要'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: 提交**

```bash
git add components/article/ArticleCardCompactPH.tsx
git commit -m "feat: add PH-style compact article card component"
```

---

### Task 7: 创建 ArticleListPH 组件

**Files:**
- Create: `components/article/ArticleListPH.tsx`

**Step 1: 创建列表容器组件**

创建 `components/article/ArticleListPH.tsx`：

```typescript
'use client';

import { Article } from '@/lib/types';
import { ArticleCardCompactPH } from './ArticleCardCompactPH';

interface ArticleListPHProps {
  articles: Article[];
  loading?: boolean;
  onToggleSummary?: (id: string) => void;
}

export function ArticleListPH({
  articles,
  loading = false,
  onToggleSummary,
}: ArticleListPHProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-3 animate-pulse"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {articles.map((article) => (
        <ArticleCardCompactPH
          key={article.id}
          article={article}
          onToggleSummary={onToggleSummary}
        />
      ))}
    </div>
  );
}
```

**Step 2: 提交**

```bash
git add components/article/ArticleListPH.tsx
git commit -m "feat: add PH-style article list container"
```

---

## Phase 4: 时间导航组件

### Task 8: 创建 TimeNav 组件

**Files:**
- Create: `components/layout/TimeNav.tsx`

**Step 1: 创建时间切换组件**

创建 `components/layout/TimeNav.tsx`：

```typescript
'use client';

import { TIME_PERIODS } from '@/lib/constants/time-periods';
import { TimePeriod } from '@/lib/types';

interface TimeNavProps {
  currentPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export function TimeNav({ currentPeriod, onPeriodChange }: TimeNavProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {TIME_PERIODS.map((period) => {
        const isActive = currentPeriod === period.period;
        return (
          <button
            key={period.period}
            onClick={() => onPeriodChange(period.period)}
            className={`
              shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
              ${isActive
                ? 'bg-brand-orange text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }
            `}
          >
            {period.label}
          </button>
        );
      })}
    </div>
  );
}
```

**Step 2: 提交**

```bash
git add components/layout/TimeNav.tsx
git commit -m "feat: add TimeNav component for period switching"
```

---

## Phase 5: 数据获取优化

### Task 9: 创建 useTimePeriodArticles Hook

**Files:**
- Create: `hooks/useTimePeriodArticles.ts`

**Step 1: 创建时间周期数据获取 Hook**

创建 `hooks/useTimePeriodArticles.ts`：

```typescript
'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Article, ApiResponse, TimePeriod } from '@/lib/types';
import { getPeriodParam } from '@/lib/constants/time-periods';

interface FetchArticlesOptions {
  period: TimePeriod;
  limit?: number;
}

async function fetchArticles({
  period,
  limit = 100,
}: FetchArticlesOptions): Promise<ApiResponse<Article[]>> {
  const periodParam = getPeriodParam(period);
  const url = `https://ai-daily-collector.xxl185.workers.dev/api/hotspots?limit=${limit}&period=${periodParam}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export function useTimePeriodArticles(
  period: TimePeriod,
  enabled = true
): UseQueryResult<ApiResponse<Article[]>, Error> {
  return useQuery({
    queryKey: ['articles', period],
    queryFn: () => fetchArticles({ period }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 分钟
    gcTime: 10 * 60 * 1000, // 10 分钟
  });
}
```

**Step 2: 提交**

```bash
git add hooks/useTimePeriodArticles.ts
git commit -m "feat: add useTimePeriodArticles hook with React Query"
```

---

### Task 10: 更新 API 客户端

**Files:**
- Modify: `lib/api.ts`

**Step 1: 添加时间段参数支持**

更新 `lib/api.ts` 中的 fetch 函数：

```typescript
// 在现有代码中添加 period 参数
export async function fetchArticles(
  limit: number = 100,
  period?: string
): Promise<ApiResponse<Article[]>> {
  // 构建查询参数
  const params = new URLSearchParams({
    limit: limit.toString(),
  });

  if (period) {
    params.append('period', period);
  }

  const url = `${API_BASE}/hotspots?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    // 返回 mock 数据作为回退
    return getMockArticles();
  }
}
```

**Step 2: 提交**

```bash
git add lib/api.ts
git commit -m "feat: add period parameter to API client"
```

---

## Phase 6: 首页重构

### Task 11: 创建新的首页组件

**Files:**
- Create: `app/page-ph.tsx`
- Modify: `app/page.tsx` (备份后替换)

**Step 1: 创建 PH 风格首页**

创建 `app/page-ph.tsx`：

```typescript
'use client';

import { useState } from 'react';
import { TimePeriod } from '@/lib/types';
import { useTimePeriodArticles } from '@/hooks/useTimePeriodArticles';
import { TimeNav } from '@/components/layout/TimeNav';
import { ArticleListPH } from '@/components/article/ArticleListPH';
import { SourceFilter } from '@/components/filters/SourceFilter';

export default function HomePage() {
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod>('today');

  const { data, isLoading, error } = useTimePeriodArticles(currentPeriod);

  const articles = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            AI Daily
          </h1>
          <p className="text-gray-600 mt-2">
            发现最新的 AI 资讯和趋势
          </p>
        </header>

        {/* 时间导航 */}
        <TimeNav
          currentPeriod={currentPeriod}
          onPeriodChange={setCurrentPeriod}
        />

        {/* 来源筛选 */}
        <div className="mb-6">
          <SourceFilter
            sources={data?.sources || []}
            selectedSource={null}
            onSourceChange={() => {}}
          />
        </div>

        {/* 文章列表 */}
        <ArticleListPH articles={articles} loading={isLoading} />

        {/* 错误提示 */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            加载失败：{error.message}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: 备份原首页**

```bash
cp app/page.tsx app/page-backup-original.tsx
```

**Step 3: 替换首页**

```bash
mv app/page-ph.tsx app/page.tsx
```

**Step 4: 提交**

```bash
git add app/page.tsx app/page-backup-original.tsx
git commit -m "feat: implement PH-style homepage with time navigation"
```

---

## Phase 7: 样式调整

### Task 12: 更新全局样式

**Files:**
- Modify: `app/globals.css`

**Step 1: 添加 PH 风格样式**

在 `app/globals.css` 中添加/更新：

```css
/* Brand Orange - 主色 */
:root {
  --brand-orange: #FF6B4A;
  --color-brand: var(--brand-orange);
}

/* 卡片样式 */
.ph-card {
  background: #FFFFFF;
  border: 0.5px solid #E5E7EB;
  border-radius: 6px;
  padding: 10px;
  transition: all 0.2s ease;
}

.ph-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 滚动条样式 */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #D1D5DB transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 2px;
}
```

**Step 2: 提交**

```bash
git add app/globals.css
git commit -m "style: add PH-style global CSS variables and utilities"
```

---

## Phase 8: 响应式布局

### Task 13: 添加移动端适配

**Files:**
- Modify: `app/page.tsx`

**Step 1: 更新首页响应式布局**

更新 `app/page.tsx` 的容器部分：

```typescript
<div className="min-h-screen bg-gray-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
    {/* ... 其他内容保持不变 ... */}
  </div>
</div>
```

**Step 2: 更新卡片响应式**

更新 `ArticleCardCompactPH.tsx` 中的间距：

```typescript
<div className="flex gap-2 sm:gap-3">
  {/* ... */}
</div>
```

**Step 3: 提交**

```bash
git add app/page.tsx components/article/ArticleCardCompactPH.tsx
git commit -m "style: add responsive layout for mobile devices"
```

---

## Phase 9: 测试和优化

### Task 14: 本地测试

**Files:**
- None (验证步骤)

**Step 1: 启动开发服务器**

```bash
npm run dev
```

Expected: 服务器启动在 http://localhost:3000

**Step 2: 验证功能**

检查清单：
- [ ] 时间切换正常工作
- [ ] 来源图标正确显示
- [ ] 卡片 hover 效果正常
- [ ] AI 摘要展开/收起正常
- [ ] 移动端响应式正常
- [ ] 无控制台错误

**Step 3: 修复发现的问题**

如果发现问题，创建单独的修复任务

**Step 4: 提交任何修复**

```bash
git add .
git commit -m "fix: address issues found during testing"
```

---

### Task 15: 性能优化

**Files:**
- Modify: `components/article/ArticleCardCompactPH.tsx`

**Step 1: 添加 React.memo**

确保组件已使用 memo（已添加，跳过）

**Step 2: 添加 loading 骨架屏**

已在 ArticleListPH 中实现

**Step 3: 提交优化**

```bash
git add components/article/ArticleListPH.tsx
git commit -m "perf: optimize loading states and component rendering"
```

---

## Phase 10: 文档更新

### Task 16: 更新 README

**Files:**
- Modify: `README.md`

**Step 1: 添加新功能说明**

在 README.md 中添加：

```markdown
## 功能

- 🎯 **时间维度浏览** - 今日/昨日/本周/上月热门文章
- 🏷️ **来源图标** - 使用真实品牌 logo 识别文章来源
- 📰 **紧凑卡片** - Product Hunt 风格的简洁卡片布局
- 🤖 **AI 摘要** - 一键展开文章 AI 摘要
- 🔍 **来源筛选** - 快速筛选特定数据源
```

**Step 2: 提交**

```bash
git add README.md
git commit -m "docs: update README with new PH-style features"
```

---

### Task 17: 清理备份文件

**Files:**
- Multiple

**Step 1: 删除临时备份文件**

```bash
rm -f app/page-backup.tsx app/page-old.tsx app/page-new-design.tsx
```

**Step 2: 提交清理**

```bash
git add -A
git commit -m "chore: remove temporary backup files"
```

---

## 验收标准

完成所有任务后，项目应该：

1. ✅ 首页采用 PH 风格设计
2. ✅ 时间切换正常工作（今日/昨日/本周/上月）
3. ✅ 来源使用真实图标显示
4. ✅ 卡片紧凑、无排名
5. ✅ 响应式布局适配移动端
6. ✅ 所有功能无控制台错误
7. ✅ 代码已提交到 `feature/ph-style-redesign` 分支

---

## 下一步

完成实现后，使用 `superpowers:finishing-a-development-branch` 来：

1. 运行完整测试
2. 创建 Pull Request
3. 合并到 main 分支
4. 清理 worktree
