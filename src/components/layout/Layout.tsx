
import React, { useEffect } from 'react';
import { SideNavigation } from './SideNavigation';
import { Header } from './Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useAppContext();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/login');
    }
  }, [state.isAuthenticated, navigate]);
  
  // Determine title based on current route
  const getTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/routine') return 'Skincare Routine';
    if (path === '/ingredients') return 'Ingredients Guide';
    if (path === '/diet') return 'Diet & Nutrition';
    if (path === '/hydration') return 'Hydration Tracker';
    if (path === '/progress') return 'Progress Tracker';
    if (path === '/analytics') return 'Analytics';
    if (path === '/reminders') return 'Reminders';
    if (path === '/profile') return 'Profile';
    
    return 'SkinDoctors Ki Maa Kaa Bharosaa';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-skin-lime/20 to-skin-teal/10">
      <SideNavigation />
      
      <main className="pl-24 pr-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Header 
            title={getTitle()} 
            description={location.pathname === '/' ? "Track your skincare journey" : undefined} 
          />
          <Outlet />
        </div>
      </main>
    </div>
  );
};
