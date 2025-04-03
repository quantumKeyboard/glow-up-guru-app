
import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, CheckCircle, Circle, Plus, Edit, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { AddRoutineDialog } from '@/components/ui/AddRoutineDialog';

type RoutineItem = {
  id: number;
  name: string;
  time: string;
  completed: boolean;
  description?: string;
};

type RoutineType = 'morning' | 'night' | 'weekly';

const RoutineTracker = () => {
  const { state, updateMorningRoutine, updateNightRoutine, updateWeeklyRoutine, toggleRoutineItem } = useAppContext();
  
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
      case 'morning': return state.morningRoutine;
      case 'night': return state.nightRoutine;
      case 'weekly': return state.weeklyRoutine;
      default: return state.morningRoutine;
    }
  };
  
  // Set the active routine based on current tab
  const setActiveRoutine = (items: RoutineItem[]) => {
    switch (activeTab) {
      case 'morning':
        updateMorningRoutine(items);
        break;
      case 'night':
        updateNightRoutine(items);
        break;
      case 'weekly':
        updateWeeklyRoutine(items);
        break;
    }
  };
  
  // Toggle the completed status of a routine item
  const toggleCompleted = (id: number) => {
    toggleRoutineItem(id, activeTab);
    
    const item = getActiveRoutine().find(item => item.id === id);
    if (item) {
      toast.success(`${!item.completed ? 'Completed' : 'Unmarked'}: ${item.name}`);
    }
  };
  
  // Handle input change for new or edited routine item
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, isNew: boolean = true) => {
    const value = e.target.name === 'time' 
      ? formatTimeInput(e.target.value)
      : e.target.value;

    if (isNew) {
      setNewRoutineItem({
        ...newRoutineItem,
        [e.target.name]: value
      });
    } else if (currentRoutineItem) {
      setCurrentRoutineItem({
        ...currentRoutineItem,
        [e.target.name]: value
      });
    }
  };

  const formatTimeInput = (value: string): string => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as HH:MM
    if (digits.length >= 4) {
      const hours = parseInt(digits.slice(0, 2));
      const minutes = parseInt(digits.slice(2, 4));
      
      // Validate hours and minutes
      const validHours = Math.min(Math.max(hours, 0), 23);
      const validMinutes = Math.min(Math.max(minutes, 0), 59);
      
      return `${validHours.toString().padStart(2, '0')}:${validMinutes.toString().padStart(2, '0')}`;
    }
    
    return value;
  };
  
  // Add a new routine item
  const addRoutineItem = () => {
    if (!newRoutineItem.name) {
      toast.error('Please enter a name for the routine step');
      return;
    }
    
    if (!newRoutineItem.time || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newRoutineItem.time)) {
      toast.error('Please enter a valid time in HH:MM format');
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
    if (!currentRoutineItem || !currentRoutineItem.name) {
      toast.error('Please enter a name for the routine step');
      return;
    }
    
    if (!currentRoutineItem.time || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(currentRoutineItem.time)) {
      toast.error('Please enter a valid time in HH:MM format');
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
                {getActiveRoutine().map((item) => (
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
                  <AddRoutineDialog
                    open={addDialogOpen}
                    onOpenChange={setAddDialogOpen}
                    newRoutineItem={newRoutineItem}
                    handleInputChange={handleInputChange}
                    addRoutineItem={addRoutineItem}
                  />
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
                {getActiveRoutine().map((item) => (
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
                  <AddRoutineDialog
                    open={addDialogOpen}
                    onOpenChange={setAddDialogOpen}
                    newRoutineItem={newRoutineItem}
                    handleInputChange={handleInputChange}
                    addRoutineItem={addRoutineItem}
                  />
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
                {getActiveRoutine().map((item) => (
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
                  <AddRoutineDialog
                    open={addDialogOpen}
                    onOpenChange={setAddDialogOpen}
                    newRoutineItem={newRoutineItem}
                    handleInputChange={handleInputChange}
                    addRoutineItem={addRoutineItem}
                  />
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
