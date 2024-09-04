import React from "react";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center h-full items-center">
      <p>Gutz Dashboard</p>
      <h1 className="text-3xl my-2">Welcome to my Dashboard</h1>
      <h2 className="text-2xl mb-3">GutzDashboard</h2>
      {children}
    </div>
  );
};

export default LayoutAuth;
