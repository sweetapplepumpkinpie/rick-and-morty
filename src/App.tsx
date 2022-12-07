import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
