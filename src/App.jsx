import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Explorar from "./pages/Explorar.jsx";
import Objeto from "./pages/Objeto.jsx";
import Observar from "./pages/Observar.jsx";
import Carta from "./pages/Carta.jsx";
import Iss from "./pages/Iss.jsx";
import Clasificar from "./pages/Clasificar.jsx";
import Quiz from "./pages/Quiz.jsx";
import Entrar from "./pages/Entrar.jsx";
import Perfil from "./pages/Perfil.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/objeto/:slug" element={<Objeto />} />
        <Route path="/observar" element={<Observar />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/iss" element={<Iss />} />
        <Route path="/clasificar" element={<Clasificar />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
}
