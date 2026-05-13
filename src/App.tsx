import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import MusicSearch from "./pages/MusicSearch";
import TherapyAssessment from "./pages/TherapyAssessment";
import DoctorsPage from "./pages/DoctorsPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import NotificationsPage from "./pages/NotificationsPage";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";

const queryClient = new QueryClient();

// Protected route component that checks for authentication
const ProtectedRoute = ({ 
  children, 
  requireLogin = false 
}: { 
  children: React.ReactNode;
  requireLogin?: boolean;
}) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  const isGuest = localStorage.getItem('isGuest') === 'true';
  
  if (!isAuthenticated && !isGuest) {
    return <Navigate to="/login" replace />;
  }
  
  // If this is specifically for logged-in users only (not guests)
  if (requireLogin && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
  useEffect(() => {
    // Check if the user has previously logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isGuest = localStorage.getItem('isGuest') === 'true';
    
    // Set the state to indicate that the check has been done
    setInitialCheckDone(true);
  }, []);
  
  // Wait until the authentication check is complete
  if (!initialCheckDone) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/music-search" element={
              <ProtectedRoute>
                <MusicSearch />
              </ProtectedRoute>
            } />
            <Route path="/therapy-assessment" element={
              <ProtectedRoute requireLogin={true}>
                <TherapyAssessment />
              </ProtectedRoute>
            } />
            <Route path="/doctors" element={
              <ProtectedRoute>
                <DoctorsPage />
              </ProtectedRoute>
            } />
            <Route path="/workshops" element={
              <ProtectedRoute>
                <WorkshopsPage />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute requireLogin={true}>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute requireLogin={true}>
                <MyAppointmentsPage />
              </ProtectedRoute>
            } />
            <Route path="/doctors/appointments" element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
