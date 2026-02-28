import React from 'react';

export type Hotspot = {
  title: string;
  url: string;
  source: string;
  source_id?: string;
  timestamp?: string;
  hot_score?: number;
};

const HotspotCard: React.FC<{ hotspot: Hotspot }> = ({ hotspot }) => {
  const { title, url, source, timestamp, hot_score } = hotspot;
  return (
    <article className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md">
      <a href={url} target="_blank" rel="noreferrer" className="text-lg font-semibold hover:underline">
        {title}
      </a>
      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
        <span className="px-2 py-1 rounded bg-gray-100 text-xs">{source}</span>
        {timestamp && (
          <span className="whitespace-nowrap">{new Date(timestamp).toLocaleString?.() ?? timestamp}</span>
        )}
        {typeof hot_score === 'number' && (
          <span className="ml-auto text-sm text-yellow-600">🔥{hot_score}</span>
        )}
      </div>
    </article>
  );
};

export default HotspotCard;
