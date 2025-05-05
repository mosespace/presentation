import { cn } from '@/lib/utils';
import React from 'react';

export default function ButtonLoader({
  className = 'bg-white',
}: {
  className?: string;
}) {
  return (
    <div>
      <div className="btn_loader z-40">
        <div className={cn(className, 'dot dot-1')}></div>
        <div className={cn(className, 'dot dot-2')}></div>
        <div className={cn(className, 'dot dot-3')}></div>
      </div>
    </div>
  );
}
