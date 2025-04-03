
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type Reminder = {
  id: number;
  title: string;
  time: string;
  type: 'skincare' | 'hydration' | 'diet';
};

export const UpcomingReminders: React.FC<{ reminders: Reminder[] }> = ({ reminders }) => {
  const navigate = useNavigate();
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'skincare': return 'bg-skin-teal';
      case 'hydration': return 'bg-skin-blue';
      case 'diet': return 'bg-skin-green';
      default: return 'bg-skin-teal';
    }
  };
  
  return (
    <Card className="skin-card border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-skin-darkBlue flex items-center gap-2">
          <Bell size={16} className="text-skin-blue" />
          Upcoming Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reminders.length > 0 ? (
          <ul className="space-y-2">
            {reminders.map((reminder) => (
              <li key={reminder.id} className="flex items-center justify-between p-2.5 rounded-lg bg-skin-lime/10">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-10 ${getTypeColor(reminder.type)} rounded-full`} />
                  <div>
                    <div className="text-sm font-medium text-skin-darkBlue">{reminder.title}</div>
                    <div className="text-xs text-muted-foreground">{reminder.time}</div>
                  </div>
                </div>
              </li>
            ))}
            <Button 
              variant="ghost" 
              className="w-full mt-2 text-skin-blue hover:text-skin-darkBlue hover:bg-skin-lime/10"
              onClick={() => navigate('/reminders')}
            >
              View All Reminders
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <Bell size={24} className="text-muted-foreground mb-2 opacity-40" />
            <p className="text-sm text-muted-foreground">No upcoming reminders</p>
            <Button 
              variant="link" 
              className="mt-1 text-skin-blue hover:text-skin-darkBlue"
              onClick={() => navigate('/reminders')}
            >
              Create Reminder
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
