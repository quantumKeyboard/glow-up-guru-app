import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Salad, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { X } from '@/components/ui/x';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

type Meal = {
  id: number;
  name: string;
  time: string;
  items: string[];
  notes?: string;
  date: string;
};

type FoodCategory = {
  category: string;
  foods: string[];
  color: string;
  description?: string;
};

const DietTracker = () => {
  const { state, addMeal, updateMeal, deleteMeal } = useAppContext();
  
  const [foodCategories] = useState<FoodCategory[]>([
    {
      category: 'Vitamin A Sources',
      foods: ['Papaya', 'Tomato', 'Sweet Potato', 'Apricot'],
      color: 'bg-skin-lime',
      description: 'Help with skin repair and anti-aging effects'
    },
    {
      category: 'Vitamin C Sources',
      foods: ['Lemon', 'Orange', 'Strawberry'],
      color: 'bg-skin-teal',
      description: 'Brightens skin and boosts collagen production'
    },
    {
      category: 'Hydration & Detox',
      foods: ['Lemon Water', 'Amla Juice', 'Saafi'],
      color: 'bg-skin-blue',
      description: 'Flushes out toxins and keeps skin healthy'
    },
    {
      category: 'Skin-friendly Nutrients',
      foods: ['Omega-3', 'Probiotics', 'Fiber'],
      color: 'bg-skin-green',
      description: 'Support overall skin health and appearance'
    }
  ]);
  
  const [recommendedFoods] = useState([
    'Lemon Water (morning)',
    'Vitamin C Rich Foods (afternoon)',
    'Omega-3 Foods (evening)'
  ]);
  
  const [addMealDialogOpen, setAddMealDialogOpen] = useState(false);
  const [editMealDialogOpen, setEditMealDialogOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  
  const [newMeal, setNewMeal] = useState<Omit<Meal, 'id'>>({
    name: '',
    time: '',
    items: [],
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [newFoodItem, setNewFoodItem] = useState('');
  
  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.time || newMeal.items.length === 0) {
      toast.error('Please fill in all required fields and add at least one food item');
      return;
    }
    
    // Use the addMeal function from context
    addMeal(newMeal);
    
    setNewMeal({
      name: '',
      time: '',
      items: [],
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    setAddMealDialogOpen(false);
    toast.success('Meal added successfully');
  };
  
  const addFoodItemToMeal = () => {
    if (!newFoodItem.trim()) return;
    
    if (currentMeal) {
      setCurrentMeal({
        ...currentMeal,
        items: [...currentMeal.items, newFoodItem.trim()]
      });
    } else {
      setNewMeal({
        ...newMeal,
        items: [...newMeal.items, newFoodItem.trim()]
      });
    }
    
    setNewFoodItem('');
  };
  
  const removeFoodItem = (index: number) => {
    if (currentMeal) {
      setCurrentMeal({
        ...currentMeal,
        items: currentMeal.items.filter((_, i) => i !== index)
      });
    } else {
      setNewMeal({
        ...newMeal,
        items: newMeal.items.filter((_, i) => i !== index)
      });
    }
  };
  
  const startEditMeal = (meal: Meal) => {
    setCurrentMeal(meal);
    setEditMealDialogOpen(true);
  };
  
  const saveMealEdits = () => {
    if (!currentMeal || !currentMeal.name || !currentMeal.time || currentMeal.items.length === 0) {
      toast.error('Please fill in all required fields and add at least one food item');
      return;
    }
    
    updateMeal(currentMeal);
    
    setEditMealDialogOpen(false);
    setCurrentMeal(null);
    toast.success('Meal updated successfully');
  };
  
  const handleDeleteMeal = (id: number) => {
    deleteMeal(id);
    toast.success('Meal deleted');
  };
  
  const todayMeals = state.meals.filter(meal => 
    meal.date === new Date().toISOString().split('T')[0]
  );
  
  const yesterdayMeals = state.meals.filter(meal => 
    meal.date === new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="bg-skin-lime/20 p-1 mb-4">
            <TabsTrigger value="today" className="data-[state=active]:bg-white">Today</TabsTrigger>
            <TabsTrigger value="yesterday" className="data-[state=active]:bg-white">Yesterday</TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-white">All Meals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today">
            <Card className="skin-card border-none mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                  <Salad size={18} className="text-skin-green" />
                  Today's Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayMeals.length > 0 ? (
                    todayMeals.map((meal) => (
                      <MealCard 
                        key={meal.id} 
                        meal={meal} 
                        onEdit={startEditMeal}
                        onDelete={deleteMeal}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-2">No meals logged today</p>
                    </div>
                  )}
                  
                  <Dialog open={addMealDialogOpen} onOpenChange={setAddMealDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
                        <Plus size={14} className="mr-1" />
                        Add Meal
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Meal</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="meal-name">Meal Name</Label>
                            <Select 
                              onValueChange={(value) => setNewMeal({...newMeal, name: value})}
                              value={newMeal.name}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select meal" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Breakfast">Breakfast</SelectItem>
                                <SelectItem value="Morning Snack">Morning Snack</SelectItem>
                                <SelectItem value="Lunch">Lunch</SelectItem>
                                <SelectItem value="Afternoon Snack">Afternoon Snack</SelectItem>
                                <SelectItem value="Dinner">Dinner</SelectItem>
                                <SelectItem value="Evening Snack">Evening Snack</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="meal-time">Time</Label>
                            <Input
                              id="meal-time"
                              type="time"
                              value={newMeal.time}
                              onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="meal-date">Date</Label>
                          <Input
                            id="meal-date"
                            type="date"
                            value={newMeal.date}
                            onChange={(e) => setNewMeal({...newMeal, date: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Food Items</Label>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a food item"
                              value={newFoodItem}
                              onChange={(e) => setNewFoodItem(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addFoodItemToMeal();
                                }
                              }}
                            />
                            <Button 
                              type="button"
                              onClick={addFoodItemToMeal}
                            >
                              Add
                            </Button>
                          </div>
                          
                          {newMeal.items.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs font-medium mb-1">Added Items:</div>
                              <div className="flex flex-wrap gap-1">
                                {newMeal.items.map((item, index) => (
                                  <div 
                                    key={index}
                                    className="text-xs px-2 py-1 rounded-full bg-skin-lime/20 text-skin-darkBlue flex items-center gap-1"
                                  >
                                    {item}
                                    <button 
                                      onClick={() => removeFoodItem(index)}
                                      className="text-skin-blue/70 hover:text-skin-blue"
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="meal-notes">Notes (Optional)</Label>
                          <Textarea
                            id="meal-notes"
                            placeholder="Add any additional notes"
                            value={newMeal.notes || ''}
                            onChange={(e) => setNewMeal({...newMeal, notes: e.target.value})}
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
                          onClick={handleAddMeal}
                        >
                          Save Meal
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="yesterday">
            <Card className="skin-card border-none mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                  <Calendar size={18} className="text-skin-blue" />
                  Yesterday's Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {yesterdayMeals.length > 0 ? (
                    yesterdayMeals.map((meal) => (
                      <MealCard 
                        key={meal.id} 
                        meal={meal} 
                        onEdit={startEditMeal}
                        onDelete={deleteMeal}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-2">No meals logged yesterday</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <Card className="skin-card border-none mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
                  <Salad size={18} className="text-skin-green" />
                  All Logged Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {state.meals.length > 0 ? (
                    state.meals.map((meal) => (
                      <MealCard 
                        key={meal.id} 
                        meal={meal} 
                        onEdit={startEditMeal}
                        onDelete={handleDeleteMeal}
                        showDate
                      />
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-2">No meals logged</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="skin-card border-none mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-skin-darkBlue">
              Recommended for Your Skin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recommendedFoods.map((food, index) => (
                <div key={index} className="p-2 bg-skin-lime/10 rounded-lg flex items-center gap-2">
                  <div className="p-1 rounded-full bg-skin-teal">
                    <Salad size={12} className="text-white" />
                  </div>
                  <span className="text-sm text-skin-darkBlue">{food}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="skin-card border-none mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
              <Salad size={18} className="text-skin-green" />
              Skin-Friendly Foods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {foodCategories.map((category, index) => (
                <FoodCategoryCard
                  key={index}
                  category={category.category}
                  foods={category.foods}
                  color={category.color}
                  description={category.description}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="skin-card border-none mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
              <X size={18} className="text-skin-blue" />
              Foods to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-skin-blue/10 rounded-lg">
                <div className="mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-skin-blue text-white">
                    Excessive Sugar
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  High sugar intake can trigger inflammation and acne breakouts.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['Processed foods', 'Sugary drinks', 'Desserts'].map((food, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-2 py-1 rounded-full bg-white/50 text-skin-darkBlue"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-3 bg-skin-blue/10 rounded-lg">
                <div className="mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-skin-blue text-white">
                    Dairy Products
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  May cause inflammation and hormonal acne in some people.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['Milk', 'Cheese', 'Ice cream'].map((food, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-2 py-1 rounded-full bg-white/50 text-skin-darkBlue"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={editMealDialogOpen} onOpenChange={setEditMealDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Meal</DialogTitle>
          </DialogHeader>
          {currentMeal && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-meal-name">Meal Name</Label>
                  <Select 
                    onValueChange={(value) => setCurrentMeal({...currentMeal, name: value})}
                    value={currentMeal.name}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Morning Snack">Morning Snack</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Afternoon Snack">Afternoon Snack</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Evening Snack">Evening Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-meal-time">Time</Label>
                  <Input
                    id="edit-meal-time"
                    type="time"
                    value={currentMeal.time}
                    onChange={(e) => setCurrentMeal({...currentMeal, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-meal-date">Date</Label>
                <Input
                  id="edit-meal-date"
                  type="date"
                  value={currentMeal.date}
                  onChange={(e) => setCurrentMeal({...currentMeal, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Food Items</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a food item"
                    value={newFoodItem}
                    onChange={(e) => setNewFoodItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFoodItemToMeal();
                      }
                    }}
                  />
                  <Button 
                    type="button"
                    onClick={addFoodItemToMeal}
                  >
                    Add
                  </Button>
                </div>
                
                {currentMeal.items.length > 0 && (
                  <div className="mt-2">
                    <div className="text-xs font-medium mb-1">Added Items:</div>
                    <div className="flex flex-wrap gap-1">
                      {currentMeal.items.map((item, index) => (
                        <div 
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-skin-lime/20 text-skin-darkBlue flex items-center gap-1"
                        >
                          {item}
                          <button 
                            onClick={() => removeFoodItem(index)}
                            className="text-skin-blue/70 hover:text-skin-blue"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-meal-notes">Notes (Optional)</Label>
                <Textarea
                  id="edit-meal-notes"
                  placeholder="Add any additional notes"
                  value={currentMeal.notes || ''}
                  onChange={(e) => setCurrentMeal({...currentMeal, notes: e.target.value})}
                />
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
                onClick={saveMealEdits}
              >
                Update Meal
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const MealCard = ({ meal, onEdit, onDelete, showDate = false }: { meal: Meal, onEdit: (meal: Meal) => void, onDelete: (id: number) => void, showDate?: boolean }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-skin-lime/10 mb-2">
    <div className="flex items-center gap-3">
      <div className="w-2 h-10 bg-skin-teal rounded-full" />
      <div>
        <div className="text-sm font-medium text-skin-darkBlue">{meal.name}</div>
        <div className="text-xs text-muted-foreground">{meal.time}{showDate && ` · ${new Date(meal.date).toLocaleDateString()}`}</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {meal.items.map((item, index) => (
            <span key={index} className="text-xs px-2 py-0.5 rounded-full bg-skin-lime/20 text-skin-darkBlue">
              {item}
            </span>
          ))}
        </div>
        {meal.notes && <div className="text-xs text-muted-foreground mt-1">{meal.notes}</div>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onEdit(meal)}
      >
        <Edit size={16} className="text-skin-teal" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onDelete(meal.id)}
      >
        <Trash2 size={16} className="text-skin-blue" />
      </Button>
    </div>
  </div>
);

const FoodCategoryCard = ({ 
  category, 
  foods, 
  color,
  description
}: FoodCategory) => {
  return (
    <div className="p-3 bg-skin-lime/10 rounded-lg">
      <div className="mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} text-white`}>
          {category}
        </span>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
      )}
      <div className="flex flex-wrap gap-1">
        {foods.map((food, idx) => (
          <span 
            key={idx} 
            className="text-xs px-2 py-1 rounded-full bg-white/50 text-skin-darkBlue"
          >
            {food}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DietTracker;
