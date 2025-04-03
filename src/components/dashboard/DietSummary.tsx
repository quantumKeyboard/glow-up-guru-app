
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Salad, Coffee, Circle } from 'lucide-react';

type NutrientProps = {
  name: string;
  value: number;
  target: number;
  color: string;
};

const Nutrient: React.FC<NutrientProps> = ({ name, value, target, color }) => {
  const progress = Math.min(100, (value / target) * 100);
  
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1">
          <Circle size={8} className={color} />
          <span className="text-xs text-skin-darkBlue">{name}</span>
        </div>
        <span className="text-xs text-muted-foreground">{value}/{target}g</span>
      </div>
      <div className="w-full h-1.5 bg-skin-lime/20 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const DietSummary = () => {
  const meals = [
    { id: 1, name: "Breakfast", time: "8:30 AM", items: ["Oatmeal", "Berries", "Greek Yogurt"] },
    { id: 2, name: "Lunch", time: "1:00 PM", items: ["Salad", "Grilled Chicken", "Avocado"] },
  ];
  
  return (
    <Card className="skin-card h-full border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-skin-darkBlue flex items-center gap-2">
          <Salad size={16} className="text-skin-green" />
          Today's Diet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {meals.map((meal) => (
            <div key={meal.id} className="p-2 bg-skin-lime/10 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-skin-darkBlue">{meal.name}</span>
                <span className="text-xs text-muted-foreground">{meal.time}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {meal.items.join(", ")}
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
            <Coffee size={14} className="mr-1" />
            Add Another Meal
          </Button>
        </div>
        
        <div className="mt-4 pt-3 border-t border-skin-lightGreen/20">
          <h4 className="text-xs font-medium mb-2 text-skin-darkBlue">Nutrients</h4>
          <Nutrient 
            name="Omega-3" 
            value={1.8} 
            target={3} 
            color="bg-skin-green" 
          />
          <Nutrient 
            name="Vitamin C" 
            value={45} 
            target={60} 
            color="bg-skin-teal" 
          />
          <Nutrient 
            name="Fiber" 
            value={12} 
            target={25} 
            color="bg-skin-blue" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

const Button = ({ children, className, variant = "default" }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = 
    variant === "outline" 
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" 
      : "bg-primary text-primary-foreground hover:bg-primary/90";
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${className || ""}`}>
      {children}
    </button>
  );
};
