import { Pokemon } from "@/pages";
import Pokedex from "@/pages/Pokedex/Pokedex";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/pokemon" element={<Pokemon />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
