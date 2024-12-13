import { Tables } from '@/types/database.types';
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value with an array of lecture functions
interface SectionsContextType {
  newSections: Tables<"sections">[];
  setNewSections: React.Dispatch<React.SetStateAction<Tables<"sections">[]>>;
}

// Create the context with a default value
const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

interface SectionsProviderProps {
  children: ReactNode;
}

// Create a provider component
export const SectionsProvider: React.FC<SectionsProviderProps> = ({ children }) => {
  const [newSections, setNewSections] = useState<Tables<"sections">[]>([]);

  return (
    <SectionsContext.Provider value={{ newSections, setNewSections }}>
      {children}
    </SectionsContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSectionsContext = () => {
  const context = React.useContext(SectionsContext);
  if (context === undefined) {
    throw new Error('useSectionsContext must be used within a SectionsProvider');
  }
  return context;
};
