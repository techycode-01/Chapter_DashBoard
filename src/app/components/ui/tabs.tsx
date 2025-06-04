import React, { ReactNode, createContext, useContext, useState } from "react";

// Context for Tabs
interface TabsContextProps {
  activeValue: string;
  setActiveValue: (value: string) => void;
}
const TabsContext = createContext<TabsContextProps | undefined>(undefined);

interface TabsProps {
  defaultValue?: string;
  children: ReactNode;
}

export const Tabs = ({ defaultValue, children }: TabsProps) => {
  const [activeValue, setActiveValue] = useState(defaultValue || "");

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}
export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div className={className} style={{ display: "flex", gap: 8 }}>
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}
export const TabsTrigger = ({ value, children, className }: TabsTriggerProps) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");
  const { activeValue, setActiveValue } = ctx;
  const isActive = activeValue === value;
  return (
    <button
      type="button"
      className={className}
      style={{
        fontWeight: isActive ? "bold" : "normal",
        borderBottom: isActive ? "2px solid #333" : "none",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 8
      }}
      onClick={() => setActiveValue(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}
export const TabsContent = ({ value, children, className }: TabsContentProps) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");
  const { activeValue } = ctx;
  if (activeValue !== value) return null;
  return (
    <div className={className} style={{ marginTop: 16 }}>{children}</div>
  );
};

export default Tabs;

