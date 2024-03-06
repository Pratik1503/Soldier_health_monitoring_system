import React from "react";
import "./MyMapComponent.css";
const MyMapComponent = () => {
  return (
    <div className="mapContainer">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30243.413767214435!2d73.7201030743164!3d18.644837800000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9f1ca8dab03%3A0x6237cfbd36f9acf9!2sD.Y.%20Patil%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1709639238840!5m2!1sen!2sin"
        width="400"
        title="map"
        className="map"
        height="450"
        style={{ border: 0 }}
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MyMapComponent;
