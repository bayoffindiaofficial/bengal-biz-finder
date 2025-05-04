
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { createContext } from "react";
import Index from "./pages/Index";
import BusinessList from "./pages/BusinessList";
import BusinessDetail from "./pages/BusinessDetail";
import Auth from "./pages/Auth";
import AddBusiness from "./pages/AddBusiness";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Create authentication context
export const AuthContext = createContext<{
  user: any | null;
  session: any | null;
}>({
  user: null,
  session: null
});

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setupAuth = async () => {
      // Initial session check
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
          setUser(session?.user || null);
        }
      );
      
      setIsLoading(false);
      
      // Cleanup subscription
      return () => subscription.unsubscribe();
    };

    setupAuth();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-bengalbiz-background">
      <div className="animate-pulse w-32 h-8 bg-gray-300 rounded"></div>
    </div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, session }}>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/businesses" element={<BusinessList />} />
              <Route path="/business/:id" element={<BusinessDetail />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/add-business" element={<AddBusiness />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
