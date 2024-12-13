import { Tables } from '@/types/database.types';
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value with an array of lecture functions
interface LecturesContextType {
  newLectures: Tables<"lectures">[];
  setNewLectures: React.Dispatch<React.SetStateAction<Tables<"lectures">[]>>;
}

// Create the context with a default value
const LecturesContext = createContext<LecturesContextType | undefined>(undefined);

interface LecturesProviderProps {
  children: ReactNode;
}

// Create a provider component
export const LecturesProvider: React.FC<LecturesProviderProps> = ({ children }) => {
  const [newLectures, setNewLectures] = useState<Tables<"lectures">[]>([]);

  return (
    <LecturesContext.Provider value={{ newLectures, setNewLectures }}>
      {children}
    </LecturesContext.Provider>
  );
};

// Create a custom hook to use the context
export const useLecturesContext = () => {
  const context = React.useContext(LecturesContext);
  if (context === undefined) {
    throw new Error('useLecturesContext must be used within a LecturesProvider');
  }
  return context;
};
