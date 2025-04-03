
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

type RoutineStep = {
  id: number;
  name: string;
  completed: boolean;
  time: string;
};

type RoutineCardProps = {
  title: string;
  steps: RoutineStep[];
  progress: number;
  time: 'morning' | 'night';
};

export const RoutineProgress: React.FC<RoutineCardProps> = ({
  title,
  steps,
  progress,
  time,
}) => {
  const backgroundClasses = time === 'morning' 
    ? 'from-skin-lime to-skin-green'
    : 'from-skin-blue to-skin-navy';

  return (
    <Card className="skin-card border-none overflow-hidden">
      <div className={`h-2 w-full bg-gradient-to-r ${backgroundClasses}`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-skin-darkBlue flex justify-between items-center">
          <span>{title}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-skin-lime/30 text-skin-darkBlue">
            {progress}% Complete
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {steps.map((step) => (
            <li 
              key={step.id}
              className={cn(
                "flex items-center justify-between p-2 rounded-lg transition-all",
                step.completed 
                  ? "bg-skin-lime/20" 
                  : "bg-transparent hover:bg-skin-lime/10"
              )}
            >
              <div className="flex items-center gap-2">
                {step.completed ? (
                  <CheckCircle2 size={16} className="text-skin-teal" />
                ) : (
                  <Circle size={16} className="text-skin-teal/40" />
                )}
                <span className={cn(
                  "text-sm",
                  step.completed ? "text-skin-darkBlue" : "text-muted-foreground"
                )}>
                  {step.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{step.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
