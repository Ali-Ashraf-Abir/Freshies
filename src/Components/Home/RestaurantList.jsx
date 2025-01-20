// Import React and any necessary libraries
import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/ContextApi';

const RestaurantList = () => {

    const {restaurantList}=useContext(AuthContext) || {}

  return (
  <div className="">

    <div className="text-center lg:text-[5vh] text-[3vh] font-nunito font-bold">
        Our Available Restaurants
    </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '4vw' }}>
      {restaurantList?.map((restaurant) => (
        <div 
          key={restaurant._id} 
          style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '15px', 
            maxWidth: '300px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
          }}
        >
          <h2 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{restaurant.businessName}</h2>
          <p><strong>Owner:</strong> {restaurant.userName}</p>
          <p><strong>Address:</strong> {restaurant.businessAddress}</p>
          <p><strong>Email:</strong> {restaurant.email}</p>
          {restaurant.image ? (
            <img 
              src={restaurant.image} 
              alt={restaurant.businessName} 
              style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
            />
          ) : (
            <p style={{ fontStyle: 'italic', color: '#888' }}>No image available</p>
          )}
        </div>
      ))}
    </div>
  </div>
  );
};

export default RestaurantList;

// Usage Example:
// const restaurants = [
//   {
//     _id: "66fd446222bb3b417ddb02ea",
//     businessName: "Rimel's Kitchen",
//     userName: "rimel",
//     businessAddress: "Mohammadpur 52, New Palace, Dhaka",
//     email: "rimel1@gmail.com",
//     userType: "Restaurant Owner",
//     location: "Dhaka",
//     image: "https://via.placeholder.com/300" // Example image URL
//   },
//   // Add more restaurant objects here
// ];

// Render in your app:
// <RestaurantList restaurants={restaurants} />
