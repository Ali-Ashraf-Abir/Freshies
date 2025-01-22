import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 font-nunito">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section: Text Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to Freshies!
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At Freshies, we are passionate about bringing delicious food from a variety of local restaurants right to your doorstep. Our platform connects restaurant owners with food lovers, making it easy for customers to explore menus, order their favorite dishes, and enjoy a seamless dining experience at home.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We strive to support local businesses by providing them with a user-friendly platform to showcase their culinary offerings. From fast food to fine dining, our mission is to make great food accessible to everyone, anytime, anywhere.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're craving a hearty meal or looking to explore new flavors, Freshies is here to satisfy your taste buds. Join us in celebrating the joy of good food and great company.
            </p>
          </div>

          {/* Right Section: Google Map */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Visit Us
            </h2>
            <p className="text-gray-700 mb-4">
              Our headquarters is located in a vibrant neighborhood where food and culture come together. Feel free to drop by or reach out to us for any inquiries.
            </p>
            <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091844!2d144.95373521532172!3d-37.8162797797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57711a2bdbd3dc9!2sFlinders%20St%20Station!5e0!3m2!1sen!2sau!4v1611979635470!5m2!1sen!2sau"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                title="Google Map Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We envision a world where great food brings people together, no matter the distance. By fostering connections between restaurants and customers, we aim to create a thriving ecosystem of culinary delights and unforgettable dining experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
