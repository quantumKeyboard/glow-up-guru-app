
import React from 'react';
import { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

const X = React.forwardRef<SVGSVGElement, LucideProps>(
  ({ color = 'currentColor', size = 24, strokeWidth = 2, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn('lucide lucide-x', className)}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    );
  }
);

X.displayName = 'X';

export { X };
