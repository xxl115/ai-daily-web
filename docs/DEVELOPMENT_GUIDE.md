# AI Daily - 开发规范

> 确保代码质量和团队协作效率的完整规范

---

## 1. 项目结构

```
ai-daily-web/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # 组件目录
│   ├── article/          # 文章相关组件
│   │   ├── ArticleCard.tsx
│   │   └── ArticleList.tsx
│   ├── filters/          # 筛选组件
│   │   ├── FilterPanel.tsx
│   │   ├── FilterTags.tsx
│   │   └── SourceFilter.tsx
│   ├── layout/           # 布局组件
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   └── Footer.tsx
│   └── ui/               # 基础 UI 组件
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
├── lib/                  # 工具库
│   ├── api.ts           # API 调用
│   ├── types/           # 类型定义
│   │   └── index.ts
│   ├── constants/       # 常量
│   │   ├── sources.ts
│   │   └── tags.ts
│   └── utils/           # 工具函数
│       └── index.ts
├── hooks/               # 自定义 Hooks
│   └── useFilters.ts
├── docs/                # 文档目录
│   ├── DESIGN_SPEC.md
│   └── DEVELOPMENT_GUIDE.md
└── prototypes/          # 原型文件
    └── search-filter/
```

---

## 2. 代码规范

### 2.1 TypeScript 规范

```typescript
// ✅ 使用 interface 定义对象结构
interface Article {
  id: string;
  title: string;
}

// ✅ 使用 type 定义联合类型
type ArticleCategory = 'hot' | 'deep' | 'new';

// ✅ 组件 Props 类型定义
interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
}

// ✅ 导出类型时使用 export type
export type { Article, ArticleCategory };

// ✅ 泛型组件
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// ❌ 避免使用 any
function process(data: unknown) { /* ... */ }

// ✅ 使用更精确的类型
function process(data: { id: string; value: number }) { /* ... */ }
```

### 2.2 React 组件规范

```tsx
// ✅ 函数组件 + 箭头函数
const ArticleCard = ({ article, onClick }: ArticleCardProps) => {
  // ✅ 使用 useMemo 缓存计算结果
  const formattedDate = useMemo(() => formatRelativeTime(article.publishedAt), [article.publishedAt]);

  // ✅ 使用 useCallback 缓存事件处理
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <article onClick={handleClick}>
      {/* ... */}
    </article>
  );
};

// ✅ 组件导出
export default ArticleCard;
export { ArticleCard };
```

### 2.3 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `ArticleCard.tsx` |
| 组件名称 | PascalCase | `ArticleCard` |
| Hook 文件 | camelCase + `use` 前缀 | `useFilters.ts` |
| Hook 函数 | camelCase + `use` 前缀 | `useFilters()` |
| 工具函数 | camelCase | `formatCount()` |
| 常量 | UPPER_SNAKE_CASE | `POPULAR_TAGS` |
| 类型/接口 | PascalCase | `Article`, `FilterState` |
| 类型参数 | T 开头 | `T`, `TItem` |

### 2.4 文件组织

```tsx
// ✅ 组件文件结构
// 1. Imports
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';

// 2. 类型定义
interface ArticleCardProps {
  article: Article;
}

// 3. 组件定义
const ArticleCard = ({ article }: ArticleCardProps) => {
  // Hooks
  const [isHovered, setIsHovered] = useState(false);

  // Handlers
  const handleMouseEnter = () => setIsHovered(true);

  // Render
  return (
    <Card>...</Card>
  );
};

// 4. Exports
export default ArticleCard;
```

---

## 3. Git 工作流

### 3.1 分支命名

```
feature/功能名     # 新功能开发
fix/问题名         # Bug 修复
refactor/模块名    # 代码重构
docs/文档名        # 文档更新
style/样式调整     # 代码格式调整
perf/性能优化      # 性能优化
test/测试相关      # 测试相关
```

### 3.2 Commit 规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型:**

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式调整（不影响功能） |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具链更新 |

**示例:**

```
feat(header): 添加搜索建议下拉框

- 实现热门搜索显示
- 实现最近搜索记录
- 添加键盘导航支持

Closes #123
```

### 3.3 Commit 示例

```bash
# ✅ 好的 commit
git commit -m "feat(filter): 添加时间范围筛选"

git commit -m "fix(card): 修复悬停动画闪烁问题

当快速移入移出时，动画队列堆积导致闪烁。
使用 transition 替代 animation 解决此问题。"

# ❌ 不好的 commit
git commit -m "update"
git commit -m "fix bug"
git commit -m "done"
```

---

## 4. 组件开发规范

### 4.1 组件设计原则

```tsx
// ✅ 单一职责：每个组件只做一件事
const SearchBar = () => { /* 只负责搜索输入 */ };
const SearchSuggestions = () => { /* 只负责建议显示 */ };

// ✅ 可组合性：组件可组合使用
<FilterPanel>
  <TimeFilter />
  <SourceFilter />
  <SortFilter />
</FilterPanel>

// ✅ Props 清晰：明确必要的和可选的 props
interface ComponentProps {
  // 必要
  data: Article[];
  // 可选
  loading?: boolean;
  // 事件
  onItemClick?: (item: Article) => void;
}

// ❌ 避免：组件职责不清
const Everything = () => { /* 搜索、筛选、列表全在一起 */ };
```

### 4.2 Props 传递规范

```tsx
// ✅ 解构 props
const ArticleCard = ({ article, onClick }: ArticleCardProps) => {
  return <article onClick={onClick}>...</article>;
};

// ✅ 使用 rest 参数传递原生属性
const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={cn('base-class', className)} {...props} />;
};

// ❌ 避免：直接使用 props 对象
const BadComponent = (props: Props) => {
  return <div>{props.article.title}</div>;
};
```

### 4.3 条件渲染

```tsx
// ✅ 使用 && 简化条件
{isLoading && <LoadingSpinner />}

// ✅ 使用三元运算符处理两种状态
{isLoading ? <LoadingSpinner /> : <Content />}

// ✅ 提取复杂条件到变量
const shouldShowBadge = article.category === 'hot' && article.viewCount > 1000;
{shouldShowBadge && <HotBadge />}

// ✅ 使用早返回
const ArticleCard = ({ article }: Props) => {
  if (!article) return null;

  return (
    <Card>...</Card>
  );
};

// ❌ 避免：嵌套过深
const Bad = () => {
  return (
    <div>
      {condition ? (
        <span>
          {anotherCondition ? <p>...</p> : null}
        </span>
      ) : null}
    </div>
  );
};
```

### 4.4 列表渲染

```tsx
// ✅ 使用稳定的 key
{articles.map(article => (
  <ArticleCard key={article.id} article={article} />
))}

// ❌ 避免使用 index 作为 key（除非列表静态）
{items.map((item, index) => (
  <BadItem key={index} item={item} />
))}
```

---

## 5. 性能优化

### 5.1 React 性能

```tsx
// ✅ 使用 React.memo 避免不必要的重渲染
export const ArticleCard = React.memo(({ article }: Props) => {
  return <Card>...</Card>;
});

// ✅ 使用 useMemo 缓存计算结果
const filteredArticles = useMemo(() => {
  return articles.filter(filterFn);
}, [articles, filterFn]);

// ✅ 使用 useCallback 缓存回调函数
const handleSearch = useCallback((keyword: string) => {
  setFilters(prev => ({ ...prev, keyword }));
}, []);

// ❌ 避免在渲染中创建新对象/函数
const BadComponent = () => {
  const handleClick = () => { /* 每次渲染都是新函数 */ };
  return <button onClick={handleClick} />;
};
```

### 5.2 图片优化

```tsx
// ✅ 使用 Next.js Image 组件
import Image from 'next/image';

<Image
  src="/thumbnail.jpg"
  alt={article.title}
  width={128}
  height={96}
  loading="lazy"
  placeholder="blur"
/>
```

### 5.3 代码分割

```tsx
// ✅ 动态导入重型组件
const FilterPanel = dynamic(() => import('@/components/filters/FilterPanel'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

---

## 6. 样式规范

### 6.1 Tailwind 使用

```tsx
// ✅ 使用 clsx/cn 工具合并类名
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  'another-class'
)} />

// ✅ 提取重复的类名到常量
const CARD_BASE_CLASSES = 'bg-white rounded-2xl p-6 border border-gray-100';

// ✅ 使用 @apply 定义组件样式
// components/ui/Button.tsx
<button className="btn-primary">Click</button>

/* app/globals.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary text-white rounded-lg;
    @apply hover:bg-red-600 transition-colors;
  }
}

// ❌ 避免内联样式（除非动态值）
<div style={{ marginTop: '10px' }} />

// ✅ 使用 Tailwind 类
<div className="mt-2" />
```

### 6.2 响应式设计

```tsx
// ✅ 使用 Tailwind 响应式前缀
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* 移动端 1 列，中等屏幕 4 列 */}
</div>

// ✅ 条件性显示
<span className="hidden sm:inline">仅在 sm 及以上显示</span>
<span className="sm:hidden">仅在 sm 以下显示</span>
```

---

## 7. 可访问性 (A11y)

### 7.1 语义化 HTML

```tsx
// ✅ 使用语义化标签
<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<section>...</section>
<footer>...</footer>

// ❌ 避免滥用 div
<div className="header">...</div>
<div className="article">...</div>
```

### 7.2 ARIA 属性

```tsx
// ✅ 按钮状态
<button
  aria-pressed={isActive}
  aria-label="关闭筛选面板"
  onClick={toggleFilter}
>
  <FilterIcon aria-hidden="true" />
</button>

// ✅ 表单元素
<label htmlFor="search-input">搜索</label>
<input
  id="search-input"
  type="text"
  aria-label="搜索 AI 新闻"
  aria-describedby="search-hint"
/>
<span id="search-hint" className="sr-only">输入关键词搜索</span>

// ✅ 加载状态
<div role="status" aria-live="polite">
  <span aria-hidden="true">加载中...</span>
</div>
```

### 7.3 键盘导航

```tsx
// ✅ 确保所有交互元素可聚焦
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  可访问按钮
</button>

// ✅ 焦点管理
const modalRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);
```

---

## 8. 错误处理

### 8.1 错误边界

```tsx
// components/ErrorBoundary.tsx
'use client';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  Props,
  { hasError: boolean; error?: Error }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // 可以上报到错误追踪服务
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 rounded-lg">
          <h2>出错了</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 8.2 API 错误处理

```typescript
// lib/api.ts
export async function fetchArticles(filters: FilterState): Promise<Article[]> {
  try {
    const response = await fetch('/api/articles', {
      method: 'POST',
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      // 抛出包含状态码的错误
      throw new ApiError(response.status, response.statusText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      // 处理 API 错误
      console.error(`API Error: ${error.status} - ${error.message}`);
    } else {
      // 处理网络错误等
      console.error('Network Error:', error);
    }
    throw error;
  }
}

// 使用
class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}
```

---

## 9. 测试规范

### 9.1 单元测试

```typescript
// __tests__/utils/formatCount.test.ts
import { formatCount } from '@/lib/utils';

describe('formatCount', () => {
  it('应该正确格式化小数字', () => {
    expect(formatCount(999)).toBe('999');
  });

  it('应该正确格式化千位数字', () => {
    expect(formatCount(1500)).toBe('1.5k');
  });

  it('应该处理边界情况', () => {
    expect(formatCount(0)).toBe('0');
    expect(formatCount(1000)).toBe('1.0k');
  });
});
```

### 9.2 组件测试

```typescript
// __tests__/components/ArticleCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ArticleCard } from '@/components/article/ArticleCard';

describe('ArticleCard', () => {
  const mockArticle = {
    id: '1',
    title: 'Test Article',
    // ...
  };

  it('应该渲染文章标题', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });

  it('点击时应该调用 onClick', () => {
    const handleClick = vi.fn();
    render(<ArticleCard article={mockArticle} onClick={handleClick} />);
    screen.getByRole('article').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 9.3 E2E 测试

```typescript
// e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test('搜索功能', async ({ page }) => {
  await page.goto('/');

  // 输入搜索关键词
  await page.fill('input[placeholder*="搜索"]', 'GPT-4');
  await page.press('input[placeholder*="搜索"]', 'Enter');

  // 等待结果加载
  await page.waitForSelector('article');

  // 验证结果
  const articles = await page.locator('article').count();
  expect(articles).toBeGreaterThan(0);
});
```

---

## 10. 文档规范

### 10.1 组件文档

```tsx
/**
 * ArticleCard 组件
 *
 * 用于展示单篇文章的卡片，包含标题、摘要、标签等信息。
 *
 * @param article - 文章数据对象
 * @param onClick - 点击卡片时的回调函数（可选）
 *
 * @example
 * ```tsx
 * <ArticleCard
 *   article={articleData}
 *   onClick={() => router.push(`/articles/${article.id}`)}
 * />
 * ```
 */
export const ArticleCard = ({ article, onClick }: ArticleCardProps) => {
  // ...
};
```

### 10.2 API 文档

```typescript
/**
 * 获取文章列表
 *
 * @param filters - 筛选条件
 * @param filters.keyword - 搜索关键词
 * @param filters.timeRange - 时间范围 (today|yesterday|week|month)
 * @param filters.sources - 来源列表
 * @param filters.tags - 标签列表
 * @param filters.sortBy - 排序方式 (hot|newest|relevant|comments)
 *
 * @returns 文章数组
 *
 * @throws {ApiError} 当请求失败时抛出
 *
 * @example
 * ```ts
 * const articles = await fetchArticles({
 *   timeRange: 'today',
 *   sortBy: 'hot',
 * });
 * ```
 */
export async function fetchArticles(filters: FilterState): Promise<Article[]> {
  // ...
}
```

---

## 11. 开发检查清单

### 11.1 提交前检查

- [ ] 代码符合 TypeScript 类型规范（无 any）
- [ ] 无 console.log 或调试代码
- [ ] 组件有必要的错误处理
- [ ] 无 ESLint 警告
- [ ] 无 Prettier 格式问题
- [ ] 移动端响应式正常
- [ ] 键盘导航可用
- [ ] Commit message 符合规范
- [ ] 大改动已更新文档

### 11.2 功能检查

- [ ] 所有按钮可点击
- [ ] 表单验证正常
- [ ] 加载状态有反馈
- [ ] 错误状态有提示
- [ ] 空状态有展示
- [ ] 动画流畅不卡顿

### 11.3 性能检查

- [ ] 无不必要的重渲染
- [ ] 图片已优化
- [ ] 无内存泄漏
- [ ] Bundle 体积合理

---

## 12. 常用命令

```bash
# 开发
npm run dev          # 启动开发服务器

# 代码检查
npm run lint         # ESLint 检查
npm run format       # Prettier 格式化
npm run type-check   # TypeScript 类型检查

# 测试
npm run test         # 运行单元测试
npm run test:e2e     # 运行 E2E 测试

# 构建
npm run build        # 生产构建
npm run analyze      # 分析包体积

# Git
git status           # 查看状态
git add .            # 添加所有变更
git commit -m "..."   # 提交
```
