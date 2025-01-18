// BestSellers.js
import React from "react";

const BestSellers = () => {
  const bestSellers = [
    { id: 1, name: "Margherita Pizza", price: "$12.99", image: "https://th.bing.com/th/id/OIP.GUtzz3zgkImN3_ikBYuNfgHaE8?rs=1&pid=ImgDetMain" },
    { id: 2, name: "Cheeseburger", price: "$9.99", image: "https://img.freepik.com/premium-photo/hamburger-with-cheese-cheese-it_745528-13032.jpg" },
    { id: 3, name: "Sushi Platter", price: "$19.99", image: "https://animalgourmet.com/wp-content/uploads/2019/05/sushi-354628_1920.jpg" },
  ];

  return (
    <section className="bg-white py-12 px-6 max-w-[1920px] mx-auto">
      <div className="max-w-[80vw] mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[40vh] object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-red-500 font-semibold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
