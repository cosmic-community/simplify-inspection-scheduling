import { getMetafieldValue } from '@/types';

export default function StatusBadge({ status }: { status: unknown }) {
  const statusValue = getMetafieldValue(status);
  const getColor = () => {
    const s = statusValue.toLowerCase();
    if (s.includes('complet') || s.includes('pass') || s.includes('approv')) return 'bg-green-100 text-green-800 border-green-200';
    if (s.includes('progress') || s.includes('schedul')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (s.includes('pending') || s.includes('plan')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (s.includes('fail') || s.includes('reject') || s.includes('delay')) return 'bg-red-100 text-red-800 border-red-200';
    if (s.includes('hold') || s.includes('cancel')) return 'bg-gray-100 text-gray-800 border-gray-200';
    return 'bg-navy-100 text-navy-800 border-navy-200';
  };

  if (!statusValue) return null;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getColor()}`}>
      {statusValue}
    </span>
  );
}