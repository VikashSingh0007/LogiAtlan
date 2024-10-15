import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const { user, isDriver } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle vehicle type click
  const handleVehicleClick = (vehicleType) => {
    navigate(`/create-booking/${vehicleType}`); // Navigate to create-booking page with vehicleType
  };

  return (
    <main>
      <article>
        <section className="section hero" id="home">
          <div className="container">
            <div className="hero-content">
              <p className="hero-subtitle has-before">
                Welcome to Our Website
              </p>

              <h1 className="h1 hero-title">
                to every
                <i> DIRECTION</i> for you we deliver.
              </h1>

              <p className="hero-text">
                Donec tincidunt lacinia diam, eu volutpat est sollicitudin at.
                Vestibulum ut mi tristique, vulputate ante quis, tempus enim.
                Proin quis euismod purus. Suspendisse efficitur aliquam enim
                sed consequat vulputate ante quis.
              </p>

              <div className="btn-group">
                <a href="#" className="btn btn-primary">
                  Support More
                </a>

                <button className="flex-btn">
                  <div className="btn-icon">
                    {/* Add any icon here */}
                  </div>

                  <span className="span">How it works</span>
                </button>
              </div>
            </div>

            <figure
              className="hero-banner has-before img-holder"
              style={{ "--width": 650, "--height": 650 }}
            >
              <img
                src="/hero-banner.jpg"
                width="650"
                height="650"
                alt="hero banner"
                className="img-cover"
              />
            </figure>
          </div>

          {/* Show available vehicle types if a user is logged in and it's not a driver */}
          {user && !isDriver && (
            <div className="vehicle-section">
              <h2>Choose Your Vehicle Type</h2>
              <ul className="vehicle-list">
                {/* Add an onClick handler to navigate to the create booking page */}
                <li onClick={() => handleVehicleClick("SmallVan")}>Small Van</li>
                <li onClick={() => handleVehicleClick("LargeTruck")}>Large Truck</li>
                <li onClick={() => handleVehicleClick("Motorcycle")}>Motorcycle</li>
                <li onClick={() => handleVehicleClick("ElectricScooter")}>
                  Electric Scooter
                </li>
              </ul>
            </div>
          )}
        </section>
      </article>
    </main>
  );
};

export default HomePage;
