import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
type RoutineItem = {
  id: number;
  name: string;
  time: string;
  completed: boolean;
  description?: string;
};

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

type Meal = {
  id: number;
  name: string;
  time: string;
  items: string[];
  notes?: string;
  date: string;
};

type Reminder = {
  id: number;
  title: string;
  time: string;
  type: 'skincare' | 'hydration' | 'diet';
  description?: string;
  completed?: boolean;
  date?: string;
};

type User = {
  name: string;
  email: string;
  skinType: string;
  concerns: string[];
  avatar?: string;
};

type AppState = {
  user: User | null;
  isAuthenticated: boolean;
  morningRoutine: RoutineItem[];
  nightRoutine: RoutineItem[];
  weeklyRoutine: RoutineItem[];
  journalEntries: JournalEntry[];
  progressPhotos: ProgressPhoto[];
  meals: Meal[];
  reminders: Reminder[];
  hydrationLevel: number;
};

type AppContextType = {
  state: AppState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updateMorningRoutine: (routine: RoutineItem[]) => void;
  updateNightRoutine: (routine: RoutineItem[]) => void;
  updateWeeklyRoutine: (routine: RoutineItem[]) => void;
  toggleRoutineItem: (id: number, routineType: 'morning' | 'night' | 'weekly') => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateJournalEntry: (entry: JournalEntry) => void;
  deleteJournalEntry: (id: number) => void;
  addProgressPhoto: (photo: Omit<ProgressPhoto, 'id'>) => void;
  updateProgressPhoto: (photo: ProgressPhoto) => void;
  deleteProgressPhoto: (id: number) => void;
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  updateMeal: (meal: Meal) => void;
  deleteMeal: (id: number) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (reminder: Reminder) => void;
  deleteReminder: (id: number) => void;
  toggleReminderComplete: (id: number) => void;
  updateHydrationLevel: (level: number) => void;
};

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  morningRoutine: [
    { id: 1, name: 'Gentle Cleanser', time: '7:30 AM', completed: false, description: 'Use lukewarm water and gentle circular motions' },
    { id: 2, name: 'Vitamin C Serum', time: '7:35 AM', completed: false, description: 'Apply 3-4 drops to face and neck' },
    { id: 3, name: 'Moisturizer', time: '7:40 AM', completed: false, description: 'Apply evenly to face and neck' },
    { id: 4, name: 'Sunscreen', time: '7:45 AM', completed: false, description: 'SPF 50, reapply every 2 hours if outside' },
  ],
  nightRoutine: [
    { id: 1, name: 'Oil Cleanser', time: '9:30 PM', completed: false, description: 'Massage for 60 seconds to remove makeup and sunscreen' },
    { id: 2, name: 'Water Cleanser', time: '9:35 PM', completed: false, description: 'Gentle foaming cleanser' },
    { id: 3, name: 'Exfoliate', time: '9:40 PM', completed: false, description: 'Use 2-3 times per week, not daily' },
    { id: 4, name: 'Night Cream', time: '9:45 PM', completed: false, description: 'Apply thicker layer than daytime moisturizer' },
  ],
  weeklyRoutine: [
    { id: 1, name: 'Face Mask', time: 'Sunday, 7:00 PM', completed: false, description: 'Clay mask for oily areas, hydrating mask for dry areas' },
    { id: 2, name: 'Deep Exfoliation', time: 'Wednesday, 9:30 PM', completed: false, description: 'Chemical exfoliant, avoid physical scrubs' },
    { id: 3, name: 'Hair Removal', time: 'Saturday, 10:00 AM', completed: false, description: 'Followed by soothing aloe vera gel' },
  ],
  journalEntries: [
    { 
      id: 1, 
      date: new Date().toISOString().split('T')[0], 
      content: 'Started using the new Vitamin C serum today. Skin feels a bit more hydrated but no major changes yet. Will continue to monitor.' 
    }
  ],
  progressPhotos: [
    { id: 1, date: new Date().toISOString().split('T')[0], imageUrl: null, notes: 'Today' },
    { id: 2, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], imageUrl: null, notes: 'Last Week' },
    { id: 3, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], imageUrl: null, notes: '2 Weeks Ago' },
  ],
  meals: [
    { 
      id: 1, 
      name: 'Breakfast', 
      time: '8:30 AM', 
      items: ['Oatmeal', 'Berries', 'Greek Yogurt'], 
      date: new Date().toISOString().split('T')[0] 
    },
    { 
      id: 2, 
      name: 'Lunch', 
      time: '1:00 PM', 
      items: ['Salad', 'Grilled Chicken', 'Avocado'],
      date: new Date().toISOString().split('T')[0]
    },
  ],
  reminders: [
    { id: 1, title: 'Apply Sunscreen', time: '12:30 PM', date: new Date().toISOString().split('T')[0], type: 'skincare', description: 'SPF 50 on face and exposed areas', completed: false },
    { id: 2, title: 'Drink Water', time: '2:00 PM', date: new Date().toISOString().split('T')[0], type: 'hydration', description: '500ml of water', completed: false },
    { id: 3, title: 'Evening Routine', time: '9:00 PM', date: new Date().toISOString().split('T')[0], type: 'skincare', description: 'Complete night routine', completed: false },
  ],
  hydrationLevel: 3,
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or use initial state
  const loadState = (): AppState => {
    try {
      const savedState = localStorage.getItem('skincare-app-state');
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
    }
    return initialState;
  };

  const [state, setState] = useState<AppState>(loadState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('skincare-app-state', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }, [state]);

  // Authentication functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    // For now, we'll simulate a successful login with a mock user
    if (email && password) {
      setState(prev => ({
        ...prev,
        user: {
          name: 'Test User',
          email: email,
          skinType: 'Combination',
          concerns: ['Acne', 'Hyperpigmentation'],
        },
        isAuthenticated: true,
      }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false,
    }));
  };

  const updateUser = (user: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...user } : null,
    }));
  };

  // Routine functions
  const updateMorningRoutine = (routine: RoutineItem[]) => {
    setState(prev => ({ ...prev, morningRoutine: routine }));
  };

  const updateNightRoutine = (routine: RoutineItem[]) => {
    setState(prev => ({ ...prev, nightRoutine: routine }));
  };

  const updateWeeklyRoutine = (routine: RoutineItem[]) => {
    setState(prev => ({ ...prev, weeklyRoutine: routine }));
  };

  const toggleRoutineItem = (id: number, routineType: 'morning' | 'night' | 'weekly') => {
    setState(prev => {
      const routineKey = `${routineType}Routine` as keyof Pick<AppState, 'morningRoutine' | 'nightRoutine' | 'weeklyRoutine'>;
      const updatedRoutine = prev[routineKey].map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      return { ...prev, [routineKey]: updatedRoutine };
    });
  };

  // Journal functions
  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    setState(prev => {
      const newId = prev.journalEntries.length > 0 
        ? Math.max(...prev.journalEntries.map(e => e.id)) + 1 
        : 1;
      return {
        ...prev,
        journalEntries: [...prev.journalEntries, { ...entry, id: newId }],
      };
    });
  };

  const updateJournalEntry = (entry: JournalEntry) => {
    setState(prev => ({
      ...prev,
      journalEntries: prev.journalEntries.map(e => e.id === entry.id ? entry : e),
    }));
  };

  const deleteJournalEntry = (id: number) => {
    setState(prev => ({
      ...prev,
      journalEntries: prev.journalEntries.filter(e => e.id !== id),
    }));
  };

  // Progress photo functions
  const addProgressPhoto = (photo: Omit<ProgressPhoto, 'id'>) => {
    setState(prev => {
      const newId = prev.progressPhotos.length > 0 
        ? Math.max(...prev.progressPhotos.map(p => p.id)) + 1 
        : 1;
      return {
        ...prev,
        progressPhotos: [...prev.progressPhotos, { ...photo, id: newId }],
      };
    });
  };

  const updateProgressPhoto = (photo: ProgressPhoto) => {
    setState(prev => ({
      ...prev,
      progressPhotos: prev.progressPhotos.map(p => p.id === photo.id ? photo : p),
    }));
  };

  const deleteProgressPhoto = (id: number) => {
    setState(prev => ({
      ...prev,
      progressPhotos: prev.progressPhotos.filter(p => p.id !== id),
    }));
  };

  // Meal functions
  const addMeal = (meal: Omit<Meal, 'id'>) => {
    setState(prev => {
      const newId = prev.meals.length > 0 
        ? Math.max(...prev.meals.map(m => m.id)) + 1 
        : 1;
      return {
        ...prev,
        meals: [...prev.meals, { ...meal, id: newId }],
      };
    });
  };

  const updateMeal = (meal: Meal) => {
    setState(prev => ({
      ...prev,
      meals: prev.meals.map(m => m.id === meal.id ? meal : m),
    }));
  };

  const deleteMeal = (id: number) => {
    setState(prev => ({
      ...prev,
      meals: prev.meals.filter(m => m.id !== id),
    }));
  };

  // Reminder functions
  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    setState(prev => {
      const newId = prev.reminders.length > 0 
        ? Math.max(...prev.reminders.map(r => r.id)) + 1 
        : 1;
      return {
        ...prev,
        reminders: [...prev.reminders, { ...reminder, id: newId }],
      };
    });
  };

  const updateReminder = (reminder: Reminder) => {
    setState(prev => ({
      ...prev,
      reminders: prev.reminders.map(r => r.id === reminder.id ? reminder : r),
    }));
  };

  const deleteReminder = (id: number) => {
    setState(prev => ({
      ...prev,
      reminders: prev.reminders.filter(r => r.id !== id),
    }));
  };

  const toggleReminderComplete = (id: number) => {
    setState(prev => ({
      ...prev,
      reminders: prev.reminders.map(r => 
        r.id === id ? { ...r, completed: !r.completed } : r
      ),
    }));
  };

  // Hydration functions
  const updateHydrationLevel = (level: number) => {
    setState(prev => ({
      ...prev,
      hydrationLevel: level,
    }));
  };

  const contextValue: AppContextType = {
    state,
    login,
    logout,
    updateUser,
    updateMorningRoutine,
    updateNightRoutine,
    updateWeeklyRoutine,
    toggleRoutineItem,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    addProgressPhoto,
    updateProgressPhoto,
    deleteProgressPhoto,
    addMeal,
    updateMeal,
    deleteMeal,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleReminderComplete,
    updateHydrationLevel,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};