
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

type TipProps = {
  title: string;
  description: string;
};

export const TodayTip: React.FC<TipProps> = ({ title, description }) => {
  return (
    <Card className="skin-card border-none">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-skin-lime flex-shrink-0">
            <Lightbulb size={16} className="text-skin-darkBlue" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-skin-darkBlue mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
