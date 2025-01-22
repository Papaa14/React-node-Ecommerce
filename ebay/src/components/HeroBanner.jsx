import React, { useState, useEffect } from "react";
import "../styles/HeroBanner.css"

const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Replace these URLs with your actual image URLs
    const images = [
        "/src/assets/track.jpeg",
        "/src/assets/track2.jpeg",
        "/src/assets/container.jpeg",
        "/src/assets/container2.jpeg"
    ];

    const overlayText = "Welcome to our store!We have the best deals for you!Shop now!";

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="slider-container">
          {/* Image container */}
          <div className="slider-content">
            {images.map((image, index) => (
              <div
                key={index}
                className={`slide ${index === currentIndex ? 'active' : ''}`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="slide-image"
                />
              </div>
            ))}
            
            {/* Text overlay */}
            <div className="text-overlay">
              <p className="overlay-text">
                {overlayText}
              </p>
            </div>
    
            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="nav-button prev-button"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="nav-button next-button"
            >
              →
            </button>
    
            {/* Dots indicator */}
            <div className="dots-container">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      );
};;


export default HeroBanner;