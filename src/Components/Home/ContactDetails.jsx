// ContactDetails.js
import React from "react";

const ContactDetails = () => {
    return (
        <section className="bg-gray-100 py-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                    Have questions? We're here to help! Reach out to us anytime.
                </p>
                <div className="flex flex-col md:flex-row justify-around items-center">
                    <div className="mb-6 md:mb-0">
                        <h3 className="font-bold text-lg">Phone</h3>
                        <p className="text-gray-600">+1 234 567 890</p>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h3 className="font-bold text-lg">Email</h3>
                        <p className="text-gray-600">support@fooddelivery.com</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Address</h3>
                        <p className="text-gray-600">123 Food Street, Culinary City</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactDetails;
