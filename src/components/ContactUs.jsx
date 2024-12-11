import React from "react";

const ContactSection = () => {
  return (
    <section className="flex max-w-7xl mx-auto py-20 max-lg:flex-col max-lg:gap-6">
      {/* Map Section */}
      <div className="flex-2">
        <img
          src="https://via.placeholder.com/800x400" // Replace this with the actual map image or embed
          alt="Map"
          className="w-full h-auto"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 px-2">
        <form>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 "
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 "
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Your Phone Number"
              className="w-full p-3 border border-gray-300 "
            />
          </div>
          <div className="mb-4">
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 "
            />
          </div>
          <button type="submit" className="bg-orange-500 w-full text-white py-3 px-6  cursor-pointer">
            Get In Touch
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
