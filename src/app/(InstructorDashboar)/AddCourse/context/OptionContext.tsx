"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

// Define the context type
interface OptionContextType {
  selectedOption: `option${number}`;
  setSelectedOption: (option: `option${number}`) => void;
}

// Provide a default value that matches the context type
const defaultContextValue: OptionContextType = {
  selectedOption: "option1",
  setSelectedOption: () => {},
};

// Create the context with the default value
const OptionContext = createContext<OptionContextType>(defaultContextValue);

export const OptionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const optionParam = searchParams.get('option'); // Retrieve option parameter

  // Determine initial value for selectedOption
  const initialOption: `option${number}` = optionParam ? (optionParam as `option${number}`) : defaultContextValue.selectedOption;

  const [selectedOption, setSelectedOption] = useState(initialOption);

  useEffect(() => {
    if (optionParam) {
      setSelectedOption(optionParam as `option${number}`);
    }
  }, [optionParam]);

  return (
    <OptionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </OptionContext.Provider>
  );
};

export const useOption = () => {
  const context = useContext(OptionContext);
  if (!context) {
    throw new Error("useOption must be used within an OptionProvider");
  }
  return context;
};
