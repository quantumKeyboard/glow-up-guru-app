
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Plus, Calendar, Clock, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Reminder = {
  id: number;
  title: string;
  time: string;
  type: 'skincare' | 'hydration' | 'diet';
  description?: string;
  completed?: boolean;
  date?: string;
};

const Reminders = () => {
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: 'Apply Sunscreen', time: '12:30 PM', date: '2025-04-03', type: 'skincare', description: 'SPF 50 on face and exposed areas', completed: false },
    { id: 2, title: 'Drink Water', time: '2:00 PM', date: '2025-04-03', type: 'hydration', description: '500ml of water', completed: false },
    { id: 3, title: 'Evening Routine', time: '9:00 PM', date: '2025-04-03', type: 'skincare', description: 'Complete night routine', completed: false },
    { id: 4, title: 'Eat Omega-3 Rich Foods', time: '1:00 PM', date: '2025-04-04', type: 'diet', description: 'Include fish or flaxseeds in lunch', completed: false },
  ]);
  
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    title: '',
    time: '',
    date: '',
    type: 'skincare',
    description: '',
    completed: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReminder({
      ...newReminder,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewReminder({
      ...newReminder,
      [name]: value
    });
  };
  
  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.time || !newReminder.date) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newId = reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1;
    
    setReminders([
      ...reminders,
      {
        ...newReminder,
        id: newId
      }
    ]);
    
    setNewReminder({
      title: '',
      time: '',
      date: '',
      type: 'skincare',
      description: '',
      completed: false
    });
    
    setOpen(false);
    toast.success('Reminder added successfully');
  };
  
  const handleToggleComplete = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed } 
        : reminder
    ));
  };
  
  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast.success('Reminder deleted');
  };
  
  // Filter reminders by date
  const today = new Date().toISOString().split('T')[0]; // "2025-04-03" format
  const todayReminders = reminders.filter(r => r.date === today);
  const upcomingReminders = reminders.filter(r => r.date && r.date > today);
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'skincare': return 'bg-skin-teal';
      case 'hydration': return 'bg-skin-blue';
      case 'diet': return 'bg-skin-green';
      default: return 'bg-skin-teal';
    }
  };
  
  const ReminderCard = ({ reminder }: { reminder: Reminder }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-skin-lime/10 mb-2">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-10 ${getTypeColor(reminder.type)} rounded-full`} />
        <div>
          <div className="text-sm font-medium text-skin-darkBlue">{reminder.title}</div>
          <div className="text-xs text-muted-foreground">{reminder.time}{reminder.date && ` · ${new Date(reminder.date).toLocaleDateString()}`}</div>
          {reminder.description && <div className="text-xs text-muted-foreground mt-1">{reminder.description}</div>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleToggleComplete(reminder.id)}
        >
          {reminder.completed ? 
            <Check size={16} className="text-skin-teal" /> : 
            <Circle size={16} className="text-skin-teal/40" />
          }
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleDeleteReminder(reminder.id)}
        >
          <X size={16} className="text-skin-blue" />
        </Button>
      </div>
    </div>
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-skin-teal to-skin-blue hover:from-skin-darkTeal hover:to-skin-darkBlue border-none">
              <Plus size={16} className="mr-2" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Reminder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Reminder title"
                  value={newReminder.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newReminder.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={newReminder.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('type', value)} 
                  defaultValue={newReminder.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skincare">Skincare</SelectItem>
                    <SelectItem value="hydration">Hydration</SelectItem>
                    <SelectItem value="diet">Diet & Nutrition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Add more details"
                  value={newReminder.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
                onClick={handleAddReminder}
              >
                Save Reminder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="bg-skin-lime/20 p-1">
          <TabsTrigger value="today" className="data-[state=active]:bg-white">Today</TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white">Upcoming</TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-white">All Reminders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="mt-4">
          <Card className="skin-card border-none mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                <Bell size={18} className="text-skin-blue" />
                Today's Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayReminders.length > 0 ? (
                <div className="space-y-2">
                  {todayReminders.map(reminder => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell size={24} className="text-muted-foreground mb-2 opacity-40" />
                  <p className="text-sm text-muted-foreground">No reminders for today</p>
                  <Button 
                    variant="link" 
                    className="mt-1 text-skin-blue hover:text-skin-darkBlue"
                    onClick={() => setOpen(true)}
                  >
                    Create a reminder
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-4">
          <Card className="skin-card border-none mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                <Calendar size={18} className="text-skin-teal" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingReminders.length > 0 ? (
                <div className="space-y-2">
                  {upcomingReminders.map(reminder => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar size={24} className="text-muted-foreground mb-2 opacity-40" />
                  <p className="text-sm text-muted-foreground">No upcoming reminders</p>
                  <Button 
                    variant="link" 
                    className="mt-1 text-skin-blue hover:text-skin-darkBlue"
                    onClick={() => setOpen(true)}
                  >
                    Create a reminder
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all" className="mt-4">
          <Card className="skin-card border-none mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                <Bell size={18} className="text-skin-green" />
                All Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reminders.length > 0 ? (
                <div className="space-y-2">
                  {reminders.map(reminder => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell size={24} className="text-muted-foreground mb-2 opacity-40" />
                  <p className="text-sm text-muted-foreground">No reminders</p>
                  <Button 
                    variant="link" 
                    className="mt-1 text-skin-blue hover:text-skin-darkBlue"
                    onClick={() => setOpen(true)}
                  >
                    Create your first reminder
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reminders;
