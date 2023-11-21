import React from 'react';
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
      <>
    <main>
        <section id='home'>
            <div className="div1">
            <h3 id="h31">Our Commitment</h3> 
            <h3 id="h32">Making a Stronger Force....</h3>
            </div>
            <div className="content">
                <h1>Our Mission</h1>
                <h1>Elevate Soldier Health for a Safer Tomorrow.</h1>
            </div>
            <div className="button">
                <Link to="/checkhealth" id="button1">Check-Now</Link>
            </div>
        </section>
        
    </main>
</>
  )
}

export default Home;