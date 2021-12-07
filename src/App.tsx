import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { CharacterPage } from "./Pages/CharacterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
      </Routes>
    </div>
  );
}

export default App;
