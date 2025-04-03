
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Search, ChevronRight, ChevronDown, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

type Ingredient = {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  sources: string[];
  category: 'vitamin' | 'hydration' | 'nutrient' | 'treatment';
  isBeneficial: boolean;
};

const IngredientsGuide = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const beneficialIngredients: Ingredient[] = [
    {
      id: 1,
      name: 'Vitamin A Alternatives',
      description: 'Help with skin repair and anti-aging effects',
      benefits: ['Promotes skin repair', 'Reduces signs of aging', 'Improves skin texture'],
      sources: ['Papaya', 'Tomato', 'Sweet Potato', 'Cheese', 'Butter', 'Apricot'],
      category: 'vitamin',
      isBeneficial: true
    },
    {
      id: 2,
      name: 'Vitamin C Sources',
      description: 'Brightens skin and boosts collagen production',
      benefits: ['Brightens complexion', 'Boosts collagen production', 'Protects against environmental damage'],
      sources: ['Lemon', 'Vitamin C serum', 'Oranges', 'Strawberries'],
      category: 'vitamin',
      isBeneficial: true
    },
    {
      id: 3,
      name: 'Hydration & Detox',
      description: 'Flushes out toxins and keeps skin healthy',
      benefits: ['Removes toxins from body', 'Improves skin hydration', 'Enhances cellular function'],
      sources: ['Lemon water', 'Amla juice', 'Saafi (herbal blood purifier)'],
      category: 'hydration',
      isBeneficial: true
    },
    {
      id: 4,
      name: 'Skin-friendly Nutrients',
      description: 'Support overall skin health and appearance',
      benefits: ['Reduces inflammation', 'Improves gut health', 'Supports skin repair'],
      sources: ['Omega-3 fatty acids', 'Probiotics & Fiber', 'Multivitamins'],
      category: 'nutrient',
      isBeneficial: true
    },
    {
      id: 5,
      name: 'Natural Skin Treatments',
      description: 'Natural remedies for skin brightening and cleansing',
      benefits: ['Deep cleansing', 'Brightening effect', 'Antioxidant protection'],
      sources: ['Besan (gram flour) + honey', 'Green tea + Apple Cider Vinegar', 'Steam treatment + Exfoliation'],
      category: 'treatment',
      isBeneficial: true
    },
  ];
  
  const cautionIngredients: Ingredient[] = [
    {
      id: 6,
      name: 'Harsh Cleansers & Overwashing',
      description: 'Strips natural oils, causing dryness',
      benefits: [],
      sources: ['Many commercial face washes', 'Alcohol-based products'],
      category: 'treatment',
      isBeneficial: false
    },
    {
      id: 7,
      name: 'Pore-Clogging Ingredients',
      description: 'Can lead to breakouts and congested skin',
      benefits: [],
      sources: ['Comedogenic moisturizers', 'Heavy oils', 'Some makeup products'],
      category: 'treatment',
      isBeneficial: false
    },
    {
      id: 8,
      name: 'Excessive Sugar',
      description: 'Causes breakouts and inflammation',
      benefits: [],
      sources: ['Processed foods', 'Sugary drinks', 'Desserts'],
      category: 'nutrient',
      isBeneficial: false
    },
  ];
  
  const allIngredients = [...beneficialIngredients, ...cautionIngredients];
  
  const filteredIngredients = searchQuery 
    ? allIngredients.filter(ing => 
        ing.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        ing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ing.sources.some(source => source.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allIngredients;
  
  const IngredientCard = ({ ingredient }: { ingredient: Ingredient }) => {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`item-${ingredient.id}`} className="border-none">
          <Card className={`skin-card border-none mb-4 ${
            ingredient.isBeneficial 
              ? 'border-l-4 border-l-skin-green' 
              : 'border-l-4 border-l-skin-blue'
          }`}>
            <CardHeader className="p-4 pb-0">
              <AccordionTrigger className="flex items-center justify-between py-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    ingredient.isBeneficial ? 'bg-skin-lime' : 'bg-skin-blue/10'
                  }`}>
                    {ingredient.isBeneficial ? (
                      <Check size={14} className="text-skin-darkBlue" />
                    ) : (
                      <X size={14} className="text-skin-blue" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-skin-darkBlue">
                      {ingredient.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {ingredient.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
            </CardHeader>
            <AccordionContent>
              <CardContent className="pt-4">
                {ingredient.benefits.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-skin-darkBlue mb-2">Benefits:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {ingredient.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-skin-teal"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h4 className="text-xs font-medium text-skin-darkBlue mb-2">
                    {ingredient.isBeneficial ? 'Sources:' : 'Examples:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.sources.map((source, idx) => (
                      <span 
                        key={idx} 
                        className={`text-xs px-2 py-1 rounded-full ${
                          ingredient.isBeneficial 
                            ? 'bg-skin-lime/30 text-skin-darkBlue' 
                            : 'bg-skin-blue/10 text-skin-blue'
                        }`}
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    );
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search ingredients, benefits, or sources..."
            className="pl-10 border-skin-lightGreen/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 border-skin-lightGreen/30">
          <Filter size={16} />
          Filter
          <ChevronDown size={16} />
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-skin-lime/20 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">All</TabsTrigger>
          <TabsTrigger value="beneficial" className="data-[state=active]:bg-white">Beneficial</TabsTrigger>
          <TabsTrigger value="caution" className="data-[state=active]:bg-white">Use with Caution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="space-y-2">
            {filteredIngredients.map(ingredient => (
              <IngredientCard key={ingredient.id} ingredient={ingredient} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="beneficial" className="mt-4">
          <div className="space-y-2">
            {filteredIngredients
              .filter(ing => ing.isBeneficial)
              .map(ingredient => (
                <IngredientCard key={ingredient.id} ingredient={ingredient} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="caution" className="mt-4">
          <div className="space-y-2">
            {filteredIngredients
              .filter(ing => !ing.isBeneficial)
              .map(ingredient => (
                <IngredientCard key={ingredient.id} ingredient={ingredient} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IngredientsGuide;
