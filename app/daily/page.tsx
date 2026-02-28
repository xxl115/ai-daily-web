'use client';
import React, { useEffect, useState } from 'react';
import HotspotCard from '@/components/daily/HotspotCard';
import type { Hotspot } from '@/components/daily/HotspotCard';

export default function DailyPage() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/daily/latest')
      .then((res) => res.ok ? res.json() : Promise.reject('Failed to fetch'))
      .then((data) => {
        const items = data?.hotspots ?? data ?? [];
        setHotspots(Array.isArray(items) ? items : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">AI Daily - 今日热点</h1>
      {loading && <p className="text-gray-500">加载中…</p>}
      {error && <p className="text-red-600">错误: {error}</p>}
      {!loading && !error && hotspots.length === 0 && <p>暂无数据</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotspots.map((h, idx) => (
          <HotspotCard key={idx} hotspot={h} />
        ))}
      </div>
    </main>
  );
}
