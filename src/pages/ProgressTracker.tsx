
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, ArrowRight, Plus, Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type JournalEntry = {
  id: number;
  date: string;
  content: string;
};

type ProgressPhoto = {
  id: number;
  date: string;
  imageUrl: string | null;
  notes?: string;
};

const ProgressTracker = () => {
  // Photo tracking state
  const [photos, setPhotos] = useState<ProgressPhoto[]>([
    { id: 1, date: new Date().toISOString().split('T')[0], imageUrl: null, notes: 'Today' },
    { id: 2, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], imageUrl: null, notes: 'Last Week' },
    { id: 3, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], imageUrl: null, notes: '2 Weeks Ago' },
  ]);
  
  // Journal entries state
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    { 
      id: 1, 
      date: '2025-04-03', 
      content: 'Started using the new Vitamin C serum today. Skin feels a bit more hydrated but no major changes yet. Will continue to monitor.' 
    }
  ]);
  
  // Dialog state
  const [addJournalDialogOpen, setAddJournalDialogOpen] = useState(false);
  const [editJournalDialogOpen, setEditJournalDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  
  // New journal entry state
  const [newJournalEntry, setNewJournalEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    content: ''
  });
  
  // Add a new journal entry
  const addJournalEntry = () => {
    if (!newJournalEntry.content.trim()) {
      toast.error('Please add some content to your journal entry');
      return;
    }
    
    const newId = journalEntries.length > 0 
      ? Math.max(...journalEntries.map(entry => entry.id)) + 1 
      : 1;
    
    setJournalEntries([
      ...journalEntries,
      {
        id: newId,
        date: newJournalEntry.date,
        content: newJournalEntry.content
      }
    ]);
    
    setNewJournalEntry({
      date: new Date().toISOString().split('T')[0],
      content: ''
    });
    
    setAddJournalDialogOpen(false);
    toast.success('Journal entry added');
  };
  
  // Start editing a journal entry
  const startEditJournalEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setEditJournalDialogOpen(true);
  };
  
  // Save edits to a journal entry
  const saveJournalEntry = () => {
    if (!currentEntry || !currentEntry.content.trim()) {
      toast.error('Journal entry cannot be empty');
      return;
    }
    
    setJournalEntries(
      journalEntries.map(entry => 
        entry.id === currentEntry.id ? currentEntry : entry
      )
    );
    
    setEditJournalDialogOpen(false);
    setCurrentEntry(null);
    toast.success('Journal entry updated');
  };
  
  // Delete a journal entry
  const deleteJournalEntry = (id: number) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
    toast.success('Journal entry deleted');
  };
  
  // Take a "photo" (simulated)
  const takePhoto = (id: number) => {
    // In a real app, this would open the camera
    // Here we just simulate taking a photo
    setPhotos(
      photos.map(photo => 
        photo.id === id 
          ? { ...photo, imageUrl: '/placeholder.svg' } 
          : photo
      )
    );
    
    toast.success('Photo saved successfully');
  };
  
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
            {photos.map((photo) => (
              <div key={photo.id} className="flex flex-col items-center">
                <div className="w-full aspect-square bg-skin-lime/20 rounded-lg flex items-center justify-center mb-2">
                  {photo.imageUrl ? (
                    <img 
                      src={photo.imageUrl} 
                      alt={`Photo from ${photo.notes}`} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Button 
                      className="bg-skin-teal hover:bg-skin-darkTeal"
                      onClick={() => takePhoto(photo.id)}
                    >
                      <Camera size={20} className="mr-2" />
                      Take Photo
                    </Button>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{photo.notes}</span>
              </div>
            ))}
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
          
          {journalEntries.map((entry) => (
            <div key={entry.id} className="bg-skin-lime/10 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-skin-darkBlue flex items-center gap-2">
                  <Calendar size={14} className="text-skin-teal" />
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => startEditJournalEntry(entry)}
                  >
                    <Edit size={14} className="text-skin-teal/70" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => deleteJournalEntry(entry.id)}
                  >
                    <Trash2 size={14} className="text-skin-blue/70" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{entry.content}</p>
            </div>
          ))}
          
          <Dialog open={addJournalDialogOpen} onOpenChange={setAddJournalDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full text-xs text-skin-teal border-dashed border-skin-teal/30">
                <Plus size={14} className="mr-1" />
                Add Journal Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>New Journal Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="entry-date">Date</Label>
                  <Input
                    id="entry-date"
                    type="date"
                    value={newJournalEntry.date}
                    onChange={(e) => setNewJournalEntry({
                      ...newJournalEntry,
                      date: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="entry-content">Journal Entry</Label>
                  <Textarea
                    id="entry-content"
                    placeholder="How is your skin today? Any changes or improvements?"
                    rows={5}
                    value={newJournalEntry.content}
                    onChange={(e) => setNewJournalEntry({
                      ...newJournalEntry,
                      content: e.target.value
                    })}
                  />
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
                  onClick={addJournalEntry}
                >
                  Save Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Edit Journal Entry Dialog */}
          <Dialog open={editJournalDialogOpen} onOpenChange={setEditJournalDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Journal Entry</DialogTitle>
              </DialogHeader>
              {currentEntry && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-entry-date">Date</Label>
                    <Input
                      id="edit-entry-date"
                      type="date"
                      value={currentEntry.date}
                      onChange={(e) => setCurrentEntry({
                        ...currentEntry,
                        date: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-entry-content">Journal Entry</Label>
                    <Textarea
                      id="edit-entry-content"
                      rows={5}
                      value={currentEntry.content}
                      onChange={(e) => setCurrentEntry({
                        ...currentEntry,
                        content: e.target.value
                      })}
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
                    onClick={saveJournalEntry}
                  >
                    Update Entry
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
