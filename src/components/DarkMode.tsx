"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
// Assuming Switch component is properly imported

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true); // Change initial state to true
  useEffect(() => {
    setLoading(false); // Set loading to false after component mounts
  }, []);

  // Check if loading is true, show loader or early return if necessary
  if (loading) return <div>Loading...</div>;

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Switch checked={theme === "dark"} onClick={toggleTheme} />
    </div>
  );
}
