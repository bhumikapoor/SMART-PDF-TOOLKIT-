import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { Runtime, Status } from '../../lib/tools';

interface Props {
  title: string;
  description?: string;
  icon?: LucideIcon;
  runtime?: Runtime;
  status?: Status;
  /** Header trailing slot — extra actions to the right of the title row. */
  headerExtra?: ReactNode;
  /** Upload area — usually a <FileDropzone />. */
  upload?: ReactNode;
  /** Options panel — settings/inputs for the tool. */
  options?: ReactNode;
  /** Preview area — usually a <PreviewViewer />. */
  preview?: ReactNode;
  /** Action footer — usually a <ProcessingPanel />. */
  action?: ReactNode;
  /** Result area — usually a <DownloadResult />. */
  result?: ReactNode;
  /** Fallback when none of the structured slots are passed. */
  children?: ReactNode;
  /** "stack" lays everything full-width; "split" puts upload/preview left and actions right. */
  layout?: 'stack' | 'split';
  /** Back-link target. Defaults to "/". */
  backTo?: string;
  className?: string;
}

export function ToolLayout({
  title,
  description,
  icon: Icon,
  headerExtra,
  upload,
  options,
  preview,
  action,
  result,
  children,
  layout = 'stack',
  backTo = '/',
  className,
}: Props) {
  const useStructured = upload !== undefined || options !== undefined || preview !== undefined || action !== undefined || result !== undefined;

  return (
    <div className={cn('max-w-[1800px] mx-auto', className)}>
      <Link to={backTo} className="btn-ghost text-xs mb-3 inline-flex">
        <ArrowLeft size={14} /> Back
      </Link>

      <header className="mb-6 flex items-start gap-4">
        {Icon && (
          <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white shadow-glow shrink-0">
            <Icon size={22} />
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
          </div>
          {description && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">{description}</p>
          )}
        </div>
        {headerExtra && <div className="shrink-0">{headerExtra}</div>}
      </header>

      {!useStructured && children}

      {useStructured && (
        <>
          {layout === 'split' ? (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] 2xl:grid-cols-[minmax(0,1fr)_440px]">
              <div className="min-w-0 space-y-6">
                {upload}
                {preview}
                {result}
              </div>
              <aside className="min-w-0 space-y-5 lg:sticky lg:top-6">
                {options}
                {action}
              </aside>
            </div>
          ) : (
            <div className="space-y-6">
              {upload}
              {preview}
              {options}
              {action}
              {result}
            </div>
          )}
        </>
      )}
    </div>
  );
}
