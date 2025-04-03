
import React from 'react';
import { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

const Circle = React.forwardRef<SVGSVGElement, LucideProps>(
  ({ color = 'currentColor', size = 24, strokeWidth = 2, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn('lucide lucide-circle', className)}
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
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }
);

Circle.displayName = 'Circle';

export { Circle };
