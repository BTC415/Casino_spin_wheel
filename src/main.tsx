import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePIXI from "./components/game_pixi/index";
import StoreProvider from "./store/store";

const rootElement = document.getElementById("root") || new HTMLDivElement()
ReactDOM.createRoot(rootElement).render(
  <StoreProvider>
    <BrowserRouter>
      <Routes>
        <Route path="lucky-wheel/:gameId">
          <Route index element={<GamePIXI />} />
        </Route>
      </Routes>
    </BrowserRouter>

  </StoreProvider>
);
