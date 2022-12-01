import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './Components/Header'
import Banner from './Components/Banner'
import './index.css'
import ComputerVision from './Components/ComputerVision';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Header />
        <Banner
          videoTitle={"Meu Video"}
          url={"https://www.youtube.com/watch?v=3BhkeY974Rg"}
          videoDescription={"IFSULDEMINAS"}
          />
         <ComputerVision />  
        
    </div>
);


