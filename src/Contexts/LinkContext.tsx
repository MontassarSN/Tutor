"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LinkContextProps {
  selectedPage: number;
  setSelectedPage: (page: number) => void;
}

const LinkContext = createContext<LinkContextProps | undefined>(undefined);

function LinkProvider({ children }: { children: ReactNode }) {
  const [selectedPage, setSelectedPage] = useState(1);

  return (
    <LinkContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </LinkContext.Provider>
  );
}

function useLink() {
  const obj = useContext(LinkContext);
  if (!obj)
    throw new Error(
      "the element should be inside the LinkProvider Component !"
    );
  return obj;
}

export { useLink, LinkProvider };