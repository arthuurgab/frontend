import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Despesas from "./pages/Despesas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="despesas" element={<Despesas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
