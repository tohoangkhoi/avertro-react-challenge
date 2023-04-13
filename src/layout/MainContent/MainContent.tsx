import { StrategyPanel } from "../../components/ContentForm/StrategyPanel/StrategyPanel";
import "./MainContent.css";

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
