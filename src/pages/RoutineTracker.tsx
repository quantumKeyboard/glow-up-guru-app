
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, CheckCircle, Circle, Plus, Edit, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type RoutineItem = {
  id: number;
  name: string;
  time: string;
  completed: boolean;
  description?: string;
};

type RoutineType = 'morning' | 'night' | 'weekly';

const RoutineTracker = () => {
  // State for each routine type
  const [morningRoutine, setMorningRoutine] = useState<RoutineItem[]>([
    { id: 1, name: 'Gentle Cleanser', time: '7:30 AM', completed: true, description: 'Use lukewarm water and gentle circular motions' },
    { id: 2, name: 'Vitamin C Serum', time: '7:35 AM', completed: true, description: 'Apply 3-4 drops to face and neck' },
    { id: 3, name: 'Moisturizer', time: '7:40 AM', completed: false, description: 'Apply evenly to face and neck' },
    { id: 4, name: 'Sunscreen', time: '7:45 AM', completed: false, description: 'SPF 50, reapply every 2 hours if outside' },
  ]);
  
  const [nightRoutine, setNightRoutine] = useState<RoutineItem[]>([
    { id: 1, name: 'Oil Cleanser', time: '9:30 PM', completed: false, description: 'Massage for 60 seconds to remove makeup and sunscreen' },
    { id: 2, name: 'Water Cleanser', time: '9:35 PM', completed: false, description: 'Gentle foaming cleanser' },
    { id: 3, name: 'Exfoliate', time: '9:40 PM', completed: false, description: 'Use 2-3 times per week, not daily' },
    { id: 4, name: 'Night Cream', time: '9:45 PM', completed: false, description: 'Apply thicker layer than daytime moisturizer' },
  ]);
  
  const [weeklyRoutine, setWeeklyRoutine] = useState<RoutineItem[]>([
    { id: 1, name: 'Face Mask', time: 'Sunday, 7:00 PM', completed: false, description: 'Clay mask for oily areas, hydrating mask for dry areas' },
    { id: 2, name: 'Deep Exfoliation', time: 'Wednesday, 9:30 PM', completed: false, description: 'Chemical exfoliant, avoid physical scrubs' },
    { id: 3, name: 'Hair Removal', time: 'Saturday, 10:00 AM', completed: false, description: 'Followed by soothing aloe vera gel' },
  ]);
  
  const [activeTab, setActiveTab] = useState<RoutineType>('morning');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRoutineItem, setCurrentRoutineItem] = useState<RoutineItem | null>(null);
  const [newRoutineItem, setNewRoutineItem] = useState<Omit<RoutineItem, 'id' | 'completed'>>({
    name: '',
    time: '',
    description: ''
  });
  
  // Get the active routine based on current tab
  const getActiveRoutine = () => {
    switch (activeTab) {
      case 'morning': return morningRoutine;
      case 'night': return nightRoutine;
      case 'weekly': return weeklyRoutine;
      default: return morningRoutine;
    }
  };
  
  // Set the active routine based on current tab
  const setActiveRoutine = (items: RoutineItem[]) => {
    switch (activeTab) {
      case 'morning':
        setMorningRoutine(items);
        break;
      case 'night':
        setNightRoutine(items);
        break;
      case 'weekly':
        setWeeklyRoutine(items);
        break;
    }
  };
  
  // Toggle the completed status of a routine item
  const toggleCompleted = (id: number) => {
    const updatedRoutine = getActiveRoutine().map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setActiveRoutine(updatedRoutine);
    
    const item = getActiveRoutine().find(item => item.id === id);
    if (item) {
      toast.success(`${!item.completed ? 'Completed' : 'Unmarked'}: ${item.name}`);
    }
  };
  
  // Handle input change for new or edited routine item
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean = true) => {
    if (isNew) {
      setNewRoutineItem({
        ...newRoutineItem,
        [e.target.name]: e.target.value
      });
    } else if (currentRoutineItem) {
      setCurrentRoutineItem({
        ...currentRoutineItem,
        [e.target.name]: e.target.value
      });
    }
  };
  
  // Add a new routine item
  const addRoutineItem = () => {
    if (!newRoutineItem.name || !newRoutineItem.time) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const activeRoutine = getActiveRoutine();
    const newId = activeRoutine.length > 0 
      ? Math.max(...activeRoutine.map(item => item.id)) + 1 
      : 1;
    
    const updatedRoutine = [
      ...activeRoutine,
      {
        id: newId,
        name: newRoutineItem.name,
        time: newRoutineItem.time,
        description: newRoutineItem.description,
        completed: false
      }
    ];
    
    setActiveRoutine(updatedRoutine);
    setNewRoutineItem({ name: '', time: '', description: '' });
    setAddDialogOpen(false);
    toast.success(`Added "${newRoutineItem.name}" to your ${activeTab} routine`);
  };
  
  // Edit an existing routine item
  const startEditRoutineItem = (item: RoutineItem) => {
    setCurrentRoutineItem(item);
    setEditDialogOpen(true);
  };
  
  // Save edits to a routine item
  const saveEditRoutineItem = () => {
    if (!currentRoutineItem || !currentRoutineItem.name || !currentRoutineItem.time) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const updatedRoutine = getActiveRoutine().map(item => 
      item.id === currentRoutineItem.id ? currentRoutineItem : item
    );
    
    setActiveRoutine(updatedRoutine);
    setEditDialogOpen(false);
    setCurrentRoutineItem(null);
    toast.success(`Updated "${currentRoutineItem.name}"`);
  };
  
  // Delete a routine item
  const deleteRoutineItem = (id: number) => {
    const item = getActiveRoutine().find(item => item.id === id);
    const updatedRoutine = getActiveRoutine().filter(item => item.id !== id);
    setActiveRoutine(updatedRoutine);
    
    if (item) {
      toast.success(`Removed "${item.name}" from your ${activeTab} routine`);
    }
  };
  
  return (
    <div>
      <Tabs 
        defaultValue="morning" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value as RoutineType)}
      >
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
                {morningRoutine.map((item) => (
                  <RoutineItem 
                    key={item.id}
                    item={item}
                    onToggle={toggleCompleted}
                    onEdit={startEditRoutineItem}
                    onDelete={deleteRoutineItem}
                  />
                ))}
                
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
                      <Plus size={14} className="mr-1" />
                      Add Step
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Routine Step</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Step Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="E.g., Apply Toner"
                          value={newRoutineItem.name}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          name="time"
                          placeholder="E.g., 7:30 AM"
                          value={newRoutineItem.time}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Input
                          id="description"
                          name="description"
                          placeholder="Add details about this step"
                          value={newRoutineItem.description}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
                        onClick={addRoutineItem}
                      >
                        Add to Routine
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
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
                {nightRoutine.map((item) => (
                  <RoutineItem 
                    key={item.id}
                    item={item}
                    onToggle={toggleCompleted}
                    onEdit={startEditRoutineItem}
                    onDelete={deleteRoutineItem}
                  />
                ))}
                
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
                      <Plus size={14} className="mr-1" />
                      Add Step
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-4">
          <Card className="skin-card border-none mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                <CalendarClock size={18} className="text-skin-green" />
                Weekly Treatments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyRoutine.map((item) => (
                  <RoutineItem 
                    key={item.id}
                    item={item}
                    onToggle={toggleCompleted}
                    onEdit={startEditRoutineItem}
                    onDelete={deleteRoutineItem}
                  />
                ))}
                
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
                      <Plus size={14} className="mr-1" />
                      Add Step
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Routine Step</DialogTitle>
          </DialogHeader>
          {currentRoutineItem && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Step Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={currentRoutineItem.name}
                  onChange={(e) => handleInputChange(e, false)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  name="time"
                  value={currentRoutineItem.time}
                  onChange={(e) => handleInputChange(e, false)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Input
                  id="edit-description"
                  name="description"
                  value={currentRoutineItem.description || ''}
                  onChange={(e) => handleInputChange(e, false)}
                />
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
                onClick={saveEditRoutineItem}
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Routine Item Component
const RoutineItem = ({ 
  item,
  onToggle,
  onEdit,
  onDelete
}: { 
  item: RoutineItem;
  onToggle: (id: number) => void;
  onEdit: (item: RoutineItem) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg transition-all ${
        item.completed 
          ? "bg-skin-lime/20" 
          : "bg-transparent hover:bg-skin-lime/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onToggle(item.id)}
          className="focus:outline-none"
        >
          {item.completed ? (
            <CheckCircle size={20} className="text-skin-teal" />
          ) : (
            <Circle size={20} className="text-skin-teal/40" />
          )}
        </button>
        <div>
          <span className={`${
            item.completed ? "text-skin-darkBlue" : "text-muted-foreground"
          }`}>
            {item.name}
          </span>
          {item.description && (
            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground mr-2">{item.time}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => onEdit(item)}
        >
          <Edit size={14} className="text-skin-teal/70" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => onDelete(item.id)}
        >
          <Trash2 size={14} className="text-skin-blue/70" />
        </Button>
      </div>
    </div>
  );
};

export default RoutineTracker;
