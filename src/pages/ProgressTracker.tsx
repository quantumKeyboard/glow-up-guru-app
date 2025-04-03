
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProgressTracker = () => {
  return (
    <div>
      <Card className="skin-card border-none mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-skin-darkBlue flex items-center gap-2">
            <Camera size={18} className="text-skin-blue" />
            Progress Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-skin-lime/20 rounded-lg flex items-center justify-center mb-2">
                <Button className="bg-skin-teal hover:bg-skin-darkTeal">
                  <Camera size={20} className="mr-2" />
                  Take Photo
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-skin-lime/10 rounded-lg flex items-center justify-center mb-2">
                <Plus size={24} className="text-skin-teal/40" />
              </div>
              <span className="text-xs text-muted-foreground">Last Week</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-skin-lime/10 rounded-lg flex items-center justify-center mb-2">
                <Plus size={24} className="text-skin-teal/40" />
              </div>
              <span className="text-xs text-muted-foreground">2 Weeks Ago</span>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" className="text-xs text-skin-blue">
              View All Photos
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="skin-card border-none mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-skin-darkBlue">
            Skin Journal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Keep track of your skin's condition and how it responds to different products and routines.
          </p>
          
          <div className="bg-skin-lime/10 p-4 rounded-lg mb-4">
            <h3 className="text-sm font-medium text-skin-darkBlue mb-2">
              April 3, 2025
            </h3>
            <p className="text-sm text-muted-foreground">
              Started using the new Vitamin C serum today. Skin feels a bit more hydrated but no major changes yet. Will continue to monitor.
            </p>
          </div>
          
          <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
            <Plus size={14} className="mr-1" />
            Add Journal Entry
          </Button>
        </CardContent>
      </Card>
      
      <div className="text-center py-8">
        <p className="text-muted-foreground">More features coming soon!</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
