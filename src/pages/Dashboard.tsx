
import React from 'react';
import { RoutineProgress } from '@/components/dashboard/RoutineProgress';
import { HydrationTracker } from '@/components/dashboard/HydrationTracker';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { DietSummary } from '@/components/dashboard/DietSummary';
import { UpcomingReminders } from '@/components/dashboard/UpcomingReminders';
import { TodayTip } from '@/components/dashboard/TodayTip';
import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, updateHydrationLevel, toggleRoutineItem } = useAppContext();
  
  // Format reminders for display
  const todayReminders = state.reminders.slice(0, 3).map(reminder => ({
    id: reminder.id,
    title: reminder.title,
    time: `Today, ${reminder.time}`,
    type: reminder.type
  }));
  
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="relative overflow-hidden rounded-2xl h-40 bg-gradient-to-r from-skin-lime to-skin-teal mb-6">
          <div className="absolute top-0 right-0 h-full w-1/2 bg-white/10 backdrop-blur-sm rounded-l-full transform translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 h-1/2 w-1/4 bg-white/10 backdrop-blur-sm rounded-tr-full"></div>
          <div className="absolute p-6 z-10">
            <h2 className="text-white text-2xl font-bold mb-2">
              SkinDoctors Ki Maa Kaa Bharosaa
            </h2>
            <p className="text-white/90 max-w-md">
              Your personalized skincare journey starts here. Track routines, monitor progress, and achieve healthy skin.
            </p>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RoutineProgress 
            title="Morning Routine" 
            steps={state.morningRoutine} 
            progress={Math.round((state.morningRoutine.filter(item => item.completed).length / state.morningRoutine.length) * 100)} 
            time="morning" 
          />
          <RoutineProgress 
            title="Night Routine" 
            steps={state.nightRoutine} 
            progress={Math.round((state.nightRoutine.filter(item => item.completed).length / state.nightRoutine.length) * 100)} 
            time="night" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickActions />
          <DietSummary />
        </div>
        
        <TodayTip 
          title="Avoid Touching Your Face" 
          description="Hands carry bacteria that can cause breakouts. Try to be mindful and reduce face touching throughout the day." 
        />
      </div>
      
      <div className="col-span-12 md:col-span-4 space-y-6">
        <Card className="overflow-hidden skin-card border-none">
          <div className="bg-gradient-to-r from-skin-teal to-skin-blue p-4 text-white">
            <h3 className="font-medium">Weekly Progress</h3>
          </div>
          <CardContent className="pt-4 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 bg-skin-lime/20 rounded-full mb-4 flex items-center justify-center">
              <Camera size={32} className="text-skin-teal" />
            </div>
            <p className="text-sm text-muted-foreground text-center mb-2">
              Track your skin's progress with weekly photos
            </p>
            <Button 
              className="bg-gradient-to-r from-skin-teal to-skin-blue hover:from-skin-darkTeal hover:to-skin-darkBlue border-none text-white"
              onClick={() => navigate('/progress')}
            >
              Take This Week's Photo
            </Button>
          </CardContent>
        </Card>
        
        <HydrationTracker 
          current={state.hydrationLevel} 
          target={8}
          onIncrement={() => updateHydrationLevel(Math.min(state.hydrationLevel + 1, 10))}
          onDecrement={() => updateHydrationLevel(Math.max(state.hydrationLevel - 1, 0))}
        />
        
        <UpcomingReminders reminders={todayReminders} />
      </div>
    </div>
  );
};

export default Dashboard;
