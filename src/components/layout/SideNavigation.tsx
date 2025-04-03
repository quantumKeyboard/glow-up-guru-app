
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Droplets, Home, CalendarClock, Salad, BarChart2, 
  CircleUser, AlarmClock, BookOpen, Camera 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
  { name: 'Routine', path: '/routine', icon: <CalendarClock size={20} /> },
  { name: 'Ingredients', path: '/ingredients', icon: <BookOpen size={20} /> },
  { name: 'Diet', path: '/diet', icon: <Salad size={20} /> },
  { name: 'Hydration', path: '/hydration', icon: <Droplets size={20} /> },
  { name: 'Progress', path: '/progress', icon: <Camera size={20} /> },
  { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
  { name: 'Reminders', path: '/reminders', icon: <AlarmClock size={20} /> },
  { name: 'Profile', path: '/profile', icon: <CircleUser size={20} /> },
];

export const SideNavigation = () => {
  return (
    <div className="fixed left-0 h-screen w-20 bg-white/80 backdrop-blur-md border-r border-skin-lightGreen/20 flex flex-col items-center py-8 px-2 shadow-md z-10">
      <div className="mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-skin-lime to-skin-teal flex items-center justify-center">
          <Droplets size={20} className="text-white" />
        </div>
      </div>
      
      <nav className="flex-1 w-full">
        <ul className="flex flex-col space-y-4 items-center">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <NavLink 
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center w-full p-3 rounded-xl transition-all",
                  isActive 
                    ? "bg-gradient-to-b from-skin-teal to-skin-blue text-white" 
                    : "text-skin-darkBlue hover:bg-skin-lime/20"
                )}
              >
                <div>{item.icon}</div>
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
