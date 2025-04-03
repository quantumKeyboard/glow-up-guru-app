import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

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
        <DialogTitle>Add Routine Step</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Step Name</Label>
          <Input
            id="name"
            name="name"
            value={newRoutineItem.name}
            onChange={handleInputChange}
            placeholder="Enter step name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            name="time"
            value={newRoutineItem.time}
            onChange={handleInputChange}
            placeholder="HH:MM"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            name="description"
            value={newRoutineItem.description || ''}
            onChange={handleInputChange}
            placeholder="Add a description"
          />
        </div>

        <Button
          className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
          onClick={addRoutineItem}
        >
          <Save size={16} className="mr-2" />
          Add Step
        </Button>
      </div>
    </DialogContent>
  );
};