import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import AuthContext from "../context/AuthContext";
import { FaTruck, FaMotorcycle, FaBicycle, FaCar, FaTruckPickup } from "react-icons/fa"; // Import icons

const HomePage = () => {
  const { user, isDriver } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle vehicle type click
  const handleVehicleClick = (vehicleType) => {
    navigate(`/create-booking/${vehicleType}`); // Navigate to create-booking page with vehicleType
  };

  return (
    <main className="bg-gray-100">
      <article>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg font-semibold mb-4 uppercase tracking-wide">
                Welcome to Our Delivery Service
              </p>
              <h1 className="text-5xl font-extrabold mb-6 leading-snug animate-pulse">
                Wherever you need, we <span className="italic text-yellow-400">deliver</span>.
              </h1>
              <p className="text-lg mb-8">
                Choose from a variety of vehicles and experience seamless deliveries at every turn. Your convenience, our priority!
              </p>

              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-yellow-400 text-indigo-600 hover:bg-yellow-500 py-2 px-6 rounded-md font-semibold transition transform hover:scale-105">
                  Learn More
                </a>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 py-2 px-6 rounded-md font-semibold transition transform hover:scale-105">
                  <span>How it Works</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Available vehicle types */}
        {user && !isDriver && (
          <div className="container mx-auto mt-12 px-4">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">Choose Your Vehicle Type</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Each vehicle has an icon, animation, and hover effect */}
              <li
                className="bg-white p-6 text-center shadow-md rounded-lg cursor-pointer hover:bg-indigo-50 transition transform hover:scale-105"
                onClick={() => handleVehicleClick("SmallVan")}
              >
                <FaTruck className="text-indigo-600 mx-auto mb-4 text-4xl" />
                Small Van
              </li>
              <li
                className="bg-white p-6 text-center shadow-md rounded-lg cursor-pointer hover:bg-indigo-50 transition transform hover:scale-105"
                onClick={() => handleVehicleClick("LargeTruck")}
              >
                <FaTruckPickup className="text-indigo-600 mx-auto mb-4 text-4xl" />
                Large Truck
              </li>
              <li
                className="bg-white p-6 text-center shadow-md rounded-lg cursor-pointer hover:bg-indigo-50 transition transform hover:scale-105"
                onClick={() => handleVehicleClick("Motorcycle")}
              >
                <FaMotorcycle className="text-indigo-600 mx-auto mb-4 text-4xl" />
                Motorcycle
              </li>
              <li
                className="bg-white p-6 text-center shadow-md rounded-lg cursor-pointer hover:bg-indigo-50 transition transform hover:scale-105"
                onClick={() => handleVehicleClick("ElectricScooter")}
              >
                <FaBicycle className="text-indigo-600 mx-auto mb-4 text-4xl" />
                Electric Scooter
              </li>
              <li
                className="bg-white p-6 text-center shadow-md rounded-lg cursor-pointer hover:bg-indigo-50 transition transform hover:scale-105"
                onClick={() => handleVehicleClick("Bicycle")}
              >
                <FaBicycle className="text-indigo-600 mx-auto mb-4 text-4xl" />
                Bicycle
              </li>
              <li
                className="bg-white p-6 text-center shadow-md rounded-lg cursor-pointer hover:bg-indigo-50 transition transform hover:scale-105"
                onClick={() => handleVehicleClick("MiniTruck")}
              >
                <FaTruck className="text-indigo-600 mx-auto mb-4 text-4xl" />
                Mini Truck
              </li>
              <li
                className="bg-white p-6 text-center shadow-md rounded-lg cursor-pointer hover:bg-indigo-50 transition transform hover:scale-105"
                onClick={() => handleVehicleClick("PickupTruck")}
              >
                <FaCar className="text-indigo-600 mx-auto mb-4 text-4xl" />
                Pickup Truck
              </li>
              <li
                className="bg-white p-6 text-center shadow-md rounded-lg cursor-pointer hover:bg-indigo-50 transition transform hover:scale-105"
                onClick={() => handleVehicleClick("CargoVan")}
              >
                <FaTruckPickup className="text-indigo-600 mx-auto mb-4 text-4xl" />
                Cargo Van
              </li>
            </ul>
          </div>
        )}
      </article>
    </main>
  );
};

export default HomePage;
