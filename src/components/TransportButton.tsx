import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface TransportButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
}

export const TransportButton = forwardRef<HTMLButtonElement, TransportButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-11 h-11 text-lg',
      md: 'w-14 h-14 text-xl',
      lg: 'w-16 h-16 text-2xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          "retro-button rounded-lg flex items-center justify-center",
          "text-button-text font-bold",
          "focus:outline-none focus:ring-2 focus:ring-wood focus:ring-offset-2 focus:ring-offset-deck-body",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "select-none touch-manipulation",
          sizeClasses[size],
          variant === 'primary' && "bg-gradient-to-b from-amber-600 to-amber-700 text-amber-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TransportButton.displayName = 'TransportButton';
