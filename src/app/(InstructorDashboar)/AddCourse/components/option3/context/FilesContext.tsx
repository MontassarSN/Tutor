// context/FilesContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface FileEntry {
  id: string;
  formData: FormData;
}

interface FilesContextType {
  files: FileEntry[];
  addFile: (id: string, formData: FormData) => void;
  updateFile: (id: string, formData: FormData) => void;
  removeFile: (id: string) => void;
  resetFiles: () => void;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export const FilesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileEntry[]>([]);

  const addFile = (id: string, formData: FormData) => {
    setFiles((prevFiles) => [...prevFiles, { id, formData }]);
  };

  const updateFile = (id: string, formData: FormData) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === id ? { id, formData } : file))
    );
  };

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const resetFiles = () => {
    setFiles([]);
  };

  return (
    <FilesContext.Provider value={{ files, addFile, updateFile, removeFile, resetFiles }}>
      {children}
    </FilesContext.Provider>
  );
};

export const useFilesContext = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFilesContext must be used within a FilesProvider");
  }
  return context;
};
