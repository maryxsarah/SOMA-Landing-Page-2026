import { cn } from '@/lib/cn';

/** 80px side padding at xl, fluid content; past 1920 the `.ld` zoom scales it. */
export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('mx-auto w-full max-w-[1920px] px-4 md:px-16 xl:px-20', className)}>
    {children}
  </div>
);
