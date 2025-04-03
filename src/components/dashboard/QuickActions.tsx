
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Calendar, Salad, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    { 
      title: "Take Photo", 
      icon: <Camera size={16} />, 
      bgColor: "from-skin-lime to-skin-green",
      onClick: () => navigate('/progress')
    },
    { 
      title: "Log Meal", 
      icon: <Salad size={16} />, 
      bgColor: "from-skin-teal to-skin-blue",
      onClick: () => navigate('/diet')
    },
    { 
      title: "Check Ingredients", 
      icon: <BookOpen size={16} />, 
      bgColor: "from-skin-blue to-skin-navy",
      onClick: () => navigate('/ingredients')
    },
    { 
      title: "Set Reminder", 
      icon: <Calendar size={16} />, 
      bgColor: "from-skin-lime to-skin-teal",
      onClick: () => navigate('/reminders')
    },
  ];
  
  return (
    <Card className="skin-card border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-skin-darkBlue">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto py-4 flex flex-col gap-2 bg-gradient-to-br ${action.bgColor} border-none text-white hover:shadow-md transition-all`}
              onClick={action.onClick}
            >
              <span className="bg-white/20 rounded-full p-2">{action.icon}</span>
              <span className="text-xs font-medium">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
