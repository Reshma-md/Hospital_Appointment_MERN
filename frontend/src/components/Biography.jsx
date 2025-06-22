import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p
            style={{
              lineHeight: "1.5", // Increased line spacing
              marginTop: "10px", // Added spacing above the paragraph
              marginBottom: "10px", // Added spacing below the paragraph
              textAlign: "justify", // Aligned the paragraph content
            }}
          >
            At eDoc, we simplify healthcare by providing a seamless online appointment booking platform. Our mission is to connect patients with top doctors effortlessly, ensuring quick and hassle-free access to medical care.
            With eDoc, you can schedule consultations with trusted specialists anytime, eliminating long waiting times and complex booking processes. Our secure, user-friendly platform ensures your personal health data remains private while giving you access to a wide range of medical professionals.
            From general check-ups to specialized care, eDoc makes healthcare smarter, faster, and more accessible—so you can focus on what truly matters, your well-being.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
