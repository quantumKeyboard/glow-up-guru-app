
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, CheckCircle, Circle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RoutineTracker = () => {
  return (
    <div>
      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="bg-skin-lime/20 p-1">
          <TabsTrigger value="morning" className="data-[state=active]:bg-white">Morning Routine</TabsTrigger>
          <TabsTrigger value="night" className="data-[state=active]:bg-white">Night Routine</TabsTrigger>
          <TabsTrigger value="weekly" className="data-[state=active]:bg-white">Weekly Treatments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="morning" className="mt-4">
          <Card className="skin-card border-none mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                <CalendarClock size={18} className="text-skin-teal" />
                Morning Routine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <RoutineItem 
                  name="Gentle Cleanser" 
                  time="7:30 AM" 
                  completed={true} 
                />
                <RoutineItem 
                  name="Vitamin C Serum" 
                  time="7:35 AM" 
                  completed={true} 
                />
                <RoutineItem 
                  name="Moisturizer" 
                  time="7:40 AM" 
                  completed={false} 
                />
                <RoutineItem 
                  name="Sunscreen" 
                  time="7:45 AM" 
                  completed={false} 
                />
                
                <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
                  <Plus size={14} className="mr-1" />
                  Add Step
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center py-8">
            <p className="text-muted-foreground">More features coming soon!</p>
          </div>
        </TabsContent>
        
        <TabsContent value="night" className="mt-4">
          <Card className="skin-card border-none mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                <CalendarClock size={18} className="text-skin-blue" />
                Night Routine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <RoutineItem 
                  name="Oil Cleanser" 
                  time="9:30 PM" 
                  completed={false} 
                />
                <RoutineItem 
                  name="Water Cleanser" 
                  time="9:35 PM" 
                  completed={false} 
                />
                <RoutineItem 
                  name="Exfoliate" 
                  time="9:40 PM" 
                  completed={false} 
                />
                <RoutineItem 
                  name="Night Cream" 
                  time="9:45 PM" 
                  completed={false} 
                />
                
                <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
                  <Plus size={14} className="mr-1" />
                  Add Step
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center py-8">
            <p className="text-muted-foreground">More features coming soon!</p>
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-4">
          <div className="text-center py-16">
            <p className="text-muted-foreground">Weekly treatments feature coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Routine Item Component
const RoutineItem = ({ 
  name, 
  time, 
  completed 
}: { 
  name: string; 
  time: string; 
  completed: boolean;
}) => {
  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg transition-all ${
        completed 
          ? "bg-skin-lime/20" 
          : "bg-transparent hover:bg-skin-lime/10"
      }`}
    >
      <div className="flex items-center gap-3">
        {completed ? (
          <CheckCircle size={20} className="text-skin-teal" />
        ) : (
          <Circle size={20} className="text-skin-teal/40" />
        )}
        <span className={`${
          completed ? "text-skin-darkBlue" : "text-muted-foreground"
        }`}>
          {name}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
};

export default RoutineTracker;
