import { type CSSProperties, type PointerEvent, type ReactNode, useState } from 'react';
import { cn } from '../../lib/cn';

type WobbleCardProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function WobbleCard({ children, className, containerClassName }: WobbleCardProps) {
  const [position, setPosition] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setPosition({
      x,
      y,
      rotateX: (y - 50) / -14,
      rotateY: (x - 50) / 14,
    });
  }

  function resetPosition(): void {
    setPosition({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  }

  const lightStyle = {
    background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(147, 197, 253, 0.24), transparent 32%)`,
  } as CSSProperties;

  return (
    <div
      className={cn('group relative overflow-hidden rounded-[1.75rem] [perspective:1100px]', containerClassName)}
      onPointerLeave={resetPosition}
      onPointerMove={handlePointerMove}
    >
      <div
        className="relative h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transform-none"
        style={{ transform: `rotateX(${position.rotateX}deg) rotateY(${position.rotateY}deg)` }}
      >
        <div className="absolute inset-0 bg-[#081b42]" />
        <div className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" style={lightStyle} />
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
        <div className="absolute -bottom-32 left-[28%] h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.11),transparent_24%,transparent_72%,rgba(96,165,250,0.15))]" />
        <div className={cn('relative h-full', className)}>{children}</div>
      </div>
    </div>
  );
}
