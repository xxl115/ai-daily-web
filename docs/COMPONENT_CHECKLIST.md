# AI Daily - 组件清单

> 基于原型的完整组件拆解和开发优先级

---

## 1. 基础 UI 组件 (ui/)

### 1.1 Button
**文件:** `components/ui/Button.tsx`

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

**变体:**
- `primary`: 主按钮（红色背景）
- `secondary`: 次按钮（灰色背景）
- `ghost`: 幽灵按钮（无背景）

**优先级:** 🔴 P0 - 核心依赖

---

### 1.2 Card
**文件:** `components/ui/Card.tsx`

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}
```

**优先级:** 🔴 P0 - 核心依赖

---

### 1.3 Badge
**文件:** `components/ui/Badge.tsx`

**Props:**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'hot' | 'deep' | 'new' | 'breaking' | 'default';
  size?: 'sm' | 'md';
}
```

**变体样式:**
| variant | emoji | bgClass | textClass |
|---------|-------|---------|-----------|
| hot | 🔥 | bg-primary/10 | text-primary |
| deep | 📰 | bg-secondary/10 | text-secondary |
| new | 🆕 | bg-green-100 | text-green-600 |
| breaking | ⚡ | bg-orange-100 | text-orange-600 |
| default | - | bg-gray-100 | text-gray-600 |

**优先级:** 🔴 P0 - 核心依赖

---

### 1.4 Icon
**文件:** `components/ui/Icon.tsx`

**Props:**
```typescript
interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**支持的图标:**
- 搜索、筛选、关闭、眼睛、评论、GitHub、时钟、列表、网格等

**优先级:** 🟡 P1

---

### 1.5 Input
**文件:** `components/ui/Input.tsx`

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

**优先级:** 🔴 P0 - 核心依赖

---

### 1.6 Select
**文件:** `components/ui/Select.tsx`

**Props:**
```typescript
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}
```

**优先级:** 🔴 P0 - 核心依赖

---

### 1.7 Tag
**文件:** `components/ui/Tag.tsx`

**Props:**
```typescript
interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onToggle?: () => void;
  size?: 'sm' | 'md';
}
```

**优先级:** 🔴 P0 - 核心依赖

---

### 1.8 Skeleton
**文件:** `components/ui/Skeleton.tsx`

**Props:**
```typescript
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}
```

**优先级:** 🟢 P2

---

### 1.9 Dropdown
**文件:** `components/ui/Dropdown.tsx`

**Props:**
```typescript
interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

interface DropdownItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}
```

**优先级:** 🔴 P0 - 核心依赖

---

## 2. 布局组件 (layout/)

### 2.1 Header
**文件:** `components/layout/Header.tsx`

**功能:**
- Logo 展示
- 搜索框区域
- 高级筛选按钮（带徽章）
- GitHub 链接
- 当前筛选标签展示

**Props:**
```typescript
interface HeaderProps {
  activeFilterCount?: number;
  onToggleFilter?: () => void;
}

interface HeaderActionsProps {
  onToggleFilter: () => void;
  activeFilterCount: number;
}
```

**优先级:** 🔴 P0

---

### 2.2 SearchBar
**文件:** `components/layout/SearchBar.tsx`

**功能:**
- 搜索输入框
- 搜索建议下拉框
- 热门搜索/最近搜索

**Props:**
```typescript
interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (keyword: string) => void;
  suggestions?: SearchSuggestions;
  recentSearches?: string[];
}

interface SearchSuggestionsProps {
  keyword?: string;
  trending: SearchSuggestion[];
  recent: SearchSuggestion[];
  onSelect: (suggestion: SearchSuggestion) => void;
}
```

**优先级:** 🔴 P0

---

### 2.3 FilterPanel
**文件:** `components/filters/FilterPanel.tsx`

**功能:**
- 时间范围筛选（单选）
- 来源筛选（下拉+快捷 Pill）
- 排序方式（下拉）
- 热门标签（多选）
- 应用/清除按钮

**Props:**
```typescript
interface FilterPanelProps {
  isOpen?: boolean;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
}
```

**优先级:** 🔴 P0

---

### 2.4 FilterTags
**文件:** `components/filters/FilterTags.tsx`

**功能:**
- 展示当前激活的筛选标签
- 支持点击移除单个标签
- 全部清除按钮

**Props:**
```typescript
interface FilterTagsProps {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value: string) => void;
  onClearAll: () => void;
}
```

**优先级:** 🟡 P1

---

### 2.5 TimeFilter
**文件:** `components/filters/TimeFilter.tsx`

**Props:**
```typescript
interface TimeFilterProps {
  value: TimeFilter;
  onChange: (value: TimeFilter) => void;
}

// 选项: today | yesterday | week | month
```

**优先级:** 🔴 P0 - FilterPanel 子组件

---

### 2.6 SourceFilter
**文件:** `components/filters/SourceFilter.tsx`

**Props:**
```typescript
interface SourceFilterProps {
  value: ArticleSource[];
  onChange: (sources: ArticleSource[]) => void;
}
```

**优先级:** 🔴 P0 - FilterPanel 子组件

---

### 2.7 SortFilter
**文件:** `components/filters/SortFilter.tsx`

**Props:**
```typescript
interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

// 选项: hot | newest | relevant | comments
```

**优先级:** 🔴 P0 - FilterPanel 子组件

---

### 2.8 TagFilter
**文件:** `components/filters/TagFilter.tsx`

**Props:**
```typescript
interface TagFilterProps {
  options: string[];
  value: string[];
  onChange: (tags: string[]) => void;
  allowCustom?: boolean;
}
```

**优先级:** 🔴 P0 - FilterPanel 子组件

---

## 3. 文章组件 (article/)

### 3.1 ArticleCard
**文件:** `components/article/ArticleCard.tsx`

**功能:**
- 文章缩略图/图标
- 分类徽章
- 标题、摘要
- 来源、时间
- 浏览量、评论数
- 标签列表

**Props:**
```typescript
interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}
```

**优先级:** 🔴 P0

---

### 3.2 ArticleList
**文件:** `components/article/ArticleList.tsx`

**功能:**
- 文章列表渲染
- 加载状态
- 空状态
- 错误状态

**Props:**
```typescript
interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  error?: Error | null;
  onArticleClick?: (article: Article) => void;
}

interface ArticleListEmptyProps {
  keyword?: string;
}

interface ArticleListErrorProps {
  error: Error;
  onRetry?: () => void;
}
```

**优先级:** 🔴 P0

---

### 3.3 ArticleMeta
**文件:** `components/article/ArticleMeta.tsx`

**功能:**
- 显示来源、时间
- 显示浏览量、评论数

**Props:**
```typescript
interface ArticleMetaProps {
  source: string;
  publishedAt: string;
  viewCount?: number;
  commentCount?: number;
  showStats?: boolean;
}
```

**优先级:** 🟡 P1 - 可合并到 ArticleCard

---

### 3.4 ArticleTags
**文件:** `components/article/ArticleTags.tsx`

**Props:**
```typescript
interface ArticleTagsProps {
  tags: string[];
  max?: number;
  onClickTag?: (tag: string) => void;
}
```

**优先级:** 🟡 P1 - 可合并到 ArticleCard

---

## 4. 页面组件

### 4.1 HomePage
**文件:** `app/page.tsx`

**功能:**
- 组合 Header + FilterPanel + ArticleList
- 结果统计
- 视图切换

**优先级:** 🔴 P0

---

### 4.2 ResultStats
**文件:** `components/layout/ResultStats.tsx`

**功能:**
- 显示结果数量
- 视图切换按钮

**Props:**
```typescript
interface ResultStatsProps {
  count: number;
  view: 'list' | 'grid';
  onViewChange: (view: 'list' | 'grid') => void;
}
```

**优先级:** 🟡 P1

---

## 5. Hooks

### 5.1 useFilters
**文件:** `hooks/useFilters.ts`

**功能:**
- 管理筛选状态
- 应用/清除筛选
- URL 同步

```typescript
interface UseFiltersReturn {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  isActive: boolean;
}
```

**优先级:** 🔴 P0

---

### 5.2 useSearch
**文件:** `hooks/useSearch.ts`

**功能:**
- 搜索关键词状态
- 搜索历史管理
- 防抖处理

```typescript
interface UseSearchReturn {
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchHistory: string[];
  addToHistory: (keyword: string) => void;
  clearHistory: () => void;
}
```

**优先级:** 🔴 P0

---

### 5.3 useArticles
**文件:** `hooks/useArticles.ts`

**功能:**
- 获取文章列表
- 加载状态
- 错误处理

```typescript
interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}
```

**优先级:** 🔴 P0

---

### 5.4 useDebounce
**文件:** `hooks/useDebounce.ts`

**功能:**
- 防抖处理

```typescript
function useDebounce<T>(value: T, delay: number): T
```

**优先级:** 🟡 P1

---

### 5.5 useToggle
**文件:** `hooks/useToggle.ts`

**功能:**
- 切换布尔状态

```typescript
interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}
```

**优先级:** 🟢 P2

---

## 6. 工具函数 (lib/utils/)

### 6.1 formatCount
**文件:** `lib/utils/formatCount.ts`

```typescript
function formatCount(count: number): string
// 1234 -> "1.2k", 1234567 -> "1.2M"
```

---

### 6.2 formatRelativeTime
**文件:** `lib/utils/formatRelativeTime.ts`

```typescript
function formatRelativeTime(date: Date | string): string
// "2小时前", "3天前"
```

---

### 6.3 cn (className merge)
**文件:** `lib/utils/cn.ts`

```typescript
function cn(...classes: (string | boolean | undefined | null)[]): string
```

---

### 6.4 getGradientBg
**文件:** `lib/utils/getGradientBg.ts`

```typescript
function getGradientBg(index: number): string
// 返回渐变背景类名
```

---

## 7. 常量 (lib/constants/)

### 7.1 SOURCES
**文件:** `lib/constants/sources.ts`

```typescript
const SOURCES: Record<string, { label: string; icon?: string }> = {
  openai: { label: 'OpenAI' },
  google: { label: 'Google AI' },
  // ...
};
```

---

### 7.2 POPULAR_TAGS
**文件:** `lib/constants/tags.ts`

```typescript
const POPULAR_TAGS = [
  'LLM', 'GPT-4', 'AI绘画', 'Claude', '开源',
  '产品发布', '研究论文', '工具评测', '行业动态'
] as const;
```

---

### 7.3 TIME_PERIODS
**文件:** `lib/constants/time-periods.ts`

```typescript
const TIME_PERIODS = [
  { value: 'today', label: '今日' },
  { value: 'yesterday', label: '昨日' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
] as const;
```

---

### 7.4 SORT_OPTIONS
**文件:** `lib/constants/sort-options.ts`

```typescript
const SORT_OPTIONS = [
  { value: 'hot', label: '🔥 热度优先' },
  { value: 'newest', label: '🕐 最新发布' },
  { value: 'relevant', label: '📊 相关性' },
  { value: 'comments', label: '💬 评论最多' },
] as const;
```

---

### 7.5 CATEGORY_BADGES
**文件:** `lib/constants/category-badges.ts`

```typescript
const CATEGORY_BADGES: Record<ArticleCategory, CategoryBadgeConfig> = {
  hot: { emoji: '🔥', label: '热门', bgClass: 'bg-primary/10', textClass: 'text-primary' },
  deep: { emoji: '📰', label: '深度', bgClass: 'bg-secondary/10', textClass: 'text-secondary' },
  new: { emoji: '🆕', label: '新品', bgClass: 'bg-green-100', textClass: 'text-green-600' },
  breaking: { emoji: '⚡', label: '突发', bgClass: 'bg-orange-100', textClass: 'text-orange-600' },
};
```

---

## 8. 开发优先级

### P0 - 核心功能（第一批）
- [ ] `ui/Button`
- [ ] `ui/Card`
- [ ] `ui/Badge`
- [ ] `ui/Input`
- [ ] `ui/Select`
- [ ] `ui/Tag`
- [ ] `ui/Dropdown`
- [ ] `layout/Header`
- [ ] `layout/SearchBar`
- [ ] `filters/FilterPanel`
- [ ] `article/ArticleCard`
- [ ] `article/ArticleList`
- [ ] `hooks/useFilters`
- [ ] `hooks/useSearch`
- [ ] `hooks/useArticles`
- [ ] `app/page.tsx`

### P1 - 增强功能（第二批）
- [ ] `layout/FilterTags`
- [ ] `layout/ResultStats`
- [ ] `ui/Icon`
- [ ] `hooks/useDebounce`
- [ ] 视图切换功能
- [ ] URL 同步筛选状态

### P2 - 优化体验（第三批）
- [ ] `ui/Skeleton`
- [ ] `hooks/useToggle`
- [ ] 加载状态优化
- [ ] 错误边界
- [ ] 键盘导航增强

---

## 9. 组件依赖关系

```
HomePage
├── Header
│   ├── Logo
│   ├── SearchBar
│   │   └── SearchSuggestions (Dropdown)
│   └── HeaderActions
│       └── Button
├── FilterPanel
│   ├── TimeFilter (Select)
│   ├── SourceFilter (Select + Tag)
│   ├── SortFilter (Select)
│   ├── TagFilter (Tag)
│   └── Button (x2)
├── FilterTags
│   └── Tag (xN)
├── ResultStats
│   └── Button (x2)
└── ArticleList
    ├── ArticleCard (xN)
    │   ├── Card
    │   ├── Badge
    │   ├── Icon
    │   └── Tag (xN)
    ├── ArticleListEmpty
    └── ArticleListError
```

---

## 10. 开发顺序建议

1. **基础 UI 组件** (1-2天)
   - Button, Card, Badge, Input, Select, Tag, Dropdown

2. **工具函数和常量** (0.5天)
   - formatCount, formatRelativeTime, cn
   - SOURCES, POPULAR_TAGS, TIME_PERIODS, etc.

3. **布局组件** (1-2天)
   - Header, SearchBar, FilterPanel

4. **文章组件** (1天)
   - ArticleCard, ArticleList

5. **Hooks** (1天)
   - useFilters, useSearch, useArticles

6. **页面组装** (0.5天)
   - HomePage 集成

7. **联调测试** (0.5-1天)
   - 完整流程测试
   - 响应式测试

**预计总时间:** 5-7 天
