import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AddRoutineDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newRoutineItem: {
    name: string;
    time: string;
    description?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addRoutineItem: () => void;
};

export const AddRoutineDialog: React.FC<AddRoutineDialogProps> = ({
  open,
  onOpenChange,
  newRoutineItem,
  handleInputChange,
  addRoutineItem,
}) => {
  return (
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
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            name="time"
            placeholder="E.g., 7:30 AM"
            value={newRoutineItem.time}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            name="description"
            placeholder="Add details about this step"
            value={newRoutineItem.description || ''}
            onChange={handleInputChange}
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
  );
};