
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HydrationTrackerProps = {
  current: number;
  target: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const HydrationTracker: React.FC<HydrationTrackerProps> = ({
  current,
  target,
  onIncrement,
  onDecrement,
}) => {
  const progress = Math.min(100, (current / target) * 100);
  
  return (
    <Card className="skin-card h-full border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-skin-darkBlue flex items-center gap-2">
          <Droplet size={16} className="text-skin-blue" />
          Hydration Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between">
        <div className="relative w-full flex items-center justify-center mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold text-skin-blue">{current}</span>
              <span className="text-xs text-muted-foreground block">of {target} glasses</span>
            </div>
          </div>
          <svg className="w-32 h-32 transform -rotate-90">
            <circle 
              cx="64" 
              cy="64" 
              r="56" 
              fill="none" 
              stroke="#e6e6e6" 
              strokeWidth="8"
              className="opacity-25"
            />
            <circle 
              cx="64" 
              cy="64" 
              r="56" 
              fill="none" 
              stroke="url(#hydrationGradient)" 
              strokeWidth="8"
              strokeDasharray="352"
              strokeDashoffset={352 - (352 * progress) / 100}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="hydrationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34A0A4" />
                <stop offset="100%" stopColor="#168AAD" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="flex gap-2 w-full mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-skin-lightGreen/30"
            onClick={onDecrement}
          >
            <Minus size={14} className="mr-1" /> Remove
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-skin-teal to-skin-blue border-none"
            onClick={onIncrement}
          >
            <Plus size={14} className="mr-1" /> Add Glass
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
