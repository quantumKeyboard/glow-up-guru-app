
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  title: string;
  description?: string;
};

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="flex justify-between items-center pb-6 mb-6 border-b border-skin-lightGreen/20">
      <div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-skin-darkTeal to-skin-darkBlue">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full border-skin-lightGreen/20 relative">
          <Bell size={18} className="text-skin-darkBlue" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-skin-teal rounded-full flex items-center justify-center text-[10px] text-white font-bold">3</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-skin-teal to-skin-blue flex items-center justify-center text-white font-bold">
            U
          </div>
        </div>
      </div>
    </header>
  );
};
