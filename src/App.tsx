import "./App.css";
import { Provider } from "react-redux";
import { MainContent } from "./layout/MainContent/MainContent";
import { Header } from "./layout/Header/Header";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <MainContent />
      </Provider>
    </div>
  );
}

export default App;
