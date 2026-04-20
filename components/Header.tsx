import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center">
              <span className="text-orange-500 text-2xl font-bold">B</span>
            </div>
            <div>
              <div className="text-navy-800 font-bold text-lg leading-tight">Baltimore Permits</div>
              <div className="text-orange-500 text-xs font-semibold">Permits. Plans. Approvals.</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-navy-800 hover:text-orange-500 font-medium transition-colors">Home</Link>
            <Link href="/projects" className="text-navy-800 hover:text-orange-500 font-medium transition-colors">Projects</Link>
            <Link href="/inspectors" className="text-navy-800 hover:text-orange-500 font-medium transition-colors">Inspectors</Link>
            <Link href="/inspections" className="text-navy-800 hover:text-orange-500 font-medium transition-colors">Inspections</Link>
          </nav>
          <Link href="/inspections" className="hidden md:inline-flex btn-primary text-sm">Schedule</Link>
        </div>
      </div>
    </header>
  );
}