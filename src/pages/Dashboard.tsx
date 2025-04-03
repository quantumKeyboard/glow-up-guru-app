
import React, { useState } from 'react';
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [hydrationLevel, setHydrationLevel] = useState(3);
  
  const morningRoutine = [
    { id: 1, name: 'Gentle Cleanser', completed: true, time: '7:30 AM' },
    { id: 2, name: 'Vitamin C Serum', completed: true, time: '7:35 AM' },
    { id: 3, name: 'Moisturizer', completed: false, time: '7:40 AM' },
    { id: 4, name: 'Sunscreen', completed: false, time: '7:45 AM' },
  ];
  
  const nightRoutine = [
    { id: 1, name: 'Oil Cleanser', completed: false, time: '9:30 PM' },
    { id: 2, name: 'Water Cleanser', completed: false, time: '9:35 PM' },
    { id: 3, name: 'Exfoliate', completed: false, time: '9:40 PM' },
    { id: 4, name: 'Night Cream', completed: false, time: '9:45 PM' },
  ];
  
  const reminders = [
    { id: 1, title: 'Apply Sunscreen', time: 'Today, 12:30 PM', type: 'skincare' },
    { id: 2, title: 'Drink Water', time: 'Today, 2:00 PM', type: 'hydration' },
    { id: 3, title: 'Evening Routine', time: 'Today, 9:00 PM', type: 'skincare' },
  ];
  
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
            steps={morningRoutine} 
            progress={50} 
            time="morning" 
          />
          <RoutineProgress 
            title="Night Routine" 
            steps={nightRoutine} 
            progress={0} 
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
          current={hydrationLevel} 
          target={8}
          onIncrement={() => setHydrationLevel(prev => Math.min(prev + 1, 10))}
          onDecrement={() => setHydrationLevel(prev => Math.max(prev - 1, 0))}
        />
        
        <UpcomingReminders reminders={reminders} />
      </div>
    </div>
  );
};

export default Dashboard;
