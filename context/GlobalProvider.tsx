import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthError, User } from '@supabase/supabase-js';

// Define the types for your context state
interface GlobalContextType {
  isLoggedIn: boolean;
  user: any; // You can replace 'any' with a more specific type based on your user object structure
  isLoading: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: any) => void; // Replace 'any' with the same specific type as above
  setIsLoading: (loading: boolean) => void;
}

// Create the context with an initial undefined value
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) console.log(error.message, 'comming from global context');
      if (data.user) {
        setIsLoggedIn(true);
        setUser(data.user);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, user, isLoading, setIsLoggedIn, setUser, setIsLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
