# AI Daily - 设计规范

> 基于 `prototypes/search-filter/index.html` 原型文件梳理

---

## 1. 设计系统

### 1.1 色彩系统

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--ph-red` / `primary` | `#FF6154` | 主色调、CTA 按钮、高亮 |
| `--ph-dark` / `dark` | `#1A1A1A` | 主要文本、标题 |
| `--ph-gray` / `gray` | `#6B6B6B` | 次要文本、图标 |
| `--ph-light` / `light` | `#F5F5F5` | 页面背景 |
| `secondary` | `#42A5F5` | 辅助色、深度内容标记 |
| `border-gray-200` | `#E5E7EB` | 边框、分割线 |
| `bg-gray-100` | `#F3F4F6` | 输入框背景、未选中标签 |

### 分类徽章色彩

| 类型 | 背景色 | 文字色 |
|------|--------|--------|
| 🔥 热门 | `bg-primary/10` | `text-primary` |
| 📰 深度 | `bg-secondary/10` | `text-secondary` |
| 🆕 新品 | `bg-green-100` | `text-green-600` |
| ⚡ 突发 | `bg-orange-100` | `text-orange-600` |

### 1.2 排版

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
```

| 元素 | 大小 | 字重 |
|------|------|------|
| Logo 文字 | `text-xl` | font-bold |
| 标题 (h2) | `text-lg` | font-semibold |
| 正文 | `text-sm` | normal |
| 辅助文字 | `text-xs` | font-semibold / normal |

### 1.3 间距系统

| Token | 值 | 用途 |
|-------|-----|------|
| py-3 | 0.75rem | 输入框内边距 |
| py-2 | 0.5rem | 按钮、小元素内边距 |
| py-1.5 | 0.375rem | 标签内边距 |
| px-4 | 1rem | 容器水平内边距 |
| py-6 | 1.5rem | 面板内边距 |
| gap-2 | 0.5rem | 小元素间距 |
| gap-3 | 0.75rem | 中等元素间距 |
| gap-4 | 1rem | 大元素间距 |

### 1.4 圆角

| 值 | 用途 |
|-----|------|
| `rounded-lg` | 0.5rem | 按钮、输入框 |
| `rounded-xl` | 0.75rem | 下拉框、卡片内部 |
| `rounded-2xl` | 1rem | 文章卡片外层 |
| `rounded-full` | 9999px | 徽章、标签、计数器 |

### 1.5 阴影

```css
/* 卡片悬停 */
box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

/* 下拉框 */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
```

---

## 2. 组件规范

### 2.1 顶部导航栏

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  [───────────── Search Box ─────────────]  [筛选][GitHub] │
│  当前筛选: [标签1] [标签2] ...                              │
└─────────────────────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 背景 | `bg-white` |
| 边框 | `border-b border-gray-200` |
| 定位 | `sticky top-0 z-50` |
| 最大宽度 | `max-w-6xl mx-auto` |
| 内边距 | `px-4 py-4` |

**Logo**
```tsx
<div class="flex items-center gap-2">
  <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
    <span class="text-white font-bold text-sm">AI</span>
  </div>
  <span class="text-xl font-bold text-dark">AI Daily</span>
</div>
```

**搜索框**
```tsx
<input
  className="w-full pl-12 pr-24 py-3 bg-gray-100 border-2 border-transparent rounded-xl
             focus:border-primary focus:bg-white focus:outline-none transition-all duration-200
             text-dark placeholder-gray-400"
  placeholder="搜索 AI 新闻、产品、工具..."
/>
```

**高级筛选按钮**
```tsx
<button class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary
               transition-colors flex items-center gap-2">
  <svg><!-- 图标 --></svg>
  <span class="hidden sm:inline">高级筛选</span>
  <span class="hidden bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
</button>
```

**GitHub 按钮**
```tsx
<a class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-600
           transition-colors text-sm font-medium inline-flex items-center gap-2">
```

### 2.2 筛选面板

```
┌────────────────────────────────────────────────────────────┐
│  [时间范围]  [来源]  [排序]  [操作]                        │
│  ──────────────────────────────────────────────────────── │
│  热门标签: [LLM] [GPT-4] [AI绘画] ...                      │
└────────────────────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 背景 | `bg-white` |
| 边框 | `border-b border-gray-200` |
| 动画 | 展开时 `max-height: 500px`, 收起时 `0` |
| 过渡 | `all 0.3s ease-out` |
| 布局 | `grid grid-cols-1 md:grid-cols-4` |

**面板标题**
```tsx
<h3 class="text-sm font-semibold text-dark mb-3 flex items-center gap-2">
  <svg class="w-4 h-4 text-primary"><!-- 图标 --></svg>
  标题文字
</h3>
```

**Radio 选项**
```tsx
<label class="flex items-center gap-2 cursor-pointer">
  <input type="radio" name="timeFilter" value="today" class="accent-primary" />
  <span class="text-sm text-gray-700">今日</span>
</label>
```

**Select 下拉**
```tsx
<select class="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg
              text-sm focus:outline-none focus:border-primary cursor-pointer">
```

**操作按钮**
```tsx
<!-- 主按钮 -->
<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-600
               transition-colors text-sm font-medium">

<!-- 次按钮 -->
<button class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg
               hover:bg-gray-200 transition-colors text-sm font-medium">
```

### 2.3 文章卡片

```
┌────────────────────────────────────────────────────────────┐
│  [图标区域 32x24]  内容区域                                │
│                    ┌──────────────────────────────────┐   │
│                    │ [徽章] 来源 • 时间               │   │
│                    │ 标题文字                        │   │
│                    │ 摘要文字两行...                 │   │
│                    │ 👁 2.3k  💬 128  [标签][标签]   │   │
│                    └──────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

| 属性 | 值 |
|------|-----|
| 背景 | `bg-white` |
| 圆角 | `rounded-2xl` |
| 内边距 | `p-6` |
| 边框 | `border border-gray-100 hover:border-primary/30` |
| 悬停效果 | `translateY(-2px)` + `box-shadow` |

**卡片结构**
```tsx
<article class="article-card bg-white rounded-2xl p-6 border border-gray-100
                      hover:border-primary/30 cursor-pointer">
  <div class="flex gap-4">
    {/* 左侧图标区域 */}
    <div class="w-32 h-24 bg-gradient-to-br from-primary/10 to-secondary/10
                  rounded-xl flex items-center justify-center flex-shrink-0">
      <svg class="w-12 h-12 text-primary/50"><!-- 图标 --></svg>
    </div>

    {/* 右侧内容 */}
    <div class="flex-1 min-w-0">
      {/* 元信息行 */}
      <div class="flex items-center gap-2 mb-2">
        <span class="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">🔥 热门</span>
        <span class="text-xs text-gray-500">OpenAI</span>
        <span class="text-xs text-gray-400">•</span>
        <span class="text-xs text-gray-500">2小时前</span>
      </div>

      {/* 标题 */}
      <h2 class="text-lg font-semibold text-dark mb-2 line-clamp-1
                    hover:text-primary transition-colors">
        标题文字
      </h2>

      {/* 摘要 */}
      <p class="text-sm text-gray-500 line-clamp-2 mb-3">
        摘要内容...
      </p>

      {/* 底部信息 */}
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-1 text-sm text-gray-500">
          👁 2.3k
        </span>
        <span class="flex items-center gap-1 text-sm text-gray-500">
          💬 128
        </span>
        <div class="flex gap-1 ml-auto">
          <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">标签</span>
        </div>
      </div>
    </div>
  </div>
</article>
```

### 2.4 标签组件

**筛选标签**
```tsx
<button class="filter-tag px-3 py-1.5 bg-gray-100 text-gray-700
                         rounded-full text-sm hover:bg-primary hover:text-white
                         transition-colors cursor-pointer">
  标签文字
</button>
```

**已选中状态**
```tsx
<button class="px-3 py-1.5 bg-primary text-white rounded-full text-sm
                       hover:bg-red-600 transition-colors cursor-pointer">
```

**小型标签**
```tsx
<span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
```

### 2.5 搜索建议下拉框

```tsx
<div class="dropdown-menu absolute top-full left-0 right-0 mt-2
              bg-white rounded-xl shadow-xl border border-gray-100
              overflow-hidden z-50">
  <!-- 建议项 -->
  <button class="w-full px-4 py-2 text-left hover:bg-gray-50
                 flex items-center gap-3">
    <span>🔥</span>
    <span class="text-dark">建议文字</span>
  </button>
</div>
```

---

## 3. 动画规范

### 3.1 过渡时长

| 类型 | 时长 | 缓动 |
|------|------|------|
| 下拉菜单 | 0.2s | ease-out |
| 筛选面板 | 0.3s | ease-out |
| 卡片悬停 | 0.2s | ease |
| 标签悬停 | 0.2s | ease |
| 输入框聚焦 | 0.2s | (duration-200) |

### 3.2 关键动画

**下拉菜单显示**
```css
.dropdown-menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}
.dropdown-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

**筛选面板展开**
```css
.filter-panel-enter {
  max-height: 0;
  opacity: 0;
}
.filter-panel-enter-active {
  max-height: 500px;
  opacity: 1;
  transition: all 0.3s ease-out;
}
```

**卡片悬停**
```css
.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
```

**标签悬停**
```css
.filter-tag:hover {
  transform: scale(1.05);
}
```

---

## 4. 数据类型

```typescript
// ==================== 文章相关 ====================

type ArticleCategory = 'hot' | 'deep' | 'new' | 'breaking';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  source: ArticleSource;
  publishedAt: string;
  viewCount: number;
  commentCount: number;
  tags: string[];
  thumbnail?: string;
  url?: string;
}

type ArticleSource =
  | 'openai'
  | 'google'
  | 'anthropic'
  | 'mit'
  | 'wired'
  | 'verge'
  | 'techcrunch'
  | 'product-hunt'
  | string;

// ==================== 筛选相关 ====================

type TimeFilter = 'today' | 'yesterday' | 'week' | 'month';

type SortOption = 'hot' | 'newest' | 'relevant' | 'comments';

interface FilterState {
  keyword?: string;
  timeRange: TimeFilter;
  sources: ArticleSource[];
  tags: string[];
  sortBy: SortOption;
}

// ==================== 搜索建议 ====================

interface SearchSuggestion {
  text: string;
  icon: string;
}

interface SearchSuggestions {
  trending: SearchSuggestion[];
  recent: SearchSuggestion[];
}

// ==================== 热门标签 ====================

const POPULAR_TAGS = [
  'LLM', 'GPT-4', 'AI绘画', 'Claude', '开源',
  '产品发布', '研究论文', '工具评测', '行业动态'
] as const;

// ==================== 来源配置 ====================

const SOURCE_OPTIONS: Record<string, { label: string; icon?: string }> = {
  openai: { label: 'OpenAI' },
  google: { label: 'Google AI' },
  anthropic: { label: 'Anthropic' },
  mit: { label: 'MIT Tech Review' },
  wired: { label: 'Wired' },
  verge: { label: 'The Verge' },
};

// ==================== 分类徽章 ====================

const CATEGORY_BADGE: Record<ArticleCategory, { emoji: string; label: string; bgClass: string; textClass: string }> = {
  hot: { emoji: '🔥', label: '热门', bgClass: 'bg-primary/10', textClass: 'text-primary' },
  deep: { emoji: '📰', label: '深度', bgClass: 'bg-secondary/10', textClass: 'text-secondary' },
  new: { emoji: '🆕', label: '新品', bgClass: 'bg-green-100', textClass: 'text-green-600' },
  breaking: { emoji: '⚡', label: '突发', bgClass: 'bg-orange-100', textClass: 'text-orange-600' },
};
```

---

## 5. 交互行为

### 5.1 搜索框

| 事件 | 行为 |
|------|------|
| `focus` | 显示建议下拉框（热门+最近） |
| `blur` | 200ms 延迟后隐藏下拉框 |
| `input` | 有内容时显示智能建议，无内容显示默认建议 |
| `Enter` | 执行搜索，隐藏下拉框 |
| 点击建议项 | 填充搜索框并执行搜索 |

### 5.2 筛选面板

| 事件 | 行为 |
|------|------|
| 点击"高级筛选"按钮 | 切换面板展开/收起状态 |
| 点击"应用筛选" | 执行筛选，更新结果列表，收起面板 |
| 点击"清除全部" | 重置所有筛选条件，更新结果 |
| 点击标签 | 切换选中状态（不自动触发筛选） |
| 点击来源 Pill | 切换选中状态 |

### 5.3 文章卡片

| 事件 | 行为 |
|------|------|
| `hover` | 上浮 2px + 阴影效果 + 边框高亮 |
| `click` | 跳转到文章详情页 |
| 标题 hover | 文字变为主题色 |

### 5.4 视图切换

| 当前视图 | 行为 |
|----------|------|
| 列表视图 | 按钮显示主色背景 |
| 网格视图 | 按钮显示灰色背景 |

---

## 6. 布局规范

### 6.1 容器

```tsx
<div class="max-w-6xl mx-auto px-4">
  {/* 内容 */}
</div>
```

### 6.2 主内容区

```tsx
<main class="max-w-6xl mx-auto px-4 py-8">
  {/* 内容 */}
</main>
```

### 6.3 响应式断点

| 断点 | 值 | 用途 |
|------|-----|------|
| `sm` | 640px | 隐藏/显示部分文字 |
| `md` | 768px | 筛选面板 4 列布局 |
| `lg` | 1024px | - |

---

## 7. 图标尺寸

| 用途 | 尺寸 |
|------|------|
| Logo 内部 | `text-sm` |
| 搜索框图标 | `w-5 h-5` |
| 按钮图标 | `w-4 h-4` / `w-5 h-5` |
| 面板标题图标 | `w-4 h-4` |
| 卡片内图标 | `w-4 h-4` |
| 卡片缩略图图标 | `w-12 h-12` |

---

## 8. 工具函数

```typescript
// 格式化数字显示
function formatCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
}

// 格式化相对时间
function formatRelativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
  return `${Math.floor(seconds / 86400)}天前`;
}

// 生成渐变背景类
function getGradientBg(index: number): string {
  const gradients = [
    'from-primary/10 to-secondary/10',
    'from-secondary/10 to-primary/10',
    'from-green-100 to-blue-100',
    'from-orange-100 to-red-100',
  ];
  return gradients[index % gradients.length];
}
```

---

## 9. Tailwind 配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FF6154',
        secondary: '#42A5F5',
        dark: '#1A1A1A',
        gray: '#6B6B6B',
        light: '#F5F5F5',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      },
    },
  },
};
```
