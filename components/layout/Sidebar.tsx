'use client';

interface SidebarProps {
  topics?: { id: string; name: string; count: number }[];
  stats?: {
    total: number;
    hot: number;
    sources: number;
  };
}

export function Sidebar({ topics, stats }: SidebarProps) {
  const defaultTopics = [
    { id: '1', name: 'AI 助手', count: 156 },
    { id: '2', name: '图像生成', count: 98 },
    { id: '3', name: '代码助手', count: 87 },
    { id: '4', name: '视频工具', count: 65 },
    { id: '5', name: '语音合成', count: 43 },
  ];

  const displayTopics = topics || defaultTopics;

  return (
    <aside className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="bg-white rounded-[12px] p-5 border border-[#e0e0e0]">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#21293C]">{stats.total}</div>
              <div className="text-xs text-[#718096]">总产品</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF6154]">{stats.hot}</div>
              <div className="text-xs text-[#718096]">热门</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#21293C]">{stats.sources}</div>
              <div className="text-xs text-[#718096]">来源</div>
            </div>
          </div>
        </div>
      )}

      {/* Topics Section */}
      <div className="bg-white rounded-[12px] p-5 border border-[#e0e0e0]">
        <h3 className="font-semibold text-[#21293C] mb-4">今日话题</h3>
        <div className="space-y-3">
          {displayTopics.map((topic, index) => (
            <a
              key={topic.id}
              href={`/topic/${topic.id}`}
              className="flex items-center justify-between py-2 hover:bg-[#F5F5F5] rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#718096] w-5">
                  {index + 1}
                </span>
                <span className="text-[14px] text-[#21293C]">
                  {topic.name}
                </span>
              </div>
              <span className="text-xs text-[#718096] bg-[#F5F5F5] px-2 py-1 rounded-full">
                {topic.count}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-[#718096]">
          数据每小时更新 · 基于公开信息整理
        </p>
      </div>
    </aside>
  );
}
