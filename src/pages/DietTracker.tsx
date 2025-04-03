
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Salad, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DietTracker = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Card className="skin-card border-none mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
              <Salad size={18} className="text-skin-green" />
              Today's Meals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <MealCard 
                name="Breakfast" 
                time="8:30 AM" 
                items={["Oatmeal", "Berries", "Greek Yogurt"]} 
              />
              <MealCard 
                name="Lunch" 
                time="1:00 PM" 
                items={["Salad", "Grilled Chicken", "Avocado"]} 
              />
              
              <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
                <Plus size={14} className="mr-1" />
                Add Meal
              </Button>
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
            <div className="grid grid-cols-2 gap-2">
              <FoodCategory 
                category="Vitamin A Sources" 
                foods={["Papaya", "Tomato", "Sweet Potato", "Apricot"]} 
                color="bg-skin-lime"
              />
              <FoodCategory 
                category="Vitamin C Sources" 
                foods={["Lemon", "Orange", "Strawberry"]} 
                color="bg-skin-teal"
              />
              <FoodCategory 
                category="Hydration & Detox" 
                foods={["Lemon Water", "Amla Juice", "Saafi"]} 
                color="bg-skin-blue"
              />
              <FoodCategory 
                category="Skin-friendly Nutrients" 
                foods={["Omega-3", "Probiotics", "Fiber"]} 
                color="bg-skin-green"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-1 md:col-span-2">
        <div className="text-center py-8">
          <p className="text-muted-foreground">More features coming soon!</p>
        </div>
      </div>
    </div>
  );
};

// Meal Card Component
const MealCard = ({ 
  name, 
  time, 
  items 
}: { 
  name: string; 
  time: string; 
  items: string[];
}) => {
  return (
    <div className="p-3 bg-skin-lime/10 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-skin-darkBlue">{name}</span>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <div className="text-sm text-muted-foreground">
        {items.join(", ")}
      </div>
    </div>
  );
};

// Food Category Component
const FoodCategory = ({ 
  category, 
  foods, 
  color 
}: { 
  category: string; 
  foods: string[]; 
  color: string;
}) => {
  return (
    <div className="p-3 bg-skin-lime/10 rounded-lg">
      <div className="mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} text-white`}>
          {category}
        </span>
      </div>
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
