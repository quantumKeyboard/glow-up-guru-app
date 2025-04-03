
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import RoutineTracker from "./pages/RoutineTracker";
import IngredientsGuide from "./pages/IngredientsGuide";
import DietTracker from "./pages/DietTracker";
import ProgressTracker from "./pages/ProgressTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="routine" element={<RoutineTracker />} />
            <Route path="ingredients" element={<IngredientsGuide />} />
            <Route path="diet" element={<DietTracker />} />
            <Route path="progress" element={<ProgressTracker />} />
            <Route path="hydration" element={<Navigate to="/diet" replace />} />
            <Route path="analytics" element={<Navigate to="/progress" replace />} />
            <Route path="reminders" element={<Navigate to="/routine" replace />} />
            <Route path="profile" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
