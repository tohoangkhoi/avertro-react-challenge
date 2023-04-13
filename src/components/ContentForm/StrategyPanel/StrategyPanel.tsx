import React, { useState } from "react";
import { Box } from "@mui/material";
import "./StrategyPanel.css";
import { ObjectiveList } from "../Objective/ObjectiveList";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  selectedTabIndex: number;
}

const tabsMapping = [
  {
    index: 0,
    label: "Mission & Vision",
    content: "Nothing to show",
  },
  {
    index: 1,
    label: "Strategic Business Objective",
    content: <ObjectiveList />,
  },
];

const TabPanel = ({ children, selectedTabIndex, index }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={selectedTabIndex !== index}>
      {selectedTabIndex === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const StrategyPanel = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleClick = (index: number) => {
    setSelectedTabIndex(index);
  };

  return (
    <div className="strategy-panel-container">
      <div>
        {tabsMapping.map((tab) => (
          <button
            key={`tab-header-${tab.index}`}
            style={{
              background: tab.index === selectedTabIndex ? "white" : "#d7d7d7",
            }}
            className="tab-header"
            onClick={() => handleClick(tab.index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panels-container">
        {tabsMapping.map((tab) => (
          <TabPanel
            key={`tabpanel-${tab.index}`}
            selectedTabIndex={selectedTabIndex}
            index={tab.index}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};
