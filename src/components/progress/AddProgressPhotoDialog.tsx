import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Camera } from 'lucide-react';
import { toast } from 'sonner';

type ProgressPhoto = {
  id: number;
  date: string;
  imageUrl: string | null;
  notes?: string;
};

type AddProgressPhotoDialogProps = {
  onAddPhoto: (photo: Omit<ProgressPhoto, 'id'>) => void;
};

export const AddProgressPhotoDialog: React.FC<AddProgressPhotoDialogProps> = ({ onAddPhoto }) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newPhoto, setNewPhoto] = useState<Omit<ProgressPhoto, 'id'>>({    
    date: new Date().toISOString().split('T')[0],
    imageUrl: null,
    notes: ''
  });

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      
      video.srcObject = stream;
      await video.play();
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      
      const imageUrl = canvas.toDataURL('image/jpeg');
      setImagePreview(imageUrl);
      setNewPhoto(prev => ({ ...prev, imageUrl }));
      
      stream.getTracks().forEach(track => track.stop());
      video.remove();
      canvas.remove();
    } catch (error) {
      toast.error('Failed to access camera. Please check your permissions.');
    }
  };

  const handleAddPhoto = () => {
    if (!newPhoto.date) {
      toast.error('Please select a date for your photo');
      return;
    }

    if (!newPhoto.imageUrl && !imagePreview) {
      toast.error('Please capture a photo first');
      return;
    }

    onAddPhoto({
      ...newPhoto,
      imageUrl: imagePreview || newPhoto.imageUrl
    });
    
    setNewPhoto({
      date: new Date().toISOString().split('T')[0],
      imageUrl: null,
      notes: ''
    });
    setImagePreview(null);
    setOpen(false);
    toast.success('Progress photo added successfully');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-xs text-skin-blue border-dashed border-skin-blue/30">
          <Plus size={14} className="mr-1" />
          Add New Progress Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Progress Photo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="photo-date">Date</Label>
            <Input
              id="photo-date"
              type="date"
              value={newPhoto.date}
              onChange={(e) => setNewPhoto({
                ...newPhoto,
                date: e.target.value
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photo-notes">Notes (Optional)</Label>
            <Textarea
              id="photo-notes"
              placeholder="Add notes about your skin condition"
              value={newPhoto.notes || ''}
              onChange={(e) => setNewPhoto({
                ...newPhoto,
                notes: e.target.value
              })}
            />
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-skin-blue/20 rounded-lg">
            {imagePreview ? (
              <div className="relative w-full aspect-square">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80"
                  onClick={() => {
                    setImagePreview(null);
                    setNewPhoto(prev => ({ ...prev, imageUrl: null }));
                  }}
                >
                  Retake
                </Button>
              </div>
            ) : (
              <>
                <Camera size={32} className="text-skin-blue/40 mb-2" />
                <Button 
                  variant="outline" 
                  className="mb-2"
                  onClick={handleCapture}
                >
                  <Camera size={16} className="mr-2" />
                  Capture Photo
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  For privacy, photos are stored locally on your device
                </p>
              </>
            )}
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-skin-teal to-skin-blue"
            onClick={handleAddPhoto}
          >
            <Camera size={16} className="mr-2" />
            Add Progress Photo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};