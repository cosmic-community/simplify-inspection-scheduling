import { getMetafieldValue } from '@/types';

export default function PriorityBadge({ priority }: { priority: unknown }) {
  const value = getMetafieldValue(priority);
  const getColor = () => {
    const p = value.toLowerCase();
    if (p.includes('urgent') || p.includes('high')) return 'bg-red-500 text-white';
    if (p.includes('medium') || p.includes('normal')) return 'bg-orange-500 text-white';
    if (p.includes('low')) return 'bg-green-500 text-white';
    return 'bg-gray-500 text-white';
  };

  if (!value) return null;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide ${getColor()}`}>
      {value}
    </span>
  );
}