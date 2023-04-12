import React from "react";

import "./MainContent.css";
import { StrategyPanel } from "../../components/StrategyPanel";
export const MainContent = () => {
  return (
    <div className="content-container">
      <h3 className="title">Set Security Strategy</h3>
      <div className="content-form">
        <StrategyPanel />
      </div>
    </div>
  );
};
