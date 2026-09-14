import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Tool } from '../../lib/tools';
import { cn } from '../../lib/cn';

const ACCENT: Record<Tool['category'], string> = {
  dashboard: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',
  image: 'bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-200',
  organize: 'bg-red-100 text-red-600 dark:bg-red-400/15 dark:text-red-200',
  optimize: 'bg-green-100 text-green-700 dark:bg-green-400/15 dark:text-green-200',
  'convert-to': 'bg-orange-100 text-orange-700 dark:bg-orange-400/15 dark:text-orange-200',
  'convert-from': 'bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-200',
  edit: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-400/15 dark:text-fuchsia-200',
  security: 'bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-200',
  intelligence: 'bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-200',
  settings: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',
};

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      to={tool.route}
      className={cn(
        'group relative block min-h-[224px] overflow-hidden rounded-2xl p-6 transition duration-300',
        'border border-slate-200/80 bg-white/90 shadow-[0_12px_34px_-28px_rgba(15,23,42,0.52)] backdrop-blur-xl',
        'dark:border-white/10 dark:bg-white/[0.055] dark:shadow-soft-dark',
        'hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_20px_45px_-28px_rgba(15,23,42,0.55)]',
        'dark:hover:border-blue-300/30 dark:hover:bg-white/[0.08]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60',
      )}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-blue-300/50" />
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className={cn('grid h-11 w-11 place-items-center rounded-xl transition duration-300 group-hover:scale-105', ACCENT[tool.category])}>
            <Icon size={20} />
          </span>
          <ArrowUpRight size={17} className="mt-1 text-slate-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#163a70] dark:text-slate-600 dark:group-hover:text-blue-200" />
        </div>
        <div className="mt-auto min-w-0 pt-8">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">{tool.category.replace('-', ' ')}</div>
          <div className="flex items-center gap-2">
            <h3 className="truncate text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{tool.name}</h3>
          </div>
          <p className="mt-2 max-w-[18rem] text-sm leading-6 text-slate-500 dark:text-slate-400">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
