import React, { useContext } from "react";
import { AuthContext } from "../ContextApi/ContextApi";

const FoodCard = ({food}) => {


 



  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={food.imageUrl}
        alt={food.foodName}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{food.foodName}</h2>
        <p className="text-sm text-gray-600">{food.foodDescription}</p>
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-semibold">Price:</span> ₹{food.foodPrice}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Restaurant:</span> {food.restaurant}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Type:</span> {food.type}
        </p>
      </div>
    </div>
  );
};

const FoodList = () => {
  const {foodData}=useContext(AuthContext) || {}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {foodData?.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;
