import React from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration:'2000'
});
function Landingscreen() {
  return (
    
      <div className="landing row justify-content-center text-center">
        <div className="col-md-9 my-auto" style={{borderRight:'8px solid aqua'}}>
          <h2 style={{ color: "aqua", fontSize: "100px" }} data-aos='zoom-in'>WELCOME</h2>
          <h1 style={{ color: "aqua"}} data-aos='zoom-out' >"Embrace the supernatural allure of Hotel Transylvania, where ghoulish charm and impeccable service converge for an enchanting and unforgettable retreat."</h1>
          <Link to="/home">
             <button className='btn1'>Get Started</button>
          </Link>
        </div>

        
        
      </div>
     

  );
}

export default Landingscreen;