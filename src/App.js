import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Despesas from "./pages/Despesas";
import TipoDespesa from "./pages/TipoDespesa";
import Prioridade from "./pages/Prioridade";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="despesas" element={<Despesas />} />
          <Route path="tipo-despesas" element={<TipoDespesa />} />
          <Route path="tipo-prioridade" element={<Prioridade />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
