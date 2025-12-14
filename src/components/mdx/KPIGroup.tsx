"use client";

import { ReactNode } from "react";

interface KPIGroupProps {
  children: ReactNode;
}

export default function KPIGroup({ children }: KPIGroupProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 animate-fade-in-up">
      {children}
    </div>
  );
}
