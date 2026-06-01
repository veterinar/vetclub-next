import { cn } from '@/lib/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-[#2e7d32]',
        {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md',
          'h-8 w-8': size === 'lg',
        },
        className
      )}
    />
  );
}
