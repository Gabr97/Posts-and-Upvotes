import Main from "./components/Main/Main";
import "./styles.css";
import { HashRouter } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <Main />
      </div>
    </HashRouter>
  );
}
