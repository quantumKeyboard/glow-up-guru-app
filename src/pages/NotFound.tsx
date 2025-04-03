
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-skin-lime/30 to-skin-teal/20 p-4">
      <div className="text-center max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-skin-teal to-skin-blue flex items-center justify-center">
          <span className="text-2xl font-bold text-white">404</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-skin-darkBlue">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button 
          className="bg-gradient-to-r from-skin-teal to-skin-blue hover:from-skin-darkTeal hover:to-skin-darkBlue"
          onClick={() => navigate('/')}
        >
          <Home size={16} className="mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
