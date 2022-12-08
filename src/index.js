import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import "./index.css";
import ComputerVision from "./Components/ComputerVision";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Header />
    <Banner
      videoTitle={"Classificação de Animais"}
      url={"https://www.youtube.com/watch?v=4LmpP6XUufA"}
      videoDescription={"IFSULDEMINAS"}
    />
    <ComputerVision />
  </div>
);
