import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Clock, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToolCard } from '../components/dashboard/ToolCard';
import { TOOLS, type CategoryId } from '../lib/tools';
import { readRecentFiles, subscribeRecentFiles, type RecentFile } from '../lib/recentFiles';
import { humanSize } from '../lib/fileUtils';
import { EmptyState } from '../components/shared';
import { cn } from '../lib/cn';
import { WobbleCard } from '../components/ui/WobbleCard';
import { ImagesSlider } from '../components/ui/ImagesSlider';

type FilterId = 'all' | 'workflows' | CategoryId;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'organize', label: 'Organize PDF' },
  { id: 'optimize', label: 'Optimize PDF' },
  { id: 'convert-to', label: 'Convert PDF' },
  { id: 'edit', label: 'Edit PDF' },
  { id: 'security', label: 'PDF Security' },
  { id: 'intelligence', label: 'PDF Intelligence' },
];

const WORKFLOW_IDS = [
  'merge-pdf',
  'split-pdf',
  'compress-pdf',
  'pdf-to-word',
  'pdf-to-ppt',
  'word-to-pdf',
  'ppt-to-pdf',
  'excel-to-pdf',
  'edit-pdf',
  'protect-pdf',
  'ocr-pdf',
  'ai-summarize',
];

const FEATURE_IMAGES = [
  'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1814&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=1814&auto=format&fit=crop',
];

export default function Dashboard() {
  const [active, setActive] = useState<FilterId>('all');
  const [recents, setRecents] = useState<RecentFile[]>(() => readRecentFiles());

  useEffect(() => subscribeRecentFiles(() => setRecents(readRecentFiles())), []);

  const tools = useMemo(() => {
    if (active === 'all') return TOOLS.filter((tool) => tool.category !== 'image');
    if (active === 'workflows') {
      return WORKFLOW_IDS.map((id) => TOOLS.find((tool) => tool.id === id)).filter((tool): tool is (typeof TOOLS)[number] => Boolean(tool));
    }
    if (active === 'convert-to') {
      return TOOLS.filter((tool) => tool.category === 'convert-to' || tool.category === 'convert-from');
    }
    return TOOLS.filter((tool) => tool.category === active);
  }, [active]);

  return (
    <div className="mx-auto max-w-[1500px] space-y-8">
      <WobbleCard containerClassName="wobble-card-enter min-h-[330px] border border-blue-300/30 shadow-[0_28px_80px_-36px_rgba(8,27,66,0.78)]">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(191,219,254,0.4)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="relative flex min-h-[330px] flex-col justify-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="max-w-3xl">
            <div data-hero-step style={{ '--hero-delay': '100ms' } as CSSProperties} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 shadow-sm backdrop-blur-md">
              <Sparkles size={14} className="text-blue-200" /> Ultra PDF Toolkit
            </div>
            <h1 data-hero-step style={{ '--hero-delay': '180ms' } as CSSProperties} className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Hi Prabh Mannat, let's get started
            </h1>
            <p data-hero-step style={{ '--hero-delay': '260ms' } as CSSProperties} className="mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Pick a tool, search by operation, or open a recent file. Everything is tuned for fast local PDF work.
            </p>
          </div>

          <div data-hero-step style={{ '--hero-delay': '340ms' } as CSSProperties} className="mt-8 flex max-w-4xl flex-wrap gap-2.5">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-bold transition duration-300 sm:px-5 sm:text-base',
                  active === filter.id
                    ? 'border-white bg-white text-[#0b1f4a] shadow-[0_12px_28px_-14px_rgba(0,0,0,0.75)]'
                    : 'border-white/20 bg-white/10 text-blue-50 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20',
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute -right-6 bottom-4 hidden w-52 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl lg:block wobble-card-float">
          <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100">
            <span>Quick tools</span><span className="h-2 w-2 rounded-full bg-emerald-300" />
          </div>
          <div className="space-y-2">
            {['Merge PDF', 'Compress', 'OCR Scan'].map((tool, index) => (
              <div key={tool} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white" style={{ transform: `translateX(${index * -7}px)` }}>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-200" /> {tool}
              </div>
            ))}
          </div>
        </div>
      </WobbleCard>

      <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {FILTERS.find((item) => item.id === active)?.label || 'Tools'}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tools.length} tools available</p>
            </div>
            <Link
              to="/tools/merge-pdf"
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.055] dark:text-slate-200 dark:hover:bg-white/[0.09] sm:inline-flex"
            >
              Start with Merge PDF
            </Link>
          </div>

          {tools.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {active === 'all' && (
                <ImagesSlider images={FEATURE_IMAGES} className="min-h-[224px] sm:col-span-2">
                  <div className="flex h-full max-w-md flex-col justify-center px-6 py-8 sm:px-8">
                    <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200">Simple. Local. Private.</div>
                    <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Your everyday PDF workspace.</h3>
                    <p className="mt-3 text-sm leading-6 text-blue-100">Start with the essentials, then keep every conversion and edit flowing in one place.</p>
                    <Link to="/tools/merge-pdf" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                      Start with Merge PDF <ArrowRight size={15} />
                    </Link>
                  </div>
                </ImagesSlider>
              )}
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <EmptyState icon={Search} title="No tools found" description="Choose another filter or use quick search." />
          )}
        </div>

        <aside className="space-y-4">
          <section className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">Recent files</h2>
              <Clock size={15} className="text-slate-400" />
            </div>
            {recents.length ? (
              <ul className="mt-3 space-y-1">
                {recents.slice(0, 6).map((file) => (
                  <li key={file.id}>
                    <Link
                      to={file.route || '/'}
                      className="block rounded-lg px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                    >
                      <span className="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{file.name}</span>
                      <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                        {humanSize(file.size)} {file.toolName ? `- ${file.toolName}` : ''}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={Clock}
                title="No recent files"
                description="Your local history appears after dropping a file into any tool."
                className="mt-3 py-7"
              />
            )}
          </section>

          <section className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]">
            <h2 className="text-sm font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">Fast operations</h2>
            <div className="mt-3 grid gap-2">
              {['merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-word'].map((id) => {
                const tool = TOOLS.find((item) => item.id === id);
                if (!tool) return null;
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    to={tool.route}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/[0.06]"
                  >
                    <Icon size={17} className="text-red-500" />
                    {tool.name}
                  </Link>
                );
              })}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
